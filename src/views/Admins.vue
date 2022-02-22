<template>
  <el-table :data="data.tableData">
    <el-table-column prop="id" label="ID" width="140"> </el-table-column>
    <el-table-column prop="nickname" label="昵称" width="120"> </el-table-column>
     <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
     <el-table-column prop="mobile" label="手机号" width="120"> </el-table-column>
    <el-table-column prop="createdAt" label="创建时间"> </el-table-column>

    <el-table-column fixed="right" label="操作" width="120">
      <template #default="item">
        <el-button type="text" size="small" @click="handleDetailBtn(item.row)">详情</el-button>
        <el-button type="text" size="small" @click="handleEditBtn(item.row)">修改</el-button>
        
      </template>
    </el-table-column>

  </el-table>
  <el-pagination background layout="prev, pager, next" :total="data.totalNum" :page-size="data.pagesize" v-model:currentPage="data.currentPage"
  @current-change="handleCurrentPage">
  </el-pagination>


  <!--修改弹框-->
  <el-dialog v-model="adminUpdateDialog" title="修改" width="50%" destroy-on-close center>
      <el-form  label-width="100px" :model="updateAdminModalForm">
        <el-form-item label="用户名">
          <el-input v-model="updateAdminModalForm.nickname"></el-input>
        </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="updateAdminModalForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="updateAdminModalForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="updateAdminModalForm.email"></el-input>
      </el-form-item>
      <el-input type= "hidden" v-model="updateAdminModalForm.id"></el-input>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="adminUpdateDialog = false">取消</el-button>
        <el-button type="primary" @click="hadleUpdateAdminSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>


</template>

<script>
import { ref, reactive  } from "vue";
import request from "../utils/request";
import { ElMessage } from "element-plus";
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
      data,
      adminUpdateDialog: ref(false),
      updateAdminModalForm: reactive({
        id: "",
        name: [
          {
            required: true,
            message: "请输入真实姓名",
          }
        ],
        nickname: "",
        mobile: "",
        email: ""
      })
    }
  },

  mounted() {
        //loaded 用于表征是否已经读取后端接口加载数据
        //我们在 mounted 钩子函数中对首页文章列表数据进行初始化（此时对应的生命周期节点是 Vue 组件挂载成功之后，模型数据渲染之前），如果还没有读取后端接口加载数据，则调用 methods 方法列表中定义的 getAdminList 方法加载数据。
        if (!this.loaded) {
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

      handleEditBtn(row){
        this.adminUpdateDialog = true
        this.updateAdminModalForm.id = row.id
        this.updateAdminModalForm.name = row.name
        this.updateAdminModalForm.nickname = row.nickname
        this.updateAdminModalForm.mobile = row.mobile
        this.updateAdminModalForm.email = row.email
      },

      handleDetailBtn(row){
          this.$router.push({
            name: 'AdminDetails',
            params: {
              id: row.id,
            },
          })
      },

      hadleUpdateAdminSubmit(){
          request({
            url: "/admins/update",
            method: "post",
            data: {id: this.updateAdminModalForm.id,name: this.updateAdminModalForm.name,nickname: this.updateAdminModalForm.nickname,
            phone: this.updateAdminModalForm.mobile,email: this.updateAdminModalForm.email},

          }).then((response)=>{
             this.getAdminList()
            this.adminUpdateDialog = false
            let type = "error"
            if(response.code == 200){
              type = "success"
            }
            ElMessage({
                message: response.msg,
                type: type
             })
          })
      }

    }
};
</script>
