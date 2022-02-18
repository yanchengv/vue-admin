<template>
  <el-table :data="data.tableData">
    <el-table-column prop="id" label="ID"> </el-table-column>
    <el-table-column prop="nickname" label="名称" > </el-table-column>
    <el-table-column prop="name" label="真实姓名"></el-table-column>
    <el-table-column prop="phone" label="手机号"></el-table-column>
    <el-table-column prop="created_at" label="创建时间"> </el-table-column>

  </el-table>
    <el-pagination background layout="prev, pager, next" :total="data.totalNum" :page-size="data.pagesize" v-model:currentPage="data.currentPage"
  @current-change="handleCurrentPage">
  </el-pagination>
</template>

<script>
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
      currentPage: 1,
      pagesize: 20,
      totalNum: 1, 
    });
    // 暴露给 template
    return {
      data
    }
  },
  mounted() {
     //loaded 用于表征是否已经读取后端接口加载数据
      //我们在 mounted 钩子函数中对首页文章列表数据进行初始化（此时对应的生命周期节点是 Vue 组件挂载成功之后，模型数据渲染之前），如果还没有读取后端接口加载数据，则调用 methods 方法列表中定义的 getAdminList 方法加载数据。
        if (!this.loaded) {
          this.getAllUsers()
        }
  },
  methods: {
    getAllUsers(){
      request({
        url: "users/getAllUsers/",
        method: "get",
        params: {page: this.data.currentPage,pageSize: this.data.pagesize}

      }).then((response)=>{
        this.data.tableData = response.data.list
        this.data.totalNum = response.data.total
      })
    },
    //监听当前页码值改变的事件
    handleCurrentPage(newPage){
        this.page = newPage
        this.getAllUsers()
    },
  }
};
</script>
