<template>
  <div
    class="app-wrapper"
    :class="store.getters.sideBarOpen ? '' : 'hideSidebar'"
  >
    <!-- 左边 -->
    <side-bar id="guide-sideBar" class="sidebar-container" />
    <!-- 右边 -->
    <div class="main-container">
      <div class="fixed-header">
        <nav-bar />
      </div>
      <app-main />
    </div>
  </div>
</template>
<script setup>
import SideBar from './components/Sidebar/index.vue'
import NavBar from './components/Navbar/index.vue'
import AppMain from './components/Appmain/index.vue'
import { useStore } from 'vuex'
const store = useStore()
</script>
<style lang="scss" scoped>
@import '~@/styles/common.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  // width: 100%;
  display: flex;
  .sidebar-container {
    width: $sideBarWidth;
    height: 100vh;
    float: left;
    background: $subMenuBg;
  }
  .main-container {
    flex: 1;
    .fixed-header {
      width: calc(100% - #{$sideBarWidth}+3);
      transition: width 0.28s;
    }
  }
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$sideBarhideWidth}+3);
  transition: width 0.28s;
}
</style>
