import actionTypes from './actionType'
const initState = { //存放state
  list: [
    {name: '小明', message: []}
  ],
  userInfo: {}
}

const reducerAction = (state = initState, action) => { //是一个纯函数，将根据action的不同来修改state。
  // reducer 可以接受state，但是绝不能修改state
  switch (action.type){
    case actionTypes.GET_LIST:
    return {
      ...state,
      list: action.list
    }
    default:
      return state;
  }
}

export default reducerAction