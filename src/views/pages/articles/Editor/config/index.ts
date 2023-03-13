import { FormProps } from '/@/components/Table';
import { MarkDown } from '/@/components/Markdown';
import { h } from 'vue';

export function getFormConfig(): Partial<FormProps> {
  return {
    layout: 'horizontal',
    showResetButton: false,
    rowProps: {
      gutter: 20,
    },
    labelWidth: 0,
    baseColProps: {
      xxl: 24,
      xl: 24,
      lg: 24,
      sm: 24,
      xs: 24,
    },

    showActionButtonGroup: false,
    schemas: [
      {
        field: 'articleTitle',
        component: 'Input',
        label: '',
        rules: [{ required: true, message: '请输入标题' }],
        componentProps: {
          placeholder: '请输入文章标题',
        },
        colProps: {
          flex: 22,
        },
      },
      {
        field: 'btn',
        component: 'Input',
        label: '',
        slot: 'customSlot',
        colProps: {
          flex: 2,
        },
      },
      {
        field: 'articleContent',
        component: 'Input',
        label: '',
        rules: [{ required: true, trigger: 'blur', message: '请输入文章内容' }],
        render: ({ model, field }) => {
          return h(MarkDown, {
            value: model[field],
            onChange: (value: string) => {
              model[field] = value;
            },
          });
        },
      },
    ],
  };
}

// 弹窗内表单配置
export function getModalFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    showActionButtonGroup: false,
    baseColProps: {
      span: 22,
    },

    schemas: [
      {
        field: `tagName`,
        label: '文章分类',
        component: 'Input',
        componentProps: {
          placeholder: '请输入标签名称',
        },
        rules: [{ required: true }],
      },
      {
        field: `tagName`,
        label: '文章标签',
        component: 'Input',
        componentProps: {
          placeholder: '请输入标签名称',
        },
        rules: [{ required: true }],
      },
      {
        field: `tagName`,
        label: '文章类型',
        component: 'Input',
        componentProps: {
          placeholder: '请输入标签名称',
        },
        rules: [{ required: true }],
      },
      {
        field: `tagName`,
        label: '上传封面',
        component: 'Input',
        componentProps: {
          placeholder: '请输入标签名称',
        },
        rules: [{ required: true }],
      },
      {
        field: `tagName`,
        label: '置顶',
        component: 'Input',
        componentProps: {
          placeholder: '请输入标签名称',
        },
        rules: [{ required: true }],
      },
      {
        field: `tagName`,
        label: '推荐',
        component: 'Input',
        componentProps: {
          placeholder: '请输入标签名称',
        },
        rules: [{ required: true }],
      },
      //  隐藏字段
      {
        field: `id`,
        label: 'id',
        component: 'Input',
        dynamicDisabled: true,
        show: false,
      },
      {
        field: `articleContent`,
        label: 'articleContent',
        component: 'Input',
        dynamicDisabled: true,
        show: false,
      },
      {
        field: `articleTitle`,
        label: 'articleTitle',
        component: 'Input',
        dynamicDisabled: true,
        show: false,
      },
    ],
  };
}

export enum ModalStatuEnum {
  EDIT = '编辑文章',
  ADD = '发布文章',
}
