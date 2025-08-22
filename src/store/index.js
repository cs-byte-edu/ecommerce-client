import { create } from "zustand";
import { subscribeWithSelector, devtools } from "zustand/middleware";
import { createAuthSlice } from "./slices/createAuthSlice";
import { createCartSlice } from "./slices/createCartSlice";
import { createPageSlice } from "./slices/createPageSlice";

export const useBoundStore = create(
  devtools(
    subscribeWithSelector((...args) => ({
      ...createAuthSlice(...args),
      ...createCartSlice(...args),
      ...createPageSlice(...args),
    }))
  )
);

useBoundStore.subscribe(
  (state) => ({
    isAuthenticated: state.isAuthenticated,
    guestCartItems: state.guestCartItems,
    isInitialized: state.isInitialized,
    syncInProgress: state.syncInProgress,
  }),
  (current) => {
    if (
      current.isAuthenticated &&
      current.isInitialized &&
      current.guestCartItems?.length > 0 &&
      !current.syncInProgress
    ) {
      console.log("🔄 Автоматична синхронізація гостьового кошика");
      useBoundStore.getState().syncGuestCart();
    }
  }
);
