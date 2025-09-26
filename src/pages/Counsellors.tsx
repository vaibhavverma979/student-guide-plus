import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, Star, MapPin, Calendar, Clock, MessageCircle, Video, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface Counsellor {
  id: number;
  name: string;
  specialization: string[];
  experience: number;
  rating: number;
  reviews: number;
  location: string;
  languages: string[];
  availability: string;
  hourlyRate: string;
  description: string;
  education: string;
  consultationModes: string[];
  image: string;
}

const mockCounsellors: Counsellor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: ["Career Counseling", "Engineering Streams", "Study Abroad"],
    experience: 8,
    rating: 4.9,
    reviews: 234,
    location: "New York, USA",
    languages: ["English", "Spanish"],
    availability: "Mon-Fri, 9 AM - 6 PM",
    hourlyRate: "$75/hour",
    description: "Experienced career counselor specializing in STEM fields with 8+ years of helping students navigate their career paths.",
    education: "PhD in Educational Psychology, Columbia University",
    consultationModes: ["Video Call", "Phone Call", "Chat"],
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Prof. Rajesh Kumar",
    specialization: ["Medical Career Guidance", "NEET Preparation", "Medical College Selection"],
    experience: 12,
    rating: 4.8,
    reviews: 156,
    location: "Delhi, India",
    languages: ["English", "Hindi"],
    availability: "Tue-Sat, 10 AM - 8 PM",
    hourlyRate: "$45/hour",
    description: "Former medical college professor turned career counselor, helping students achieve their medical career dreams.",
    education: "MBBS, MD - AIIMS Delhi",
    consultationModes: ["Video Call", "Phone Call"],
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Ms. Emily Chen",
    specialization: ["Business & Management", "MBA Guidance", "Entrepreneurship"],
    experience: 6,
    rating: 4.7,
    reviews: 89,
    location: "Singapore",
    languages: ["English", "Mandarin"],
    availability: "Mon-Thu, 2 PM - 10 PM",
    hourlyRate: "$65/hour",
    description: "Business consultant and career coach helping students explore opportunities in business and management.",
    education: "MBA - Harvard Business School",
    consultationModes: ["Video Call", "Chat"],
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Dr. Michael Brown",
    specialization: ["Psychology", "Arts & Humanities", "Research Careers"],
    experience: 10,
    rating: 4.6,
    reviews: 143,
    location: "London, UK",
    languages: ["English", "French"],
    availability: "Wed-Sun, 11 AM - 7 PM",
    hourlyRate: "$80/hour",
    description: "Clinical psychologist and academic advisor with expertise in humanities and social science careers.",
    education: "PhD in Psychology, University of Oxford",
    consultationModes: ["Video Call", "Phone Call", "Chat"],
    image: "/placeholder.svg"
  }
];

const Counsellors = () => {
  const [counsellors] = useState<Counsellor[]>(mockCounsellors);
  const [filteredCounsellors, setFilteredCounsellors] = useState<Counsellor[]>(mockCounsellors);
  const [filters, setFilters] = useState({
    specialization: "all",
    location: "",
    consultationMode: "all"
  });

  const specializations = ["all", "Career Counseling", "Engineering Streams", "Medical Career Guidance", "Business & Management", "Psychology", "Study Abroad"];
  const consultationModes = ["all", "Video Call", "Phone Call", "Chat"];

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    let filtered = counsellors;
    
    if (newFilters.specialization && newFilters.specialization !== "all") {
      filtered = filtered.filter(c => 
        c.specialization.some(spec => spec.includes(newFilters.specialization))
      );
    }
    
    if (newFilters.location) {
      filtered = filtered.filter(c => 
        c.location.toLowerCase().includes(newFilters.location.toLowerCase())
      );
    }
    
    if (newFilters.consultationMode && newFilters.consultationMode !== "all") {
      filtered = filtered.filter(c => 
        c.consultationModes.includes(newFilters.consultationMode)
      );
    }
    
    setFilteredCounsellors(filtered);
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

  const getConsultationIcon = (mode: string) => {
    switch (mode) {
      case "Video Call": return <Video className="h-4 w-4" />;
      case "Phone Call": return <Phone className="h-4 w-4" />;
      case "Chat": return <MessageCircle className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-accent to-accent-light text-white py-6">
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
                  <Users className="mr-2 h-6 w-6" />
                  Expert Counsellors
                </h1>
                <p className="text-white/90">Connect with certified career counselors for personalized guidance</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white">
              {filteredCounsellors.length} Available
            </Badge>
          </div>
        </div>
      </div>

      <div className="section-container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Specialization</label>
                  <Select value={filters.specialization} onValueChange={(value) => handleFilterChange("specialization", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All specializations" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec === "all" ? "All Specializations" : spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input
                    placeholder="e.g., New York, Delhi"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Consultation Mode</label>
                  <Select value={filters.consultationMode} onValueChange={(value) => handleFilterChange("consultationMode", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All modes" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultationModes.map((mode) => (
                        <SelectItem key={mode} value={mode}>
                          {mode === "all" ? "All Modes" : mode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setFilters({ specialization: "all", location: "", consultationMode: "all" });
                    setFilteredCounsellors(counsellors);
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Counsellors List */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredCounsellors.map((counsellor) => (
                <Card key={counsellor.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img 
                          src={counsellor.image} 
                          alt={counsellor.name}
                          className="w-24 h-24 rounded-full object-cover bg-muted"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{counsellor.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{counsellor.education}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                              <span>{counsellor.experience} years experience</span>
                              <span>•</span>
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {counsellor.location}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 mb-3">
                              <div className="flex items-center">
                                {renderStars(counsellor.rating)}
                                <span className="ml-2 text-sm font-medium">{counsellor.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">({counsellor.reviews} reviews)</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-success">{counsellor.hourlyRate}</p>
                            <p className="text-sm text-muted-foreground">per session</p>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4">{counsellor.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium mb-2">Specializations</h4>
                            <div className="flex flex-wrap gap-1">
                              {counsellor.specialization.map((spec, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Languages</h4>
                            <div className="flex flex-wrap gap-1">
                              {counsellor.languages.map((lang, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Available</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              {counsellor.availability}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Consultation Modes</h4>
                          <div className="flex gap-2">
                            {counsellor.consultationModes.map((mode, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <span className="mr-1">{getConsultationIcon(mode)}</span>
                                {mode}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                          <Button variant="outline" className="flex-1">
                            View Profile
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Calendar className="mr-2 h-4 w-4" />
                            Check Availability
                          </Button>
                          <Button className="flex-1 btn-gradient">
                            Book Consultation
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCounsellors.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No counsellors found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button 
                    onClick={() => {
                      setFilters({ specialization: "all", location: "", consultationMode: "all" });
                      setFilteredCounsellors(counsellors);
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
    </div>
  );
};

export default Counsellors;