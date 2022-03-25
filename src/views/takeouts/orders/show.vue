<template>

    <el-descriptions title="订单详情">
        <el-descriptions-item label="订单ID:">{{data.order.id}}</el-descriptions-item>
        <el-descriptions-item label="订单号:">{{data.order.order_no}}</el-descriptions-item>
        <el-descriptions-item label="订单状态:" :span="2">{{data.order.status_zh}}</el-descriptions-item>
        <el-descriptions-item label="送餐类型:">{{data.order.delivery_type}}</el-descriptions-item>
        <el-descriptions-item label="预订送餐时间:"></el-descriptions-item>
        <el-descriptions-item label="餐厅名称:">{{data.order.restaurant_name}}</el-descriptions-item>
        <el-descriptions-item label="餐盒/个:">{{data.order.tableware_count}}</el-descriptions-item>
        <el-descriptions-item label="餐具数量:">{{data.order.package_count}}</el-descriptions-item>
        <el-descriptions-item label="管理员备注:">{{data.order.admin_remark}}</el-descriptions-item>
        <el-descriptions-item label="订单备注者:">{{data.order.user_remark}}</el-descriptions-item>
        <el-descriptions-item label="备餐完成时间:"></el-descriptions-item>
        <el-descriptions-item label="创建时间:">
        {{data.order.created_at}}
        </el-descriptions-item>
    </el-descriptions>


    <el-descriptions title="送餐信息" v-if="data.order.delivery_info">
        <el-descriptions-item label="用户ID:">{{data.order.delivery_info.user_id}}</el-descriptions-item>
        <el-descriptions-item label="用户昵称:">{{data.order.delivery_info.user_realname}}</el-descriptions-item>
        <el-descriptions-item label="收货人:" :span="2">{{data.order.delivery_info.user_realname}}</el-descriptions-item>
        <el-descriptions-item label="收货电话:">{{data.order.delivery_info.user_phone}}</el-descriptions-item>
        <el-descriptions-item label="收货地址:">{{data.order.delivery_info.address}}</el-descriptions-item>
        <el-descriptions-item label="送餐员ID:">{{data.order.delivery_info.deliveryer_id}}</el-descriptions-item>
        <el-descriptions-item label="送餐员类型:">{{data.order.delivery_info.deliveryer_type}}</el-descriptions-item>
        <el-descriptions-item label="送餐员姓名:">{{data.order.delivery_info.deliveryer_name}}</el-descriptions-item>
        <el-descriptions-item label="送餐员电话:">{{data.order.delivery_info.deliveryer_mobile}}</el-descriptions-item>
        <el-descriptions-item label="送餐员派单时间:">{{data.order.delivery_info.arrange_deliveryer_at}}</el-descriptions-item>
        <el-descriptions-item label="送餐员取餐时间:">{{data.order.delivery_info.deliveryer_received_order_at}}</el-descriptions-item>
        <el-descriptions-item label="送达时间:">{{data.order.delivery_info.meal_finished_at}} </el-descriptions-item>
    </el-descriptions>


    <!-- 订单的餐点列表 -->
    <el-table :data="data.order.order_foods" style="width: 100%">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="name" label="餐点名称" width="120" />
    <el-table-column prop="status" label="状态"/>
    <el-table-column prop="amount" label="总价" />
    <el-table-column prop="price" label="餐点单价"/>
    <el-table-column prop="count" label="餐点数量"/>
    <el-table-column prop="package_amount" label="打包费总额" width="120"/>
    <el-table-column prop="refund_price" label="退款金额"/>
    <el-table-column prop="refund_num" label="退款数量"/>
    <el-table-column prop="refund_apply_at" label="退款时间"/>
    <el-table-column prop="taste_names" label="口味"/>

    <el-table-column fixed="right" label="操作" width="120">
      <template #default>
        <el-button type="text" size="small">退款</el-button>
      </template>
    </el-table-column>
  </el-table>


</template>

<script>
import { reactive } from "@vue/reactivity"
import request from "@/utils/request"
import {useRouter} from "vue-router";

export default({
    name: "takeoutOrderShow",
    setup(){
        const router = useRouter()
        const data = reactive({
            order: {id: router.currentRoute.value.query.orderId}
        })
        return {
            data,
        }
    },

    mounted() {
        //loaded 用于表征是否已经读取后端接口加载数据
        //我们在 mounted 钩子函数中对首页文章列表数据进行初始化（此时对应的生命周期节点是 Vue 组件挂载成功之后，模型数据渲染之前），如果还没有读取后端接口加载数据，则调用 methods 方法列表中定义的 getAdminList 方法加载数据。
        if (!this.loaded) {
          this.getOrderShow()
        }
    
    },

    methods: {
            getOrderShow(){
                request({
                        url: "/takeouts/orders/show",
                        method: "get",
                        params: {orderId: this.data.order.id}
                    }).then((response)=>{
                            this.data.order= response.data
                    })
            } 
        }

})
</script>

