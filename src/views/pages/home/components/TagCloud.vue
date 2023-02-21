<!--  -->
<template>
  <Card title="热门词条" :loading="loading">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>

<script lang="ts" setup>
  import { basicProps } from './props';
  import { Ref, ref, watchEffect, onMounted } from 'vue';
  import 'echarts-wordcloud';
  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import type { EChartsOption } from 'echarts';

  defineProps({
    ...basicProps,
    loading: Boolean,
  });
  const echartsData = [
    { value: '30', name: 'VIVO' },
    { value: '29', name: 'OPPO' },
    { value: '28', name: 'HONOR' },
    { value: '27', name: '红米' },
    { value: '26', name: '小米' },
    { value: '25', name: '美图' },
    { value: '24', name: 'ONEPLUS' },
    { value: '23', name: '魅族' },
    { value: '22', name: '红手指' },
    { value: '21', name: 'SAMSUNG' },
    { value: '20', name: '金立' },
    { value: '16', name: 'BLACKBERRY' },
    { value: '15', name: '诺基亚' },
    { value: '14', name: '锤子' },
    { value: '13', name: '大疆' },
    { value: '12', name: '361' },
    { value: '11', name: '摩托罗拉' },
    { value: '10', name: '联想' },
    { value: '9', name: '玩家国度' },
  ];

  const initChart = () => {
    const option: EChartsOption = {
      title: {
        text: '',
      },
      backgroundColor: '#fff',
      // tooltip: {
      //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      // },
      series: [
        {
          type: 'wordCloud',
          //用来调整词之间的距离
          gridSize: 10,
          //用来调整字的大小范围
          // Text size range which the value in data will be mapped to.
          // Default to have minimum 12px and maximum 60px size.
          sizeRange: [14, 40],
          // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
          //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
          // rotationRange: [-45, 0, 45, 90],
          // rotationRange: [ 0,90],
          rotationRange: [0, 0],
          //随机生成字体颜色
          // maskImage: maskImage,
          textStyle: {
            color: function () {
              return (
                'rgb(' +
                Math.round(Math.random() * 255) +
                ', ' +
                Math.round(Math.random() * 255) +
                ', ' +
                Math.round(Math.random() * 255) +
                ')'
              );
            },
          },
          //位置相关设置
          // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
          // Default to be put in the center and has 75% x 80% size.
          left: 'center',
          top: 'center',
          right: null,
          bottom: null,
          width: '100%',
          height: '100%',
          //数据
          data: echartsData,
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

  onMounted(() => {
    initChart();
  });
</script>
<style lang="less" scoped></style>
