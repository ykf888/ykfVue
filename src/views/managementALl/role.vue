<template>
  角色管理
  <vueTable :tableCofige="tableCofige">
    <template v-slot:swith="data">
      <el-switch
        v-model="data.data.switch"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
    </template>
    <template v-slot:set="">
  <el-button type="text">操作</el-button>
  <el-button type="text">删除</el-button>
    </template>
  </vueTable>
</template>
<script>
import vueTable from "@c/vueTable";
import { reactive } from "vue";
export default {
  components: { vueTable },
  name: "role",
  setup(props) {
    const tableCofige = reactive({
      tabHead: [
        {
          prop: "date",
          label: "日期"
        },
        {
          prop: "switch",
          label: "状态(禁/启用)",
          slot: "slot",
          slotName: "swith"
        },
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "address",
          label: "地址"
        },
         {
          prop: "set",
          label: "操作",
          slot:"slot",
          slotName: "set"
        }
      ],
      requestDate:{
        taburl:"getTableDate",
        method:"post"
      },
      selection: true
    });
    return {
      tableCofige
    };
  }
};
</script>
<style scoped lang="scss">
</style>