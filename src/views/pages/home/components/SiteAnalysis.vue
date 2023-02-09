<template>
  <Card
    :tab-list="tabListTitle"
    v-bind="$attrs"
    :active-tab-key="activeKey"
    @tab-change="onTabChange"
  >
    <p v-if="activeKey === 'tab1'">
      <VisitAnalysis />
    </p>
    <p v-if="activeKey === 'tab2'">
      <DailyArticleCount />
    </p>
  </Card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import VisitAnalysis from './VisitAnalysis.vue';
  import DailyArticleCount from './DailyArticleCount.vue';

  const activeKey = ref('tab1');

  const tabListTitle = [
    {
      key: 'tab1',
      tab: '一周访问量',
    },
    {
      key: 'tab2',
      tab: '文章发布统计',
    },
  ];

  function onTabChange(key) {
    activeKey.value = key;
  }
</script>
