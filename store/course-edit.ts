import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';
import type { OutputBlockData } from '@editorjs/editorjs';

import {
  CourseEditDetailI,
  CourseTariffI,
  UpdateCourseDataI,
  UpdateCourseTariffI
} from '@/types/courses';
import { SubjectI } from '@/types/subjects';
import {
  LevelI,
  OptionI,
  OptionValueType,
  TariffValueType
} from '@/types/common';
import { CoursesAPI } from '@/api/app/courses';
import { showAlert } from '@/utils/network';

const ONE_LEVEL_ID = -1;
const now = new Date();
now.setHours(0, 0, 0, 0);

interface LevelWithPriceI extends LevelI {
  price: number;
}

export class CourseEditStore {
  public isLoading = false;

  public courseData: CourseEditDetailI | undefined;

  public subject: SubjectI | undefined;

  public name = '';

  public description: OutputBlockData[] = [];

  public dateStart = now;

  public dateFinish = now;

  public levels: LevelI[] | undefined;

  public levelsWithPrice: LevelWithPriceI[] | undefined;

  public options: OptionI[] = [];

  public values: TariffValueType[] = [];

  public countTestQuestions = 0;

  constructor() {
    makeAutoObservable(this);
  }

  saveCourseTariff = (courseID: number): void => {
    const { tariff } = this.prepareData();

    CoursesAPI.updateCourseTariff(courseID, tariff).then(
      action('fetchSuccess', ({ data }) => {
        this.handleCourseTariff(data);
        this.isLoading = false;
      }),
      action('fetchError', (error) => {
        this.isLoading = false;
        const notFound = error?.response?.status === 404;
        if (!notFound) showAlert({ error });
      })
    );
  };

  saveCourse = (courseID: number): void => {
    const { course } = this.prepareData();

    this.isLoading = true;

    CoursesAPI.updateCourse(courseID, course).then(
      action('fetchSuccess', ({ data }) => {
        this.handleCourseData(data);
        this.saveCourseTariff(courseID);
      }),
      action('fetchError', (error) => {
        this.isLoading = false;
        showAlert({ error });
      })
    );
  };

  fetchCourse = (courseID: number): void => {
    CoursesAPI.getCourseDetail(courseID).then(
      action('fetchSuccess', ({ data }) => {
        this.handleCourseData(data);
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );

    CoursesAPI.getCourseTariff(courseID).then(
      action('fetchSuccess', ({ data }) => {
        this.handleCourseTariff(data);
      }),
      action('fetchError', (error) => {
        const notFound = error?.response?.status === 404;
        if (!notFound) showAlert({ error });
      })
    );
  };

  handleCourseData = (data: CourseEditDetailI): void => {
    if (data) {
      this.courseData = data;
      this.setSubject(data.subject);
      this.setName(data.name || '');
      this.setDescription(data.description ? JSON.parse(data.description) : []);
      this.setDateStart(
        data.time_start ? new Date(data.time_start * 1000) : now
      );
      this.setDateFinish(
        data.time_finish ? new Date(data.time_finish * 1000) : now
      );
      this.setCountTestQuestions(data.count_test_questions || 0);
    }
  };

  handleCourseTariff = (tariff: CourseTariffI | null): void => {
    if (tariff) {
      if (tariff?.options) this.setOptions(tariff.options);
      if (tariff?.values) this.setValues(tariff.values);

      if (tariff?.levels) {
        this.setLevels(tariff.levels);

        if (tariff?.level_prices) {
          const prices = tariff?.level_prices;

          const levelsWithPrice: LevelWithPriceI[] = tariff.levels.map((l) => {
            const lvl = prices.find((lv) => lv.level_id === l.id);
            const price = lvl ? lvl.price : 0;
            return { ...l, price };
          });
          this.setLevelsWithPrice(levelsWithPrice);
        }
      }
    }
  };

  prepareData = (): {
    course: UpdateCourseDataI;
    tariff: UpdateCourseTariffI;
  } => {
    // Course
    const course: UpdateCourseDataI = {
      name: this.name || '',
      description: this.description ? JSON.stringify(this.description) : '',
      time_start: this.dateStart.getTime() / 1000,
      time_finish: this.dateFinish.getTime() / 1000,
      count_test_questions: this.countTestQuestions
    };

    if (this.subject) {
      course.subject_id = this.subject.id;
    }

    // Tariff
    const levelsWithPrice = this.levelsWithPrice || [];
    const isOneLevel = levelsWithPrice.length === 1;
    const levelsIDs = levelsWithPrice.map((l) => l.id);
    const level_prices = levelsWithPrice.map(({ id, price }) => ({
      level_id: isOneLevel ? ONE_LEVEL_ID : id,
      price
    }));
    const values = this.values
      .filter((v) => levelsIDs.includes(v.level_id))
      .map((v) => ({ ...v, level_id: isOneLevel ? ONE_LEVEL_ID : v.level_id }));
    const options_order = this.options.map((o) => o.id);

    const tariff: UpdateCourseTariffI = {
      level_prices,
      values,
      options_order
    };

    return { course, tariff };
  };

  setSubject = (v: SubjectI): void => {
    this.subject = v;
  };

  setName = (v: string): void => {
    this.name = v;
  };

  setDescription = (v: OutputBlockData[]): void => {
    this.description = [...v];
  };

  setDateStart = (v: Date): void => {
    this.dateStart = v;
  };

  setDateFinish = (v: Date): void => {
    this.dateFinish = v;
  };

  setCountTestQuestions = (v: number): void => {
    this.countTestQuestions = v;
  };

  setLevels = (v: LevelI[]): void => {
    this.levels = [...v];
  };

  setLevelsWithPrice = (v: LevelWithPriceI[]): void => {
    this.levelsWithPrice = [...v];
  };

  setLevelPrice = (level_id: number, v: string): void => {
    if (this.levelsWithPrice) {
      const levels = [...this.levelsWithPrice];
      const levelIndex = levels.findIndex((l) => l.id === level_id);

      if (levelIndex !== -1) {
        this.levelsWithPrice[levelIndex].price = Number(v);
      }
    }
  };

  setOptions = (v: OptionI[]): void => {
    this.options = [...v];
  };

  addOption = (option: OptionI): void => {
    this.options = [...this.options, option];

    if (this.levelsWithPrice) {
      const levelsIDs = this.levelsWithPrice.map((l) => l.id);
      let value: OptionValueType = '';

      if (option.type === 'numeric') {
        value = 0;
      }

      if (option.type === 'boolean') {
        value = false;
      }

      const newValues: TariffValueType[] = levelsIDs.map((level_id) => {
        return { level_id, option_id: option.id, value };
      });
      this.addValues(newValues);
    }
  };

  removeOption = (optionID: number): void => {
    this.options = [...this.options.filter((o) => o.id !== optionID)];
    this.values = [...this.values.filter((v) => v.option_id !== optionID)];
  };

  setValues = (v: TariffValueType[]): void => {
    this.values = [...v];
  };

  addValues = (v: TariffValueType[]): void => {
    this.values = [...this.values, ...v];
  };

  setOptionValue = (
    fieldValue: OptionValueType,
    value: TariffValueType
  ): void => {
    const index = this.values.findIndex(
      (v) => v.level_id === value.level_id && v.option_id === value.option_id
    );

    if (index !== -1) {
      this.values[index].value = fieldValue;
    }
  };
}

export const courseEditStore = new CourseEditStore();
export const CourseEditContext =
  createContext<CourseEditStore>(courseEditStore);
