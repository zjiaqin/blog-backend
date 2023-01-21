import { message as AMessage } from 'ant-design-vue';
import { defineStore } from 'pinia';
import { openTronPopup } from '/@/components/Popup';
import { useI18n } from '/@/hooks/web/useI18n';

export const useTronStore = defineStore({
  id: 'tron',
  state: () => ({
    isLoginTronLink: false,
    tronAddress:
      (window as any)?.tronWeb && (window as any)?.tronWeb?.defaultAddress.base58
        ? (window as any)?.tronWeb?.defaultAddress.base58
        : '',
  }),
  getters: {
    getTronAddress(): string {
      return this.tronAddress;
    },
  },
  actions: {
    setTronAddress(val: string) {
      this.tronAddress = val;
    },
    /**
     * 检查是否连接连接钱包
     * @param clearTimerFunc 清除计时器回调
     * @param showMessage 是否显示消息提示
     * @param showModal 是否弹出连接钱包弹窗
     */
    async checkTronLink(
      clearTimerFunc?: Function,
      showMessage = true,
      showModal = true,
    ): Promise<boolean> {
      const { t } = useI18n();
      if (!(window as any)?.tronWeb) {
        showMessage && AMessage.error(t('custom.X4xQ1GONJYt7GTqR5Fe6A'));
        showModal && openTronPopup(clearTimerFunc);
        this.isLoginTronLink = false;
        return false;
      }
      const resP = await (window as any).tronLink.request({ method: 'tron_requestAccounts' });
      if (!resP) {
        showMessage && AMessage.error(t('custom.nArKe3uIfCJrUM8iKr_R8'));
        showModal && openTronPopup(clearTimerFunc);
        this.isLoginTronLink = false;
        return false;
      }
      if (resP.code != 200) {
        const msg = resP.message ? resP.message : t('custom.QG3dsa4NSKeYuElFqMyzu');
        AMessage.error(msg);
        return false;
      }
      return true;
    },
    /**
     * 连接钱包
     */
    async linkWallet(): Promise<boolean> {
      const bool = await this.checkTronLink(undefined, true, false);
      if (!bool) return false;
      const address = (window as any)?.tronWeb?.defaultAddress.base58;
      this.setTronAddress(address ? address : '');
      this.isLoginTronLink = true;
      return true;
    },
  },
});
