<template>
  <CollapseContainer title="安全设置" :canExpan="false">
    <List>
      <template v-for="item in getSecureSettingList()" :key="item.key">
        <ListItem>
          <ListItemMeta>
            <template #title>
              {{ item.title }}
              <div class="extra" v-if="item.extra" @click="openModel(item.key)">
                {{ item.extra }}
              </div>
            </template>
            <template #description>
              <div>{{ item.description }}</div>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
    <Password @register="passwordModal" />
    <Email @register="emailModal" />
  </CollapseContainer>
</template>
<script lang="ts" setup>
  import { List, ListItem, ListItemMeta } from 'ant-design-vue';

  import { CollapseContainer } from '/@/components/Container/index';
  import { Password, Email } from './index';
  import { getSecureSettingList } from '../config';
  import { useModal } from '/@/components/Modal';

  const [passwordModal, { openModal: openPasswordModal }] = useModal();

  const [emailModal, { openModal: openEmailModal }] = useModal();

  const openModel = (key) => {
    key === '1' ? openPasswordModal() : openEmailModal();
  };
</script>
<style lang="less" scoped>
  .extra {
    margin-top: 10px;
    margin-right: 30px;
    float: right;
    color: #1890ff;
    font-weight: normal;
    cursor: pointer;
  }
</style>
