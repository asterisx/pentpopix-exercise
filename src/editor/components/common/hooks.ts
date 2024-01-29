import { MutableRefObject, useCallback, useEffect } from "react";

export const useKeyPress = (
  targetKey: string,
  action: () => void,
  elem: MutableRefObject<HTMLDivElement | null>
) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey && elem.current === document.activeElement) {
        action();
      }
    },
    [targetKey, action, elem]
  );

  useEffect(() => {
    const currentElem = elem.current;
    currentElem?.addEventListener("keydown", handleKeyPress);
    return () => {
      currentElem?.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, targetKey, action, elem]);
};
