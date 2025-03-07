
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Profile from "./pages/Profile";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";
import BusinessNameGenerator from "./pages/business-name-generator";
import EtsyTagGenerator from "./pages/etsy-tag-generator";
import SloganGenerator from "./pages/slogan-generator";
import DomainNameGenerator from "./pages/domain-name-generator";
import EtsyShopNameGenerator from "./pages/etsy-shop-name-generator";
import PromptEnhancer from "./pages/prompt-enhancer";
import LinkedInBioGenerator from "./pages/linkedin-bio-generator";
import SocialMediaBioGenerator from "./pages/social-media-bio-generator";
import AcademicProjectGenerator from "./pages/academic-project-generator";
import ShortPoemGenerator from "./pages/short-poem-generator";
import QuoteGenerator from "./pages/quote-generator";
import HorrorStoryGenerator from "./pages/horror-story-generator";
import WorkoutRoutineGenerator from "./pages/workout-routine-generator";
import DietMealPlanGenerator from "./pages/diet-meal-plan-generator";
import FacebookAdsGenerator from "./pages/facebook-ads-generator";
import GoogleAdsGenerator from "./pages/google-ads-generator";
import NewsletterGenerator from "./pages/newsletter-generator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/tools/business-name-generator" element={<BusinessNameGenerator />} />
            <Route path="/tools/etsy-tag-generator" element={<EtsyTagGenerator />} />
            <Route path="/tools/slogan-generator" element={<SloganGenerator />} />
            <Route path="/tools/domain-name-generator" element={<DomainNameGenerator />} />
            <Route path="/tools/etsy-shop-name-generator" element={<EtsyShopNameGenerator />} />
            <Route path="/tools/prompt-enhancer" element={<PromptEnhancer />} />
            <Route path="/tools/linkedin-bio-generator" element={<LinkedInBioGenerator />} />
            <Route path="/tools/social-media-bio-generator" element={<SocialMediaBioGenerator />} />
            <Route path="/tools/academic-project-generator" element={<AcademicProjectGenerator />} />
            <Route path="/tools/short-poem-generator" element={<ShortPoemGenerator />} />
            <Route path="/tools/quote-generator" element={<QuoteGenerator />} />
            <Route path="/tools/horror-story-generator" element={<HorrorStoryGenerator />} />
            <Route path="/tools/workout-routine-generator" element={<WorkoutRoutineGenerator />} />
            <Route path="/tools/diet-meal-plan-generator" element={<DietMealPlanGenerator />} />
            <Route path="/tools/facebook-ads-generator" element={<FacebookAdsGenerator />} />
            <Route path="/tools/google-ads-generator" element={<GoogleAdsGenerator />} />
            <Route path="/tools/newsletter-generator" element={<NewsletterGenerator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
