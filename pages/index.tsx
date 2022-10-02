import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Link
        prefetch
        href={{
          pathname: '/[username]',
          query: { username: 'mars' },
        }}
      >
        <a>Mars profile</a>
      </Link>
      Index
    </div>
  );
};

export default Home;
