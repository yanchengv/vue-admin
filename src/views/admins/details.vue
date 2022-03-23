<template>
    <el-descriptions
    title="用户详情"
    :column="4"
    direction="vertical"
  >
    <el-descriptions-item label="用户ID">{{data.admin.id}}</el-descriptions-item>
    <el-descriptions-item label="用户昵称">{{data.admin.nickname}}</el-descriptions-item>
    <el-descriptions-item label="姓名" :span="2">{{data.admin.name}}</el-descriptions-item>
    <el-descriptions-item label="创建时间">
      {{data.admin.createdAt}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import { reactive } from 'vue';
import request from "@/utils/request";
import {useRouter} from "vue-router";
export default ({
    name: "AdminDetails",
    setup() {
        const router = useRouter()
        const data = reactive({
            admin: {id: router.currentRoute.value.params.id},
        })
        return {
            data,
        }
    },

    mounted() {
        request({
            url: "/admins/details",   
            method: "get",
            params: {"id": this.data.admin.id},

        }).then((response)=>{
            this.data.admin = response.data;
        })
    }
})
</script>
