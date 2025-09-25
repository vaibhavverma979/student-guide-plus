import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Bot, Award, School } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary via-primary-light to-secondary text-white">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-bold text-xl">CareerPath</span>
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">
              Empowering students worldwide with AI-powered career guidance, 
              expert counseling, and comprehensive educational resources.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* AI Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-accent-light">AI-Powered Features</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/student/career-ai" className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors font-medium">
                  <Bot className="h-4 w-4" />
                  <span>Career Path AI</span>
                </Link>
              </li>
              <li>
                <Link to="/student/scholarship-ai" className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors font-medium">
                  <Award className="h-4 w-4" />
                  <span>Scholarship AI</span>
                </Link>
              </li>
              <li>
                <Link to="/student/colleges" className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors font-medium">
                  <School className="h-4 w-4" />
                  <span>Colleges</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-white/80 hover:text-white transition-colors">Career Paths</Link></li>
              <li><Link to="/counselors" className="text-white/80 hover:text-white transition-colors">Find Counselors</Link></li>
              <li><Link to="/resources" className="text-white/80 hover:text-white transition-colors">Study Resources</Link></li>
            </ul>
          </div>

          {/* User Portals */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">User Portals</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login/student" className="text-white/80 hover:text-white transition-colors">Student Portal</Link></li>
              <li><Link to="/login/teacher" className="text-white/80 hover:text-white transition-colors">Teacher Portal</Link></li>
              <li><Link to="/login/counsellor" className="text-white/80 hover:text-white transition-colors">Counselor Portal</Link></li>
              <li><Link to="/login/ngo" className="text-white/80 hover:text-white transition-colors">NGO Portal</Link></li>
              <li><Link to="/login/college" className="text-white/80 hover:text-white transition-colors">College Portal</Link></li>
              <li><Link to="/login/admin" className="text-white/80 hover:text-white transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-white/80" />
                <span className="text-white/80">123 Education Street<br />Knowledge City, KC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-white/80" />
                <span className="text-white/80">+1 (555) 123-CAREER</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-white/80" />
                <span className="text-white/80">hello@careerpath.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/80 text-sm">
              © 2024 CareerPath Platform. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-white/80 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/80 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-white/80 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;