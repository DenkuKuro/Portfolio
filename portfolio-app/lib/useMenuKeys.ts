"use client";

import { useEffect, useRef } from "react";

type MenuKey = "up" | "down" | "left" | "right" | "enter" | "escape";
type Handlers = Partial<Record<MenuKey, (event: KeyboardEvent) => void>>;

const keyMap: Record<string, MenuKey> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  Enter: "enter",
  Escape: "escape",
};

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

// Window-level arrow / Enter / Esc handling. Skips keys while typing in a field and keys a
// component already handled (preventDefault), e.g. arrow movement inside the projects grid.
export function useMenuKeys(handlers: Handlers) {
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (isTypingTarget(event.target)) return;
      const key = keyMap[event.key];
      const handler = key && handlersRef.current[key];
      if (!handler) return;
      handler(event);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
