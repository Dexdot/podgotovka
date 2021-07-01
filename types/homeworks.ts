import { OutputBlockData } from '@editorjs/editorjs';

// Detail
export type HWAnswerType = 'text' | 'file' | 'audio' | 'text_with_file';

export interface HWTestQuestionBaseI {
  id: number;
  name: string;
  description: string;
  text?: string;
  // Only frontend
  descriptionBlocks: OutputBlockData[];
  textBlocks: OutputBlockData[];
  weight: number;
  only_full_match: boolean;
  right_answer_text: string;
}

export interface HWTestQuestionI extends HWTestQuestionBaseI {
  parent_question_id: number;
}

export interface HWSimpleQuestionI {
  id: number;
  name: string;
  description: string;
  text?: string;
  type: HWAnswerType;
}

export interface HWPartI {
  id: number;
  timer: number;
}

export interface HWPartOneI extends HWPartI {
  questions: HWTestQuestionI[];
}

export interface HWPartTwoI extends HWPartI {
  questions: HWSimpleQuestionI[];
}

export interface HWEditDetailI {
  id: number;
  lesson_id: number;
  deadline: number;
  part_one: HWPartOneI;
  part_two: HWPartTwoI;
}

// Update
export interface HWUpdateTestQuestionI extends HWTestQuestionBaseI {
  relation_questions?: HWTestQuestionBaseI[];
}

export interface UpdateHWI {
  deadline: number;
  part_one: {
    timer: number;
    questions: HWUpdateTestQuestionI[];
  };
  part_two: {
    timer: number;
    questions: HWSimpleQuestionI[];
  };
}
