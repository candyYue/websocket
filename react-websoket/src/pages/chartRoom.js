import React, { useState, useEffect } from "react";

const connectWs = ()=>{
  var socket = new WebSocket('ws://localhost:3131/websocket/getsystem');
  socket.addEventListener('open', function (event) {
      console.log('socket is open')
  });

  socket.addEventListener('message', function (event) {
      console.log('Message from server', event.data);
  });
}
function ChartRoom(props) {

  useEffect(()=>{
    connectWs()
  },[]) //第一次调用

  return (
    <div>
      chartroom
    </div>
  )
}
export default ChartRoom;