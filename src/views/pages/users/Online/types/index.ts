import type { ApiData, ApiParam } from '/#/axios';
import { listOnlineUsersUsingGet, listUserRolesUsingGet } from '/@/api/apis';

export type listParams = ApiParam<typeof listOnlineUsersUsingGet>;
export type listResp = NonNullable<NonNullable<ApiData<typeof listOnlineUsersUsingGet>>['records']>;

export type listRolesResp = ApiData<typeof listUserRolesUsingGet>;
