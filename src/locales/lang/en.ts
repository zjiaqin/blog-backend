import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/en_US';

const modules = import.meta.globEager('./en/**/*.ts');
const josnModules = import.meta.globEager('./en/**/*.json');

export default {
  message: {
    ...genMessage({ ...modules, ...josnModules }, 'en'),
    antdLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
