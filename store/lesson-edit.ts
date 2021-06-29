import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';
import type { OutputBlockData } from '@editorjs/editorjs';

import { showAlert } from '@/utils/network';
import { LessonsAPI } from '@/api/lessons';
import { LessonEditDetailI, LessonType } from '@/types/lessons';
import { FileI } from '@/types/common';

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

  constructor() {
    makeAutoObservable(this);
  }

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
}

export const lessonEditStore = new LessonEditStore();
export const LessonEditContext =
  createContext<LessonEditStore>(lessonEditStore);
