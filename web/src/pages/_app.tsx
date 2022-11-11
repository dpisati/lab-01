import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
