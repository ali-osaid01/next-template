"use client";

import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form";

export type SelectOption = {
  label: string;
  value: string | number;
};

type RHFSelectProps = {
  name: string;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
};

export function RHFSelect({
  name,
  options,
  label,
  placeholder = "Select an option",
  helperText,
  disabled = false,
  className = "",
}: RHFSelectProps) {
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
          <select
            {...field}
            id={id}
            disabled={disabled}
            value={field.value ?? ""}
            className={[
              "h-10 w-full rounded-lg border px-3 text-sm outline-none transition-colors",
              "bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-zinc-300 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:focus:border-zinc-400",
              disabled && "cursor-not-allowed opacity-50",
            ].join(" ")}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
