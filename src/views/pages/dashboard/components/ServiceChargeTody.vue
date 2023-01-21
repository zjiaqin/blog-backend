<template>
  <div class="container">
    <HearderCard title="今日手续费" icon="ion:card" :dataList="dataList"
  /></div>
</template>

<script setup lang="ts">
  import HearderCard from './HeaderCard.vue';
  import { ref } from 'vue';
  const dataList = ref({
    amountData: {
      currentPeriod: 15214214,
      previousPeriod: 19935412,
      money: 123541242,
      order: 123541242,
      agency: 123541242,
    },
  });
</script>

<style lang="less" scoped></style>
