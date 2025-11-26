export default function Button({
  children,
  size = "md", // "sm", "md", "lg"
  className = "",
  disabled = false,
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200";

  // Define size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Combine styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } ${className}`;

  return (
    <button
      className={buttonStyles}
      disabled={disabled}
    >
      {children}
    </button>
  );
}