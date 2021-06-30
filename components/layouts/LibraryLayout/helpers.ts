import { SubjectI } from '@/types/subjects';

export interface LibraryLayoutPropsI {
  search: string;
  subject: SubjectI | null;
  subjects: SubjectI[] | undefined;
  isSubmitted: boolean;
}
