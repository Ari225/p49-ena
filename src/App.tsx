
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Historique from "./pages/Historique";
import Galerie from "./pages/Galerie";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/historique" element={<Historique />} />
              <Route path="/galerie" element={<Galerie />} />
              
              {/* Presentation Routes */}
              <Route path="/textes-officiels" element={<div>Textes Officiels - Page en construction</div>} />
              <Route path="/instances-dirigeantes" element={<div>Instances Dirigeantes - Page en construction</div>} />
              <Route path="/repertoire-membres" element={<div>Répertoire des Membres - Page en construction</div>} />
              
              {/* Activities Routes */}
              <Route path="/agenda" element={<div>Agenda - Page en construction</div>} />
              <Route path="/regionales" element={<div>Régionales - Page en construction</div>} />
              <Route path="/assemblees-generales" element={<div>Assemblées Générales - Page en construction</div>} />
              <Route path="/reunions-constitution" element={<div>Réunions de Constitution - Page en construction</div>} />
              
              {/* Social Events Routes */}
              <Route path="/evenements-heureux" element={<div>Événements Heureux - Page en construction</div>} />
              <Route path="/departs-retraite" element={<div>Départs à la Retraite - Page en construction</div>} />
              <Route path="/necrologie" element={<div>Nécrologie - Page en construction</div>} />
              
              {/* Careers Routes */}
              <Route path="/formations" element={<div>Formations - Page en construction</div>} />
              <Route path="/renforcement-capacites" element={<div>Renforcement des Capacités - Page en construction</div>} />
              <Route path="/coaching-mentorat" element={<div>Coaching & Mentorat - Page en construction</div>} />
              <Route path="/actualites-concours" element={<div>Actualités des Concours - Page en construction</div>} />
              
              {/* Perspectives Routes */}
              <Route path="/derniere-edition" element={<div>Dernière Édition - Page en construction</div>} />
              <Route path="/equipe-editoriale" element={<div>Équipe Éditoriale - Page en construction</div>} />
              <Route path="/actualites" element={<div>Actualités - Page en construction</div>} />
              <Route path="/archives" element={<div>Archives - Page en construction</div>} />
              <Route path="/suggestions" element={<div>Suggestions - Page en construction</div>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
