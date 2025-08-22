export const FormField = ({
  name,
  type = "text",
  placeholder,
  value,
  error,
  touched,
  onChange,
  onBlur,
  disabled,
  label,
}) => (
  <div className="mb-4">
    {label && (
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
    )}
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      className={`border h-12 px-3 rounded w-full transition-colors ${
        error && touched
          ? "border-red-500 focus:border-red-600"
          : "border-gray-300 focus:border-blue-500"
      } ${disabled ? "bg-gray-100" : ""}`}
    />
    {error && touched && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
