<template>
    <el-table :data="data.tableData">
     <el-table-column prop="id" label="ID" width="80"> </el-table-column>
     <el-table-column prop="name" label="名称" width="180"> </el-table-column>
     <el-table-column prop="sort" label="排序" width="50"> </el-table-column>
     <el-table-column prop="regionCode" label="所属部门" width="120"> </el-table-column>
     <el-table-column prop="statusZh" label="状态"> </el-table-column>
     <el-table-column prop="deliveryFastestTime" label="最快送达"> </el-table-column>
     <el-table-column prop="deliverySlowestTime" label="最慢送达"/>
     <el-table-column prop="regionCode" label="所属城市" width="120"/>
     <el-table-column prop="createdAt" label="创建时间" width="180"> </el-table-column>

    <el-table-column fixed="right" label="操作" width="160">
      <template #default="item">
        <el-button type="text" size="small" @click="handleDetailBtn(item.row)">详情</el-button>
        <el-button type="text" size="small" @click="handleEditBtn(item.row)">修改</el-button>
        
      </template>
    </el-table-column>

  </el-table>

    <el-pagination background layout="prev, pager, next" :total="data.totalNum" :page-size="data.pagesize" v-model:currentPage="data.currentPage"
  @current-change="handleCurrentPage">
  </el-pagination>
</template>

<script>
import { reactive } from "vue";
import request from "@/utils/request";

export default ({
    name: "TakeoutRestaurant",
    setup() {
        const data = reactive({
            tableData: [],
            currentPage: 1,
            pagesize:10,
            totalNum: 1,
        })
        return {
            data,
        }
    },


    mounted(){
        //loaded 用于表征是否已经读取后端接口加载数据
        //我们在 mounted 钩子函数中对首页文章列表数据进行初始化（此时对应的生命周期节点是 Vue 组件挂载成功之后，模型数据渲染之前），如果还没有读取后端接口加载数据，则调用 methods 方法列表中定义的 getAdminList 方法加载数据。
        if (!this.loaded) {
          this.getAllRestaurants()
        }
    
    },

    methods:{
        getAllRestaurants(){
            request({
                url: "/takeouts/restaurants/index",
                method: "get",
                params: {page: this.data.currentPage,pagesize: this.data.pagesize},

            }).then((response)=>{
                this.data.tableData = response.data.list;
                this.data.totalNum = response.data.totalNum;
            })
        },

        //监听当前页码值改变的事件
      handleCurrentPage(newPage){
        this.data.currentPage = newPage
        this.getAllRestaurants()
      },

      handleEditBtn(row){
          this.$router.push({
            path: '/takeouts/restaurants/edit',
            query: {
              rid: row.id,
            },
          })
      },

    }
})
</script>
