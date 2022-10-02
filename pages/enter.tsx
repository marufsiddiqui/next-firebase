import { signInWithPopup } from 'firebase/auth';
import type { NextPage } from 'next';
import { auth, googleAuthProvider } from '../lib/firebase';
import { useUserContext } from '../lib/user-context';

const EnterPage: NextPage = () => {
  const { user, username } = useUserContext();

  return (
    <main>
      {user ? (
        username ? (
          <SignOutButton />
        ) : (
          <UsernameForm />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};

function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src="./google.png" /> Sign in with Google
    </button>
  );
}

function SignOutButton() {
  return <button onClick={auth.signOut}>Sign Out</button>;
}
function UsernameForm() {
  return <button onClick={auth.signOut}>Sign Out</button>;
}

export default EnterPage;
