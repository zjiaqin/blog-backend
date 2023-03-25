<template>
  <div class="card-talk">
    <Card v-bind="$attrs">
      <template #title>
        <CardMeta>
          <template #avatar>
            <Avatar :src="props.listResp.avatar" />
          </template>
          <template #title>
            <div class="title">
              <div class="text-sm font-semibold">{{ props.listResp.nickname }}</div>
              <Time
                class="text-xs font-normal text-gray-500"
                :value="props.listResp.createTime"
                mode="datetime"
              />
            </div>
          </template>
        </CardMeta>
      </template>
      <template #extra>
        <Dropdown placement="bottom" trigger="click">
          <ellipsis-outlined :style="{ fontSize: '16px', padding: '5px' }" class="action" />
          <template #overlay>
            <Menu>
              <MenuItem key="user-info" text="编辑" icon="ant-design:edit-twotone" />
              <MenuItem key="logout" text="删除" icon="ant-design:delete-twotone" />
            </Menu>
          </template>
        </Dropdown>
      </template>

      <div class="pl-10">
        <div class="mb-2"> {{ props.listResp.content }}</div>
        <template v-if="props.listResp.imgs">
          <Image
            v-for="(item, index) in props.listResp.imgs"
            :key="index"
            :width="200"
            :src="item"
          />
        </template>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import { EllipsisOutlined } from '@ant-design/icons-vue';
  import { MenuItem } from '../components';
  import { Card, CardMeta, Avatar, Menu, Dropdown, Image } from 'ant-design-vue';
  import { Time } from '/@/components/Time';
  import type { listResp } from '../types';
  const props = defineProps<{ listResp: listResp[0] }>();
</script>

<style lang="less" scoped>
  :deep(.ant-card) {
    transition: all 0.5s;
    margin-bottom: 15px;
    border-radius: 6px;

    &:hover {
      box-shadow: 0 5px 10px 8px rgba(7, 17, 27, 0.16);
    }
  }

  .title {
    display: flex;
    flex-direction: column;
  }

  .action {
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: @primary-color;
      transform: scale(1.2);
    }
  }

  :deep(.ant-card-body) {
    padding: 15px;
  }
</style>
