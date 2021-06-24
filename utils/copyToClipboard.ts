import { showAlert } from './network';

export const copyToClipboard = (text: string): void => {
  const { clipboard } = navigator;
  clipboard
    .writeText(text)
    .then(() => showAlert({ text: 'Скопировано в буфер обмена' }));
};
