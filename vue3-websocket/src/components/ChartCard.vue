<template>
  <div class="chart-card">
    <p>我是{{store.state.userInfo?store.state.userInfo.name:''}}</p>
    <div class="card-top">
      <p class="card-top-name">正在跟{{ store.state.friendInfo?store.state.friendInfo.name:''}}聊天</p>
      <ul class="card-top-message" v-for="(item,index) in chartContent" :key="index">
        <li :class="item.name===store.state.userInfo.name?'u-item':'f-item'">{{item.name}}:{{item.message}}</li>
      </ul>
    </div>
    <div class="card-bottom">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          @keyup.enter.native="sendMessage"
          v-model="textarea">
        </el-input>
        <!-- <picker @select="addEmoji" /> -->
    </div>
  </div>
</template>

<script setup>
import { ref ,reactive,watch ,onMounted} from "vue";
import { useStore } from 'vuex'
import { Picker } from "emoji-mart-vue";
const textarea = ref('')
const chartContent = ref([])
const store = useStore()
watch(
  () => store.state.userlist,
  (val) => {
    const item = store&&store.state.userInfo?val.filter(v=>store.state.userInfo.name===v.name):[]
    if(item&&item.length&&item[0].message){
      chartContent.value = item[0].message[store.state.friendInfo.name]||[]
    }
  },
  { deep: true }
)
const addEmoji = ()=>{

}
const sendMessage = ()=>{
  const opt = {
    type:'message',
    message: textarea.value
  }
  store.state.socket.send(JSON.stringify(opt))
  textarea.value = ''
}
onMounted(()=>{
})
</script>

<style lang="css">
.chart-card{
  width: 500px;
  border-left:1px solid #ccc;
  height: 100%;
}
.card-top{
  height: 100%;
  width: 100%;
  margin-bottom: 115px;
}
.card-top-name{
  height:65px
}
.u-item{
  text-align: right;
}
.f-item{
  text-align: left;
}
.card-bottom{
  position: absolute;
  bottom: 0;
  right: 0;
  left: 200px;
}
</style>