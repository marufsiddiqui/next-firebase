type Maybe<T> = T | null | undefined;

type User = {
  photoURL: Maybe<string>;
  uid: Maybe<string>;
  displayName: Maybe<string>;
};

type UserContextType = {
  user: Maybe<User>;
  username: Maybe<string>;
};
