<template>
  <div class="categories-list-table">
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
  import { ref, reactive } from 'vue';
  import { Time } from '/@/components/Time';
  import { Popup } from './index';
  import { BasicTable, useTable } from '/@/components/Table';
  import { listCategoriesAdminUsingGet, deleteCategoriesUsingDelete } from '/@/api/apis';
  import { getBasicColumns, getFormConfig, ModalStatuEnum } from '../config';
  import { useModal } from '/@/components/Modal';
  import type { listResp as _listResp } from '../types';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const [registerTable, { reload }] = useTable({
    api: listCategoriesAdminUsingGet,
    rowKey: (record) => {
      return record.id;
    }, //???????????????key,?????????????????????????????????ID
    rowSelection: {
      onChange: (selectedRowKeys: number[]) => {
        selectedID.value = selectedRowKeys;
      }, //??????????????? ??????????????? ??????ID????????? ???????????????
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
  // ?????????????????????????????????
  function openPopup(mode: ModalStatuEnum, row: _listResp[0] = {}) {
    setModalProps({ title: `${mode}??????` });
    openModal(true, row);
  }

  // ????????????????????????
  const btnLoading = reactive({
    btnId: -1, //?????????????????????ID??????????????????????????????????????????-1 ???????????????
    loading: false, //??????
  });

  const selectedID = ref<number[]>([-1]);
  async function toDelete(id: _listResp[number]['id'] = -1) {
    btnLoading.btnId = id;
    btnLoading.loading = true;
    const requestBody: number[] = id === -1 ? selectedID.value : [id];
    try {
      await deleteCategoriesUsingDelete({ requestBody });
      createMessage.success('????????????');
    } catch {}
    btnLoading.loading = false;
    reload();
  }
</script>

<style lang="less" scoped></style>
