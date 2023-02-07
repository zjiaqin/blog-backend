// import type { Pagination } from '/@/api/apis';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
  // 请求重试机制
  retryRequest?: RetryRequest;
}

export interface RetryRequest {
  isOpenRetry: boolean;
  count: number;
  waitTime: number;
}
export interface Result<T = any> {
  code?: number;
  message?: string;
  data?: T;
  flag?: boolean;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}

type Api = (...args: any) => any;
export type ApiParam<A extends Api> = A extends (args: infer R) => any ? R : any;
export type ApiResp<A extends Api> = ReturnType<A> extends Promise<infer D> ? D : any;
export type ApiData<A extends Api> = ReturnType<A> extends Promise<infer D> ? D : any;
// export type ApiData<A extends Api> = ReturnType<A> extends Promise<{
//   data?: infer D;
// }>
//   ? D
//   : any;
