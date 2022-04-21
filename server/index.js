import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const app = express();

const send = (ws, data) => { // 向客户端发送消息
  ws.send(JSON.stringify(data));
}

const broadcast = (data) => { // 向所有客户端广播消息
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      send(client, data);
    }
  });
}

wss.on('open', () => { // 连接成功的回调函数
  console.log('connected');
});

wss.on('close', () => { // 连接关闭的回调函数
  console.log('disconnected');
});

wss.on('connection', (ws) => { 
  ws.on('message', (message) => {
    // 接收客户端发的消息
  });
});

app.listen(3000, () => {
  console.log('Start Service On 3000');
});