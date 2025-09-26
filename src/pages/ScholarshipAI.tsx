import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Award, DollarSign, Calendar, ExternalLink, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import ScholarshipChatbot from "@/components/ScholarshipChatbot";

interface Scholarship {
  id: number;
  title: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  provider: string;
  description: string;
  category: string;
  requirements: string[];
}

const mockScholarships: Scholarship[] = [
  {
    id: 1,
    title: "Merit Excellence Scholarship",
    amount: "$5,000 - $15,000",
    deadline: "2024-03-15",
    eligibility: ["GPA 3.5+", "Undergraduate", "STEM Field"],
    provider: "Tech Foundation",
    description: "Supporting outstanding students in technology and engineering fields",
    category: "Merit-based",
    requirements: ["Academic transcripts", "Personal essay", "2 recommendation letters"]
  },
  {
    id: 2,
    title: "Diversity in Medicine Scholarship", 
    amount: "$10,000",
    deadline: "2024-04-01",
    eligibility: ["Medical Student", "Underrepresented minority", "Financial need"],
    provider: "Healthcare Alliance",
    description: "Promoting diversity in healthcare professions",
    category: "Need-based",
    requirements: ["FAFSA", "Personal statement", "Clinical experience proof"]
  },
  {
    id: 3,
    title: "Future Leaders Scholarship",
    amount: "$7,500",
    deadline: "2024-05-20", 
    eligibility: ["Leadership experience", "Community service", "GPA 3.0+"],
    provider: "Leadership Institute",
    description: "Recognizing students with exceptional leadership potential",
    category: "Leadership",
    requirements: ["Leadership portfolio", "Community service hours", "Interview"]
  },
  {
    id: 4,
    title: "Innovation in Business Scholarship",
    amount: "$12,000",
    deadline: "2024-02-28",
    eligibility: ["Business Major", "Entrepreneurial project", "Junior/Senior"],
    provider: "Business Network",
    description: "Supporting innovative business students and entrepreneurs",
    category: "Field-specific", 
    requirements: ["Business plan", "Project presentation", "Faculty recommendation"]
  }
];

const ScholarshipAI = () => {
  const [scholarships] = useState<Scholarship[]>(mockScholarships);
  const [filteredScholarships, setFilteredScholarships] = useState<Scholarship[]>(mockScholarships);
  const [filters, setFilters] = useState({
    category: "all",
    minAmount: "",
    field: ""
  });
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    let filtered = scholarships;
    
    if (newFilters.category && newFilters.category !== "all") {
      filtered = filtered.filter(s => s.category === newFilters.category);
    }
    
    if (newFilters.field) {
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(newFilters.field.toLowerCase()) ||
        s.description.toLowerCase().includes(newFilters.field.toLowerCase())
      );
    }
    
    setFilteredScholarships(filtered);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 7) return "text-destructive";
    if (days <= 30) return "text-accent";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-secondary to-secondary-light text-white py-6">
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
                  <Award className="mr-2 h-6 w-6" />
                  Scholarship AI
                </h1>
                <p className="text-white/90">Find scholarships tailored to your profile</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white">
              {filteredScholarships.length} Matches
            </Badge>
          </div>
        </div>
      </div>

      <div className="section-container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      <SelectItem value="Merit-based">Merit-based</SelectItem>
                      <SelectItem value="Need-based">Need-based</SelectItem>
                      <SelectItem value="Leadership">Leadership</SelectItem>
                      <SelectItem value="Field-specific">Field-specific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="field">Field of Study</Label>
                  <Input
                    id="field"
                    placeholder="e.g., Engineering, Medicine"
                    value={filters.field}
                    onChange={(e) => handleFilterChange("field", e.target.value)}
                  />
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setFilters({ category: "all", minAmount: "", field: "" });
                    setFilteredScholarships(scholarships);
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Scholarships List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredScholarships.map((scholarship) => {
                const daysLeft = getDaysUntilDeadline(scholarship.deadline);
                return (
                  <Card key={scholarship.id} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{scholarship.title}</h3>
                          <p className="text-muted-foreground mb-3">{scholarship.description}</p>
                          <p className="text-sm text-muted-foreground">Provided by: {scholarship.provider}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="flex items-center text-lg font-bold text-success mb-1">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {scholarship.amount}
                          </div>
                          <Badge variant="secondary">{scholarship.category}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium mb-2">Eligibility</h4>
                          <div className="flex flex-wrap gap-1">
                            {scholarship.eligibility.map((req, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Requirements</h4>
                          <ul className="text-sm text-muted-foreground">
                            {scholarship.requirements.slice(0, 2).map((req, index) => (
                              <li key={index} className="flex items-center">
                                <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                                {req}
                              </li>
                            ))}
                            {scholarship.requirements.length > 2 && (
                              <li className="text-xs text-muted-foreground italic">
                                +{scholarship.requirements.length - 2} more requirements
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4">
                          <div className={`flex items-center ${getUrgencyColor(daysLeft)}`}>
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">
                              {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Save for Later
                          </Button>
                          <Button className="btn-gradient" size="sm">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredScholarships.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No scholarships found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button 
                    onClick={() => {
                      setFilters({ category: "all", minAmount: "", field: "" });
                      setFilteredScholarships(scholarships);
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Scholarship AI Chatbot */}
      <ScholarshipChatbot 
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
      />
    </div>
  );
};

export default ScholarshipAI;