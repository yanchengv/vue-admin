<template>
    <el-descriptions
    title="用户详情"
    :column="4"
    direction="vertical"
  >
    <el-descriptions-item label="用户ID">{{data.user.id}}</el-descriptions-item>
    <el-descriptions-item label="用户昵称">{{data.user.nickname}}</el-descriptions-item>
    <el-descriptions-item label="姓名" :span="2">{{data.user.name}}</el-descriptions-item>
    <el-descriptions-item label="用户邮箱">{{data.user.email}}</el-descriptions-item>
    <el-descriptions-item label="用户状态">{{data.user.status}}</el-descriptions-item>
    <el-descriptions-item label="创建时间">
      {{data.user.createdAt}}
    </el-descriptions-item>
  </el-descriptions>

  <el-table :data="data.cards" height="500" style="width: 100%">
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="card_no" label="支付卡号" width="120" />
    <el-table-column prop="card_type" label="卡类型" />
    <el-table-column prop="card_level" label="卡级别" />
    <el-table-column prop="is_supplement_card" label="主卡/副卡" width="100"/>
    <el-table-column prop="realname" label="真实姓名" />
    <el-table-column prop="id_type" label="证件类型" />
    <el-table-column prop="id_number" label="证件号" />
    <el-table-column prop="mobile" label="手机号" width="120"/>
    <el-table-column prop="lvyun_card_id" label="支付卡ID" />
    <el-table-column prop="lvyun_member_id" label="会员ID" />
    <el-table-column prop="lvyun_mem_created_at" label="会员创建时间" />
    <el-table-column prop="created_at" label="绑卡时间" />
  </el-table>
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
            user: {id: router.currentRoute.value.query.id},
            cards: []
        })
        return {
            data,
        }
    },
    mounted(){
        request({
            url: "/users/getUserDetails",
            method: "get",
            params: {id: this.data.user.id}
        }).then((response)=>{
            this.data.user = response.data
            this.data.cards = response.data.userCards
        })
    } 

})
</script>