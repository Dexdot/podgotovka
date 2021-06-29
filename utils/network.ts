import { toast, TypeOptions } from 'react-toastify';

export function getFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();
  const keys = Object.keys(obj);

  keys.forEach((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      formData.append(key, obj[key]);
    }
  });

  return formData;
}

export function getErrorText(error: any): string {
  if (typeof error === 'string' && error) {
    return error;
  }

  if (error.isAxiosError) {
    const { detail } = error?.response?.data;
    if (!detail) return error.message;

    if (typeof detail === 'string') {
      return detail;
    }

    if (Array.isArray(detail) && detail[0]) {
      const errorItem = detail[0];
      if (errorItem.msg && errorItem.loc) {
        return `${errorItem.msg}\n${errorItem.loc.join('/')}`;
      }
    }

    return error.message;
  }

  return '';
}

type AlertOptions = {
  error?: any;
  text?: string;
  type?: TypeOptions;
};

export function showAlert({ error, text, type }: AlertOptions): void {
  const content = text || getErrorText(error);
  const toastType = error ? 'error' : type;

  toast(content, { type: toastType });
}
