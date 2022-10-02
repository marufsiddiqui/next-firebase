import { signInWithPopup } from 'firebase/auth';

import { auth, googleAuthProvider } from '../../lib/firebase';

export function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src="./google.png" alt="google" /> Sign in with Google
    </button>
  );
}
