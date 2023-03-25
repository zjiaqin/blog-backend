import type { ApiData, ApiParam } from '/#/axios';
import { listBackTalksUsingGet } from '/@/api/apis';

export type listParams = ApiParam<typeof listBackTalksUsingGet>;
export type listResp = NonNullable<NonNullable<ApiData<typeof listBackTalksUsingGet>>['records']>;
