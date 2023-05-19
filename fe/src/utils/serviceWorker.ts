export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/pwabuilder-sw.js').then(
        function (registration) {
        },
        function (error) {
        },
      );
    });
  }
}
