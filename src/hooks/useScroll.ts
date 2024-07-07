import { useEffect, useState } from "react";

export const useScroll = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrollTopBtnVisible, setIsScrollTopBtnVisible] = useState(false);

  useEffect(() => {
    const listener = () => {
      const position = window.scrollY;
      if (position < 100) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
      if (position > 2000) {
        setIsScrollTopBtnVisible(true);
      } else {
        setIsScrollTopBtnVisible(false);
      }
    };
    window.addEventListener("scroll", listener, { passive: true });
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [isAtTop, isScrollTopBtnVisible]);

  return { isAtTop, isScrollTopBtnVisible };
};
