import { FormProps } from '/@/components/Table';
import { h } from 'vue';

import { UploadPic } from '../components';

// 弹窗内表单配置
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 0,
    showResetButton: false,
    baseColProps: {
      span: 24,
    },
    submitButtonOptions: {
      text: '发布',
    },

    actionColOptions: {
      flex: '100px',
    },
    schemas: [
      {
        field: `content`,
        label: '',
        component: 'InputTextArea',
        componentProps: {
          placeholder: '说点什么吧',
          showCount: true,
          maxlength: 100,
          rows: 5,
        },
        rules: [{ required: true }],
      },
      {
        field: `images`,
        label: '',
        component: 'Input',
        render: ({ model, field }) => {
          return h(UploadPic, {
            value: model[field],
            onChange: (value: string) => {
              model[field] = value;
            },
          });
        },
      },
      {
        field: ``,
        label: '',
        component: 'Input',
        slot: 'customSlot',
        colProps: {
          flex: '1 1 auto',
        },
      },
      {
        field: `isTop`,
        label: '置顶',
        colProps: {
          flex: '100px',
        },

        component: 'Switch',
        defaultValue: 0,
        componentProps: {
          checkedValue: 1,
          unCheckedValue: 0,
        },
      },
      {
        field: `status`,
        label: '',
        component: 'Select',
        colProps: {
          flex: '50px',
        },
        defaultValue: statusOption[0]['value'],
        componentProps: {
          options: statusOption,
          bordered: false,
          allowClear: false,
        },
      },

      //  隐藏字段
      {
        field: `id`,
        label: 'id',
        component: 'Input',
        dynamicDisabled: true,
        show: false,
      },
    ],
  };
}
export const statusOption = [
  { label: '公开', value: 1 },
  { label: '私密', value: 2 },
];

export enum ModalStatuEnum {
  EDIT = '编辑说说',
  ADD = '发布说说',
}
