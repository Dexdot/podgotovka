import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';
import type { OutputBlockData } from '@editorjs/editorjs';

import { HWEditDetailI, HWUpdateTestQuestionI } from '@/types/homeworks';
import { showAlert } from '@/utils/network';
import { HomeworksAPI } from '@/api/homeworks';
import {
  getEmptyTestQuestions,
  isQuestionOneValid
} from '@/components/LessonEdit/Homework/helpers';

const now = new Date();
now.setHours(0, 0, 0, 0);

export class HWEditStore {
  public isLoading = false;

  public hwData: HWEditDetailI | undefined;

  public lessonID = -1;

  public deadline = now;

  // -- START Part 1 --
  public countTestQuestions = 0;

  public timeOne = 3600;

  public questionsOne: HWUpdateTestQuestionI[] = [];

  public selectedQuestionIDOne = 0;
  // -- END Part 1 --

  // -- START Part 2 --
  public timeTwo = 3600;
  // -- END Part 2 --

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

  // -- START Part 1 --
  get invalidQuestionsOne(): number[] {
    const invalidQuestions = this.questionsOne.filter(
      (q) => !isQuestionOneValid(q)
    );
    return invalidQuestions.map((q) => q.id);
  }

  get selectedQuestionOne(): HWUpdateTestQuestionI | undefined {
    return this.questionsOne.find((q) => q.id === this.selectedQuestionIDOne);
  }

  setCountTestQuestions = (v: number): void => {
    this.countTestQuestions = v;

    if (!this.hwData || !this.countTestQuestions) {
      this.setQuestionsOne(getEmptyTestQuestions(this.countTestQuestions));
    }
  };

  setTimeOne = (v: number): void => {
    this.timeOne = v * 60;
  };

  setQuestionsOne = (v: HWUpdateTestQuestionI[]): void => {
    this.questionsOne = [...v];
  };

  selectQuestionOne = (v: number): void => {
    this.selectedQuestionIDOne = v;
  };

  setQuestionNameOne = (id: number, v: string): void => {
    const question = this.questionsOne.find((q) => q.id === id);
    if (question) {
      question.name = v;
    }
  };

  setDescriptionBlocksOne = (id: number, v: OutputBlockData[]): void => {
    const question = this.questionsOne.find((q) => q.id === id);
    if (question) {
      question.descriptionBlocks = [...v];
    }
  };

  setTextBlocksOne = (id: number, v: OutputBlockData[]): void => {
    const question = this.questionsOne.find((q) => q.id === id);
    if (question) {
      question.textBlocks = [...v];
    }
  };

  setQuestionFullMatchOne = (id: number, v: boolean): void => {
    const question = this.questionsOne.find((q) => q.id === id);
    if (question) {
      question.only_full_match = v;
    }
  };

  setQuestionAnswerOne = (id: number, v: string): void => {
    const question = this.questionsOne.find((q) => q.id === id);
    if (question) {
      question.right_answer_text = v;
    }
  };

  setQuestionWeightOne = (id: number, v: number): void => {
    const question = this.questionsOne.find((q) => q.id === id);
    if (question) {
      question.weight = v;
    }
  };

  addRelationID = (parentID: number, relationID: number): void => {
    const question = this.questionsOne.find((q) => q.id === parentID);

    if (question) {
      const ids = question.relation_ids || [];
      question.relation_ids = [...ids, relationID];
    }
  };

  removeRelationID = (parentID: number, relationID: number): void => {
    const question = this.questionsOne.find((q) => q.id === parentID);

    if (question) {
      const ids = question.relation_ids || [];
      const filtered = ids.filter((v) => v !== relationID);
      question.relation_ids = [...filtered];
    }
  };

  // -- END Part 1 --

  // -- START Part 1 --
  setTimeTwo = (v: number): void => {
    this.timeTwo = v * 60;
  };
  // -- END Part 2 --
}

export const hwEditStore = new HWEditStore(-1);
export const HWEditContext = createContext<HWEditStore>(hwEditStore);
