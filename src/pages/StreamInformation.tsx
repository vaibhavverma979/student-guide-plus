import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, TrendingUp, Users, Star, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

interface Stream {
  id: number;
  name: string;
  description: string;
  category: string;
  duration: string;
  careerOptions: string[];
  averageSalary: string;
  skills: string[];
  eligibility: string[];
  popularColleges: string[];
  rating: number;
}

const mockStreams: Stream[] = [
  {
    id: 1,
    name: "Computer Science & Engineering",
    description: "Focus on software development, algorithms, data structures, and computer systems",
    category: "Engineering",
    duration: "4 years",
    careerOptions: ["Software Engineer", "Data Scientist", "System Analyst", "AI/ML Engineer"],
    averageSalary: "$75,000 - $120,000",
    skills: ["Programming", "Problem Solving", "Mathematics", "Logic"],
    eligibility: ["PCM in 12th", "JEE Mains/Advanced", "Minimum 75% in 12th"],
    popularColleges: ["IIT Delhi", "BITS Pilani", "VIT", "SRM"],
    rating: 4.8
  },
  {
    id: 2,
    name: "Medicine (MBBS)",
    description: "Comprehensive medical education covering anatomy, physiology, pathology, and clinical practice",
    category: "Medical",
    duration: "5.5 years",
    careerOptions: ["Doctor", "Surgeon", "Specialist", "Medical Researcher"],
    averageSalary: "$60,000 - $200,000",
    skills: ["Biology", "Chemistry", "Empathy", "Critical Thinking"],
    eligibility: ["PCB in 12th", "NEET UG", "Minimum 50% in 12th"],
    popularColleges: ["AIIMS Delhi", "CMC Vellore", "JIPMER", "MAMC"],
    rating: 4.9
  },
  {
    id: 3,
    name: "Business Administration (BBA/MBA)",
    description: "Management, finance, marketing, and business strategy fundamentals",
    category: "Business",
    duration: "3-2 years",
    careerOptions: ["Business Analyst", "Marketing Manager", "HR Manager", "Entrepreneur"],
    averageSalary: "$45,000 - $90,000",
    skills: ["Leadership", "Communication", "Analytics", "Strategy"],
    eligibility: ["Any stream in 12th", "Entrance exams (CAT/MAT)", "Minimum 50% in graduation"],
    popularColleges: ["IIM Ahmedabad", "FMS Delhi", "XLRI", "ISB Hyderabad"],
    rating: 4.6
  },
  {
    id: 4,
    name: "Arts & Humanities",
    description: "Literature, history, philosophy, languages, and social sciences",
    category: "Arts",
    duration: "3 years",
    careerOptions: ["Writer", "Teacher", "Journalist", "Civil Services", "Translator"],
    averageSalary: "$30,000 - $65,000",
    skills: ["Writing", "Critical Analysis", "Research", "Communication"],
    eligibility: ["Any stream in 12th", "University entrance", "Minimum 50% in 12th"],
    popularColleges: ["DU", "JNU", "BHU", "Presidency College"],
    rating: 4.3
  },
  {
    id: 5,
    name: "Commerce & Finance",
    description: "Accounting, finance, economics, and business mathematics",
    category: "Commerce",
    duration: "3 years",
    careerOptions: ["Accountant", "Financial Analyst", "Banker", "CA/CS", "Investment Advisor"],
    averageSalary: "$35,000 - $80,000",
    skills: ["Mathematics", "Analytics", "Attention to Detail", "Finance"],
    eligibility: ["Commerce/Any stream in 12th", "University entrance", "Minimum 50% in 12th"],
    popularColleges: ["SRCC", "LSR", "Christ University", "Loyola College"],
    rating: 4.4
  }
];

const StreamInformation = () => {
  const [streams] = useState<Stream[]>(mockStreams);
  const [filteredStreams, setFilteredStreams] = useState<Stream[]>(mockStreams);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Engineering", "Medical", "Business", "Arts", "Commerce"];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterStreams(term, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterStreams(searchTerm, category);
  };

  const filterStreams = (search: string, category: string) => {
    let filtered = streams;

    if (search) {
      filtered = filtered.filter(stream => 
        stream.name.toLowerCase().includes(search.toLowerCase()) ||
        stream.description.toLowerCase().includes(search.toLowerCase()) ||
        stream.careerOptions.some(option => option.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (category !== "all") {
      filtered = filtered.filter(stream => stream.category === category);
    }

    setFilteredStreams(filtered);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-accent text-accent" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-accent/50 text-accent" />);
    }
    
    return stars;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-success to-success-light text-white py-6">
        <div className="section-container">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/student/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <BookOpen className="mr-2 h-6 w-6" />
                  Stream Information
                </h1>
                <p className="text-white/90">Explore different academic streams and career paths</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white">
              {filteredStreams.length} Streams
            </Badge>
          </div>
        </div>
      </div>

      <div className="section-container py-6">
        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search streams, careers, or subjects..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryFilter(category)}
                    className="capitalize"
                  >
                    {category === "all" ? "All Streams" : category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streams List */}
        <div className="space-y-6">
          {filteredStreams.map((stream) => (
            <Card key={stream.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold">{stream.name}</h3>
                          <Badge variant="secondary">{stream.category}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{stream.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Duration: {stream.duration}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            {renderStars(stream.rating)}
                            <span className="ml-2 font-medium">{stream.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                          Career Options
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {stream.careerOptions.map((career, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {career}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-success font-medium mt-2">
                          Average Salary: {stream.averageSalary}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Required Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {stream.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-primary/10">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="font-semibold mb-2">Eligibility Criteria</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {stream.eligibility.map((criteria, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                              {criteria}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Top Colleges</h4>
                        <div className="flex flex-wrap gap-1">
                          {stream.popularColleges.map((college, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {college}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                      <Button variant="outline" className="flex-1">
                        View Detailed Curriculum
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Find Colleges
                      </Button>
                      <Button className="flex-1 btn-gradient">
                        Get Career Guidance
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStreams.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">      
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No streams found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setFilteredStreams(streams);
                }}
              >
                Reset Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StreamInformation;