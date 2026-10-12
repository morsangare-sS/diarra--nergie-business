import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { TargetCountry, SENEGAL_REGIONS } from '../../types';
import {
  ShoppingBag,
  FileText,
  Menu,
  X,
  ChevronDown,
  Globe,
  ShieldCheck,
  Lock,
  PhoneCall,
  Search,
  Scale
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    selectedCountry,
    setSelectedCountry,
    currency,
    setCurrency,
    comparisonList,
    quotes,
    isAdminAuthenticated
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rubriquesDropdownOpen, setRubriquesDropdownOpen] = useState(false);

  const pendingQuotesCount = quotes.filter((q) => q.statut === 'recu' || q.statut === 'en_etude').length;

  return (
    <>
      {/* Top Banner: Regional Notice & Contact Quick Line */}
      <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="text-amber-400 font-bold tracking-tight">DIARRA ENERGIE & BUSINESS</span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 hidden lg:inline">Sénégal · Bénin · Togo · Afrique de l'Ouest</span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 text-xs shrink-0">
            {/* Country & Region Switcher */}
            <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-800/90 px-2 sm:px-2.5 py-1 rounded border border-slate-700">
              <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-slate-400 hidden sm:inline">Pays :</span>
              <select
                aria-label="Sélectionner le pays ou la région"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value as TargetCountry)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
              >
                {/* 1. SÉNÉGAL (PAYS D'ORIGINE) EN PREMIER */}
                <option value="Sénégal" className="bg-slate-900 text-amber-300 font-bold">
                  🇸🇳 Sénégal (Pays d'origine)
                </option>

                {/* 2. LES 14 RÉGIONS DU SÉNÉGAL */}
                <optgroup label="── 14 Régions du Sénégal ──" className="bg-slate-900 text-slate-300 font-semibold">
                  {SENEGAL_REGIONS.map((region) => (
                    <option key={region} value={region} className="bg-slate-900 text-white pl-3">
                      🇸🇳 {region} {region === 'Dakar' ? '(Capitale)' : ''}
                    </option>
                  ))}
                </optgroup>

                {/* 3. AUTRES PAYS D'INTERVENTION */}
                <optgroup label="── Autres Pays d'Intervention ──" className="bg-slate-900 text-slate-400 font-semibold">
                  <option value="Bénin" className="bg-slate-900 text-white">🇧🇯 Bénin</option>
                  <option value="Togo" className="bg-slate-900 text-white">🇹🇬 Togo</option>
                  <option value="Sous-Région" className="bg-slate-900 text-white">🌍 Sous-Région</option>
                </optgroup>
              </select>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-slate-800/90 px-2 py-1 rounded border border-slate-700">
              <span className="text-slate-400 hidden sm:inline">Devise :</span>
              <select
                aria-label="Sélectionner la devise"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-transparent text-amber-400 font-bold focus:outline-none cursor-pointer text-xs"
              >
                <option value="XOF" className="bg-slate-900 text-white">FCFA</option>
                <option value="EUR" className="bg-slate-900 text-white">EUR (€)</option>
                <option value="USD" className="bg-slate-900 text-white">USD ($)</option>
              </select>
            </div>

            {/* Direct Tech Assistance */}
            <button
              onClick={() => setActiveTab('contact')}
              className="hidden xl:flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>+221 77 114 95 39</span>
            </button>

            {/* Admin quick toggle - ALIGNED WITH THE RIGHT EDGE (DIRECTLY OVER DEMANDER UN DEVIS) */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-1.5 transition-colors border-l border-slate-700 pl-2.5 sm:pl-3 py-0.5 text-xs ${
                activeTab === 'admin'
                  ? 'text-amber-400 font-bold'
                  : isAdminAuthenticated
                  ? 'text-emerald-400 hover:text-emerald-300 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
              title={isAdminAuthenticated ? "Espace d'Administration (Connecté)" : "Connexion Espace d'Administration (Accès Restreint)"}
            >
              {isAdminAuthenticated ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Lock className="w-3 h-3 text-amber-400 shrink-0" />
              )}
              <span className="font-semibold text-slate-200">Admin</span>
              {isAdminAuthenticated && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
              {pendingQuotesCount > 0 && (
                <span className="bg-amber-400 text-slate-950 font-bold px-1.5 rounded-xs text-[10px]">
                  {pendingQuotesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header complying with Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8 h-20">
            {/* Zone 1: Mobile menu toggle + Brand wordmark */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Mobile Burger Toggle (placed on the left so Demander un Devis remains at the far right) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setActiveTab('accueil')}
                className="flex items-center gap-2.5 text-left group shrink-0"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center text-slate-950 font-extrabold text-xl shadow-xs group-hover:scale-105 transition-transform">
                  ⚡
                </div>
                <div>
                  <span className="font-heading font-extrabold text-base sm:text-xl tracking-tight text-slate-900 whitespace-nowrap block">
                    DIARRA ENERGIE
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 block -mt-1">
                    & BUSINESS
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 2: Concise navigation links fitting properly without overflow */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-medium text-slate-700 shrink min-w-0">
              <button
                onClick={() => setActiveTab('boutique')}
                className={`transition-colors whitespace-nowrap hover:text-amber-600 py-1 ${
                  activeTab === 'boutique' ? 'text-amber-600 font-semibold' : ''
                }`}
              >
                Boutique en Ligne
              </button>

              <button
                onClick={() => setActiveTab('eclairage-solaire')}
                className={`transition-colors whitespace-nowrap hover:text-amber-600 py-1 ${
                  activeTab === 'eclairage-solaire' ? 'text-amber-600 font-semibold' : ''
                }`}
              >
                Éclairage Solaire
              </button>

              <button
                onClick={() => setActiveTab('pompage-solaire')}
                className={`transition-colors whitespace-nowrap hover:text-amber-600 py-1 ${
                  activeTab === 'pompage-solaire' ? 'text-amber-600 font-semibold' : ''
                }`}
              >
                Pompes & Forages
              </button>

              <button
                onClick={() => setActiveTab('kits-solaires')}
                className={`transition-colors whitespace-nowrap hover:text-amber-600 py-1 ${
                  activeTab === 'kits-solaires' ? 'text-amber-600 font-semibold' : ''
                }`}
              >
                Kits & Stockage
              </button>

              <button
                onClick={() => setActiveTab('realisations')}
                className={`transition-colors whitespace-nowrap hover:text-amber-600 py-1 ${
                  activeTab === 'realisations' ? 'text-amber-600 font-semibold' : ''
                }`}
              >
                Nos Réalisations
              </button>

              {/* Rubriques Dropdown for all other Cahier des Charges chapters */}
              <div className="relative">
                <button
                  onClick={() => setRubriquesDropdownOpen(!rubriquesDropdownOpen)}
                  onBlur={() => setTimeout(() => setRubriquesDropdownOpen(false), 200)}
                  className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap py-1 font-medium"
                >
                  <span>Toutes les Rubriques</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {rubriquesDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-1 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                      Équipements & Solutions
                    </div>
                    <button
                      onClick={() => { setActiveTab('eclairage-electrique'); setRubriquesDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-800"
                    >
                      Éclairage Public Électrique & LED
                    </button>
                    <button
                      onClick={() => { setActiveTab('composants-solaires'); setRubriquesDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-800"
                    >
                      Panneaux, Batteries & Onduleurs
                    </button>
                    <button
                      onClick={() => { setActiveTab('services'); setRubriquesDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-800"
                    >
                      Nos Services & Maintenance
                    </button>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <div className="px-3 py-1 font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                      Informations & Entreprise
                    </div>
                    <button
                      onClick={() => { setActiveTab('a-propos'); setRubriquesDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-800"
                    >
                      À Propos de Nous
                    </button>
                    <button
                      onClick={() => { setActiveTab('actualites'); setRubriquesDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-800"
                    >
                      Actualités & Conseils Solaires
                    </button>
                    <button
                      onClick={() => { setActiveTab('contact'); setRubriquesDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-800"
                    >
                      Contact & Agences Régionales
                    </button>
                    <button
                      onClick={() => { setActiveTab('compte'); setRubriquesDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-800"
                    >
                      Mon Compte & Suivi Commandes
                    </button>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <button
                      onClick={() => { setActiveTab('architecture'); setRubriquesDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold"
                    >
                      📋 Dossier Architecture Technique
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Zone 3: Cart & Demander un Devis (STRICTLY ALIGNED WITH ADMIN ABOVE) */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Compare Tray Icon */}
              {comparisonList.length > 0 && (
                <button
                  onClick={() => setActiveTab('boutique')}
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-amber-900 bg-amber-100 rounded-lg hover:bg-amber-200 transition-colors"
                  title="Comparer les équipements"
                >
                  <Scale className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden md:inline">Comparer</span>
                  <span className="font-bold">({comparisonList.length})</span>
                </button>
              )}

              {/* Shopping Bag Button */}
              <button
                onClick={() => setActiveTab('panier')}
                className="relative p-2 sm:p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Voir le panier"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Primary Action Button: Demander un Devis - ALWAYS THE LAST ELEMENT AT THE FAR RIGHT (ALIGNED WITH ADMIN) */}
              <button
                onClick={() => setActiveTab('devis')}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 rounded-lg shadow-xs transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 shrink-0"
              >
                <FileText className="w-4 h-4 text-slate-950" />
                <span>Demander un Devis</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Navigation DIARRA ENERGIE</span>
              <button
                onClick={() => { setActiveTab('architecture'); setMobileMenuOpen(false); }}
                className="text-xs font-semibold text-amber-700 hover:underline"
              >
                Architecture v2.0
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => { setActiveTab('accueil'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-50 font-medium"
              >
                Accueil
              </button>
              <button
                onClick={() => { setActiveTab('boutique'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-50 font-medium text-amber-700"
              >
                Boutique en Ligne
              </button>
              <button
                onClick={() => { setActiveTab('eclairage-solaire'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-50 font-medium"
              >
                Éclairage Solaire
              </button>
              <button
                onClick={() => { setActiveTab('eclairage-electrique'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-50 font-medium"
              >
                Éclairage Électrique
              </button>
              <button
                onClick={() => { setActiveTab('pompage-solaire'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-50 font-medium"
              >
                Pompage & Forages
              </button>
              <button
                onClick={() => { setActiveTab('kits-solaires'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-50 font-medium"
              >
                Kits & Stockage
              </button>
              <button
                onClick={() => { setActiveTab('composants-solaires'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-50 font-medium"
              >
                Panneaux & Onduleurs
              </button>
              <button
                onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-50 font-medium"
              >
                Nos Services
              </button>
              <button
                onClick={() => { setActiveTab('realisations'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-50 font-medium"
              >
                Nos Réalisations
              </button>
              <button
                onClick={() => { setActiveTab('a-propos'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-50 font-medium"
              >
                À Propos
              </button>
              <button
                onClick={() => { setActiveTab('actualites'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-50 font-medium"
              >
                Actualités & Conseils
              </button>
              <button
                onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-50 font-medium"
              >
                Contact & Agences
              </button>
              <button
                onClick={() => { setActiveTab('compte'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-50 font-medium"
              >
                Mon Compte Client
              </button>
              <button
                onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
                className="p-2 text-left rounded bg-slate-900 text-white font-medium flex items-center justify-between"
              >
                <span>Espace Admin</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
