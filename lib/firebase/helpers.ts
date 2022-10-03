import {
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore';
import {
  collection,
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
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
  return await getPosts(
    collection(db, userDoc.ref.path, 'posts') as CollectionReference<Post>,
    5
  );
}

export async function getRecentPosts(limit = 1, cursor?: Timestamp) {
  return await getPosts(
    collectionGroup(db, 'posts') as CollectionReference<Post>,
    limit,
    cursor
  );
}

async function getPosts(
  ref: CollectionReference,
  LIMIT: number,
  cursor: Timestamp = Timestamp.now()
) {
  const postsQuery = query(
    ref,
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    startAfter(cursor),
    limit(LIMIT)
  );
  const postDocs = (await getDocs(postsQuery)).docs;
  return postDocs.map(postToJSON<Post>);
}

export function postToJSON<T>(doc: DocumentData): T {
  const data = doc.data();

  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
