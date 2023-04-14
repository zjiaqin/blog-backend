import { FormProps } from '/@/components/Table';
import { UploadPic } from '../components';
import { h } from 'vue';

export const tabsMap = new Map([
  [0, '网站信息'],
  [1, '社交信息'],
  [2, '其他设置'],
]);

const websiteSchems = {
  labal: tabsMap.get(0),
  schems: [
    {
      field: `authorAvatar`,
      label: '作者头像',
      component: 'Input',
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(UploadPic, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
          style: { height: '112px' },
        });
      },
    },
    {
      field: `logo`,
      label: '网站Logo',
      component: 'Input',
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(UploadPic, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
          style: { height: '112px' },
        });
      },
    },
    {
      field: `name`,
      label: '网站名称',
      component: 'Input',
      rules: [{ required: true }],
    },
    {
      field: `englishName`,
      label: '网站英文名称',
      component: 'Input',
      rules: [{ required: true }],
    },
    {
      field: `author`,
      label: '网站作者',
      component: 'Input',
      rules: [{ required: true }],
    },
    {
      field: `authorIntro`,
      label: '作者介绍',
      component: 'Input',
      rules: [{ required: true }],
    },
    {
      field: `multiLanguage`,
      label: '多语言',
      component: 'RadioGroup',
      defaultValue: 1,
      componentProps: {
        options: [
          {
            label: '关闭',
            value: 0,
          },
          {
            label: '开启',
            value: 1,
          },
        ],
      },
    },
    {
      field: `websiteCreateTime`,
      label: '网站创建时间',
      component: 'DatePicker',
      rules: [{ required: true }],
    },

    {
      field: `notice`,
      label: '网站公告',
      component: 'InputTextArea',
      componentProps: {
        placeholder: '说点什么吧',
        showCount: true,
        maxlength: 100,
        rows: 4,
      },
      rules: [{ required: true }],
    },

    {
      field: `beianNumber`,
      label: '备案号',
      component: 'Input',
      rules: [{ required: true }],
    },

    {
      field: `qqLogin`,
      label: 'qq登录',
      component: 'RadioGroup',
      defaultValue: 1,
      componentProps: {
        options: [
          {
            label: '关闭',
            value: 0,
          },
          {
            label: '开启',
            value: 1,
          },
        ],
      },
    },
  ],
};

const socialSchems = {
  labal: tabsMap.get(1),
  schems: [
    {
      field: `github`,
      label: 'Github',
      component: 'Input',
    },
    {
      field: `gitee`,
      label: 'Gitee',
      component: 'Input',
    },
    {
      field: `qq`,
      label: 'QQ',
      component: 'Input',
    },
    {
      field: `weChat`,
      label: 'WeChat',
      component: 'Input',
    },
    {
      field: `weibo`,
      label: '微博',
      component: 'Input',
    },
    {
      field: `csdn`,
      label: 'CSDN',
      component: 'Input',
    },
    {
      field: `zhihu`,
      label: '知乎',
      component: 'Input',
    },
    {
      field: `juejin`,
      label: '掘金',
      component: 'Input',
    },

    {
      field: `twitter`,
      label: 'twitter',
      component: 'Input',
    },

    {
      field: `stackoverflow`,
      label: 'stackoverflow',
      component: 'Input',
    },
  ],
};

const orderSchems = {
  labal: tabsMap.get(2),
  schems: [
    {
      field: `userAvatar`,
      label: '用户头像',
      component: 'Input',
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(UploadPic, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
          style: { height: '112px' },
        });
      },
    },
    {
      field: `touristAvatar`,
      label: '游客头像',
      component: 'Input',
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(UploadPic, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
          style: { height: '112px' },
        });
      },
    },
    {
      field: `isEmailNotice`,
      label: '邮箱通知',
      component: 'RadioGroup',
      defaultValue: 1,
      componentProps: {
        options: [
          {
            label: '关闭',
            value: 0,
          },
          {
            label: '开启',
            value: 1,
          },
        ],
      },
    },
    {
      field: `isCommentReview`,
      label: '评论审核',
      component: 'RadioGroup',
      defaultValue: 1,
      componentProps: {
        options: [
          {
            label: '关闭',
            value: 0,
          },
          {
            label: '开启',
            value: 1,
          },
        ],
      },
    },
    {
      field: `isReward`,
      label: '打赏状态',
      component: 'RadioGroup',
      defaultValue: 1,
      componentProps: {
        options: [
          {
            label: '关闭',
            value: 0,
          },
          {
            label: '开启',
            value: 1,
          },
        ],
      },
    },
    {
      field: `weiXinQRCode`,
      label: '微信收款码',
      component: 'Input',
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(UploadPic, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
          style: { height: '112px' },
        });
      },
    },
    {
      field: `alipayQRCode`,
      label: '支付宝收款码',
      component: 'Input',
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(UploadPic, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
          style: { height: '112px' },
        });
      },
    },
  ],
};

// 表单配置
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 120,
    showResetButton: false,
    baseColProps: {
      span: 24,
    },
    baseRowStyle: {
      maxWidth: '500px',
    },
    submitButtonOptions: {
      text: '修改',
    },

    actionColOptions: {
      xxl: 6,
      xl: 6,
      lg: 6,
      sm: 24,
      xs: 24,
    },
    schemas: mergeSchemas(websiteSchems, socialSchems, orderSchems),
  };
}

const mergeSchemas = (...arg) => {
  const schemas: any[] = [
    {
      field: `type`,
      label: '类型',
      component: 'Input',
      defaultValue: tabsMap.get(0),
      rules: [{ required: true }],
      show: false,
    },
  ];
  arg.forEach((item) => {
    item.schems.forEach((obj) => {
      obj.show = (renderCallbackParams): any => {
        return renderCallbackParams.model['type'] === item.labal;
      };

      schemas.push(obj);
    });
  });

  return schemas;
};
