<template>
    <el-table :data="data.tableData">
     <el-table-column prop="id" label="ID" width="80"> </el-table-column>
     <el-table-column prop="order_no" label="订单编号" width="180"> </el-table-column>
     <el-table-column prop="amount" label="总价" width="80"> </el-table-column>
     <el-table-column prop="status_zh" label="状态" width="80"> </el-table-column>
     <el-table-column prop="delivery_type" label="送餐类型"> </el-table-column>
     <el-table-column prop="restaurant_name" label="餐厅名称"> </el-table-column>
     <el-table-column prop="u_nickname" label="用户"/>
     <el-table-column prop="booking_address" label="送餐地址" width="150"/>
     <el-table-column prop="created_at" label="下单时间" width="150"> </el-table-column>

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
export default {
    name: 'TakoutOrder',
    setup() {
      const data = reactive({
        tableData: [],
        currentPage: 1,
        pagesize: 10,
        totalNum: 1, 
      });

      return {
          data
      }
    },

    mounted() {
     //loaded 用于表征是否已经读取后端接口加载数据
      //我们在 mounted 钩子函数中对首页文章列表数据进行初始化（此时对应的生命周期节点是 Vue 组件挂载成功之后，模型数据渲染之前），如果还没有读取后端接口加载数据，则调用 methods 方法列表中定义的 getAdminList 方法加载数据。
        if (!this.loaded) {
          this.getAllOrders()
        }
  },

    methods: {
      getAllOrders(){
        request({
          url: "takeouts/orders/index",
          method: "get",
          params:{page: this.data.currentPage,pageSize: this.data.pagesize},
        }).then((response)=>{
          this.data.tableData = response.data.list
          this.data.totalNum = response.data.total
        }
        )
      },

      handleDetailBtn(row){
          this.$router.push({
            path: '/takeouts/orders/show',
            query: {
              orderId: row.id,
            },
          })
      },


      //监听当前页码值改变的事件
      handleCurrentPage(newPage){
        this.data.currentPage = newPage
        this.getAllOrders()
      },
    }
}
</script>
