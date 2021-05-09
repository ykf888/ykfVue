<template>
  <el-input
    v-model="code"
    prefix-icon="iconfont icon-yanzhengma"
    placeholder="请输入验证码"
    class="fl-l codeInput"
  ></el-input>
  <el-button
    type="primary"
    class="fl-r"
    :disabled="codeBtn"
    :loading="loadSty"
    @click="getCode"
    >{{ codeBtnName }}</el-button
  >
</template>
<script>
import { reactive, toRefs } from "vue";
import { GetSms } from "@/api/login";
import { checkIphone } from "@/kit/validate";
import { ElMessage } from 'element-plus'
export default {
  props: {
    formItem: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const datas = reactive({
      code: "",
      codeBtn: false,
      loadSty: false,
      codeBtnName: "获取验证码",
      countdownTima: null
    });
    const data = toRefs(datas);

    const getCode = () => {
      if (props.formItem.name === "") {
        ElMessage.error({ message: "请输入手机号" });
        return false;
      } else if (!checkIphone(props.formItem.name)) {
        ElMessage.error({ message: "手机号输入有误" });
        return false;
      }
      let resquestData = {
        username: props.formItem.name,
        type: "Login"
      };
      GetSms(resquestData)
        .then(requsion => {
          console.log(requsion);
        })
        .catch(error => {
          console.log(error);
        });
      countdown(6);
    };
    const countdown = time => {
      if (datas.countdownTima) {
        clearInterval(datas.countdownTima);
      }
      datas.countdownTima = setInterval(() => {
        time--;
        changeCodeBtn({ codeBtnName: `${time}秒后获取`, codeBtn: true });
        if (time == 0) {
          clearInterval(datas.countdownTima);
          changeCodeBtn({ codeBtnName: "重新获取", codeBtn: false });
        }
      }, 1000);
    };
    const changeCodeBtn = promise => {
      datas.codeBtnName = promise.codeBtnName;
      datas.codeBtn = promise.codeBtn;
      datas.loadSty = promise.loadSty;
    };
    return {
      ...data,
      getCode,changeCodeBtn
    };
  }
};
</script>