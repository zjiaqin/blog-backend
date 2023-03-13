import type { ApiData, ApiParam } from '/#/axios';
import { listCategoriesAdminUsingGet } from '/@/api/apis';

export type listParams = ApiParam<typeof listCategoriesAdminUsingGet>;
export type listResp = NonNullable<
  NonNullable<ApiData<typeof listCategoriesAdminUsingGet>>['records']
>;
