<template>
  <div> <MiniCard title="今日提币" icon="ion:social-yen-outline" :data-list="dataList" /></div>
</template>

<script setup lang="ts">
  import MiniCard from './MiniCard.vue';
  import { reactive } from 'vue';
  const dataList = reactive({
    currentPeriod: 124521321,
    previousPeriod: 129521321,
  });
</script>

<style lang="less" scoped></style>
