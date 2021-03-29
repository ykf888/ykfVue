<template>
  <el-container>
    <el-aside :class="isCollapse? 'down':'open'">
       <layoutAside></layoutAside>
    </el-aside>
    <el-container>
    <el-header>
        <layoutHeader></layoutHeader>
    </el-header>
    <el-main>
        <layoutMain></layoutMain>
    </el-main>
    </el-container>
  </el-container>
</template>
<script>
import {computed, reactive} from "vue"
import layoutHeader from "@/views/layout/header.vue"
import layoutMain from "@/views/layout/main.vue"
import layoutAside from "@/views/layout/aside/index"
import { useStore } from "vuex";
export default {
  components:{layoutAside,layoutHeader,layoutMain},
  setup(props){
    const store  = useStore()
    const isCollapse =computed(()=>store.getters['header/isCollapse'])
    return{
      isCollapse
    }
  }
}
</script>