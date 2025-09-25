import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, School, MapPin, Users, DollarSign, Star, Filter, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface College {
  id: number;
  name: string;
  location: string;
  type: string;
  ranking: number;
  students: number;
  tuitionFee: string;
  programs: string[];
  rating: number;
  description: string;
  admissionRate: string;
  establishedYear: number;
}

const mockColleges: College[] = [
  {
    id: 1,
    name: "Metropolitan Institute of Technology",
    location: "New York, NY",
    type: "Private University",
    ranking: 15,
    students: 12000,
    tuitionFee: "$55,000/year",
    programs: ["Computer Science", "Engineering", "Business", "Medicine"],
    rating: 4.7,
    description: "Leading research university with strong emphasis on technology and innovation",
    admissionRate: "18%",
    establishedYear: 1885
  },
  {
    id: 2,
    name: "State University of California",
    location: "Los Angeles, CA",
    type: "Public University",
    ranking: 28,
    students: 35000,
    tuitionFee: "$15,000/year",
    programs: ["Liberal Arts", "Sciences", "Engineering", "Medicine", "Law"],
    rating: 4.5,
    description: "Comprehensive public university offering diverse academic programs",
    admissionRate: "32%",
    establishedYear: 1919
  },
  {
    id: 3,
    name: "Excellence Medical College",
    location: "Boston, MA", 
    type: "Medical School",
    ranking: 8,
    students: 3500,
    tuitionFee: "$65,000/year",
    programs: ["Medicine", "Nursing", "Public Health", "Biomedical Sciences"],
    rating: 4.8,
    description: "Premier medical institution with world-class research facilities",
    admissionRate: "8%",
    establishedYear: 1847
  },
  {
    id: 4,
    name: "Creative Arts University",
    location: "Portland, OR",
    type: "Arts College",
    ranking: 45,
    students: 8500,
    tuitionFee: "$42,000/year",
    programs: ["Fine Arts", "Design", "Music", "Theater", "Film"],
    rating: 4.3,
    description: "Innovative arts college fostering creativity and artistic expression",
    admissionRate: "45%",
    establishedYear: 1962
  },
  {
    id: 5,
    name: "Business Leadership Institute",
    location: "Chicago, IL",
    type: "Business School", 
    ranking: 22,
    students: 6800,
    tuitionFee: "$58,000/year",
    programs: ["MBA", "Finance", "Marketing", "Entrepreneurship"],
    rating: 4.6,
    description: "Top-tier business school with strong industry connections",
    admissionRate: "25%",
    establishedYear: 1901
  }
];

const CollegeSearch = () => {
  const [colleges] = useState<College[]>(mockColleges);
  const [filteredColleges, setFilteredColleges] = useState<College[]>(mockColleges);
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    program: "",
    searchTerm: ""
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    let filtered = colleges;
    
    if (newFilters.type) {
      filtered = filtered.filter(c => c.type === newFilters.type);
    }
    
    if (newFilters.location) {
      filtered = filtered.filter(c => 
        c.location.toLowerCase().includes(newFilters.location.toLowerCase())
      );
    }
    
    if (newFilters.program) {
      filtered = filtered.filter(c => 
        c.programs.some(p => p.toLowerCase().includes(newFilters.program.toLowerCase()))
      );
    }
    
    if (newFilters.searchTerm) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(newFilters.searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(newFilters.searchTerm.toLowerCase())
      );
    }
    
    setFilteredColleges(filtered);
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
      <div className="bg-gradient-to-br from-primary to-primary-light text-white py-6">
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
                  <School className="mr-2 h-6 w-6" />
                  College Search & Discovery
                </h1>
                <p className="text-white/90">Find the perfect college for your career goals</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white">
              {filteredColleges.length} Colleges
            </Badge>
          </div>
        </div>
      </div>

      <div className="section-container py-6">
        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search colleges by name or keyword..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                  className="w-full"
                />
              </div>
              <Button className="btn-gradient">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="type">College Type</Label>
                  <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All types</SelectItem>
                      <SelectItem value="Private University">Private University</SelectItem>
                      <SelectItem value="Public University">Public University</SelectItem>
                      <SelectItem value="Medical School">Medical School</SelectItem>
                      <SelectItem value="Arts College">Arts College</SelectItem>
                      <SelectItem value="Business School">Business School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., New York, California"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="program">Program/Major</Label>
                  <Input
                    id="program"
                    placeholder="e.g., Computer Science, Medicine"
                    value={filters.program}
                    onChange={(e) => handleFilterChange("program", e.target.value)}
                  />
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setFilters({ type: "", location: "", program: "", searchTerm: "" });
                    setFilteredColleges(colleges);
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Colleges List */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredColleges.map((college) => (
                <Card key={college.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* College Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{college.name}</h3>
                            <div className="flex items-center text-muted-foreground mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{college.location}</span>
                              <span className="mx-2">•</span>
                              <span className="text-sm">Est. {college.establishedYear}</span>
                            </div>
                            <div className="flex items-center space-x-2 mb-3">
                              <div className="flex items-center">
                                {renderStars(college.rating)}
                                <span className="ml-2 text-sm font-medium">{college.rating}</span>
                              </div>
                              <Badge variant="outline">#{college.ranking} Ranking</Badge>
                              <Badge variant="secondary">{college.type}</Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">{college.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-primary" />
                            <div>
                              <div className="text-sm font-medium">{college.students.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">Students</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-success" />
                            <div>
                              <div className="text-sm font-medium">{college.tuitionFee}</div>
                              <div className="text-xs text-muted-foreground">Tuition Fee</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <School className="h-4 w-4 text-accent" />
                            <div>
                              <div className="text-sm font-medium">{college.admissionRate}</div>
                              <div className="text-xs text-muted-foreground">Admission Rate</div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Available Programs</h4>
                          <div className="flex flex-wrap gap-2">
                            {college.programs.map((program, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {program}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                          <Button variant="outline" className="flex-1">
                            View Details
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Virtual Tour
                          </Button>
                          <Button className="flex-1 btn-gradient">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredColleges.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <School className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No colleges found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button 
                    onClick={() => {
                      setFilters({ type: "", location: "", program: "", searchTerm: "" });
                      setFilteredColleges(colleges);
                    }}
                  >
                    Reset Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeSearch;