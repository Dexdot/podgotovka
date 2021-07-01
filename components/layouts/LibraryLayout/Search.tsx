import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { ButtonLink } from '@/components/common/Button/ButtonLink';
import { Input } from '@/components/common/Input/Input';
import { HighlightText } from '@/components/common/HighlightText/HighlighText';

import { TODO_CATEGORIES } from '../../Library/helpers';
import { ClearIcon } from '../../Library/Icons';

import cls from './LibraryLayout.module.scss';

interface PropsI {
  value: string;
  onValueChange: (newValue: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

export const Search: React.FC<PropsI> = ({
  value,
  onValueChange,
  onSubmit,
  onClear
}) => {
  const [inputInFocus, toggleInputInFocus] = useState<boolean>(false);

  const handleFocus = useCallback(() => {
    toggleInputInFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      toggleInputInFocus(false);
    }, 100);
  }, []);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Enter') {
        onSubmit();
        handleBlur();
      }
    },
    [onSubmit, handleBlur]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Escape') {
        handleBlur();
      }
    },
    [handleBlur]
  );

  return (
    <>
      <header>
        <h1>Читальня</h1>
        <ButtonLink href="/library/create">Добавить материал</ButtonLink>
      </header>

      <div className={cls.searchbar}>
        <Input
          value={value}
          onChange={(e) => onValueChange(e.currentTarget.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          onKeyDown={handleKeyDown}
          placeholder="Поиск"
          search
        />
        <button
          className={cn(cls.search_clear, {
            [cls.search_clear_visible]: !!value
          })}
          type="button"
          onClick={() => onClear()}
          disabled={!value}
        >
          <ClearIcon />
        </button>
      </div>

      <div className={cls.autocomplete_anchor}>
        <ul
          className={cn(cls.autocomplete, {
            [cls.autocomplete_open]: !!value && inputInFocus
          })}
        >
          {TODO_CATEGORIES.map(({ materials }) =>
            materials.map(({ id, name }) => (
              <li key={id}>
                <Link href={`/library/${id}`}>
                  <a href={`/library/${id}`}>
                    <HighlightText search={value} value={name} />
                  </a>
                </Link>
              </li>
            ))
          )}
          {!TODO_CATEGORIES.length && (
            <li>
              <p className={cls.search_empty}>
                По данному запросу ничего не найдено
              </p>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
