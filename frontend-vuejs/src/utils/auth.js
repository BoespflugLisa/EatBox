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
                    username: form.username,
                    legal: form.legal,
                    role: form.role,
                    phone: form.phone,
                    CoverImg : form.CoverImg,
                    ProfileImg : form.ProfileImg
                }
            })

            console.log(res)

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

export function loginUser(username, password, role) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            let res;
            switch(role){
                case "Restaurant":
                    res = await axios({
                        url: `${REST_ENDPOINT}loginRestaurant`,
                        method: 'POST',
                        data: {
                            email: username,
                            password: password,
                        }
                    }).then(response => {
                        console.log(response)
                        if(!response.data.user.user_id){
                            throw "Il n'y a pas de compte restaurant sous cet e-mail"
                        }
                        setUser({
                            id: response.data.user._id,
                            client_id: response.data.user.user_id,
                        })
                        setRole(role)
                        setAuthToken(response.data.auth, response.data.token)
                        resolve()
                    }).catch(function(error){
                        if(error.response) throw error.response.data.message
                        else throw error
                    })
                    break;

                case "Client":
                    res = await axios({
                        url: `${REST_ENDPOINT}login`,
                        method: 'POST',
                        data: {
                            email: username,
                            password: password,
                            Role : role
                        }
                    }).then(response => {
                        console.log(response)
                        if(!response.data.user.user_id){
                            throw "Il n'y a pas de compte client sous cet e-mail"
                        }
                        setUser({
                            id: response.data.user._id,
                            client_id: response.data.user.user_id,
                        })
                        setRole(role)
                        setAuthToken(response.data.auth, response.data.token)
                        resolve()
                    }).catch(function(error){
                        console.error('Erreur lors de la connexion:', error)
                        throw error
                    })
                    break;

                case "Livreur":
                    res = await axios({
                        url: `${REST_ENDPOINT}login`,
                        method: 'POST',
                        data: {
                            email: username,
                            password: password,
                            Role : role
                        }
                    }).then(response => {
                        console.log(response)
                        if(!response.data.user.user_id){
                            throw "Il n'y a pas de compte livreur sous cet e-mail"
                        }
                        setUser({
                            id: response.data.user._id,
                            client_id: response.data.user.user_id,
                        })
                        setRole(role)
                        setAuthToken(response.data.auth, response.data.token)
                        resolve()
                    }).catch(function(error){
                        //console.error('Erreur lors de la connexion:', error)
                        throw error
                    })
                    break;
            }

        } catch (err) {
            //console.error('Erreur lors de la connexion:', err)
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
    // return store.state.UserRole
}

export function setUser(user) {
    store.commit('changeUser', user)

    Vue.$cookies.set('_id', user.id, '80000s')
    Vue.$cookies.set('user_id', user.client_id, '80000s')
}

export function getAuthToken() {
    if(Vue.$cookies.isKey('token')){
        return Vue.$cookies.get('token')
    } else return store.state.token
    //return store.state.token
}

export function clearAuthToken() {
    axios.defaults.headers.common['Authorization'] = ''
    store.commit('changeState', [false, null])
    store.commit('changeUser', null)
    store.commit('changeRole', null)

    Vue.$cookies.remove('user')
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