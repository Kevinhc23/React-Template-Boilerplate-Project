import { useEffect } from "react";

interface ShortcutConfig {
  onProfile?: () => void;
  onBilling?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

export const useProfileShortcuts = (actions: ShortcutConfig) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isTyping =
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement;

      if (isTyping) return;

      const key = event.key.toLowerCase();
      const isMeta = event.metaKey || event.ctrlKey;
      const isShift = event.shiftKey;

      if (isMeta && isShift && key === "p") {
        event.preventDefault();
        actions.onProfile?.();
      }

      if (isMeta && !isShift && key === "b") {
        event.preventDefault();
        actions.onBilling?.();
      }

      if (isMeta && !isShift && key === "s") {
        event.preventDefault();
        actions.onSettings?.();
      }
      if (isMeta && isShift && key === "l") {
        event.preventDefault();
        actions.onLogout?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [actions]);
};
