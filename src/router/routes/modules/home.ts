import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const home: AppRouteModule[] = [
  {
    path: '/home',
    name: 'Home',
    component: LAYOUT,
    redirect: '/home/index',
    meta: {
      orderNo: 1,
      icon: 'ion:stats-chart',
      title: '首页',
    },
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        component: () => import('/@/views/pages/home/index.vue'),
        meta: {
          icon: 'ion:stats-chart',
          title: '首页',
          hideBreadcrumb: true,
        },
      },
    ],
  },
  {
    path: '/articles',
    name: 'Articles',
    component: LAYOUT,
    redirect: '/articles/list',
    meta: {
      orderNo: 2,
      icon: 'ion:ios-filing',
      title: '文章管理',
    },

    children: [
      {
        path: 'list',
        name: 'ArticlesList',
        component: () => import('/@/views/pages/articles/List/index.vue'),
        meta: {
          icon: 'ion:document-text',
          title: '文章列表',
        },
      },
      {
        path: 'add',
        name: 'ArticlesAdd',
        component: () => import('/@/views/pages/articles/Editor/index.vue'),
        meta: {
          icon: 'ion:create',
          title: '发布文章',
        },
      },
      {
        path: 'edit',
        name: 'ArticlesEdit',
        component: () => import('/@/views/pages/articles/Editor/index.vue'),
        meta: {
          icon: 'ion:create',
          title: '编辑文章',
          hideMenu: true,
        },
      },
      {
        path: 'categories',
        name: 'ArticlesCategories',
        component: () => import('/@/views/pages/articles/Categories/index.vue'),
        meta: {
          icon: 'ion:layers',
          title: '文章分类',
        },
      },
      {
        path: 'tag',
        name: 'ArticlesTag',
        component: () => import('/@/views/pages/articles/Tag/index.vue'),
        meta: {
          icon: 'ion:md-pricetag',
          title: '文章标签',
        },
      },
    ],
  },
  {
    path: '/message',
    name: 'Message',
    component: LAYOUT,
    redirect: '/message/index',
    meta: {
      orderNo: 3,
      icon: 'ion:notifications',
      title: '消息管理',
    },
    children: [
      {
        path: 'index',
        name: 'MessageIndex',
        component: () => import('/@/views/pages/message/index.vue'),
        meta: {
          icon: 'ion:notifications',
          title: '消息管理',
          hideBreadcrumb: true,
        },
      },
    ],
  },
];

export default home;
