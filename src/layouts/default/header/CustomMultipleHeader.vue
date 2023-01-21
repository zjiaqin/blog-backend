<template>
  <div class="cmh-wrapper">
    <Icon
      v-if="getIsMobile"
      class="menu-show-btn"
      icon="ant-design:menu-unfold-outlined"
      size="20"
      @click="toggleCollapsed()"
    />

    <Transition name="abc">
      <div v-if="showBack" class="back-btn" @click="back"
        ><LeftOutlined />{{ t('custom.awdAjpAZVEHT7D_AsDjcs') }}</div
      >
    </Transition>

    <LayoutBreadcrumb class="breadcrumb" :theme="getHeaderTheme" />

    <Space :size="22">
      <div class="currency-dropdown-box">
        <QuestionCircleOutlined style="margin-right: 5px" />{{ t('custom.wA-zP6HamirauIwt_m9g3') }}
      </div>
      <!-- <a class="service" href="https://t.me/feee.io" target="_blank">
        <Icon class="icon" icon="telegram-logo|svg" size="27" />
      </a> -->

      <UserDropDown class="user" />
    </Space>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Space } from 'ant-design-vue';
  import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
  import { Icon } from '/@/components/Icon';
  import { LayoutBreadcrumb, UserDropDown } from './components';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useRouter } from 'vue-router';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useAppInject } from '/@/hooks/web/useAppInject';

  const { t } = useI18n();

  const { getHeaderTheme } = useHeaderSetting();
  const { currentRoute, back } = useRouter();
  const { getIsMobile } = useAppInject();
  const { toggleCollapsed } = useMenuSetting();
  const showBack = computed(() => currentRoute.value?.meta?.showBack);
</script>

<style lang="less" scoped>
  .cmh-wrapper {
    display: flex;
    align-items: center;
    height: @header-height;
    padding: 0 16px;
    background-color: #fff;

    .menu-show-btn {
      display: block;
      margin-right: 10px;
    }

    .back-btn {
      margin-right: 15px;
      overflow: hidden;
      font-size: 18px;
      color: @primary-color;
      white-space: nowrap;
      cursor: pointer;
    }

    .breadcrumb {
      margin-right: auto;
      padding-left: 0;

      :deep(.ant-breadcrumb) {
        font-size: 17px;

        .ant-breadcrumb-link {
          color: #121c41;
        }
      }
    }

    // .service {
    //   display: block;

    //   .icon {
    //     display: block;
    //   }
    // }

    .user {
      padding: 0;

      :deep(.vben-header-user-dropdown__header) {
        width: 27px;
        height: 27px;
      }
    }
  }

  .abc-enter-active,
  .abc-leave-active {
    transition: all 0.2s ease;
  }

  .abc-enter-from,
  .abc-leave-to {
    width: 0px !important;
    opacity: 0;
  }

  .currency-dropdown-box {
    display: flex;
    align-items: center;
  }
</style>
