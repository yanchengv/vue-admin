<template>
  <el-button @click="addTagModalVisible = true">新增标签</el-button>
  <el-table :data="data.tableData" height="600" style="width: 100%">
    <el-table-column prop="id" label="ID" width="100"> </el-table-column>
    <el-table-column prop="name" label="名称" width="100"> </el-table-column>
    <el-table-column prop="created_at" label="创建时间"> </el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="item">
        <el-button type="text" size="small">详情</el-button>
        <el-button type="text" size="small"
          @click="handleUpdateClickBtn(item.row)"
        >编辑</el-button>
        <el-button
          type="text"
          size="small"
          @click="handleDeleteClickBtn(item.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="addTagModalVisible"
    title="新增标签"
    width="50%"
    destroy-on-close
    center
  >
    <el-form label-width="100px" :model="addTagModalForm">
      <el-form-item label="名称">
        <el-input v-model="addTagModalForm.name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addTagModalVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddTagBtn">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="tagDeleteDialog" title="删除" width="30%">
    <span>删除标签</span>
    <el-form label-width="100px" :model="deleteTagDialogForm">
      <el-input type= "hidden" v-model="deleteTagDialogForm.id"></el-input>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="tagDeleteDialog = false">取消</el-button>
        <el-button type="primary" @click="hadleDeleteTagConfirm"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="tagUpdateDialog" title="修改" width="50%" destroy-on-close center>
      <el-form label-width="100px" :model="updateTagModalForm">
      <el-form-item label="名称">
        <el-input v-model="updateTagModalForm.name"></el-input>
      </el-form-item>
      <el-input type= "hidden" v-model="updateTagModalForm.id"></el-input>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addTagModalVisible = false">取消</el-button>
        <el-button type="primary" @click="hadleUpdateTagSave">确定</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import request from "@/utils/request.js";
export default {
  name: "User",
  inject: ["reload"], //注入App.vue页面中的reload方法
  setup() {
    const data = reactive({
      tableData: [],
    });
    onMounted(() => {
      request({
        url: "admin/tags/",
        method: "get",
        params: {},
      }).then(function (response) {
        data.tableData = response.data;
      });
    });
    // 暴露给 template
    return {
      data,
      addTagModalVisible: ref(false),
      tagDeleteDialog: ref(false),
      tagUpdateDialog: ref(false),
      deleteTagDialogForm: reactive({
        id: "",
      }),
      addTagModalForm: reactive({
        name: "",
      }),
      updateTagModalForm: reactive({
        id: "",
        name: ""
      })
    };
  },
  methods: {
    handleAddTagBtn() {
      request({
        url: "admin/tags/create",
        method: "post",
        data: { name: this.addTagModalForm.name },
      }).then((response) => {
        //关闭弹框
        this.addTagModalVisible = false;
        this.addTagModalForm.name = "";
        if (response.status == 200) {
          ElMessage({
            message: "创建成功",
            type: "success",
          });
        }
      });
    },
    handleDeleteClickBtn(tag_id) {
      this.tagDeleteDialog = true;
      this.deleteTagDialogForm.id = tag_id;
    },
    hadleDeleteTagConfirm() {
      request({
        url: "admin/tags/delete",
        method: "post",
        data: { id: this.deleteTagDialogForm.id },
      }).then((response) => {
        this.tagDeleteDialog = false;
        if (response.status == 200) {
          this.reload()
          ElMessage({
            message: "删除成功",
            type: "success",
          });
        }
      });
    },
    handleUpdateClickBtn(row){
      this.tagUpdateDialog = true;
      this.updateTagModalForm.id = row.id
      this.updateTagModalForm.name = row.name
    },
    hadleUpdateTagSave(){
      request({
        url: "admin/tags/update",
        method: "post",
        data: {id: this.updateTagModalForm.id,name: this.updateTagModalForm.name}
      }).then((response) => {
        this.tagUpdateDialog = false
        if(response.status == 200){
          ElMessage({
            message: "修改成功",
            type: "success"
          })
        }
      }) 
    }
  },
};
</script>
