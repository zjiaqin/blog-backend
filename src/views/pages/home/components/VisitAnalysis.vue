<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script lang="ts" setup>
  import { basicProps } from './props';
  import { ref, Ref, reactive } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useStatistics } from '/@/store/modules/statistics';
  import { storeToRefs } from 'pinia';
  import { watchEffect } from 'vue';
  import type { EChartsOption } from 'echarts';
  defineProps({
    ...basicProps,
  });

  type State = {
    xAxisData?: string[];
    seriesData?: number[];
  };
  const state = reactive<State>({ xAxisData: undefined, seriesData: undefined });

  function formatData() {
    state.xAxisData = statisticList.value?.uniqueViewDTOs?.map((item) => item.day ?? '0');
    state.seriesData = statisticList.value?.uniqueViewDTOs?.map((item) => item.viewsCount ?? 0);
  }
  const { statisticList } = storeToRefs(useStatistics());
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
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: state.xAxisData,
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: 'solid',
            color: 'rgba(226,226,226,0.5)',
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: [
        {
          type: 'value',
          max: 100,
          splitNumber: 4,
          axisTick: {
            show: false,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
            },
          },
        },
      ],
      grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
      series: [
        {
          smooth: true,
          data: state.seriesData,
          type: 'line',
          areaStyle: {},
          itemStyle: {
            color: '#5ab1ef',
          },
        },
      ],
    };
    setOptions(option);
  };

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watchEffect(() => {
    initChart();
  });
</script>
