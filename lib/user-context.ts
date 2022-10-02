import { createContext, useContext } from 'react';

type User = {
  photoURL?: string;
};

type UserContext = {
  user: null | User;
  username: string | null;
};

export const UserContext = createContext<UserContext>({
  user: null,
  username: null,
});

export const useUserContext = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('Must be used inside UserContext');
  }

  return userContext;
};
