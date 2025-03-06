
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
