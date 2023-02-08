<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full !md:mt-0"
        :class="{ '!md:mr-4': index + 1 < 4, '!mt-4': index > 0 }"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between items-center">
          <CountTo :startVal="0" :endVal="item.total" class="text-3xl" />
          <Icon :icon="item.icon" :size="40" :color="item.color" />
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo/index';
  import { Icon } from '/@/components/Icon';
  import { Tag, Card } from 'ant-design-vue';
  import { computed } from 'vue';
  // import { growCardList } from '../data';
  import { useStatistics } from '/@/store/modules/statistics';
  import { storeToRefs } from 'pinia';
  export interface GrowCardItem {
    icon: string;
    title: string;

    total: number;
    color: string;
    action: string;
  }

  defineProps({
    loading: {
      type: Boolean,
    },
  });

  const { statisticList } = storeToRefs(useStatistics());
  const growCardList = computed<GrowCardItem[]>(() => [
    {
      title: '访问数',
      icon: 'ion:footsteps',
      total: statisticList.value?.viewsCount ?? 0,
      color: 'pink',
      action: '至今',
    },
    {
      title: '用户量',
      icon: 'ion:people-sharp',
      total: statisticList.value?.userCount ?? 0,
      color: 'blue',
      action: '至今',
    },
    {
      title: '文章量',
      icon: 'ion:reader',
      total: statisticList.value?.articleCount ?? 0,
      color: 'orange',
      action: '至今',
    },
    {
      title: '留言量',
      icon: 'ion:md-chatboxes',
      total: statisticList.value?.messageCount ?? 0,
      color: 'purple',
      action: '至今',
    },
  ]);
</script>
<style>
  .aa {
    color: skyblue;
  }
</style>
