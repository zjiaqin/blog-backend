import type { ApiData, ApiParam } from '/#/axios';
import { listArticlesAdminUsingGet } from '/@/api/apis';

export type listParams = ApiParam<typeof listArticlesAdminUsingGet>;
export type listResp = NonNullable<
  NonNullable<ApiData<typeof listArticlesAdminUsingGet>>['records']
>;
