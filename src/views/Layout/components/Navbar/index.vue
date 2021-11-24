<template>
  <div class="navbar">
    <!-- 左侧 -->
    <cuttle class="cuttle_container" />
    <breadcrumb class="breadcrumb_container" />
    <!-- 右边 -->
    <div class="right-menu">
      <el-dropdown class="avatar-container">
        <div class="avater-wrapper">
          <el-avatar shape="square" :size="40" :src="avatar"></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-drop-down">
            <el-dropdown-item>首页</el-dropdown-item>
            <el-dropdown-item>课程主页</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import avatar from '@/assets/logo.png'
import { useStore } from 'vuex'
import cuttle from '@/components/Cuttle/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
const store = useStore()
// 主动退出
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  border-radius: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid rgb(153, 153, 153);
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    .avatar-container {
      cursor: pointer;
      .avater-wrapper {
        margin-top: 5px;
        position: relative;
        :deep(.el-avatar) {
          --el-avatar-background-color: none;
          margin-right: 20px;
        }
      }
    }
  }
  .cuttle_container {
    line-height: 50px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb_container {
    height: 50px;
    line-height: 50px;
  }
}
</style>
