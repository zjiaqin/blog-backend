import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
// 表格基础配置
export function getBasicColumns(): BasicColumn[] {
  return [
    // dataIndex 需根据正式接口响应字段修改。width：根据正式数据长度修改
    {
      title: '链接头像',
      dataIndex: 'linkAvatar',
      width: 110,
    },
    {
      title: '链接名',
      dataIndex: 'linkName',
      width: 140,
    },
    {
      title: '链接地址',
      dataIndex: 'linkAddress',
      width: 140,
      format: (value) => {
        return value ?? '无';
      },
    },
    {
      title: '连接介绍',
      dataIndex: 'linkIntro',
      width: 240,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 140,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 140,
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
          placeholder: '请输入友链名称',
        },
      },
    ],
  };
}
//弹窗内表单配置
export function getModalFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    showActionButtonGroup: false,

    baseColProps: {
      span: 22,
    },
    actionColOptions: {
      span: 22,
    },
    schemas: [
      {
        field: 'linkName',
        label: '链接名',
        component: 'Input',
        componentProps: {
          placeholder: '请输入链接名称',
        },
        rules: [{ required: true }],
      },
      {
        field: `linkAvatar`,
        label: '链接头像',
        component: 'Input',
        componentProps: {
          placeholder: '请输入链接头像地址',
        },
        rules: [{ required: true }],
      },
      {
        field: `linkAddress`,
        label: '链接地址',
        component: 'Input',
        componentProps: {
          placeholder: '请输入链接地址',
        },
        rules: [{ required: true }],
      },
      {
        field: `linkIntro`,
        label: '链接介绍',
        component: 'InputTextArea',
        componentProps: {
          placeholder: '请输入链接介绍',
          showCount: true,
          maxlength: 30,
          rows: 2,
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

export const statusMap = ['审核中', '正常'];

// 弹窗模式枚举
export enum ModalStatuEnum {
  ADD = '新增',
  EDIT = '编辑',
  DELETE = '删除',
  BATCHEDELE = '批量删除',
}
