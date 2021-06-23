export interface InputProps {
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  errorText?: string;
}

export const defaultProps = {
  disabled: false,
  placeholder: undefined,
  name: undefined,
  onBlur: undefined,
  type: 'text',
  errorText: ''
};
