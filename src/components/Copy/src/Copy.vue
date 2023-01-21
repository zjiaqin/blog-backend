<template>
  <CopyOutlined @click="onCopy(props.value)" class="copy-icon-font" />
</template>

<script lang="ts" setup name="Copy">
  import { CopyOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { copyTextToClipboard } from '/@/hooks/web/useCopyToClipboard';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();
  const props = withDefaults(
    defineProps<{
      value: string;
    }>(),
    {
      value: '',
    },
  );
  function onCopy(str: any) {
    if (!str) return;
    const isSuccess = copyTextToClipboard(str);
    if (isSuccess) {
      message.success(t('custom.Z4lJOkIwdKqw_0GbkMudK'));
    }
  }
</script>
<style lang="less" scoped>
  .copy-icon-font {
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    padding: 0 15px;
    color: #266ef1;
    cursor: pointer;
  }
</style>
