<template>
  <ul>
    <li v-for="(item,index) in store.state.userlist" :key="index"
     @click="changeFriend(item)">
      {{item.name}}
    </li>
  </ul>
</template>

<script setup>
import { reactive, toRefs ,onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const changeFriend = (item)=>{
  item.ischart = true
  const opt = {
    type:'change',
    list: [item]
  }
  store.state.socket.send(JSON.stringify(opt))
}

</script>

<style lang="scss">

</style>