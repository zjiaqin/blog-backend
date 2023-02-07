<template>
  <div class="p-4">
    <GrowCard :loading="statistics.loading" class="enter-y" />
    <SiteAnalysis class="!my-4 enter-y" :loading="statistics.loading" />
    <div class="md:flex enter-y">
      <VisitRadar class="md:w-1/3 w-full" :loading="statistics.loading" />
      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="statistics.loading" />
      <SalesProductPie class="md:w-1/3 w-full" :loading="statistics.loading" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import GrowCard from './components/GrowCard.vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  import VisitSource from './components/VisitSource.vue';
  import VisitRadar from './components/VisitRadar.vue';
  import SalesProductPie from './components/SalesProductPie.vue';

  import { useStatistics } from '/@/store/modules/statistics';

  const statistics = useStatistics();

  statistics.fetchStatisticList();
</script>
