import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';
import type { OutputBlockData } from '@editorjs/editorjs';

import {
  HWEditDetailI,
  HWUpdateTestQuestionI,
  UpdateHWI
} from '@/types/homeworks';
import { showAlert } from '@/utils/network';
import { HomeworksAPI } from '@/api/homeworks';
import {
  getEmptyTestQuestions,
  isQuestionOneValid,
  mapTestQuestions
} from '@/components/LessonEdit/Homework/helpers';

const now = new Date();
now.setHours(0, 0, 0, 0);
const defaultTimer = 3600;

export class HWEditStore {
  public isLoading = false;

  public isHWExists = true;

  public hwData: HWEditDetailI | undefined;

  public lessonID = -1;

  public deadline = now;

  // -- START Part 1 --
  public countTestQuestions = 0;

  public timeOne = defaultTimer;

  public questionsOne: HWUpdateTestQuestionI[] = [];

  public selectedQuestionIDOne = 0;
  // -- END Part 1 --

  // -- START Part 2 --
  public timeTwo = defaultTimer;
  // -- END Part 2 --

  constructor(lessonID: number) {
    makeAutoObservable(this);
    this.lessonID = lessonID;
  }

  fetchHW = (): void => {
    HomeworksAPI.getHWDetail(this.lessonID).then(
      action('fetchSuccess', ({ data }) => {
        this.handleData(data);
        this.isHWExists = true;
      }),
      action('fetchError', (error) => {
        const notFound = error?.response?.status === 404;

        if (notFound) {
          this.isHWExists = false;
          this.setQuestionsOne(getEmptyTestQuestions(this.countTestQuestions));
        } else {
          showAlert({ error });
        }
      })
    );
  };

  saveHW = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;

      const hwData = this.prepareData();

      const fn = this.isHWExists
        ? HomeworksAPI.updateHW
        : HomeworksAPI.createHW;

      fn(this.lessonID, hwData).then(
        action('fetchSuccess', ({ data }) => {
          this.handleData(data);

          this.isHWExists = true;
          this.isLoading = false;
          resolve();
        }),
        action('fetchError', (error) => {
          const notFound = error?.response?.status === 404;

          if (notFound) {
            this.isHWExists = false;
            this.setQuestionsOne(
              getEmptyTestQuestions(this.countTestQuestions)
            );
          } else {
            showAlert({ error });
          }

          this.isLoading = false;
          reject();
        })
      );
    });
  };

  handleData = (data: HWEditDetailI): void => {
    if (data) {
      this.hwData = data;
      this.lessonID = data.lesson_id;

      if (data.deadline) {
        const d = new Date(data.deadline * 1000);
        this.setDeadline(d);
      }

      // Part one
      if (data.part_one) {
        const HW = data.part_one;
        this.timeOne = HW.timer || defaultTimer;

        if (HW.questions && HW.questions.length > 0) {
          this.setQuestionsOne(mapTestQuestions(HW.questions));
        } else {
          this.setQuestionsOne(getEmptyTestQuestions(this.countTestQuestions));
        }
      }
    }
  };

  prepareData = (): UpdateHWI => {
    return {
      deadline: this.deadline.getTime() / 1000,
      part_one: this.preparePartOne(),
      part_two: undefined
    };
  };

  setDeadline = (v: Date): void => {
    this.deadline = v;
  };

  get isValid(): boolean {
    return this.isPartOneValid;
  }

  // -- START Part 1 --
  preparePartOne = (): UpdateHWI['part_one'] => {
    return {
      timer: this.timeOne,
      questions: this.questionsOne.map((q) => {
        const {
          id,
          name,
          weight,
          only_full_match,
          right_answer_text,
          textBlocks,
          descriptionBlocks,
          relationIDs
        } = q;

        const ids = relationIDs || [];
        const relation_questions = this.questionsOne.filter((q) =>
          ids.includes(q.id)
        );

        return {
          id,
          name,
          weight,
          relation_questions,
          only_full_match,
          right_answer_text,
          text: JSON.stringify(textBlocks),
          description: JSON.stringify(descriptionBlocks),
          // Only frontend
          textBlocks: [],
          descriptionBlocks: []
        };
      })
    };
  };

  get invalidQuestionsOne(): number[] {
    const invalidQuestions = this.questionsOne.filter(
      (q) => !isQuestionOneValid(q)
    );
    return invalidQuestions.map((q) => q.id);
  }

  get isPartOneValid(): boolean {
    return this.invalidQuestionsOne.length <= 0;
  }

  get selectedQuestionOne(): HWUpdateTestQuestionI | undefined {
    return this.questionsOne.find((q) => q.id === this.selectedQuestionIDOne);
  }

  get allRelationQuestionsIDs(): number[] {
    const arr: number[] = [];

    this.questionsOne.forEach((q) => {
      if (q.relationIDs && q.relationIDs.length > 0) {
        q.relationIDs.forEach((id) => {
          arr.push(id);
        });
      }
    });

    return arr;
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
      const ids = question.relationIDs || [];
      question.relationIDs = [...ids, relationID];
    }
  };

  removeRelationID = (parentID: number, relationID: number): void => {
    const question = this.questionsOne.find((q) => q.id === parentID);

    if (question) {
      const ids = question.relationIDs || [];
      const filtered = ids.filter((v) => v !== relationID);
      question.relationIDs = [...filtered];
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
