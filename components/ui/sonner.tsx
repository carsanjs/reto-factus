"use client";
import { Toaster as Sonner } from "sonner";
import type { ComponentProps } from "react";

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="system"
      position="top-right"
      richColors
      expand={false}
      {...props}
    />
  );
};

export { Toaster };
