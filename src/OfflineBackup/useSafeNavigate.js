import { useNavigate } from "react-router-dom";

export function useSafeNavigate() {
  const navigate = useNavigate();

  return (path) => {
    if (!navigator.onLine && path !== "/") {
      window.location.href = "/offline.html";
      return;
    }

    navigate(path);
  };
}