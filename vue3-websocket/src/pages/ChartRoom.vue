<template>
  <div class="chart-room-page">
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
})
</script>

<style lang="css">
  .chart-room-page{
    border: 1px solid #ccc;
    width:700px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    display: flex
  }
</style>