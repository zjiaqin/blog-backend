import type { ApiData, ApiParam } from '/#/axios';
import { listOperationLogsUsingGet } from '/@/api/apis';

export type listParams = ApiParam<typeof listOperationLogsUsingGet>;
export type listResp = NonNullable<
  NonNullable<ApiData<typeof listOperationLogsUsingGet>>['records']
>;
