import type { ApiData, ApiParam } from '/#/axios';
import { listRolesUsingGet, saveOrUpdateRoleUsingPost, listMenuOptionsUsingGet } from '/@/api/apis';

export type listParams = ApiParam<typeof listRolesUsingGet>;
export type listResp = NonNullable<NonNullable<ApiData<typeof listRolesUsingGet>>['records']>;

export type updateRoleParams = ApiParam<typeof saveOrUpdateRoleUsingPost>;

export type OptionResp = NonNullable<NonNullable<ApiData<typeof listMenuOptionsUsingGet>>>;
