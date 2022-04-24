var express = require("express");
var router = express.Router();
var expressWs = require("express-ws");


expressWs(router);  //将 express 实例上绑定 websocket 的一些方法
let list = []

router.ws("/getsystelist", function (ws, req) {
  if(req.query==='type=1'){ //login list 存当前用户信息
    ws.on("message", function (loginInfo) {
      console.log(loginInfo)
      const info = JSON.parse(loginInfo)
      list.push({...info,isu:true})
      ws.send(JSON.stringify(list));
    });
  }else if(req.query==='type=2'){ // 获取list
    ws.send(JSON.stringify(list));
  }else if(req.query==='type=3'){ //切换好友 存当前聊天好友
    ws.on("message", function (msg) {
      const peaple = JSON.parse(msg)
      list.forEach(v=>v.ischartting = false)
      peaple.ischartting = true
      ws.send(JSON.stringify(list));
    });
  }
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