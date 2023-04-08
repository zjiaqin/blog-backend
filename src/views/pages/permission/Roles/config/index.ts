import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

// 表格基础配置
export function getBasicColumns(): BasicColumn[] {
  return [
    // dataIndex 需根据正式接口响应字段修改。width：根据正式数据长度修改
    {
      title: '角色名',
      dataIndex: 'roleName',
      width: 140,
    },
    {
      title: '权限标签',
      dataIndex: 'id',
      width: 200,
    },

    {
      title: '发表时间',
      dataIndex: 'createTime',
      width: 180,
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

// 弹窗表单配置
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
        field: 'type',
        label: '菜单类型',
        component: 'Input',
        show: false,
      },
      {
        field: 'roleName',
        label: '角色名',
        component: 'Input',
        required: true,
      },
      {
        field: `resourceIds`,
        label: '资源权限',
        component: 'Input',
        defaultValue: [],
        slot: 'customResource',
        show(renderCallbackParams) {
          const { model } = renderCallbackParams;
          return [ModalStatuEnum.RESOURCE, ModalStatuEnum.ADD].includes(model['type']);
        },
      },
      {
        field: `menuIds`,
        label: '菜单权限',
        component: 'Input',
        slot: 'customMenu',
        defaultValue: [],
        show(renderCallbackParams) {
          const { model } = renderCallbackParams;
          return [ModalStatuEnum.MENU, ModalStatuEnum.ADD].includes(model['type']);
        },
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

export type Option = {
  label: string;
  value: number;
};

// 弹窗模式枚举
export enum ModalStatuEnum {
  MENU = '菜单权限',
  RESOURCE = '资源权限',
  ADD = '新增',
  DELETE = '删除',
  BATCHEDELE = '批量删除',
}
