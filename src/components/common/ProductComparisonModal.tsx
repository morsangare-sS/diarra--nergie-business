import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Trash2, ShoppingBag, FileText } from 'lucide-react';

export const ProductComparisonModal: React.FC = () => {
  const {
    comparisonList,
    clearCompare,
    toggleCompare,
    formatPrice,
    addToCart,
    setActiveTab
  } = useApp();

  if (comparisonList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-lg">
              Comparateur d'Équipements Solaires & Électriques
            </h3>
            <p className="text-xs text-slate-500">
              Analyse comparative côte à côte ({comparisonList.length} articles)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-xs text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded hover:bg-rose-50 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Vider le comparateur</span>
            </button>
            <button
              onClick={clearCompare}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <div className="min-w-[650px] divide-y divide-slate-200">
            {/* Products Header Row */}
            <div className="grid grid-cols-5 gap-4 pb-6">
              <div className="text-xs font-semibold text-slate-400 uppercase pt-4">
                Équipement
              </div>
              {comparisonList.map((product) => (
                <div key={product.id} className="space-y-2 relative">
                  <button
                    onClick={() => toggleCompare(product)}
                    className="absolute -top-2 -right-2 p-1 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-rose-600 shadow-xs"
                    title="Retirer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={product.imagePrincipale}
                      alt={product.nom}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 block">
                    {product.reference}
                  </span>
                  <p className="font-heading font-semibold text-xs text-slate-900 line-clamp-2">
                    {product.nom}
                  </p>
                  <p className="font-mono text-sm font-bold text-slate-900">
                    {product.estSurDevis ? 'Sur Devis' : formatPrice(product.prixFCFA)}
                  </p>
                  <button
                    onClick={() => {
                      if (product.estSurDevis) {
                        setActiveTab('devis');
                      } else {
                        addToCart(product, 1);
                      }
                    }}
                    className="w-full py-1.5 px-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold text-[11px] rounded"
                  >
                    {product.estSurDevis ? 'Devis' : 'Commander'}
                  </button>
                </div>
              ))}
              {Array.from({ length: 4 - comparisonList.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center p-6 text-center text-xs text-slate-400"
                >
                  Emplacement libre
                </div>
              ))}
            </div>

            {/* Comparison Metrics */}
            <div className="grid grid-cols-5 gap-4 py-3 text-xs">
              <span className="font-medium text-slate-500">Catégorie</span>
              {comparisonList.map((p) => (
                <span key={p.id} className="text-slate-800">{p.sousCategorie}</span>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-4 py-3 text-xs">
              <span className="font-medium text-slate-500">Puissance</span>
              {comparisonList.map((p) => (
                <span key={p.id} className="font-mono text-slate-800">{p.specs.puissance || '—'}</span>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-4 py-3 text-xs">
              <span className="font-medium text-slate-500">Flux / Débit</span>
              {comparisonList.map((p) => (
                <span key={p.id} className="font-mono text-slate-800">
                  {p.specs.fluxLumineux || p.specs.debitMax || '—'}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-4 py-3 text-xs">
              <span className="font-medium text-slate-500">Batterie / Stockage</span>
              {comparisonList.map((p) => (
                <span key={p.id} className="text-slate-800">
                  {p.specs.batterieCapacite ? `${p.specs.batterieType} (${p.specs.batterieCapacite})` : '—'}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-4 py-3 text-xs">
              <span className="font-medium text-slate-500">Protection IP/IK</span>
              {comparisonList.map((p) => (
                <span key={p.id} className="font-mono text-slate-800">{p.specs.indiceProtection || '—'}</span>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-4 py-3 text-xs">
              <span className="font-medium text-slate-500">Garantie</span>
              {comparisonList.map((p) => (
                <span key={p.id} className="font-semibold text-emerald-700">{p.specs.garantie}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
