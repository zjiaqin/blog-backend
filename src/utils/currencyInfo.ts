import type { CurrencyState } from '/@/store/modules/currency';
import { useUserStore } from '/@/store/modules/user';

export function getCurrencyStorageKey(): string {
  const { getUserInfo: userInfo } = useUserStore();
  if (!userInfo || !userInfo.mch_id) return '';
  return ` PAY__MERCHANT__MCHID__${userInfo.mch_id}`;
}

export function getCurrencyCache(): CurrencyState['currency'] {
  const key = getCurrencyStorageKey();
  if (key) {
    if (!localStorage.getItem(key)) return null;
    const data = JSON.parse(localStorage.getItem(key) as string);
    data.type = JSON.parse(data.type);
    return data;
  }
  return null;
}

export function removerCurrencyCache() {
  const key = getCurrencyStorageKey();
  if (key) {
    if (localStorage.getItem(key)) localStorage.removeItem(key);
  }
}

export function setCurrencyCache(data: CurrencyState['currency']) {
  const key = getCurrencyStorageKey();
  if (key && data) {
    const dataStr = JSON.stringify({
      ...data,
      type: JSON.stringify(data.type),
    });
    localStorage.setItem(key, dataStr);
  }
}

export const currencyLogoMap = {
  USDC: 'USDC-icon.png',
  USDT: 'USDT-icon.png',
  BTC: 'BTC-icon.png',
  ETH: 'ETH-icon.png',
  BUSD: 'BUSD-icon.png',
  BNB: 'BNB-icon.png',
  TRX: 'TRX-icon.png',
  XRP: 'XRP-icon.png',
  DOGE: 'DOGE-icon.png',
  SOL: 'SOL-icon.png',
  XIN: 'XIN-icon.png',
  MATIC: 'MATIC-icon.png',
  WETH: 'WETH-icon.png',
  GALA: 'GALA-icon.png',
  AVAX: 'AVAX-icon.png',
  mAED: 'mAED-icon.png',
  AR: 'AR-icon.png',
  ATOM: 'ATOM-icon.png',
  CKB: 'CKB-icon.png',
  ZEN: 'ZEN-icon.png',
  FIL: 'FIL-icon.png',
  SHIB: 'SHIB-icon.png',
  BCH: 'BCH-icon.png',
  LTC: 'LTC-icon.png',
  ZEC: 'ZEC-icon.png',
  DOT: 'DOT-icon.png',
  UNI: 'UNI-icon.png',
  pUSD: 'pUSD-icon.png',
  EOS: 'EOS-icon.png',
  MOB: 'MOB-icon.png',
};

export type CurrencyLogoType =
  | 'USDC'
  | 'USDT'
  | 'BTC'
  | 'ETH'
  | 'BUSD'
  | 'BNB'
  | 'TRX'
  | 'XRP'
  | 'DOGE'
  | 'SOL'
  | 'XIN'
  | 'MATIC'
  | 'WETH'
  | 'GALA'
  | 'AVAX'
  | 'mAED'
  | 'AR'
  | 'ATOM'
  | 'CKB'
  | 'ZEN'
  | 'FIL'
  | 'SHIB'
  | 'BCH'
  | 'LTC'
  | 'ZEC'
  | 'DOT'
  | 'UNI'
  | 'pUSD'
  | 'EOS'
  | 'MOB';

export function getCurrencyLogo(currency: CurrencyLogoType | string): string {
  const logo = currencyLogoMap[currency];
  if (!logo) return '';
  return new URL(`../assets/images/currencylogo/${logo}`, import.meta.url).href;
}

export type CurrencyListType = {
  currency: string;
  logo: string;
  type: string[];
};

export const currencyList: CurrencyListType[] = [
  {
    currency: 'USDC',
    logo: getCurrencyLogo('USDC'),
    type: ['ERC20', 'BEP20'],
  },
  {
    currency: 'USDT',
    logo: getCurrencyLogo('USDT'),
    type: ['ERC20', 'TRC20', 'BEP20', 'Polygon'],
  },
  {
    currency: 'BTC',
    logo: getCurrencyLogo('BTC'),
    type: [],
  },
  {
    currency: 'ETH',
    logo: getCurrencyLogo('ETH'),
    type: [],
  },
  {
    currency: 'BUSD',
    logo: getCurrencyLogo('BUSD'),
    type: ['BEP20'],
  },
  {
    currency: 'BNB',
    logo: getCurrencyLogo('BNB'),
    type: ['BEP20'],
  },
  {
    currency: 'TRX',
    logo: getCurrencyLogo('TRX'),
    type: [],
  },
  {
    currency: 'XRP',
    logo: getCurrencyLogo('XRP'),
    type: [],
  },
  {
    currency: 'DOGE',
    logo: getCurrencyLogo('DOGE'),
    type: [],
  },
  {
    currency: 'SOL',
    logo: getCurrencyLogo('SOL'),
    type: [],
  },
  {
    currency: 'XIN',
    logo: getCurrencyLogo('XIN'),
    type: ['ERC20'],
  },
  {
    currency: 'MATIC',
    logo: getCurrencyLogo('MATIC'),
    type: ['Polygon'],
  },
  {
    currency: 'WETH',
    logo: getCurrencyLogo('WETH'),
    type: ['Polygon'],
  },
  {
    currency: 'GALA',
    logo: getCurrencyLogo('GALA'),
    type: ['ERC20'],
  },
  {
    currency: 'AVAX',
    logo: getCurrencyLogo('AVAX'),
    type: [],
  },
  {
    currency: 'mAED',
    logo: getCurrencyLogo('mAED'),
    type: ['ERC20'],
  },
  {
    currency: 'AR',
    logo: getCurrencyLogo('AR'),
    type: [],
  },
  {
    currency: 'ATOM',
    logo: getCurrencyLogo('ATOM'),
    type: [],
  },
  {
    currency: 'CKB',
    logo: getCurrencyLogo('CKB'),
    type: [],
  },
  {
    currency: 'ZEN',
    logo: getCurrencyLogo('ZEN'),
    type: [],
  },
  {
    currency: 'FIL',
    logo: getCurrencyLogo('FIL'),
    type: [],
  },
  {
    currency: 'SHIB',
    logo: getCurrencyLogo('SHIB'),
    type: ['ERC20'],
  },
  {
    currency: 'BCH',
    logo: getCurrencyLogo('BCH'),
    type: [],
  },
  {
    currency: 'LTC',
    logo: getCurrencyLogo('LTC'),
    type: [],
  },
  {
    currency: 'ZEC',
    logo: getCurrencyLogo('ZEC'),
    type: [],
  },
  {
    currency: 'DOT',
    logo: getCurrencyLogo('DOT'),
    type: [],
  },
  {
    currency: 'UNI',
    logo: getCurrencyLogo('UNI'),
    type: ['ERC20'],
  },
  {
    currency: 'pUSD',
    logo: getCurrencyLogo('pUSD'),
    type: ['ERC20'],
  },
  {
    currency: 'EOS',
    logo: getCurrencyLogo('EOS'),
    type: [],
  },
  {
    currency: 'MOB',
    logo: getCurrencyLogo('MOB'),
    type: [],
  },
];
