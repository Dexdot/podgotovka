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

  updateUsers = (newUsers: UserI[]): void => {
    this.users = newUsers;
  };

  updateUserDetails = (newUserDetails: UserDetailsI): void => {
    this.userDetails = newUserDetails;
  };

  fetchUsers = (searchParams: SearchParamsI): void => {
    UsersAPI.fetchUsers(searchParams).then(
      action('fetchSuccess', ({ data }) => {
        this.updateUsers(data);
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  fetchUserDetails = (id: number): void => {
    UsersAPI.fetchUserDetails(id).then(
      action('fetchSuccess', ({ data }) => {
        this.updateUserDetails(data);
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };

  createUser = (newUser: NewUserI): Promise<void> => {
    return new Promise<void>((res, rej) => {
      UsersAPI.createUser(newUser).then(
        action('fetchSuccess', ({ data }) => {
          this.updateUsers([...this.users, data]);
          res();
        }),
        action('fetchError', (error) => {
          showAlert({ error });
          rej();
        })
      );
    });
  };

  updateUser = (updatedUser: UpdateUserI): Promise<void> => {
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
          res();
        }),
        action('fetchError', (error) => {
          showAlert({ error });
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
  }): void => {
    UsersAPI.resetUserPassword(id, password).then(
      action('fetchSuccess', ({ data }) => {
        if (data) {
          showAlert({ text: 'Пароль был успешно изменен' });
        } else {
          showAlert({ text: 'Не удалось изменить пароль' });
        }
      }),
      action('fetchError', (error) => {
        showAlert({ error });
      })
    );
  };
}

export const usersStore = new UsersStore();
export const UsersContext = createContext<UsersStore>(usersStore);
