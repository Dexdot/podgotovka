import { createContext } from 'react';
import { action, makeAutoObservable, runInAction } from 'mobx';
import type { OutputBlockData } from '@editorjs/editorjs';

import { showAlert } from '@/utils/network';
import { LessonsAPI } from '@/api/app/lessons';
import { LessonEditDetailI, LessonType, UpdateLessonI } from '@/types/lessons';
import { FileI } from '@/types/common';
import { HWEditStore } from '@/store/homework-edit';

const now = new Date();
now.setHours(0, 0, 0, 0);

export class LessonEditStore {
  public isLoading = false;

  public lessonData: LessonEditDetailI | undefined;

  public name = '';

  public description: OutputBlockData[] = [];

  public dateStart = now;

  public type: LessonType | undefined;

  public youtubeLink = '';

  public courseID = -1;

  public files: FileI[] = [];

  public timecode = '';

  public homeworkStore: HWEditStore | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  prepareData = (): UpdateLessonI => {
    const type = this.type as LessonType;

    const data: UpdateLessonI = {
      name: this.name,
      type,
      time_start: this.dateStart.getTime() / 1000,
      description: JSON.stringify(this.description),
      youtube_link: this.youtubeLink,
      files: this.files,
      time_codes: this.timecode
    };

    return data;
  };

  saveLesson = async (lessonID: number): Promise<void> => {
    this.isLoading = true;

    if (this.homeworkStore && this.homeworkStore.isValid) {
      try {
        await this.homeworkStore.saveHW();
      } catch (error) {
        this.isLoading = false;
      }
    }

    runInAction(() => {
      const lessonData = this.prepareData();

      LessonsAPI.updateLesson(lessonID, lessonData).then(
        action('fetchSuccess', ({ data }) => {
          this.handleLessonData(data);
          this.isLoading = false;
        }),
        action('fetchError', (error) => {
          showAlert({ error });
          this.isLoading = false;
        })
      );
    });
  };

  fetchLesson = (lessonID: number): void => {
    LessonsAPI.getLessonEditDetail(lessonID).then(
      action('fetchSuccess', ({ data }) => {
        this.handleLessonData(data);
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  handleLessonData = (data: LessonEditDetailI): void => {
    if (data) {
      this.lessonData = data;
      this.setName(data.name || '');
      this.setDescription(data.description ? JSON.parse(data.description) : []);
      this.setDateStart(
        data.time_start ? new Date(data.time_start * 1000) : now
      );
      this.setType(data.type);
      this.setYoutubeLink(data.youtube_link || '');
      this.setCourseID(data.course_id);
      this.setFiles(data.files || []);
      this.setTimecode(data.time_codes || '');
    }
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

  setType = (v: LessonType): void => {
    this.type = v;
  };

  setYoutubeLink = (v: string): void => {
    this.youtubeLink = v;
  };

  setCourseID = (v: number): void => {
    this.courseID = v;
  };

  setFiles = (v: FileI[]): void => {
    this.files = [...v];
  };

  addFile = (v: FileI): void => {
    this.files = [...this.files, v];
  };

  removeFile = (v: FileI): void => {
    this.files = [...this.files.filter((f) => f.file_link !== v.file_link)];
  };

  setTimecode = (v: string): void => {
    this.timecode = v;
  };

  // Homework store
  setHomeworkStore = (v: HWEditStore): void => {
    this.homeworkStore = v;
  };
}

export const lessonEditStore = new LessonEditStore();
export const LessonEditContext =
  createContext<LessonEditStore>(lessonEditStore);
