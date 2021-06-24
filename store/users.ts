import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';
import { UserI, NewUserI, UpdateUserI, SearchParamsI } from '@/types/users';
import { UsersAPI } from '@/api/users';
import { showAlert } from '@/utils/network';

export class UsersStore {
  public users: UserI[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchUsers = (searchParams: SearchParamsI): void => {
    // UsersAPI.fetchUsers(searchParams).then(
    //   action('fetchSuccess', (newUsers) => {
    //     this.users = newUsers.data;
    //   }),
    //   action('fetchError', (error) => {
    //     showAlert({ error });
    //   })
    // );
    console.log(searchParams);
    this.users = [
      {
        id: 1,
        name: 'Иванов Иван',
        login: 'ivanov',
        photo_link: '',
        subjectId: '1',
        roleId: '1',
        statusId: '1'
      },
      {
        id: 2,
        name: 'Петров Петр',
        login: 'petrov',
        photo_link: '',
        subjectId: '2',
        roleId: '2',
        statusId: '2'
      }
    ];
  };

  addUser = (newUser: NewUserI): void => {
    console.log(newUser);

    // UsersAPI.addUser(newUser).then(
    //   action('fetchSuccess', (user) => {
    //     const { pass, vk, ...userSimple } = user.data;
    //     this.users = [...this.users, userSimple];
    //   }),
    //   action('fetchError', (error) => {
    //     showAlert({ error });
    //   })
    // );
  };

  updateUser = (someUser: UpdateUserI): void => {
    console.log(someUser);

    // UsersAPI.updateUser(someUser).then(
    //   action('fetchSuccess', (user) => {
    //     this.users = this.users.map((item) => {
    //       if (item.id === user.data.id) {
    //         return user.data;
    //       }
    //       return item;
    //     });
    //   }),
    //   action('fetchError', (error) => {
    //     showAlert({ error });
    //   })
    // );
  };

  removeUser = (userId: number): void => {
    console.log(userId);

    // UsersAPI.removeUser(userId).then(
    //   action('fetchSuccess', () => {
    //     this.users = this.users.filter((user) => user.id !== userId);
    //   }),
    //   action('fetchError', (error) => {
    //     showAlert({ error });
    //   })
    // );
  };
}

export const usersStore = new UsersStore();
export const UsersContext = createContext<UsersStore>(usersStore);
