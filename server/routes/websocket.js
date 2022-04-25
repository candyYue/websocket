var express = require("express");
var router = express.Router();
var expressWs = require("express-ws");


expressWs(router);  //将 express 实例上绑定 websocket 的一些方法
let list = []
const addUserInfo = (ws,val)=>{
  const user = val.list[0]
  user.islogin = true
  list.forEach(v=>v.islogin = false)
  list.push(user)
  ws.send(JSON.stringify(list));
}
const changefriend = (ws,val)=>{
  const friend = val.list[0]
  list.forEach(v=>{
    if(v.name===friend.name){
      v.ischart = true
    }else{
      v.ischart = false
    }
  })
  ws.send(JSON.stringify(list));
}
router.ws("/getsystelist", function (ws, req) {
  ws.on("message", function (msg) {
    console.log(msg)
    const data = JSON.parse(msg)
    switch (data.type) {
      case 'login':
        addUserInfo(ws,data);//存当前用户信息
        break;
      case 'getlist':
        ws.send(JSON.stringify(list));// 获取list
        break;
      case 'change': //切换好友 存当前聊天好友
        changefriend(ws,data)
        break;
    }
  });
    // ws.send(JSON.stringify(list))
    // ws.on("message", function (msg) {
    //   const peaple = JSON.parse(msg)
    //   list.forEach(v=>v.ischartting = false)
    //   peaple.ischartting = true
    //   ws.send(JSON.stringify(list));
    // });
})

router.ws("/getMessage", function (ws, req) {
  ws.on("message", function (msg) {
    ws.send("pong" + msg);
  });
  ws.send("服务器返回信息：你连接成功了");
})
router.get('/getsystem', function(req, resp) {  // get方法
  resp.send('response')
});

module.exports = router;