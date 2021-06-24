/* eslint-disable import/no-duplicates */

import ru from 'date-fns/locale/ru';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import differenceInSeconds from 'date-fns/differenceInSeconds';

const options = { locale: ru };

export function getDDMMYY(d: Date): string {
  return format(d, 'P', options);
}

export function getDateText(d: Date): string {
  const day = format(d, 'd', options);
  const month = format(d, 'MMMM', options);

  const result = `${day} ${month}`;
  return result;
}

export function toHHMM(d: Date): string {
  const hh = format(d, 'HH', options);
  const mm = format(d, 'mm', options);
  const result = `${hh}:${mm}`;
  return result;
}

export function groupByDay(
  items: any[],
  dateKeyName: string
): Record<string, any[]> {
  const res: Record<string, number[]> = {};

  items.forEach((item) => {
    const d = new Date(item[dateKeyName] * 1000);
    const key = getDDMMYY(d);

    const split = key.split('.');
    const keyDate = new Date(
      Number(split[2]),
      Number(split[1]) - 1,
      Number(split[0])
    );

    if (!(key in res)) {
      res[key] = [item];
    } else if (isSameDay(d, keyDate)) {
      res[key].push(item);
    }
  });

  return res;
}

export function getDiffInSeconds(a: Date, b: Date): number {
  return differenceInSeconds(a, b);
}
