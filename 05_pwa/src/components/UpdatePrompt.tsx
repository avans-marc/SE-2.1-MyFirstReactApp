import { useRegisterSW } from "virtual:pwa-register/react";

// Registers the service worker. When a new version has been deployed, the new service worker
// waits until the user clicks "Reload", so the app never changes underneath them.
export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="banner banner-update" role="status">
      <span>A new version is available.</span>
      <button className="banner-btn" onClick={() => updateServiceWorker(true)}>Reload</button>
      <button className="banner-btn banner-btn-ghost" onClick={() => setNeedRefresh(false)}>Later</button>
    </div>
  );
}
