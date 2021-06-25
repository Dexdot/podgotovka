import React, { useState } from 'react';

import { Button } from '@/components/common/Button/Button';

import { Search } from './Search';
import { Table } from './Table';
import { EditOptionModal } from './EditOptionModal';

import cls from './Options.module.scss';

export const Options: React.FC = () => {
  const [option, setOption] = useState<number | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <section className={cls.root}>
      <header className={cls.flex_center}>
        <h1>Опции</h1>
        <Button onClick={() => setOpen(true)}>Добавить опцию</Button>
      </header>
      <Search />
      <Table
        open={(newOption) => {
          setOpen(true);
          setOption(newOption);
        }}
      />
      <EditOptionModal
        optionId={option}
        isOpen={isOpen}
        close={() => {
          setOpen(false);
          setOption(null);
        }}
      />
    </section>
  );
};
