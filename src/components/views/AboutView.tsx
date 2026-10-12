import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Zap,
  Globe,
  Award,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Header */}
      <div className="border-b border-slate-200 pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
          Présentation Institutionnelle & Engagements
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
          DIARRA ENERGIE & BUSINESS : L’Énergie Durable au Cœur de l'Afrique de l'Ouest
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Acteur de référence dans la fourniture, l'ingénierie, la pose et la maintenance d'équipements solaires et électriques de haute fiabilité, nous accompagnons la transition énergétique des territoires et des entreprises au Sénégal, au Bénin, au Togo et dans l'espace UEMOA.
        </p>
      </div>

      {/* Vision, Mission, Valeurs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-slate-900">Notre Mission</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Fournir des technologies solaires éprouvées adaptées aux climats tropicaux et sahéliens, garantissant un accès pérenne à l'éclairage nocturne sécurisé et à l'eau de forage sans dépendance aux hydrocarbures.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-slate-900">Notre Vision Régionale</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Devenir le premier guichet ouest-africain de référence pour les donneurs d'ordre publics (mairies, agences d'électrification rurale, ministères) et les acteurs privés (BTP, agro-industries, particuliers).
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-lg text-slate-900">Rigueur & Qualité</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Refus absolu des équipements bas de gamme non certifiés. Tous nos lampadaires, modules photovoltaïques et pompes répondent aux standards internationaux IEC, CE et TÜV avec pièces détachées en stock.
          </p>
        </div>
      </div>

      {/* Tri-Country Presence */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Implantation Géographique Active
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            Présence Directe au Sénégal, au Bénin et au Togo
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Pour assurer des délais d'intervention records et une logistique fluide, nous disposons de représentations commerciales et de dépôts de stockage stratégiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-amber-400">Sénégal</h3>
              <span className="text-[11px] text-slate-400 font-mono">Hub Régional</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Direction générale et grand entrepôt logistique sur la VDN à Dakar. Ateliers de préparation des mâts et bancs de test photométriques.
            </p>
            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-700">
              Zones couvertes : Dakar, Thiès, Mbour, Saint-Louis, Kaolack, Casamance.
            </p>
          </div>

          <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-amber-400">Bénin</h3>
              <span className="text-[11px] text-slate-400 font-mono">Antenne Cotonou</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bureau technique et stock d'équipements de pompage solaire à Cotonou (Haie Vive). Équipe d'intervention mobile pour le Nord et le Centre (Parakou, Borgou).
            </p>
            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-700">
              Zones couvertes : Cotonou, Porto-Novo, Parakou, Bohicon, Natitingou.
            </p>
          </div>

          <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-amber-400">Togo</h3>
              <span className="text-[11px] text-slate-400 font-mono">Antenne Lomé</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Représentation commerciale sur le Boulevard du 13 Janvier à Lomé. Spécialiste des projets d'adduction d'eau et des kits d'autonomie pour PME.
            </p>
            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-700">
              Zones couvertes : Grand Lomé, Région Maritime, Plateaux, Kara, Savanes.
            </p>
          </div>
        </div>
      </div>

      {/* Engagement Qualité & Sav */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600">
            Contrôle & Fiabilité
          </div>
          <h2 className="font-heading font-bold text-2xl text-slate-900">
            Pourquoi les maîtres d'ouvrages nous font confiance
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            En Afrique subsaharienne, de nombreuses installations solaires tombent en panne prématurément par manque d'études thermiques ou à cause de composants contrefaits. Chez <strong>DIARRA ENERGIE & BUSINESS</strong>, chaque projet obéit à une méthodologie stricte :
          </p>

          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Dimensionnement certifié par logiciel spécialisé (PVSyst, DIALux)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Utilisation exclusive de batteries LiFePO4 avec BMS intelligent</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Traçabilité des numéros de série usine et certificats d'origine</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Formation technique offerte des équipes de maintenance locales</span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              onClick={() => setActiveTab('devis')}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-2"
            >
              <span>Soumettre un projet à notre équipe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[4/3]">
          <img
            src="/src/assets/images/hero_diarra_solar_1791734623148.jpg"
            alt="Ingénierie solaire DIARRA ENERGIE"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
