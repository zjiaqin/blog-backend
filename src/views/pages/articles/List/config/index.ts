import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { listCategoriesAdminBySearchUsingGet, listTagsAdminBySearchUsingGet } from '/@/api/apis';

// 表格基础配置
export function getBasicColumns(): BasicColumn[] {
  return [
    // dataIndex 需根据正式接口响应字段修改。width：根据正式数据长度修改
    {
      title: '文章封面',
      dataIndex: 'articleCover',
      width: 140,
    },
    {
      title: '标题',
      dataIndex: 'articleTitle',
      width: 200,
    },
    {
      title: '分类',
      dataIndex: 'categoryName',
      width: 140,
    },
    {
      title: '标签',
      dataIndex: 'tagDTOs',
      width: 140,
    },
    {
      title: '浏览量',
      dataIndex: 'viewsCount',
      width: 160,
      format: (value) => {
        return value ?? 0;
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 140,
      format: (T: any) => {
        const { label } = typeOption.find((value) => value.value === T) ?? { label: '其它' };
        return label;
      },
    },
    {
      title: '发表时间',
      dataIndex: 'createTime',
      width: 180,
    },
    {
      title: '置顶',
      dataIndex: 'isTop',
      width: 160,
    },
    {
      title: '推荐',
      dataIndex: 'isFeatured',
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
        field: `type`,
        label: '',
        component: 'Select',
        componentProps: {
          placeholder: '请选择文章类型',
          options: typeOption,
        },
      },
      {
        field: 'categoryId',
        label: '',
        component: 'ApiSelect',
        componentProps: {
          placeholder: '请选择分类',
          api: listCategoriesAdminBySearchUsingGet,
          labelField: 'categoryName',
          valueField: 'id',
        },
      },
      {
        field: 'tagId',
        label: '',
        component: 'ApiSelect',
        componentProps: {
          placeholder: '请选择标签',
          api: listTagsAdminBySearchUsingGet,
          labelField: 'tagName',
          valueField: 'id',
        },
      },
      {
        field: 'keywords',
        label: '',
        component: 'Input',
        componentProps: {
          placeholder: '请输入关键词',
        },
      },
    ],
  };
}

export type Option = {
  label: string;
  value: number;
};

export const typeOption: Option[] = [
  { label: '原创', value: 1 },
  { label: '转载', value: 2 },
  { label: '翻译', value: 3 },
];

// 弹窗模式枚举
export enum ModalStatuEnum {
  EDIT = '编辑',
  ADD = '新增',
  DELETE = '删除',
  BATCHEDELE = '批量删除',
  BATCHOUT = '批量导出',
  BATCHIN = '批量导入',
}
