import { DirectionType } from './common';

export interface SubjectI {
  id: number;
  name: string;
  color: string;
  direction: DirectionType;
}

export interface RequestCreateI {
  name: string;
  color: string;
  direction: string;
}

export interface RequestUpdateI {
  id: number;
  name: string;
  color: string;
}
