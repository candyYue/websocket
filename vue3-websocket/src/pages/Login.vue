<template>
  <div class="login-page">
    <el-form ref="form" :model="loginForm" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.pwd"></el-input>
      </el-form-item>
      <el-button @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { reactive, toRefs ,onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Ws from "../socket";
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    onMounted(()=>{
      store.dispatch('getSocket', new Ws('ws://localhost:3131/websocket/getsystelist'))
      store.state.socket.initWs()
    })
    const route = useRoute()
    const router = useRouter()
    const loginForm = reactive({
      name: '',
      pwd:''
    })
    const handleLogin = ()=>{
      // console.log(route)
      const opt = {
        type:'login',
        list: [{
          name:loginForm.name,
          pwd:loginForm.pwd
        }]
      }
      store.state.socket.send(JSON.stringify(opt))
      const list = store.state.userlist
      const check = list.filter(v=>v.name===loginForm.name)
      if(check&&check.length){
        return false
      }else{
        router.push({name:'chartroom'})
      }
    }
    return {
      loginForm,
      handleLogin
    }
  }
}
</script>

<style lang="css">
  .login-page{
    width:500px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
  }
</style>