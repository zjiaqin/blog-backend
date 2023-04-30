import { FormProps } from '/@/components/Form/index';
import { useUserStore } from '/@/store/modules/user';
import { useMessage } from '/@/hooks/web/useMessage';
const { createMessage } = useMessage();
import {
  emailRule,
  captchaRule,
  changePasswordFormRuleConfig,
} from '/@/views/sys/auth/config/formRuleConfig';

import { sendCodeUsingGet } from '/@/api/apis';
const userStore = useUserStore();
export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '安全设置',
    component: 'SecureSetting',
  },
];

// 基础设置 form

export const getbaseSetFromConfig = (): FormProps => {
  return {
    labelWidth: 120,
    showActionButtonGroup: false,
    baseColProps: {
      xs: 24,

      md: 24,
      lg: 20,
      xl: 18,
    },
    schemas: [
      {
        field: 'email',
        component: 'Input',
        label: '邮箱',

        dynamicDisabled: true,
      },
      {
        field: 'nickname',
        component: 'Input',
        label: '昵称',
      },
      {
        field: 'intro',
        component: 'InputTextArea',
        label: '个人简介',
      },
      {
        field: 'website',
        component: 'Input',
        label: '主页',
        colProps: { span: 18 },
      },
    ],
  };
};

// 安全设置 list
export const getSecureSettingList = (): ListItem[] => {
  return [
    {
      key: '1',
      title: '账户密码',
      description: '已设置密码',
      extra: '修改',
    },
    {
      key: '2',
      title: '修改邮箱',
      description: '已绑定邮箱：：' + userStore.getUserInfo?.email,
      extra: '修改',
    },
  ];
};

// 账号绑定 list
export const accountBindList: ListItem[] = [
  {
    key: '1',
    title: '绑定淘宝',
    description: '当前未绑定淘宝账号',
    extra: '绑定',
    avatar: 'ri:taobao-fill',
    color: '#ff4000',
  },
  {
    key: '2',
    title: '绑定支付宝',
    description: '当前未绑定支付宝账号',
    extra: '绑定',
    avatar: 'fa-brands:alipay',
    color: '#2eabff',
  },
  {
    key: '3',
    title: '绑定钉钉',
    description: '当前未绑定钉钉账号',
    extra: '绑定',
    avatar: 'ri:dingding-fill',
    color: '#2eabff',
  },
];

// 新消息通知 list
export const msgNotifyList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '其他用户的消息将以站内信的形式通知',
  },
  {
    key: '2',
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
  },
  {
    key: '3',
    title: '待办任务',
    description: '待办任务将以站内信的形式通知',
  },
];

export function getModalPasswordFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    showActionButtonGroup: false,
    // submitButtonOptions: {
    //   text: '保存',
    // },
    baseColProps: {
      span: 22,
    },
    actionColOptions: {
      span: 22,
    },
    schemas: [
      {
        field: 'oldPassword',
        label: '当前密码',
        component: 'InputPassword',
        helpMessage: '密码长度不得小于6位',

        rules: changePasswordFormRuleConfig().password_old,
      },
      {
        field: 'newPassword',
        label: '新密码',
        helpMessage: '密码长度不得小于6位',
        component: 'StrengthMeter',
        componentProps: {
          placeholder: '新密码',
        },
        rules: changePasswordFormRuleConfig().password,
      },
      {
        field: 'confirmPassword',
        label: '确认密码',
        component: 'InputPassword',
        helpMessage: '密码长度不得小于6位',
        rules: changePasswordFormRuleConfig().password_confirm,
      },
    ],
  };
}

export function getModalEmailFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    showActionButtonGroup: false,
    // submitButtonOptions: {
    //   text: '保存',
    // },
    baseColProps: {
      span: 22,
    },
    actionColOptions: {
      span: 22,
    },

    schemas: [
      {
        field: 'email',
        label: '新邮箱',
        component: 'Input',
        helpMessage: '作为登录账号使用',
        componentProps: {
          placeholder: '请输入新邮箱',
        },
        rules: emailRule,
      },

      {
        field: 'code',
        label: '验证码',
        component: 'InputCountDown',
        helpMessage: '验证码15分钟内有效',
        itemProps: { validateTrigger: 'blur' },
        rules: captchaRule,
        componentProps({ formModel, formActionType }) {
          return {
            sendCodeApi: async () => {
              await formActionType.validateFields(['email']);
              sendCode(formModel['email']);
            },
            placeholder: '请输入验证码',
          };
        },
      },
    ],
  };
}

const sendCode = async (username) => {
  await sendCodeUsingGet({ username });
  createMessage.success('验证码已发送至新邮箱');
};
