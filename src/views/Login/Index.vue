<template>
  <div class="login_container">
    <el-form
      class="login_form"
      :model="loginFrom"
      :rules="loginRules"
      ref="loginRef"
    >
      <div class="title_container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- 账户 -->
      <el-form-item prop="username">
        <span class="svg_container">
          <svg-icon iconName="username" />
        </span>
        <el-input
          placeholder="username"
          v-model="loginFrom.username"
          name="username"
          type="text"
        ></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg_container">
          <svg-icon iconName="password" />
        </span>
        <el-input
          placeholder="password"
          v-model="loginFrom.password"
          name="password"
          :type="flag ? 'password' : 'text'"
        ></el-input>
        <span class="svg_container" @click="toggleIcon">
          <svg-icon :iconName="flag ? 'none' : 'keshi'" />
        </span>
      </el-form-item>

      <!-- 登录 -->
      <el-button
        type="primary"
        style="width: 100%; margin-top: 20px"
        @click="handleLogin"
      >
        登录{{ store.state.user.token }}
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { passwordValidate } from './rules.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// 表单数据
const loginFrom = ref({
  username: 'super-admin',
  password: '123456'
})

// 表单验证逻辑
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '账号必须填写'
    }
  ],
  password: [
    {
      trigger: 'blur',
      validator: passwordValidate()
    }
  ]
})

// 切换password状态
const flag = ref(true)
const toggleIcon = () => {
  flag.value = !flag.value
}

// 怎么引用dom
const loginRef = ref(null)
// 登录逻辑
const router = useRouter()
const store = useStore()
const handleLogin = () => {
  // 验证一次表单的数据是否合法
  loginRef.value.validate((validate) => {
    if (!validate) {
      return
    }
    // 验证通过执行登录逻辑 调用定义好的actions
    store.dispatch('user/login', loginFrom.value).then((res) => {
      router.push({
        name: 'Index'
      })
    })
  })
}
</script>
<style lang="scss" scoped>
$dark_gray: #51575a;
$light_gray: #35376a;
$cursor: #fff;

.login_container {
  min-height: 100%;
  width: 100%;
  height: 100vh;
  background: url('../../assets/img/52.png') no-repeat;
  overflow: hidden;

  .title_container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 30px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .login_form {
    position: relative;
    width: 500px;
    max-width: 100%;
    padding: 260px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #696565;

      .el-input {
        height: 47px;
        width: 85%;

        .el-input__inner {
          background: transparent;
          border: 0px;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $cursor;
          height: 47px;
          caret-color: red;
        }
      }
    }
    .svg_container {
      padding: 6px 5px 5px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }
  }
}
</style>
