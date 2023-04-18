<template>
  <div class="quartz-list-table">
    <BasicTable @register="registerTable" title=" ">
      <template #tableTitle>
        <div class="flex w-full">
          <AButton
            type="primary"
            color="success"
            class="mr-2"
            preIcon="ion:add"
            @click="toEdit(ModalStatuEnum.ADD + '任务')"
            >{{ ModalStatuEnum.ADD }}</AButton
          >
          <AButton
            :disabled="!selectedID.length"
            type="primary"
            :loading="btnLoading.btnId === -2 && btnLoading.loading"
            class="mr-2"
            preIcon="ion:options-sharp"
            @click="toLog()"
            >{{ ModalStatuEnum.LOG }}</AButton
          >
          <AButton
            preIcon="ion:trash-a"
            :disabled="!selectedID.length"
            type="primary"
            :loading="btnLoading.btnId === -2 && btnLoading.loading"
            danger
            class="mr-2"
            @click="toDelete()"
            >{{ ModalStatuEnum.DELETE }}</AButton
          >
        </div>
      </template>
      <template #bodyCell="{ column, record }: { column: any, record: _listResp[0] }">
        <template v-if="column.key === 'status'">
          <Switch
            :loading="btnLoading.status && btnLoading.btnId === record['id']"
            :checkedValue="1"
            :unCheckedValue="0"
            v-model:checked="record[column.key]"
            @change="StatusChange(record.id, record[column.key])"
          >
            <template #checkedChildren><check-outlined /></template>
            <template #unCheckedChildren><close-outlined /></template>
          </Switch>
        </template>

        <template v-if="column.key === 'jobGroup'">
          <Tag color="blue">
            {{ record[column.key] }}
          </Tag>
        </template>

        <template v-if="column.key === 'operate'">
          <AButton
            size="small"
            :iconSize="16"
            :style="{ 'font-size': '12px' }"
            type="link"
            @click="toEdit(ModalStatuEnum.EDIT + '任务', record)"
            :loading="btnLoading.btnId === record.id && btnLoading.loading"
            >{{ ModalStatuEnum.EDIT }}</AButton
          >
          <AButton
            size="small"
            :iconSize="16"
            :style="{ 'font-size': '12px' }"
            type="link"
            @click="toDelete(record.id)"
            :loading="btnLoading.btnId === record.id && btnLoading.loading"
            >{{ ModalStatuEnum.DELETE }}</AButton
          >
          <Dropdown placement="bottom" trigger="click">
            <AButton
              size="small"
              :iconSize="16"
              :style="{ 'font-size': '12px' }"
              type="link"
              :loading="btnLoading.btnId === record.id && btnLoading.loading"
              >{{ ModalStatuEnum.MORE }}</AButton
            >
            <template #overlay>
              <Menu>
                <MenuItem
                  key="user-info"
                  text="执行一次"
                  icon="ant-design:fast-forward-outlined"
                  @click="toRunOnce(record)"
                />
                <MenuItem
                  key="logout"
                  text="任务详情"
                  icon="ant-design:eye-filled"
                  @click="toDesc(record.id)"
                />
                <MenuItem key="logout" text="调度日志" icon="ion:options-sharp" @click="toLog()" />
              </Menu>
            </template>
          </Dropdown>
        </template>
        <template v-if="column.key === 'createTime'">
          <Time :value="record[column.key]" mode="datetime" />
        </template>
      </template>
    </BasicTable>
    <AddModel @register="registerModal" @ok="updataTable" />
    <DescriptionModel @register="registerDescModal" />
  </div>
</template>

<script setup lang="ts">
  import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
  import { Tag, Switch, Menu, Dropdown } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { MenuItem, DescriptionModel, AddModel } from './index';

  import {
    listJobsUsingGet,
    deleteJobByIdUsingDelete,
    runJobUsingPut,
    updateJobStatusUsingPut,
  } from '/@/api/apis';
  import { Time } from '/@/components/Time';
  import { getBasicColumns, getFormConfig, ModalStatuEnum } from '../config';
  import type { listResp as _listResp } from '../types';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ref, reactive } from 'vue';
  import { useModal } from '/@/components/Modal';

  const [registerModal, { openModal, setModalProps }] = useModal();
  const [registerDescModal, { openModal: openDescModal }] = useModal();

  const { createMessage } = useMessage();

  const [registerTable, { reload }] = useTable({
    api: listJobsUsingGet,
    rowKey: (record) => {
      return record.id;
    }, //指定每行的key,用于多选框获取待操作的ID
    rowSelection: {
      onChange: (selectedRowKeys: number[]) => {
        selectedID.value = selectedRowKeys;
      }, //配置多选框 ，将选择的 行的ID添加到 多选数组中
    },
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getFormConfig(),
    showIndexColumn: false,

    pagination: {
      position: ['bottomCenter'],
    },
  });

  // 删除按钮加载控制
  const btnLoading = reactive({
    btnId: -99, //获取具体的按钮ID，避免整列的按钮状态都改变，-1 为批量删除 -2为批量审批
    loading: false, //删除
    status: false,
  });

  const selectedID = ref<number[]>([]);

  async function toDelete(id: _listResp[number]['id'] = -1) {
    btnLoading.btnId = id;
    btnLoading.loading = true;
    const ids: number[] = id === -1 ? selectedID.value : [id];
    try {
      await deleteJobByIdUsingDelete({ requestBody: ids });
      createMessage.success('操作成功');
    } catch {}
    btnLoading.loading = false;
    reload();
  }

  const StatusChange = async (id: _listResp[number]['id'] = -2, status) => {
    btnLoading.btnId = id;
    btnLoading.loading = true;
    btnLoading.status = true;
    try {
      await updateJobStatusUsingPut({ requestBody: { id, status } });
      createMessage.success('操作成功');
    } catch (error) {}
    btnLoading.loading = false;
    btnLoading.status = false;
    reload();
  };

  function toEdit(title: string, record: any = {}) {
    setModalProps({ title });

    openModal(true, { type: title, ...record });
  }

  const toLog = () => {};

  const toRunOnce = async (record: NonNullable<_listResp[number]>) => {
    const { id, jobGroup } = record;
    try {
      if (!id || !jobGroup) throw new Error('数据不足');
      await runJobUsingPut({ requestBody: { id, jobGroup } });
      createMessage.success('操作成功');
    } catch (error) {
      error instanceof Error && createMessage.error(error.message);
    }
  };

  const toDesc = (id) => {
    openDescModal(true, { id });
  };

  const updataTable = () => {
    setTimeout(() => {
      reload();
    }, 500);
  };
</script>

<style lang="less" scoped>
  .tabs {
    flex-basis: 100%;
    padding-left: 10px;
  }

  :deep(.ant-btn) {
    :last-child {
      margin-left: 0;
    }
  }
</style>
