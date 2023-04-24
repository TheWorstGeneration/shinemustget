import { Footer } from '@/components/organisms/Footer/Footer';
import { Header } from '@/components/organisms/Header/Header';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Shine Must Get</title>
      </Head>
      <Header size={'lg'} isLogin={false} language={'ko'} />
      <Component {...pageProps} />
      <Footer size={'lg'} />
    </>
  );
}
