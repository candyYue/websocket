import store from "../store";
class Ws {
  constructor(url){
    this.ws = new WebSocket(url)
    this.url = url
    // 心跳检测
    this.heartbeatTimer = null;
    this.receiveTimer = null;
  }
  initWs(){
    // 连接成功, 开始通讯
    this.ws.onopen = () => {
      // this.checkHeartbeat();
      console.log('socket is open')
      const uerInfo = localStorage.getItem('uerInfo')
      this.send(JSON.stringify(JSON.parse(uerInfo)))
    }
    // 客户端接收服务端发送的消息
    this.ws.onmessage = (event) => {
      console.log('接受服务器信息', event);
    }
    // 连接关闭后的回调函数
    this.ws.onclose = (event) => {
      console.log('已断开连接', event)
    }
    // 捕获错误
    this.ws.onerror = () => {
      console.log('出错了');
    }
  }
  close(){
    this.send(JSON.stringify({ type: 'LOGOUT', data: this.getUserInfo() }));
    this.ws.close();
  }
  send(val){
    if(this.ws.readyState === this.ws.OPEN){
      this.ws.send(val)
    }
  }

  getUserInfo() {
    const userInfo = store.getState()
    console.log(userInfo)
    return userInfo? userInfo : undefined;
  }

  //心跳包
  checkHeartbeat(){
    this.heartbeatTimer = setTimeout(()=>{
      this.send(JSON.stringify({ type: 'PING', data: 'ping' }));
      this.receiveTimer = setTimeout(()=>{
        this.ws.close();
      },20000)
    },20000)
  }
  resetHeartbeat(){
    this.heartbeatTimer&&clearTimeout(this.heartbeatTimer)
    this.receiveTimer&&clearTimeout(this.receiveTimer)
    this.checkHeartbeat()
  }
}
export default Ws