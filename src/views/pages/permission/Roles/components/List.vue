<template>
  <div class="article-list-table">
    <BasicTable @register="registerTable" title=" ">
      <template #tableTitle>
        <div class="flex w-full">
          <AButton type="primary" class="mr-2" @click="toAdd()">{{ ModalStatuEnum.ADD }}</AButton>
          <AButton
            :disabled="!selectedID.length"
            type="primary"
            danger
            class="mr-2"
            @click="toDelete()"
            >{{ ModalStatuEnum.BATCHEDELE }}</AButton
          >
        </div>
      </template>
      <template #bodyCell="{ column, record }: { column: any, record: _listResp[0] }">
        <template v-if="column.key === 'id'">
          <Tag color="blue" class="tag">
            {{ record.roleName }}
          </Tag>
        </template>

        <template v-if="column.key === 'operate'">
          <AButton
            size="small"
            :iconSize="16"
            :style="{ 'font-size': '12px' }"
            preIcon="ion:create-outline"
            type="link"
            @click="toEdit(ModalStatuEnum.MENU, record)"
            :loading="btnLoading.btnId === record.id && btnLoading.loading"
            >{{ ModalStatuEnum.MENU }}</AButton
          >
          <AButton
            size="small"
            :iconSize="16"
            :style="{ 'font-size': '12px' }"
            preIcon="ion:brush"
            type="link"
            @click="toEdit(ModalStatuEnum.RESOURCE, record)"
            :loading="btnLoading.btnId === record.id && btnLoading.loading"
            >{{ ModalStatuEnum.RESOURCE }}</AButton
          >
          <AButton
            size="small"
            :iconSize="16"
            :style="{ 'font-size': '12px' }"
            preIcon="ion:trash-b"
            type="link"
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
    <EditModel @register="registerModal" @ok="updataTable"
  /></div>
</template>

<script setup lang="ts">
  import { Tag } from 'ant-design-vue';
  import { EditModel } from '../components';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { listRolesUsingGet, deleteRolesUsingDelete } from '/@/api/apis';
  import { Time } from '/@/components/Time';
  import { getBasicColumns, getFormConfig, ModalStatuEnum } from '../config';
  import type { listResp as _listResp } from '../types';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { ref, reactive } from 'vue';

  const { createMessage } = useMessage();

  const [registerTable, { reload }] = useTable({
    api: listRolesUsingGet,
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

  // 删除按钮加载控制
  const btnLoading = reactive({
    btnId: -1, //获取具体的按钮ID，避免整列的按钮状态都改变，-1 为批量删除
    loading: false, //删除
  });

  const selectedID = ref<number[]>([]);

  async function toDelete(id: _listResp[number]['id'] = -1) {
    btnLoading.btnId = id;
    btnLoading.loading = true;
    const ids: number[] = id === -1 ? selectedID.value : [id];
    try {
      await deleteRolesUsingDelete({ requestBody: ids });
      createMessage.success('操作成功');
    } catch {}
    btnLoading.loading = false;
    reload();
  }

  const toEdit = (type: ModalStatuEnum, record: _listResp[number]) => {
    setModalProps({ title: '修改' + type });
    openModal(true, { type, ...record });
  };

  const toAdd = () => {
    setModalProps({ title: '新增角色' });
    openModal(true, { type: ModalStatuEnum.ADD });
  };
  const updataTable = () => {
    setTimeout(() => {
      reload();
    }, 500);
  };
</script>

<style lang="less" scoped>
  :deep(.ant-btn) {
    :last-child {
      margin-left: 0;
    }

    &:hover {
      color: skyblue;
    }
  }
</style>
