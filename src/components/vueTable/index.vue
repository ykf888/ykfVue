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
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :current-page="data.currentPage4"
      :page-sizes="data.pagCofige.sizes"
      :page-size="data.pagCofige.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.pagCofige.total">
    </el-pagination>
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
      currentPage4:0,
      tableData:[],
      tableCofige: {
        tabHead: [],
        selection: false,
        requestDate:{}
      },
      pagCofige:{
        sizes:[10, 20, 30, 40],
        size:100,
        total:400,
      }
    });
    const handleEdit = () => {};
    const getTabData=()=>{
      let request=data.tableCofige.requestDate
      let requestDate={
        method:request.method,
        url:requestUrl[request.taburl],
        data:{
          pageSize:10,
          pageNumber:1
        }
      }
      getList(requestDate).then(request=>{
        data.pagCofige.total=request.content.total
        data.pagCofige.size=request.content.per_page
        data.tableData=request.content.data
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
    const handleSizeChange=(val)=>{
      console.log(val)
    }
    const handleCurrentChange=(val)=>{
      console.log(val)
    }
    
    onBeforeMount(() => {
      getTableCofige()
      getTabData()
    });

    return {
      data,
      handleEdit,handleSizeChange,handleCurrentChange
    };
  }
};
</script>
<style scoped lang="scss">
</style>