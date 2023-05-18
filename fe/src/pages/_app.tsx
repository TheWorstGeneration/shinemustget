import { MailContainer } from '@/components/molecules/MailContainer/MailContrainer';
import { MoneyThings } from '@/components/molecules/MoneyThings/MoneyThings';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Header } from '@/components/organisms/Header/Header';
import store from '@/store';
import '@/styles/globals.css';
import { asciiart } from '@/utils/asciiart';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store);

  useEffect(() => {
    asciiart();
  }, []);

  return (
    <>
      <Head>
        <title>Shine Must Get | 샤인머스켓</title>
        <meta
          name="description"
          content="목표 달성을 위한 만다라트를 OpenAI의 ChatGPT를 이용해 자동 제작해주는 서비스입니다."
        />
        <meta name="author" content="Shine Must Get" />
        <meta property="og:title" content="Shine Must Get | 샤인머스켓" />
        <meta
          property="og:description"
          content="목표 달성을 위한 만다라트를 OpenAI의 ChatGPT를 이용해 자동 제작해주는 서비스입니다."
        />
        <meta property="og:image" content="assets/images/common/front-end" />
        <meta property="og:url" content="https://shinemustget.com" />
        <meta property="og:site_name" content="Shine Must Get | 샤인머스켓" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Shine Must Get | 샤인머스켓" />
        <meta
          name="twitter:description"
          content="목표 달성을 위한 만다라트를 OpenAI의 ChatGPT를 이용해 자동 제작해주는 서비스입니다."
        />
        <meta name="twitter:image" content="assets/images/common/front-end" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@ShineMustGet" />
        <meta name="twitter:creator" content="@ShineMustGet" />
      </Head>
      <QueryClientProvider client={client}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Header />
              <MoneyThings />
              <MailContainer />
              <Component {...pageProps} />
              <Footer />
            </PersistGate>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
