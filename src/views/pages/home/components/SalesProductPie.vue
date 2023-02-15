<template>
  <Card title="文章分类统计" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { basicProps } from './props';
  import { Ref, ref, reactive } from 'vue';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useStatistics } from '/@/store/modules/statistics';
  import { storeToRefs } from 'pinia';
  import { watchEffect } from 'vue';
  import type { EChartsOption } from 'echarts';

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

  // const test = [
  //   { id: 210, categoryName: 'Java', articleCount: 4 },
  //   { id: 212, categoryName: 'Docker', articleCount: 1 },
  //   { id: 213, categoryName: 'MySQL', articleCount: 2 },
  //   { id: 215, categoryName: 'RabbitMQ', articleCount: 1 },
  //   { id: 216, categoryName: 'C++', articleCount: 2 },
  //   { id: 217, categoryName: 'Aurora', articleCount: 1 },
  //   { id: 218, categoryName: 'Netty', articleCount: 1 },
  //   { id: 220, categoryName: '推广', articleCount: 1 },
  //   { id: 221, categoryName: '算法', articleCount: 3 },
  // ];

  function formatData() {
    state.seriesData = (statisticList.value?.categoryDTOs ?? []).map((item) => {
      return { value: item.articleCount, name: item.categoryName };
    });
  }

  const getRandomColor = (array) => {
    const colorArr: string[] = [];
    array.forEach(() => {
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      colorArr.push(color);
    });
    return colorArr;
  };
  const initChart = () => {
    formatData();
    const option: EChartsOption = {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '文章分类',
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          color: getRandomColor(state.seriesData ?? []),
          data: (state.seriesData ?? []).sort(function (a, b) {
            return a.value! - b.value!;
          }),
          roseType: 'radius',
          animationType: 'expansion',
          animationEasing: 'quadraticIn',
          animationDelay: function () {
            return Math.random() * 100;
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
