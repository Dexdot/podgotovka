export function onlyNumbers(value: string, allowedChars = ''): string {
  const reg = new RegExp(`[^0-9${allowedChars}]`, 'g');
  return value.trim().replace(reg, '');
}

export function numberWithSpaces(x: number): string {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
}

export function bytesToSize(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 байтов';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['байтов', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'ЭБ', 'ЗБ', 'ЙБ'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}
