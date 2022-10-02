import { doc, getDoc, writeBatch } from 'firebase/firestore';
import debounce from 'lodash.debounce';
import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { db } from '../../lib/firebase';
import { useUserContext } from '../../lib/user-context';
import { UsernameMessage } from './usernameMessage';

export const UsernameForm = () => {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useUserContext();

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const docRef = doc(db, `usernames/${username}`);
        const docSnap = await getDoc(docRef);

        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [checkUsername, formValue]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    setFormValue(val);

    if (val.length < 3) {
      setLoading(false);
      setIsValid(false);
    } else if (re.test(val)) {
      setLoading(true);
      setIsValid(false);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userDocRef = doc(db, `users/${user?.uid}`);
    const usernameDocRef = doc(db, `usernames/${formValue}`);

    const batch = writeBatch(db);
    batch.set(userDocRef, {
      username: formValue,
      photoURL: user?.photoURL,
      displayName: user?.displayName,
    });
    batch.set(usernameDocRef, {
      uid: user?.uid,
    });

    try {
      await batch.commit();
    } catch (e) {
      console.log('Failed to add username', e);
    }
  };

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button className="btn-green" type="submit" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
};
