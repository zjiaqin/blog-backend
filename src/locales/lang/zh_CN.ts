import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/zh_CN';

const modules = import.meta.globEager('./zh-CN/**/*.ts');
const josnModules = import.meta.globEager('./zh-CN/**/*.json');
export default {
  message: {
    ...genMessage({ ...modules, ...josnModules }, 'zh-CN'),
    antdLocale,
  },
};
