import type React from "react";

interface BadgeProps {
  variant?: "success" | "warning" | "error" | "info";
  children: React.ReactNode;
  size?: "sm" | "md";
}

const VARIANT_TO_TEST_ID = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
} as const;

export const Badge: React.FC<BadgeProps> = ({
  variant = "info",
  children,
  size = "md",
}) => {
  const variantClasses = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full
        ${variantClasses[variant]} ${sizeClasses[size]}`}
      data-testid={VARIANT_TO_TEST_ID[variant]}
    >
      {children}
    </span>
  );
};
