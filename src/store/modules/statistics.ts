import { defineStore } from 'pinia';
import { getBlogBackInfoUsingGet } from '/@/api/apis';
import { StatisticList } from '/@/api/model';
export type StatisticsState = {
  statisticList: StatisticList;
  loading: boolean;
};

export const useStatistics = defineStore({
  id: 'statistics',
  state: (): StatisticsState => ({
    statisticList: undefined,
    loading: false,
  }),
  getters: {
    getStatisticList(): StatisticsState['statisticList'] {
      return this.statisticList;
    },
  },
  actions: {
    changeLoading(value: boolean) {
      this.loading = value;
    },
    setStatisticList(value: StatisticsState['statisticList']) {
      this.statisticList = value;
    },
    async fetchStatisticList() {
      this.changeLoading(true);
      const res = await getBlogBackInfoUsingGet(undefined);
      this.setStatisticList(res);
      this.changeLoading(false);
    },
  },
});
