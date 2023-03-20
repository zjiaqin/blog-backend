<template>
  <div class="container">
    <InputNumber v-model:value="val" :formatter="formatter" />
    <div>{{ val }}</div>
  </div>
</template>

<script setup lang="ts">
  import { InputNumber } from 'ant-design-vue';
  import { ref } from 'vue';

  const val = ref();

  const formatter = (value, { userTyping, input }) => {
    console.log(value, userTyping, input);
    const turn = userTyping ? parser(input) : value;
    return `${turn}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const parser = (value) => value.replace(/\$\s?|(,*)/g, '');
</script>

<style lang="less" scoped></style>
