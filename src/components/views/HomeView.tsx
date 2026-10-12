import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import {
  Sun,
  Lightbulb,
  Droplet,
  BatteryCharging,
  Cpu,
  ShieldCheck,
  Wrench,
  ArrowRight,
  FileText,
  ShoppingBag,
  Award,
  Layers,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setActiveTab, products, projects, selectedCountry } = useApp();

  const featuredProducts = products.filter((p) => p.estPhare).slice(0, 4);

  const categories = [
    {
      id: 'eclairage-solaire',
      titre: 'Éclairage Public Solaire',
      description: 'Lampadaires solaires tout-en-un et split pour voiries, autoroutes et collectivités.',
      icon: Sun,
      count: products.filter((p) => p.categorie === 'eclairage-solaire').length
    },
    {
      id: 'eclairage-electrique',
      titre: 'Éclairage Public Électrique & LED',
      description: 'Luminaires de voirie LED réseau, projecteurs industriels et mâts galvanisés.',
      icon: Lightbulb,
      count: products.filter((p) => p.categorie === 'eclairage-electrique').length
    },
    {
      id: 'pompage-solaire',
      titre: 'Pompes Solaires & Forages',
      description: 'Systèmes immergés et de surface pour forages, adduction d’eau (AEP) et irrigation.',
      icon: Droplet,
      count: products.filter((p) => p.categorie === 'pompage-solaire').length
    },
    {
      id: 'kits-solaires',
      titre: 'Kits Solaires & Stockage',
      description: 'Centrales hybrides avec batteries LiFePO4 pour villas, PME et sites isolés.',
      icon: BatteryCharging,
      count: products.filter((p) => p.categorie === 'kits-solaires').length
    },
    {
      id: 'composants-solaires',
      titre: 'Panneaux, Batteries & Onduleurs',
      description: 'Modules photovoltaïques monocristallins, onduleurs hybrides MPPT et protections.',
      icon: Cpu,
      count: products.filter((p) => p.categorie === 'composants-solaires').length
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section: Cinematic Industrial Solar Infrastructure */}
      <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-45">
          <img
            src="/src/assets/images/hero_diarra_solar_1791734623148.jpg"
            alt="Centrale solaire et éclairage public DIARRA ENERGIE"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <span className="uppercase tracking-widest">Maître d’Œuvre & Fournisseur Énergétique</span>
              <span aria-hidden="true">·</span>
              <span>Afrique de l'Ouest</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white text-balance">
              L’Énergie Solaire & l’Éclairage Public de Haute Fiabilité.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              DIARRA ENERGIE & BUSINESS accompagne les collectivités territoriales, entreprises du BTP, agriculteurs et particuliers au <strong className="text-white">Sénégal</strong>, au <strong className="text-white">Bénin</strong>, au <strong className="text-white">Togo</strong> et dans toute la sous-région ouest-africaine.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => setActiveTab('boutique')}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acheter maintenant</span>
              </button>

              <button
                onClick={() => setActiveTab('devis')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 backdrop-blur-sm flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Demander un devis personnalisé</span>
              </button>
            </div>

            {/* Quick Trust Checklist */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Stocks immédiats Dakar, Cotonou, Lomé</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Garanties 2 à 25 ans certifiées usine</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Paiements Wave, Orange Money & CB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Présentation de l'Entreprise (Article 1 & 4.1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-600">
              Qui sommes-nous ?
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
              Un partenaire technique de référence pour vos infrastructures solaires et électriques.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Fondée pour répondre aux défis spécifiques de l'accès à l'eau et de l'électrification durable en Afrique de l'Ouest, <strong>DIARRA ENERGIE & BUSINESS</strong> intervient de l'étude de dimensionnement préalable jusqu'à la mise en service et la maintenance préventive.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Que ce soit pour l'éclairage de grands axes autoroutiers, l'adduction d'eau potable villageoise par forage solaire, ou l'autonomie énergétique complète d'un complexe industriel, nous fournissons des équipements rigoureusement sélectionnés pour résister aux contraintes de chaleur extrême, de poussière latéritique et d'humidité côtière.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-mono text-2xl font-black text-slate-900">+450 kWc</p>
                <p className="text-xs text-slate-500 mt-1">Puissance photovoltaïque déployée</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-mono text-2xl font-black text-slate-900">+1 800</p>
                <p className="text-xs text-slate-500 mt-1">Lampadaires solaires en service</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('a-propos')}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
              >
                <span>Découvrir l'histoire et les engagements de l'entreprise</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-sm aspect-square bg-slate-100">
                <img
                  src="/src/assets/images/product_lampadaire_solaire_1791734634193.jpg"
                  alt="Éclairage public solaire All-In-One"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs">
                <h4 className="font-bold text-amber-950 mb-1">Qualité Sahélienne Éprouvée</h4>
                <p className="text-amber-900">Composants tropicalisés résistant aux températures supérieures à 45°C.</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 bg-slate-900 text-white rounded-xl text-xs space-y-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-white">Bureau d'Ingénierie</h4>
                <p className="text-slate-300">Notes de calcul hydrauliques et photométriques remises sous 48h.</p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm aspect-square bg-slate-100">
                <img
                  src="/src/assets/images/product_pompe_solaire_1791734645113.jpg"
                  alt="Pompe solaire submersible"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Principales Catégories de Produits (Article 4.1) */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
                Domaines d'Intervention
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900">
                Nos 5 Pôles d'Équipements Solaires & Électriques
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('boutique')}
              className="text-xs font-semibold text-slate-900 hover:text-amber-600 flex items-center gap-1.5"
            >
              <span>Accéder au catalogue global</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id as any)}
                  className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-100 text-amber-600 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
                        {cat.titre}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">{cat.count} références</span>
                    <span className="font-semibold text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Consulter les fiches <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Architecture Card Link */}
            <div
              onClick={() => setActiveTab('architecture')}
              className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-xl border border-slate-800 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-base">
                    Dossier d'Architecture Technique v2.0
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Spécifications complètes, architecture logicielle, passerelles de paiement Wave/Orange et modèle de données.
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span>Consulter le rapport technique</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sélection de Produits Disponibles (Article 4.1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              Prêt pour Déploiement Immédiat
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900">
              Sélection d'Équipements Phares
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Disponibles en entrepôt à Dakar, Cotonou et Lomé avec fiches techniques téléchargeables.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('boutique')}
            className="text-xs font-semibold text-slate-900 hover:text-amber-600 flex items-center gap-1.5"
          >
            <span>Voir toute la boutique</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Services d'Installation et Maintenance (Article 4.1 & 8) */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Accompagnement Clé en Main
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              Nos Prestations d'Installation, Pose et Maintenance
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Au-delà de la vente d'équipements, nous mobilisons nos équipes de techniciens électriciens et hydraulicien sur le terrain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-heading font-bold text-white text-base">
                Études & Dimensionnement
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calcul précis des débits de forages, études photométriques DIALux pour voiries, et bilan de puissance complet avant tout engagement budgétaire.
              </p>
            </div>

            <div className="p-6 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-heading font-bold text-white text-base">
                Pose & Raccordement Certifié
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Massifs de fondation pour candélabres, installation de colonnes d'exhaure inox pour forages, montage de structures solaires et armoires de commande.
              </p>
            </div>

            <div className="p-6 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-4">
              <div className="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-heading font-bold text-white text-base">
                Contrats de Maintenance & SAV
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Visites préventives programmées, nettoyage des panneaux, contrôle de l'état de santé (SOH) des batteries LiFePO4 et astreinte technique d'urgence.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Besoin d'une équipe technique pour un marché public ou privé ?
            </span>
            <button
              onClick={() => setActiveTab('services')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Voir les détails de nos services
            </button>
          </div>
        </div>
      </section>

      {/* 6. Nos Réalisations et Projets Récents (Article 4.1 & 9) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              Preuves & Références
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900">
              Projets Réalisés au Sénégal, au Bénin et au Togo
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Des installations concrètes au service des populations et des entreprises.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('realisations')}
            className="text-xs font-semibold text-slate-900 hover:text-amber-600 flex items-center gap-1.5"
          >
            <span>Toutes les réalisations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.titre}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{proj.ville} ({proj.pays})</span>
                    <span aria-hidden="true">·</span>
                    <span>{proj.annee}</span>
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-sm leading-snug">
                    {proj.titre}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Capacité :</span>
                    <span className="font-semibold text-slate-900 font-mono">{proj.capaciteInstallee}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Call To Action Final (Article 4.1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 sm:p-12 text-slate-950 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl space-y-3">
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950">
              Un projet d'éclairage public, de forage solaire ou d'autonomie ?
            </h2>
            <p className="text-sm text-slate-900/90 leading-relaxed">
              Transmettez-nous vos besoins ou votre cahier des charges. Nos ingénieurs vous établissent une proposition technique chiffrée sous 48 heures ouvrées.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={() => setActiveTab('devis')}
              className="px-6 py-3.5 bg-slate-950 hover:bg-slate-900 active:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md"
            >
              Soumettre une demande de devis
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-950 font-bold text-sm rounded-xl border border-slate-300 transition-all shadow-sm"
            >
              Contacter nos agences
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
