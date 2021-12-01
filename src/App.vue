<template>
  <div id="app">
    <application/>
    <!-- 通过isRouterAlive参数控制router-view的显隐，来实现vue主动刷新页面及列表数据删除后的刷新方法reload;使用技术 provide / inject 组合 -->
    
   <router-view v-if="isRouterAlive"/>
  </div>
  
</template>
<script>

import Application from './layouts/application.vue'
import { ref } from "vue";
export default ({
  name: 'App',
  provide(){
    return {
      reload: this.reload
    }
  },
  compontents: {
    "application": Application
  },
  setup(){
    return {
      isRouterAlive: ref(true)
    }
  },
  methods: {
    reload (){
     // 声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
    
})
</script>

