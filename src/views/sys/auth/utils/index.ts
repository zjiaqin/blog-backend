import { router } from '/@/router';

export function backLogin() {
  router.replace({ path: '/auth/login' });
}
