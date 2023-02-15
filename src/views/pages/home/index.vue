<template>
  <div class="p-4">
    <GrowCard :loading="statistics.loading" class="enter-y" />
    <SiteAnalysis class="!my-4 enter-y" :loading="statistics.loading" />
    <div class="md:flex enter-y">
      <VisitAnalysisBar class="w-full md:w-2/3" :loading="statistics.loading" />
      <SalesProductPie
        class="w-full md:(w-1/3 !ml-4) !my-4 !md:my-0"
        :loading="statistics.loading"
      />
    </div>
    <div class="md:flex enter-y !mt-4">
      <Map class="w-full md:w-2/3" :loading="statistics.loading" />
      <SalesProductPie
        class="md:w-1/3 w-full !md:ml-4 !md:my-0 !my-4"
        :loading="statistics.loading"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import GrowCard from './components/GrowCard.vue';
  import SiteAnalysis from './components/SiteAnalysis.vue';
  import VisitAnalysisBar from './components/VisitAnalysisBar.vue';

  import SalesProductPie from './components/SalesProductPie.vue';
  import Map from './components/Map.vue';
  import { useStatistics } from '/@/store/modules/statistics';

  const statistics = useStatistics();

  statistics.fetchStatisticList();
</script>
