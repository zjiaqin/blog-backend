<template>
  <div class="trend-warpper" :class="trend" :style="{ 'font-size': size + 'px' }">
    <Icon :icon="`ion:arrow-graph-` + trend + `-right`" :size="size" /><CountTo
      :startVal="0"
      :endVal="percentage"
      suffix="%"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { CountTo } from '/@/components/CountTo/index';

  const props = defineProps({
    previousPeriod: { type: Number, required: true },
    currentPeriod: { type: Number, required: true },
    size: { type: Number },
  });

  const percentage = ref(0);
  const trend = ref<'up' | 'down'>('up');

  const compareHandle = () => {
    const val = (props.currentPeriod - props.previousPeriod) / props.previousPeriod;
    trend.value = val >= 0 ? 'up' : 'down';
    percentage.value = Math.abs(val) * 100;
  };

  onMounted(() => {
    compareHandle();
  });
</script>

<style lang="less" scoped>
  .trend-warpper {
    display: inline-block;
  }

  .up {
    color: #ec808d;
  }

  .down {
    color: #76bf00;
  }
</style>
