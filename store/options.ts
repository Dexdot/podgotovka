import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';
import {
  OptionI,
  CreateOptionI,
  UpdateOptionI,
  SearchParamsI
} from '@/types/options';
// import { OptionsAPI } from '@/api/options';
// import { showAlert } from '@/utils/network';

export class OptionsStore {
  public options: OptionI[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchOptions = (searchParams: SearchParamsI): void => {
    // OptionsAPI.fetchOptions(searchParams).then(
    //   action('fetchSuccess', (newOptions) => {
    //     this.options = newOptions.data;
    //   }),
    //   action('fetchError', (error) => {
    //     showAlert({ error });
    //   })
    // );

    console.log(searchParams);
    this.options = [
      {
        id: 1,
        name: 'Вебинары с психологом',
        desc: 'Описание вебинара',
        formatId: 1,
        date: 1624592380,
        isSystem: true
      },
      {
        id: 2,
        name: 'Хоум-чекер',
        desc: 'Описание опции',
        formatId: 2,
        date: 1624419580,
        isSystem: false
      }
    ];
  };

  addOption = (newOption: CreateOptionI): void => {
    console.log(newOption);

    // OptionsAPI.createOption(newOption).then(
    //   action('fetchSuccess', (option) => {
    //     this.options = [...this.options, option.data];
    //   }),
    //   action('fetchError', (error) => {
    //     showAlert({ error });
    //   })
    // );
  };

  updateOption = (option: UpdateOptionI): void => {
    console.log(option);

    // OptionsAPI.updateOption(option).then(
    //   action('fetchSuccess', (updatedOption) => {
    //     this.options = this.options.map((item) => {
    //       if (item.id === updatedOption.data.id) {
    //         return updatedOption.data;
    //       }
    //       return item;
    //     });
    //   }),
    //   action('fetchError', (error) => {
    //     showAlert({ error });
    //   })
    // );
  };
}

export const optionsStore = new OptionsStore();
export const OptionsContext = createContext<OptionsStore>(optionsStore);
