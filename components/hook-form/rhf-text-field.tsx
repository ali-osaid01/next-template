"use client";

import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form";

type RHFTextFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  disabled?: boolean;
  className?: string;
};

export function RHFTextField({
  name,
  label,
  placeholder,
  helperText,
  type = "text",
  disabled = false,
  className = "",
}: RHFTextFieldProps) {
  const { control } = useFormContext();
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`flex flex-col gap-1 ${className}`}>
          {label && (
            <label htmlFor={id} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {label}
            </label>
          )}
          <input
            {...field}
            id={id}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            value={type === "number" && field.value === 0 ? "" : (field.value ?? "")}
            onChange={(e) =>
              field.onChange(type === "number" ? Number(e.target.value) : e.target.value)
            }
            className={[
              "h-10 w-full rounded-lg border px-3 text-sm outline-none transition-colors",
              "bg-white text-zinc-900 placeholder:text-zinc-400",
              "dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-600",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-400",
              disabled && "cursor-not-allowed opacity-50",
            ].join(" ")}
          />
          {(error?.message || helperText) && (
            <p className={`text-xs ${error ? "text-red-500" : "text-zinc-500"}`}>
              {error?.message ?? helperText}
            </p>
          )}
        </div>
      )}
    />
  );
}
