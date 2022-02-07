<template>
  <el-table :data="data.tableData">
    <el-table-column prop="id" label="ID" width="140"> </el-table-column>
    <el-table-column prop="nickname" label="昵称" width="120"> </el-table-column>
     <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
     <el-table-column prop="mobile" label="手机号" width="120"> </el-table-column>
    <el-table-column prop="createdAt" label="创建时间"> </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="data.totalNum" :page-size="data.pagesize" v-model:currentPage="data.currentPage"
  @current-change="handleCurrentPage">
  </el-pagination>
</template>

<script>
import {  reactive  } from "vue";
import request from "../utils/request";
//import Pagination from "./pagination.vue"
export default {
  name: "Admin",
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
      pagesize: 10,
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
           console.log("mounted...")
        this.getAdminList()
        }
    
    },

  methods: {
    getAdminList(){

      request({
        url: "/admins/getAllAdmins",
        method: "get",
        params: {page: this.data.currentPage,limit: this.data.pagesize},
      }).then((response)=>{
        //在vue较多使用的是axios请求，请求后的回调函数中，this不能指向当前vue实例，打印出来是undefined;
        //(response)=>箭头函数内部的this是词法作用域,是由外层调用者vue来确定,使用箭头函数之后，箭头函数指向的函数内部的this已经绑定了外部的vue实例了
        this.data.tableData = response.data.list
        this.data.totalNum = response.data.total
      })
    },

    //监听当前页码值改变的事件
      handleCurrentPage(newPage){
        this.data.currentPage = newPage
        this.getAdminList()
      },

    }
};
</script>
