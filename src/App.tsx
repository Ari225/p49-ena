
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
import EchoRegions from "./pages/EchoRegions";
import Actualites from "./pages/Actualites";
import NotFound from "./pages/NotFound";
import RepertoireMembers from "./pages/RepertoireMembers";
import InstancesDirigeantes from "./pages/InstancesDirigeantes";
import DerniereEdition from "./pages/DerniereEdition";
import EquipeEditoriale from "./pages/EquipeEditoriale";
import Archives from "./pages/Archives";
import Suggestions from "./pages/Suggestions";

// Dashboard pages
import DashboardUsers from "./pages/dashboard/DashboardUsers";
import DashboardNews from "./pages/dashboard/DashboardNews";
import DashboardAddNews from "./pages/dashboard/DashboardAddNews";
import DashboardAddUser from "./pages/dashboard/DashboardAddUser";
import DashboardBlog from "./pages/dashboard/DashboardBlog";
import DashboardPendingArticles from "./pages/dashboard/DashboardPendingArticles";
import DashboardJournal from "./pages/dashboard/DashboardJournal";
import DashboardAddJournal from "./pages/dashboard/DashboardAddJournal";
import DashboardEvents from "./pages/dashboard/DashboardEvents";
import DashboardMyArticles from "./pages/dashboard/DashboardMyArticles";
import DashboardNewArticle from "./pages/dashboard/DashboardNewArticle";
import DashboardJournalArticles from "./pages/dashboard/DashboardJournalArticles";

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
              <Route path="/echo-regions" element={<EchoRegions />} />
              <Route path="/actualites" element={<Actualites />} />
              
              {/* Perspectives 49 Routes */}
              <Route path="/derniere-edition" element={<DerniereEdition />} />
              <Route path="/equipe-editoriale" element={<EquipeEditoriale />} />
              <Route path="/archives" element={<Archives />} />
              <Route path="/suggestions" element={<Suggestions />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard/users" element={<DashboardUsers />} />
              <Route path="/dashboard/add-user" element={<DashboardAddUser />} />
              <Route path="/dashboard/news" element={<DashboardNews />} />
              <Route path="/dashboard/add-news" element={<DashboardAddNews />} />
              <Route path="/dashboard/blog" element={<DashboardBlog />} />
              <Route path="/dashboard/pending-articles" element={<DashboardPendingArticles />} />
              <Route path="/dashboard/journal" element={<DashboardJournal />} />
              <Route path="/dashboard/add-journal" element={<DashboardAddJournal />} />
              <Route path="/dashboard/events" element={<DashboardEvents />} />
              <Route path="/dashboard/my-articles" element={<DashboardMyArticles />} />
              <Route path="/dashboard/new-article" element={<DashboardNewArticle />} />
              <Route path="/dashboard/journal-articles" element={<DashboardJournalArticles />} />
              
              {/* Presentation Routes */}
              <Route path="/textes-officiels" element={<div>Textes Officiels - Page en construction</div>} />
              <Route path="/instances-dirigeantes" element={<InstancesDirigeantes />} />
              <Route path="/repertoire-membres" element={<RepertoireMembers />} />
              
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
