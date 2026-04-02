import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServiceDetail from "./pages/ServiceDetail";
import PriceCalculator from "./pages/PriceCalculator";
import "./globals.css";
import Appointment from "./pages/Appointment";
import ServiceList from "./pages/ServiceList";
import Area from "./pages/Areas";
import useClarityPageview from '@/hooks/useClarityPageview';
import ScrollToTop from "./hooks/ScrollToTop";

import { ReviewsProvider } from "@/contexts/ReviewsContext";
import Reviews from "@/components/Reviews";

const queryClient = new QueryClient();

function App() {
  //useClarityPageview();
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <ReviewsProvider>
            <BrowserRouter>
              {/* your route-change GA pageview hook can live here if you have one */}
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Index />} />
                <Route path="/price-calculator" element={<PriceCalculator />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/services" element={<ServiceList />} />
                <Route path="/areas/:slug" element={<Area />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </ReviewsProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
