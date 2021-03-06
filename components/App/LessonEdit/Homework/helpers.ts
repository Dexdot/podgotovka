import {
  HWSimpleQuestionI,
  HWTestQuestionBaseI,
  HWTestQuestionI,
  HWUpdateTestQuestionI
} from '@/types/app/homeworks';

const emptyTestQuestion: HWUpdateTestQuestionI = {
  id: 0,
  name: '',
  description: '',
  descriptionBlocks: [],
  textBlocks: [],
  text: '',
  weight: 1,
  only_full_match: false,
  right_answer_text: '',
  relation_questions: [],
  relationIDs: []
};

export const getEmptyTestQuestions = (
  count: number
): HWUpdateTestQuestionI[] => {
  const tmp = new Array(count).fill(0);
  return tmp.map((_, i) => ({ ...emptyTestQuestion, id: i }));
};

let simpleQuestionID = 1;
export const getEmptySimpleQuestion = (name: string): HWSimpleQuestionI => {
  simpleQuestionID += 1;

  return {
    id: simpleQuestionID,
    name,
    text: '',
    description: '',
    // Only frontend
    textBlocks: [],
    descriptionBlocks: [],
    type: 'text'
  };
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

    const relation_questions = findRelationQsns(id, qsns);
    const relationIDs = relation_questions.map((qs) => qs.id);

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
      relation_questions,
      relationIDs
    };
  });
}

export function isQuestionOneValid(q: HWUpdateTestQuestionI): boolean {
  if (!q.name || !q.weight || !q.right_answer_text) {
    return false;
  }

  if (q.textBlocks.length <= 0) {
    return false;
  }

  return true;
}

export function isQuestionTwoValid(q: HWSimpleQuestionI): boolean {
  if (!q.name) {
    return false;
  }

  if (q.textBlocks.length <= 0) {
    return false;
  }

  return true;
}
