<template>
  <el-form
    ref="form"
    :inline="true"
    :model="data.form"
    label-width="80px"
    size="small"
  >
    <el-form-item label="角色类型" prop="type">
      <el-select v-model="data.form.type" placeholder="请选择角色类型">
        <el-option label="admin" value="0"></el-option>
        <el-option label="产品管理员" value="1"></el-option>
        <el-option label="会员管理员" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="禁用" prop="status">
      <el-select v-model="data.form.status" placeholder="请选择">
        <el-option label="禁用" :value="false"></el-option>
        <el-option label="启用" :value="true"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="关键字" prop="keyword">
      <el-select v-model="data.form.keyword" placeholder="请选择">
        <el-option label="用户名" value="username"></el-option>
        <el-option label="真实姓名" value="truename"></el-option>
        <el-option label="手机号" value="phone"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="input">
      <el-input v-model="data.form.input"></el-input>
    </el-form-item>
    <el-button type="primary" size="small" @click="searchFrom">搜索</el-button>
    <el-button type="primary" size="small" @click="resetForm('form')"
      >重置</el-button
    >
    <el-button type="primary" size="small">导出</el-button>
  </el-form>

  <div class="addBtn">
    <el-button type="primary" size="small" @click="addItem">新增</el-button>
  </div>
  <vueTable :tableCofige="tableCofige" ref="table" v-model:tabRow="data.tabRow">
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
  <el-button type="danger" @click="removeAll" size="mini" class="fl-l"
    >全部删除</el-button
  >
  <FromDialog
    :fromitem="data.fromData"
    v-model:dialogVisible="data.dialogVisible"
    :openItem="data.openItem"
    :usersItem="data.usersItem"
    @getList="getList"
  />

  <!-- <input type="text" id="inppp"> -->
</template>

<script>
import vueTable from "@c/vueTable";
import { getCurrentInstance, reactive } from "vue";
import FromDialog from "./components/dialog";
import md5 from "js-md5";
import { UserRemove, UserInfo } from "@/api/user";
import { global } from "@/kit/massageBox";
export default {
  components: { vueTable, FromDialog },
  name: "role",
  setup(props) {
    //     let input = document.getElementById('inppp')
    //     input.bind("input propertychange",function () {
    //                     console.log("已经输入了"+$("#inpstart").val().length+"个字。。。");
    //                 });

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
        status: "",
        keyword: "",
        input: ""
      },
      search: {},
      tabRow: {},
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
      let prome = {
        id: { member_id: val.data.member_id },
        type: "details"
      };
      getUserInfo(prome);
    };
    // 获取用户信息
    const getUserInfo = prome => {
      UserInfo(prome.id).then(res => {
        res.content.type = prome.type;
        data.fromData.data = res.content;
        data.dialogVisible = true;
      });
    };
    // 编辑
    const editor = val => {
      let prome = {
        id: { member_id: val.data.member_id },
        type: "editor"
      };
      getUserInfo(prome);
    };
    // 删除接口
    const delitem = val => {
      let id = {
        member_id: val.data.member_id
      };
      UserRemove(id).then(res => {
        getList();
      });
    };
    // 删除
    const remove = val => {
      let messageCoign = {
        meeage: "此操作将永久删除该文件, 是否继续?",
        title: "提示",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        function: delitem,
        data: val,
        proxy: proxy
      };
      delFunction(messageCoign);
    };
    // 批量删除接口
    const delAll = () => {
      let id = {
        member_id: data.tabRow.idItem
      };
      UserRemove(id).then(res => {
        getList();
      });
    };
    // 批量删除
    const removeAll = () => {
      let messageCoign = {
        meeage: "此操作将永久删除这些资料, 是否继续?",
        title: "提示",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        function: delAll,
        data: "",
        proxy: proxy
      };
      delFunction(messageCoign);
    };
    const getList = val => {
      proxy.$nextTick(() => {
        proxy.$refs.table.getTableItem(val);
      });
    };
    // 搜索
    const searchFrom = () => {
      let searchFrom = Object.assign({}, data.form);
      let searchItem = {};
      if (searchFrom.keyword && searchFrom.input) {
        searchItem[searchFrom.keyword] = searchFrom.input;
      }
      delete searchFrom.keyword;
      delete searchFrom.input;
      for (let key in searchFrom) {
        if (searchFrom[key] === "") {
          delete searchFrom[key];
        }
      }
      data.search = Object.assign({}, searchFrom, searchItem);
      getList(data.search);
    };
    // 重置搜索表单
    const resetForm = formName => {
      console.log(formName);
      proxy.$refs[formName].resetFields();
    };
    return {
      tableCofige,
      data,
      addItem,
      roleReturn,
      itemDetails,
      editor,
      remove,
      getList,
      searchFrom,
      removeAll,
      resetForm
    };
  }
};
</script>
<style scoped lang="scss">

</style>