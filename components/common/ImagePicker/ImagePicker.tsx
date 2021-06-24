/* eslint-disable jsx-a11y/click-events-have-key-events */
import { showAlert } from '@/utils/network';
import React, { useRef, useState } from 'react';
import cn from 'classnames';

import { Button } from '@/components/common/Button/Button';

import { ImageIcon } from './Icons';

import cls from './ImagePicker.module.scss';

interface PropsI {
  href?: string;
  onChange: (file: File | null) => void;
}

export function ImagePicker({ href, onChange }: PropsI): JSX.Element {
  const ref = useRef<HTMLInputElement>(null);

  const [img, setImg] = useState<string>(href || '');

  const readUrl = (
    file: File
  ): Promise<string | ArrayBuffer | null | undefined> => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e.target?.result);
      reader.onerror = (e) => rej(e);
      reader.readAsDataURL(file);
    });
  };

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.target.files && event.target.files.length) {
      try {
        const file = event.target.files[0];
        const image = await readUrl(file);
        if (typeof image === 'string') {
          setImg(image);
          onChange(file);
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

  return (
    <div className={cls.wrapper}>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        className={cls.input}
        ref={ref}
        onChange={handleChange}
      />
      {img ? (
        <div style={{ backgroundImage: `url(${img})` }} className={cls.photo} />
      ) : (
        <div className={cn(cls.photo, cls.placeholder)}>
          <ImageIcon />
        </div>
      )}
      <Button
        variant="secondary"
        type="button"
        onClick={() => ref.current?.click()}
      >
        Добавить фото
      </Button>
    </div>
  );
}

ImagePicker.defaultProps = {
  href: ''
};
