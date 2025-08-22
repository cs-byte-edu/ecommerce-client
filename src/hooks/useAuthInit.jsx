import { useEffect } from "react";
import { useBoundStore } from "../store";

export const useAuthInit = () => {
  const initializeAuth = useBoundStore((state) => state.initializeAuth);

  useEffect(() => {
    const unsubscribe = useBoundStore.persist.onFinishHydration(() => {
      console.log("🔄 Persist hydration завершено, запускаємо ініціалізацію");
      initializeAuth();
    });

    if (useBoundStore.persist.hasHydrated()) {
      console.log("✅ Store вже hydrated, запускаємо ініціалізацію");
      initializeAuth();
    }

    return unsubscribe;
  }, [initializeAuth]);
};
