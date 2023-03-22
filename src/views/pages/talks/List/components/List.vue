<template>
  <CollapseContainer :canExpan="false" :showHeader="false">
    <Tabs class="tabs" @change="changeTab" v-model:activeKey="activeKey">
      <TabPane v-for="item in tabsMap" :key="item.key" :tab="item.label" />
    </Tabs>
    <TalkCard />
  </CollapseContainer>
</template>

<script setup lang="ts">
  import { CollapseContainer } from '/@/components/Container/index';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { TalkCard } from '../components';

  import { ref } from 'vue';

  const activeKey = ref();

  const tabsMap = [
    { label: '全部', key: 0, param: {} },
    { label: '公开', key: 1, param: { status: 1 } },
    { label: '私密', key: 2, param: { status: 2 } },
  ];

  const changeTab = () => {};
</script>

<style lang="less" scoped></style>
