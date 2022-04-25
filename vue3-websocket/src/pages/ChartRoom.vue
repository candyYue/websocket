<template>
  <div>
    <FriendList/>
    <chart-card/>
  </div>
</template>

<script setup>
import Ws from "../socket";
import { reactive, toRefs ,onMounted } from 'vue'
import { useStore } from 'vuex'
import FriendList from '../components/FriendList.vue'
import ChartCard from '../components/ChartCard.vue'
const store = useStore()

onMounted(()=>{
  console.log(store)
})
</script>

<style lang="scss" scoped>

</style>