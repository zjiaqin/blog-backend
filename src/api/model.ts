import {
  getBlogBackInfoUsingGet,
  getUserInfoByIdUsingGet,
  listUserMenusUsingGet,
  listRolesUsingGet,
} from './apis';
import type { ApiData } from '/#/axios';

export type UserInfo = ApiData<typeof getUserInfoByIdUsingGet>;
export type UserMenu = ApiData<typeof listUserMenusUsingGet>;
export type RolesList = ApiData<typeof listRolesUsingGet>;
export type StatisticList = ApiData<typeof getBlogBackInfoUsingGet>;
