import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import type { App, Plugin } from 'vue';

import { unref } from 'vue';
import { isObject } from '/@/utils/is';

export const noop = () => {};

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

export const toMoneyString = (val: number): any => {
  if (!val) return val;
  const str = val + '';
  if (str.indexOf('.') > -1) {
    const decimalDigits: number = str.substring(str.indexOf('.'), str.length).length - 1;
    if (decimalDigits > 3) {
      let newStr = str;
      if (decimalDigits > 6) {
        newStr = val.toFixed(6) + '';
      }
      const res = newStr.replace(/\d+/, function (n) {
        return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
          return $1 + ',';
        });
      });
      return res;
    } else {
      return val.toLocaleString();
    }
  } else {
    return val.toLocaleString();
  }
};

export function desensitization(str: string | undefined) {
  const len = str?.length;
  if (len === 0) {
    return str;
  }
  const head = str?.substr(0, 6);
  const tail = str?.substr((len as number) - 6);
  const res = head + '****' + tail;

  return res;
}

export const filterInputNumber = (e: any, type = 'float'): string | number | any => {
  let val = typeof e !== 'string' ? e + '' : e;
  val = val.replace(/(^\s*)|(\s*$)/g, '');
  if (val !== '') {
    const cases = val.indexOf('0') == 0 && val.length > 1 && val.indexOf('.') !== 1;
    const reg = type == 'int' ? /[^\d]/g : /[^\d.]/g;
    val = val.replace(reg, '');
    if (cases) {
      return typeof e == 'number' ? 0 : '0';
    }
    if (type == 'int') {
      val = val.indexOf('0') == 0 && val.length > 1 ? val.substring(0, val.length - 1) : val;
    } else {
      if (val.indexOf('.') == 0) {
        val = '';
        val = val.replace(/[^$#$]/g, '0.');
        val = val.replace(/\.{6,}/g, '.');
      } else if (!/^(\d?)+(\.\d{0,6})?$/.test(val)) {
        val = val.substring(0, val.length - 1);
      }
    }
  }
  return val && typeof e == 'number' ? Number(val) : val;
};
