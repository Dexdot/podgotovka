import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';
import type { OutputBlockData } from '@editorjs/editorjs';

import { HWEditDetailI, HWUpdateTestQuestionI } from '@/types/homeworks';
import { showAlert } from '@/utils/network';
import { HomeworksAPI } from '@/api/homeworks';
import { getEmptyTestQuestions } from '@/components/LessonEdit/Homework/helpers';

const now = new Date();
now.setHours(0, 0, 0, 0);

export class HWEditStore {
  public isLoading = false;

  public hwData: HWEditDetailI | undefined;

  public lessonID = -1;

  public deadline = now;

  // Part one
  public countTestQuestions = 0;

  public timeOne = 3600;

  public questionsOne: HWUpdateTestQuestionI[] = [];

  public selectedQuestionOne = 0;

  // Part two
  public timeTwo = 3600;

  constructor(lessonID: number) {
    makeAutoObservable(this);
    this.lessonID = lessonID;
  }

  fetchHW = (): void => {
    HomeworksAPI.getHWDetail(this.lessonID).then(
      action('fetchSuccess', ({ data }) => {
        this.handleData(data);
      }),
      action('fetchError', (error) => {
        const notFound = error?.response?.status === 404;

        if (notFound) {
          this.setQuestionsOne(getEmptyTestQuestions(this.countTestQuestions));
        } else {
          showAlert({ error });
        }
      })
    );
  };

  handleData = (data: HWEditDetailI): void => {
    if (data) {
      this.hwData = data;
      this.lessonID = data.lesson_id;
      // TODO: Handle parts
    }
  };

  setDeadline = (v: Date): void => {
    this.deadline = v;
  };

  // Part one
  setCountTestQuestions = (v: number): void => {
    this.countTestQuestions = v;
  };

  setTimeOne = (v: number): void => {
    this.timeOne = v * 60;
  };

  setQuestionsOne = (v: HWUpdateTestQuestionI[]): void => {
    this.questionsOne = [...v];
  };

  selectQuestionOne = (v: number): void => {
    this.selectedQuestionOne = v;
  };

  setQuestionNameOne = (id: number, name: string): void => {
    const question = this.questionsOne.find((q) => q.id === id);
    if (question) {
      question.name = name;
    }
  };

  // Part two
  setTimeTwo = (v: number): void => {
    this.timeTwo = v * 60;
  };
}

export const hwEditStore = new HWEditStore(-1);
export const HWEditContext = createContext<HWEditStore>(hwEditStore);
