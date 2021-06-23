const isDevBuild = process.env.BUILD_ENV === 'development';

export const COLORS = {
  primary: '#4949d3'
};

export const API_BASE = isDevBuild
  ? 'https://devapi.podgotovka.ru'
  : 'https://api.podgotovka.ru';

export const AUTH_NAME = 'podgotovka-auth';

export const DOMAINS = {
  school: isDevBuild ? 'devschool' : 'school',
  admin: isDevBuild ? 'devadmin' : 'admin'
};
