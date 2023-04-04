<template>
  <div class="article-list-table">
    <BasicTable @register="registerTable" title=" ">
      <template #tableTitle>
        <div class="flex w-full">
          <AButton
            type="primary"
            :loading="btnLoading.btnId === -1 && btnLoading.loading"
            class="mr-2"
            @click="toAdd()"
            >{{ ModalStatuEnum.ADDMENU }}</AButton
          >
        </div>
      </template>
      <template #bodyCell="{ column, record }: { column: any, record: _listResp[0] }">
        <template v-if="column.key === 'icon'">
          <Icon :icon="record[column.key]" />
        </template>

        <template v-if="column.key === 'isHidden'">
          <Switch
            :loading="btnLoading.isTop && btnLoading.btnId === record['id']"
            :checkedValue="1"
            :unCheckedValue="0"
            v-model:checked="record[column.key]"
            @change="topAndFeaturedChange(record, column.key)"
          >
            <template #checkedChildren><check-outlined /></template>
            <template #unCheckedChildren><close-outlined /></template>
          </Switch>
        </template>

        <template v-if="column.key === 'operate'">
          <AButton
            size="small"
            :iconSize="16"
            :style="{ 'font-size': '12px' }"
            preIcon="ion:add"
            type="link"
            @click="toAdd()"
            :loading="btnLoading.btnId === record.userInfoId && btnLoading.loading"
            >{{ ModalStatuEnum.ADDITEM }}</AButton
          >
          <AButton
            size="small"
            :iconSize="16"
            :style="{ 'font-size': '12px' }"
            preIcon="ion:md-create"
            type="link"
            @click="toEdit()"
            :loading="btnLoading.btnId === record.userInfoId && btnLoading.loading"
            >{{ ModalStatuEnum.EDIT }}</AButton
          >
          <AButton
            size="small"
            :iconSize="16"
            :style="{ 'font-size': '12px' }"
            preIcon="ion:trash-b"
            type="link"
            @click="toDelete()"
            :loading="btnLoading.btnId === record.userInfoId && btnLoading.loading"
            >{{ ModalStatuEnum.DELETE }}</AButton
          >
        </template>
        <template v-if="column.key === 'createTime'">
          <Time :value="record[column.key]" mode="datetime" />
        </template>
      </template>
    </BasicTable>
  </div>
</template>

<script setup lang="ts">
  import { Icon } from '/@/components/Icon';
  import { Switch } from 'ant-design-vue';
  import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
  import { BasicTable, useTable } from '/@/components/Table';

  import { listMenusUsingGet, deleteCommentsUsingDelete } from '/@/api/apis';
  import { Time } from '/@/components/Time';
  import { getBasicColumns, getFormConfig, ModalStatuEnum } from '../config';
  import type { listResp as _listResp } from '../types';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { ref, reactive } from 'vue';

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
        }
      });
    },
    pagination: {
      position: ['bottomCenter'],
    },
  });

  // 删除按钮加载控制
  const btnLoading = reactive({
    btnId: -99, //获取具体的按钮ID，避免整列的按钮状态都改变，-1 为批量删除 -2为批量审批
    loading: false, //删除
  });

  const selectedID = ref<number[]>([]);

  async function toDelete(id: _listResp[number]['id'] = -1) {
    btnLoading.btnId = id;
    btnLoading.loading = true;
    const ids: number[] = id === -1 ? selectedID.value : [id];
    try {
      await deleteCommentsUsingDelete({ requestBody: ids });
      createMessage.success('操作成功');
    } catch {}
    btnLoading.loading = false;
    reload();
  }
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
