import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta
          name="description"
          content="목표 달성을 위한 만다라트 제작 서비스"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Facebook, Kakao Open Graph 설정 */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shinemustget.com/" />
        <meta property="og:title" content="Shine Must Get" />
        <meta
          property="og:description"
          content="목표 달성을 위한 만다라트 제작 서비스"
        />
        <meta property="og:image" content="" />

        {/* 카카오 SDK import */}
        <script src="https://developers.kakao.com/sdk/js/kakao.min.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
