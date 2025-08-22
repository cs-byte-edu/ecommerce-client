export const withAuthGuard =
  (get, fn) =>
  async (...args) => {
    if (!get().isAuthenticated) return;

    return await fn(...args);
  };
