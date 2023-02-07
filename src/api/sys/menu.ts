// import { UserMenu } from './model/menuModel';
import { listMenuOptionsUsingGet } from '/@/api/apis';
import type { AppRouteRecordRaw } from '/@/router/types';

/**
 * @description: Get user menu based on id
 */

const dashboard = [
  {
    path: '/home',
    name: 'Home',
    component: 'LAYOUT',
    redirect: '/home/index',
    meta: {
      icon: 'ion:grid-outline',
      title: 'test',
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: 'pages/dashboard/index.vue',
        meta: {
          affix: true,
          title: 'test',
        },
      },
    ],
  },
];
export default dashboard;

export const getMenuList = async () => {
  const res = await listMenuOptionsUsingGet(undefined);
  console.log(res);

  return dashboard;
};

export function roterListDeal(arr: []) {
  const newArr: AppRouteRecordRaw[] = [];
  arr.forEach((value) => {
    newArr.path;
    value;
  });
}
