import {
  HWTestQuestionBaseI,
  HWTestQuestionI,
  HWUpdateTestQuestionI
} from '@/types/homeworks';

const emptyQuestion: HWUpdateTestQuestionI = {
  id: 0,
  name: '',
  description: '',
  descriptionBlocks: [],
  textBlocks: [],
  text: '',
  weight: 1,
  only_full_match: false,
  right_answer_text: '',
  relation_questions: []
};

export const getEmptyTestQuestions = (
  count: number
): HWUpdateTestQuestionI[] => {
  const tmp = new Array(count).fill(0);
  return tmp.map((_, i) => ({ ...emptyQuestion, id: i }));
};

function findRelationQsns(
  parentID: number,
  qsns: HWTestQuestionI[]
): HWTestQuestionBaseI[] {
  const finded = qsns.filter((q) => q.parent_question_id === parentID);

  return finded.map((q) => {
    const {
      id,
      name,
      description,
      text,
      weight,
      only_full_match,
      right_answer_text
    } = q;

    return {
      id,
      name: name || '',
      description: description || '',
      text: text || '',
      descriptionBlocks: [],
      textBlocks: [],
      weight: weight || 1,
      only_full_match: !!only_full_match,
      right_answer_text: right_answer_text || ''
    };
  });
}

export function mapTestQuestions(
  qsns: HWTestQuestionI[]
): HWUpdateTestQuestionI[] {
  return qsns.map((q) => {
    const {
      id,
      name,
      description,
      text,
      weight,
      only_full_match,
      right_answer_text
    } = q;

    return {
      id,
      name: name || '',
      description: description || '',
      text: text || '',
      descriptionBlocks: description ? JSON.parse(description) : [],
      textBlocks: text ? JSON.parse(text) : [],
      weight: weight || 1,
      only_full_match: !!only_full_match,
      right_answer_text: right_answer_text || '',
      relation_questions: findRelationQsns(id, qsns)
    };
  });
}
