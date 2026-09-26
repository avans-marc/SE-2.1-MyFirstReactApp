import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

// useSyncExternalStore: the React way to read a value that lives outside React
// (here: the browser's online status), without useEffect + useState.
export function useOnlineStatus() {
  return useSyncExternalStore(subscribe, () => navigator.onLine);
}
