import type {
  CollectionReference,
  DocumentReference,
} from 'firebase/firestore';
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from 'firebase/firestore';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import PostContent from '../../components/PostContent';
import { db, getUserWithUsername, postToJSON } from '../../lib/firebase';
import styles from '../../styles/Post.module.css';

export const getStaticProps: GetStaticProps<
  PostPageProps,
  QueryParams
> = async ({ params }) => {
  const { username, slug } = params as QueryParams;

  const userDoc = await getUserWithUsername(username as string);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(db, userDoc.ref.path, 'posts', slug);
    const postDoc = await getDoc(postRef);
    post = postToJSON<Post>(postDoc);
    path = postRef.path;
  }

  return {
    props: {
      post: post as Post,
      path: path as string,
    },
    redirect: 5000,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const q = query(
    collectionGroup(db, 'posts') as CollectionReference<Post>,
    limit(20)
  );
  const snapshot = await getDocs(q);

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();

    return { params: { slug: slug as string, username: username as string } };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

const Post: NextPage<PostPageProps> = (props) => {
  const postRef = doc(db, props.path);
  const [realtimePost] = useDocumentData(postRef as DocumentReference<Post>);

  const post = realtimePost || props.post;

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
      </aside>
    </main>
  );
};

type PostPageProps = {
  post: Post;
  path: string;
};

type QueryParams = {
  username: string;
  slug: string;
};

export default Post;
