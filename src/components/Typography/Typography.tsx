import { ElementType, HTMLAttributes, ReactNode } from "react";

type VariantProps = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant: VariantProps;
  children: ReactNode;
  Component: ElementType;
}

const textVariant: Record<VariantProps, string> = {
  h1: "28px",
  h2: "24px",
  h3: "20px",
  h4: "18px",
  h5: "16px",
  h6: "12px",
};
export const Typography = ({
  variant,
  Component,
  children,
  className,
}: TypographyProps) => {
  return (
    <Component className={className} style={{ fontSize: textVariant[variant] }}>
      {children}
    </Component>
  );
};
