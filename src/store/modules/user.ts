import type { ErrorMessageMode, ApiParam } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
// import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { ROLES_KEY, USER_INFO_KEY, USER_INFOID_KEY, TOKEN_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
// import { authLogin, logoutUsingPost, merchantInfo } from '/@/api/apis';
import {
  authLogin,
  logoutUsingPost,
  getUserInfoByIdUsingGet,
  listRolesUsingGet,
} from '/@/api/apis';
import { UserInfo, RolesList } from '/@/api/model';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { h } from 'vue';
import { removerCurrencyCache } from '/@/utils/currencyInfo';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  hasToken: boolean;
  roleList?: RolesList;
  sessionTimeout?: boolean;
  lastUpdateTime: number;
  userInfoId?: number;
}

let userInfoPolling = 0;

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // user id
    userInfoId: undefined,
    // token
    token: undefined,
    hasToken: hasToken(),
    // roleList
    roleList: undefined,
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getUserInfoId(): number | {} {
      return this.userInfoId || getAuthCache<number>(USER_INFOID_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): RolesList {
      return this.roleList ? this.roleList : getAuthCache<RolesList>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setRoleList(roleList: RolesList) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
      this.setHasToken();
    },
    setHasToken() {
      this.hasToken = hasToken();
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setUserInfoId(id) {
      this.userInfoId = id;
      setAuthCache(USER_INFOID_KEY, id);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.stopPollUserInfo();
      removerCurrencyCache();
      this.setUserInfo(null);
      this.userInfoId = undefined;
      this.token = undefined;
      this.hasToken = false;
      this.setRoleList(undefined);
      this.setSessionTimeout(false);
    },
    /**
     * @description: login
     */
    async login(
      params: ApiParam<typeof authLogin> & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<UserInfo | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const res = (await authLogin(loginParams, {
          errorMessageMode: mode,
          joinParamsToUrl: true,
        })) as any;
        this.setUserInfo(res);
        this.setToken(res.token);
        this.setUserInfoId(res.userInfoId);

        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async afterLoginAction(goHome?: boolean): Promise<UserInfo | null> {
      if (!this.hasToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();
      this.getRoleListAction();
      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          console.log(routes);
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }

        goHome && (await router.replace(PageEnum.BASE_HOME));
      }

      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.hasToken || !this.userInfoId) return null;

      const userInfo = await getUserInfoByIdUsingGet({ userInfoId: this.userInfoId });

      this.setUserInfo(userInfo);

      return userInfo;
    },
    async getRoleListAction() {
      if (!this.hasToken || !this.userInfoId) return null;
      const roleList = await listRolesUsingGet({});

      this.setRoleList(roleList);
      return roleList;
    },
    pollGetUserInfo() {
      if (userInfoPolling) return null;
      userInfoPolling = window.setInterval(() => {
        if (!this.hasToken || !this.userInfoId) return null;
        getUserInfoByIdUsingGet({ userInfoId: this.userInfoId });
      }, 1000 * 30);
    },
    stopPollUserInfo() {
      if (userInfoPolling) clearInterval(userInfoPolling);
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.hasToken) {
        try {
          await logoutUsingPost(undefined);
          this.resetState();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      this.setUserInfoId(undefined);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
export function hasToken() {
  return !!getAuthCache<string>(TOKEN_KEY);
}
