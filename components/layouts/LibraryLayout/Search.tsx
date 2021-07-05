import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { SearchMaterialI } from '@/types/library';
import { SubjectI } from '@/types/subjects';

import { LibraryContext } from '@/store/library';

import { LibraryAPI } from '@/api/library';

import { useDebounce } from '@/hooks/useDebounce';

import { showAlert } from '@/utils/network';

import { ButtonLink } from '@/components/common/Button/ButtonLink';
import { Input } from '@/components/common/Input/Input';
import { HighlightText } from '@/components/common/HighlightText/HighlighText';
import { Spinner } from '@/components/common/Spinner/Spinner';

import { ClearIcon } from '../../Library/Icons';

import cls from './LibraryLayout.module.scss';

interface PropsI {
  subjects: SubjectI[] | undefined;
}

export const Search: React.FC<PropsI> = observer(({ subjects }) => {
  const router = useRouter();
  const { subject_id } = router.query;

  const { fetchCategories } = useContext(LibraryContext);

  const ref = useRef<HTMLInputElement>(null);

  const [autocompleteItems, setAutocompleteItems] = useState<SearchMaterialI[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [inputInFocus, toggleInputInFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const search = useDebounce(value, 250);

  const fetchAutocompleteItems = useCallback(async () => {
    if (search) {
      try {
        setLoading(true);
        const { data } = await LibraryAPI.getAutocomplete({ q: search });
        setAutocompleteItems(data);
      } catch (error) {
        showAlert({ error });
      } finally {
        setLoading(false);
      }
    }
  }, [search]);

  useEffect(() => {
    if (subject_id) {
      fetchCategories({ subject_id: Number(subject_id) });
    }
  }, [subject_id, fetchCategories]);

  useEffect(() => {
    fetchAutocompleteItems();
  }, [fetchAutocompleteItems]);

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

  const handleFocus = useCallback(() => {
    toggleInputInFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      toggleInputInFocus(false);
    }, 100);
  }, []);

  const handleSubmit = useCallback(() => {
    if (value.trim()) {
      router.push({ pathname: `/library/search`, query: { search: value } });
    }
    ref?.current?.blur();
  }, [router, value, ref]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Enter') {
        handleSubmit();
        handleBlur();
      }
    },
    [handleSubmit, handleBlur]
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
        <ButtonLink
          href={`/library/subject/${
            subject_id || (subjects && subjects[0].id)
          }/create`}
        >
          Добавить материал
        </ButtonLink>
      </header>

      <div className={cls.searchbar}>
        <Input
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
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
          onClick={handleClear}
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
          {!loading &&
            autocompleteItems.map(({ id, name, subject }) => (
              <li key={id}>
                <Link href={`/library/subject/${subject.id}/material/${id}`}>
                  <a href={`/library/subject/${subject.id}/material/${id}`}>
                    <HighlightText search={value} value={name} />
                  </a>
                </Link>
              </li>
            ))}
          {!loading && !autocompleteItems.length && (
            <li>
              <p className={cls.search_empty}>
                По данному запросу ничего не найдено
              </p>
            </li>
          )}
          {loading && <Spinner />}
        </ul>
      </div>
    </>
  );
});
