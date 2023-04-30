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
    path: '/talks',
    name: 'Talks',
    component: LAYOUT,
    redirect: '/talks/list',
    meta: {
      orderNo: 3,
      icon: 'ion:logo-octocat',
      title: '说说管理',
    },

    children: [
      {
        path: 'list',
        name: 'TalksList',
        component: () => import('/@/views/pages/talks/List/index.vue'),
        meta: {
          icon: 'ion:document-text',
          title: '说说列表',
        },
      },
      {
        path: 'add',
        name: 'TalksAdd',
        component: () => import('/@/views/pages/talks/Editor/index.vue'),
        meta: {
          icon: 'ion:create',
          title: '发布说说',
        },
      },
      {
        path: 'edit',
        name: 'TalksEdit',
        component: () => import('/@/views/pages/talks/Editor/index.vue'),
        meta: {
          icon: 'ion:create',
          title: '编辑说说',
          hideMenu: true,
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
      orderNo: 4,
      icon: 'ion:notifications',
      title: '评论管理',
    },
    children: [
      {
        path: 'index',
        name: 'MessageIndex',
        component: () => import('/@/views/pages/message/index.vue'),
        meta: {
          icon: 'ion:chatbubble-working',
          title: '评论管理',
        },
      },
    ],
  },

  {
    path: '/users',
    name: 'Users',
    component: LAYOUT,
    redirect: '/users/index',

    meta: {
      orderNo: 5,
      icon: 'ion:person-sharp',
      title: '用户管理',
    },
    children: [
      {
        path: 'list',
        name: 'UsersList',
        component: () => import('/@/views/pages/users/List/index.vue'),
        meta: {
          icon: 'ion:person-sharp',
          title: '用户列表',
        },
      },
      {
        path: 'online',
        name: 'UsersOnline',
        component: () => import('/@/views/pages/users/Online/index.vue'),
        meta: {
          icon: 'ion:ellipsis-horizontal-circle-outline',
          title: '在线用户',
        },
      },
    ],
  },

  {
    path: '/permission',
    name: 'Permission',
    component: LAYOUT,
    redirect: '/permission/index',

    meta: {
      orderNo: 5,
      icon: 'ion:key-sharp',
      title: '权限管理',
    },
    children: [
      {
        path: 'menus',
        name: 'Menus',
        component: () => import('/@/views/pages/permission/Menus/index.vue'),
        meta: {
          icon: 'ion:menu-sharp',
          title: '菜单管理',
        },
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('/@/views/pages/permission/Roles/index.vue'),
        meta: {
          icon: 'ion:ios-contact-outline',
          title: '角色管理',
        },
      },
      {
        path: 'resources',
        name: 'Resources',
        component: () => import('/@/views/pages/permission/Resources/index.vue'),
        meta: {
          icon: 'ion:ios-globe',
          title: '接口管理',
          hideMenu: true,
        },
      },
    ],
  },
  {
    path: '/system',
    name: 'System',
    component: LAYOUT,
    redirect: '/system/website',

    meta: {
      orderNo: 5,
      icon: 'ion:settings-sharp',
      title: '系统管理',
    },
    children: [
      {
        path: 'website',
        name: 'Website',
        component: () => import('/@/views/pages/system/Website/index.vue'),
        meta: {
          icon: 'ion:ios-globe',
          title: '网站管理',
        },
      },
      {
        path: 'quartz',
        name: 'Quartz',
        component: () => import('/@/views/pages/system/Quartz/index.vue'),
        meta: {
          icon: 'ion:ios-alarm',
          title: '定时任务',
        },
      },
      {
        path: 'links',
        name: 'Links',
        component: () => import('/@/views/pages/system/Links/index.vue'),
        meta: {
          icon: 'ion:ios-link',
          title: '友链管理',
        },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('/@/views/pages/system/About/index.vue'),
        meta: {
          icon: 'ion:md-bookmarks',
          title: '关于我',
        },
      },
    ],
  },

  {
    path: '/logs',
    name: 'Log',
    component: LAYOUT,
    redirect: '/logs/exception',

    meta: {
      orderNo: 5,
      icon: 'ion:ios-bookmarks',
      title: '日志管理',
    },
    children: [
      {
        path: 'exception',
        name: 'ExceptionLog',
        component: () => import('/@/views/pages/logs/Exception/index.vue'),
        meta: {
          icon: 'ion:md-bug',
          title: '异常日志',
        },
      },
      {
        path: 'operation',
        name: 'OperationLog',
        component: () => import('/@/views/pages/logs/Operation/index.vue'),
        meta: {
          icon: 'ion:server-outline',
          title: '操作日志',
        },
      },
      {
        path: 'quartz',
        name: 'QuartzLog',
        component: () => import('/@/views/pages/logs/Quartz/index.vue'),
        meta: {
          icon: 'ion:md-bookmarks',
          title: '定时任务日志',
        },
      },
    ],
  },
  {
    path: '/account',
    name: 'Account',
    component: LAYOUT,
    redirect: '/account/setting',

    meta: {
      orderNo: 5,
      icon: 'ion:person',
      title: '个人中心',
    },
    children: [
      {
        path: 'setting',
        name: 'AccountSetting',
        component: () => import('/@/views/pages/account/Setting/index.vue'),
        meta: {
          icon: 'ion:person',
          title: '个人设置',
        },
      },
    ],
  },
];

export default home;
