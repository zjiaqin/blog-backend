import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: LAYOUT,
    redirect: '/dashboard/analysis',
    meta: {
      orderNo: 1,
      icon: 'ion:stats-chart',
      title: '概览',
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('/@/views/pages/dashboard/index.vue'),
        meta: {
          icon: 'ion:stats-chart',
          title: '概览',
        },
      },
    ],
  },
];

export default dashboard;
