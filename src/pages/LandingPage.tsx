import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RoleCard from "@/components/RoleCard";
import { 
  GraduationCap, 
  Users, 
  Heart, 
  Building2, 
  School, 
  UserCog,
  ArrowRight,
  Star,
  BookOpen,
  Target
} from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const roles = [
  {
    id: "student",
    title: "Student",
    description: "Discover your career path with AI guidance and expert counseling",
    icon: GraduationCap,
    features: [
      "AI-powered career guidance",
      "Scholarship recommendations", 
      "Connect with counselors",
      "College search & recommendations",
      "Aptitude tests & assessments"
    ],
    gradient: "primary" as const
  },
  {
    id: "teacher",
    title: "Teacher",
    description: "Share knowledge and guide students on their academic journey",
    icon: BookOpen,
    features: [
      "Upload study materials",
      "Create lecture content",
      "Student progress tracking",
      "Resource management"
    ],
    gradient: "secondary" as const
  },
  {
    id: "counsellor",
    title: "Counsellor",
    description: "Provide professional guidance to help students make informed decisions",
    icon: Users,
    features: [
      "Direct student chat interface",
      "Upload guidance materials",
      "Schedule consultations",
      "Career assessment tools"
    ],
    gradient: "accent" as const
  },
  {
    id: "ngo",
    title: "NGO",
    description: "Connect with students and promote educational initiatives",
    icon: Heart,
    features: [
      "Awareness campaigns",
      "Volunteer recruitment",
      "Scholarship programs",
      "Community outreach"
    ],
    gradient: "success" as const
  },
  {
    id: "college",
    title: "College",
    description: "Showcase your institution and attract quality students",
    icon: School,
    features: [
      "Institution profile management",
      "Course catalog updates",
      "Student recruitment tools",
      "Admission timeline management"
    ],
    gradient: "primary" as const
  },
  {
    id: "admin",
    title: "Admin",
    description: "Manage platform operations and user permissions",
    icon: UserCog,
    features: [
      "User role management",
      "Registration approvals",
      "Platform analytics",
      "Content moderation"
    ],
    gradient: "secondary" as const
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    // Navigate to login page for the selected role
    navigate(`/login/${roleId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative hero-gradient min-h-[80vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <img 
          src={heroImage} 
          alt="Career Guidance Platform" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        
        <div className="relative z-10 section-container text-center">
          <div className="animate-float">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Career Path
              <br />
              <span className="text-accent">Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Connect with AI-powered guidance, expert counselors, and educational resources 
              to discover and pursue your dream career
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Explore Career Paths
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float" style={{animationDelay: '1s'}}>
          <Star className="h-8 w-8 text-accent/60" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{animationDelay: '2s'}}>
          <Target className="h-12 w-12 text-secondary/60" />
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="page-title">Choose Your Path</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select your role to access personalized features and start your journey 
              with our comprehensive career guidance platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role) => (
              <RoleCard
                key={role.id}
                title={role.title}
                description={role.description}
                icon={role.icon}
                features={role.features}
                gradient={role.gradient}
                onClick={() => handleRoleSelect(role.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Why Choose CareerPath?</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive tools and guidance for every step of your educational journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card text-center">
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Guidance</h3>
              <p className="text-muted-foreground">
                Get personalized career recommendations using advanced AI technology
              </p>
            </div>

            <div className="feature-card text-center">
              <div className="p-4 bg-secondary/10 rounded-full w-fit mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Network</h3>
              <p className="text-muted-foreground">
                Connect with experienced counselors and education professionals
              </p>
            </div>

            <div className="feature-card text-center">
              <div className="p-4 bg-accent/10 rounded-full w-fit mx-auto mb-4">
                <Building2 className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Resources</h3>
              <p className="text-muted-foreground">
                Access extensive college databases, scholarships, and study materials
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;