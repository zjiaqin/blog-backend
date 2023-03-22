<template>
  <div>
    <InputNumber ref="InputRef" v-model:value="val" :formatter="formatter" />
    <Button @click="print">test</Button>
  </div>
</template>

<script setup lang="ts">
  import { InputNumber, Button } from 'ant-design-vue';

  import { ref } from 'vue';
  const InputRef = ref();

  const val = ref();

  const formatter = (value, { userTyping, input }) => {
    const turn = userTyping ? parser(input) : value;
    return `${turn}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const parser = (value) => value.replace(/\$\s?|(,*)/g, '');
  const print = () => {
    console.log(InputRef.value);
  };
</script>

<style lang="less" scoped></style>
