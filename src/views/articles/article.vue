<template>
  <el-table :data="data.articleData" height="600" style="width: 100%">
      <el-table-column prop="id" label="ID" width="150" />
    <el-table-column prop="title" label="标题" width="150" />
    <el-table-column prop="subtitle" label="子标题" width="120" />
    <el-table-column prop="status" label="状态" width="120" />
    <el-table-column prop="tag_id" label="标签ID" width="120" />
    <el-table-column prop="created_at" label="创建时间"/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default>
        <el-button type="text" size="small" @click="handleClick2">详情</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import request from "@/utils/request.js";
export default {
  setup(){
      const data = reactive({
          articleData: []
      });
      onMounted(()=>{
          request({
              url: "/admin/articles/",
              method: "get",
              params: {}
          }).then(function(response){
              data.articleData = response.data
          })
      });
      return {
          data
      }
  },
  methods: {
    handleClick2() {
      alert("点击成功")
    },
  },
}
</script>
