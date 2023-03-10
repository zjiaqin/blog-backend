import { type } from 'os';
import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

// 表格基础配置
export function getBasicColumns(): BasicColumn[] {
  return [
    // dataIndex 需根据正式接口响应字段修改。width：根据正式数据长度修改
    {
      title: '文章封面',
      dataIndex: 'articleCover',
      width: 160,
    },
    {
      title: '标题',
      dataIndex: 'articleTitle',
    },
    {
      title: '分类',
      dataIndex: 'categoryName',
      width: 220,
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
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 160,
    },
    {
      title: '发表时间',
      dataIndex: 'createTime',
      width: 160,
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
          option: setOption(),
        },
      },
      {
        field: 'categoryName',
        label: '',
        component: 'Select',
        componentProps: {
          placeholder: '请选择分类',
        },
      },
      {
        field: 'tagDTOs',
        label: '',
        component: 'Select',
        componentProps: {
          placeholder: '请选择标签',
          options: [
            {
              label: 'TRC20',
              value: 'TRC20',
            },
            {
              label: 'ERC20',
              value: 'ERC20',
            },
            {
              label: 'BEP20',
              value: 'BEP20',
            },
          ],
        },
      },
      {
        field: 'chain',
        label: '',
        component: 'Input',
        componentProps: {
          placeholder: '请输入文章名',
        },
      },
    ],
  };
}

export const typeMap = new Map({
  1: '原创',
  2: '转载',
  3: '翻译',
});

export type Option = {
  label: string | number;
  value: string;
};

export const setOption = () => {
  const optionArr: Option[] = [];
  for (const [key, value] of Object.entries(typeMap)) {
    const obj: Option = { label: key, value };
    optionArr.push(obj);
  }

  return optionArr;
};
