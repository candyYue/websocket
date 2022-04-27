<template>
  <ul class="friend-list">
    <p>好友列表</p>
    <li v-for="(item,index) in store.state.siderlist" :key="index"
     @click="changeFriend(item)">
      {{item.name}}{{item.ischart}}
    </li>
  </ul>
</template>

<script setup>
import { reactive, toRefs ,onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const changeFriend = (item)=>{
  const opt = {
    type:'change',
    list: [item]
  }
  store.state.socket.send(JSON.stringify(opt))
}

</script>

<style lang="css">
.friend-list{
  width: 200px;
  height: 100%;
}
</style>