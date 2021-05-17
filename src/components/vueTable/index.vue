<template>

  <el-table :data="data.tableData" style="width: 100%">
    <el-table-column
      v-if="data.tableCofige.selection"
      type="selection"
      width="46"
      header-align="center"
      align="center"
      class="hhh"
    ></el-table-column>
    <template v-for="item in data.tableCofige.tabHead" :key="item.prop">
      <el-table-column v-if="item.slot ==='slot'" :prop="item.prop" :label="item.label" >
        <template #default="scope">
           <slot :name="item.slotName" :data="scope.row"></slot>
        </template>
          
      </el-table-column>
      <el-table-column v-if="item.slot!=='slot'" :prop="item.prop" :label="item.label">
      </el-table-column>
    </template>
  </el-table>
</template>
  <script>
import { onBeforeMount, reactive } from "vue";
import {requestUrl,getList} from"@/api/common"
export default {
  name: "vueTable",
  props: {
    tableCofige: {
      type: Object,
      default: () => {}
    },
  },
  setup(props) {
    const data = reactive({
      tableData:[],
      tableCofige: {
        tabHead: [],
        selection: false,
        requestDate:{}
      }
    });
    const handleEdit = () => {};
    const getTabData=()=>{
      let request=data.tableCofige.requestDate
      let requestDate={
        method:request.method,
        url:requestUrl[request.taburl],
        data:{}
      }
      getList(requestDate).then(request=>{
        data.tableData=request.tableData
      }).catch(error=>{
      })
    } 
    const getTableCofige=()=>{
      let tableCofige=props.tableCofige
      let keys =Object.keys(data.tableCofige)
      for(let key in tableCofige){
       if (keys.includes(key)) {
         data.tableCofige[key]=tableCofige[key]
       }
      }
    }
    onBeforeMount(() => {
      getTableCofige()
      getTabData()
    });

    return {
      data,
      handleEdit
    };
  }
};
</script>
<style scoped lang="scss">
</style>