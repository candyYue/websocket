var express = require("express");
var router = express.Router();
var expressWs = require("express-ws");


expressWs(router);  //将 express 实例上绑定 websocket 的一些方法

let clients = []
let list = []

const broadcast = (type,opt={}) => { // 向所有客户端广播消息
  clients.forEach((client) => {
    let opts = {}
    if(opt.loginInfo&&client.loginInfo&&(opt.loginInfo.name!==client.loginInfo.name)){
      opts = {}
    }else if(opt.friendInfo&&client.friendInfo&&(opt.friendInfo.name!==client.friendInfo.name)){
      opts = {}
    }else {
      opts = opt
    }
    client.send(JSON.stringify({
      type,
      list,
      opt:opts
    }));
  });
}
const addUserInfo = (ws,val)=>{
  const loginInfo = val.list[0]
  const check = list.filter(v=>v.name===loginInfo.name)
  if(check&&check.length){
    broadcast('UPDATE_USER_LIST')
  }else{
    ws.loginInfo = loginInfo
    list.push(loginInfo)
    broadcast('UPDATE_USER_LIST', { loginInfo })
  } 
}
const changefriend = (ws,val)=>{
  const friendInfo = val.list[0]
  ws.friendInfo = friendInfo
  broadcast('UPDATE_USER_LIST', { friendInfo })
}
const addMessage = (ws,val)=>{
  //ws.friendInfo 当前聊天对象
  list.forEach((v,index)=>{
    v.message = v.message || {}
    v.message[ws.loginInfo.name] = v.message[ws.loginInfo.name] || []
    v.message[ws.friendInfo.name] = v.message[ws.friendInfo.name] || []
    if(ws.friendInfo&&v.name===ws.friendInfo.name){
      v.message[ws.loginInfo.name]= [...v.message[ws.loginInfo.name], {name:ws.loginInfo.name, message:val}]
    }
    if(ws.loginInfo&&v.name===ws.loginInfo.name){
      v.message[ws.friendInfo.name] = [...v.message[ws.friendInfo.name], {name:v.name, message:val}]
    }
  })
  clients.forEach((client) => {
    client.send(JSON.stringify({
      type:'UPDATE_MESSAGE_LIST',
      list
    }));
  });
}
router.ws("/getsystelist", function (ws, req) {
  clients.push(ws)
  ws.on("message", function (msg) {
    const data = JSON.parse(msg)
    switch (data.type) {
      case 'login':
        addUserInfo(ws,data);//存当前用户信息
        break;
      case 'getlist':
        sendList(ws)// 获取list
        break;
      case 'change': //切换好友 存当前聊天好友
        changefriend(ws,data)
        break;
      case 'message': //存当前聊天好友信息
        addMessage(ws,data.message)
        break;
    }
  });
})

// router.ws("/getMessage", function (ws, req) {
//   ws.on("message", function (msg) {
//     ws.send("pong" + msg);
//   });
//   ws.send("服务器返回信息：你连接成功了");
// })
router.get('/getsystem', function(req, resp) {  // get方法
  resp.send('response')
});

module.exports = router;