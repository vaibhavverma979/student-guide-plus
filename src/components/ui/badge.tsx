import * as React from "react";

import { cn } from "@/lib/utils";

const getBadgeClasses = (variant: string = "default") => {
  const baseClasses = "badge-base";
  
  const variantClasses = {
    default: "badge-default",
    secondary: "badge-secondary", 
    destructive: "badge-destructive",
    outline: "badge-outline",
  };
  
  return `${baseClasses} ${variantClasses[variant] || variantClasses.default}`;
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return <div className={`${getBadgeClasses(variant)} ${className || ""}`} {...props} />;
}

export { Badge };
