<template>

  <el-table :data="data.tableData" style="width: 100%" @selection-change="selectChange">
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
  <div class="pagBox">
  
   <div class="fl-r"> 
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="data.currentPage4"
        :page-sizes="pagCofige.sizes"
        :page-size="pagCofige.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total">
       </el-pagination>
   </div>

  </div>
  
</template>
  <script>
import { getCurrentInstance, onBeforeMount, reactive, watch } from "vue";
import {requestUrl,getList} from"@/api/common"
import {getTableData} from "./getTableData"
import {changePage} from "./changePag"
export default {
  emits:["update:tabRow"],
  name: "vueTable",
  props: {
    tableCofige: {
      type: Object,
      default: () => {}
    },
    tabRow:{
      type:Object,
      default: () => {}
    }
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const {tableData,getData}=getTableData()
    const {pagCofige,handleSizeChange,handleCurrentChange} =changePage()
    const data = reactive({
      currentPage4:0,
      tableData:[],
      tableCofige: {
        tabHead: [],
        selection: false,
        requestDate:{}
      },
      delItems:[]
    });
    // 获取表格数据
    const getTableItem = (val)=>{
      let parme={
          data:{
            pageSize:pagCofige.size,
            pageNumber:pagCofige.pageNumber,
          },
          cofige:data.tableCofige.requestDate
        }
     if (val) {
      let datas = Object.assign({},parme.data,val)
      let parmes ={
        data:datas,
        cofige:data.tableCofige.requestDate
      }
       getData(parmes)
     }else{
       getData(parme)
     }
    }
    // 匹配表格配置key
    const getTableCofige=()=>{
      let tableCofige=props.tableCofige
      let keys =Object.keys(data.tableCofige)
      for(let key in tableCofige){
       if (keys.includes(key)) {
         data.tableCofige[key]=tableCofige[key]
       }
      }
    }
    const selectChange =(val)=>{
      let tableIdItem ={
        idItem:val.map(item=>item.member_id)
      }
      proxy.$emit("update:tabRow",tableIdItem)
    }
    onBeforeMount(() => {
      getTableCofige()
      getTableItem()
    });
    watch(
      ()=>[pagCofige.size,pagCofige.pageNumber],([pageSize,pageNumber])=>{
        pagCofige.size=pageSize
        pagCofige.pageNumber=pageNumber
        getTableItem()
      },
    )
    watch(
      ()=>tableData.item,(tabItem)=>{
        data.tableData=tabItem
      }
    )
    return {
      data,pagCofige,tableData,
      handleSizeChange,handleCurrentChange,getTableItem,selectChange
    };
  }
};
</script>
<style scoped lang="scss">
.pagBox{
  margin-top: 20px;
}
</style>