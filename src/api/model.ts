import {
  getBlogBackInfoUsingGet,
  getUserInfoByIdUsingGet,
  listUserMenusUsingGet,
  listUserRolesUsingGet,
} from './apis';
import type { ApiData } from '/#/axios';

export type UserInfo = ApiData<typeof getUserInfoByIdUsingGet>;
export type UserMenu = ApiData<typeof listUserMenusUsingGet>;
export type RolesList = ApiData<typeof listUserRolesUsingGet>;
export type StatisticList = ApiData<typeof getBlogBackInfoUsingGet>;
