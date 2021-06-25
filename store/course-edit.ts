import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';
import type { OutputBlockData } from '@editorjs/editorjs';

import { CourseEditDetailI, CourseTariffI } from '@/types/courses';
import { SubjectI } from '@/types/subjects';
import {
  LevelI,
  OptionI,
  OptionValueType,
  TariffValueType
} from '@/types/common';
import { CoursesAPI } from '@/api/courses';
import { showAlert } from '@/utils/network';
import { OPTION_TYPES } from '@/utils/consts';

const now = new Date();
now.setHours(0, 0, 0, 0);

interface LevelWithPriceI extends LevelI {
  price: number;
}

export class CourseEditStore {
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

  constructor() {
    makeAutoObservable(this);
  }

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
        showAlert({ error });
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
    }
  };

  handleCourseTariff = (tariff: CourseTariffI | null): void => {
    if (tariff) {
      if (tariff?.levels) this.setLevels(tariff.levels);
      if (tariff?.options) this.setOptions(tariff.options);
    }
  };

  // prepareData = (data: CourseEditDetailI) => {};

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
