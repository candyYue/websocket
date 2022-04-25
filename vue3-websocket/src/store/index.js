// import 'babel-polyfill'
import { createStore } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
  },
  state: {
    socket:null,
    userlist: [],
    userInfo: {},
    friend: {}
  },
  getters: {
    socket: state => state.socket,
    userlist: state => state.userlist,
    userInfo: state => state.userInfo,
    friend: state => state.friend,
  },
  mutations: {
    getUserList (state, value) {
      state.userlist = value.state.filter(v=>!v.islogin)
      const friend = value.state.filter(v=>v.ischart)||[]
      state.friend = friend[0]
      const Info = value.state.filter(v=>v.islogin)||[]
      state.userInfo = Info[0]
    },
    getSocket(state, value){
      state.socket = value.state
    }
  },
  actions: {
    getUserList: (context, payload) => {
      context.commit({
        type: 'getUserList',
        state: payload
      })
    },
    getSocket: (context, payload) => {
      context.commit({
        type: 'getSocket',
        state: payload
      })
    }
  },
  // plugins: [createPersistedState({
  //   storage: window.sessionStorage,
  //   reducer (val) {
  //     return {
  //     }
  //   }
  // })]
})
