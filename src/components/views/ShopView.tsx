import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { ProductCategory, TargetCountry, SENEGAL_REGIONS } from '../../types';
import { Search, Filter, SlidersHorizontal, RotateCcw, Scale } from 'lucide-react';

export const ShopView: React.FC = () => {
  const { products, selectedCountry, comparisonList, clearCompare } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyDirectBuy, setOnlyDirectBuy] = useState(false);
  const [sortBy, setSortBy] = useState<'populaire' | 'prix-asc' | 'prix-desc'>('populaire');
  const [maxPrice, setMaxPrice] = useState<number>(10000000);

  const categories = [
    { id: 'all', label: 'Toutes les catégories' },
    { id: 'eclairage-solaire', label: 'Éclairage Public Solaire' },
    { id: 'eclairage-electrique', label: 'Éclairage Public Électrique & LED' },
    { id: 'pompage-solaire', label: 'Pompes Solaires & Forages' },
    { id: 'kits-solaires', label: 'Kits Solaires & Stockage' },
    { id: 'composants-solaires', label: 'Panneaux, Batteries & Onduleurs' }
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.nom.toLowerCase().includes(q);
          const matchRef = p.reference.toLowerCase().includes(q);
          const matchDesc = p.descriptionCourte.toLowerCase().includes(q);
          if (!matchName && !matchRef && !matchDesc) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && p.categorie !== selectedCategory) {
          return false;
        }

        // In stock
        if (onlyInStock && p.stockDisponible <= 0) {
          return false;
        }

        // Only direct buy
        if (onlyDirectBuy && p.estSurDevis) {
          return false;
        }

        // Price ceiling (for direct products)
        if (!p.estSurDevis && p.prixFCFA > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'prix-asc') return a.prixFCFA - b.prixFCFA;
        if (sortBy === 'prix-desc') return b.prixFCFA - a.prixFCFA;
        return (b.estPhare ? 1 : 0) - (a.estPhare ? 1 : 0);
      });
  }, [products, searchQuery, selectedCategory, onlyInStock, onlyDirectBuy, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setOnlyInStock(false);
    setOnlyDirectBuy(false);
    setMaxPrice(10000000);
    setSortBy('populaire');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
          Boutique Officielle DIARRA ENERGIE & BUSINESS
        </div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
          Catalogue & Vente en Ligne d'Équipements Énergétiques
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Achetez directement vos équipements certifiés ou demandez une étude technique pour vos projets d'infrastructure.
        </p>
      </div>

      {/* Search & Main Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Rechercher par désignation, référence (ex: SL-100, PUMP, KIT)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              aria-label="Filtrer par catégorie"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-800 cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-3">
            <select
              aria-label="Trier par"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-800 cursor-pointer"
            >
              <option value="populaire">Trier par : Recommandés / Phares</option>
              <option value="prix-asc">Prix : Moins cher au plus cher</option>
              <option value="prix-desc">Prix : Plus cher au moins cher</option>
            </select>
          </div>
        </div>

        {/* Secondary Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span>Uniquement en stock immédiat</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={onlyDirectBuy}
                onChange={(e) => setOnlyDirectBuy(e.target.checked)}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span>Achat direct panier (hors sur-devis)</span>
            </label>
          </div>

          <button
            onClick={resetFilters}
            className="text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser les filtres</span>
          </button>
        </div>
      </div>

      {/* Comparison Drawer Indicator if items in compare */}
      {comparisonList.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-amber-900">
            <Scale className="w-4 h-4 text-amber-700" />
            <span>
              <strong>{comparisonList.length} équipement(s)</strong> actuellement sélectionnés dans le comparateur technique.
            </span>
          </div>
          <button
            onClick={clearCompare}
            className="text-amber-800 hover:underline font-medium"
          >
            Vider la sélection
          </button>
        </div>
      )}

      {/* Catalog Grid */}
      <div>
        <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
          <span>
            <strong className="text-slate-900 font-semibold">{filteredProducts.length}</strong> équipement(s) trouvés
          </span>
          <span>
            Expédition vers :{' '}
            <strong className="text-slate-700">
              {selectedCountry === 'Sénégal'
                ? 'Sénégal (Pays d’origine)'
                : SENEGAL_REGIONS.includes(selectedCountry as any)
                ? `${selectedCountry} (Sénégal)`
                : selectedCountry}
            </strong>
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 text-slate-500 text-sm space-y-3">
            <p>Aucun produit ne correspond à vos critères de recherche.</p>
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-amber-600 hover:underline"
            >
              Réinitialiser tous les critères
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
