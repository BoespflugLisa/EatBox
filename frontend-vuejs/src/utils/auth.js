import decode from 'jwt-decode'
import axios from 'axios'
import store from '@/store/index';
import Vue from 'vue'

const REST_ENDPOINT = 'http://localhost:3032/'

export function registerUser(form) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            let res = await axios({
                url: `${REST_ENDPOINT}register`,
                method: 'POST',
                data: {
                    email: form.email,
                    password: form.password,
                    type: form.type,
                    name: form.name,
                    lastname: form.lastname,
                    legal: form.legal,
                    role: form.role,
                    phone: form.phone,
                    CoverImg : form.CoverImg,
                    ProfileImg : form.ProfileImg,
                    address: form.address,
                    iban: form.iban,
                }
            })

            /*setAuthToken(res.data.auth, res.data.token)
            setRole(res.data.user.Role)
            setUser({
                id: res.data.user._id,
                restaurant: res.data.user.restaurant,
                client: res.data.user.client,
                livreur: res.data.user.livreur
            })*/
            resolve()
        } catch (err) {
            console.error('Erreur lors de l\'inscription: ', err)
            reject(err)
        }
    })
}

export function logoutUser() {
    clearAuthToken()
}

export function setAuthToken(auth, token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    store.commit('changeState', [auth, token])

    Vue.$cookies.set('auth', auth, getTokenExpirationDate(token)+'s')
    Vue.$cookies.set('token', token, getTokenExpirationDate(token)+'s')

    localStorage.setItem('auth', auth)
    localStorage.setItem('token', token)
}

export function setRole(type) {
    store.commit('changeRole', type)

    Vue.$cookies.set('role', type, '90000s')

    localStorage.setItem('Role', type)
}

export function getRole() {
    if(Vue.$cookies.isKey('role')){
        return Vue.$cookies.get('role')
    } else return store.state.UserRole
}

export function setUser(user) {
    store.commit('changeUser', user)
    Vue.$cookies.set('_id', user.id, getTokenExpirationDate(user.token))
    Vue.$cookies.set('user_id', user.client_id, getTokenExpirationDate(user.token))
}

export function getAuthToken() {
    if(Vue.$cookies.isKey('token')){
        return Vue.$cookies.get('token')
    } else return store.state.token
    //return store.state.token
}

function clearAuthToken() {
    axios.defaults.headers.common['Authorization'] = ''
    store.commit('changeState', [false, null])
    store.commit('changeUser', null)
    store.commit('changeRole', null)

    Vue.$cookies.remove('token')
    Vue.$cookies.remove('auth')
    Vue.$cookies.remove('role')
    Vue.$cookies.remove('user_id')
    Vue.$cookies.remove('_id')

    localStorage.clear()
}

export function isLoggedIn() {
    let authToken = getAuthToken()
    return !!authToken && !isTokenExpired(authToken)
}

export function getUserInfo() {
    if (isLoggedIn()) {
        return decode(getAuthToken())
    }
}

function getTokenExpirationDate(encodedToken) {
    let token = decode(encodedToken)
    if (!token.exp) {
        return null
    }

    let date = new Date(0)
    date.setUTCSeconds(token.exp)

    return date
}

function isTokenExpired(token) {
    let expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}