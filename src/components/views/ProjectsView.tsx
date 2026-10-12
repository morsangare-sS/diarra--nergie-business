import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TargetCountry } from '../../types';
import { MapPin, Calendar, Building, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { projects, setActiveTab } = useApp();
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('Tous');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  const filteredProjects = projects.filter((p) => {
    if (selectedCountryFilter !== 'Tous' && p.pays !== selectedCountryFilter) return false;
    if (selectedCategoryFilter !== 'all' && p.categorie !== selectedCategoryFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="border-b border-slate-200 pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
          Références & Projets Livrés (Article 9)
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
          Nos Réalisations au Sénégal, au Bénin et au Togo
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Découvrez une sélection de nos déploiements récents : éclairage public de voiries communales, stations de pompage hydraulique pour villages et exploitations agricoles, et centrales solaires pour cliniques et entreprises.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg text-xs font-medium">
          {['Tous', 'Sénégal', 'Bénin', 'Togo'].map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountryFilter(country)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedCountryFilter === country
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Domaine :</span>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="p-2 bg-white border border-slate-200 rounded-lg focus:outline-none"
          >
            <option value="all">Tous les secteurs</option>
            <option value="eclairage-solaire">Éclairage solaire</option>
            <option value="eclairage-electrique">Éclairage électrique</option>
            <option value="pompage-solaire">Pompage solaire</option>
            <option value="kits-solaires">Kits solaires</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
          >
            <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
              <img
                src={proj.image}
                alt={proj.titre}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-white px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{proj.ville} · {proj.pays}</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-amber-700">{proj.client}</span>
                  <span className="font-mono">{proj.annee}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900 leading-snug">
                  {proj.titre}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {proj.description}
                </p>

                <div className="pt-3 border-t border-slate-100 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Résultats & Impact :
                  </span>
                  {proj.pointsForts.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Capacité technique</span>
                  <span className="font-mono text-xs font-bold text-slate-900">{proj.capaciteInstallee}</span>
                </div>

                <button
                  onClick={() => setActiveTab('devis')}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                >
                  <span>Projet similaire ? Demander une étude</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
