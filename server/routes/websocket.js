var express = require("express");
var router = express.Router();
var expressWs = require("express-ws");


expressWs(router);  //将 express 实例上绑定 websocket 的一些方法

router.ws("/getsystem", function (ws, req) {
  ws.send("你连接成功了");
  ws.on("message", function (msg) {
    ws.send("pong" + msg);
  });
})
router.get('/getsystem', function(req, resp) {  // get方法
  resp.send('response')
});

module.exports = router;