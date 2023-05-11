export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/pwabuilder-sw.js').then(
        function (registration) {
          console.log('Service worker registered successfully:', registration);
        },
        function (error) {
          console.log('Service worker registration failed:', error);
        },
      );
    });
  }
}
