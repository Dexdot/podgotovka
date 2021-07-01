import { HWUpdateTestQuestionI } from '@/types/homeworks';

const emptyQuestion: HWUpdateTestQuestionI = {
  id: 0,
  name: '',
  description: '',
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
