<template>
  <PageWrapper>
    <CollapseContainer :canExpan="false" :showHeader="false" ref="target">
      <Tabs class="tabs" @change="changeTab" v-model:activeKey="activeKey">
        <TabPane v-for="item in tabsMap" :key="item[0]" :tab="item[1]" />
      </Tabs>
      <FromPage ref="FromRef" />
    </CollapseContainer>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { Tabs, TabPane } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container/index';
  import { getWebsiteConfigUsingGet } from '/@/api/apis';
  import type { GetconfigResp } from './types';
  import { tabsMap } from './config';

  import { ref, onMounted } from 'vue';
  import { FromPage } from './components';

  const activeKey = ref(0);
  const configInfo = ref<GetconfigResp>();
  const FromRef = ref();

  const changeTab = () => {
    FromRef.value?.init && FromRef.value?.init({ type: tabsMap.get(activeKey.value) });
  };

  const init = async () => {
    configInfo.value = await getWebsiteConfigUsingGet(undefined);

    FromRef.value?.init &&
      FromRef.value?.init({ ...configInfo.value, type: tabsMap.get(activeKey.value) });
  };

  onMounted(() => {
    init();
  });
</script>

<style lang="less" scoped></style>
