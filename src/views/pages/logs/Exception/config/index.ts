import { FormProps } from '/@/components/Table';
import { Tag } from 'ant-design-vue';
import { CodeEditor } from '/@/components/CodeEditor';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { DescItem } from '/@/components/Description/index';
import { h } from 'vue';

// 表格基础配置
export function getBasicColumns(): BasicColumn[] {
  return [
    // dataIndex 需根据正式接口响应字段修改。width：根据正式数据长度修改
    {
      title: '请求接口',
      dataIndex: 'optUri',
      width: 140,
    },
    {
      title: '操作描述',
      dataIndex: 'optDesc',
      width: 200,
    },

    {
      title: '请求方式',
      dataIndex: 'requestMethod',
      width: 180,
    },
    {
      title: '登录ip',
      dataIndex: 'ipAddress',
      width: 160,
    },
    {
      title: '登录地址',
      dataIndex: 'ipSource',
      width: 160,
    },
    {
      title: '操作日期',
      dataIndex: 'createTime',
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 160,
    },
  ];
}

// 表单配置
export function getFormConfig(): Partial<FormProps> {
  return {
    layout: 'horizontal',
    showAdvancedButton: false, // 展开/收起 按钮
    showResetButton: false,
    // labelWidth: 100,
    rowProps: {
      gutter: 20,
    },
    actionColOptions: {
      xxl: 1,
      xl: 2,
      lg: 5,
      sm: 24,
    },
    submitButtonOptions: {
      text: '搜索',
    },
    baseColProps: {
      xxl: 4,
      xl: 4,
      lg: 12,
      sm: 24,
    },
    schemas: [
      {
        field: 'keywords',
        label: '',
        component: 'Input',
        componentProps: {
          placeholder: '请输入角色名',
        },
      },
    ],
  };
}

// 弹窗详细

export const Descschema: DescItem[] = [
  {
    field: 'optUri',
    label: '操作接口',
  },
  {
    field: 'optMethod',
    label: '操作方法',
  },
  {
    field: 'requestMethod',
    label: '请求方法',
    render(value) {
      return h(Tag, { innerHTML: value, color: requestMethodMap.get(value) ?? 'orange' });
    },
  },
  {
    field: 'requestParam',
    label: '请求参数',
  },
  {
    field: 'exceptionInfo',
    label: '更多信息',

    render(value) {
      return h(CodeEditor, { value, readonly: true });
    },
  },
];

export type Option = {
  label: string;
  value: number;
};

// 弹窗模式枚举
export enum ModalStatuEnum {
  DETAIL = '查看',
  DELETE = '删除',
  BATCHEDELE = '批量删除',
}

export const requestMethodMap = new Map([
  ['POST', 'blue'],
  ['GET', 'green'],
  ['DELETE', 'red'],
  ['PUT', 'purple'],
]);
