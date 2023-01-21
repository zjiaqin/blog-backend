<template>
  <h2 class="login-title mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">
    {{ props.title }}
  </h2>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue';

  const props = defineProps<{
    title: string;
  }>();
</script>
<style>
  .login-title {
    margin-bottom: 30px;
  }
</style>
