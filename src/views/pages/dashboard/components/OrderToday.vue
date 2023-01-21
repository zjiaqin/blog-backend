<template>
  <div class="container">
    <HearderCard title="今日订单" icon="ion:logo-paypal" :dataList="dataList"
  /></div>
</template>

<script setup lang="ts">
  import HearderCard from './HeaderCard.vue';
  import { ref } from 'vue';
  const dataList = ref({
    orderData: {
      currentPeriod: 123541242,
      previousPeriod: 123541242,
      money: 123541242,
      order: 123541242,
      agency: 123541242,
    },
    amountData: {
      currentPeriod: 123541242,
      previousPeriod: 123541242,
      money: 123541242,
      order: 123541242,
      agency: 123541242,
    },
  });
</script>

<style lang="less" scoped></style>
