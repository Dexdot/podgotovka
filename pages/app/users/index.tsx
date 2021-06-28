import React from 'react';

import { UsersContext, usersStore } from '@/store/users';

import { Users } from '@/components/Users/Users';

const UsersPage: React.FC = () => {
  return (
    <UsersContext.Provider value={usersStore}>
      <Users />
    </UsersContext.Provider>
  );
};

export default UsersPage;
