import React, { useEffect, useRef, useState } from 'react';

import { UserDetailsI } from '@/types/users';

import cls from './User.module.scss';

interface PropsI {
  details: UserDetailsI;
}

export const Bio: React.FC<PropsI> = ({ details }) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (details.id) {
      // todo set bio
      setValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem nunc fermentum, cursus id semper vel. Sit ultricies odio amet, nibh nunc, dolor. Sed consequat dui proin id quisque ut feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem nunc fermentum, cursus id semper vel. Sit ultricies odio amet, nibh nunc, dolor. Sed consequat dui proin id quisque ut feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem nunc fermentum, cursus id semper vel. Sit ultricies odio amet, nib...'
      );
    }
  }, [details.id]);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.height = `auto`;
      const height = ref.current.scrollHeight;
      if (value) {
        ref.current.style.height = `${height}px`;
      } else {
        ref.current.style.height = ``;
      }
    }
  }, [value, ref]);

  return (
    <>
      <h2>Био</h2>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        className={cls.textarea}
        disabled
      />
    </>
  );
};
