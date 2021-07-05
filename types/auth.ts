import { RoleType } from './app/users';

export interface AuthI {
  access_token: string;
  token_type: string;
}

export interface AuthJWTI {
  exp: number;
  role: RoleType;
  sub: string;
}
