<template>
  <div class="main">
    <div class="title">
      <a href="javascript:void(0)">反馈</a>
      <br/>
      <br/>
      <p>请联系：2735898908@qq.com</p>
    </div>
    <div class="sign-up-container">
      <!-- 更多登录方式 -->
    </div>
  </div>
</template>
<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import cookie from 'js-cookie'
import loginApi from '@/api/login'
export default {
  layout: 'sign',
}
</script>
<style>
.el-form-item__error{
  z-index: 9999999;
}
</style>
