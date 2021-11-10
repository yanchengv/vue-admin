<template>
  <el-table :data="data.tableData">
    <el-table-column prop="id" label="ID" width="140"> </el-table-column>
    <el-table-column prop="name" label="名称" width="120"> </el-table-column>
    <el-table-column prop="created_at" label="创建时间"> </el-table-column>
  </el-table>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
 import {  reactive  } from "vue";
import request from "../utils/request";
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
};
</script>
