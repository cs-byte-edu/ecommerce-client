import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { validationRules } from "../utils/validation";
import { useBoundStore } from "../store";
import { FormField } from "../components/FormField";

export const FormLogin = ({ onSuccess }) => {
  const { login, loading, error } = useBoundStore();
  const [showPassword, setShowPassword] = useState(false);

  const loginValidation = {
    email: [
      validationRules.required("Email обов'язковий"),
      validationRules.email(),
    ],
    password: [validationRules.required("Пароль обов'язковий")],
  };

  const { values, errors, touched, handleChange, handleBlur, validate, reset } =
    useForm({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    console.log("identifier: values.identifier: ", {
      identifier: values.email,
    });
    const result = await login({
      email: values.email,
      password: values.password,
    });

    if (result.success) {
      reset();
      onSuccess?.();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Вхід</h2>

      <form onSubmit={handleSubmit}>
        <FormField
          name="email"
          type="email"
          label="Email"
          placeholder="Введіть ваш email"
          value={values.identifier}
          error={errors.identifier}
          touched={touched.identifier}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
        />

        <div className="relative">
          <FormField
            name="password"
            type={showPassword ? "text" : "password"}
            label="Пароль"
            placeholder="Введіть пароль"
            value={values.password}
            error={errors.password}
            touched={touched.password}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Завантаження..." : "Увійти"}
        </button>
      </form>
    </div>
  );
};
