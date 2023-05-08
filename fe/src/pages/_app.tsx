import { MailContainer } from '@/components/molecules/MailContainer/MailContrainer';
import { MoneyThings } from '@/components/molecules/MoneyThings/MoneyThings';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Header } from '@/components/organisms/Header/Header';
import store from '@/store';
import '@/styles/globals.css';
import { asciiart } from '@/utils/asciiart';
import { registerServiceWorker } from '@/utils/serviceWorker';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// declare global {
//   interface Window {
//     Kakao: any;
//   }
// }

// 데이터가 stale 상태일 때 윈도우 포커싱 돼도 refetch 실행 x
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
    registerServiceWorker();
    asciiart();
  }, []);

  return (
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
  );
}
