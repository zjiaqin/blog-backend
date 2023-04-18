import type { ApiData, ApiParam } from '/#/axios';
import { listJobsUsingGet, saveJobUsingPost } from '/@/api/apis';

export type listParams = ApiParam<typeof listJobsUsingGet>;
export type listResp = NonNullable<NonNullable<ApiData<typeof listJobsUsingGet>>['records']>;

export type UpdateParams = ApiParam<typeof saveJobUsingPost>;
