import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TargetCountry, ProductCategory, SENEGAL_REGIONS } from '../../types';
import {
  FileText,
  Upload,
  CheckCircle2,
  Send,
  Building2,
  MapPin,
  Calendar,
  AlertCircle,
  FileCheck
} from 'lucide-react';

export const QuoteRequestView: React.FC = () => {
  const { createQuote, selectedCountry, setActiveTab } = useApp();

  const [nomComplet, setNomComplet] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [typeEntite, setTypeEntite] = useState<any>('entreprise_btp');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [paysProjet, setPaysProjet] = useState<TargetCountry>(selectedCountry);
  const [villeProjet, setVilleProjet] = useState('');
  const [lieuDit, setLieuDit] = useState('');

  const [typeProjet, setTypeProjet] = useState<ProductCategory | 'projet_mixte'>('eclairage-solaire');
  const [intitule, setIntitule] = useState('');
  const [datePrevisionnelle, setDatePrevisionnelle] = useState('Novembre 2026');
  const [quantiteEstimee, setQuantiteEstimee] = useState(20);
  const [descriptionBesoin, setDescriptionBesoin] = useState('');
  const [consentement, setConsentement] = useState(true);

  // Specific pump fields
  const [debitSouhaite, setDebitSouhaite] = useState(25);
  const [profondeurForage, setProfondeurForage] = useState(65);
  const [hauteurRefoulement, setHauteurRefoulement] = useState(15);
  const [usageEau, setUsageEau] = useState<'irrigation' | 'abreuvement' | 'aep_villageoise' | 'commercial'>('irrigation');

  // Specific lighting fields
  const [longueurVoie, setLongueurVoie] = useState(2.0);
  const [typeVoirie, setTypeVoirie] = useState<'autoroute' | 'boulevard' | 'rue_secondaire' | 'parking' | 'piste_rurale'>('boulevard');
  const [hauteurMat, setHauteurMat] = useState(8);

  // Upload simulation
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [submittedQuoteNumber, setSubmittedQuoteNumber] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileNames = Array.from(e.target.files).map((f) => f.name);
      setAttachedFiles((prev) => [...prev, ...fileNames]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomComplet || !email || !telephone || !villeProjet) {
      alert('Veuillez renseigner tous les champs obligatoires.');
      return;
    }

    if (!consentement) {
      alert('Veuillez accepter le traitement des données pour recevoir votre devis.');
      return;
    }

    const newQuote = createQuote({
      demandeur: {
        nomComplet,
        entreprise: entreprise || undefined,
        typeEntite,
        email,
        telephone,
        whatsapp: whatsapp || telephone,
        paysProjet,
        villeProjet,
        lieuDit: lieuDit || undefined
      },
      projet: {
        typeProjet,
        intitule: intitule || `Demande de devis ${typeProjet} - ${villeProjet}`,
        datePrevisionnelle,
        quantiteEstimee,
        descriptionBesoin,
        pompageData:
          typeProjet === 'pompage-solaire'
            ? {
                debitSouhaiteM3Jour: debitSouhaite,
                profondeurForageM: profondeurForage,
                hauteurRefoulementM: hauteurRefoulement,
                usageEau
              }
            : undefined,
        eclairageData:
          typeProjet === 'eclairage-solaire' || typeProjet === 'eclairage-electrique'
            ? {
                longueurVoieKm: longueurVoie,
                typeVoirie,
                hauteurMatSouhaiteeM: hauteurMat
              }
            : undefined,
        piecesJointesNoms: attachedFiles
      }
    });

    setSubmittedQuoteNumber(newQuote.numeroDevis);
  };

  if (submittedQuoteNumber) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          Demande de Devis Enregistrée !
        </h1>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl max-w-md mx-auto space-y-2">
          <p className="text-xs text-slate-500 uppercase tracking-wider">Référence du dossier technique :</p>
          <p className="font-mono text-2xl font-bold text-amber-600">{submittedQuoteNumber}</p>
          <p className="text-xs text-slate-600">
            Un accusé de réception a été envoyé à <strong>{email}</strong> et sur WhatsApp au <strong>{telephone}</strong>.
          </p>
        </div>

        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Nos ingénieurs technico-commerciaux étudient votre cahier des charges. Vous recevrez une proposition technico-financière détaillée sous 48 heures ouvrées.
        </p>

        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={() => setActiveTab('compte')}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors"
          >
            Suivre mon devis dans l'espace client
          </button>
          <button
            onClick={() => {
              setSubmittedQuoteNumber(null);
              setDescriptionBesoin('');
            }}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded-lg transition-colors"
          >
            Créer une autre demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
          Bureau d'Études Énergétiques & Devis Sur-Mesure
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          Formulaire Officiel de Demande de Devis (Article 7)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complétez ce formulaire pour vos projets d'éclairage public, stations de pompage de forages ou kits d'autonomie industrielle au Sénégal, Bénin, Togo et sous-région.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Identification du Client / Donneur d'Ordre */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>1. Identification du Client & Structure</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-medium text-slate-700 block mb-1">
                Nom complet du contact *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Babacar Ndiaye"
                value={nomComplet}
                onChange={(e) => setNomComplet(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="font-medium text-slate-700 block mb-1">
                Type de structure *
              </label>
              <select
                value={typeEntite}
                onChange={(e) => setTypeEntite(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="collectivite">Collectivité Territoriale / Mairie</option>
                <option value="entreprise_btp">Entreprise du BTP & Génie Civil</option>
                <option value="agriculteur">Exploitant Agricole / GIE</option>
                <option value="ong">ONG / Projet de Développement</option>
                <option value="particulier">Particulier (Villa / Domaine)</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-slate-700 block mb-1">
                Entreprise / Mairie / Raison sociale
              </label>
              <input
                type="text"
                placeholder="Ex: SENELEC BTP / Commune de Parakou"
                value={entreprise}
                onChange={(e) => setEntreprise(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="font-medium text-slate-700 block mb-1">
                Adresse e-mail professionnelle *
              </label>
              <input
                type="email"
                required
                placeholder="Ex: direction@projet.sn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="font-medium text-slate-700 block mb-1">
                Numéro de téléphone direct *
              </label>
              <input
                type="tel"
                required
                placeholder="Ex: +221 77 123 45 67"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="font-medium text-slate-700 block mb-1">
                Numéro WhatsApp (pour réception rapide)
              </label>
              <input
                type="tel"
                placeholder="Ex: +221 77 123 45 67"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Localisation du Projet */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>2. Localisation Géographique du Projet</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-medium text-slate-700 block mb-1">
                Pays / Région d'exécution *
              </label>
              <select
                value={paysProjet}
                onChange={(e) => {
                  const val = e.target.value as TargetCountry;
                  setPaysProjet(val);
                  if (SENEGAL_REGIONS.includes(val as any) && !villeProjet) {
                    setVilleProjet(val);
                  }
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer text-xs"
              >
                <option value="Sénégal" className="font-bold text-amber-800">
                  🇸🇳 Sénégal (Pays d'origine - Siège)
                </option>

                <optgroup label="── 14 Régions du Sénégal ──">
                  {SENEGAL_REGIONS.map((region) => (
                    <option key={region} value={region}>
                      🇸🇳 Sénégal — Région de {region}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="── Autres Pays d'Intervention ──">
                  <option value="Bénin">🇧🇯 Bénin</option>
                  <option value="Togo">🇹🇬 Togo</option>
                  <option value="Sous-Région">🌍 Autre pays de la Sous-Région</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="font-medium text-slate-700 block mb-1">
                Ville ou Commune *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Saint-Louis, Cotonou, Kara..."
                value={villeProjet}
                onChange={(e) => setVilleProjet(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="font-medium text-slate-700 block mb-1">
                Lieu-dit ou coordonnées GPS
              </label>
              <input
                type="text"
                placeholder="Ex: Route nationale 2, PK 45"
                value={lieuDit}
                onChange={(e) => setLieuDit(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Caractéristiques Techniques & Besoins */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            <FileText className="w-4 h-4 text-amber-600" />
            <span>3. Spécifications & Données Techniques du Projet</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-medium text-slate-700 block mb-1">
                Catégorie d'équipement concernée *
              </label>
              <select
                value={typeProjet}
                onChange={(e) => setTypeProjet(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="eclairage-solaire">Éclairage public solaire</option>
                <option value="eclairage-electrique">Éclairage public électrique & LED</option>
                <option value="pompage-solaire">Pompes solaires & Forages</option>
                <option value="kits-solaires">Kits solaires & Stockage hybride</option>
                <option value="composants-solaires">Panneaux, batteries, onduleurs en gros</option>
                <option value="projet_mixte">Projet mixte d'électrification rurale</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-slate-700 block mb-1">
                Quantité estimée (lampadaires, pompes, kits) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={quantiteEstimee}
                onChange={(e) => setQuantiteEstimee(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="font-medium text-slate-700 block mb-1">
                Date prévisionnelle de déploiement
              </label>
              <input
                type="text"
                placeholder="Ex: Décembre 2026"
                value={datePrevisionnelle}
                onChange={(e) => setDatePrevisionnelle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Conditional Pump Fields */}
          {typeProjet === 'pompage-solaire' && (
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg space-y-3 text-xs">
              <span className="font-bold text-amber-950 block">
                Paramètres hydrauliques du forage (Article 4.4) :
              </span>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1">Débit souhaité (m³/jour)</label>
                  <input
                    type="number"
                    value={debitSouhaite}
                    onChange={(e) => setDebitSouhaite(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Profondeur forage (m)</label>
                  <input
                    type="number"
                    value={profondeurForage}
                    onChange={(e) => setProfondeurForage(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Refoulement cuve (m)</label>
                  <input
                    type="number"
                    value={hauteurRefoulement}
                    onChange={(e) => setHauteurRefoulement(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Usage prioritaire de l'eau</label>
                  <select
                    value={usageEau}
                    onChange={(e) => setUsageEau(e.target.value as any)}
                    className="w-full p-2 bg-white border border-slate-300 rounded cursor-pointer"
                  >
                    <option value="irrigation">Irrigation maraîchère</option>
                    <option value="abreuvement">Abreuvement bétail</option>
                    <option value="aep_villageoise">Adduction Eau Potable (AEP)</option>
                    <option value="commercial">Usage industriel/commercial</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Conditional Lighting Fields */}
          {(typeProjet === 'eclairage-solaire' || typeProjet === 'eclairage-electrique') && (
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg space-y-3 text-xs">
              <span className="font-bold text-amber-950 block">
                Paramètres de voirie (Article 4.2 & 4.3) :
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1">Longueur de voie (km)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={longueurVoie}
                    onChange={(e) => setLongueurVoie(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Type de voirie</label>
                  <select
                    value={typeVoirie}
                    onChange={(e) => setTypeVoirie(e.target.value as any)}
                    className="w-full p-2 bg-white border border-slate-300 rounded cursor-pointer"
                  >
                    <option value="autoroute">Autoroute / Voie rapide</option>
                    <option value="boulevard">Boulevard urbain principal</option>
                    <option value="rue_secondaire">Rue secondaire / Lotissement</option>
                    <option value="piste_rurale">Piste rurale / Village</option>
                    <option value="parking">Parking & Zone logistique</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Hauteur de mât souhaitée</label>
                  <select
                    value={hauteurMat}
                    onChange={(e) => setHauteurMat(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-slate-300 rounded cursor-pointer"
                  >
                    <option value={6}>6 mètres (Rues, villages)</option>
                    <option value={8}>8 mètres (Boulevards, avenues standard)</option>
                    <option value={10}>10 mètres (Autoroutes, grands carrefours)</option>
                    <option value={12}>12 mètres (Aires industrielles, ports)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="font-medium text-slate-700 block mb-1 text-xs">
              Description détaillée du besoin ou extrait du cahier des charges *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Précisez le contexte, les contraintes de sol, les exigences de garantie, l'inclusion de la pose/génie civil..."
              value={descriptionBesoin}
              onChange={(e) => setDescriptionBesoin(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-xs"
            />
          </div>

          {/* Document Upload (Article 7: Pièces jointes) */}
          <div className="pt-2">
            <label className="font-medium text-slate-700 block mb-1 text-xs">
              Joindre un fichier technique (Cahier des charges, plan, relevé forage PDF, DWG, DOCX)
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:bg-slate-50 transition-colors">
              <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
              <label className="text-xs font-semibold text-amber-700 hover:underline cursor-pointer">
                <span>Cliquez pour sélectionner un document</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-slate-400 mt-1">Formats acceptés : PDF, Word, Excel, ZIP (Max 25 Mo)</p>
            </div>

            {attachedFiles.length > 0 && (
              <div className="mt-2 space-y-1">
                {attachedFiles.map((name, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="truncate">{name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Consentement & Envoi */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={consentement}
              onChange={(e) => setConsentement(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
            />
            <span>
              J’accepte que DIARRA ENERGIE & BUSINESS traite mes coordonnées afin d’établir et de me transmettre cette proposition technique et commerciale, conformément à la réglementation sur la protection des données personnelles.
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>Transmettre ma demande de devis au Bureau d'Études</span>
          </button>
        </div>
      </form>
    </div>
  );
};
