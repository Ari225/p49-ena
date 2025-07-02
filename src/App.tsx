import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

// Pages
import Index from "./pages/Index";
import Historique from "./pages/Historique";
import InstancesDirigeantes from "./pages/InstancesDirigeantes";
import Actualites from "./pages/Actualites";
import ActualiteDetail from "./pages/ActualiteDetail";
import Blog from "./pages/Blog";
import CarrierePlus from "./pages/CarrierePlus";
import Communiques from "./pages/Communiques";
import Contact from "./pages/Contact";
import EchoDesRegions from "./pages/EchoDesRegions";
import Evenements from "./pages/Evenements";
import Gallery from "./pages/Gallery";
import Journal from "./pages/Journal";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardActualites from "./pages/dashboard/DashboardActualites";
import DashboardBlog from "./pages/dashboard/DashboardBlog";
import DashboardCarrieres from "./pages/dashboard/DashboardCarrieres";
import DashboardCommuniques from "./pages/dashboard/DashboardCommuniques";
import DashboardDocuments from "./pages/dashboard/DashboardDocuments";
import DashboardEvenements from "./pages/dashboard/DashboardEvenements";
import DashboardGallery from "./pages/dashboard/DashboardGallery";
import DashboardJournal from "./pages/dashboard/DashboardJournal";
import DashboardUsers from "./pages/dashboard/DashboardUsers";
import DashboardSettings from "./pages/dashboard/DashboardSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/historique" element={<Historique />} />
              <Route path="/instances-dirigeantes" element={<InstancesDirigeantes />} />
              <Route path="/actualites" element={<Actualites />} />
              <Route path="/actualite/:id" element={<ActualiteDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/carriere-plus" element={<CarrierePlus />} />
              <Route path="/communiques" element={<Communiques />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/echo-des-regions" element={<EchoDesRegions />} />
              <Route path="/evenements" element={<Evenements />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />

              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/actualites" element={<DashboardActualites />} />
              <Route path="/dashboard/blog" element={<DashboardBlog />} />
              <Route path="/dashboard/carrieres" element={<DashboardCarrieres />} />
              <Route path="/dashboard/communiques" element={<DashboardCommuniques />} />
              <Route path="/dashboard/documents" element={<DashboardDocuments />} />
              <Route path="/dashboard/evenements" element={<DashboardEvenements />} />
              <Route path="/dashboard/gallery" element={<DashboardGallery />} />
              <Route path="/dashboard/journal" element={<DashboardJournal />} />
              <Route path="/dashboard/users" element={<DashboardUsers />} />
              <Route path="/dashboard/settings" element={<DashboardSettings />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
