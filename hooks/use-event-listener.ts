"use client";

import { useEffect, useRef } from "react";

type EventMap = WindowEventMap & DocumentEventMap & HTMLElementEventMap;

export function useEventListener<K extends keyof EventMap>(
  eventName: K,
  handler: (event: EventMap[K]) => void,
  element?: React.RefObject<HTMLElement | null> | null
): void {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const target = element?.current ?? window;
    if (!target?.addEventListener) return;

    const listener = (event: Event) => savedHandler.current(event as EventMap[K]);

    target.addEventListener(eventName, listener);
    return () => target.removeEventListener(eventName, listener);
  }, [eventName, element]);
}
