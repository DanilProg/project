import { useLayoutEffect, useRef, useState } from "react";

export const useCalcCords = (isOpen: boolean) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
    width: number;
  }>({ left: 0, top: 0, width: 0 });
  useLayoutEffect(() => {
    const getPosition = () => {
      if (selectRef.current && contentRef.current) {
        const select = selectRef.current;
        /*        const selectOffSetTop = select.getBoundingClientRect().top;
        const contentOffSetHeight = contentRef.current.offsetHeight;
        const bottomFreeSpace =
          window.innerHeight -
          select.getBoundingClientRect().top -
          select.offsetHeight;
        const top =
          contentOffSetHeight > bottomFreeSpace
            ? selectOffSetTop - contentOffSetHeight
            : selectOffSetTop + select.offsetHeight;
        console.log(top);*/
        setPosition({
          top: select.getBoundingClientRect().bottom,
          left: select.getBoundingClientRect().left,
          width: select.offsetWidth,
        });
      }
    };
    getPosition();
    if (isOpen) {
      window.addEventListener("resize", getPosition);
      window.addEventListener("scroll", getPosition);
    }
    return () => {
      window.removeEventListener("resize", getPosition);
      window.removeEventListener("scroll", getPosition);
    };
  }, [isOpen]);
  return { position, selectRef, contentRef };
};
