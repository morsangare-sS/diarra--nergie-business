import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_CONTACTS } from '../../data/mockData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Building,
  CheckCircle2
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast } = useApp();

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [pays, setPays] = useState('Sénégal');
  const [sujet, setSujet] = useState('Renseignement commercial');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Votre message a été transmis à l’agence concernée.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="border-b border-slate-200 pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
          Agences Régionales & Support Client
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
          Contactez DIARRA ENERGIE & BUSINESS (Article 13)
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          Nos agences régionales à Dakar, Cotonou et Lomé sont à votre disposition pour toute demande de devis, visite sur site, commande ou assistance après-vente.
        </p>
      </div>

      {/* Tri-Country Agencies Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COMPANY_CONTACTS.adresses.map((agence, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>

            <div>
              <h2 className="font-heading font-bold text-base text-slate-900">{agence.pays}</h2>
              <div className="mt-2 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{agence.adresse}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{agence.telephone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>contact@diarraenergie.com</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <a
                href={`https://wa.me/${agence.pays.includes('Sénégal') ? '221771149539' : agence.pays.includes('Bénin') ? '22997000000' : '22890000000'}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp direct agence</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Form & Operating Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200">
          <h2 className="font-heading font-bold text-lg text-slate-900 mb-4">
            Envoyer un message à la direction commerciale
          </h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-950 text-sm">Message Reçu !</h3>
              <p className="text-xs text-emerald-800">
                Votre requête a été transmise à notre responsable de zone ({pays}). Nous vous recontacterons sous 24h.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Votre Nom & Prénom *</label>
                  <input
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Ex: Ibrahima Sow"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Votre E-mail *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: i.sow@domaine.com"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Téléphone direct *</label>
                  <input
                    type="tel"
                    required
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    placeholder="Ex: +221 77 114 95 39"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Pays concerné *</label>
                  <select
                    value={pays}
                    onChange={(e) => setPays(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="Sénégal">Sénégal</option>
                    <option value="Bénin">Bénin</option>
                    <option value="Togo">Togo</option>
                    <option value="Autre">Autre pays de la sous-région</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Objet de votre demande</label>
                <select
                  value={sujet}
                  onChange={(e) => setSujet(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                >
                  <option value="Renseignement commercial">Renseignement commercial sur un équipement</option>
                  <option value="Partenariat BTP">Partenariat BTP / Sous-traitance éclairage public</option>
                  <option value="Support SAV">Support technique & SAV</option>
                  <option value="Distribution">Candidature revendeur agréé</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Votre message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre besoin..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer le message</span>
              </button>
            </form>
          )}
        </div>

        {/* Operating Hours & General Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-xl space-y-4">
            <h2 className="font-heading font-bold text-base text-white">
              Heures d’Ouverture & Astreinte
            </h2>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Lundi au Vendredi</span>
                  <span>08h00 à 18h30 (Heure de Dakar & Cotonou)</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Samedi</span>
                  <span>08h30 à 13h00 (Dépôt & Permanence)</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Dimanche</span>
                  <span>Fermé (Astreinte chantiers BTP sur appel d'urgence)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 text-xs space-y-2">
            <h3 className="font-bold text-amber-950 text-sm">Projets d'Appels d'Offres & Marchés Publics</h3>
            <p className="text-amber-900 leading-relaxed">
              Pour la consultation de dossiers techniques, DAO ou transmission de bordereaux de prix unitaires (BPU), adressez directement vos documents à :
            </p>
            <p className="font-mono text-amber-950 font-bold pt-1">
              appels-offres@diarraenergie.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
