import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { DescItem } from '/@/components/Description/index';
import { formatToDateTime } from '/@/utils/dateUtil';
import { listJobGroupUsingGet } from '/@/api/apis';
// 表格基础配置
export function getBasicColumns(): BasicColumn[] {
  return [
    // dataIndex 需根据正式接口响应字段修改。width：根据正式数据长度修改
    {
      title: '任务名称',
      dataIndex: 'jobName',
      width: 110,
    },
    {
      title: '任务组名',
      dataIndex: 'jobGroup',
      width: 140,
    },
    {
      title: '调用目标字符串',
      dataIndex: 'invokeTarget',
      width: 140,
      format: (value) => {
        return value ?? '无';
      },
    },
    {
      title: 'cron执行表达',
      dataIndex: 'cronExpression',
      width: 240,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 140,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 140,
    },
    {
      title: '备注',
      dataIndex: 'remark',
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
          options: getOption(statusMap),
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

    baseColProps: {
      span: 22,
    },
    actionColOptions: {
      span: 22,
    },
    schemas: [
      {
        field: 'jobName',
        label: '任务名称',
        component: 'Input',
        componentProps: {
          placeholder: '请输入任务名称',
        },
        rules: [{ required: true }],
      },
      {
        field: `jobGroup`,
        label: '任务分组',
        component: 'Input',
        componentProps: {
          placeholder: '请输入任务分组',
        },
        rules: [{ required: true }],
      },
      {
        field: `invokeTarget`,
        label: '调用方法',
        component: 'Input',
        componentProps: {
          placeholder: '请输入调用方法',
        },
        rules: [{ required: true }],
      },
      {
        field: `cronExpression`,
        label: 'cron表达式',
        component: 'Input',
        slot: 'customSlot',
        componentProps: {
          placeholder: '请输入cron表达式',
        },
        rules: [{ required: true }],
      },
      {
        field: `misfirePolicy`,
        label: '错误策略',
        component: 'RadioButtonGroup',
        defaultValue: 0,
        componentProps: {
          options: getOption(misfirePolicyMap),
        },
      },
      {
        field: `concurrent`,
        label: '是否并发',
        component: 'RadioButtonGroup',
        defaultValue: 0,
        componentProps: {
          options: getOption(concurrentMap),
        },
      },

      {
        field: `status`,
        label: '状态',
        component: 'RadioGroup',
        defaultValue: 1,
        componentProps: {
          options: getOption(statusMap),
        },
      },
      {
        field: `remark`,
        label: '备注',
        component: 'InputTextArea',
        componentProps: {
          placeholder: '请输入备注',
          showCount: true,
          maxlength: 50,
          rows: 3,
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

//描述弹窗label配置
export const schema: DescItem[] = [
  {
    field: 'id',
    label: '任务编号',
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
    label: '创建时间',
    render(value) {
      return formatToDateTime(value);
    },
  },
  {
    field: 'cronExpression',
    label: 'cron表达式',
  },
  {
    field: 'nextValidTime',
    label: '下次执行时间',
    render(value) {
      return formatToDateTime(value);
    },
  },
  {
    field: 'invokeTarget',
    label: '调用目标方法',
  },
  {
    field: 'status',
    label: '任务状态',
    render(value) {
      return statusMap.get(value);
    },
  },
  {
    field: 'concurrent',
    label: '是否并发',
    render(value) {
      return concurrentMap.get(value);
    },
  },
  {
    field: 'misfirePolicy',
    label: '执行策略',
    render(value) {
      return misfirePolicyMap.get(value);
    },
  },
  {
    field: 'remark',
    label: '备注',
  },
];

//status Map
const statusMap = new Map([
  [0, '暂停'],
  [1, '正常'],
]);

const concurrentMap = new Map([
  [0, '允许'],
  [1, '禁止'],
]);

const misfirePolicyMap = new Map([
  [0, '默认策略'],
  [1, '立即执行'],
  [2, '执行一次'],
  [3, '执行放弃'],
]);

const getOption = (map) => {
  const obj: any[] = [];
  for (const [value, label] of map) {
    obj.push({ label, value });
  }
  return obj;
};

// 弹窗模式枚举
export enum ModalStatuEnum {
  ADD = '新增',
  DELETE = '删除',
  BATCHEDELE = '批量删除',
  LOG = '日志',
  EDIT = '编辑',
  MORE = '更多',
}
