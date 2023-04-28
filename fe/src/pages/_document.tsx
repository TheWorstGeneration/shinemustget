import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta
          name="description"
          content="목표 달성을 위한 만다라트 제작 서비스"
        />
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

        {/* Google Adsense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5392145622568260"
          crossOrigin="anonymous"
        ></script>

        {/* Google Search Console */}
        <meta
          name="google-site-verification"
          content="bNFWuYuqN3-3do43-JUVELDZA62EG78qGs8yontxl_0"
        />

        {/* Naver Search Console */}
        <meta
          name="naver-site-verification"
          content="8ec18060b0f53f2e6d51113506802deb9db77af8"
        />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DK5DKVFX76"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'G-DK5DKVFX76');
            `,
          }}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
