import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_CONTACTS } from '../../data/mockData';
import { Mail, Phone, MapPin, Shield, Zap, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      {/* Regional Commitment & Value Proposition Strip */}
      <div className="border-b border-slate-900 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-slate-300">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-xs uppercase tracking-wider">Matériel Certifié & Garanti</p>
                <p className="text-xs text-slate-400 mt-1">Normes IEC, CE, TÜV. Garanties directes usine de 2 à 25 ans.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-xs uppercase tracking-wider">Bureau d'Études Dédié</p>
                <p className="text-xs text-slate-400 mt-1">Dimensionnement solaire & hydraulique certifié avant chaque projet.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-xs uppercase tracking-wider">Paiements Locaux Sécurisés</p>
                <p className="text-xs text-slate-400 mt-1">Wave, Orange Money, Moov, MTN MoMo, Carte Bancaire & Virements.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white text-xs uppercase tracking-wider">Présence Régionale Active</p>
                <p className="text-xs text-slate-400 mt-1">Équipes de pose & SAV au Sénégal, au Bénin et au Togo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links - Article 3 Structure (18 rubriques) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Identity & Regional Hubs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-lg">
                ⚡
              </div>
              <span className="font-heading font-extrabold text-white text-base tracking-tight">
                DIARRA ENERGIE & BUSINESS
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Maître d'œuvre et fournisseur d'équipements solaires, éclairage public photovoltaïque et électrique, systèmes de pompage pour forages et kits d'autonomie énergétique en Afrique de l'Ouest.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+221 77 114 95 39 (Dakar) · +229 97 00 00 00 (Cotonou)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>contact@diarraenergie.com</span>
              </div>
            </div>

            {/* Mobile Money Badges */}
            <div className="pt-2">
              <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mb-2">
                Paiements acceptés en ligne
              </p>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-300">
                <span className="bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">Wave</span>
                <span className="bg-orange-950 text-orange-300 px-2 py-0.5 rounded border border-orange-800">Orange Money</span>
                <span className="bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-800">Moov Money</span>
                <span className="bg-yellow-950 text-yellow-300 px-2 py-0.5 rounded border border-yellow-800">MTN MoMo</span>
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">Visa / Mastercard</span>
                <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">Virement OHADA</span>
              </div>
            </div>
          </div>

          {/* Col 2: Solutions Énergétiques (Rubriques 3, 4, 5, 6, 7) */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-xs uppercase tracking-wider">Nos Solutions</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('eclairage-solaire')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  3. Éclairage public solaire
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('eclairage-electrique')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  4. Éclairage public électrique & LED
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('pompage-solaire')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  5. Pompes solaires & Forages
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('kits-solaires')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  6. Kits solaires & Autonomie
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('composants-solaires')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  7. Panneaux, batteries & onduleurs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Métiers & Projets (Rubriques 8, 9, 10, 11, 12) */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-xs uppercase tracking-wider">Expertise & E-Commerce</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  8. Nos services d'ingénierie
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('realisations')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  9. Nos réalisations & références
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('boutique')}
                  className="hover:text-amber-400 transition-colors text-left text-amber-400 font-medium"
                >
                  10. Boutique en ligne
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('devis')}
                  className="hover:text-amber-400 transition-colors text-left text-amber-400 font-medium"
                >
                  11. Demande de devis technique
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('actualites')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  12. Actualités et conseils
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Espace Client & Cadre Légal (Rubriques 13, 14, 15, 16, 17, 18) */}
          <div className="space-y-3">
            <p className="text-white font-semibold text-xs uppercase tracking-wider">Espace Client & Légal</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  13. Contact & Nos Agences
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('compte')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  14. Mon compte & Suivi
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('panier')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  15. Panier et commande
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('cgv')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  16. Conditions Générales de Vente
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('confidentialite')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  17. Politique de confidentialité
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('livraison')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  18. Politique de livraison et retour
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className="text-amber-400 font-semibold hover:underline text-left block pt-1"
                >
                  📄 Cahier des Charges & Architecture v2.0
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 DIARRA ENERGIE & BUSINESS. Tous droits réservés. Registre OHADA.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('admin')}
              className="text-slate-500 hover:text-slate-300 transition-colors"
            >
              Espace d'Administration
            </button>
            <span aria-hidden="true">·</span>
            <span>Sénégal</span>
            <span aria-hidden="true">·</span>
            <span>Bénin</span>
            <span aria-hidden="true">·</span>
            <span>Togo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
