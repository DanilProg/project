import { createPortal } from "react-dom";
import { ReactNode } from "react";
interface PortalProps {
  children: ReactNode;
  content?: HTMLElement;
}
export const Portal = ({ children, content }: PortalProps) => {
  return <div>{createPortal(children, content ? content : document.body)}</div>;
};
