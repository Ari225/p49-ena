import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Agenda from '@/pages/Agenda';
import News from '@/pages/News';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Dashboard from '@/pages/dashboard/Dashboard';
import DashboardNews from '@/pages/dashboard/DashboardNews';
import DashboardUsers from '@/pages/dashboard/DashboardUsers';
import DashboardSettings from '@/pages/dashboard/DashboardSettings';
import DashboardBlog from '@/pages/dashboard/DashboardBlog';
import DashboardJournal from '@/pages/dashboard/DashboardJournal';
import DashboardCommuniques from '@/pages/dashboard/DashboardCommuniques';
import DashboardEchoRegions from '@/pages/dashboard/DashboardEchoRegions';
import DashboardCarrieres from '@/pages/dashboard/DashboardCarrieres';
import DashboardTemoignages from '@/pages/dashboard/DashboardTemoignages';
import DashboardEvenementsSociaux from '@/pages/dashboard/DashboardEvenementsSociaux';
import DashboardMediatheque from '@/pages/dashboard/DashboardMediatheque';
import DashboardEvents from '@/pages/dashboard/DashboardEvents';
import DashboardPopups from '@/pages/dashboard/DashboardPopups';
import DashboardNotifications from '@/pages/dashboard/DashboardNotifications';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { QueryClient } from 'react-query';
import { Toaster } from '@/components/ui/sonner';
import ActiviteDetail from '@/pages/ActiviteDetail';
import DashboardActivites from '@/pages/dashboard/DashboardActivites';

function App() {
  return (
    <QueryClient>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/news" element={<DashboardNews />} />
              <Route path="/dashboard/users" element={<DashboardUsers />} />
              <Route path="/dashboard/settings" element={<DashboardSettings />} />
              <Route path="/dashboard/blog" element={<DashboardBlog />} />
              <Route path="/dashboard/journal" element={<DashboardJournal />} />
              <Route path="/dashboard/communiques" element={<DashboardCommuniques />} />
              <Route path="/dashboard/echo-regions" element={<DashboardEchoRegions />} />
              <Route path="/dashboard/carrieres" element={<DashboardCarrieres />} />
              <Route path="/dashboard/temoignages" element={<DashboardTemoignages />} />
              <Route path="/dashboard/evenements-sociaux" element={<DashboardEvenementsSociaux />} />
              <Route path="/dashboard/mediatheque" element={<DashboardMediatheque />} />
              <Route path="/dashboard/events" element={<DashboardEvents />} />
              <Route path="/dashboard/popups" element={<DashboardPopups />} />
              <Route path="/dashboard/notifications" element={<DashboardNotifications />} />
              <Route path="/activites/:id" element={<ActiviteDetail />} />
              <Route path="/dashboard/activites" element={<DashboardActivites />} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </QueryClient>
  );
}

export default App;
