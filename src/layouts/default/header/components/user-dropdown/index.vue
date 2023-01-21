<template>
  <div>
    <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
      <div class="flex" :class="[prefixCls, `${prefixCls}--${theme}`]">
        <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
        <div :class="`${prefixCls}__info hidden md:block`">
          <div :class="`${prefixCls}__name  `" class="truncate">
            {{ getUserInfo.name }}
            <Icon
              class="icon"
              icon="ant-design:down-outlined"
              size="14"
              color="rgba(0, 0, 0, 0.85)"
            />
          </div>
        </div>
      </div>

      <template #overlay>
        <Menu @click="handleMenuClick">
          <MenuItem
            key="user-info"
            :text="t('custom.0zxd5CdzF54Rl2r5m0vQT')"
            icon="user-info-menu|svg"
          />
          <MenuItem key="logout" :text="t('custom.EeAhrdm_w1ZIjuHO1Path')" icon="logout-1|svg" />
        </Menu>
      </template>
    </Dropdown>

    <LockAction @register="register" />
  </div>
</template>
<script lang="ts">
  import { Dropdown, Menu } from 'ant-design-vue';
  import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';
  import { defineComponent, computed, ref } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { Icon } from '/@/components/Icon';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useModal } from '/@/components/Modal';

  import { propTypes } from '/@/utils/propTypes';

  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import defaultAvatarImg from '/@/assets/images/default-avatar.svg?url';
  import { router } from '/@/router';
  import { toMoneyString } from '/@/utils';

  type MenuEvent = 'user-info' | 'logout';

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Dropdown,
      Menu,
      Icon,
      MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
      LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
    },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { prefixCls } = useDesign('header-user-dropdown');
      const { t } = useI18n();
      const { getShowDoc, getUseLockPage } = useHeaderSetting();
      const userStore = useUserStore();
      const changePasswordFormShow = ref(false);
      const getUserInfo = computed(() => {
        const { name, avatar } = (userStore.getUserInfo || {}) as any;
        return { name, avatar: avatar || defaultAvatarImg };
      });
      const [register] = useModal();

      function handleMenuClick(e: MenuInfo) {
        switch (e.key as MenuEvent) {
          case 'user-info':
            router.push({ path: '/pages/user-info' });
            break;
          case 'logout':
            userStore.confirmLoginOut();
            break;
        }
      }

      return {
        prefixCls,
        t,
        getUserInfo,
        handleMenuClick,
        getShowDoc,
        register,
        getUseLockPage,
        defaultAvatarImg,
        changePasswordFormShow,
        toMoneyString,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    // height: @header-height;
    padding: 0;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    img {
      width: 28px;
      height: 28px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;

      .icon {
        font-size: inherit;
      }
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
        font-size: 15px;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }

  .balance {
    color: @primary-color;
  }
</style>
