import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCategory } from '../../types';
import { ProductCard } from '../common/ProductCard';
import {
  Sun,
  Lightbulb,
  Droplet,
  BatteryCharging,
  Cpu,
  Calculator,
  FileText,
  Filter,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface CategoryConfig {
  titre: string;
  soustitre: string;
  description: string;
  icon: any;
  subcategories: string[];
}

const CATEGORY_CONFIGS: Record<ProductCategory, CategoryConfig> = {
  'eclairage-solaire': {
    titre: 'Éclairage Public Solaire',
    soustitre: 'Solutions d’éclairage autonome pour voiries urbaines, autoroutes et zones rurales',
    description: 'DIARRA ENERGIE & BUSINESS fournit des lampadaires solaires monoblocs All-in-One et des candélabres solaires Split à panneau séparé, dimensionnés pour garantir 100% de disponibilité lumineuse 365 nuits par an en Afrique de l’Ouest.',
    icon: Sun,
    subcategories: ['Tous', 'Lampadaires intégrés', 'Lampadaires à panneau séparé', 'Mâts et accessoires']
  },
  'eclairage-electrique': {
    titre: 'Éclairage Public Électrique & LED',
    soustitre: 'Équipements haute performance raccordés au réseau conventionnel',
    description: 'Luminaires de voirie LED à haut rendement énergétique (150 lm/W), projecteurs industriels pour stades, arènes et plates-formes logistiques, et armoires de commande crépusculaires avec parafoudre intégré 10kV.',
    icon: Lightbulb,
    subcategories: ['Tous', 'Luminaires LED voirie', 'Projecteurs extérieurs et industriels']
  },
  'pompage-solaire': {
    titre: 'Pompes Solaires & Systèmes de Forages',
    soustitre: 'Pompage au fil du soleil pour forages profonds, adduction villageoise et irrigation',
    description: 'Nos systèmes de pompage solaire sans batterie utilisent des variateurs MPPT haute fréquence pour alimenter des pompes submersibles en inox 304/316 et des pompes de surface. Idéal pour l’arrosage maraîcher et l’eau potable.',
    icon: Droplet,
    subcategories: ['Tous', 'Pompes solaires immergées', 'Pompes solaires de surface', 'Systèmes de pompage pour forages']
  },
  'kits-solaires': {
    titre: 'Kits Solaires & Systèmes Hybrides',
    soustitre: 'Autonomie énergétique continue pour villas, commerces, cliniques et PME',
    description: 'Solutions complètes prêtes à installer intégrant des onduleurs hybrides pur sinus et des batteries Lithium LiFePO4 de dernière génération (6000 cycles). Protégez vos équipements des microcoupures et réduisez vos factures Senelec / SBEE.',
    icon: BatteryCharging,
    subcategories: ['Tous', 'Kits solaires domestiques', 'Systèmes pour maisons et villas', 'Installations pour entreprises']
  },
  'composants-solaires': {
    titre: 'Panneaux, Batteries, Onduleurs & Accessoires',
    soustitre: 'Composants certifiés pour installateurs, techniciens et professionnels du solaire',
    description: 'Panneaux photovoltaïques monocristallins half-cell Tier-1, batteries LiFePO4 rackables ou murales 48V, onduleurs hybrides MPPT de 3kVA à 15kVA, parafoudres et câblerie certifiée.',
    icon: Cpu,
    subcategories: ['Tous', 'Panneaux photovoltaïques', 'Batteries solaires', 'Onduleurs et régulateurs']
  }
};

export const CategoryPageView: React.FC<{ categoryKey: ProductCategory }> = ({ categoryKey }) => {
  const { products, setActiveTab } = useApp();
  const config = CATEGORY_CONFIGS[categoryKey];
  const Icon = config.icon;

  const [activeSubcat, setActiveSubcat] = useState<string>('Tous');

  // Sizing tool state for Borehole Pump (Article 4.4)
  const [profondeurForage, setProfondeurForage] = useState<number>(60);
  const [hauteurRefoulement, setHauteurRefoulement] = useState<number>(15);
  const [debitJournalier, setDebitJournalier] = useState<number>(30); // m3/jour
  const [calculatedHmt, setCalculatedHmt] = useState<number>(82.5); // (60 + 15) * 1.10
  const [pumpKwEstime, setPumpKwEstime] = useState<number>(1.8);
  const [pvWcEstime, setPvWcEstime] = useState<number>(2700);

  const calculatePumpSpecs = () => {
    // HMT = (profondeur + refoulement) * 1.10 (10% pertes de charge)
    const hmt = (profondeurForage + hauteurRefoulement) * 1.1;
    // Hydraulic energy required: E_hyd = (rho * g * V * HMT) / 3.6e6 kWh
    // With pump efficiency ~ 0.55 and 5.5 peak sun hours in Sahel
    const volumeParHeure = debitJournalier / 5.5;
    const puissanceMoteurKw = (volumeParHeure * hmt * 9.81) / (3600 * 0.55);
    const champPvWc = puissanceMoteurKw * 1000 * 1.35; // 35% oversize for heat & wire losses

    setCalculatedHmt(Math.round(hmt * 10) / 10);
    setPumpKwEstime(Math.round(puissanceMoteurKw * 10) / 10);
    setPvWcEstime(Math.round(champPvWc / 100) * 100);
  };

  const filteredProducts = products.filter((p) => {
    if (p.categorie !== categoryKey) return false;
    if (activeSubcat !== 'Tous' && p.sousCategorie !== activeSubcat) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Category Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Icon className="w-4 h-4" />
            <span className="uppercase tracking-wider">Catalogue DIARRA ENERGIE & BUSINESS</span>
          </div>

          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
            {config.titre}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {config.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('devis')}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Demander un devis sur cette gamme</span>
            </button>
          </div>
        </div>
      </div>

      {/* SPECIAL INTERACTIVE TOOL FOR PUMPS: Article 4.4 Hydraulic Study Calculator */}
      {categoryKey === 'pompage-solaire' && (
        <section className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Calculator className="w-4 h-4 text-amber-700" />
                <span>FORMULAIRE D'ÉTUDE & DIMENSIONNEMENT HYDRAULIQUE (ARTICLE 4.4)</span>
              </div>
              <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900">
                Simulateur de Forage & Calcul de la Hauteur Manométrique Totale (HMT)
              </h2>
              <p className="text-xs text-slate-600">
                Renseignez les données de votre forage pour obtenir le pré-dimensionnement instantané de la pompe et du champ solaire.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Profondeur d'immersion dans le forage (mètres)
              </label>
              <input
                type="number"
                min="5"
                max="250"
                value={profondeurForage}
                onChange={(e) => setProfondeurForage(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              />
              <span className="text-[11px] text-slate-500">Ex: 60m à 90m pour forages sahéliens</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Hauteur de refoulement vers le réservoir (mètres)
              </label>
              <input
                type="number"
                min="0"
                max="80"
                value={hauteurRefoulement}
                onChange={(e) => setHauteurRefoulement(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              />
              <span className="text-[11px] text-slate-500">Hauteur sol du château d'eau ou citerne</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Volume d'eau journalier souhaité (m³/jour)
              </label>
              <input
                type="number"
                min="5"
                max="500"
                value={debitJournalier}
                onChange={(e) => setDebitJournalier(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              />
              <span className="text-[11px] text-slate-500">Ex: 20m³ (maraîchage 1ha), 80m³ (AEP)</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-amber-200/70 flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              onClick={calculatePumpSpecs}
              className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculer le pré-dimensionnement</span>
            </button>

            {/* Calculated Results */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="bg-white px-3 py-1.5 rounded-lg border border-amber-300">
                <span className="text-slate-500">HMT estimée : </span>
                <strong className="text-slate-900 font-mono">{calculatedHmt} m</strong>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-lg border border-amber-300">
                <span className="text-slate-500">Puissance pompe : </span>
                <strong className="text-slate-900 font-mono">{pumpKwEstime} kW ({Math.round(pumpKwEstime * 1.36 * 10) / 10} HP)</strong>
              </div>
              <div className="bg-white px-3 py-1.5 rounded-lg border border-amber-300">
                <span className="text-slate-500">Champ solaire recommandé : </span>
                <strong className="text-slate-900 font-mono">{pvWcEstime} Wc ({Math.ceil(pvWcEstime / 550)}x 550Wc)</strong>
              </div>

              <button
                onClick={() => setActiveTab('devis')}
                className="text-amber-800 font-bold hover:underline"
              >
                Transmettre cette étude au devis →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Subcategory Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <Filter className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
        {config.subcategories.map((subcat) => (
          <button
            key={subcat}
            onClick={() => setActiveSubcat(subcat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeSubcat === subcat
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {subcat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-slate-500">
            Affichage de <span className="font-semibold text-slate-900">{filteredProducts.length}</span> produit(s)
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 text-slate-500 text-sm">
            Aucun équipement ne correspond à cette sous-catégorie pour le moment.
          </div>
        )}
      </div>
    </div>
  );
};
