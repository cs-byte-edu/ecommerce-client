import { cartService } from "../../api/services/cartService";

export const createCartSlice = (set, get) => ({
  cartItems: [], // серверний кошик
  cartLoading: false,
  cartError: null,
  guestCartItems: [], // локальний кошик (зберігається через persist)
  syncInProgress: false,

  // Завантаження серверного кошика
  loadCart: async () => {
    if (!get().isAuthenticated) return;

    // Користувач залогінений - завантажуємо серверний кошик

    set({
      cartLoading: true,
      cartError: null,
    });

    try {
      const loadCartResponse = await cartService.getCart();
      const cartItems = loadCartResponse.data?.cart_items || [];
      set({
        cartItems,
        cartLoading: false,
      });
    } catch (error) {
      console.error("❌ Помилка завантаження кошика: ", error.message);
      set({
        cartError: error.message,
        cartLoading: false,
      });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    console.log(`➕ Додаємо товар ${productId}, кількість: ${quantity}`);
    if (get().isAuthenticated) {
      try {
        const addTocartResponse = await cartService.addToCart(
          productId,
          quantity
        );
        const cartItems = addTocartResponse.data.updatedCart.cart_items || [];
        set({ cartItems });
      } catch (error) {
        console.error("❌ Помилка додавання на сервер:", error);
        set({ cartError: "Помилка додавання товару" });
      }
    } else {
      // Для гостей - в локальний кошик
      const { guestCartItems } = get();
      const existingItemIndex = guestCartItems.findIndex(
        (item) => item.productId === productId
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...guestCartItems];
        updatedItems[existingItemIndex].quantity += quantity;
        set({
          guestCartItems: updatedItems,
          cartItems: [...updatedItems],
        });
        console.log("✅ Кількість товару збільшено в локальному кошику");
      } else {
        const nextCartItems = [
          ...guestCartItems,
          {
            productId,
            quantity,
            addedAt: new Date().toISOString(),
          },
        ];
        set({
          guestCartItems: [...nextCartItems],
          cartItems: [...nextCartItems],
        });
        console.log("✅ Товар додано в локальний кошик");
      }
    }
  },

  clearCart: async () => {
    console.log("🧹 Очищуємо кошик");

    if (get().isAuthenticated) {
      // Очищуємо серверний кошик
      set({ cartLoading: true });
      try {
        await cartService.clearCart();
        set({ cartItems: [], cartLoading: false });
      } catch (error) {
        set({ cartError: error.message, cartLoading: false });
      }
    } else {
      // Очищуємо локальний кошик
      set({ guestCartItems: [] });
    }
  },

  resetCartItems: () => set({ cartItems: [] }),

  // Синхронізація гостьового кошика з серверним
  syncGuestCart: async () => {
    if (!get().isAuthenticated) {
      console.warn("Користувач не залогінений! Синхронізація скасована.");
      return;
    }

    if (get().syncInProgress) {
      console.warn("Синхронізацію кошика уже розпочато");
      return;
    }

    /*
      Користувач може додавати до товари до гостьового кошика,
      до авторизації або реєстрації. 
    */
    const { guestCartItems } = get();

    // Якщо кошик відсутній чи порожній  -  загружаємо серверний
    if (!guestCartItems || guestCartItems.length === 0) {
      await get().loadCart();
      return;
    }

    // Кошик не порожній - починаємо синхронізацію

    set({
      syncInProgress: true,
      cartLoading: true,
      cartError: null,
    });

    try {
      await cartService.syncGuestCart(guestCartItems);

      // Очищуємо локальний кошик тільки після успішної синхронізації
      console.log("🧹 Очищуємо локальний кошик після успішної синхронізації");

      // Після синхронізації завантажуємо оновлений серверний кошик
      console.log("📥 Завантажуємо оновлений серверний кошик");
      await get().loadCart();
      // set({ guestCartItems: [] });
    } catch (error) {
      console.error("❌ Помилка синхронізації: ", error.message);

      set({
        cartError: error.message,
      });

      // При помилці НЕ очищуємо локальний кошик
      // Користувач може спробувати ще раз або товари залишаться локально
      console.warn("⚠️ Локальний кошик збережено через помилку синхронізації");
      return;
    } finally {
      set({
        cartLoading: false,
        syncInProgress: false,
        guestCartItems: [],
      });
    }
  },
});
