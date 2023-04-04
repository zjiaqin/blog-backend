import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

// 表格基础配置
export function getBasicColumns(): BasicColumn[] {
  return [
    // dataIndex 需根据正式接口响应字段修改。width：根据正式数据长度修改
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 110,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      width: 140,
    },
    {
      title: '登录ip',
      dataIndex: 'ipAddress',
      width: 140,
    },
    {
      title: '登录地址',
      dataIndex: 'ipSource',
      width: 140,
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      width: 140,
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      width: 240,
    },

    {
      title: '上次登录时间',
      dataIndex: 'lastLoginTime',
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
          placeholder: '请输入用户昵称',
        },
      },
    ],
  };
}

// 弹窗模式枚举
export enum ModalStatuEnum {
  LOGOUT = '下线',
}
