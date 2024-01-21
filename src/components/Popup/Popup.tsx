import { HTMLAttributes, ReactNode, useState } from "react";
import { Portal } from "../Portal/Portal.tsx";
import { PopupContent } from "./PopupContent.tsx";
import classNames from "classnames";
import { useCalcPos } from "./useCaclPos.ts";
export interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onContent: ReactNode;
  placement: "top" | "bottom" | "left" | "right";
}
export const Popup = ({
  children,
  placement,
  onContent,
  className,
}: PopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { containerRef, contentRef, position } = useCalcPos(isOpen, placement);
  return (
    <div
      className={classNames(className)}
      ref={containerRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
      {isOpen && (
        <Portal>
          <PopupContent
            contentRef={contentRef}
            onContent={onContent}
            style={position}
          />
        </Portal>
      )}
    </div>
  );
};
