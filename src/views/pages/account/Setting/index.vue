<template>
  <ScrollContainer>
    <div ref="wrapperRef" class="account-setting">
      <Tabs
        :tab-position="largerThanLg ? 'left' : 'top'"
        :tabBarStyle="
          largerThanLg
            ? {
                width: '220px',
              }
            : {}
        "
      >
        <template v-for="item in settingList" :key="item.key">
          <TabPane :tab="item.name">
            <component :is="componentMap[item.component]" />
          </TabPane>
        </template>
      </Tabs>
    </div>
  </ScrollContainer>
</template>

<script lang="ts" setup>
  import { Tabs, TabPane } from 'ant-design-vue';
  import { BaseSetting, SecureSetting } from './components';

  import { ScrollContainer } from '/@/components/Container/index';
  import { settingList } from './config';
  import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';
  const componentMap = { BaseSetting, SecureSetting };
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const largerThanLg = breakpoints.greater('lg');
</script>
<style lang="less">
  .account-setting {
    margin: 12px;
    background-color: @component-background;
    @media (max-width: 992px) {
      padding: 10px;
    }

    .base-title {
      padding-left: 0;
    }

    .ant-tabs-tab-active {
      background-color: @item-active-bg;
      @media (max-width: 992px) {
        background-color: transparent;
      }
    }
  }
</style>
