import React from 'react';
import { useApp } from '../../context/AppContext';
import { DELIVERY_ZONES } from '../../data/mockData';
import { Shield, Truck, FileText, CheckCircle2 } from 'lucide-react';

export const CGVView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          Conditions Générales de Vente (Article 16)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Dernière mise à jour : Octobre 2026 · Conforme au droit commercial général de l’OHADA
        </p>
      </div>

      <div className="prose text-xs text-slate-600 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-sm">Article 1 — Champ d'Application</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent toutes les ventes d'équipements solaires, luminaires d'éclairage public, systèmes de pompage et accessoires conclues par DIARRA ENERGIE & BUSINESS auprès de particuliers, d'entreprises du BTP, d'exploitants agricoles et d'institutions publiques au Sénégal, au Bénin, au Togo et dans la sous-région.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-sm">Article 2 — Commandes et Formations du Contrat</h2>
          <p>
            Toute commande passée via la boutique en ligne fait l'objet d'un accusé de réception électronique avec attribution d'un numéro d'ordre unique sous la référence DEB-CMD-2026-XXXX. Pour les produits signalés « Sur devis », la commande n'est réputée définitive qu'après signature du bon de commande ou du devis chiffré émis par le Bureau d'Études.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-sm">Article 3 — Tarifs et Modalités de Règlement</h2>
          <p>
            Les prix sont libellés en Francs CFA (XOF). Les paiements en ligne sont effectués par des canaux sécurisés agréés (Wave, Orange Money, Moov Money, MTN Mobile Money, Carte Bancaire Visa/Mastercard). Pour les marchés publics et comptes professionnels, un acompte à la commande de 50% peut être exigé, le solde étant réglable à la livraison ou à la mise en service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-sm">Article 4 — Garanties Légales et Contractuelles</h2>
          <p>
            Tous nos équipements bénéficient de garanties constructeur directes : de 2 ans pour les pompes et onduleurs, de 3 à 5 ans pour les lampadaires solaires, de 5 ans pour les batteries LiFePO4, et de 12 à 25 ans de performance linéaire pour les modules photovoltaïques monocristallins.
          </p>
        </section>
      </div>
    </div>
  );
};

export const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          Politique de Confidentialité & Protection des Données (Article 17)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Conformité Commission de Protection des Données Personnelles (CDP Sénégal, APDP Bénin, IPDCP Togo)
        </p>
      </div>

      <div className="prose text-xs text-slate-600 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-sm">1. Données Collectées</h2>
          <p>
            DIARRA ENERGIE & BUSINESS collecte uniquement les données strictement nécessaires au traitement des commandes, à la livraison des chantiers et à l'établissement des devis techniques (Nom, société, téléphone, e-mail, localisation géographique du projet et données techniques de forages/voiries).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-sm">2. Sécurité des Paiements</h2>
          <p>
            Conformément à l'Article 6 du cahier des charges, <strong>aucune coordonnée bancaire ni donnée sensible de paiement n'est stockée</strong> sur les serveurs du site. Les transactions transitent exclusivement par les passerelles bancaires et les opérateurs de Mobile Money certifiés.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-sm">3. Droits des Utilisateurs</h2>
          <p>
            Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles sur simple demande par e-mail à : <code>dpo@diarraenergie.com</code>.
          </p>
        </section>
      </div>
    </div>
  );
};

export const DeliveryPolicyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          Politique de Livraison et de Retour (Article 8 & 18)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Conditions applicables aux matériels standards et équipements volumineux (mâts, générateurs)
        </p>
      </div>

      <div className="space-y-6 text-xs text-slate-600 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-bold text-slate-900 text-sm">1. Grille des Zones Commerciales et Délais Indicatifs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DELIVERY_ZONES.map((zone) => (
              <div key={zone.pays} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-xs block">{zone.pays}</span>
                <p className="text-[11px] text-slate-500">
                  Frais de base locale : <strong>{zone.fraisBaseFCFA} FCFA</strong>
                </p>
                <p className="text-[11px] text-slate-500">
                  Délai moyen constaté : <strong>{zone.delaiMoyen}</strong>
                </p>
                <p className="text-[11px] text-slate-500 border-t border-slate-200 pt-2">
                  Dépôt régional : {zone.agenceLocale}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-sm">2. Équipements Volumineux & Mâts d'Éclairage Public</h2>
          <p>
            Les candélabres, mâts octogonaux de 6m à 12m et fûts de galvanisation nécessitent des semi-remorques à plateau avec autorisation de convoi et chariot élévateur de déchargement. Ces livraisons font l'objet d'une validation préalable des accès au chantier avant le départ de l'entrepôt.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-slate-900 text-sm">3. Retours et SAV</h2>
          <p>
            Tout matériel défectueux sous garantie peut être retourné dans nos agences de Dakar, Cotonou ou Lomé pour expertise en banc d'essai et échange standard ou réparation sous 72h ouvrées.
          </p>
        </section>
      </div>
    </div>
  );
};
