export function onlyNumbers(value: string, allowedChars = ''): string {
  const reg = new RegExp(`[^0-9${allowedChars}]`, 'g');
  return value.trim().replace(reg, '');
}
