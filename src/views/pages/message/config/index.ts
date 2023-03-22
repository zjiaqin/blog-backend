import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { listCategoriesAdminBySearchUsingGet, listTagsAdminBySearchUsingGet } from '/@/api/apis';

// 表格基础配置
export function getBasicColumns(): BasicColumn[] {
  return [
    // dataIndex 需根据正式接口响应字段修改。width：根据正式数据长度修改
    {
      title: '头像',
      dataIndex: 'avatar',
      width: 160,
    },
    {
      title: '评论人',
      dataIndex: 'nickname',
    },
    {
      title: '回复人',
      dataIndex: 'replyNickname',
      width: 220,
      format: (value) => {
        return value ?? '无';
      },
    },
    {
      title: '评论内容',
      dataIndex: 'commentContent',
      width: 140,
    },
    {
      title: '评论时间',
      dataIndex: 'createTime',
      width: 160,
    },
    {
      title: '状态',
      dataIndex: 'isReview',
      width: 160,
    },
    {
      title: '来源',
      dataIndex: 'type',
      width: 160,
      format: (T: any) => {
        const { label } = typeOption.find((obj) => obj.value === T) ?? { label: '其它' };
        return label;
      },
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
        field: `type`,
        label: '',
        component: 'Select',
        componentProps: {
          placeholder: '请选择文章类型',
          options: typeOption,
        },
      },
      {
        field: 'keywords',
        label: '',
        component: 'Input',
        componentProps: {
          placeholder: '请输入评论人名称',
        },
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
  ADD = '新增',
  DELETE = '删除',
  BATCHEDELE = '批量删除',
  BATCHPASS = '批量通过',
}
