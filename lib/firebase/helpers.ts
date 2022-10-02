import type {
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { db } from './';

export async function getUserWithUsername(username: string) {
  const usersQuery = query(
    collection(db, 'users') as CollectionReference<AppUser>,
    where('username', '==', username),
    limit(1)
  );
  const [userDoc] = (await getDocs(usersQuery)).docs;

  return userDoc;
}

export async function getUserPosts(userDoc: DocumentSnapshot<AppUser>) {
  const postsQuery = query(
    collection(db, userDoc.ref.path, 'posts') as CollectionReference<Post>,
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(5)
  );
  const postDocs = (await getDocs(postsQuery)).docs;
  return postDocs.map(postToJSON);
}

export function postToJSON(doc: DocumentData) {
  const data = doc.data();

  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
