import type { ApiData, ApiParam } from '/#/axios';
import { getBackTalkByIdUsingGet } from '/@/api/apis';

export type TalkByIdParams = ApiParam<typeof getBackTalkByIdUsingGet>;
export type TalkByIdResp = NonNullable<NonNullable<ApiData<typeof getBackTalkByIdUsingGet>>>;
