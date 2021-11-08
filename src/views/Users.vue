<template>
  <el-table :data="tableData">
    <el-table-column prop="date" label="Date" width="140"> </el-table-column>
    <el-table-column prop="name" label="Name" width="120"> </el-table-column>
    <el-table-column prop="address" label="Address"> </el-table-column>
  </el-table>
</template>

<script>
import { ref } from "vue";
export default {
  name: "User",
  setup() {
    const item = {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Gsrove St, Los Angeles",
    };
    
    const tableData = ref(Array(1).fill(item));

    return {
      tableData,
    };
  },
};
</script>
