<template>
  <LoginFormTitle :title="t('custom.D2LL4SJom2DBCys9HUmzM')" />
  <Form class="p-4 enter-x" @keypress.enter="handleLogin">
    <FormItem name="email" class="enter-x" v-bind="validateInfos.account">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('custom.SNzfxbXTMm0XU5ofoB8Pn')"
        class="fix-auto-fill"
      >
        <template #prefix>
          <Icon icon="ant-design:user-outlined" color="#266EF2" />
        </template>
      </Input>
    </FormItem>
    <FormItem name="password" class="enter-x" v-bind="validateInfos.password">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('custom.RRY7hl6ZVOaSQGaQvhWFp')"
      >
        <template #prefix>
          <Icon icon="ant-design:lock-outlined" color="#266EF2" />
        </template>
      </InputPassword>
    </FormItem>
    <FormItem name="captcha" class="enter-x" v-bind="validateInfos.captcha">
      <div class="verify-code">
        <Input
          size="large"
          v-model:value="formData.captcha"
          :placeholder="t('custom.HK9HExMWvljzfqzJ6puZ-')"
        >
          <template #prefix>
            <Icon icon="ant-design:safety-outlined" color="#266EF2" />
          </template>
        </Input>
        <img :src="getCaptchaBase64?.data" @click="setCaptchaBase64" />
      </div>
    </FormItem>
    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ loading ? t('custom.MJ7-YNvHZbvjR2XLty11M') : t('custom.D2LL4SJom2DBCys9HUmzM') }}
      </Button>
    </FormItem>

    <!-- <Divider class="fast-login-tips">{{ t('custom.92uYnp10JZqVshQoCkw4b') }}</Divider>
    <Row class="enter-x fast-login">
      <Tooltip title="TronLink">
        <Col class="login-item" :span="8" @click="tronLogin">
          <img :src="tronLinkLogo" width="20" :alt="t('custom.JwgsGcBCZnYpO9AU3HZFr')" />
          <div>TronLink</div>
        </Col>
      </Tooltip>
      <Tooltip title="Telegram">
        <Col class="login-item" :span="8" @click="onTelegramLoginBtn">
          <img :src="telegramLogo" width="22" :alt="t('custom.JwgsGcBCZnYpO9AU3HZFr')" />
          <div>Telegram</div>
        </Col>
      </Tooltip>
    </Row> -->
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { Form, FormItem, Input, InputPassword, Button, message } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';

  import LoginFormTitle from './LoginFormTitle.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';

  import { useDesign } from '/@/hooks/web/useDesign';
  import { router } from '/@/router';

  import { registerAndLoginFormRuleConfig } from '../config/formRuleConfig';
  import { useCaptcha } from '../hooks/useCaptcha';

  const { t } = useI18n();

  const userStore = useUserStore();

  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const { getCaptchaBase64, setCaptchaBase64 } = useCaptcha();
  setCaptchaBase64();

  watch(getCaptchaBase64, (newValue) => {
    formData.captcha_id = newValue?.id as string;
  });

  const loading = ref(false);
  const formData = reactive({
    account: '',
    password: '',
    captcha: '',
    captcha_id: '',
  });

  const userForm = Form.useForm;
  const { validate, validateInfos } = userForm(formData, registerAndLoginFormRuleConfig());

  // 处理响应 code
  function handleResponseCode(code: number, responseMessage: string) {
    if (code === 15024) {
      // 15024：验证邮箱
      router.replace({ name: 'PendingVerify', query: { email: formData.account, type: 1 } });
    } else {
      message.error(responseMessage);
      setCaptchaBase64();
    }
  }

  // 登录
  async function handleLogin() {
    validate().then(async () => {
      try {
        loading.value = true;

        const userInfo = await userStore
          .login({
            requestBody: formData,
            mode: 'none',
          })
          .catch((err) => {
            console.log(err.code);
            handleResponseCode(err.code, err.message);
          });

        if (userInfo) {
          notification.success({
            message: t('sys.login.loginSuccessTitle'),
            description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.name}`,
            duration: 3,
          });
        }
      } catch (error) {
        setCaptchaBase64();
        createErrorModal({
          title: t('sys.api.errorTip'),
          content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
          getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
        });
      } finally {
        loading.value = false;
      }
    });
  }

  // 注册

  // 忘记密码
</script>
<style lang="less" scoped>
  .verify-code {
    display: flex;

    & > img {
      cursor: pointer;
      height: 40px;
      margin-left: 20px;
    }
  }

  .fast-login-tips {
    margin: 10px 0;
    text-align: center;
    color: #294aa5;
    font-size: 14px;
  }

  .fast-login {
    margin-top: 0.5em;
    padding: 8px;

    .login-item {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
      color: #294aa5;
      margin: auto;
      border: 1px solid #294aa5;
      border-radius: 6px;
      padding: 5px 0px;
    }

    img {
      margin-right: 0.3em;
    }
  }

  .forgetPassword_box {
    display: flex;
    align-items: center;
  }
</style>
