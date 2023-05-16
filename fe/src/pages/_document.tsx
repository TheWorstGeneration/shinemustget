import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>Shine Must Get | 샤인머스켓</title>
        <meta
          name="description"
          content="목표 달성을 위한 만다라트 제작 서비스"
        />

        {/* PWA */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-title" content="Shine Must Get" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Shine Must Get" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="assets/images/common/front-image.png"
        />
        <meta name="msapplication-config" content="browserconfig.xml" />
        <meta name="msapplication-navbutton-color" content="#ffffff" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-tooltip" content="Shine Must Get" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="full-screen" content="yes" />
        <meta name="browsermode" content="application" />
        <meta name="nightmode" content="enable/disable" />
        <meta name="layoutmode" content="fitscreen/standard" />
        <meta name="imagemode" content="force" />
        <meta name="screen-orientation" content="portrait" />
        <meta name="screen-orientation" content="landscape" />
        <meta name="x5-orientation" content="portrait" />
        <meta name="x5-orientation" content="landscape" />
        <meta name="browsermode" content="application" />
        <meta name="x5-page-mode" content="app" />
        <meta name="browsermode" content="application" />
        <meta name="renderer" content="webkit" />
        <meta name="force-rendering" content="webkit" />
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=11" />
        <meta httpEquiv="X-UA-Compatible" content="IE=10" />

        {/* Manifest */}
        <link rel="manifest" href="manifest.json" />

        {/* Twitter */}
        <meta
          name="twitter:image"
          content="assets/images/common/front-image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Canonical */}
        <link rel="canonical" href="https://shinemustget.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        {/* Facebook, Kakao Open Graph 설정 */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shinemustget.com/" />
        <meta property="og:title" content="Shine Must Get" />
        <meta
          property="og:description"
          content="목표 달성을 위한 만다라트 제작 서비스"
        />
        <meta
          property="og:image"
          content="assets/images/common/front-image.png"
        />

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
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
