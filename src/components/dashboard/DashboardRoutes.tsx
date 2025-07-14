
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import dashboard pages
import DashboardUsers from '@/pages/dashboard/DashboardUsers';
import DashboardNews from '@/pages/dashboard/DashboardNews';
import DashboardBlog from '@/pages/dashboard/DashboardBlog';
import DashboardJournal from '@/pages/dashboard/DashboardJournal';
import DashboardEvents from '@/pages/dashboard/DashboardEvents';
import DashboardSettings from '@/pages/dashboard/DashboardSettings';
import DashboardNotifications from '@/pages/dashboard/DashboardNotifications';
import DashboardPopups from '@/pages/dashboard/DashboardPopups';
import DashboardProfile from '@/pages/dashboard/DashboardProfile';
import DashboardSubmitted from '@/pages/dashboard/DashboardSubmitted';
import DashboardMyArticles from '@/pages/dashboard/DashboardMyArticles';
import DashboardNewArticle from '@/pages/dashboard/DashboardNewArticle';
import DashboardJournalArticles from '@/pages/dashboard/DashboardJournalArticles';
import DashboardAddNews from '@/pages/dashboard/DashboardAddNews';
import DashboardAddUser from '@/pages/dashboard/DashboardAddUser';
import DashboardAddJournal from '@/pages/dashboard/DashboardAddJournal';
import DashboardCommuniques from '@/pages/dashboard/DashboardCommuniques';
import DashboardEchoRegions from '@/pages/dashboard/DashboardEchoRegions';
import DashboardCarrieres from '@/pages/dashboard/DashboardCarrieres';
import DashboardTemoignages from '@/pages/dashboard/DashboardTemoignages';
import DashboardEvenementsSociaux from '@/pages/dashboard/DashboardEvenementsSociaux';
import DashboardActivites from '@/pages/dashboard/DashboardActivites';
import DashboardMediatheque from '@/pages/dashboard/DashboardMediatheque';
import DashboardHome from './DashboardHome';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/users" element={<DashboardUsers />} />
      <Route path="/news" element={<DashboardNews />} />
      <Route path="/blog" element={<DashboardBlog />} />
      <Route path="/journal" element={<DashboardJournal />} />
      <Route path="/communiques" element={<DashboardCommuniques />} />
      <Route path="/echo-regions" element={<DashboardEchoRegions />} />
      <Route path="/carrieres" element={<DashboardCarrieres />} />
      <Route path="/temoignages" element={<DashboardTemoignages />} />
      <Route path="/evenements-sociaux" element={<DashboardEvenementsSociaux />} />
      <Route path="/activites" element={<DashboardActivites />} />
      <Route path="/mediatheque" element={<DashboardMediatheque />} />
      <Route path="/events" element={<DashboardEvents />} />
      <Route path="/settings" element={<DashboardSettings />} />
      <Route path="/notifications" element={<DashboardNotifications />} />
      <Route path="/popups" element={<DashboardPopups />} />
      <Route path="/profile" element={<DashboardProfile />} />
      <Route path="/submitted" element={<DashboardSubmitted />} />
      <Route path="/my-articles" element={<DashboardMyArticles />} />
      <Route path="/new-article" element={<DashboardNewArticle />} />
      <Route path="/journal-articles" element={<DashboardJournalArticles />} />
      <Route path="/add-news" element={<DashboardAddNews />} />
      <Route path="/add-user" element={<DashboardAddUser />} />
      <Route path="/add-journal" element={<DashboardAddJournal />} />
    </Routes>
  );
};

export default DashboardRoutes;
