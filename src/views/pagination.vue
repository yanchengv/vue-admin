
<template>
    <el-pagination
    background
    layout="prev, pager, next"
    :page-size="20"
    :current-page="this.currentpage"
     @current-change="setPage">
</el-pagination>
</template>

<script>

export default ({
    name: "pagination",
    props: {
        pagesize: {Number,String,default: 100},//一页多少条
        currentpage: {Number,String,default: 2},//当前页
        total: [Number,String],//总页数
        options: [Object],//分页发生变化赋值给options
        render:[Function],//跳转触发的请求
    },
    data() {
            return {
                 currentpage: 1
            }
    },
    
    methods: {
        setPage (val) {
            this.page = val
        }
    },
    setup() {
        

    },
})
</script>
