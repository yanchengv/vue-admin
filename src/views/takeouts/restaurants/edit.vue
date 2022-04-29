<template>
    <el-form :model="form" label-width="150px">
        <el-form-item label="名称">
            <el-input v-model="form.data.name" />
        </el-form-item>
        <el-form-item label="服务电话">
            <el-input v-model="form.data.phone" />
        </el-form-item>
        <el-form-item label="最快送达时间/分钟">
            <el-input v-model="form.data.deliveryFastestTime" />
        </el-form-item>
        <el-form-item label="最慢送达时间/分钟">
            <el-input v-model="form.data.deliverySlowestTime" />
        </el-form-item>
        <el-form-item label="所属城市">
            <el-select v-model="form.data.regionCode" placeholder="请选择" name="regionCode" size="large">
                <el-option
                v-for="item in form.data.appRegionList"
                :key="item.id"
                :label="item.value"
                :value="item.id" />
            
            </el-select>
        </el-form-item>

        <el-form-item label="公司">
            <el-select v-model="form.data.companyId" name="companyId" @change="getDepartmentsByCompany($event,1)" clearable placeholder="请选择公司" filterable>
                <el-option v-for="item in form.company" :label="item.name" :key="item.id" :value="item.id"></el-option>
            </el-select>
         </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="form.data.departmentId" name="departmentId" clearable placeholder="请选择部门" filterable>
            <el-option v-for="item in form.departments" :label="item.name" :key="item.id" :value="item.id"></el-option>
            </el-select>
        </el-form-item>


        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { reactive } from "vue";
import {useRouter} from "vue-router";
import request from "@/utils/request";
import { ElMessage } from "element-plus";
export default {
    name: "TakeoutRestaurantEdit",
    setup() {
        const router = useRouter()
        const form = reactive({
            data: {
                id: router.currentRoute.value.query.rid,
                name: "",
                phone: "",
                deliveryFastestTime: "",
                deliverySlowestTime: "",
                appRegionList: [],
                regionCode: "",
                companyId: "",
                departmentId: "",
            },
            company: [],
            departments: [],
      });

      return {
          form,
      }
    },

    mounted() {
        //loaded 用于表征是否已经读取后端接口加载数据
        //我们在 mounted 钩子函数中对首页文章列表数据进行初始化（此时对应的生命周期节点是 Vue 组件挂载成功之后，模型数据渲染之前），如果还没有读取后端接口加载数据，则调用 methods 方法列表中定义的 getAdminList 方法加载数据。
        if (!this.loaded) {
          this.getRestaurant()
          this.getAllCompany()
        }
    
    },

    methods: {
        getRestaurant(){
            request({
                url: "takeouts/restaurants/show",
                method: "get",
                params: {id: this.form.data.id}
            }).then((response)=>{
                this.form.data = response.data
                this.regionCodeSelectValue = response.data.regionCode
                this.getDepartmentsByCompany(response.data.companyId,2)
            })
        },
        getAllCompany(){
            request({
                url: "companies/index",
                method: "get"
            }).then((response)=>{
                this.form.company = response.data
            })    
        },

        getDepartmentsByCompany(companyId,type){
            if(type == 1){
                this.form.data.departmentId =  ""
            }
            request({
                    url: "companies/get_departments_by_company",
                    method: "get",
                     params: {companyId: companyId}
                }).then((response)=>{
                    this.form.departments = response.data
                })    
        },
        onSubmit(){
            request({
                url: "takeouts/restaurants/update",
                method: "post",
                data: {id: this.form.data.id,name: this.form.data.name,deliveryFastestTime: this.form.data.deliveryFastestTime,
                deliverySlowestTime: this.form.data.deliverySlowestTime,phone: this.form.data.phone,
                regionCode: this.form.data.regionCode,companyId: this.form.data.companyId,departmentId: this.form.data.departmentId}
            }).then((response)=>{
                this.form.data = response.data
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
}
</script>
