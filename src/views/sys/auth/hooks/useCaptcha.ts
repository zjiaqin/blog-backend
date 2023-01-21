import { ref } from 'vue';
import { getCaptcha } from '/@/api/apis';
import type { captchaGetType } from '../types';

export function useCaptcha() {
  const getCaptchaBase64 = ref<captchaGetType>();

  // 更新验证码
  async function setCaptchaBase64() {
    getCaptchaBase64.value = await getCaptcha(undefined);
  }

  return { setCaptchaBase64, getCaptchaBase64 };
}
