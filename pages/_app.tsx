import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import Navbar from '../components/Navbar';
import { UserContextProvider } from '../lib/user-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Navbar />
      <main className="container">
        <Component {...pageProps} />
      </main>
      <Toaster />
    </UserContextProvider>
  );
}

export default MyApp;
