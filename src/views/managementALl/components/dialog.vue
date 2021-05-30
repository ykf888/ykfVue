<template>
  <el-dialog
    :title="data.title"
    v-model="data.Visible"
    width="50%"
    ref="formdialog"
    @open="openDialog('dialogFrom')"
    @close="close"
    :before-close="handleClose"
  >
    <el-form
      ref="dialogFrom"
      :model="data.dialogFrom"
      label-width="80px"
      size="small"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="data.dialogFrom.username" :disabled="data.inputTyoe"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="truename">
        <el-input v-model="data.dialogFrom.truename" :disabled="data.inputTyoe"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone" >
        <el-input v-model="data.dialogFrom.phone" :disabled="data.inputTyoe"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-show="!data.inputTyoe">
        <el-input v-model="data.dialogFrom.password" type="password" :disabled="data.inputTyoe"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="care_id" v-show="!data.inputTyoe">
        <el-input v-model="data.dialogFrom.care_id" :disabled="data.inputTyoe"></el-input>
      </el-form-item>
      <el-form-item label="角色类型" prop="role">
        <el-radio-group v-model="data.dialogFrom.role" :disabled="data.inputTyoe">
          <template v-for="item in data.usersItem" :key="item.value">
            <el-radio :label="item.value">{{ item.label }}</el-radio>
          </template>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="禁启用" prop="status">
        <el-radio-group v-model="data.dialogFrom.status" :disabled="data.inputTyoe">
          <template v-for="item in data.openItem" :key="item.value">
            <el-radio :label="item.value">{{ item.label }}</el-radio>
          </template>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="colse">取 消</el-button>
        <el-button type="primary" @click="sumbit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import {  AddUser ,UserUpdate} from "@/api/user";
import { reactive } from "@vue/reactivity";
import { getCurrentInstance, onMounted, watch } from "@vue/runtime-core";
import md5 from "js-md5";
export default {
  emits: ["update:dialogVisible"],
  props: {
    fromitem: {
      type: Object,
      default: () => {}
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    usersItem: {
      type: Array,
      default: () => []
    },
    openItem: {
      type: Array,
      default: () => []
    }
  },

  setup(props) {
    const { proxy } = getCurrentInstance();
    const data = reactive({
      title:"",
      inputTyoe:true,
      dialogFrom: {
        username: "",
        truename: "",
        phone: "",
        password: "",
        care_id: "",
        role: "",
        status: "",
      },
      usersItem: [{ value: "", label: "" }],
      openItem: [{ value: 0, label: "" }],
      Visible: false
    });
    const addUser =()=>{
      let responseData = JSON.parse(JSON.stringify(data.dialogFrom));
      responseData.password = md5(responseData.password);
      AddUser(responseData).then(res => {
        console.log(res)
      });
      }
    const sumbit = () => {
      let datas = Object.assign({}, props.fromitem.data);
       if (datas.type&&datas.type==="details") {
          closedDialog()
        }else if(datas.type&&datas.type==="editor"){
          editorItem()
        }else{
          addUser()
        }
    };
    const editorItem =()=>{
      let datas = Object.assign({}, props.fromitem.data);
      let resData = JSON.parse(JSON.stringify(data.dialogFrom));
      resData.password = md5(resData.password);
      resData.member_id=datas.member_id
      UserUpdate(resData).then(res=>{
        closedDialog()
      })
    }
    const colse = () => {
      closedDialog();
    };

    // 新增弹窗
    const addDiglo=()=>{
      data.title="新增"
          data.inputTyoe=false
          data.dialogFrom.member_id && delete data.dialogFrom.member_id
    }
    // 表单赋值
    const fromPushData =()=>{
      let datas = Object.assign({}, props.fromitem.data);
      for (let key in datas) {
            data.dialogFrom[key] = datas[key];
          }
    }
    // 详情弹窗
    const seeMore =()=>{
          fromPushData()
          data.title="详情"
          data.inputTyoe=true
    }
    // 编辑弹窗
    const editor=()=>{
      fromPushData()
      data.title="编辑"
      data.inputTyoe=false
    }
    // 打开弹窗
    const openDialog = formName => {
      proxy.$nextTick(() => {
        let datas = Object.assign({}, props.fromitem.data);
        console.log(datas)
        proxy.$refs[formName].resetFields();
        if (datas.type&&datas.type==="details") {
          seeMore()
        }else if(datas.type&&datas.type==="editor"){
          editor()
        }else{
          addDiglo()
        }
      });
    };
    // 关闭弹窗
    const closedDialog = () => {
      proxy.$emit("update:dialogVisible", false);
    };
    const handleClose = done => {
      proxy.$confirm("确认关闭？")
        .then(_ => {
          closedDialog();
        })
        .catch(_ => {});
    };
    const close = () => {};
    onMounted(() => {
      (data.usersItem = props.usersItem), (data.openItem = props.openItem);
    });
    watch(
      () => props.dialogVisible,
      value => {
        data.Visible = value;
      }
    );
    return {
      data,
      colse,
      openDialog,
      closedDialog,
      sumbit,
      handleClose,
      close
    };
  }
};
</script>