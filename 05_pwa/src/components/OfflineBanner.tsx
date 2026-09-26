import { useOnlineStatus } from "../hooks/useOnlineStatus";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <p className="banner" role="status">
      You're offline. Showing the cars from your last visit.
    </p>
  );
}
