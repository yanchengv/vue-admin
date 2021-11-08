<template>
  <div id="app">
    <application/>
   <router-view/>
  </div>
  
</template>
<script>

import Application from './layouts/application.vue'
export default ({
  name: 'App',
  compontents: {
    "application": Application
  }
    
})
</script>

