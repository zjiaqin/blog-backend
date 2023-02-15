<template>
  <Card title="文章浏览量排行" :loading="loading">
    <div ref="chartRef" :style="{ height, width }"></div>
  </Card>
</template>

<script lang="ts" setup>
  import { basicProps } from './props';
  import { ref, Ref, reactive } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { Card } from 'ant-design-vue';
  import { useStatistics } from '/@/store/modules/statistics';
  import { storeToRefs } from 'pinia';
  import { watchEffect } from 'vue';
  import type { EChartsOption } from 'echarts';
  defineProps({
    ...basicProps,
    loading: Boolean,
  });

  type State = {
    xAxisData?: string[];
    seriesData?: number[];
    YAxisMax?: number;
  };
  const state = reactive<State>({ xAxisData: undefined, seriesData: undefined, YAxisMax: 0 });
  const { statisticList } = storeToRefs(useStatistics());

  function formatData() {
    state.xAxisData = statisticList.value?.articleRankDTOs?.map((item) => item.articleTitle ?? '0');
    state.seriesData = statisticList.value?.articleRankDTOs?.map((item) => item.viewsCount ?? 0);
    state.YAxisMax = Math.max(...(state.seriesData ?? [])) * 1.2;
  }

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  const initChart = () => {
    formatData();
    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            width: 1,
            color: '#019680',
          },
        },
      },
      grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
      xAxis: {
        type: 'category',
        data: state.xAxisData,
      },
      yAxis: {
        type: 'value',
        max: state.YAxisMax,
        splitNumber: 4,
      },
      series: [
        {
          data: state.xAxisData,
          type: 'bar',
          barMaxWidth: 80,
        },
      ],
    };
    setOptions(option);
  };

  watchEffect(() => {
    initChart();
  });
</script>
