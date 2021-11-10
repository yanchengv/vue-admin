<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <side-menu></side-menu>
    <el-container>
       <el-header style="text-align: right; font-size: 12px">
        <web-header></web-header>
      </el-header>
      <el-main>
          <router-view/>
          <!-- 添加内容 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import sideMenu from './comments/sideMenu.vue'
import Header from './comments/header.vue'
export default ({
  name: "application",
  components: {
    "side-menu": sideMenu,
    "web-header": Header
  },
  setup() {

  },
})
</script>
