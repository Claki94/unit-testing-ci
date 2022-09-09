import React from 'react';
import * as api from './api';
import { Credential, User } from './model';

export const useLogin = () => {
  const [credential, setCredential] = React.useState<Credential>({
    name: '',
    password: '',
  });

  const [user, setUser] = React.useState<User>(null);

  const onLogin = () => {
    api.login(credential).then(setUser);
  };

  return {
    credential,
    setCredential,
    user,
    onLogin,
  };
};
