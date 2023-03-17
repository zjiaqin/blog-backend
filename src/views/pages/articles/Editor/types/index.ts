import type { ApiData, ApiParam } from '/#/axios';
import { getArticleBackByIdUsingGet } from '/@/api/apis';

export type ArticleByIdParams = ApiParam<typeof getArticleBackByIdUsingGet>;
export type ArticleByIdResp = NonNullable<NonNullable<ApiData<typeof getArticleBackByIdUsingGet>>>;
