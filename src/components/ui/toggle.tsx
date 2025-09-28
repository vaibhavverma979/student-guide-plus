import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";

import { cn } from "@/lib/utils";

const getToggleClasses = (variant: string = "default", size: string = "default") => {
  const baseClasses = "toggle-base";
  
  const variantClasses = {
    default: "toggle-default",
    outline: "toggle-outline",
  };
  
  const sizeClasses = {
    default: "toggle-default-size",
    sm: "toggle-sm",
    lg: "toggle-lg",
  };
  
  return `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.default}`;
};

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <TogglePrimitive.Root ref={ref} className={`${getToggleClasses(variant, size)} ${className || ""}`} {...props} />
  ),
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
