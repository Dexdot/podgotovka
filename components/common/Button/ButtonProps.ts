export type ButtonProps = {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'green';
  fullWidth?: boolean;
  loading?: boolean;
};

export const defaultProps = {
  variant: 'primary',
  fullWidth: false,
  loading: false
};
