import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';

import { LoadingStateType } from '@/types/common';
import {
  UserI,
  NewUserI,
  UpdateUserI,
  SearchParamsI,
  UserDetailsI
} from '@/types/app/users';

import { UsersAPI } from '@/api/app/users';

import { showAlert } from '@/utils/network';

export class UsersStore {
  public users: UserI[] = [];

  public usersLoadingState: LoadingStateType = 'done';

  public userDetails: UserDetailsI = {} as UserDetailsI;

  public userDetailsLoadingState: LoadingStateType = 'done';

  constructor() {
    makeAutoObservable(this);
  }

  updateUsers = (newUsers: UserI[]): void => {
    this.users = newUsers;
  };

  updateUserDetails = (newUserDetails: UserDetailsI): void => {
    this.userDetails = newUserDetails;
  };

  fetchUsers = (searchParams: SearchParamsI): void => {
    this.usersLoadingState = 'loading';
    UsersAPI.fetchUsers(searchParams).then(
      action('fetchSuccess', ({ data }) => {
        this.updateUsers(data);
        this.usersLoadingState = 'done';
      }),
      action('fetchError', (error) => {
        showAlert({ error });
        this.usersLoadingState = 'error';
      })
    );
  };

  fetchUserDetails = (id: number): void => {
    this.userDetailsLoadingState = 'loading';
    UsersAPI.fetchUserDetails(id).then(
      action('fetchSuccess', ({ data }) => {
        this.updateUserDetails(data);
        this.userDetailsLoadingState = 'done';
      }),
      action('fetchError', (error) => {
        showAlert({ error });
        this.userDetailsLoadingState = 'error';
      })
    );
  };

  createUser = (newUser: NewUserI): Promise<void> => {
    this.usersLoadingState = 'loading';
    return new Promise<void>((res, rej) => {
      UsersAPI.createUser(newUser).then(
        action('fetchSuccess', ({ data }) => {
          this.updateUsers([...this.users, data]);
          this.usersLoadingState = 'done';
          res();
        }),
        action('fetchError', (error) => {
          showAlert({ error });
          this.usersLoadingState = 'error';
          rej();
        })
      );
    });
  };

  updateUser = (updatedUser: UpdateUserI): Promise<void> => {
    this.usersLoadingState = 'loading';
    return new Promise<void>((res, rej) => {
      UsersAPI.updateUser(updatedUser).then(
        action('fetchSuccess', ({ data }) => {
          const newUsers = this.users.map((item) => {
            if (item.id === data.id) {
              return data;
            }
            return item;
          });
          this.updateUsers(newUsers);
          this.usersLoadingState = 'done';
          res();
        }),
        action('fetchError', (error) => {
          showAlert({ error });
          this.usersLoadingState = 'error';
          rej();
        })
      );
    });
  };

  resetUserPassword = ({
    id,
    password
  }: {
    id: number;
    password: string;
  }): Promise<void> => {
    return new Promise<void>((res, rej) => {
      this.userDetailsLoadingState = 'loading';
      UsersAPI.resetUserPassword(id, password).then(
        action('fetchSuccess', ({ data }) => {
          if (data) {
            this.updateUserDetails({ ...this.userDetails, password });
            showAlert({ text: '???????????? ?????? ?????????????? ??????????????' });
            this.userDetailsLoadingState = 'done';
            res();
          } else {
            showAlert({ text: '???? ?????????????? ???????????????? ????????????' });
            this.userDetailsLoadingState = 'error';
            rej();
          }
        }),
        action('fetchError', (error) => {
          showAlert({ error });
          this.userDetailsLoadingState = 'error';
          rej();
        })
      );
    });
  };
}

export const usersStore = new UsersStore();
export const UsersContext = createContext<UsersStore>(usersStore);
