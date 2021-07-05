import React, { useEffect, useState } from 'react';

import { UserDetailsI } from '@/types/app/users';

import { TextareaFlat } from '@/components/common/Textarea/TextareaFlat';

interface PropsI {
  details: UserDetailsI;
}

export const Bio: React.FC<PropsI> = ({ details }) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (details.id) {
      // todo set bio
      setValue(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem nunc fermentum, cursus id semper vel. Sit ultricies odio amet, nibh nunc, dolor. Sed consequat dui proin id quisque ut feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem nunc fermentum, cursus id semper vel. Sit ultricies odio amet, nibh nunc, dolor. Sed consequat dui proin id quisque ut feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem nunc fermentum, cursus id semper vel. Sit ultricies odio amet, nib...'
      );
    }
  }, [details.id]);

  return (
    <>
      <h2>Био</h2>
      <TextareaFlat
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        disabled
      />
    </>
  );
};
