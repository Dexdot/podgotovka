export function onlyNumbers(value: string, allowedChars = ''): string {
  const reg = new RegExp(`[^0-9${allowedChars}]`, 'g');
  return value.trim().replace(reg, '');
}

export function numberWithSpaces(x: number): string {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
}
