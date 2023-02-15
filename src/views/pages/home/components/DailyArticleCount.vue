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

  import { dataToZhCN } from '/@/utils/dateUtil';
  defineProps({
    ...basicProps,
  });

  type State = {
    xAxisData?: string[];
    seriesData?: [string, number][] | [];
  };
  const state = reactive<State>({ xAxisData: undefined, seriesData: undefined });

  function formatData() {
    // state.xAxisData = statisticList.value?.articleStatisticsDTOs?.map((item) => item.day ?? '0');
    state.seriesData = statisticList.value?.articleStatisticsDTOs?.map((item) => {
      [item.date, item.count];
    }) as State['seriesData'];
  }
  const { statisticList } = storeToRefs(useStatistics());
  const initChart = () => {
    formatData();

    const data = state.seriesData;
    // const data = [
    //   ['2022-1-5', 100],
    //   ['2022-1-6', 58],
    // ];
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
        // formatter: '{c} {b}',
        formatter: (params) => {
          const dateCN = dataToZhCN(params.data[0]);
          const str = dateCN + '发布' + params.data[1] + '篇';

          return str;
        },
      },
      legend: {
        top: '0',
        left: 'center',
        data: ['Articles', 'Top 12'],
        textStyle: {
          color: '#000',
        },
      },
      calendar: [
        {
          top: 50,
          left: 50,
          right: 50,
          range: ['2022'],
          cellSize: ['auto', 'auto'],
          splitLine: {
            show: true,
            lineStyle: {
              color: '#838B83',
              width: 2,
              type: 'solid',
            },
          },
          yearLabel: {
            formatter: '{start}',
            color: '#fff',
          },
          itemStyle: {
            color: '#F0FFF0',
            borderWidth: 1,
            borderColor: '#C1CDC1',
          },
        },
      ],
      series: [
        {
          name: 'Articles',
          type: 'scatter',
          coordinateSystem: 'calendar',
          data: data,
          symbolSize: function (val) {
            return val[1] / 5;
          },
          itemStyle: {
            color: '#EECBAD',
          },
        },
        {
          name: 'Top 12',
          type: 'effectScatter',
          coordinateSystem: 'calendar',
          data: data!
            .sort((a, b) => {
              return Number(b[0]) - Number(a[0]);
            })
            .slice(0, 12),
          symbolSize: function (val) {
            return val[1] / 5;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
          },
          itemStyle: {
            color: '#FF7F50',
            shadowBlur: 10,
            shadowColor: '#FFA500',
          },
          zlevel: 1,
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
