import { FC, useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.replace('/login');
    }
  }, []);
  return <Component {...pageProps} />;
};

export default App;
