import decode from 'jwt-decode'
import axios from 'axios'
import store from '@/store/index';
import Vue from 'vue'


export function logoutUser() {
    clearAuthToken()
}

export function setAuthToken(auth, token) {
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