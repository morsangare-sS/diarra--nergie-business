import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NewsArticle } from '../../types';
import { Calendar, User, Clock, ArrowRight, BookOpen, Share2 } from 'lucide-react';

export const NewsView: React.FC = () => {
  const { news, setActiveTab, showToast } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const handleShare = (art: NewsArticle) => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Lien de l'article « ${art.titre} » copié.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="border-b border-slate-200 pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
          Centre de Connaissances & Ingénierie Solaire
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
          Actualités, Guides & Conseils Techniques (Article 12)
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Retrouvez nos analyses techniques, retours d'expérience du terrain sahélien et recommandations d'experts pour optimiser la longévité de vos installations photovoltaïques.
        </p>
      </div>

      {/* Selected Article Detail Modal / View */}
      {selectedArticle ? (
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5"
          >
            ← Retour aux articles
          </button>

          <div className="space-y-3">
            <span className="font-mono text-xs px-2.5 py-1 bg-amber-50 text-amber-800 rounded font-semibold">
              {selectedArticle.categorie}
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
              {selectedArticle.titre}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedArticle.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {selectedArticle.auteur}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedArticle.tempsLecture}
              </span>
            </div>
          </div>

          <div className="prose text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6 space-y-4">
            <p className="text-base font-medium text-slate-900">
              {selectedArticle.resume}
            </p>
            <p className="whitespace-pre-line">
              {selectedArticle.contenuComplet}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => handleShare(selectedArticle)}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Partager ce guide</span>
            </button>
            <button
              onClick={() => setActiveTab('devis')}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Consulter nos ingénieurs sur ce sujet
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedArticle(art)}
            >
              {art.image && (
                <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.titre}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-amber-700">{art.categorie}</span>
                    <span className="font-mono">{art.date}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-900 leading-snug">
                    {art.titre}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {art.resume}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{art.tempsLecture}</span>
                  <span className="font-semibold text-amber-700 flex items-center gap-1">
                    Lire le guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
