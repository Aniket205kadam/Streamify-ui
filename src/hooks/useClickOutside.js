import { useEffect } from "react";

export default function useClickOutside(elementRef, handler) {
  useEffect(() => {
    const checkClickLocation = (event) => {
      if (!elementRef.current?.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", checkClickLocation);
    return () => document.removeEventListener("mousedown", checkClickLocation);
  }, [elementRef, handler]);
}
