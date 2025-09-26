import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Award, 
  Users, 
  Heart, 
  BookOpen, 
  School,
  Calendar,
  TrendingUp,
  MessageCircle,
  Search,
  Bell,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [notifications] = useState([
    { id: 1, title: "New scholarship opportunity available", time: "2 hours ago", type: "scholarship" },
    { id: 2, title: "Your counselor responded to your message", time: "4 hours ago", type: "message" },
    { id: 3, title: "Aptitude test results are ready", time: "1 day ago", type: "test" }
  ]);

  const quickStats = [
    { label: "Career Matches", value: "12", icon: TrendingUp, color: "text-success" },
    { label: "Applications", value: "5", icon: School, color: "text-primary" },
    { label: "Messages", value: "8", icon: MessageCircle, color: "text-accent" },
    { label: "Scholarships", value: "23", icon: Award, color: "text-secondary" }
  ];

  const mainFeatures = [
    {
      title: "Career Path AI",
      description: "Get personalized career recommendations based on your interests and skills",
      icon: Bot,
      color: "from-primary to-primary-light",
      link: "/student/career-ai"
    },
    {
      title: "Scholarship AI", 
      description: "Find scholarships that match your profile and academic achievements",
      icon: Award,
      color: "from-secondary to-secondary-light",
      link: "/student/scholarship-ai"
    },
    {
      title: "Expert Counsellors",
      description: "Connect with certified counselors for personalized guidance",
      icon: Users,
      color: "from-accent to-accent-light", 
      link: "/student/counsellors"
    },
    {
      title: "Registered NGOs",
      description: "Explore opportunities with educational NGOs and organizations",
      icon: Heart,
      color: "from-success to-success-light",
      link: "/student/ngos"
    }
  ];

  const secondaryFeatures = [
    {
      title: "College Search",
      description: "Advanced search and filtering for colleges and universities",
      icon: School,
      link: "/student/colleges"
    },
    {
      title: "Stream Information",
      description: "Detailed information about different academic streams",
      icon: BookOpen,
      link: "/student/streams"
    },
    {
      title: "Academic Resources",
      description: "Access study materials and guidance lectures",
      icon: BookOpen,
      link: "/student/resources"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Section */}
      <div className="hero-gradient text-white py-12">
        <div className="section-container">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, Student!</h1>
            <p className="text-white/90 text-lg">Ready to explore your career possibilities today?</p>
          </div>
        </div>
      </div>

      <div className="section-container py-8">

        {/* Aptitude Test - Primary CTA */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="p-6 bg-gradient-to-br from-primary to-primary-light rounded-xl">
                  <TrendingUp className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">Discover Your Perfect Career Path</h2>
                  <p className="text-muted-foreground text-lg">Take our comprehensive aptitude test to uncover your strengths and find the ideal career match</p>
                </div>
              </div>
              <Link to="/student/aptitude-test">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white px-12 py-4 text-lg">
                  <TrendingUp className="mr-3 h-6 w-6" />
                  Start Aptitude Test
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-accent" />
                  Core Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mainFeatures.map((feature, index) => (
                    <Link key={index} to={feature.link}>
                      <div className="group p-4 rounded-lg border border-border hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-lg w-fit mb-3`}>
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2 group-hover:text-primary">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Features */}
            <Card>
              <CardHeader>
                <CardTitle>Academic & Career Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {secondaryFeatures.map((feature, index) => (
                    <Link key={index} to={feature.link}>
                      <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <feature.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Bell className="mr-2 h-5 w-5" />
                    Recent Activity
                  </span>
                  <Badge variant="secondary">{notifications.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50">
                      <div className="p-1 bg-primary/10 rounded-full">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Counseling
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Take Aptitude Test
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Search Colleges
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Student Dashboard Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-2">Explore More Features</h3>
            <p className="text-muted-foreground">Discover all the tools available to help you succeed</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <Link to="/student/career-ai" className="group">
              <div className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="p-3 bg-gradient-to-br from-primary to-primary-light rounded-lg w-fit mx-auto mb-3">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm group-hover:text-primary">Career Path AI</h4>
              </div>
            </Link>
            
            <Link to="/student/scholarship-ai" className="group">
              <div className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="p-3 bg-gradient-to-br from-secondary to-secondary-light rounded-lg w-fit mx-auto mb-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm group-hover:text-primary">Scholarship AI</h4>
              </div>
            </Link>
            
            <Link to="/student/colleges" className="group">
              <div className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="p-3 bg-gradient-to-br from-accent to-accent-light rounded-lg w-fit mx-auto mb-3">
                  <School className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm group-hover:text-primary">College Directory</h4>
              </div>
            </Link>
            
            <Link to="/student/streams" className="group">
              <div className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="p-3 bg-gradient-to-br from-success to-success-light rounded-lg w-fit mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm group-hover:text-primary">Stream Information</h4>
              </div>
            </Link>
            
            <Link to="/student/counsellors" className="group">
              <div className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-lg w-fit mx-auto mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm group-hover:text-primary">Counsellors</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;