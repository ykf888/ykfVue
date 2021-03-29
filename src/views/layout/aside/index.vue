<template>

  <el-menu
    :default-active="opemPath"
    class="el-menu-vertical-demo"
    background-color="#fff0"
    text-color="#fff"
    :collapse="isCollapse"
    :unique-opened="true"
    @select="select"
    router
    active-text-color="#409EFF"
  >
 <template v-for="item in routerItems" :key="item.id">
      <template v-if="!item.meta.hidden">
        <template v-if="haveChildren(item)">
          <Menu :menu="item" :key="item.path"></Menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path">
            <i :class="' iconfont ' + item.meta.icon"></i>
            <template #title>{{ item.children[0].meta && item.children[0].meta.name }}</template>
          </el-menu-item>
        </template>
      </template>
    </template>
   
  </el-menu>
</template>
<script>
import { reactive, getCurrentInstance, ref, toRefs, computed, onMounted, watch  } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import Menu from "@/views/layout/aside/Menu.vue"
export default {
  components:{ Menu },
  setup(props) {
    const { ctx } = getCurrentInstance();
    const { options } = useRouter();
    let store = useStore()
    const isCollapse =computed(()=>store.getters['header/isCollapse'])
  
  
    const routerItems = JSON.parse(JSON.stringify(options.routes));
    
    // 点击时缓存当前的路由路径---
    const select =(key, keyPath)=>{
      let data = JSON.stringify(keyPath)
      localStorage.setItem("openKey",data)
    }
    let localdata = JSON.parse(localStorage.getItem("openKey"))
    const opemPath  =ref(localdata?localdata.pop():"")
    const haveChildren=(data)=>{
      if (!data.children) {
        return false
      }
      const childrenItem =data.children.filter(item=>item.hidden?false:true)
 
      if (childrenItem.length===1) {
        return false
      }else{
        return true
      }
    }
  
//   watch(
//   () => ddd.name,
//   (count, prevCount) => {
//    console.log(count,prevCount)
//   },
 
// )

    return {

      isCollapse,opemPath,routerItems,
      select,haveChildren
    };
  }
};
</script>