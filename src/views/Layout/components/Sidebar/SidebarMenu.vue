<template>
  <!-- 菜单 -->
  <el-menu
    style="width: 100%; height: 90vh"
    :background-color="store.getters.cssVar.subMenuBg"
    :text-color="store.getters.cssVar.menuText"
    :active-text-color="store.getters.cssVar.colors"
    :unique-opened="true"
    :default-active="activePath"
    :router="true"
    :collapse="!store.getters.sideBarOpen"
  >
    <!-- 一二级菜单 -->
    <sidebar-item v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { filterRouter, generateMenus } from '@/utils/router.js'
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
console.log(store)
const routes = computed(() => {
  const filterRoutes = filterRouter(router.getRoutes())
  return generateMenus(filterRoutes)
})
const route = useRoute()
const activePath = computed(() => {
  const { path } = route
  return path
})
console.log(routes.value)
</script>
<style lang="scss" scoped>
:deep(.el-menu) {
  .el-menu-item {
    .sideClass {
      color: #5468ff;
    }
  }
}
</style>
