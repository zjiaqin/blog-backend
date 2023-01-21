import { defineStore } from 'pinia';
import { currencyIndex, BiZhongSuoYin } from '/@/api/apis';
import { getCurrencyLogo as getLogo, CurrencyLogoType } from '/@/utils/currencyInfo';
import { getCurrencyCache, setCurrencyCache } from '/@/utils/currencyInfo';
import { statisticsOrderChart } from '/@/api/apis';
import { useChangeCurrency } from '/@/utils/currencyInfo';
import type { ApiData } from '/#/axios';

export type CurrencyState = {
  currency: BiZhongSuoYin | null;
  netWork: string;
  currencyList: BiZhongSuoYin[] | null;
  currencyStatistics: ApiData<typeof statisticsOrderChart> | null;
  currencyBalance: number;
};

export const useCurrencyStore = defineStore({
  id: 'currency',
  state: (): CurrencyState => ({
    currency: getCurrencyCache(),
    netWork: '',
    currencyList: null,
    currencyStatistics: null,
    currencyBalance: 0,
  }),
  getters: {
    getCurrency(): CurrencyState['currency'] {
      return this.currency || getCurrencyCache();
    },
    getNetWork(): CurrencyState['netWork'] {
      return this.netWork;
    },
    getCurrencyList(): CurrencyState['currencyList'] {
      return this.currencyList;
    },
    /**
     * 获取当前选择币种logo
     */
    getCurrentCurrencyLogo(): string {
      if (!this.getCurrency) return '';
      return this.getCurrency.logo ? this.getCurrency.logo : getLogo(this.getCurrency.currency);
    },
  },
  actions: {
    setCurrency(currency: CurrencyState['currency']) {
      setCurrencyCache(currency);
      this.currency = currency;
    },
    setNetWork(netWork: CurrencyState['netWork']) {
      this.netWork = netWork;
    },
    setCurrencyList(list: CurrencyState['currencyList']) {
      this.currencyList = list;
    },
    /**
     * 获取币种logo
     */
    getCurrencyLogo(currencyName: CurrencyLogoType | string): string {
      if (!currencyName) return '';
      if (this.currencyList && this.currencyList.length) {
        const find = this.currencyList.find((x) => x.currency === currencyName);
        if (find) return find.logo ? find.logo : getLogo(find.currency);
      }
      return getLogo(currencyName);
    },

    /**
     * 获取币种列表信息
     */
    async getCurrencyListAction(): Promise<CurrencyState['currencyList'] | null> {
      const currencyList = await currencyIndex(undefined);
      this.setCurrencyList(currencyList);
      return currencyList;
    },
    /**
     * 初始化货币
     */
    async initCurrency() {
      const list = await this.getCurrencyListAction();
      if (list?.length) {
        if (!this.currency) {
          this.setCurrency(list[0]);
        }
        if (!this.netWork && list[0].type.length) {
          if (!this.getCurrency) {
            this.setNetWork(list[0].type[0]);
          } else {
            if (this.getCurrency && this.getCurrency.type.length) {
              this.setNetWork(this.getCurrency.type[0]);
            }
          }
        }
      }
      this.initCurrencyStatisticsAction();
    },
    // 初始化获取用户币种统计
    initCurrencyStatisticsAction() {
      const getStatisticsBalance = () => {
        if (!this.getCurrency) return;
        statisticsOrderChart({ currency: this.getCurrency.currency }).then((res) => {
          this.currencyStatistics = res;
          // const find = res.currency_list.find((x) => x.currency == this.getCurrency?.currency);
          // this.currencyBalance = find ? find.balance / Math.pow(10, find.decimal) : 0;
          this.currencyBalance = res.merchant_balance
            ? res.merchant_balance / Math.pow(10, res.coin.decimal)
            : 0;
        });
      };
      useChangeCurrency(getStatisticsBalance);
    },
  },
});
