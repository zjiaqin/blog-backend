import { adminMy } from './apis';
import type { ApiData } from '/#/axios';

export type UserInfo = ApiData<typeof adminMy>;
