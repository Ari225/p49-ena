
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Actualites from '@/pages/Actualites';
import Communiques from '@/pages/Communiques';
import CarrierePlus from '@/pages/CarrierePlus';
import EvenementsSociaux from '@/pages/EvenementsSociaux';
import Gallery from '@/pages/Gallery';
import Journal from '@/pages/Journal';
import Contact from '@/pages/Contact';
import Historique from '@/pages/Historique';
import Archives from '@/pages/Archives';
import NotFound from '@/pages/NotFound';
import ActualiteDetail from '@/pages/ActualiteDetail';
import CommuniqueDetail from '@/pages/CommuniqueDetail';
import BlogDetail from '@/pages/BlogDetail';
import EchoRegionDetail from '@/pages/EchoRegionDetail';
import Blog from '@/pages/Blog';
import EchoRegions from '@/pages/EchoRegions';
import Agenda from '@/pages/Agenda';
import AssembleesGenerales from '@/pages/AssembleesGenerales';
import DepartsRetraite from '@/pages/DepartsRetraite';
import DerniereEdition from '@/pages/DerniereEdition';
import EquipeEditoriale from '@/pages/EquipeEditoriale';
import EvenementsDifficiles from '@/pages/EvenementsDifficiles';
import EvenementsHeureux from '@/pages/EvenementsHeureux';
import EvenementsMalheureux from '@/pages/EvenementsMalheureux';
import Galerie from '@/pages/Galerie';
import InstancesDirigeantes from '@/pages/InstancesDirigeantes';
import Regionales from '@/pages/Regionales';
import RepertoireMembers from '@/pages/RepertoireMembers';
import ReunionsConstitution from '@/pages/ReunionsConstitution';
import Suggestions from '@/pages/Suggestions';
import Temoignages from '@/pages/Temoignages';
import TextesOfficiels from '@/pages/TextesOfficiels';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/actualites" element={<Actualites />} />
                <Route path="/actualites/:id" element={<ActualiteDetail />} />
                <Route path="/communiques/:id" element={<CommuniqueDetail />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/echo-regions/:id" element={<EchoRegionDetail />} />
                <Route path="/communiques" element={<Communiques />} />
                <Route path="/carriere-plus" element={<CarrierePlus />} />
                <Route path="/evenements-sociaux" element={<EvenementsSociaux />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/galerie" element={<Galerie />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/echo-regions" element={<EchoRegions />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/historique" element={<Historique />} />
                <Route path="/archives" element={<Archives />} />
                <Route path="/agenda" element={<Agenda />} />
                <Route path="/assemblees-generales" element={<AssembleesGenerales />} />
                <Route path="/departs-retraite" element={<DepartsRetraite />} />
                <Route path="/derniere-edition" element={<DerniereEdition />} />
                <Route path="/equipe-editoriale" element={<EquipeEditoriale />} />
                <Route path="/evenements-difficiles" element={<EvenementsDifficiles />} />
                <Route path="/evenements-heureux" element={<EvenementsHeureux />} />
                <Route path="/evenements-malheureux" element={<EvenementsMalheureux />} />
                <Route path="/instances-dirigeantes" element={<InstancesDirigeantes />} />
                <Route path="/regionales" element={<Regionales />} />
                <Route path="/repertoire-members" element={<RepertoireMembers />} />
                <Route path="/reunions-constitution" element={<ReunionsConstitution />} />
                <Route path="/suggestions" element={<Suggestions />} />
                <Route path="/temoignages" element={<Temoignages />} />
                <Route path="/textes-officiels" element={<TextesOfficiels />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </div>
            <Toaster />
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
