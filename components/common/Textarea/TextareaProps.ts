export interface TextareaProps {
  value: string;
  onChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  errorText?: string;
}

export const defaultProps = {
  disabled: false,
  placeholder: undefined,
  name: undefined,
  onBlur: undefined,
  errorText: ''
};
