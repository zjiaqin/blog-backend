import { FormProps } from '/@/components/Table';
import { Tag } from 'ant-design-vue';
import { listJobGroupUsingGet } from '/@/api/apis';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { DescItem } from '/@/components/Description/index';
import { Time } from '/@/components/Time';
import { h } from 'vue';

// 表格基础配置
export function getBasicColumns(): BasicColumn[] {
  return [
    // dataIndex 需根据正式接口响应字段修改。width：根据正式数据长度修改
    {
      title: '日志编号',
      dataIndex: 'id',
      width: 140,
    },
    {
      title: '任务名称',
      dataIndex: 'jobName',
      width: 200,
    },

    {
      title: '任务组名',
      dataIndex: 'jobGroup',
      width: 180,
      customRender({ value }) {
        return h(Tag, { innerHTML: value, color: 'blue' });
      },
    },
    {
      title: '调用目标字符串',
      dataIndex: 'invokeTarget',
      width: 160,
    },
    {
      title: '日志信息',
      dataIndex: 'jobMessage',
      width: 160,
    },
    {
      title: '执行状态',
      dataIndex: 'status',
      width: 160,
      customRender({ value }) {
        return h(Tag, { innerHTML: StatusMap.get(value), color: value ? 'success' : 'error' });
      },
    },
    {
      title: '执行时间',
      dataIndex: 'createTime',
      width: 160,

      customRender({ value }) {
        return h(Time, { mode: 'datetime', value });
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
    fieldMapToTime: [['datetime', ['startTime', 'endTime'], 'YYYY-MM-DD']],
    schemas: [
      {
        field: 'jobId',
        label: '',
        component: 'Input',
      },
      {
        field: 'jobName',
        label: '',
        component: 'Input',
        componentProps: {
          placeholder: '请输入任务名称',
        },
      },
      {
        field: 'jobGroup',
        label: '',

        component: 'ApiSelect',
        componentProps: {
          placeholder: '请选择任务组名',
          api: async () => {
            const res = (await listJobGroupUsingGet(undefined)) as [];
            const newArr = res.map((item) => {
              return { label: item, value: item };
            });
            return newArr;
          },
        },
      },
      {
        field: 'status',
        label: '',
        component: 'Select',
        componentProps: {
          placeholder: '请选择任务状态',
          options: getOption(StatusMap),
        },
      },
      {
        field: 'datetime',
        label: '',
        component: 'RangePicker',
      },
    ],
  };
}

// 弹窗详细

export const Descschema: DescItem[] = [
  {
    field: 'id',
    label: '日志序号',
  },
  {
    field: 'jobGroup',
    label: '任务分组',
  },
  {
    field: 'jobName',
    label: '任务名称',
  },
  {
    field: 'createTime',
    label: '执行时间',
    render(value) {
      return h(Time, { mode: 'datetime', value });
    },
  },
  {
    field: 'invokeTarget',
    label: '调用方法',
  },
  {
    field: 'jobMessage',
    label: '日志信息',
  },
  {
    field: 'status',
    label: '执行状态',
    render(value) {
      return StatusMap.get(value);
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
  CLEAN = '清空',
}

export const StatusMap = new Map([
  [1, '成功'],
  [0, '失败'],
]);

const getOption = (map) => {
  const obj: any[] = [];
  for (const [value, label] of map) {
    obj.push({ label, value });
  }
  return obj;
};
