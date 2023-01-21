import { createRequest } from '/@/utils/http/axios';

/**
 * 删除管理员
 */
export const adminDelete = createRequest<
  {
    requestBody?: { id: number[] };
  },
  { code: number; data: { rows_affected: number }; msg: string; request_id: string }
>('adminDelete', ({ requestBody }) => ({
  url: `/admin/delete`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 管理员详情
 */
export const adminDetail = createRequest<
  {
    id?: number;
  },
  { code: number; data: GuanLiYuanXiangQing; msg: string; request_id: string }
>('adminDetail', ({ id }) => ({
  url: `/admin/detail`,
  method: 'GET',
  params: {
    id,
  },
}));

/**
 * 添加管理员
 */
export const adminInsert = createRequest<
  {
    requestBody?: { account: string; email: string; name: string; password: string; phone: string };
  },
  { code: number; data: {}; msg: string; request_id: string }
>('adminInsert', ({ requestBody }) => ({
  url: `/admin/insert`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 管理员列表
 */
export const adminList = createRequest<
  {
    keyword?: string;
    name?: string;
    page?: string;
    page_size?: string;
    status?: string;
  },
  {
    code: number;
    data: GuanLiYuanXiangQing[];
    msg: string;
    pagination: { has_more: boolean; page: number; page_size: number; total: number };
    request_id: string;
  }
>('adminList', ({ page, page_size, status, name, keyword }) => ({
  url: `/admin/list`,
  method: 'GET',
  params: {
    page,
    page_size,
    status,
    name,
    keyword,
  },
}));

/**
 * 管理员操作日志
 */
export const adminLogApi = createRequest<
  undefined,
  {
    code: number;
    data: {
      admin_id?: number;
      admin_name?: string;
      log_content?: string;
      log_id?: number;
      log_ip?: string;
      log_ip_address?: string;
      log_req_raw?: string;
      log_time?: number;
      log_url?: string;
    }[];
    msg: string;
    pagination: { has_more: boolean; page: number; page_size: number; total: number };
    request_id: string;
  }
>('adminLogApi', () => ({ url: `/log/adminlog`, method: 'GET' }));

/**
 * 管理员登录日志
 */
export const adminLoginLogApi = createRequest<
  undefined,
  {
    code: number;
    data: {
      address?: string;
      admin_id?: number;
      admin_level?: number;
      admin_name?: string;
      create_time?: number;
      ip?: string;
      log_id?: number;
      status?: number;
      status_desc?: string;
      user_agent?: string;
    }[];
    msg: string;
    pagination: { has_more: boolean; page: number; page_size: number; total: number };
    request_id: string;
  }
>('adminLoginLogApi', () => ({ url: `/log/adminlogin`, method: 'GET' }));

/**
 * 我的信息
 */
export const adminMy = createRequest<
  undefined,
  { code: number; data: GuanLiYuanXiangQing; msg: string; request_id: string }
>('adminMy', () => ({ url: `/admin/my`, method: 'GET' }));

/**
 * 编辑管理员
 */
export const adminUpdate = createRequest<
  {
    requestBody?: {
      account: string;
      admin_id: number;
      email: string;
      name: string;
      password: string;
      phone: string;
    };
  },
  { code: number; data: {}; msg: string; request_id: string }
>('adminUpdate', ({ requestBody }) => ({
  url: `/admin/update`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * APP列表
 */
export const appList = createRequest<
  undefined,
  {
    code: number;
    data: null | YingYongXiangQing[];
    msg: string;
    pagination: Pagination;
    request_id: string;
  }
>('appList', () => ({ url: `/app/list`, method: 'GET' }));

/**
 * 账号密码登录
 */
export const authLogin = createRequest<
  {
    requestBody?: { account: string; captcha: string; captcha_id: string; password: string };
  },
  { code: number; data: GuanLiYuanXiangQing; msg: string; request_id: string }
>('authLogin', ({ requestBody }) => ({
  url: `/auth/login`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 账号退出登录
 */
export const authLogout = createRequest<
  undefined,
  { code: number; msg: string; request_id: string }
>('authLogout', () => ({ url: `/auth/logout`, method: 'GET' }));

/**
 * 设置列表
 */
export const configList = createRequest<
  undefined,
  { code: number; data: SheZhiXiangQing[]; msg: string; request_id: string }
>('configList', () => ({ url: `/config/list`, method: 'GET' }));

/**
 * 更新设置
 */
export const configUpdate = createRequest<
  {
    requestBody?: { key: string; value: string }[];
  },
  { code: number; data: null; msg: string; request_id: string }
>('configUpdate', ({ requestBody }) => ({
  url: `/config/update`,
  method: 'POST',
  data: requestBody,
  headers: { 'Content-Type': 'application/json' },
}));

/**
 * 系统错误日志
 */
export const errorLogApi = createRequest<
  undefined,
  {
    code: number;
    data: {
      code?: string;
      content?: string;
      create_time?: number;
      file?: string;
      hostname?: string;
      id?: number;
      line?: number;
      module?: string;
      prefix?: string;
      project?: string;
      request_id?: string;
      trace?: string;
    }[];
    msg: string;
    pagination: { has_more: boolean; page: number; page_size: number; total: number };
    request_id: string;
  }
>('errorLogApi', () => ({ url: `/log/error`, method: 'GET' }));

/**
 * 资金变动明细
 */
export const fundDetails = createRequest<
  {
    currency?: string;
    page?: number;
    page_size?: number;
    start_time?: number;
    type?: string;
  },
  {
    code: number;
    data: null | AccountLogDetail[];
    msg: string;
    pagination: { has_more: boolean; page: number; page_size: number };
    request_id: string;
  }
>('fundDetails', ({ page, page_size, type, start_time, currency }) => ({
  url: `/fund/details`,
  method: 'GET',
  params: {
    page,
    page_size,
    type,
    start_time,
    currency,
  },
}));

/**
 * 提现记录
 */
export const fundWithdrawalRecord = createRequest<
  {
    amount_max?: string;
    amount_min?: string;
    cash_status?: string;
    currency?: string;
    end_time?: string;
    handle_status?: string;
    page?: number;
    page_size?: number;
    start_time?: string;
    to_address?: string;
    transaction_id?: string;
  },
  {
    code: number;
    data: null | JiaoYiXiangQing[];
    msg: string;
    pagination: Pagination;
    request_id: string;
  }
>(
  'fundWithdrawalRecord',
  ({
    page,
    page_size,
    to_address,
    transaction_id,
    start_time,
    end_time,
    amount_min,
    amount_max,
    currency,
    handle_status,
    cash_status,
  }) => ({
    url: `/fund/withdrawal_record`,
    method: 'GET',
    params: {
      page,
      page_size,
      to_address,
      transaction_id,
      start_time,
      end_time,
      amount_min,
      amount_max,
      currency,
      handle_status,
      cash_status,
    },
  }),
);

/**
 * 获取验证码
 */
export const getCaptcha = createRequest<
  undefined,
  { code: number; data: { data: string; id: string }; msg: string; request_id: string }
>('getCaptcha', () => ({ url: `/captcha/get`, method: 'GET' }));

/**
 * 握手协议
 */
export const initHandshake = createRequest<
  undefined,
  {
    code: number;
    data: { aws: { bucket: string; region: string; url: string } };
    msg: string;
    request_id: string;
  }
>('initHandshake', () => ({ url: `/init/handshake`, method: 'GET' }));

/**
 * 商户信息
 */
export const merchantDetail = createRequest<
  {
    merchant_id?: number;
  },
  { code: number; data: ShangHuXiangQing; msg: string; request_id: string }
>('merchantDetail', ({ merchant_id }) => ({
  url: `/merchant/detail`,
  method: 'GET',
  params: {
    merchant_id,
  },
}));

/**
 * 商户列表
 */
export const merchantList = createRequest<
  {
    account?: string;
    ip?: string;
    mch_id?: string;
    name?: string;
    page?: string;
    page_size?: number;
  },
  {
    code: number;
    data: null | ShangHuXiangQing[];
    msg: string;
    pagination: Pagination;
    request_id: string;
  }
>('merchantList', ({ mch_id, name, account, ip, page, page_size }) => ({
  url: `/merchant/list`,
  method: 'GET',
  params: {
    mch_id,
    name,
    account,
    ip,
    page,
    page_size,
  },
}));

/**
 * 商户登录日志
 */
export const merchantLoginLogApi = createRequest<
  undefined,
  {
    code: number;
    data: {
      address: string;
      create_time: number;
      device_brand: string;
      device_type: string;
      ipaddress: string;
      login_credential: string;
      merchant: ShangHuXiangQing;
      merchant_id: number;
      os: string;
      os_version: string;
      type: number;
      user_agent: string;
    }[];
    msg: string;
    pagination: { has_more: boolean; page: number; page_size: number; total: number };
    request_id: string;
  }
>('merchantLoginLogApi', () => ({ url: `/log/merchantlogin`, method: 'GET' }));

/**
 * 首页概览统计
 */
export const overviewStatistics = createRequest<undefined, {}>('overviewStatistics', () => ({
  url: `/overview/statistics`,
  method: 'GET',
}));

/**
 * 交易记录
 */
export const transactionList = createRequest<
  {
    amount_max?: string;
    amount_min?: string;
    currency?: string;
    end_time?: string;
    out_trade_no?: string;
    page?: number;
    page_size?: number;
    start_time?: string;
    status?: string;
    transaction_id?: string;
    tx_id?: string;
  },
  {
    code: number;
    data: null | JiaoYiXiangQing[];
    msg: string;
    pagination: Pagination;
    request_id: string;
  }
>(
  'transactionList',
  ({
    page,
    page_size,
    out_trade_no,
    transaction_id,
    tx_id,
    start_time,
    end_time,
    amount_min,
    amount_max,
    currency,
    status,
  }) => ({
    url: `/transaction/list`,
    method: 'GET',
    params: {
      page,
      page_size,
      out_trade_no,
      transaction_id,
      tx_id,
      start_time,
      end_time,
      amount_min,
      amount_max,
      currency,
      status,
    },
  }),
);

/**
 * 验证码验证
 */
export const verifyCaptcha = createRequest<
  {
    id: string;
    value: string;
  },
  { code: number; msg: string }
>('verifyCaptcha', ({ id, value }) => ({
  url: `/captcha/verify`,
  method: 'GET',
  params: {
    id,
    value,
  },
}));

export interface AccountLogDetail {
  act: number;
  admin_id: number;
  amount: number;
  amount_after: number;
  amount_before: number;
  create_time: number;
  currency?: BiZhongXiangQing;
  currency_code: string;
  decimal: number;
  log_id: number;
  merchant_id: number;
  remark: string;
  transaction_id: string;
  tx_id: string;
  type: number;
}

export interface BiZhongXiangQing {
  chain: string;
  code: string;
  contract_address: string;
  decimal: number;
  logo: string;
  name: string;
  sub_name: string;
  type: string;
}

export interface GuanLiYuanXiangQing {
  account: string;
  admin_id: number;
  create_time: number;
  email: string;
  last_error_time: number;
  last_ip: string;
  last_time: number;
  last_uri: string;
  level: number;
  login_error: number;
  login_time: number;
  name: string;
  power: string;
  status: number;
}

export interface JiaoYiXiangQing {
  amount: number;
  app?: YingYongXiangQing;
  attach: string;
  close_time: number;
  contract_address: string;
  create_time: number;
  currency?: BiZhongXiangQing;
  decimals: number;
  description: string;
  from_address: string;
  merchant?: ShangHuXiangQing;
  out_trade_no: string;
  pay_time: number;
  status: number;
  to_address: string;
  trade_state: string;
  trade_type: string;
  transaction_id: string;
  txid: string;
}

export interface Pagination {
  cursor?: string;
  has_more: boolean;
  page: number;
  page_size: number;
  total?: number;
}

export interface ShangHuChiBiXiangQing {
  balance: number;
  cash_time: number;
  create_time: number;
  currency: string;
  decimal: number;
  mch_id: string;
  merchant_id: number;
  modify_time: number;
}

export interface ShangHuXiangQing {
  cash_time: number;
  create_time: number;
  currency?: ShangHuChiBiXiangQing[];
  email: string;
  last_ip: string;
  last_login_ip: string;
  last_login_time: number;
  last_time: number;
  mch_id: string;
  name: string;
  notify_balance_insufficient: number;
  notify_email: string;
  notify_login: number;
  notify_order_finish: number;
  notify_type: number;
  reg_time: number;
  settlement_cycle: number;
  settlement_rate: number;
  status: number;
  telegram_first_name: string;
  telegram_last_name: string;
  telegram_user_id: number;
  telegram_username: string;
  tron_address: string;
  usdt_frozen_money: number;
  usdt_money: number;
  valuation: number;
  valuation_decimal: number;
  wallet_address: string;
  wallet_private_key: string;
  withdraw_address: string;
}

export interface SheZhiXiangQing {
  category_id: number;
  config_desc: string;
  config_name: string;
  config_sort: number;
  config_summary: string;
  config_type: number;
  config_value: string;
}

export interface UserReport {
  activity_amount: number;
  all_return_amount: number;
  bet_amount: number;
  bet_count: number;
  cash_amount: number;
  commission_amount: number;
  money: number;
  profit_amount: number;
  symbol: string;
  transfer_amount: number;
  win_amount: number;
}

export interface YingYongXiangQing {
  allow_ip: string;
  app_id: string;
  app_secret: string;
  create_time: number;
  logo: string;
  mch_id: string;
  merchant?: ShangHuXiangQing;
  merchant_id: number;
  name: string;
  order_notify_url: string;
  receive_type: number;
  status: number;
  type: string;
}
