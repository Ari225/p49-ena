
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, Eye } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Journal = () => {
  const isMobile = useIsMobile();
  const [selectedYear, setSelectedYear] = useState('2024');

  const journals = [
    {
      id: 1,
      title: "Journal P49 - Édition Mars 2024",
      year: "2024",
      month: "Mars",
      date: "2024-03-01",
      edition: "N° 15",
      thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=400&fit=crop",
      description: "Dossier spécial : L'innovation dans l'administration publique",
      pages: 24,
      featured: true
    },
    {
      id: 2,
      title: "Journal P49 - Édition Février 2024",
      year: "2024",
      month: "Février",
      date: "2024-02-01",
      edition: "N° 14",
      thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=400&fit=crop",
      description: "Focus sur les réformes administratives en cours",
      pages: 20,
      featured: false
    },
    {
      id: 3,
      title: "Journal P49 - Édition Janvier 2024",
      year: "2024",
      month: "Janvier",
      date: "2024-01-01",
      edition: "N° 13",
      thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=400&fit=crop",
      description: "Bilan de l'année 2023 et perspectives 2024",
      pages: 28,
      featured: false
    },
    {
      id: 4,
      title: "Journal P49 - Édition Décembre 2023",
      year: "2023",
      month: "Décembre",
      date: "2023-12-01",
      edition: "N° 12",
      thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=400&fit=crop",
      description: "Spécial fin d'année : célébrations et réalisations",
      pages: 32,
      featured: false
    },
    {
      id: 5,
      title: "Journal P49 - Édition Novembre 2023",
      year: "2023",
      month: "Novembre",
      date: "2023-11-01",
      edition: "N° 11",
      thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=400&fit=crop",
      description: "Dossier formation continue et développement professionnel",
      pages: 22,
      featured: false
    }
  ];

  const years = ['2024', '2023', '2022', '2021'];
  const filteredJournals = journals.filter(journal => journal.year === selectedYear);

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <section className={`bg-primary text-white py-20 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Journal P49</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Découvrez notre publication officielle avec les actualités, analyses et témoignages de notre communauté
            </p>
          </div>
        </section>

        {/* Year Filter */}
        <section className={`py-8 bg-gray-50 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    selectedYear === year
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Edition Highlight */}
        {filteredJournals.length > 0 && filteredJournals[0].featured && (
          <section className={`py-16 bg-accent/30 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-primary mb-12">
                Dernière édition
              </h2>
              <div className="max-w-4xl mx-auto">
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={filteredJournals[0].thumbnail} 
                        alt={filteredJournals[0].title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-primary text-white">{filteredJournals[0].edition}</Badge>
                        <Badge variant="outline">Nouvelle édition</Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-4">{filteredJournals[0].title}</h3>
                      <p className="text-gray-600 mb-4">{filteredJournals[0].description}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(filteredJournals[0].date).toLocaleDateString('fr-FR')} • {filteredJournals[0].pages} pages
                      </div>
                      <div className="flex gap-4">
                        <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center">
                          <Eye className="w-4 h-4 mr-2" />
                          Lire en ligne
                        </button>
                        <button className="border border-primary text-primary px-6 py-2 rounded-lg font-semibold hover:bg-primary/10 transition-colors flex items-center">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Archives Grid */}
        <section className={`py-16 ${isMobile ? 'px-[25px]' : 'px-[100px]'}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">
              Archives {selectedYear}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJournals.slice(1).map((journal) => (
                <Card key={journal.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                  <div className="relative">
                    <img 
                      src={journal.thumbnail} 
                      alt={journal.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/70 text-white">{journal.edition}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-primary text-lg">{journal.month} {journal.year}</CardTitle>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(journal.date).toLocaleDateString('fr-FR')} • {journal.pages} pages
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{journal.description}</p>
                    <div className="flex gap-2">
                      <button className="bg-primary text-white px-4 py-2 rounded text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center flex-1 justify-center">
                        <Eye className="w-3 h-3 mr-1" />
                        Lire
                      </button>
                      <button className="border border-primary text-primary px-4 py-2 rounded text-sm font-semibold hover:bg-primary/10 transition-colors flex items-center">
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Journal;
