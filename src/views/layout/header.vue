<template>
  <div class="btnBox" @click="changeMore">
    <span
      :class="isCollapse ? 'iconfont icon-gengduo1' : 'iconfont icon-gengduo'"
    ></span>
  </div>
  <div class="userBox fl-r">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link userImg">
        <img src="@/public/images/touxiang.png" alt="" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <span class="usericon iconfont icon-yonghu"></span>
            <span>{{username}}</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span class="usericon iconfont icon-icon-test2"></span>
            <el-button type="text" v-for="item in data.lang" :key="item.value" @click="changelang(item.value)">{{item.lang}}</el-button>
          </el-dropdown-item>
          <el-dropdown-item @click="exitOut">
            <span class="usericon iconfont icon-dianyuan"></span>
            <span>退出</span> 
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import { reactive, ref, toRefs, computed } from "vue";
import { useStore } from "vuex";
import {useI18n} from "vue-i18n"
import { useRouter } from "vue-router";
export default {
  setup(props,{root}) {
    const router = useRouter();
    const {locale} = useI18n()
    const store = useStore();
    // const isCollapse = computed(() => store.getters["header/isCollapse"]);
    const isCollapse = computed(() => store.state.header.isCollapse);
    const username =computed(()=>store.state.login.username)
    const data =reactive({
      lang:[
        {
        lang:"中文",
        value:"ch"
        },
        {
        lang:"英文",
        value:"en"
        },
      ]
    })



    const changeMore = () => {
      store.commit("header/SET_COLLAPSE");
    };
    const changelang =(val)=>{
      localStorage.setItem("lang",val)
      let lang =localStorage.getItem("lang")
      locale.value=val
      router.go(0); 
    }
    const exitOut=()=>{
      store.dispatch("login/exit").then(()=>{
        router.push("/login")
      })
      
    }
    return {
      isCollapse,data,username,
      changeMore,changelang,exitOut
    };
  }
};
</script>
<style lang="scss" scoped>
.btnBox {
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  display: inline-block;
  cursor: pointer;
}
.userBox {
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .userImg {
    img {
      width: 40px;
    }
  }
}
.usericon{
    margin-right: 6px;
}
</style>