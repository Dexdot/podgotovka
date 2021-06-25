import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';
import {
  UserI,
  NewUserI,
  UpdateUserI,
  SearchParamsI,
  UserDetailsI
} from '@/types/users';
import { UsersAPI } from '@/api/users';
import { showAlert } from '@/utils/network';

export class UsersStore {
  public users: UserI[] = [];

  public userDetails: UserDetailsI = {} as UserDetailsI;

  constructor() {
    makeAutoObservable(this);
  }

  fetchUsers = (searchParams: SearchParamsI): void => {
    UsersAPI.fetchUsers(searchParams).then(
      action('fetchSuccess', ({ data }) => {
        this.users = data;
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  fetchUserDetails = (id: number): void => {
    UsersAPI.fetchUserDetails(id).then(
      action('fetchSuccess', ({ data }) => {
        this.userDetails = data;
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  createUser = (newUser: NewUserI): void => {
    UsersAPI.createUser(newUser).then(
      action('fetchSuccess', ({ data }) => {
        this.users = [...this.users, data];
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  updateUser = (updatedUser: UpdateUserI): void => {
    UsersAPI.updateUser(updatedUser).then(
      action('fetchSuccess', ({ data }) => {
        this.users = this.users.map((item) => {
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

  resetUserPassword = (id: number): void => {
    UsersAPI.resetUserPassword(id).then(
      action('fetchSuccess', ({ data }) => {
        this.userDetails = { ...this.userDetails, ...data };
        showAlert({ text: 'Пароль был успешно сброшен' });
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };
}

export const usersStore = new UsersStore();
export const UsersContext = createContext<UsersStore>(usersStore);
