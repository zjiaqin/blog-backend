<template>
  <CModal
    v-model="show"
    :width="350"
    @close="close"
    :loading="pageLoading"
    :loading-text="t('custom.5dBr1wTc8L3E7CS6wlcN7')"
  >
    <div class="tron-link-popup-wrapper enter-x">
      <img class="tron-img" :src="tronLinkLogo" />
      <AButton class="link-btn" type="primary" size="large" block @click="linkWallet">{{
        t('custom.pwhQnnH_fV_GJivM56oc2')
      }}</AButton>
      <div class="tip">
        {{ t('custom.aT1FzbuJIJ2lui1HsIHXF') }}
        <a
          href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec"
          target="_blank"
          >{{ t('custom.lIKpZhh3Kf4OLrIFAbLEL') }}<SvgIcon name="download-line" class="icon"
        /></a>
      </div>
    </div>
  </CModal>
</template>

<script lang="ts">
  import { CModal } from '/@/components/CModal';
  import { Button as AButton } from 'ant-design-vue';
  import { SvgIcon } from '/@/components/Icon';
  import tronLinkLogo from '/@/assets/images/tron-link-1.png';
  import { ref, watch, defineComponent, PropType } from 'vue';
  import { useTronStore } from '/@/store/modules/tron';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { TronLinkPopupProps } from '../types';

  export default defineComponent({
    name: 'TronLinkPopup',
    components: { CModal, AButton, SvgIcon },
    props: {
      modelValue: {
        type: Boolean as PropType<TronLinkPopupProps['modelValue']>,
        default: false,
      },
      cancelCallback: {
        type: Function as PropType<TronLinkPopupProps['cancelCallback']>,
      },
    },
    emits: {
      'update:modelValue': (val: boolean) => typeof val === 'boolean',
      close: (val: boolean) => typeof val === 'boolean',
    },
    setup(props: TronLinkPopupProps, { emit }) {
      const { t } = useI18n();
      const show = ref(false);
      const pageLoading = ref<boolean>(false);
      async function linkWallet(): Promise<void> {
        try {
          pageLoading.value = true;
          const tronStore = useTronStore();
          const res = await tronStore.linkWallet();
          if (res) close();
        } catch (error) {
          pageLoading.value = false;
        } finally {
          pageLoading.value = false;
        }
      }
      function open(): void {
        if (!show.value) show.value = true;
      }
      function close(): void {
        if (props.cancelCallback) props.cancelCallback();
        emit('close', false);
        emit('update:modelValue', false);
        show.value = false;
      }
      watch(
        () => props.modelValue,
        (isShow) => {
          isShow ? open() : close();
        },
        { immediate: true },
      );
      return {
        tronLinkLogo,
        show,
        pageLoading,
        t,
        linkWallet,
        open,
        close,
      };
    },
  });
</script>

<style lang="less" scoped>
  .tron-link-popup-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .tron-img {
      width: 90px;
      height: auto;
    }
    .link-btn {
      margin: 30px 0 15px;
    }
    .tip {
      width: 100%;
      text-align: center;
      .icon {
        display: inline-block;
      }
    }
  }
</style>
