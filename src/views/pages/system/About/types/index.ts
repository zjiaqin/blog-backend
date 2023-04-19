import type { ApiData, ApiParam } from '/#/axios';
import { getAboutUsingGet, updateAboutUsingPut } from '/@/api/apis';

export type ArticleByIdParams = ApiParam<typeof getAboutUsingGet>;
export type ArticleByIdResp = NonNullable<NonNullable<ApiData<typeof getAboutUsingGet>>>;

export type UpdateParams = ApiParam<typeof updateAboutUsingPut>;
