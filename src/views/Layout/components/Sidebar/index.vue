<template>
  <div class="">
    <div class="logo_container">
      <el-avatar :src="Logo" shape="square" />
      <h1 class="logo-title" v-if="store.getters.sideBarOpen">ele-admin</h1>
    </div>
    <!-- <el-scrollbar> -->
    <sidebar-menu />
    <!-- </el-scrollbar> -->
  </div>
</template>
<script setup>
import Logo from '@/assets/logo.png'
import SidebarMenu from './SidebarMenu.vue'
import { useStore } from 'vuex'
const store = useStore()
</script>

<style lang="scss" scoped>
.logo_container {
  height: 44px;
  padding: 10px 0px 22px 0px;
  display: flex;
  align-items: center;
  justify-self: center;

  :deep(.el-avatar) {
    --el-avatar-background-color: none;
  }
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
