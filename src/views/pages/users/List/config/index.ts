import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { isArray } from '/@/utils/is';
import { useUserStore } from '/@/store/modules/user';
const userStore = useUserStore();
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
      title: '登录方式',
      dataIndex: 'loginType',
      width: 140,
    },
    {
      title: '用户角色',
      dataIndex: 'roles',
      width: 240,
    },
    {
      title: '禁用',
      dataIndex: 'isDisable',
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
      title: '创建时间',
      dataIndex: 'createTime',
      width: 140,
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
        field: `loginType`,
        label: '',
        component: 'Select',
        componentProps: {
          placeholder: '请选择登录方式',
          options: typeOption,
        },
      },
      {
        field: 'keywords',
        label: '',
        component: 'Input',
        componentProps: {
          placeholder: '请输入昵称',
        },
      },
    ],
  };
}

// 弹出表单配置
export function getModalFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    showActionButtonGroup: false,
    baseColProps: {
      span: 22,
    },

    schemas: [
      {
        field: `nickname`,
        label: '昵称',
        component: 'Input',
        componentProps: {
          placeholder: '请输入昵称',
        },
        rules: [{ required: true }],
      },
      // roleCheckBoxsOption
      {
        field: `roleIds`,
        label: '角色',
        component: 'CheckboxGroup',
        componentProps: {
          options: getRoleCheckBoxsOption(),
        },
        rules: [{ required: true }],
      },
      {
        field: `userInfoId`,
        label: 'id',
        component: 'Input',
        dynamicDisabled: true,
        show: false,
      },
    ],
  };
}

export type Option = {
  label: string;
  value: number;
};

export const typeOption: Option[] = [
  { label: '邮箱', value: 1 },
  { label: 'QQ', value: 2 },
];

export const loginTypeMap = new Map([
  [1, '邮箱'],
  [2, 'QQ'],
]);

export const statusMap = ['审核中', '正常'];

// 弹窗模式枚举
export enum ModalStatuEnum {
  ADD = '新增',
  DELETE = '删除',
  EDIT = '编辑',
}

export const getRoleCheckBoxsOption = () => {
  const res = userStore.getRoleList;
  console.log(res);

  const options: Option[] = [];

  isArray(res) &&
    res.forEach((item) => {
      options.push({ label: item.roleName!, value: item.id! });
    });
  return options;
};
