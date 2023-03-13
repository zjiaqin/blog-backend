import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

// 表格基础配置
export function getBasicColumns(): BasicColumn[] {
  return [
    // dataIndex 需根据正式接口响应字段修改。width：根据正式数据长度修改
    {
      title: '标签名',
      dataIndex: 'tagName',
      width: 60,
    },
    {
      title: '文章量',
      dataIndex: 'articleCount',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 200,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 160,
    },
  ];
}

// 表格顶部表单配置
export function getFormConfig(): Partial<FormProps> {
  return {
    layout: 'horizontal',
    showResetButton: false,
    rowProps: {
      gutter: 20,
    },
    baseColProps: {
      xxl: 6,
      xl: 6,
      lg: 6,
      sm: 24,
      xs: 24,
    },
    actionColOptions: {
      xxl: 1,
      xl: 1,
      lg: 1,
      sm: 24,
      xs: 24,
    },
    submitButtonOptions: {
      text: '搜索',
    },
    schemas: [
      {
        field: 'keywords',
        component: 'Input',
        label: '关键词',
        componentProps: {
          placeholder: '请输入关键词',
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
        label: '标签名称',
        helpMessage: '文章的标签名称',
        component: 'Input',
        componentProps: {
          placeholder: '请输入标签名称',
        },
        rules: [{ required: true }],
      },
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

// 选择框配置
export const getradioButtonOptions = () => [
  {
    label: '启用',
    value: radioValuEnum.TRUE,
  },
  {
    label: '禁用',
    value: radioValuEnum.False,
  },
];

// 弹窗内表单配置
export enum radioValuEnum {
  False = '0',
  TRUE = '1',
}

// 弹窗模式枚举
export enum ModalStatuEnum {
  EDIT = '编辑',
  ADD = '新增',
  DELETE = '删除',
  BATCHEDELE = '批量删除',
}
