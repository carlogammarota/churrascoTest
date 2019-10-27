import axios from "axios"
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  key: 'my-app',
  storage: window.sessionStorage
})

export default new Vuex.Store({
  // transpileDependencies: ['vuex-persist'],
  state: {
    token: null,
    status: null,
    user: {
      email: ""
    },
    accounts: []
  },
  mutations: {

    "AGREE_SINGLE_ACCOUNT": (state, account) => {
      // console.log("AGREE_ACCOUNT", account)
      state.accounts.push(account)
      // state.accounts = account
    },
    "AGREE_ACCOUNT": (state, accounts) => {
      console.log("AGREE_ACCOUNT", accounts)
      // state.accounts.push(account)
      state.accounts = accounts
    },
    "AUTH_REQUEST": (state) => {
      state.status = 'loading'
    },
    "AUTH_SUCCESS": (state, token) => {
      state.status = 'success'
      state.token = token
    },
    "AUTH_ERROR": (state) => {
      state.status = 'error'
      state.token = null
    },
    "AUTH_LOGOUT": (state) => {
      state.status = null
      state.token = null
      state.user.email = null
    },
    "SET_USER": (state, email) => {
      // state.status = null
      // state.token = null
      state.user.email = email
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getStatus: state => state.status,
    getUser: state => state.user.email,
    getAccounts: state => state.accounts,
  },
  actions: {
    "AUTH_REQUEST": ({commit, dispatch}, user) => {
      return new Promise((resolve, reject) => {
          commit("AUTH_REQUEST")
          axios.post("https://reqres.in/api/login", {
              "email": user.email, //eve.holt@reqres.in
              "password": user.password //"cityslicka"
          })
          .then(resp => {
              const token = resp.data.token
              //Guardar en Session VUEX PLUGIN
              axios.defaults.headers.common['Authorization'] = token
              // console.log("EMAIL", user.email)
              commit("SET_USER", user.email)
              commit("AUTH_SUCCESS", token)
              resolve(resp)
          })
          .catch(err => {
              commit("AUTH_ERROR", err)
              reject(err)
          })
      })
  },
  "AUTH_LOGOUT": ({commit, dispatch}) => {
      return new Promise((resolve, reject) => {
          commit("AUTH_LOGOUT")
          delete axios.defaults.headers.common['Authorization']
          resolve()
      })
  },
  "GET_ACCOUNTS": ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      // commit("AUTH_REQUEST")
      axios.get("https://reqres.in/api/users")
      .then(resp => {
        console.log("resp.data", resp.data.data)
          // const token = resp.data.token
          //Guardar en Session VUEX PLUGIN
          // axios.defaults.headers.common['Authorization'] = token
          // console.log("EMAIL", user.email)
          commit("AGREE_ACCOUNT", resp.data.data)
          // commit("AUTH_SUCCESS", token)
          resolve(resp)
      })
      .catch(err => {
          commit("AUTH_ERROR", err)
          reject(err)
      })
  })
  }  
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})