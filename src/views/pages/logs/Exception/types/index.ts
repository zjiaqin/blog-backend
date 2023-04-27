import type { ApiData, ApiParam } from '/#/axios';
import { listExceptionLogsUsingGet } from '/@/api/apis';

export type listParams = ApiParam<typeof listExceptionLogsUsingGet>;
export type listResp = NonNullable<
  NonNullable<ApiData<typeof listExceptionLogsUsingGet>>['records']
>;
