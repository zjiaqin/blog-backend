<template>
  <div class="login">
    <Row class="navigation">
      <AppLogo class="login-logo" />
      <AppLocalePicker />
    </Row>
    <Row :gutter="24" justify="center">
      <Col :span="18">
        <Row class="login-form-view">
          <Col :span="12">
            <img class="login-form-bg" :src="loginFormBg" />
          </Col>
          <Col class="login-form-main" :span="12">
            <RouterView />
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>
<script setup lang="ts">
  import loginFormBg from '/@/assets/images/login_form_bg.png?url';
  import { Row, Col } from 'ant-design-vue';
  import { AppLocalePicker } from '/@/components/Application';
  import { AppLogo } from '/@/components/Application';
  import { RouterView } from 'vue-router';
</script>

<style scoped lang="less">
  .login {
    width: 100%;
    height: 100%;
    background-image: url('/src/assets/images/login_bg.png');
    background-size: 100px 80px;

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .navigation {
      width: 100%;
      position: absolute;
      top: 0;
      display: flex;
      justify-content: space-between;
      padding: 20px 70px;

      // .login-logo {
      //   transform: scale(1.35);
      // }

      // :deep(.ant-dropdown-trigger) {
      //   transform: scale(1.1);
      // }
    }

    .login-form-view {
      .login-form-main {
        width: 450px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: white;
        padding: 30px;
        box-shadow: 1px 1px 10px #c4cade;
        border-radius: 0 10px 10px 0;
      }

      .login-form-bg {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
