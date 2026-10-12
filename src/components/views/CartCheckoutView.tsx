import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TargetCountry, DeliveryMethod, PaymentMethod, Order, SENEGAL_REGIONS } from '../../types';
import { DELIVERY_ZONES } from '../../data/mockData';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  MapPin,
  FileCheck,
  ArrowLeft
} from 'lucide-react';

export const CartCheckoutView: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotalFCFA,
    formatPrice,
    selectedCountry,
    createOrder,
    setActiveTab
  } = useApp();

  const [step, setStep] = useState<'panier' | 'coordonnees' | 'paiement' | 'confirmation'>('panier');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Customer Coordinates
  const [nomComplet, setNomComplet] = useState('');
  const [raisonSociale, setRaisonSociale] = useState('');
  const [typeClient, setTypeClient] = useState<'particulier' | 'entreprise' | 'collectivite'>('entreprise');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [pays, setPays] = useState<TargetCountry>(selectedCountry);
  const [ville, setVille] = useState('Dakar');
  const [adresseLivraison, setAdresseLivraison] = useState('');
  const [instructionsLivraison, setInstructionsLivraison] = useState('');
  const [numeroFiscal, setNumeroFiscal] = useState('');

  // Delivery & Payment
  const [methodeLivraison, setMethodeLivraison] = useState<DeliveryMethod>('livraison_urbaine');
  const [moyenPaiement, setMoyenPaiement] = useState<PaymentMethod>('wave');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Delivery cost calculation
  const isSenegal = pays === 'Sénégal' || SENEGAL_REGIONS.includes(pays as any);
  const currentZone = isSenegal ? DELIVERY_ZONES[0] : (DELIVERY_ZONES.find((z) => z.pays === pays) || DELIVERY_ZONES[0]);
  const calculateShipping = (): number => {
    if (cart.length === 0) return 0;
    if (methodeLivraison === 'retrait_agence') return 0;

    // Check if bulky (mâts or stations)
    const hasBulky = cart.some(
      (item) => item.product.sousCategorie.includes('Mâts') || item.product.prixFCFA > 2000000
    );

    if (methodeLivraison === 'fret_lourd_mats') {
      return hasBulky ? 45000 : 25000;
    }

    if (methodeLivraison === 'transporteur_interurbain') {
      return currentZone.fraisBaseFCFA * 2;
    }

    // Default urbaine
    return currentZone.fraisBaseFCFA;
  };

  const fraisLivraison = calculateShipping();
  const subtotalWithDiscount = cartTotalFCFA * (1 - discountPercent / 100);
  const totalGeneral = subtotalWithDiscount + fraisLivraison;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SOLAR2026') {
      setDiscountPercent(5);
      alert('Code promotionnel SOLAR2026 appliqué : -5% accordés !');
    } else {
      alert('Code promotionnel invalide ou expiré.');
    }
  };

  const handleConfirmOrder = () => {
    if (!nomComplet || !email || !telephone || !adresseLivraison) {
      alert('Veuillez renseigner les coordonnées de livraison complètes.');
      setStep('coordonnees');
      return;
    }

    const newOrder = createOrder({
      client: {
        nomComplet,
        raisonSociale: raisonSociale || undefined,
        typeClient,
        email,
        telephone,
        numeroWhatsapp: whatsapp || telephone,
        pays,
        ville,
        adresseLivraison,
        instructionsLivraison: instructionsLivraison || undefined,
        numeroFiscal: numeroFiscal || undefined
      },
      articles: cart.map((item) => ({
        productId: item.product.id,
        reference: item.product.reference,
        nom: item.product.nom,
        prixUnitaireFCFA: item.product.prixFCFA,
        quantite: item.quantity,
        totalLigneFCFA: item.product.prixFCFA * item.quantity
      })),
      sousTotalFCFA: subtotalWithDiscount,
      fraisLivraisonFCFA: fraisLivraison,
      totalFCFA: totalGeneral,
      methodeLivraison,
      moyenPaiement
    });

    setConfirmedOrder(newOrder);
    setStep('confirmation');
  };

  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-slate-900">
          Votre panier d'achat est vide
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Découvrez nos lampadaires solaires, pompes de forage et kits solaires complets disponibles en stock immédiat.
        </p>
        <button
          onClick={() => setActiveTab('boutique')}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all"
        >
          Découvrir les équipements
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Checkout Progress Stepper */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          {step === 'confirmation' ? 'Confirmation de votre Commande' : 'Panier & Tunnel de Commande Sécurisé'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Zone de livraison : {pays} · Transactions protégées conformes OHADA
        </p>

        {step !== 'confirmation' && (
          <div className="flex items-center gap-3 sm:gap-6 mt-6 text-xs font-semibold">
            <button
              onClick={() => setStep('panier')}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                step === 'panier'
                  ? 'border-amber-500 text-slate-900'
                  : 'border-transparent text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[11px]">1</span>
              <span>Panier</span>
            </button>

            <button
              onClick={() => setStep('coordonnees')}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                step === 'coordonnees'
                  ? 'border-amber-500 text-slate-900'
                  : 'border-transparent text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[11px]">2</span>
              <span>Coordonnées & Livraison</span>
            </button>

            <button
              onClick={() => {
                if (nomComplet && email && telephone && adresseLivraison) {
                  setStep('paiement');
                } else {
                  alert('Veuillez renseigner vos coordonnées avant le paiement.');
                  setStep('coordonnees');
                }
              }}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                step === 'paiement'
                  ? 'border-amber-500 text-slate-900'
                  : 'border-transparent text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[11px]">3</span>
              <span>Moyen de Paiement</span>
            </button>
          </div>
        )}
      </div>

      {/* Step 1: Panier */}
      {step === 'panier' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Table */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900">
                Articles sélectionnés ({cart.length})
              </span>
              <button
                onClick={clearCart}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Vider le panier</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src={item.product.imagePrincipale}
                        alt={item.product.nom}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-slate-400 block">
                        {item.product.reference}
                      </span>
                      <h3 className="font-heading font-semibold text-xs sm:text-sm text-slate-900 max-w-sm">
                        {item.product.nom}
                      </h3>
                      <span className="font-mono text-xs text-slate-600 block mt-1">
                        {formatPrice(item.product.prixFCFA)} / unité
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 rounded-l-lg text-xs"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-mono text-xs font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 rounded-r-lg text-xs"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-mono tabular-nums font-bold text-sm text-slate-900 block">
                        {formatPrice(item.product.prixFCFA * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[11px] text-rose-600 hover:underline mt-0.5"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Strip */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-600">Vous disposez d'un code promotionnel ou partenaire ?</span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Code promo (ex: SOLAR2026)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="p-2 border border-slate-300 rounded-lg bg-white focus:outline-none uppercase text-xs"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>

          {/* Cart Summary Card */}
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <h2 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Récapitulatif de la Commande
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Sous-total articles :</span>
                <span className="font-mono text-slate-900">{formatPrice(cartTotalFCFA)}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Remise partenaire ({discountPercent}%) :</span>
                  <span className="font-mono">-{formatPrice(cartTotalFCFA * (discountPercent / 100))}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Frais de livraison estimés ({pays}) :</span>
                <span className="font-mono text-slate-900">{formatPrice(fraisLivraison)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
              <span className="font-bold text-slate-900 text-sm">Total Estimé :</span>
              <span className="font-mono text-xl font-extrabold text-slate-900">
                {formatPrice(totalGeneral)}
              </span>
            </div>

            <button
              onClick={() => setStep('coordonnees')}
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Continuer vers la livraison</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Coordonnées & Livraison */}
      {step === 'coordonnees' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <h2 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Informations de Livraison & Facturation (Article 5.3)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Type de client *</label>
                <select
                  value={typeClient}
                  onChange={(e) => setTypeClient(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="entreprise">Entreprise / Société / BTP</option>
                  <option value="collectivite">Collectivité Territoriale / Mairie</option>
                  <option value="particulier">Particulier</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Nom et Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Cheikh Tidiane Gueye"
                  value={nomComplet}
                  onChange={(e) => setNomComplet(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Raison Sociale</label>
                <input
                  type="text"
                  placeholder="Ex: Sahel Ingénierie SARL"
                  value={raisonSociale}
                  onChange={(e) => setRaisonSociale(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Numéro Fiscal (NINEA / IFU / RCCM)</label>
                <input
                  type="text"
                  placeholder="Pour émission facture normalisée"
                  value={numeroFiscal}
                  onChange={(e) => setNumeroFiscal(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Téléphone de livraison *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: +221 77 114 95 39"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Adresse E-mail *</label>
                <input
                  type="email"
                  required
                  placeholder="Ex: c.gueye@saheling.sn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            {/* Geographical Zones (Article 8) */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <span className="font-bold text-xs text-slate-900 block">
                Destination géographique & Mode de livraison (Article 8)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Pays / Région de livraison *</label>
                  <select
                    value={pays}
                    onChange={(e) => {
                      const val = e.target.value as TargetCountry;
                      setPays(val);
                      if (SENEGAL_REGIONS.includes(val as any)) {
                        setVille(val);
                      }
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
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
                  <label className="font-medium text-slate-700 block mb-1">Ville de livraison *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Dakar, Thiès, Cotonou, Lomé..."
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1 text-xs">
                  Adresse précise de livraison ou chantier *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Quartier, rue, repère connu, code porte..."
                  value={adresseLivraison}
                  onChange={(e) => setAdresseLivraison(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              {/* Delivery Methods Selection */}
              <div className="space-y-2 pt-2 text-xs">
                <label className="font-medium text-slate-700 block">Mode de transport :</label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setMethodeLivraison('livraison_urbaine')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      methodeLivraison === 'livraison_urbaine'
                        ? 'border-amber-500 bg-amber-50/50'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span>Livraison Urbaine Locale</span>
                      <span className="font-mono">{formatPrice(currentZone.fraisBaseFCFA)}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Délai : 24h à 48h ouvrées</p>
                  </div>

                  <div
                    onClick={() => setMethodeLivraison('retrait_agence')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      methodeLivraison === 'retrait_agence'
                        ? 'border-amber-500 bg-amber-50/50'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span>Retrait en Agence DIARRA</span>
                      <span className="text-emerald-700 font-bold">Gratuit</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Disponible immédiatement en dépôt</p>
                  </div>

                  <div
                    onClick={() => setMethodeLivraison('transporteur_interurbain')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      methodeLivraison === 'transporteur_interurbain'
                        ? 'border-amber-500 bg-amber-50/50'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span>Transporteur Régional</span>
                      <span className="font-mono">{formatPrice(currentZone.fraisBaseFCFA * 2)}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Vers l'intérieur du pays (48h-72h)</p>
                  </div>

                  <div
                    onClick={() => setMethodeLivraison('fret_lourd_mats')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      methodeLivraison === 'fret_lourd_mats'
                        ? 'border-amber-500 bg-amber-50/50'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span>Fret Spécial Mâts & Équipements Lourds</span>
                      <span className="font-mono">{formatPrice(45000)}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Camion grue et manutention chantier</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep('panier')}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Retour au panier</span>
              </button>

              <button
                onClick={() => {
                  if (!nomComplet || !email || !telephone || !adresseLivraison) {
                    alert('Veuillez remplir les informations obligatoires de livraison.');
                    return;
                  }
                  setStep('paiement');
                }}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
              >
                <span>Passer au paiement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200 text-xs space-y-3">
            <span className="font-bold text-slate-900 block text-sm">Récapitulatif</span>
            <div className="flex justify-between text-slate-600">
              <span>Articles ({cart.length}) :</span>
              <span className="font-mono text-slate-900">{formatPrice(subtotalWithDiscount)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Livraison ({pays}) :</span>
              <span className="font-mono text-slate-900">{formatPrice(fraisLivraison)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
              <span>Total :</span>
              <span className="font-mono">{formatPrice(totalGeneral)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Moyen de Paiement (Article 6) */}
      {step === 'paiement' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 space-y-6">
            <h2 className="font-heading font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
              Moyens de Paiement Adaptés à l'Afrique de l'Ouest (Article 6)
            </h2>

            <p className="text-xs text-slate-600">
              Choisissez votre modalité de règlement. Les passerelles de paiement partenaires garantissent la sécurité et la traçabilité de votre transaction.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Wave */}
              <div
                onClick={() => setMoyenPaiement('wave')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  moyenPaiement === 'wave'
                    ? 'border-sky-500 bg-sky-50/60 shadow-xs ring-1 ring-sky-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sky-950">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-sky-500 text-white flex items-center justify-center text-xs font-black">W</span>
                    <span>Wave Mobile Money</span>
                  </div>
                  <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded">0% frais</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Paiement instantané par QR code ou notification mobile au Sénégal & Côte d'Ivoire.
                </p>
              </div>

              {/* Orange Money */}
              <div
                onClick={() => setMoyenPaiement('orange_money')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  moyenPaiement === 'orange_money'
                    ? 'border-orange-500 bg-orange-50/60 shadow-xs ring-1 ring-orange-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-orange-950">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-orange-500 text-white flex items-center justify-center text-xs font-black">OM</span>
                    <span>Orange Money</span>
                  </div>
                  <span className="text-[10px] bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">Validation OTP</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Code secret et confirmation par SMS sur votre mobile Orange.
                </p>
              </div>

              {/* Moov Money */}
              <div
                onClick={() => setMoyenPaiement('moov_money')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  moyenPaiement === 'moov_money'
                    ? 'border-blue-500 bg-blue-50/60 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-blue-950">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center text-xs font-black">M</span>
                    <span>Moov Money Flooz</span>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Bénin / Togo</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Idéal pour les règlements au Bénin, au Togo et au Burkina Faso.
                </p>
              </div>

              {/* MTN Momo */}
              <div
                onClick={() => setMoyenPaiement('mtn_momo')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  moyenPaiement === 'mtn_momo'
                    ? 'border-yellow-500 bg-yellow-50/60 shadow-xs ring-1 ring-yellow-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-yellow-950">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-yellow-400 text-slate-900 flex items-center justify-center text-xs font-black">MTN</span>
                    <span>MTN Mobile Money</span>
                  </div>
                  <span className="text-[10px] bg-yellow-100 text-yellow-900 px-1.5 py-0.5 rounded">Bénin</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Validation push USSD sur votre téléphone MTN.
                </p>
              </div>

              {/* Carte Bancaire */}
              <div
                onClick={() => setMoyenPaiement('carte_bancaire')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  moyenPaiement === 'carte_bancaire'
                    ? 'border-slate-900 bg-slate-50 shadow-xs ring-1 ring-slate-900'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-slate-950">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-slate-800" />
                    <span>Carte Bancaire Visa / Mastercard</span>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded">3D Secure</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Cartes bancaires émises par toutes les banques de l'UEMOA et internationales.
                </p>
              </div>

              {/* Virement bancaire / Modalités pro */}
              <div
                onClick={() => setMoyenPaiement('virement_bancaire')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  moyenPaiement === 'virement_bancaire'
                    ? 'border-slate-900 bg-slate-50 shadow-xs ring-1 ring-slate-900'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-slate-950">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-slate-800" />
                    <span>Virement Bancaire / Modalités B2B</span>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded">Sur Facture</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Émission de facture proforma et RIB bancaire CBAO, BOA, Ecobank.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">Total net à régler :</span>
              <span className="font-mono text-xl font-black text-slate-900">
                {formatPrice(totalGeneral)}
              </span>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep('coordonnees')}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Modifier les coordonnées</span>
              </button>

              <button
                onClick={handleConfirmOrder}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Valider et Payer la Commande</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 text-xs">
            <span className="font-bold text-slate-900 block text-sm">Garanties de Paiement</span>
            <p className="text-slate-600 leading-relaxed">
              Conformément à l'Article 6 du cahier des charges, aucune coordonnée bancaire sensible n'est conservée. Les règlements sont sécurisés par protocoles cryptés SSL / 3D-Secure.
            </p>
            <div className="space-y-1 pt-2 border-t border-slate-200 text-slate-500">
              <p>Livraison à : <strong>{nomComplet || 'En attente'}</strong></p>
              <p>Ville : <strong>{ville} ({pays})</strong></p>
              <p>Contact : <strong>{telephone || 'En attente'}</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation (Article 5.3) */}
      {step === 'confirmation' && confirmedOrder && (
        <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">
              Commande Enregistrée avec Succès !
            </h2>
            <p className="text-xs text-slate-500">
              Merci pour votre confiance en DIARRA ENERGIE & BUSINESS.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-center">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">Numéro de Commande Officiel :</span>
            <span className="font-mono text-2xl font-bold text-amber-600 block">
              {confirmedOrder.numeroCommande}
            </span>
            <span className="text-xs text-slate-600 block">
              Un e-mail de confirmation et un SMS ont été adressés à {confirmedOrder.client.email}.
            </span>
          </div>

          {/* Itemized Order Recap */}
          <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
            <h3 className="font-bold text-slate-900">Détail des matériels commandés :</h3>
            <div className="divide-y divide-slate-100">
              {confirmedOrder.articles.map((item, idx) => (
                <div key={idx} className="py-2 flex justify-between">
                  <div>
                    <span className="font-semibold text-slate-900">{item.nom}</span>
                    <span className="text-slate-500 block">Réf : {item.reference} · Quantité : {item.quantite}x</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">
                    {formatPrice(item.totalLigneFCFA)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
              <span>Montant Total Réglé :</span>
              <span className="font-mono text-base">{formatPrice(confirmedOrder.totalFCFA)}</span>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setActiveTab('compte')}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Suivre l'état de ma commande
            </button>
            <button
              onClick={() => setActiveTab('boutique')}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors"
            >
              Continuer mes achats
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
