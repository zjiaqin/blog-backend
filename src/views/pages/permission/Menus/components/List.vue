<template>
  <div class="article-list-table">
    <BasicTable @register="registerTable" title=" ">
      <template #tableTitle>
        <div class="flex w-full">
          <AButton
            type="primary"
            :loading="btnLoading.btnId === -1 && btnLoading.loading"
            class="mr-2"
            @click="toEdit(ModelTypeEnum.ADDPARENT)"
            >{{ ModalStatuEnum.ADDMENU }}</AButton
          >
        </div>
      </template>
      <template
        #bodyCell="{ column, record }: { column: any, record: _listResp[0] & { parentId: number } }"
      >
        <template v-if="column.key === 'icon'">
          <Icon :icon="record[column.key]" />
        </template>

        <template v-if="column.key === 'isHidden'">
          <Switch
            :loading="btnLoading.isHidden && btnLoading.btnId === record['id']"
            :checkedValue="1"
            :unCheckedValue="0"
            v-model:checked="record[column.key]"
            @change="isHiddenChange(record, column.key)"
          >
            <template #checkedChildren><check-outlined /></template>
            <template #unCheckedChildren><close-outlined /></template>
          </Switch>
        </template>

        <template v-if="column.key === 'operate'">
          <AButton
            v-if="!record.parentId"
            size="small"
            :iconSize="16"
            :style="{ 'font-size': '12px' }"
            preIcon="ion:add"
            type="link"
            @click="toEdit(ModelTypeEnum.ADDCHILD, { parentId: record.id })"
            :loading="btnLoading.btnId === record.id && btnLoading.loading"
            >{{ ModalStatuEnum.ADDITEM }}</AButton
          >
          <AButton
            size="small"
            :iconSize="16"
            :style="{ 'font-size': '12px' }"
            preIcon="ion:md-create"
            type="link"
            @click="
              toEdit(record.parentId ? ModelTypeEnum.EDITCHILD : ModelTypeEnum.EDITPARENT, record)
            "
            :loading="btnLoading.btnId === record.id && btnLoading.loading"
            >{{ ModalStatuEnum.EDIT }}</AButton
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
    <AddModel @register="registerModal" @ok="updataTable" />
  </div>
</template>

<script setup lang="ts">
  import { AddModel } from './index';
  import { Icon } from '/@/components/Icon';
  import { Switch } from 'ant-design-vue';
  import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import {
    listMenusUsingGet,
    deleteMenuUsingDelete,
    updateMenuIsHiddenUsingPut,
  } from '/@/api/apis';
  import { Time } from '/@/components/Time';
  import { getBasicColumns, getFormConfig, ModalStatuEnum, ModelTypeEnum } from '../config';
  import type { listResp as _listResp, UpdateMenuParams } from '../types';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { reactive } from 'vue';

  const { createMessage } = useMessage();

  const [registerTable, { reload }] = useTable({
    api: listMenusUsingGet,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getFormConfig(),
    showIndexColumn: false,
    afterFetch: (res) => {
      res.forEach((item) => {
        if (item?.children?.length === 0) {
          item.children = null;
        } else {
          item.children.forEach((sub) => {
            sub.parentId = item.id;
          });
        }
      });
    },
    pagination: false,
  });

  const [registerModal, { openModal, setModalProps }] = useModal();

  // 删除按钮加载控制
  const btnLoading = reactive({
    btnId: -99, //获取具体的按钮ID，避免整列的按钮状态都改变，-1 为批量删除 -2为批量审批
    loading: false, //删除
    isHidden: false,
  });

  async function toDelete(id: _listResp[number]['id'] = -1) {
    btnLoading.btnId = id;
    btnLoading.loading = true;
    try {
      await deleteMenuUsingDelete({ menuId: id });
      createMessage.success('操作成功');
    } catch {}
    btnLoading.loading = false;
    reload();
  }

  function toEdit(title: ModelTypeEnum, record: UpdateMenuParams['requestBody'] = {}) {
    setModalProps({ title });

    openModal(true, { MenuType: title, ...record });
  }
  async function isHiddenChange(record: _listResp[0], method = 'isHidden') {
    btnLoading.btnId = record.id ?? -1;
    btnLoading[method] = true;
    try {
      await updateMenuIsHiddenUsingPut({
        requestBody: { id: record.id, isHidden: record.isHidden },
      });
      createMessage.success(`显示状态修改成功`);
    } catch (error) {
      record[method] = record[method] ? 0 : 1;
    }
    btnLoading[method] = false;
  }

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

    &:hover {
      color: skyblue;
    }
  }
</style>
