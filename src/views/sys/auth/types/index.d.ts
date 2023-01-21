import {
  authRegister,
  getCaptcha,
  registerVerifyApi,
  authForgetPassword,
  forgetPasswordVerifyApi,
  authUpdatePassword,
} from '/@/api/apis';
import type { ApiParam, ApiData } from '/#/axios';

export type authRegisterType = ApiData<typeof authRegister>;

// 获取验证码
export type captchaGetType = ApiData<typeof getCaptcha>;
// 注册验证
export type verifyRegisterType = ApiParam<typeof registerVerifyApi>;

// 忘记密码发邮件
export type authForgetPasswordType = ApiParam<typeof authForgetPassword>['requestBody'];
// 忘记密码验证
export type verifyforgetPasswordType = ApiParam<typeof forgetPasswordVerifyApi>;
// 直接重置密码
export type authUpdatePasswordType = ApiParam<typeof authUpdatePassword>['requestBody'];
// 待验证页路由参数
export type verifyRouteParamsType = {
  email: string;
  verify_code: string;
  type: number;
};
// 再次发送验证码路由参数：1注册、2忘记密码
type sendVerifyType = {
  email: string;
  type: number;
};
