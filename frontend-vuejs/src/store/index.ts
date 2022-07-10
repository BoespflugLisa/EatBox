import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({

    state: {
        UserRole: null,
        isConnected: false,
        token: null,
        User: null
    },
    getters: {
        getState(state) {
            return {
                UserRole: state.UserRole,
                isConnected: state.isConnected,
                token: state.token,
                User: state.User
            }
        }
    },
    mutations: {
        changeRole(state, name) {
            state.UserRole = name
        },

        changeState(state, infos) {
            state.isConnected = infos[0];
            state.token = infos[1]
        },

        changeUser(state, user) {
            state.User = user
        },
    },
    actions: {},
    modules: {},

})


