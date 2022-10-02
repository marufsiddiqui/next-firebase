import type { NextPage } from 'next';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const Home: NextPage = () => {
  return (
    <div>
      <Link
        href={{
          pathname: '/[username]',
          query: { username: 'mars' },
        }}
      >
        <a>Mars profile</a>
      </Link>
      Index
      <Loader show />
      <div>
        <button
          onClick={() => {
            toast.success('hello');
          }}
        >
          Toast
        </button>
      </div>
    </div>
  );
};

export default Home;
