import type { ApiData, ApiParam } from '/#/axios';
import { getWebsiteConfigUsingGet } from '/@/api/apis';

export type GetconfigParams = ApiParam<typeof getWebsiteConfigUsingGet>;
export type GetconfigResp = NonNullable<NonNullable<ApiData<typeof getWebsiteConfigUsingGet>>>;
