import React, { useEffect, useRef, useState } from 'react';

import { FileI } from '@/types/common';
import { AddButton } from '@/components/common/AddButton/AddButton';
import { FilesAPI } from '@/api/common/upload';
import { showAlert } from '@/utils/network';

import cls from './Files.module.scss';
import { FileIcon, RemoveIcon } from './icons';

type Props = {
  files: FileI[];
  onChange: (fs: FileI[]) => void;
};

export const Files: React.FC<Props> = ({ files, onChange }) => {
  const [fs, setFiles] = useState(files);

  useEffect(() => {
    onChange(fs);
  }, [fs, onChange]);

  const inputRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();

    // @ts-ignore
    const el = inputRef?.current as HTMLInputElement;
    const inputFiles = el.files;

    if (inputFiles && inputFiles.length) {
      setLoading(true);

      try {
        const promises = Array.from(inputFiles).map(FilesAPI.uploadFile);
        const responses = await Promise.all(promises);
        const uploadedFiles = responses.map((r) => r.data);
        setFiles([...fs, ...uploadedFiles]);
      } catch (error) {
        showAlert({ error });
      } finally {
        setLoading(false);
        el.value = '';
      }
    }
  };

  return (
    <div>
      <ul className={cls.list}>
        {files.map((f) => (
          <li key={f.file_link}>
            <div className={cls.file}>
              <FileIcon />
              <div>
                <p className={cls.name}>{f.name}</p>
                <p className={cls.size}>{f.size}</p>
              </div>
              <button className={cls.remove} type="button">
                <RemoveIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <AddButton
        text="Добавить документ"
        onClick={() => {
          // @ts-ignore
          const el = inputRef?.current as HTMLInputElement;
          el?.click();
        }}
      />
      <input
        className={cls.input}
        ref={inputRef}
        onChange={handleFilesChange}
        type="file"
        disabled={isLoading}
        multiple
      />
    </div>
  );
};
