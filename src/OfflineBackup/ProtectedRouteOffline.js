import { useEffect } from "react";

function ProtectedRouteOffline({ children }) {

  useEffect(() => {
    if (!navigator.onLine) {
      window.location.replace("/offline.html");
    }
  }, []);

  if (!navigator.onLine) {
    return null;
  }

  return children;
}

export default ProtectedRouteOffline;