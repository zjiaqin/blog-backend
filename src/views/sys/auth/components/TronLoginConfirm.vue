<template>
  <CModal v-model="show" @close="closeModal">
    <div class="enter-x">
      <img
        class="tron-link-logo"
        :src="tronLinkLogo"
        width="80"
        :alt="t('custom.JwgsGcBCZnYpO9AU3HZFr')"
      />
      <div class="sign-title">{{ t('custom.mbmH353OomNi7s9PEnBmt') }}</div>
      <div class="sign-text">{{ t('custom.IliVh1P2EAFoB1_E_fjW7') }}</div>
    </div>
    <div class="footer enter-x"
      ><AButton class="ant-btn-tron sign-confirm" type="primary" @click="onConfirm">
        {{ t('custom.McoSNJUGZqLjxkNBXjuZU') }}
      </AButton></div
    >
  </CModal>
</template>

<script setup lang="ts" name="TronLoginConfirm">
  import tronLinkLogo from '/@/assets/icons/tron-link-logo.svg';
  import { CModal } from '/@/components/CModal';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Button as AButton } from 'ant-design-vue';
  import { computed } from 'vue';
  const { t } = useI18n();
  // props
  const props = withDefaults(
    defineProps<{
      modelValue: boolean;
    }>(),
    {
      modelValue: false,
    },
  );
  // emits
  const emits = defineEmits<{
    (e: 'update:modelValue', data: boolean): void;
    (e: 'confirm'): void;
  }>();
  // data
  const show = computed({
    get: () => props.modelValue,
    set: (val: boolean) => {
      emits('update:modelValue', val);
    },
  });
  // func
  const onConfirm = () => {
    emits('update:modelValue', false);
    emits('confirm');
  };
  const closeModal = () => {
    emits('update:modelValue', false);
  };
</script>

<style lang="less" scoped>
  .tron-link-logo {
    margin: auto;
    margin-top: 10px;
  }

  .sign-title {
    font-size: 18px;
    text-align: center;
    margin: 20px 0;
  }

  .sign-text {
    text-align: center;
    margin-bottom: 30px;
  }

  .sign-confirm {
    width: 70%;
    height: 40px;
  }

  .footer {
    width: 100%;
    margin-bottom: 30px;
    font-size: 12px;
    color: #989fae;
    text-align: center;
  }
</style>
