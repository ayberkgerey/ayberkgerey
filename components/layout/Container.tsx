import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow";
};

export function Container({ children, className = "", width = "default" }: ContainerProps) {
  const max = width === "narrow" ? "max-w-3xl" : "max-w-[78rem]";
  return <div className={`mx-auto w-full ${max} px-6 sm:px-10 ${className}`}>{children}</div>;
}
