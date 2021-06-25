import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';

import { OptionI } from '@/types/common';
import { CreateOptionI, UpdateOptionI, SearchParamsI } from '@/types/options';

import { OptionsAPI } from '@/api/options';

import { showAlert } from '@/utils/network';

export class OptionsStore {
  public options: OptionI[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchOptions = (searchParams: SearchParamsI): void => {
    OptionsAPI.fetchOptions(searchParams).then(
      action('fetchSuccess', ({ data }) => {
        this.options = data;
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  createOption = (newOption: CreateOptionI): void => {
    OptionsAPI.createOption(newOption).then(
      action('fetchSuccess', ({ data }) => {
        this.options = [...this.options, data];
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  updateOption = (option: UpdateOptionI): void => {
    OptionsAPI.updateOption(option).then(
      action('fetchSuccess', ({ data }) => {
        this.options = this.options.map((item) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        });
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  removeOption = (id: number): void => {
    OptionsAPI.removeOption(id).then(
      action('fetchSuccess', ({ data }) => {
        if (data.result) {
          this.options = this.options.filter((item) => item.id !== id);
        } else {
          showAlert({ type: 'error', text: 'Не удалось удалить опцию' });
        }
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };
}

export const optionsStore = new OptionsStore();
export const OptionsContext = createContext<OptionsStore>(optionsStore);
