import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';

// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: AppRouteModule[] = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/auth',
  name: 'Auth',
  component: () => import('/@/views/sys/auth/index.vue'),
  redirect: '/auth/login',
  meta: {
    title: t('routes.basic.login'),
    ignoreAuth: true,
  },
  children: [
    {
      path: 'login',
      name: 'LoginForm',
      component: () => import('/@/views/sys/auth/components/LoginForm.vue'),
      meta: {
        title: t('custom.D2LL4SJom2DBCys9HUmzM'),
      },
    },
    // {
    //   path: 'register',
    //   name: 'RegisterForm',
    //   component: () => import('/@/views/sys/auth/components/RegisterForm.vue'),
    //   meta: {
    //     title: t('custom.pX3-ryQYnyCiabcVOjZLP'),
    //   },
    // },
    // {
    //   path: 'forget-password',
    //   name: 'ForgetPasswordForm',
    //   component: () => import('/@/views/sys/auth/components/ForgetPasswordForm.vue'),
    //   meta: {
    //     title: t('custom.KZveg6vGwDtjUP92nKwA4'),
    //   },
    // },
    // {
    //   path: 'reset-password',
    //   name: 'ResetPassword',
    //   component: () => import('/@/views/sys/auth/components/ResetPaawordForm.vue'),
    //   meta: {
    //     title: t('custom.P6MdC79wP8ymYBqk1SdTj'),
    //   },
    // },
    // {
    //   path: 'pending-verify',
    //   name: 'PendingVerify',
    //   component: () => import('/@/views/sys/auth/components/PendingVerify.vue'),
    //   meta: {
    //     title: t('custom.baSwFRmGLEOvboeXBsSF1'),
    //   },
    // },
    // {
    //   path: 'verify',
    //   name: 'Verify',
    //   component: () => import('/@/views/sys/auth/components/SuccessVerify.vue'),
    //   meta: {
    //     title: t('custom.myZYy-k-5_pg7oqhKty2x'),
    //   },
    // },
  ],
};

// 未经许可的基本路由
export const basicRoutes = [LoginRoute, RootRoute, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE];
