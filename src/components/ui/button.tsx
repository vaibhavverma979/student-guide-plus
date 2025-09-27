import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

const getButtonClasses = (variant: any = "default", size: any = "default") => {
  // Handle both old object format and new string format for backwards compatibility
  if (typeof variant === "object" && variant !== null && "variant" in variant) {
    const { variant: v = "default", size: s = "default" } = variant;
    variant = v;
    size = s;
  }
  
  const baseClasses = "btn-base";
  
  const variantClasses = {
    default: "btn-default",
    destructive: "btn-destructive", 
    outline: "btn-outline",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    link: "btn-link",
  };
  
  const sizeClasses = {
    default: "btn-default-size",
    sm: "btn-sm",
    lg: "btn-lg", 
    icon: "btn-icon",
  };
  
  return `${baseClasses} ${variantClasses[variant] || variantClasses.default} ${sizeClasses[size] || sizeClasses.default}`;
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const classes = `${getButtonClasses(variant, size)} ${className || ""}`.trim();
    return <Comp className={classes} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, getButtonClasses as buttonVariants };
