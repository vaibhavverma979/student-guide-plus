import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  onClick: () => void;
  gradient: "primary" | "secondary" | "accent" | "success";
}

const gradientClasses = {
  primary: "bg-gradient-to-br from-primary to-primary-light",
  secondary: "bg-gradient-to-br from-secondary to-secondary-light", 
  accent: "bg-gradient-to-br from-accent to-accent-light",
  success: "bg-gradient-to-br from-success to-success-light"
};

const RoleCard = ({ title, description, icon: Icon, features, onClick, gradient }: RoleCardProps) => {
  return (
    <div className="role-card group p-0 overflow-hidden">
      <div className={`${gradientClasses[gradient]} p-6 text-white`}>
        <div className="flex items-center justify-center mb-4">
          <div className="p-4 bg-white/20 rounded-full">
            <Icon className="h-8 w-8" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
        <p className="text-white/90 text-center text-sm mb-4">{description}</p>
      </div>
      
      <div className="p-6">
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-primary rounded-full ml-2 mr-3 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={onClick}
          className="w-full btn-gradient group-hover:scale-105"
        >
          Get Started as {title}
        </Button>
      </div>
    </div>
  );
};

export default RoleCard;