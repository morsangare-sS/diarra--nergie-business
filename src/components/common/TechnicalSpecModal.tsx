import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  FileDown,
  ShoppingBag,
  FileText,
  Shield,
  CheckCircle,
  Share2,
  Printer,
  ChevronRight
} from 'lucide-react';

export const TechnicalSpecModal: React.FC = () => {
  const {
    specModalProduct,
    setSpecModalProduct,
    addToCart,
    setActiveTab,
    formatPrice,
    showToast
  } = useApp();

  const [quantity, setQuantity] = useState(1);

  if (!specModalProduct) return null;

  const product = specModalProduct;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    showToast(`Téléchargement de la fiche technique ${product.reference}.pdf initié`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-slate-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-800">
              FICHE TECHNIQUE · {product.reference}
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">
              DIARRA ENERGIE & BUSINESS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
              title="Imprimer la fiche technique"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadPDF}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
              title="Télécharger la fiche PDF"
            >
              <FileDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSpecModalProduct(null)}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Top Section: Media + Commercial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={product.imagePrincipale}
                alt={product.nom}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="text-xs text-slate-500">
                <span>{product.categorie.replace('-', ' ').toUpperCase()}</span>
                <span aria-hidden="true"> · </span>
                <span>{product.sousCategorie}</span>
              </div>

              <h2 className="font-heading font-bold text-slate-900 text-xl sm:text-2xl leading-tight">
                {product.nom}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {product.descriptionDetaillee}
              </p>

              {/* Price & Buying Module */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    {product.estSurDevis ? (
                      <span className="text-base font-bold text-amber-700">
                        Tarif sur devis d'ingénierie
                      </span>
                    ) : (
                      <span className="font-mono text-2xl font-extrabold text-slate-900">
                        {formatPrice(product.prixFCFA)}
                      </span>
                    )}
                    <span className="block text-xs text-slate-500 mt-0.5">
                      {product.stockDisponible > 0
                        ? `Disponible en stock (${product.stockDisponible} unités) · Expédition sous ${product.delaiLivraisonJours}j`
                        : 'Délai d’approvisionnement : 10 à 15 jours'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {!product.estSurDevis && (
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-l-lg text-sm"
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 font-mono text-sm text-slate-900 font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-r-lg text-sm"
                      >
                        +
                      </button>
                    </div>
                  )}

                  {!product.estSurDevis ? (
                    <button
                      onClick={() => {
                        addToCart(product, quantity);
                        setSpecModalProduct(null);
                      }}
                      className="flex-1 py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Ajouter au Panier</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSpecModalProduct(null);
                        setActiveTab('devis');
                      }}
                      className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Demander une Étude & Devis</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-slate-900 text-base border-b border-slate-200 pb-2">
              Caractéristiques Techniques Détaillées
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs">
              {product.specs.puissance && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Puissance nominale</span>
                  <span className="font-medium text-slate-900 font-mono">{product.specs.puissance}</span>
                </div>
              )}
              {product.specs.fluxLumineux && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Flux lumineux</span>
                  <span className="font-medium text-slate-900 font-mono">{product.specs.fluxLumineux}</span>
                </div>
              )}
              {product.specs.panneauSolaire && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Panneau photovoltaïque</span>
                  <span className="font-medium text-slate-900">{product.specs.panneauSolaire}</span>
                </div>
              )}
              {product.specs.batterieType && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Technologie batterie</span>
                  <span className="font-medium text-slate-900">{product.specs.batterieType}</span>
                </div>
              )}
              {product.specs.batterieCapacite && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Capacité & Tension</span>
                  <span className="font-medium text-slate-900 font-mono">{product.specs.batterieCapacite}</span>
                </div>
              )}
              {product.specs.autonomie && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Autonomie en jours sans soleil</span>
                  <span className="font-medium text-slate-900">{product.specs.autonomie}</span>
                </div>
              )}
              {product.specs.debitMax && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Débit hydraulique maximum</span>
                  <span className="font-medium text-slate-900 font-mono">{product.specs.debitMax}</span>
                </div>
              )}
              {product.specs.hmtMax && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Hauteur manométrique (HMT)</span>
                  <span className="font-medium text-slate-900 font-mono">{product.specs.hmtMax}</span>
                </div>
              )}
              {product.specs.profondeurImmersion && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Immersion / Profondeur</span>
                  <span className="font-medium text-slate-900">{product.specs.profondeurImmersion}</span>
                </div>
              )}
              {product.specs.hauteurMat && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Hauteur de mât préconisée</span>
                  <span className="font-medium text-slate-900">{product.specs.hauteurMat}</span>
                </div>
              )}
              {product.specs.indiceProtection && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Indice de protection (IP/IK)</span>
                  <span className="font-medium text-slate-900 font-mono">{product.specs.indiceProtection}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Garantie constructeur</span>
                <span className="font-semibold text-emerald-700">{product.specs.garantie}</span>
              </div>
            </div>
          </div>

          {/* Certifications and Compliance */}
          {product.specs.certifications && (
            <div className="pt-2">
              <span className="text-xs text-slate-500 block mb-2">Normes & Certifications de conformité :</span>
              <div className="flex flex-wrap gap-2">
                {product.specs.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
