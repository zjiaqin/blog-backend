<template>
  <div class="Tags-list-table">
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <AButton type="primary" class="mr-2" @click="openPopup(ModalStatuEnum.ADD)">
          {{ ModalStatuEnum.ADD }}
        </AButton>
        <AButton
          type="primary"
          danger
          :disabled="!selectedID?.length"
          @click="toDelete(-1)"
          :loading="btnLoading.btnId === -1 && btnLoading.loading"
        >
          {{ ModalStatuEnum.BATCHEDELE }}
        </AButton>
      </template>
      <template #bodyCell="{ column, record }: { column: any, record: _listResp[0] }">
        <template v-if="column.key === 'tagName'">
          <Tag color="cyan">{{ record[column.key] }}</Tag>
        </template>
        <template v-if="column.key === 'operate'">
          <AButton
            size="small"
            :style="{ 'font-size': '12px' }"
            type="primary"
            class="mr-2"
            @click="openPopup(ModalStatuEnum.EDIT, record)"
            >{{ ModalStatuEnum.EDIT }}</AButton
          >
          <AButton
            size="small"
            :style="{ 'font-size': '12px' }"
            type="primary"
            danger
            @click="toDelete(record.id)"
            :loading="btnLoading.btnId === record.id && btnLoading.loading"
            >{{ ModalStatuEnum.DELETE }}</AButton
          >
        </template>
        <template v-if="column.key === 'createTime'">
          <Time :value="record[column.key]" mode="datetime" />
        </template>
      </template>
    </BasicTable>
    <Popup @register="registerModal" @update="reload" />
  </div>
</template>

<script setup lang="ts">
  import { Tag } from 'ant-design-vue';
  import { ref, reactive } from 'vue';
  import { Time } from '/@/components/Time';
  import { Popup } from './index';
  import { BasicTable, useTable } from '/@/components/Table';
  import { listTagsAdminUsingGet, deleteTagUsingDelete } from '/@/api/apis';
  import { getBasicColumns, getFormConfig, ModalStatuEnum } from '../config';
  import { useModal } from '/@/components/Modal';
  import type { listResp as _listResp } from '../types';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const [registerTable, { reload }] = useTable({
    api: listTagsAdminUsingGet,
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

  const [registerModal, { openModal, setModalProps }] = useModal();

  // 修改分类（新增或编辑）
  function openPopup(mode: ModalStatuEnum, row: _listResp[0] = {}) {
    setModalProps({ title: `${mode}标签` });
    openModal(true, row);
  }

  // 删除按钮加载控制
  const btnLoading = reactive({
    btnId: -1, //获取具体的按钮ID，避免整列的按钮状态都改变，-1 为批量删除
    loading: false, //删除
  });

  const selectedID = ref<number[]>([-1]);
  async function toDelete(id: _listResp[number]['id'] = -1) {
    btnLoading.btnId = id;
    btnLoading.loading = true;
    const requestBody: number[] = id === -1 ? selectedID.value : [id];
    try {
      await deleteTagUsingDelete({ requestBody });
      createMessage.success('操作成功');
    } catch {}
    btnLoading.loading = false;
    reload();
  }
</script>

<style lang="less" scoped></style>
