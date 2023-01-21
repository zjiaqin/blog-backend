<template>
  <Button size="large" block class="mt-4 enter-x" @click="backLogin">
    {{ t('custom.ACqe9ztkq-5Z2t9VizMDW') }}
  </Button>
</template>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue';
  import { backLogin } from '../utils';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();
</script>
