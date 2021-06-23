type CookieOptions = {
  'max-age'?: number;
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
};

type CookieOptionsKey = keyof CookieOptions;

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const allOptions: CookieOptions = {
    path: '/',
    ...options
  };

  if (allOptions.expires instanceof Date) {
    allOptions.expires = allOptions.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}`;

  const optionsKeys = Object.keys(allOptions) as CookieOptionsKey[];
  optionsKeys.forEach((optionKey) => {
    updatedCookie += `; ${optionKey}`;
    const optionValue = allOptions[optionKey];

    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  });

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string, options: CookieOptions): void {
  setCookie(name, '', {
    'max-age': -1,
    ...options
  });
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      // eslint-disable-next-line no-useless-escape
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    )
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}
