import { useLayoutEffect, useRef, useState } from "react";

export const useCalcPos = (
  isOpen: boolean,
  placement: "top" | "bottom" | "left" | "right",
) => {
  const [position, setPosition] = useState<{
    left: number;
    top: number;
    placement: string;
  }>({ left: 0, top: 0, placement: placement });
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const getPosition = () => {
      if (containerRef.current && contentRef.current) {
        const container = containerRef.current;
        const leftContainer = container.offsetLeft;
        const topContainer = container.offsetTop;
        const widthContainer = container.offsetWidth;
        const heightContainer = container.offsetHeight;
        const content = contentRef.current;
        const widthContent = content.offsetWidth;
        const heightContent = content.offsetHeight;
        const positionContent = {
          bottom: {
            left: leftContainer - (widthContent - widthContainer) / 2,
            top: topContainer + heightContainer,
            placement: "bottom",
          },
          top: {
            left: leftContainer - (widthContent - widthContainer) / 2,
            top: topContainer - heightContent,
            placement: "top",
          },
          left: {
            left: leftContainer - widthContent,
            top: topContainer - (heightContent - heightContainer) / 2,
            placement: "left",
          },
          right: {
            left: leftContainer + widthContainer,
            top: topContainer - (heightContent - heightContainer) / 2,
            placement: "right",
          },
        };
        setPosition({ ...positionContent[placement] });
      }
    };
    getPosition();
    if (isOpen) {
      window.addEventListener("resize", getPosition);
    }
    return () => {
      removeEventListener("resize", getPosition);
    };
  }, [isOpen, placement]);
  return { containerRef, contentRef, position };
};
