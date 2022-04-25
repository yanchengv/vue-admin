<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['']" router>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><message /></el-icon>用户管理
        </template>
         <el-menu-item index="/admins">管理员列表</el-menu-item>
        <el-menu-item index="/users">用户列表</el-menu-item>
        <el-menu-item index="/about">关于我们</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><icon-menu /></el-icon>外卖管理
        </template>
        <el-menu-item index="/takeouts/orders/index">订单管理</el-menu-item>
        <el-menu-item index="/takeouts/restaurants/index">餐厅管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><setting /></el-icon>设置
        </template>
        <el-menu-item index="">系统设置</el-menu-item>
        <el-menu-item index="">权限设置</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import { Message, Menu, Setting } from "@element-plus/icons";

export default {
  name: "sideMenu",
  components: {
    Message,
    Setting,
    "icon-menu": Menu,
  },
};
</script>

<style>
.el-aside {
  color: var(--el-text-color-primary);
}
</style>

