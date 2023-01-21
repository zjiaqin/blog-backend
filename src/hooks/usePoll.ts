// import { onUnmounted } from 'vue';

const defaultOptions: Options = {
  immediate: false,
  interval: 1000,
};

export function usePoll(task: Function, options = defaultOptions) {
  const opt = Object.assign(Object, defaultOptions, options) as Required<Options>;
  let timer = 0;

  // onUnmounted(() => {
  //   stop();
  // });

  /** 开始轮询 */
  const start = <Params>(params?: Params) => {
    if (timer) return;

    task(params);
    timer = window.setInterval(task, opt.interval);
  };
  /** 停止轮询 */
  const stop = () => {
    clearInterval(timer);
    timer = 0;
  };

  if (opt.immediate) {
    start();
  }

  return { start, stop };
}

interface Options {
  /** 是否立即执行 */
  immediate?: boolean;
  /** 间隔执行时间(ms) */
  interval?: number;
}
