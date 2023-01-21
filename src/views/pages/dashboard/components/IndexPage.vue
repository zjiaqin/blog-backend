<template>
  <div class="dashboard-wrapper"> <OrderToday /><ServiceChargeTody /><DrawToday /></div>
</template>

<script lang="ts" setup name="IndexPage">
  import { OrderToday, ServiceChargeTody, DrawToday } from '../components';
</script>
<style lang="less" scoped>
  .dashboard-wrapper {
    display: grid;
    gap: 20px;
    grid-template-columns: auto auto;
    padding: 15px;
  }
</style>
