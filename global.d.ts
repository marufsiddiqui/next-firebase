type Maybe<T> = T | null | undefined;

type AppUser = {
  displayName?: Maybe<string>;
  photoURL?: Maybe<string>;
  uid?: Maybe<string>;
  username: Maybe<string>;
};

type Post = {
  content: Maybe<string>;
  heartCount: Maybe<number>;
  published: Maybe<boolean>;
  slug: Maybe<string>;
  title: Maybe<string>;
  username: Maybe<string>;
  createdAt: number | Timestamp;
  updatedAt: number | Timestamp;
};

type UserContextType = {
  user: Maybe<AppUser>;
  username: Maybe<string>;
};
