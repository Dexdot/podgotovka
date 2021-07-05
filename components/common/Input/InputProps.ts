export interface InputProps {
  value: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  errorText?: string;
  autoFocus?: boolean;
}

export const defaultProps = {
  disabled: false,
  placeholder: undefined,
  name: undefined,
  onBlur: undefined,
  onFocus: undefined,
  onKeyPress: undefined,
  onKeyDown: undefined,
  type: 'text',
  errorText: '',
  autoFocus: false
};
