import { signOut } from 'firebase/auth';

import { auth } from '../../lib/firebase';

export function SignOutButton() {
  return <button onClick={() => signOut(auth)}>Sign Out</button>;
}
