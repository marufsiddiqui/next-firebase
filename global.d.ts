type Maybe<T> = T | null | undefined;

type User = {
  photoURL: Maybe<string>;
};

type UserContextType = {
  user: Maybe<User>;
  username: Maybe<string>;
};
