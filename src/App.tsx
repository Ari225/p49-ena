
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Historique from "./pages/Historique";
import InstancesDirigeantes from "./pages/InstancesDirigeantes";
import Actualites from "./pages/Actualites";
import ActualiteDetail from "./pages/ActualiteDetail";
import ActualitesConcours from "./pages/ActualitesConcours";
import Agenda from "./pages/Agenda";
import Archives from "./pages/Archives";
import AssembleesGenerales from "./pages/AssembleesGenerales";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import CarrierePlus from "./pages/CarrierePlus";
import CoachingMentorat from "./pages/CoachingMentorat";
import Communiques from "./pages/Communiques";
import CommuniqueDetail from "./pages/CommuniqueDetail";
import Contact from "./pages/Contact";
import DerniereEdition from "./pages/DerniereEdition";
import EchoRegions from "./pages/EchoRegions";
import EchoRegionDetail from "./pages/EchoRegionDetail";
import EquipeEditoriale from "./pages/EquipeEditoriale";
import EvenementsDifficiles from "./pages/EvenementsDifficiles";
import EvenementsSociaux from "./pages/EvenementsSociaux";
import EvenementsHeureux from "./pages/EvenementsHeureux";
import DepartsRetraite from "./pages/DepartsRetraite";
import EvenementsMalheureux from "./pages/EvenementsMalheureux";
import Formations from "./pages/Formations";
import Galerie from "./pages/Galerie";
import Gallery from "./pages/Gallery";
import Journal from "./pages/Journal";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Regionales from "./pages/Regionales";
import RenforcementCapacites from "./pages/RenforcementCapacites";
import RepertoireMembers from "./pages/RepertoireMembers";
import ReunionsConstitution from "./pages/ReunionsConstitution";
import Suggestions from "./pages/Suggestions";
import Temoignages from "./pages/Temoignages";
import TextesOfficiels from "./pages/TextesOfficiels";

// Dashboard Pages
import DashboardBlog from "./pages/dashboard/DashboardBlog";
import DashboardCarrieres from "./pages/dashboard/DashboardCarrieres";
import DashboardCommuniques from "./pages/dashboard/DashboardCommuniques";
import DashboardJournal from "./pages/dashboard/DashboardJournal";
import DashboardUsers from "./pages/dashboard/DashboardUsers";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import DashboardSubmitted from "./pages/dashboard/DashboardSubmitted";
import DashboardNotifications from "./pages/dashboard/DashboardNotifications";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import DashboardNewArticle from "./pages/dashboard/DashboardNewArticle";

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
              {/* Main Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/historique" element={<Historique />} />
              <Route path="/instances-dirigeantes" element={<InstancesDirigeantes />} />
              
              {/* Actualités */}
              <Route path="/actualites" element={<Actualites />} />
              <Route path="/news" element={<Actualites />} />
              <Route path="/actualite/:id" element={<ActualiteDetail />} />
              <Route path="/actualites-concours" element={<ActualitesConcours />} />
              
              {/* Agenda */}
              <Route path="/agenda" element={<Agenda />} />
              
              {/* Archives */}
              <Route path="/archives" element={<Archives />} />
              
              {/* Assemblées */}
              <Route path="/assemblees-generales" element={<AssembleesGenerales />} />
              <Route path="/reunions-constitution" element={<ReunionsConstitution />} />
              
              {/* Blog */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              
              {/* Carrière */}
              <Route path="/carriere-plus" element={<CarrierePlus />} />
              <Route path="/coaching-mentorat" element={<CoachingMentorat />} />
              <Route path="/formations" element={<Formations />} />
              <Route path="/renforcement-capacites" element={<RenforcementCapacites />} />
              
              {/* Communiqués */}
              <Route path="/communiques" element={<Communiques />} />
              <Route path="/communique/:id" element={<CommuniqueDetail />} />
              
              {/* Contact */}
              <Route path="/contact" element={<Contact />} />
              
              {/* Echo Régions */}
              <Route path="/echo-regions" element={<EchoRegions />} />
              <Route path="/echo-region/:id" element={<EchoRegionDetail />} />
              <Route path="/regionales" element={<Regionales />} />
              
              {/* Événements */}
              <Route path="/evenements-difficiles" element={<EvenementsDifficiles />} />
              <Route path="/evenements-sociaux" element={<EvenementsSociaux />} />
              <Route path="/evenements-heureux" element={<EvenementsHeureux />} />
              <Route path="/departs-retraite" element={<DepartsRetraite />} />
              <Route path="/evenements-malheureux" element={<EvenementsMalheureux />} />
              
              {/* Galerie */}
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/galerie" element={<Galerie />} />
              
              {/* Journal */}
              <Route path="/journal" element={<Journal />} />
              <Route path="/derniere-edition" element={<DerniereEdition />} />
              <Route path="/equipe-editoriale" element={<EquipeEditoriale />} />
              
              {/* Répertoire */}
              <Route path="/repertoire-membres" element={<RepertoireMembers />} />
              <Route path="/repertoire-members" element={<RepertoireMembers />} />
              
              {/* Suggestions */}
              <Route path="/suggestions" element={<Suggestions />} />
              
              {/* Témoignages */}
              <Route path="/temoignages" element={<Temoignages />} />
              
              {/* Textes Officiels */}
              <Route path="/textes-officiels" element={<TextesOfficiels />} />
              
              {/* Auth */}
              <Route path="/login" element={<Login />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard/blog" element={<DashboardBlog />} />
              <Route path="/dashboard/carrieres" element={<DashboardCarrieres />} />
              <Route path="/dashboard/communiques" element={<DashboardCommuniques />} />
              <Route path="/dashboard/journal" element={<DashboardJournal />} />
              <Route path="/dashboard/users" element={<DashboardUsers />} />
              <Route path="/dashboard/settings" element={<DashboardSettings />} />
              <Route path="/dashboard/submitted" element={<DashboardSubmitted />} />
              <Route path="/dashboard/notifications" element={<DashboardNotifications />} />
              <Route path="/dashboard/profile" element={<DashboardProfile />} />
              <Route path="/dashboard/new-article" element={<DashboardNewArticle />} />
              
              {/* 404 - Must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
