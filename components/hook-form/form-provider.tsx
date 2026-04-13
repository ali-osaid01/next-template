"use client";

import {
  FormProvider as RHFFormProvider,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";

type FormProviderProps<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  className?: string;
};

export function FormProvider<T extends FieldValues>({
  methods,
  onSubmit,
  children,
  className,
}: FormProviderProps<T>) {
  return (
    <RHFFormProvider {...methods}>
      <form onSubmit={onSubmit} className={className} noValidate>
        {children}
      </form>
    </RHFFormProvider>
  );
}
