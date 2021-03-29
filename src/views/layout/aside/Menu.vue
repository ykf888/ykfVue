<template>
  <el-submenu :index="menu.path">
    <template #title>
      <i :class="' iconfont ' + menu.meta.icon"></i>
      <span>{{ menu.meta && menu.meta.name }}</span>
    </template>
      <template v-if="menu.children && menu.children.length">
        <template v-for="item in menu.children">
          <template v-if="!item.hidden">
            <el-menu-item v-if="!item.children" :index="item.path" :key="item.path">
                <template #title>{{ item.meta && item.meta.name }}</template>
            </el-menu-item>
            <Menu v-else :menu="item" :key="item.path" />
          </template>
        </template>
      </template>
    
  </el-submenu>
</template>
<script>
export default {
  name: "Menu",
  props: {
    menu: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    return {};
  }
};
</script>
<style scoped lang="scss">
</style>