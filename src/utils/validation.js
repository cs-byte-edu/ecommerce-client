export const validationRules = {
  // Загальні правила валідації
  required:
    (message = "Це поле обов'язкове") =>
    (value) =>
      !value || value.trim() === "" ? message : "",

  email:
    (message = "Невірний формат email") =>
    (value) =>
      value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? message : "",

  minLength: (min, message) => (value) =>
    value && value.length < min ? message || `Мінімум ${min} символів` : "",

  password:
    (message = "Пароль повинен містити мінімум 8 символів") =>
    (value) =>
      value && value.length < 8 ? message : "",

  confirmPassword:
    (password, message = "Паролі не співпадають") =>
    (value) =>
      value !== password ? message : "",

  phone:
    (message = "Невірний формат телефону") =>
    (value) =>
      value && !/^\+?[\d\s-()]+$/.test(value) ? message : "",
};
