import { ref, onMounted } from 'vue';
import type { App, DirectiveBinding, ObjectDirective } from 'vue';

interface InfiniteScrollElement extends HTMLElement {
  _scrollHandler?: () => void;
}

const InfiniteScroll: ObjectDirective = {
  mounted(el: InfiniteScrollElement, binding: DirectiveBinding<() => Promise<void>>) {
    const isLoading = ref(false);
    const scrollHandler = () => {
      if (isLoading.value) return; // 防止重复请求
      const { scrollHeight, scrollTop, clientHeight } = el;
      console.log(scrollHeight, scrollTop, clientHeight);

      if (scrollHeight - scrollTop - clientHeight <= 0) {
        isLoading.value = true;
        binding.value().then(() => {
          isLoading.value = false;
        });
      }
    };
    el._scrollHandler = scrollHandler;
    el.addEventListener('scroll', scrollHandler);
    onMounted(() => {
      // 页面初次渲染时可能已经滚动到底部，需要主动调用一次 scrollHandler
      setTimeout(scrollHandler, 0);
    });
  },
  unmounted(el: InfiniteScrollElement) {
    el.removeEventListener('scroll', el._scrollHandler!);
    delete el._scrollHandler;
  },
};

export function setupInfinniteScroollDirective(app: App) {
  app.directive('infinite-scroll', InfiniteScroll);
}

export default InfiniteScroll;
