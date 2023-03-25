import { ref, onMounted, onUnmounted, Ref } from 'vue';
import { useThrottleFn } from '@vueuse/core';

interface UseInfiniteScrollOptions {
  isLoading: Ref<boolean>;
}

export const useInfiniteScroll = (
  fn: () => Promise<any>,
  el: HTMLElement,
  options?: UseInfiniteScrollOptions,
) => {
  const isLoading = options?.isLoading ?? ref(false);

  const scrollHandler = (event: Event) => {
    const target = (event.target as HTMLElement) ?? el;
    if (isLoading.value) return;
    const { scrollHeight, scrollTop, clientHeight } = target;

    if (scrollHeight - scrollTop - clientHeight <= 0) {
      isLoading.value = true;
      fn().then((res) => {
        isLoading.value = false;
        res.hasNextPage && setTimeout(() => scrollHandler(new Event('scroll')), 200);
      });
    }
  };

  const throttledFn = useThrottleFn((event: Event) => {
    scrollHandler(event);
  }, 400);

  el.addEventListener('scroll', throttledFn);

  onMounted(() => {
    setTimeout(() => scrollHandler(new Event('scroll')), 200);
  });

  const remove = () => {
    el.removeEventListener('scroll', throttledFn);
  };

  onUnmounted(() => {
    remove();
  });

  return {
    remove,
    scrollHandler,
  };
};
