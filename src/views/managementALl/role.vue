<template>
  <el-form
    ref="form"
    :inline="true"
    :model="data.form"
    label-width="80px"
    size="small"
  >
    <el-form-item label="角色类型">
      <el-select v-model="data.form.type" placeholder="请选择活动区域">
        <el-option label="类型1" value="shanghai"></el-option>
        <el-option label="类型2" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="禁用">
      <el-select v-model="data.form.open" placeholder="请选择活动区域">
        <el-option label="禁用" value="shanghai"></el-option>
        <el-option label="启用" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="关键字">
      <el-select v-model="data.form.keyword" placeholder="请选择活动区域">
        <el-option label="用户名" value="name"></el-option>
        <el-option label="真实姓名" value="truename"></el-option>
        <el-option label="手机号" value="iphone"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input v-model="data.form.input"></el-input>
    </el-form-item>
    <el-button type="primary" size="small">搜索</el-button>
    <el-button type="primary" size="small">重置</el-button>
    <el-button type="primary" size="small">导出</el-button>
  </el-form>
  <div class="addBtn">
    <el-button type="primary" size="small" @click="addItem">新增</el-button>
  </div>
  <vueTable :tableCofige="tableCofige">
    <template v-slot:swith="data">
      <el-switch
        v-model="data.data.status"
        active-color="#13ce66"
        inactive-color="#ff4949"
        :active-value="1"
        :inactive-value="0"
      >
      </el-switch>
    </template>
    <template v-slot:role="data">
      {{ roleReturn(data.data.role) }}
    </template>
    <template v-slot:set="data">
      <el-button type="text" @click="itemDetails(data)">详情</el-button>
      <el-button type="text" @click="editor(data)">编辑</el-button>
      <el-button type="text" @click="remove(data)">删除</el-button>
    </template>
  </vueTable>
  <FromDialog
    :fromitem="data.fromData"
    v-model:dialogVisible="data.dialogVisible"
    :openItem="data.openItem"
    :usersItem="data.usersItem"
  />
</template>
<script>
import vueTable from "@c/vueTable";
import { getCurrentInstance, reactive } from "vue";
import FromDialog from "./components/dialog";
import md5 from "js-md5";
import { UserRemove } from "@/api/user";
import { global } from "@/kit/massageBox";
export default {
  components: { vueTable, FromDialog },
  name: "role",
  setup(props) {
    const { delFunction } = global();
    const { proxy } = getCurrentInstance();
    const tableCofige = reactive({
      tabHead: [
        {
          prop: "username",
          label: "用户名"
        },

        {
          prop: "truename",
          label: "真实姓名"
        },
        {
          prop: "phone",
          label: "手机号"
        },
        {
          prop: "role",
          label: "角色类型",
          slot: "slot",
          slotName: "role"
        },
        {
          prop: "status",
          label: "状态(禁/启用)",
          slot: "slot",
          slotName: "swith"
        },
        {
          prop: "set",
          label: "操作",
          slot: "slot",
          slotName: "set"
        }
      ],
      requestDate: {
        taburl: "getTableDate",
        method: "post"
      },
      selection: true
    });
    const roleReturn = val => {
      if (!val) {
        return false;
      }
      let leable = data.usersItem.filter(item => item.value == val)[0];
      return leable.label;
    };
    const data = reactive({
      form: {
        type: "",
        open: "",
        keyword: "",
        input: ""
      },

      fromData: {},
      usersItem: [
        { value: "1", label: "admin" },
        { value: "2", label: "产品管理员" },
        { value: "3", label: "会员管理员" }
      ],
      openItem: [
        { value: 1, label: "启用" },
        { value: 0, label: "禁用" }
      ],
      dialogVisible: false
    });

    const addItem = () => {
      data.fromData = {};
      data.dialogVisible = true;
    };
    // 查看详情
    const itemDetails = val => {
      val.data.type = "details";
      data.fromData = val;
      data.dialogVisible = true;
    };
    // 编辑
    const editor = val => {
      val.data.type = "editor";
      data.fromData = val;
      data.dialogVisible = true;
    };
    // 删除接口
    const delitem = val => {
      let id = {
        member_id: val.data.member_id
      };
      UserRemove(id).then(res => {
        console.log(res);
      });
    };
    // 删除
    const remove = val => {
      let messageCoign ={
        meeage:"此操作将永久删除该文件, 是否继续?",
        title:"提示",
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:"warning",
        function:delitem,
        data:val,
        proxy:proxy
      }
      delFunction(messageCoign);
    };

    return {
      tableCofige,
      data,
      addItem,
      roleReturn,
      itemDetails,
      editor,
      remove
    };
  }
};
</script>
<style scoped lang="scss">
</style>