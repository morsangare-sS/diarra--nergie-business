import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wrench,
  Cpu,
  ShieldCheck,
  FileSpreadsheet,
  Headphones,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { setActiveTab } = useApp();

  const services = [
    {
      num: '01',
      titre: 'Études d’Ingénierie & Dimensionnement Solaire',
      description: 'Avant toute mise en œuvre, nos ingénieurs réalisent la note de calcul photovoltaïque et hydraulique : analyse de l’ensoleillement météo local, calcul des pertes thermiques, modélisation des courbes de débit de forage et études photométriques pour l’implantation des candélabres.',
      points: [
        'Logiciels de référence : PVSyst, DIALux, AutoCAD',
        'Bilan de puissance & profil de charge 24h/24',
        'Optimisation du coût du kWh sur 25 ans'
      ]
    },
    {
      num: '02',
      titre: 'Fourniture & Distribution d’Équipements Certifiés',
      description: 'Nous approvisionnons les chantiers publics et privés en lampadaires solaires, modules photovoltaïques Tier-1, onduleurs hybrides industriels, câbles solaires spécifiques et mâts galvanisés aux normes internationales.',
      points: [
        'Stockage tampon permanent à Dakar, Cotonou et Lomé',
        'Contrôle qualité systématique en sortie d’usine',
        'Livraison sur site avec engins de levage et grutage'
      ]
    },
    {
      num: '03',
      titre: 'Installation, Génie Civil & Raccordement',
      description: 'Nos brigades de techniciens électriciens et génie civil prennent en charge l’ensemble des travaux : forage des massifs de candélabres, pose des tiges d’ancrage, installation des colonnes d’exhaure inox en fond de puits, raccordement des armoires électriques.',
      points: [
        'Respect strict des normes d’installation NF C 15-100 et UTE C 15-712',
        'Essais de pression hydraulique et tests d’isolement diélectrique',
        'Raccordement sécurisé réseau ou groupe électrogène'
      ]
    },
    {
      num: '04',
      titre: 'Mise en Service & Paramétrage Intelligent',
      description: 'Configuration fine des contrôleurs MPPT, programmation des scénarios d’éclairage nocturne (allumage automatique au crépuscule, dimming 50% après minuit, détection de présence), et mise en service du monitoring distant via GSM ou WiFi.',
      points: [
        'Étalonnage des seuils de protection batterie',
        'Application mobile de suivi pour le gestionnaire',
        'Procès-verbal de réception technique contradictoire'
      ]
    },
    {
      num: '05',
      titre: 'Contrats de Maintenance Préventive & Curative',
      description: 'Nous proposons des forfaits de maintenance pluriannuels pour collectivités, bailleurs de fonds et gestionnaires d’infrastructures pour garantir la pérennité de l’investissement bien au-delà de la période de garantie.',
      points: [
        'Nettoyage programmé des panneaux solaires (dépoussiérage sahélien)',
        'Contrôle annuel de la résistance de terre parafoudre',
        'Astreinte technique d’intervention rapide sous 24h à 48h'
      ]
    },
    {
      num: '06',
      titre: 'Formation des Techniciens & Transfert de Compétences',
      description: 'Parce qu’une installation durable nécessite des compétences locales, nous formons systématiquement les agents municipaux, les comités de gestion des forages ou les équipes techniques internes du client.',
      points: [
        'Guides d’exploitation simplifiés en français',
        'Ateliers pratiques de diagnostic des pannes de 1er niveau',
        'Attestation de formation technique délivrée'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <div className="border-b border-slate-200 pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
          Prestations Techniques & Accompagnement
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
          Nos Services d’Ingénierie, Pose et Maintenance (Article 8)
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          De l'étude de faisabilité initiale jusqu'à l'exploitation quotidienne, DIARRA ENERGIE & BUSINESS apporte son savoir-faire d'ingénieur électricien et hydraulicien sur l'ensemble de la chaîne de valeur.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((srv) => (
          <div
            key={srv.num}
            className="p-6 bg-white rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <span className="font-mono text-2xl font-black text-amber-500 block">
                {srv.num}
              </span>
              <h2 className="font-heading font-bold text-base text-slate-900">
                {srv.titre}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {srv.description}
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                {srv.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setActiveTab('devis')}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Inclure ce service dans mon devis</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SLA & Maintenance Banner */}
      <div className="p-8 bg-slate-900 text-white rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <h2 className="font-heading font-bold text-xl text-white">
            Vous gérez un parc existant de lampadaires ou de forages en panne ?
          </h2>
          <p className="text-xs text-slate-300">
            Nous réalisons des audits de rétrofit et proposons des contrats de remise à niveau avec remplacement par des batteries lithium LiFePO4 de haute longévité.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('contact')}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shrink-0 transition-colors"
        >
          Demander un audit de parc existant
        </button>
      </div>
    </div>
  );
};
