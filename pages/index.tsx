import { Timestamp } from 'firebase/firestore';
import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';

import Loader from '../components/Loader';
import { PostFeed } from '../components/PostFeed';
import { getRecentPosts } from '../lib/firebase';
const POSTS_LIMIT = 2;

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await getRecentPosts(POSTS_LIMIT);

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<HomePageProps> = (props) => {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor =
      typeof last.createdAt === 'number'
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;
    const newPosts = await getRecentPosts(POSTS_LIMIT, cursor);
    setLoading(false);
    setPosts(posts.concat(newPosts));

    if (newPosts.length < POSTS_LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <section>
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}
      <Loader show={loading} />
      {postsEnd && 'You have reached the end!'}
    </section>
  );
};

type HomePageProps = {
  posts: Post[];
};

export default Home;
