import { FormProps } from '/@/components/Table';
import { MarkDown } from '/@/components/Markdown';
import { h } from 'vue';

export function getFormConfig(): Partial<FormProps> {
  return {
    layout: 'horizontal',
    showResetButton: false,
    submitButtonOptions: {
      text: '保存',
    },
    actionColOptions: {
      span: 22,
    },
    labelWidth: 0,
    baseColProps: {
      xxl: 24,
      xl: 24,
      lg: 24,
      sm: 24,
      xs: 24,
    },

    schemas: [
      {
        field: 'content',
        component: 'Input',
        label: '',
        rules: [{ required: true, trigger: 'blur', message: '请输入关于我的内容' }],
        render: ({ model, field }) => {
          return h(MarkDown, {
            value: model[field],
            onChange: (value: string) => {
              model[field] = value;
            },
            height: 650,
          });
        },
      },
    ],
  };
}
