"use client";

import { useState, useCallback } from "react";

type UseBooleanReturn = {
  value: boolean;
  onTrue: () => void;
  onFalse: () => void;
  onToggle: () => void;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useBoolean(initialValue = false): UseBooleanReturn {
  const [value, setValue] = useState(initialValue);

  const onTrue = useCallback(() => setValue(true), []);
  const onFalse = useCallback(() => setValue(false), []);
  const onToggle = useCallback(() => setValue((v) => !v), []);

  return { value, setValue, onTrue, onFalse, onToggle };
}
