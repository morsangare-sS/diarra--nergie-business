import React from 'react';
import {
  Layers,
  Server,
  Database,
  CreditCard,
  Truck,
  ShieldCheck,
  Cpu,
  FileCode,
  Globe,
  Printer,
  CheckCircle2,
  Workflow
} from 'lucide-react';

export const ArchitectureDocView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
          Document d'Ingénierie Logicielle & Cahier des Charges v2.0
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
          Proposition d'Architecture Technique Détaillée — DIARRA ENERGIE & BUSINESS
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Dossier d'architecture système, modèle de données, intégration des passerelles de paiement ouest-africaines (Wave, Orange Money, Moov, MTN), moteur de calcul hydraulique/photométrique et backoffice de gestion.
        </p>
      </div>

      {/* Chapter 1: System Topology */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
        <div className="flex items-center gap-2 text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          <Workflow className="w-5 h-5 text-amber-600" />
          <span>1. Topologie Globale & Pile Technologique (Tech Stack)</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Pour concilier la vitesse de navigation sur mobile (3G/4G en zone périurbaine et rurale au Sénégal, Bénin et Togo), la sécurité des transactions et la maintenabilité à long terme sans développeur permanent (Article 9), l'architecture repose sur une approche modulaire découplée :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-mono text-amber-600 font-bold block">Frontend & Client SPA</span>
            <ul className="space-y-1 text-slate-700">
              <li>• <strong>React 19 + TypeScript</strong> pour la robustesse des typages matériels</li>
              <li>• <strong>Vite 8 & Tailwind CSS 4</strong> pour des temps de chargement &lt; 1.2s</li>
              <li>• <strong>PWA Ready</strong> : mise en cache hors-ligne des fiches techniques</li>
              <li>• Responsive Mobile-First (conforme au seuil de 15% sticky cap)</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-mono text-amber-600 font-bold block">Backend & API Gateway</span>
            <ul className="space-y-1 text-slate-700">
              <li>• <strong>Node.js / Express / Fastify</strong> hébergé sur Cloud Run ou VPS Dockerisé</li>
              <li>• Passerelle d'orchestration de paiements (Wave, Orange, Moov, MTN)</li>
              <li>• Générateur de devis PDF et fiches techniques vectorielles</li>
              <li>• Notifications instantanées Webhook / SMS / WhatsApp Business API</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-mono text-amber-600 font-bold block">Persistance & Données</span>
            <ul className="space-y-1 text-slate-700">
              <li>• <strong>PostgreSQL / Firestore</strong> avec réplication multi-régions</li>
              <li>• Stockage objet S3 / Cloud Storage pour CDC volumineux (plans DWG, PDF)</li>
              <li>• Cache Redis pour le catalogue et les taux de change (XOF/EUR/USD)</li>
              <li>• Chiffrement au repos AES-256 et transit TLS 1.3 obligatoire</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Chapter 2: Payment Integration Specifications (Article 6) */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
        <div className="flex items-center gap-2 text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          <CreditCard className="w-5 h-5 text-amber-600" />
          <span>2. Architecture des Passerelles de Paiement Ouest-Africaines (Article 6)</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          La spécification exige des moyens de paiement adaptés aux marchés ciblés sans stocker les données sensibles. L'architecture intègre un routeur de paiement unifié prenant en charge :
        </p>

        <div className="space-y-4 text-xs">
          <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-sky-950">
              <span>1. Wave Mobile Money (Sénégal & Côte d'Ivoire)</span>
              <span className="font-mono text-[11px] bg-sky-200 px-2 py-0.5 rounded">Frais : ~1%</span>
            </div>
            <p className="text-sky-900">
              Intégration via <strong>Wave Checkout API</strong>. Sur mobile : deep-link ouvrant directement l'application Wave pour confirmation biométrique. Sur ordinateur : affichage dynamique d'un QR code Wave scannable en 3 secondes. Webhook asynchrone sécurisé par signature HMAC <code>X-Wave-Signature</code> basculant la commande en statut <code>payee</code>.
            </p>
          </div>

          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-orange-950">
              <span>2. Orange Money (Sénégal & Sous-région)</span>
              <span className="font-mono text-[11px] bg-orange-200 px-2 py-0.5 rounded">Frais : 1.5% - 2%</span>
            </div>
            <p className="text-orange-900">
              Intégration via l'API <strong>Orange Money Web Payment</strong>. Génération d'un token de transaction avec saisie du code OTP temporaire généré par le client via le code USSD <code>#144#391#</code> (au Sénégal). Traitement synchrone sécurisé avec acquittement instantané.
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-blue-950">
              <span>3. Moov Money Flooz & MTN MoMo (Bénin & Togo)</span>
              <span className="font-mono text-[11px] bg-blue-200 px-2 py-0.5 rounded">Frais : 1.8% - 2.5%</span>
            </div>
            <p className="text-blue-900">
              Intégration directe ou via agrégateur régional agréé (CinetPay / PayDunya / Bizao). Envoi d'une invite Push USSD sur le combiné de l'acheteur lui demandant de taper son code PIN secret pour débiter son compte en Francs CFA.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-slate-950">
              <span>4. Cartes Bancaires (Visa / Mastercard) & Virements OHADA</span>
              <span className="font-mono text-[11px] bg-slate-200 px-2 py-0.5 rounded">3D Secure v2</span>
            </div>
            <p className="text-slate-700">
              Traitement par passerelle bancaire certifiée PCI-DSS Niveau 1 (Stripe, UBA, CBAO). Pour les commandes professionnelles de plus de 5 000 000 FCFA, génération automatique de la facture proforma normalisée avec RIB bancaire et suivi du lettrage en comptabilité.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 3: Technical Calculation Engine (Articles 4.2, 4.4, 7) */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
        <div className="flex items-center gap-2 text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          <Cpu className="w-5 h-5 text-amber-600" />
          <span>3. Moteur Algorithmique de Dimensionnement Hydraulique & Solaire</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Pour automatiser le pré-dimensionnement des projets avant validation par les ingénieurs du Bureau d'Études, le système intègre deux calculateurs mathématiques :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
            <span className="font-bold text-amber-950 block">A. Dimensionnement Forage Solaire (Article 4.4)</span>
            <div className="bg-white p-3 rounded border border-amber-200 font-mono text-[11px] text-slate-800 space-y-1">
              <p>HMT (m) = (Profondeur_immersion + Refoulement) × 1.10</p>
              <p>P_hyd (kW) = (Débit_m3_h × HMT × 9.81) / (3600 × η_pompe)</p>
              <p>Champ_PV (Wc) = P_moteur × 1 000 × 1.35 (Marge Sahel)</p>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Prise en compte du coefficient d'ensoleillement de 5.5 heures équivalent plein soleil (HPS) propre aux latitudes 6°N à 16°N.
            </p>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
            <span className="font-bold text-amber-950 block">B. Éclairage Public Solaire (Article 4.2)</span>
            <div className="bg-white p-3 rounded border border-amber-200 font-mono text-[11px] text-slate-800 space-y-1">
              <p>Espacement_candélabres = Hauteur_mât × 3.5 à 4.0</p>
              <p>Nb_lampadaires = (Longueur_voie_m / Espacement) + 1</p>
              <p>Capacité_LiFePO4 (Wh) = P_LED × Heures_nuit × 1.25</p>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Intégration d'un profil de dimming automatique (100% 19h-23h, 40% avec détection radar 23h-05h, 100% 05h-06h30) assurant 4 nuits d'autonomie.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 4: Database Schema (Articles 5, 7, 9) */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
        <div className="flex items-center gap-2 text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          <Database className="w-5 h-5 text-amber-600" />
          <span>4. Modèle Entités-Associations de la Base de Données</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-1.5">
            <span className="text-amber-400 font-bold block">// Table: Products (Catalogue)</span>
            <p>id: UUID (PK)</p>
            <p>reference: VARCHAR(50) UNIQUE</p>
            <p>nom: VARCHAR(255)</p>
            <p>categorie_id: ENUM</p>
            <p>prix_fcfa: NUMERIC(12, 2)</p>
            <p>est_sur_devis: BOOLEAN</p>
            <p>stock_disponible: INTEGER</p>
            <p>specs_json: JSONB (Watts, Lumens, HMT, LiFePO4)</p>
            <p>pays_disponibilite: TEXT[]</p>
          </div>

          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-1.5">
            <span className="text-amber-400 font-bold block">// Table: Orders (Commandes)</span>
            <p>id: UUID (PK)</p>
            <p>numero_commande: VARCHAR(50) UNIQUE (DEB-CMD-...)</p>
            <p>client_id: UUID (FK)</p>
            <p>total_fcfa: NUMERIC(12, 2)</p>
            <p>statut_commande: ENUM (en_attente, prep, exp, livree)</p>
            <p>statut_paiement: ENUM (paye, en_validation)</p>
            <p>methode_livraison: ENUM (urbaine, fret_mats)</p>
            <p>passerelle_ref: VARCHAR(100) (Wave / OM token)</p>
          </div>

          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-1.5">
            <span className="text-amber-400 font-bold block">// Table: Quotes (Devis Techniques)</span>
            <p>id: UUID (PK)</p>
            <p>numero_devis: VARCHAR(50) UNIQUE (DEB-DEV-...)</p>
            <p>demandeur_nom: VARCHAR(150)</p>
            <p>type_entite: ENUM (mairie, btp, agriculteur, ong)</p>
            <p>pays_projet: VARCHAR(50)</p>
            <p>donnees_techniques_json: JSONB (Forage HMT / Voirie)</p>
            <p>fichiers_joints: TEXT[]</p>
            <p>statut_etude: ENUM (recu, etude, transmis, gagne)</p>
          </div>

          <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-1.5">
            <span className="text-amber-400 font-bold block">// Table: DeliveryZones & Pricing</span>
            <p>id: UUID (PK)</p>
            <p>pays: VARCHAR(50)</p>
            <p>code_iso: CHAR(2) (SN, BJ, TG)</p>
            <p>tarif_base_fcfa: NUMERIC(10, 2)</p>
            <p>supplement_fret_lourd_fcfa: NUMERIC(10, 2)</p>
            <p>depot_local: VARCHAR(255)</p>
          </div>
        </div>
      </section>

      {/* Chapter 5: Maintenance Plan & SLAs */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
        <div className="flex items-center gap-2 text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span>5. Engagement de Maintenance & SLA Post-Mise en Ligne</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Conformément au cahier des charges qui stipule la maintenance obligatoire après mise en ligne, le prestataire garantit :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block">Maintenance Corrective (TTR &lt; 4h)</span>
            <p className="text-slate-600">
              Résolution prioritaire en cas d'incident sur le tunnel de commande, l'API de paiement Wave/Orange ou l'espace d'administration.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block">Sauvegardes Automatiques Quotidiennes</span>
            <p className="text-slate-600">
              Snapshots quotidiens de la base de données répliqués sur 2 régions géographiques distinctes avec rétention de 30 jours.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block">Autonomie Totale de l'Équipe</span>
            <p className="text-slate-600">
              Formation de 2 administrateurs DIARRA ENERGIE pour la gestion autonome des fiches produits, promotions et exports de commandes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
