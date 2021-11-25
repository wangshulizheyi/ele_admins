<template>
  <div class="login_container">
    <el-form
      class="login_form"
      :model="loginFrom"
      :rules="loginRules"
      ref="loginRef"
    >
      <div class="title_container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <select-lang class="select_lang" />
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
        {{ $t('msg.login.loginBtn') }}
      </el-button>
      <!-- 账号tips -->
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { passwordValidate, usernameValidate } from './rules.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SelectLang from '@/components/SelectLang/index.vue'
// import { userI18n } from 'vue-i18n'

// const i18n = userI18n()
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
      validator: usernameValidate()
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

// 监听getters.language 的变化
watch(
  () => store.getters.language,
  (newValue, oldValue) => {
    // 中英文切换 验证重新执行
    loginRef.value.validateField('username')
    loginRef.value.validateField('password')
  }
)
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
    :deep(.select_lang) {
      position: absolute;
      top: 4px;
      // right: 0px;
      // background-color: white;
      font-size: 24px;
      border-radius: 4px;
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
      padding: 6px 5px 5px 5px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }
    .tips {
      font-size: 14px;
      line-height: 28px;
      color: #8f8f97;
      margin-bottom: 5px;
    }
  }
}
</style>
