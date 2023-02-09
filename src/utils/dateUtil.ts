/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function formatToDate(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_FORMAT,
): string {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;

export const dataToZhCN = (DateStr) => {
  const DATE = new Date(DateStr);
  const year = DATE.getFullYear() + '年';
  const month = DATE.getMonth() + 1 + '月';
  const date = DATE.getDate() + '日';
  return year + month + date;
};
