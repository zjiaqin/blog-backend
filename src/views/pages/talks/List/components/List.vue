<template>
  <CollapseContainer :canExpan="false" :showHeader="false" ref="target">
    <Tabs class="tabs" @change="changeTab" v-model:activeKey="activeKey">
      <TabPane v-for="item in tabsMap" :key="item.key" :tab="item.label" />
    </Tabs>
    <div v-if="data">
      <template v-for="page in data.pages" :key="page.current">
        <template v-if="!page.count">
          <Empty />
        </template>
        <template v-for="item in page.records" :key="item.id">
          <TalkCard :listResp="item" />
        </template>
      </template>
      <div class="loading">
        <Spin :spinning="isFetchingNextPage && isFetching" />
      </div>
    </div>
    <template v-else>
      <div v-for="index in 3" :key="index" class="mb-5">
        <Skeleton active avatar :paragraph="{ rows: 3 }" />
      </div>
    </template>
  </CollapseContainer>
</template>

<script setup lang="ts">
  import { useInfiniteScroll } from '/@/hooks/useInfiniteScroll';
  import { CollapseContainer } from '/@/components/Container/index';
  import { Tabs, TabPane, Skeleton, Spin, Empty } from 'ant-design-vue';
  import { TalkCard } from '../components';
  import { listBackTalksUsingGet } from '/@/api/apis';
  import { useInfiniteQuery } from '@tanstack/vue-query';

  import { ref } from 'vue';

  const size = ref(5);
  const activeKey = ref(0);
  const tabsMap = [
    { label: '全部', key: 0, param: {} },
    { label: '公开', key: 1, param: { status: 1 } },
    { label: '私密', key: 2, param: { status: 2 } },
  ];

  async function getlistBackTalks({ queryKey, pageParam = 1 }) {
    const param = tabsMap.find((item) => item.key === queryKey[1]['activeKey'])?.param;
    const res = await listBackTalksUsingGet({
      current: pageParam,
      size: queryKey[1]['size'],
      ...param,
    });
    const page = {
      ...res,
      size: queryKey[1]['size'],
      current: pageParam,
      length: res?.records?.length ?? 0,
    };
    return page;
  }

  const { isFetchingNextPage, isFetching, data, fetchNextPage } = useInfiniteQuery({
    queryKey: [listBackTalksUsingGet.id, { size, activeKey }],
    queryFn: getlistBackTalks,
    getNextPageParam: (lastPage, pages) => {
      let count =
        pages.length > 1 ? lastPage.size * (pages.length - 1) + lastPage.length : lastPage.length;
      return count < (lastPage.count ?? 0) ? lastPage.current + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });

  const { scrollHandler } = useInfiniteScroll(fetchNextPage, document.body);

  const changeTab = (key) => {
    activeKey.value = key;
    setTimeout(() => scrollHandler(new Event('scroll')), 0);
  };
</script>

<style lang="less" scoped>
  .loading {
    text-align: center;
  }
</style>
