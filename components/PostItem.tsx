import Link from 'next/link';

function PostItemAdminSection(props: {
  slug: Maybe<string>;
  published: Maybe<boolean>;
}) {
  return (
    <>
      <Link href={`/admin/${props.slug}`}>
        <h3>
          <button className="btn-blue">Edit</button>
        </h3>
      </Link>

      {props.published ? (
        <p className="text-success">Live</p>
      ) : (
        <p className="text-danger">Unpublished</p>
      )}
    </>
  );
}

export function PostItem({ post, admin = false }: PostItemProp) {
  const wordCount = post?.content?.trim().split(/\s+/g).length || 0;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>

      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span className="push-left">💗 {post.heartCount || 0} Hearts</span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <PostItemAdminSection slug={post.slug} published={post.published} />
      )}
    </div>
  );
}

type PostItemProp = {
  post: Post;
  admin: boolean;
};
