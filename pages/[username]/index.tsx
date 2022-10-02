import type { GetServerSideProps, NextPage } from 'next';

import { PostFeed } from '../../components/PostFeed';
import { UserProfile } from '../../components/UserProfile';
import { getUserPosts, getUserWithUsername } from '../../lib/firebase';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query;

  const userDoc = await getUserWithUsername(username as string);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let posts: Post[] = [];

  if (userDoc) {
    user = userDoc.data();
    posts = await getUserPosts(userDoc);
  }

  return {
    props: {
      user,
      posts,
    },
  };
};

const UserPage: NextPage<UserPageProps> = ({ user, posts }) => {
  return (
    <div>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </div>
  );
};

type UserPageProps = {
  user: AppUser;
  posts: Post[];
};

export default UserPage;
