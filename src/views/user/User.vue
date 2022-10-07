<template>
  <div class="user-header">
    <el-button type="primary" @click="openDialog">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="headerSerch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="tableData" style="width: 100%" height="700">
      <el-table-column
        v-for="(v, i) in tableLabrl"
        :key="i"
        :prop="v.prop"
        :label="v.label"
        :width="v.width || '200'"
      />
      <el-table-column fixed="right" label="操作" width="auto">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click.prevent="editUser(scope)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="hadnleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      class="pager mt-4"
      :total="config.total"
      @current-change="changePage"
    />
  </div>

  <el-dialog
    v-model="dialogFormVisible"
    :title="cation == 'add' ? '新增用户' : '修改用户'"
    :before-close="handleClose"
    width="40%"
  >
    <el-form :model="formUser" ref="userForm">
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item
            label="姓名"
            prop="name"
            :rules="[{ required: true, message: '姓名是必填项' }]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="年龄"
            prop="age"
            :rules="[
              { required: true, message: '年龄是必填项' },
              { type: 'number', message: '年龄必须是数字' },
            ]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item
            label="性别"
            prop="sex"
            :rules="[{ required: true, message: '性别是必选项' }]"
          >
            <el-select v-model="formUser.sex" placeholder="请选择性别">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="出生日期"
            prop="birth"
            :rules="[{ required: true, message: '出生日期是必选项' }]"
          >
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              label="出生日期"
              placeholder="请输入出生日期"
              style="width: 100%"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item
            label="地址"
            prop="addr"
            :rules="[{ required: true, message: '地址是必填项' }]"
          >
            <el-input v-model="formUser.addr" placeholder="请输入地址" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="setUser">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  ref,
  reactive,
} from "vue";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const tableData = ref([]);
    const tableLabrl = reactive([
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "sexLabel",
        label: "性别",
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "地址",
        width: 320,
      },
    ]);
    const config = reactive({
      total: 0,
      page: 1,
      name: "",
    });
    const formInline = reactive({
      keyword: "",
    });
    const dialogFormVisible = ref(false);
    const formUser = reactive({
      name: "",
      age: "",
      sex: "",
      birth: "",
      addr: "",
    });
    const cation = ref("add");
    onMounted(() => {
      getUserData(config);
    });
    const getUserData = async (config) => {
      const res = await proxy.$api.getUserDataApi(config);
      tableData.value = res.list.map((v) => {
        v.sexLabel = v.sex === 0 ? "女" : "男";
        return v;
      });
      config.total = res.count;
    };
    const changePage = (page) => {
      config.page = page;
      getUserData(config);
    };
    const openDialog = () => {
      dialogFormVisible.value = true;
      cation.value = "add";
    };
    const headerSerch = () => {
      config.name = formInline.keyword.trim();
      getUserData(config);
    };
    const handleClose = (done) => {
      ElMessageBox.confirm("确定关闭吗?")
        .then(() => {
          proxy.$refs.userForm.resetFields();
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    const setUser = () => {
      proxy.$refs.userForm.validate(async (valid) => {
        if (valid) {
          let res = "";
          if (cation.value === "add") {
            res = await proxy.$api.addUser(formUser);
          } else {
            formUser.sex === "男" ? 1 : 0;
            res = await proxy.$api.editUser(formUser);
          }
          if (res) {
            proxy.$refs.userForm.resetFields();
            dialogFormVisible.value = false;
            ElMessage({
              message: res.message,
              type: "success",
            });
            getUserData(config);
          }
        } else {
          ElMessage({
            showClose: true,
            message: "请输入正确的内容",
            type: "error",
          });
        }
      });
    };
    const editUser = (v) => {
      v.row.sex = v.row.sex == 0 ? "女" : "男";

      proxy.$nextTick(() => {
        Object.assign(formUser, v.row);
      });
      dialogFormVisible.value = true;
      cation.value = "edit";
    };
    // 取消
    const handleCancel = () => {
      proxy.$refs.userForm.resetFields();
      dialogFormVisible.value = false;
    };
    // 删除
    const hadnleDelete = (v) => {
      ElMessageBox.confirm("你确定删除吗?")
        .then(async () => {
          const res = await proxy.$api.deleteUser({
            id: v.id,
          });
          if (res) {
            ElMessage({
              message: res.message,
              type: "success",
            });
            getUserData(config);
          }
        })
        .catch(() => {
          // catch error
        });
    };
    return {
      tableData,
      tableLabrl,
      config,
      changePage,
      formInline,
      headerSerch,
      dialogFormVisible,
      handleClose,
      formUser,
      setUser,
      editUser,
      handleCancel,
      cation,
      openDialog,
      hadnleDelete,
    };
  },
});
</script>
<style lang="less" scoped>
.table {
  position: relative;
  .pager {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dialog-footer {
  display: flex;
}
</style>
