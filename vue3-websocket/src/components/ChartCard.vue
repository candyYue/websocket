<template>
  <div>
    <div class="card-top"></div>
    <div class="card-bottom">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        <!-- <picker @select="addEmoji" /> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { Picker } from "emoji-mart-vue";
const textarea = ref('')
const addEmoji = ()=>{

}
</script>

<style lang="scss">

</style>