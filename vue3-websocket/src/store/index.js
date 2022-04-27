// import 'babel-polyfill'
import { createStore } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
  },
  state: {
    socket:null,
    siderlist: [],
    userlist: [],
    userInfo: {},
    friendInfo: {}
  },
  getters: {
    socket: state => state.socket,
    siderlist: state => state.siderlist,
    userlist: state => state.userlist,
    userInfo: state => state.userInfo,
    friendInfo: state => state.friendInfo,
  },
  mutations: {
    getUserList (state, value) {
      if(value.state.opt&&value.state.opt.loginInfo){
        state.userInfo = value.state.opt.loginInfo
      }
      if(value.state.opt&&value.state.opt.friendInfo){
        state.friendInfo = value.state.opt.friendInfo
      }
      state.siderlist = value.state.list.filter(v=>state.userInfo&&(v.name!==state.userInfo.name))
      state.userlist = value.state.list
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
