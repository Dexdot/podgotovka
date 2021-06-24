export function qs(params: Record<string, any>): string {
  return Object.keys(params)
    .filter((key) => {
      const value = params[key];
      const hasValue = value !== undefined && value !== null;
      const notEmptyString = typeof value === 'string' ? value !== '' : true;
      return hasValue && notEmptyString;
    })
    .map((key) => {
      if (Array.isArray(params[key])) {
        const query: any[] = [];
        params[key].map((item: any) => {
          query.push(`${key}=${item}`);
          return item;
        });
        return query.join('&');
      }
      return `${key}=${params[key]}`;
    })
    .join('&');
}
