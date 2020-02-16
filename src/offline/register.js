
/**
 * Registers service worker to support offline PWA
 */
export async function register () {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js')
    } catch (err) {
      console.error('ServiceWorker registration failed: ', err)
    }
  }
}
