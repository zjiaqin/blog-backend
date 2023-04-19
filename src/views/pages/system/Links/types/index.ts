import type { ApiData, ApiParam } from '/#/axios';
import { listFriendLinkDtoUsingGet, saveOrUpdateFriendLinkUsingPost } from '/@/api/apis';

export type listParams = ApiParam<typeof listFriendLinkDtoUsingGet>;
export type listResp = NonNullable<
  NonNullable<ApiData<typeof listFriendLinkDtoUsingGet>>['records']
>;

export type UpdateParams = ApiParam<typeof saveOrUpdateFriendLinkUsingPost>;
