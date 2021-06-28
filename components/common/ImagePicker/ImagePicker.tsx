/* eslint-disable jsx-a11y/click-events-have-key-events */
import { showAlert } from '@/utils/network';
import React, { useRef, useState } from 'react';
import cn from 'classnames';

import { Button } from '@/components/common/Button/Button';
import { CropModal } from '@/components/modals/CropModal/CropModal';

import { ImageIcon } from './Icons';

import cls from './ImagePicker.module.scss';

interface PropsI {
  href?: string;
  onChange: (file: Blob | null) => void;
}

export function ImagePicker({ href, onChange }: PropsI): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  const [img, setImg] = useState<string>(href || '');
  const [croppedImg, setCroppedImg] = useState<string>(href || '');
  const [isOpen, toggleOpen] = useState<boolean>(false);

  const readUrl = (
    file: File | Blob
  ): Promise<string | ArrayBuffer | null | undefined> => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e.target?.result);
      reader.onerror = (e) => rej(e);
      reader.readAsDataURL(file);
    });
  };

  const handleLoad = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.target.files && event.target.files.length) {
      try {
        const file = event.target.files[0];
        const image = await readUrl(file);
        if (typeof image === 'string') {
          setImg(image);
          toggleOpen(true);
        } else {
          showAlert({ type: 'error', text: 'Не удалось загрузить фотографию' });
        }
      } catch (error) {
        showAlert({ error });
      }
    } else {
      onChange(null);
    }
  };

  const handleCrop = async (blob: Blob | null) => {
    if (blob !== null) {
      try {
        toggleOpen(false);
        const image = await readUrl(blob);
        if (typeof image === 'string') {
          setCroppedImg(image);
          onChange(blob);
        } else {
          showAlert({ type: 'error', text: 'Не удалось загрузить фотографию' });
        }
      } catch (error) {
        showAlert({ error });
      }
    } else {
      onChange(null);
      showAlert({ type: 'error', text: 'Не удалось загрузить фотографию' });
    }
  };

  return (
    <div className={cls.wrapper}>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        className={cls.input}
        ref={ref}
        onChange={handleLoad}
      />
      {croppedImg ? (
        <div
          style={{ backgroundImage: `url(${croppedImg})` }}
          className={cls.photo}
        />
      ) : (
        <div className={cn(cls.photo, cls.placeholder)}>
          <ImageIcon />
        </div>
      )}
      <Button variant="grey" type="button" onClick={() => ref.current?.click()}>
        Добавить фото
      </Button>
      <CropModal
        isOpen={isOpen}
        close={() => toggleOpen(false)}
        url={img}
        onCropped={handleCrop}
        aspectRatio={1}
      />
    </div>
  );
}

ImagePicker.defaultProps = {
  href: ''
};
