import { useNavigate, useLocation } from "react-router";
import { useBoundStore } from "../store";
import { useEffect } from "react";

export const AuthGuard = ({ children }) => {
  const isInitialized = useBoundStore((s) => s.isInitialized);
  const isAuthenticated = useBoundStore((s) => s.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  console.log("AuthGuard location: ", location);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate("/signin", { state: { from: location }, replace: true });
    }
  }, [isInitialized, isAuthenticated, navigate, location]);

  if (!isInitialized) {
    return <div>Завантаження...</div>;
  }

  if (!isAuthenticated) {
    // Показуємо null або той самий завантажувач, поки відбувається перенаправлення
    return null;
  }

  return <>{children}</>;
};
