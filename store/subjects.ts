import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';

import { RequestCreateI, RequestUpdateI, SubjectI } from '@/types/subjects';
import {
  fetchAllSubjects,
  createSubject,
  fetchSubjectDetail,
  updateSubject
} from '@/api/common/subject';
import { showAlert } from '@/utils/network';

export class SubjectsStore {
  public subjects: SubjectI[] = [];

  public subjectItem: SubjectI | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getSubjects = (): void => {
    fetchAllSubjects().then(
      action('fetchSuccess', ({ data }) => {
        this.subjects = data;
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  createSubject = (item: RequestCreateI): Promise<SubjectI> => {
    return new Promise<SubjectI>((resolve, reject) => {
      createSubject(item).then(
        action('fetchSuccess', ({ data }) => {
          this.subjects.push(data);
          resolve(data);
        }),
        action('fetchError', (error) => {
          showAlert({ error });
          reject();
        })
      );
    });
  };

  getSubjectDetail = (id: number): void => {
    fetchSubjectDetail(id).then(
      action('fetchSuccess', ({ data }) => {
        this.subjectItem = data;
      }),
      action('fetchError', (error) => {
        showAlert(error);
      })
    );
  };

  updateSubject = (item: RequestUpdateI): void => {
    updateSubject(item).then(
      action('fetchSuccess', ({ data }) => {
        this.subjects = this.subjects.map((el) => {
          if (el.id === data.id) {
            return data;
          }
          return el;
        });
      }),
      action('fetchError', (error) => {
        showAlert(error);
      })
    );
  };
}

export const subjectsStore = new SubjectsStore();
export const SubjectContext = createContext<SubjectsStore>(subjectsStore);
