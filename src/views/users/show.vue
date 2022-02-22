<template>
    <el-descriptions
    title="用户详情"
    :column="4"
    direction="vertical"
  >
    <el-descriptions-item label="用户ID">{{data.user.id}}</el-descriptions-item>
    <el-descriptions-item label="用户昵称">{{data.user.nickname}}</el-descriptions-item>
    <el-descriptions-item label="姓名" :span="2">{{data.user.name}}</el-descriptions-item>
    <el-descriptions-item label="创建时间">
      2022-01-01
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { useRouter } from "vue-router"
import request from "@/utils/request"

export default({
    name: "userDetails",
    setup(){
        let router = useRouter()
        const data = reactive({
            user: {id: router.currentRoute.value.params.id}
        })
        return {
            data,
        }
    },
    mounted(){
        request({
            url: "users/show",
            method: "get",
            params: {id: this.admin.id}
        }).then((response)=>{
            this.data.admin = response.data
        })
    } 

})
</script>