import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, QuoteRequest } from '../../types';
import {
  User,
  ShoppingBag,
  FileText,
  Clock,
  CheckCircle,
  Truck,
  Printer,
  ChevronRight,
  Shield
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const { orders, quotes, formatPrice, setActiveTab } = useApp();
  const [activeTabSub, setActiveTabSub] = useState<'commandes' | 'devis'>('commandes');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusBadge = (status: Order['statutCommande']) => {
    switch (status) {
      case 'confirmee':
        return <span className="font-mono text-[11px] text-emerald-700 font-semibold">Confirmée</span>;
      case 'en_preparation':
        return <span className="font-mono text-[11px] text-amber-700 font-semibold">En préparation</span>;
      case 'expediee':
        return <span className="font-mono text-[11px] text-sky-700 font-semibold">Expédiée</span>;
      case 'livree':
        return <span className="font-mono text-[11px] text-emerald-800 font-bold">Livrée</span>;
      case 'annulee':
        return <span className="font-mono text-[11px] text-rose-700 font-semibold">Annulée</span>;
      default:
        return <span className="font-mono text-[11px] text-slate-600 font-semibold">En attente</span>;
    }
  };

  const getQuoteStatusBadge = (status: QuoteRequest['statut']) => {
    switch (status) {
      case 'devis_transmis':
        return <span className="font-mono text-[11px] text-emerald-700 font-bold">Devis chiffré disponible</span>;
      case 'en_etude':
        return <span className="font-mono text-[11px] text-amber-700 font-semibold">En étude d'ingénierie</span>;
      case 'accepte':
        return <span className="font-mono text-[11px] text-emerald-800 font-bold">Validé & Gagné</span>;
      default:
        return <span className="font-mono text-[11px] text-slate-600 font-semibold">Dossier reçu</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
            Espace Client DIARRA ENERGIE
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            Mon Compte & Suivi des Commandes (Article 14)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Consultez en temps réel l'avancement de vos commandes de matériel et de vos demandes d'études techniques.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('devis')}
          className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          Nouveau devis technique
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTabSub('commandes')}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
            activeTabSub === 'commandes'
              ? 'border-amber-500 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Mes Commandes ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTabSub('devis')}
          className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
            activeTabSub === 'devis'
              ? 'border-amber-500 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Mes Dossiers de Devis ({quotes.length})</span>
        </button>
      </div>

      {/* Orders Tab */}
      {activeTabSub === 'commandes' && (
        <div className="space-y-6">
          {orders.length > 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
              {orders.map((order) => (
                <div key={order.id} className="p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-slate-900">
                          {order.numeroCommande}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500">{order.dateCreation}</span>
                      </div>
                      <span className="text-xs text-slate-600 block mt-0.5">
                        Client : {order.client.nomComplet} ({order.client.ville}, {order.client.pays})
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div>{getStatusBadge(order.statutCommande)}</div>
                      <span className="font-mono text-base font-bold text-slate-900">
                        {formatPrice(order.totalFCFA)}
                      </span>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1">
                    {order.articles.map((art, idx) => (
                      <div key={idx} className="flex justify-between text-slate-700">
                        <span>{art.quantite}x {art.nom} ({art.reference})</span>
                        <span className="font-mono font-medium">{formatPrice(art.totalLigneFCFA)}</span>
                      </div>
                    ))}
                    {order.numeroSuivi && (
                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Bordereau transporteur :</span>
                        <span className="font-mono font-bold text-slate-800">{order.numeroSuivi}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500 text-xs space-y-3">
              <p>Vous n'avez pas encore passé de commande.</p>
              <button
                onClick={() => setActiveTab('boutique')}
                className="font-semibold text-amber-600 hover:underline"
              >
                Accéder à la boutique
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quotes Tab */}
      {activeTabSub === 'devis' && (
        <div className="space-y-6">
          {quotes.length > 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
              {quotes.map((q) => (
                <div key={q.id} className="p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-amber-600">
                          {q.numeroDevis}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500">{q.dateCreation}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-sm text-slate-900 mt-1">
                        {q.projet.intitule}
                      </h3>
                      <span className="text-xs text-slate-500">
                        Lieu du projet : {q.demandeur.villeProjet} ({q.demandeur.paysProjet})
                      </span>
                    </div>

                    <div className="text-right">
                      {getQuoteStatusBadge(q.statut)}
                      {q.estimationEstimeeFCFA && (
                        <span className="font-mono text-sm font-bold text-slate-900 block mt-1">
                          Estimation : {formatPrice(q.estimationEstimeeFCFA)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-2">
                    <p>
                      <strong>Description du besoin :</strong> {q.projet.descriptionBesoin}
                    </p>
                    {q.reponseCommerciale && (
                      <div className="p-2 bg-emerald-50 rounded border border-emerald-200 text-emerald-900">
                        <strong>Note du Bureau d'Études :</strong> {q.reponseCommerciale}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200 text-slate-500 text-xs space-y-3">
              <p>Aucune demande de devis enregistrée.</p>
              <button
                onClick={() => setActiveTab('devis')}
                className="font-semibold text-amber-600 hover:underline"
              >
                Créer une première demande
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
