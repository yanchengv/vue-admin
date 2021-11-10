<template>
  <el-table :data="data.tableData" height="600" style="width: 100%">
    <el-table-column  prop="id" label="ID" width="100"> </el-table-column>
    <el-table-column prop="name" label="名称" width="100"> </el-table-column>
    <el-table-column  prop="created_at" label="创建时间"> </el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
      <template #default>
        <el-button type="text" size="small" @click="handleClick">详情</el-button>
        <el-button type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">新增</el-button>
      </template>
    </el-table-column>
  </el-table>
  
</template>

<script>
import { onMounted } from "@vue/runtime-core";
 import {  reactive  } from "vue";
import request from "@/utils/request.js";
export default {
  name: "User",
  setup() {
    // const item = {
    //   date: "2016-05-02",
    //   name: "Tom",
    //   address: "No. 189, Gsrove St, Los Angeles",
    // };
    // const tableData = ref(Array(1).fill(item));
    const data = reactive({
      tableData: [],
    });
    onMounted(() => {
      request({
        url: "admin/tags/",
        method: "get",
        params: {},
      }).then(function(response){
        data.tableData = response.data
      })
     
     
    });
    // 暴露给 template
    return {
      data
    }
  },
  methods: {
    handleClick() {
      console.log('click')
    },
  },
};
</script>
