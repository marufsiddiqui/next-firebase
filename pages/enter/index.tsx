import type { NextPage } from 'next';

import { useUserContext } from '../../lib/user-context';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';
import { UsernameForm } from './UsernameForm';

const EnterPage: NextPage = () => {
  const { user, username } = useUserContext();

  return (
    <main>
      {user ? (
        username ? (
          <SignOutButton />
        ) : (
          // @ts-ignore
          <UsernameForm />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};

export default EnterPage;
