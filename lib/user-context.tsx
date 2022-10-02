import { createContext, ReactNode, useContext } from 'react';

import { useUserData } from './hooks';

export const UserContext = createContext<UserContextType>({
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

type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider = (props: UserContextProviderProps) => {
  const userData = useUserData();

  return <UserContext.Provider value={userData} {...props} />;
};
