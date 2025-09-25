import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import StudentDashboard from "@/pages/StudentDashboard";
import AICareerChat from "@/pages/AICareerChat";
import ScholarshipAI from "@/pages/ScholarshipAI";
import CollegeSearch from "@/pages/CollegeSearch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login/:role" element={<LoginPage />} />
              <Route path="/register/:role" element={<RegistrationPage />} />
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/career-ai" element={<AICareerChat />} />
              <Route path="/student/scholarship-ai" element={<ScholarshipAI />} />
              <Route path="/student/colleges" element={<CollegeSearch />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
