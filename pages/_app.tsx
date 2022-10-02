import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/user-context';

function MyApp({ Component, pageProps }: AppProps) {
  const userValue = {
    user: {},
    username: 'marf',
  };

  return (
    <UserContext.Provider value={userValue}>
      <Navbar />
      <main className="container">
        <Component {...pageProps} />
      </main>
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
