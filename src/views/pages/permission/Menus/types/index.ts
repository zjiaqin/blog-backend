import type { ApiData, ApiParam } from '/#/axios';
import { listMenusUsingGet, saveOrUpdateMenuUsingPost } from '/@/api/apis';

export type listParams = ApiParam<typeof listMenusUsingGet>;
export type listResp = NonNullable<NonNullable<ApiData<typeof listMenusUsingGet>>>;

export type UpdateMenuParams = ApiParam<typeof saveOrUpdateMenuUsingPost>;
