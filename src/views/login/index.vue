<template>
  <div id="login" class="h-full pt-20">
    <div class="login-form pt-10 px-12 mx-auto">
      <h1 class="mb-9 text-center text-2xl font-bold text-gray-600">pitpat 运营管理后台</h1>
      <el-form :model="loginData" :rules="rules" ref="user_form" @keyup.enter.native="handleSubmit">
        <el-form-item prop="username">
          <el-input class="login-form__input" placeholder="账号名称" v-model="loginData.username">
            <template #prefix>
              <svg-icon icon-class="user" class="login-form__input-icon" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="login-form__input"
            :type="showPassword ? 'input' : 'password'"
            placeholder="密码"
            v-model="loginData.password"
          >
            <template #prefix>
              <svg-icon icon-class="password" class="login-form__input-icon" />
            </template>
            <template #suffix>
              <svg-icon
                v-show="!showPassword"
                icon-class="eye"
                class="login-form__input-icon mr-1"
                @click="showPassword = !showPassword"
              />
              <svg-icon
                v-show="showPassword"
                icon-class="eye-open"
                class="login-form__input-icon mr-1"
                @click="showPassword = !showPassword"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            class="login-form__input login-form__img-code"
            placeholder="图像验证码"
            v-model="loginData.code"
            maxLength="11"
          >
            <template #prefix>
              <svg-icon icon-class="validCode" class="login-form__input-icon" />
            </template>
            <template #suffix>
              <div>
                <img
                  class="login-form__input-img"
                  style="height: 45px"
                  @click="handleGetImgCode"
                  :src="codeUrl"
                />
              </div>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button class="el-login-footer" type="primary" html-type="submit" @click="handleSubmit"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getCodeImg } from '@/api/user/login'
import { useRouter } from 'vue-router'
import useStore from '@/stores'
// import { userStore } from '../../stores/user'
const { user }: any = useStore()
const router = useRouter()

const user_form = ref()
const loginData = reactive({
  username: '',
  password: '',
  code: '',
  uuid: ''
})
const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [
    { required: true, message: '请输入图像验证码', trigger: 'blur' },
    { min: 4, message: '图像验证码不能少于4位', trigger: 'blur' }
  ]
})
const showPassword = ref(false)
const codeUrl = ref('')

if (user.token) {
  user.logout()
}

// 获取图形验证码
const handleGetImgCode = () => {
  getCodeImg().then((res) => {
    if (res.code === 200) {
      codeUrl.value = 'data:image/gif;base64,' + res.data.img
      loginData.uuid = res.data.uuid
    }
  })
}

handleGetImgCode()

// 所有的提交
const loading = ref(false)
let queryOb = { redirect: '', other: {} }
const handleSubmit = () => {
  user_form.value.validate((valid) => {
    if (valid) {
      loading.value = true
      user
        .login(loginData)
        .then(async (res) => {
          loading.value = false
          router.push({ path: '/index', query: queryOb.other })
          if (['验证码错误', '验证码已失效'].includes(res.msg)) {
            loading.value = false
            handleGetImgCode()
          }
        })
        .catch(() => {
          handleGetImgCode()
        })
    }
  })
}

// const getUserInfo = async () => {
//   const res = await getInfo({})
//   if (res.code === 200) {
//     const user = userStore()
//     user.setUserInfo(res.data.user)
//     user.setRoles(res.data.roles)
//     user.setPermission(res.data.permissions)
//     setTimeout(() => {
//       console.log('store', store.roles)
//     }, 2000)
//   }
// }
</script>

<style lang="scss">
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('@/assets/images/login_bg.jpg');
  background-size: cover;
}
.login-form {
  width: 400px;
  padding: 25px 25px 5px 25px;
  position: fixed;
  top: 200px;
  right: 350px;
  background: #ffffff;
  border-radius: 6px;
  .mb-9 {
    margin-bottom: 32px;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }
  &__input {
    .el-input__inner {
      height: 45px;
      line-height: 45px;
      font-size: 13px;
    }
    &-icon {
      margin-left: 4px;
      height: 45px !important;
    }
  }
  &--color {
    input.el-input__inner {
      // border-right: none;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      position: relative;
    }
    .el-input-group__append {
      background: transparent;
      padding-right: 30px;
      font-size: 12px;
      position: absolute;
      right: 0;
      width: 78px;
      height: 43px;
      line-height: 43px;
      top: 1px;
      border: none;
      span {
        letter-spacing: 1px;
      }
    }
  }
  &__img-code {
    .el-input__suffix {
      right: 0;
    }
  }
  .el-login-footer {
    width: 100%;
    span {
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 10px;
    margin-bottom: 20px;
  }
}
</style>
