<template>
  <Card style="border-radius: 10px">
    <div class="warpper">
      <div class="left">
        <div class="title"> {{ title }}</div>
        <div class="info">
          <div class="text1">
            <CountTo
              :startVal="1"
              :endVal="dataList?.currentPeriod"
              class="text-2xl"
              color="#000"
            />
            U</div
          >

          <div class="text2"
            >昨日 <CountTo :startVal="1" :endVal="dataList?.previousPeriod" /> U
            <TrendNumber
              :previousPeriod="dataList?.previousPeriod ?? 0"
              :currentPeriod="dataList?.currentPeriod ?? 0"
              :size="20"
          /></div>
        </div>
      </div>
      <div class="right">
        <div class="img">
          <Icon :icon="icon" color="#3652b0" />
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
  import { Icon } from '/@/components/Icon';
  import { Card } from 'ant-design-vue';
  import { CountTo } from '/@/components/CountTo/index';
  import TrendNumber from './TrendNumber.vue';
  interface Option {
    title: string;
    icon: string;
    dataList: {
      currentPeriod: number;
      previousPeriod: number;
    };
  }
  defineProps<Option>();
</script>

<style lang="less" scoped>
  .warpper {
    display: grid;
    justify-content: space-between;
    grid-template-columns: auto auto auto;

    .divider {
      background-color: #f2f2f2;
      width: 1px;
    }

    .left {
      .title {
        font-size: 20px;
        margin-bottom: 0.5em;

        .pic {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #81d3f8;
          border-radius: 50%;
          width: 1.2em;
          height: 1.2em;
          margin-right: 0.2em;
        }
      }

      .info {
        color: #aaaaaa;
        font-size: 16px;

        .text2 {
          font-size: 16px;
        }
      }
    }

    .right {
      display: grid;
      align-items: center;
      grid-template-rows: 1fr 1fr 1fr;
      grid-row-gap: 10px;
      color: #aaaaaa;
      font-size: 15px;

      .sign {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 1.8em;
        height: 1.8em;
        border: 1px solid #3652b0;
        border-radius: 50%;
        font-size: 13px;
        color: #3652b0;
        margin-right: 0.8em;
      }
    }
  }
</style>
