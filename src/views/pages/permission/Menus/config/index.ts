import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
// 表格基础配置
export function getBasicColumns(): BasicColumn[] {
  return [
    // dataIndex 需根据正式接口响应字段修改。width：根据正式数据长度修改
    {
      title: '菜单名称',
      dataIndex: 'name',
      width: 110,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: 140,
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      width: 140,
    },
    {
      title: '访问路径',
      dataIndex: 'path',
      width: 240,
    },
    {
      title: '组件路径',
      dataIndex: 'component',
      width: 140,
    },
    {
      title: '隐藏',
      dataIndex: 'isHidden',
      width: 140,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 140,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 200,
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
          placeholder: '请输入菜单名称',
        },
      },
    ],
  };
}

// 弹窗配置
export function getModalFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    showActionButtonGroup: false,
    // submitButtonOptions: {
    //   text: '保存',
    // },
    baseColProps: {
      span: 22,
    },
    actionColOptions: {
      span: 22,
    },
    schemas: [
      {
        field: 'MenuType',
        label: '菜单类型',
        component: 'Input',
        show: false,
      },
      {
        field: `name`,
        label: '菜单名称',
        component: 'Input',
        componentProps: {
          placeholder: '请输入菜单名称',
        },
        rules: [{ required: true }],
      },
      {
        field: `icon`,
        label: '菜单图标',
        component: 'IconPicker',
        componentProps: {
          placeholder: '请输入菜单名称',
        },
        rules: [{ required: true }],
      },
      {
        field: `component`,
        label: '组件路径',
        component: 'Input',
        defaultValue: 'LAYOUT',
        componentProps: {
          placeholder: '请输入组件路径',
        },
        rules: [{ required: true }],
        dynamicDisabled: (obj) => {
          const { model } = obj;
          return [ModelTypeEnum.ADDPARENT, ModelTypeEnum.EDITPARENT].includes(model['MenuType']);
        },
      },
      {
        field: `path`,
        label: '访问路径',
        component: 'Input',
        componentProps: {
          placeholder: '请输入菜单名称',
        },
        rules: [{ required: true }],
      },
      {
        field: `orderNum`,
        label: '显示排序',
        component: 'InputNumber',
        componentProps: {
          placeholder: '请输入显示顺序',
        },
        rules: [{ required: true }],
      },

      {
        field: `isHidden`,
        label: '显示状态',
        component: 'RadioGroup',
        defaultValue: 0,
        componentProps: {
          options: [
            {
              label: '显示',
              value: 0,
            },
            {
              label: '隐藏',
              value: 1,
            },
          ],
        },
      },
      {
        field: `id`,
        label: 'id',
        component: 'Input',
        dynamicDisabled: true,
        show: false,
      },
      {
        field: `parentId`,
        label: 'parentId',
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
  color: string;
};

export const typeOption: Option[] = [
  { label: '文章', value: 1, color: 'pink' },
  { label: '留言', value: 2, color: 'orange' },
  { label: '关于我', value: 3, color: 'green' },
  { label: '友链', value: 4, color: 'purple' },
  { label: '说说', value: 5, color: 'blue' },
];

export const statusMap = ['审核中', '正常'];

// 弹窗模式枚举
export enum ModalStatuEnum {
  ADDMENU = '新增菜单',
  ADDITEM = '新增',
  DELETE = '删除',
  EDIT = '修改',
}

export enum ModelTypeEnum {
  ADDPARENT = '新增主菜单',
  ADDCHILD = '新增子菜单',
  EDITPARENT = '编辑主菜单',
  EDITCHILD = '编辑子菜单',
}
