"use client";

import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form";

type RHFCheckboxProps = {
  name: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
};

export function RHFCheckbox({
  name,
  label,
  helperText,
  disabled = false,
  className = "",
}: RHFCheckboxProps) {
  const { control } = useFormContext();
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`flex flex-col gap-1 ${className}`}>
          <label htmlFor={id} className="flex items-center gap-2 cursor-pointer">
            <input
              id={id}
              type="checkbox"
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              disabled={disabled}
              className={[
                "h-4 w-4 rounded border-zinc-300 text-zinc-900",
                "focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1",
                disabled && "cursor-not-allowed opacity-50",
              ].join(" ")}
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">{label}</span>
          </label>
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
