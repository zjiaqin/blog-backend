import { FormProps } from '/@/components/Table';
import { MarkDown } from '/@/components/Markdown';
import { h, unref } from 'vue';
import { listCategoriesAdminBySearchUsingGet, listTagsAdminBySearchUsingGet } from '/@/api/apis';
import type { Rule } from 'ant-design-vue/es/form';
import { typeOption } from '../../List/config';
import { MyUpload } from '/@/components/MyUpload';

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
    baseColProps: {
      span: 22,
    },
    submitButtonOptions: {
      text: '发布',
    },

    actionColOptions: {
      span: 22,
    },
    schemas: [
      {
        field: `categoryName`,
        label: '文章分类',
        component: 'ApiSelect',
        itemProps: { validateTrigger: 'blur' },
        componentProps: {
          placeholder: '请选择分类',
          api: listCategoriesAdminBySearchUsingGet,
          labelField: 'categoryName',
          valueField: 'categoryName',
        },
        rules: [{ required: true }],
      },
      {
        field: `tagNames`,
        label: '文章标签',
        component: 'ApiSelect',
        itemProps: { validateTrigger: 'blur' },
        componentProps: {
          placeholder: '请选择标签',
          api: listTagsAdminBySearchUsingGet,
          labelField: 'tagName',
          valueField: 'tagName',
          mode: 'tags',
        },
        rules: [{ validator: validateSelect }],
        required: true,
      },
      {
        field: `type`,
        label: '文章类型',
        component: 'Select',
        itemProps: { validateTrigger: 'blur' },
        componentProps: {
          placeholder: '请选择类型',
          options: typeOption,
        },
        required: true,
      },
      {
        field: `articleCover`,
        label: '上传封面',
        component: 'Input',
        render: ({ model, field }) => {
          return h(MyUpload, {
            value: model[field],
            onChange: (value: string) => {
              model[field] = value;
            },
          });
        },
        required: true,
      },
      {
        field: `isTop`,
        label: '置顶',
        component: 'Switch',
        defaultValue: 0,
        componentProps: {
          checkedValue: 1,
          unCheckedValue: 0,
        },
      },
      {
        field: `isFeatured`,
        label: '推荐',
        component: 'Switch',
        defaultValue: 0,
        componentProps: {
          checkedValue: 1,
          unCheckedValue: 0,
        },
      },
      {
        field: `status`,
        label: '发布形式',
        component: 'RadioGroup',
        defaultValue: 1,
        componentProps: {
          options: [
            {
              label: '公开',
              value: 1,
            },
            {
              label: '密码',
              value: 2,
            },
          ],
        },
      },
      {
        field: `password`,
        label: '访问密码',
        component: 'Input',
        componentProps: {
          placeholder: '请输入密码',
        },
        show: ({ model }) => {
          return unref(model)['status'] === 2;
        },
        required: false,
        // dynamicRules: ({ model }) => {
        //   if (unref(model)['status'] === 2) {
        //     return [{ required: true }];
        //   }
        //   return [{ required: false }];
        // },
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

const validateSelect = async (_rule: Rule, value: any) => {
  if (unref(value)?.length > 3) {
    return Promise.reject('标签不能超过3个');
  } else {
    return Promise.resolve();
  }
};
