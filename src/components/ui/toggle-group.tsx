import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "@/lib/utils";

interface ToggleContextProps {
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
}

const ToggleGroupContext = React.createContext<ToggleContextProps>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
    variant?: "default" | "outline";
    size?: "default" | "sm" | "lg";
  }
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root ref={ref} className={`toggle-group ${className || ""}`} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & {
    variant?: "default" | "outline";
    size?: "default" | "sm" | "lg";
  }
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  
  const getToggleClasses = (v: string = "default", s: string = "default") => {
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
    
    return `${baseClasses} ${variantClasses[v] || variantClasses.default} ${sizeClasses[s] || sizeClasses.default}`;
  };

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={`${getToggleClasses(
        context.variant || variant || "default",
        context.size || size || "default"
      )} ${className || ""}`}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
