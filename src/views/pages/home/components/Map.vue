<template>
  <Card title="用户地域分布" :loading="loading">
    <div ref="chartRef" :style="{ height: '350px', width }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { basicProps } from './props';
  import { ref, Ref, reactive } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useStatistics } from '/@/store/modules/statistics';
  import { storeToRefs } from 'pinia';
  import { watchEffect } from 'vue';
  import type { EChartsOption } from 'echarts';
  import { mapData } from './data';
  import { registerMap } from 'echarts';
  import { onMounted } from 'vue';

  defineProps({
    ...basicProps,
    loading: Boolean,
  });
  type Item = {
    value?: number;
    name?: string;
  };
  type State = {
    seriesData?: Item[];
  };

  const state = reactive<State>({ seriesData: undefined });
  const { statisticList } = storeToRefs(useStatistics());

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  const initChart = async () => {
    const option: EChartsOption = {
      visualMap: [
        {
          min: 0,
          max: 1000,
          right: '5%',
          bottom: 20,
          itemHeight: 100,
          text: ['High', 'Low'],
          calculable: true,
          orient: 'vertical',
          inRange: {
            color: ['#e0ffff', '#006edd'],
          },
        },
      ],

      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, .6)',
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
      series: [
        {
          name: '用户人数',
          type: 'map',
          map: 'china',
          emphasis: {
            label: {
              show: true,
            },
          },
          itemStyle: {
            areaColor: '#2f82ce',
            borderColor: '#0DAAC1',
          },
          data: mapData,
        },
      ],
    };
    setOptions(option);
  };

  watchEffect(() => {
    initChart();
  });
  onMounted(async () => {
    const json = (await (await import('/@/utils/lib/china.json')).default) as any;
    registerMap('china', json);
  });
</script>

<style lang="less">
  .ant-card-body {
    padding: 0;
  }
</style>
