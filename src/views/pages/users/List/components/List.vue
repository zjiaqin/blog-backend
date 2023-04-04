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

        <template v-if="column.key === 'loginType'">
          <Tag :color="record[column.key] === 1 ? 'success' : 'processing'">
            {{ loginTypeMap.get(record[column.key]) }}
          </Tag>
        </template>

        <template v-if="column.key === 'roles'">
          <template v-for="role in record['roles']" :key="role.id">
            <Tag color="pink" class="tag">
              {{ role.roleName }}
            </Tag>
          </template>
        </template>

        <template v-if="column.key === 'isDisable'">
          <Switch
            :loading="btnLoading.isDisable && btnLoading.btnId === record['id']"
            :checkedValue="1"
            :unCheckedValue="0"
            v-model:checked="record[column.key]"
            @change="isDisableChange(record, column.key)"
          >
            <template #checkedChildren><check-outlined /></template>
            <template #unCheckedChildren><close-outlined /></template>
          </Switch>
        </template>

        <template v-if="column.key === 'operate'">
          <AButton
            size="small"
            :style="{ 'font-size': '12px' }"
            type="primary"
            @click="toEdit(record)"
            :loading="btnLoading.btnId === record.id && btnLoading.loading"
            >{{ ModalStatuEnum.EDIT }}</AButton
          >
        </template>
        <template v-if="column.key === 'createTime'">
          <Time :value="record[column.key]" mode="datetime" />
        </template>
        <template v-if="column.key === 'lastLoginTime'">
          <Time :value="record[column.key]" mode="datetime" />
        </template>
      </template>
    </BasicTable>
    <Popup @register="registerModal" @update="reload" />
  </div>
</template>

<script setup lang="ts">
  import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
  import { Tag, Image, Switch, Avatar } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { Popup } from './index';

  import { listUsersUsingGet, updateUserDisableUsingPut } from '/@/api/apis';
  import { Time } from '/@/components/Time';
  import { loginTypeMap, getBasicColumns, getFormConfig, ModalStatuEnum } from '../config';
  import type { listResp as _listResp } from '../types';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import { ref, reactive } from 'vue';

  const { createMessage } = useMessage();

  const [registerTable, { reload }] = useTable({
    api: listUsersUsingGet,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getFormConfig(),
    showIndexColumn: false,
    pagination: {
      position: ['bottomCenter'],
    },
  });

  const [registerModal, { openModal }] = useModal();

  // 删除按钮加载控制
  const btnLoading = reactive({
    btnId: -99, //获取具体的按钮ID，避免整列的按钮状态都改变，-1 为批量删除 -2为批量审批
    loading: false, //删除
    isDisable: false,
  });

  const selectedID = ref<number[]>([]);

  const toEdit = (record: _listResp[0]) => {
    openModal(true, record);
  };

  const isDisableChange = async (record: _listResp[0], method = 'isDisable') => {
    btnLoading.btnId = record.id ?? -1;
    btnLoading[method] = true;
    try {
      await updateUserDisableUsingPut({
        requestBody: { id: record.id, isDisable: record.isDisable },
      });
      createMessage.success(`禁用状态修改成功`);
    } catch (error) {
      record[method] = record[method] ? 0 : 1;
    }
    btnLoading[method] = false;
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
