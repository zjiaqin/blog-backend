<template>
  <div class="article-list-table">
    <BasicTable @register="registerTable" title=" ">
      <template #bodyCell="{ column, record }: { column: any, record: _listResp[0] }">
        <template v-if="column.key === 'avatar'">
          <Avatar
            shape="square"
            size="large"
            :src="record[column.key]"
            :alt="record.nickname?.at(0)"
          />
        </template>

        <template v-if="column.key === 'lastLoginTime'">
          <Time :value="record[column.key]" mode="datetime" />
        </template>

        <template v-if="column.key === 'operate'">
          <AButton
            size="small"
            :iconSize="16"
            :style="{ 'font-size': '12px' }"
            preIcon="ion:ios-log-out"
            type="link"
            @click="toLogout(record.userInfoId ?? -1)"
            :loading="btnLoading.btnId === record.userInfoId && btnLoading.loading"
            >{{ ModalStatuEnum.LOGOUT }}</AButton
          >
        </template>
      </template>
    </BasicTable>
  </div>
</template>

<script setup lang="ts">
  import { Avatar } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';

  import { listOnlineUsersUsingGet, removeOnlineUserUsingDelete } from '/@/api/apis';
  import { Time } from '/@/components/Time';
  import { getBasicColumns, getFormConfig, ModalStatuEnum } from '../config';
  import type { listResp as _listResp } from '../types';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { reactive } from 'vue';

  const { createMessage } = useMessage();

  const [registerTable, { reload }] = useTable({
    api: listOnlineUsersUsingGet,
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
    isDisable: false,
  });

  const toLogout = async (userInfoId: NonNullable<_listResp[number]['userInfoId']>) => {
    btnLoading.btnId = userInfoId;
    btnLoading.loading = true;
    try {
      await removeOnlineUserUsingDelete({ userInfoId });
      reload();
      createMessage.success('操作成功');
    } catch {}
    btnLoading.loading = false;
  };
</script>

<style lang="less" scoped>
  .tabs {
    flex-basis: 100%;
    padding-left: 10px;
  }

  .tag:not(:last-child) {
    margin-right: 5px; /* 将margin-right属性应用到除了最后一个元素以外的所有元素 */
  }
</style>
