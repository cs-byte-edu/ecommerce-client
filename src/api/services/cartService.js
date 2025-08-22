import api from "../apiClient";

export const cartService = {
  getCart: async () => api.get("cart/get"),

  clearCart: async () => api.delete("cart/clear"),

  addToCart: async (id, qty) =>
    api.post("cart/add", { productId: id, quantity: qty }),

  removeItem: async (id) => api.delete(`cart/remove/${id}`),

  updateQuantity: async (id, qty) =>
    api.put(`cart/update`, { productId: id, quantity: qty }),

  syncGuestCart: async (guestCartItems) =>
    api.post("/cart/sync", {
      guestCartItems,
    }),
};
