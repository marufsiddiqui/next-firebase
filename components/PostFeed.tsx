import { PostItem } from './PostItem';

export function PostFeed({ posts = [], admin = false }: PostFeedProp) {
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} admin={admin} />
      ))}
    </>
  );
}

type PostFeedProp = {
  posts: Post[];
  admin?: boolean;
};
