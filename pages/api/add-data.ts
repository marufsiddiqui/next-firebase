// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from '@faker-js/faker';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../lib/firebase';

type Data = {
  id?: string | null;
};

const usersMap = {
  james: 'BBjvG5tl7yediPq1CaAhAK79JXH2',
  marf: 'u29rV15bCucJtGiSMfsvR56DzaA2',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const username = (req.query.username as string) || 'marf';
  const count = req.query.count || 1;
  // @ts-ignore
  const userid = usersMap[username] || usersMap['marf'];

  const userRef = doc(db, 'users', userid);
  const ids = [];

  for (let i = 0; i < count; i++) {
    const p = createRandomPost(username);
    const postRef = doc(userRef, 'posts', p.slug as string);
    try {
      const docRef = await setDoc(postRef, p);
      console.log('Document written with ID: ', p.slug);
      ids.push(p.slug);
    } catch (e) {
      console.error('Error adding document: ', e);
      res.status(400);
    }
  }

  res.status(200).json({ id: ids.join(',') });
}

const createRandomPost = (username = 'james') => {
  const date = Timestamp.now();
  const slug = faker.lorem.slug();

  const post: Post = {
    content: faker.lorem.paragraphs(5),
    createdAt: date,
    updatedAt: date,
    slug,
    username,
    title: faker.lorem.sentence(7),
    published: true,
    heartCount: 0,
  };

  return post;
};
