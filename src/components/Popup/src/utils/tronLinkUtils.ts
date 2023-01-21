import { createVNode, render, VNode } from 'vue';
import TronLinkPopup from '../components/TronLinkPopup.vue';
import { TronLinkPopupProps } from '../types';

// 创建VNode跟容器
function createVnodeFunc<T>(
  props: T,
  options: { dom: any; domId: string },
): { container: HTMLDivElement; vnode: VNode } {
  const container = document.createElement('div');
  container.id = options.domId;
  const vnode = createVNode(options.dom, props as any);
  return {
    container,
    vnode,
  };
}

// 渲染VNode
const renderVnodeFunc = (vnode: VNode, container: HTMLDivElement): void => {
  domInstance = vnode;
  render(vnode, container);
  document.body.appendChild(container);
};

function handleVnode<T>(isOpen: boolean, cancelCallback?: Function) {
  if (domInstance) {
    const domVue = domInstance.component;
    domVue.proxy[isOpen ? 'open' : 'close']();
  } else {
    const props: any = { modelValue: isOpen };
    if (isOpen) props.cancelCallback = cancelCallback;
    const { vnode, container } = createVnodeFunc<T>(props, {
      dom: TronLinkPopup,
      domId: 'tronLink-popup',
    });
    renderVnodeFunc(vnode, container);
  }
}

// 记录渲染的VNode元素
let domInstance: any;

type OpenTronLinkFuncType = TronLinkPopupProps & {
  modelValue: true;
};
/**
 * @description: 打开钱包弹窗函数
 * @params cancelCallback 关闭弹窗时的回调函数
 */
const openTronPopup = (cancelCallback?: Function): void => {
  handleVnode<OpenTronLinkFuncType>(true, cancelCallback);
};

type CloseTronLinkFuncType = TronLinkPopupProps & {
  modelValue: false;
};
/**
 * @description: 关闭钱包弹窗函数
 */
const closeTronPopup = (): void => {
  handleVnode<CloseTronLinkFuncType>(false);
};

TronLinkPopup.open = openTronPopup;
TronLinkPopup.close = closeTronPopup;

export { TronLinkPopup, openTronPopup, closeTronPopup };
