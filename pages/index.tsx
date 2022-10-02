import type { NextPage } from 'next';
import Link from 'next/link';
import Loader from '../components/Loader';

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
      <Loader show />
    </div>
  );
};

export default Home;
