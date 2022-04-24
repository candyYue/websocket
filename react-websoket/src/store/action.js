import ActionTypes from './ActionTypes'
const getList = (payload) => ({
  type: ActionTypes.GET_LIST,
  value: payload
})

const getUserInfo = userInfo => {
  return {
    type: ActionTypes.USER_INFO,
    userInfo,
  }
}

export {
  getList,
  getUserInfo
}