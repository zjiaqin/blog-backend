import type { ApiData, ApiParam } from '/#/axios';
import { listUsersUsingGet, listUserRolesUsingGet } from '/@/api/apis';

export type listParams = ApiParam<typeof listUsersUsingGet>;
export type listResp = NonNullable<NonNullable<ApiData<typeof listUsersUsingGet>>['records']>;

export type listRolesResp = ApiData<typeof listUserRolesUsingGet>;
