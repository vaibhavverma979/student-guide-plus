import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Heart, 
  School, 
  UserCog,
  Mail,
  Lock,
  ArrowLeft
} from "lucide-react";

const roleConfig = {
  student: {
    icon: GraduationCap,
    title: "Student Login",
    gradient: "from-primary to-primary-light",
    dashboard: "/student/dashboard"
  },
  teacher: {
    icon: BookOpen,
    title: "Teacher Login", 
    gradient: "from-secondary to-secondary-light",
    dashboard: "/teacher/dashboard"
  },
  counsellor: {
    icon: Users,
    title: "Counsellor Login",
    gradient: "from-accent to-accent-light", 
    dashboard: "/counsellor/dashboard"
  },
  ngo: {
    icon: Heart,
    title: "NGO Login",
    gradient: "from-success to-success-light",
    dashboard: "/ngo/dashboard"
  },
  college: {
    icon: School,
    title: "College Login",
    gradient: "from-primary to-primary-light",
    dashboard: "/college/dashboard"
  },
  admin: {
    icon: UserCog,
    title: "Admin Login", 
    gradient: "from-secondary to-secondary-light",
    dashboard: "/admin/dashboard"
  }
};

const LoginPage = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const config = roleConfig[role as keyof typeof roleConfig];
  
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Invalid role selected. Please return to the homepage.</p>
            <Button onClick={() => navigate("/")} className="mt-4">
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app this would validate credentials
    navigate(config.dashboard);
  };

  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className={`bg-gradient-to-br ${config.gradient} text-white py-8`}>
        <div className="section-container">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="p-4 bg-white/20 rounded-full w-fit mx-auto mb-4">
                <Icon className="h-12 w-12" />
              </div>
              <h1 className="text-3xl font-bold">{config.title}</h1>
              <p className="text-white/90 mt-2">
                Sign in to access your personalized dashboard
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="section-container py-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
              <p className="text-center text-muted-foreground">
                Enter your credentials to continue
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a href="#" className="text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <Button type="submit" className="w-full btn-gradient">
                  Sign In
                </Button>
              </form>

              <Separator className="my-6" />

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link 
                  to={`/register/${role}`}
                  className="text-primary hover:underline font-medium"
                >
                  Register here
                </Link>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">Demo Credentials:</p>
                <p className="text-xs text-muted-foreground">
                  Email: demo@example.com<br />
                  Password: demo123
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;