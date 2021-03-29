<template>
    <div class="login">
        <div class="loginBox">
            <h1 class="welcome texe-center">登陆</h1>
            <el-form :model="formItem" :rules="rules" ref="getfrom">
                <el-form-item prop="name">
                    <el-input v-model="formItem.name"  prefix-icon="iconfont icon-shouji" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="formItem.password" autocomplete="off"  placeholder="请输入密码" prefix-icon="iconfont icon-mima"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="formItem.code"  prefix-icon="iconfont icon-yanzhengma" placeholder="请输入验证码" class="fl-l codeInput"></el-input>
                    <el-button type="primary" class="fl-r"  :disabled="codeBtn" :loading="loadSty" @click="getCode">{{codeBtnName}}</el-button>
                </el-form-item>
                <el-form-item>
                     <slidingValidation v-model:token="formItem.token"></slidingValidation>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="landing" @click="submitForm">登陆</el-button>
                </el-form-item>
            </el-form>
            <div class="formBottom texe-center font-12">
                <router-link to="/forgotPasd">忘记密码</router-link>
                <span>|</span>
                <router-link to="/registered">注册</router-link>
            </div>
        </div>
     
    </div>
</template>
<script>

import { onMounted, reactive, toRefs,ref,getCurrentInstance, watch} from "vue"
import md5 from "js-md5";
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from "vue-router";
import{stripscript,checkIphone,checkPassword,checkVerification} from"@/kit/validate"
import {GetSms} from "@/api/login"
import slidingValidation  from "@/components/slidingValidation"
import { useStore } from "vuex";
export default {
    name:"Login",
    components:{slidingValidation},
    setup(props){
    const store = useStore()
    const router = useRouter();
    const route = useRoute();
    const getfrom = ref(null)
    const {ctx,proxy} =getCurrentInstance()
    // 表单用户名规则-----
    let name = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!checkIphone(value)) {
        callback(new Error("手机号格式有误"));
      } else {
        callback();
      }
    };
    // 表单密码规则-----
    let password = (rule, value, callback) => {
      formItem.password = stripscript(value);
      value = formItem.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!checkPassword(value)) {
        callback(new Error("密码为6～20位数字+字母"));
      } else {
        callback();
      }
    };
    // 再次输入密码验证-----
    let passwordAgain = (rule, value, callback) => {
      formItem.passwordAgain = stripscript(value);
      value = formItem.passwordAgain;
      if (value !== formItem.password) {
        callback(new Error("两次密码不一致！"));
      }else {
        callback();
      }
    };
    // 表单验证码规则-----
    let verificationCode = (rule, value, callback) => {
      formItem.code = stripscript(value);
      value = formItem.code;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!checkVerification(value)) {
        callback(new Error("密码为6位数字+字母"));
      } else {
        callback();
      }
    };
    // 获取验证码按钮样式管理----
    const variable =reactive({
      codeBtn:false,
      loadSty:false,
      codeBtnName:"获取验证码",
      countdownTima:null
    })
    const variableItem =toRefs(variable)
    const rules = reactive({
      name: [{ validator: name, trigger: "blur" }],
      password: [{ validator: password, trigger: "blur" }],
      passwordAgain: [{ validator: passwordAgain, trigger: "blur" }],
      code: [{ validator: verificationCode, trigger: "blur" }],
    });

    const formItem =reactive({
          name: "13335802671",
          password: "",
          code:"",
          token:""
       })
    watch(
      ()=>formItem.token,value=>{
        console.log(value)
      }
    )

    // 提交表单按钮---
    const submitForm =async ()=>{
      proxy.getfrom.validate((valid)=>{
        if (valid) {
            if (!formItem.token) {
              ElMessage.error({message: '请完成滑动验证'});
              return false
          }
            let responseData = JSON.parse(JSON.stringify(formItem)) 
            responseData.password=md5(responseData.password)
            store.dispatch('login/login').then(()=>{
              router.push("/index")
            })
            
          } else {
            console.log('error submit!!');
            return false;
          }
      })

    }
    // 获取验证码方法---
    const getCode =()=>{
      if (formItem.name==="") {
          ElMessage.error({message: '请输入手机号'});
          return false
      }else if (!checkIphone(formItem.name)) {
        ElMessage.error({message: '手机号输入有误'});
        return false
      }
      let resquestData={
        username: 13335802671
      }
      GetSms(resquestData).then(requsion=>{
        console.log(requsion)
      }).catch(error=>{
        console.log(error)
      })
      countdown(6)
    }
    // 验证码按钮状态方法---
    const changeCodeBtn =(promise)=>{
      variable.codeBtnName=promise.codeBtnName
      variable.codeBtn=promise.codeBtn
      variable.loadSty=promise.loadSty
    }
    // 倒计时方法---
    const countdown =(time)=>{
      if (variable.countdownTima) {
          clearInterval(variable.countdownTima)
      }
      variable.countdownTima=setInterval(()=>{
      time--
      changeCodeBtn({codeBtnName:`${time}秒后获取`,codeBtn:true,})
      if (time==0) {
        clearInterval(variable.countdownTima)
        changeCodeBtn({codeBtnName:"重新获取",codeBtn:false,})
      }
      },1000)
    }

    onMounted(()=>{})
       return{
        //  参数
           formItem,rules,getfrom,
        // 方法
           submitForm,getCode,changeCodeBtn,
        //  toRefs扩展
        ...variableItem
       }
    }
}
</script>
<style lang="scss" >
@import "@/style/login.scss";
</style>