import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const AdminLoginView: React.FC = () => {
  const { loginAdmin, setActiveTab, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const success = loginAdmin(email, password);
      setIsLoading(false);
      if (!success) {
        setErrorMessage(
          'Identifiant ou mot de passe incorrect. Cet espace est strictement réservé au personnel habilité de DIARRA ENERGIE & BUSINESS.'
        );
      }
    }, 400);
  };

  const handleQuickFill = () => {
    setEmail('admin@diarraenergie.com');
    setPassword('Diarra2026!');
    setErrorMessage(null);
    showToast('Identifiants de démonstration insérés.');
  };

  const handleDirectConnect = () => {
    setEmail('admin@diarraenergie.com');
    setPassword('Diarra2026!');
    setErrorMessage(null);
    setIsLoading(true);
    setTimeout(() => {
      loginAdmin('admin@diarraenergie.com', 'Diarra2026!');
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-[82vh] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-in fade-in duration-300">
        {/* Top return link */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveTab('accueil')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au site public</span>
          </button>

          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            SSL 256-Bit Sécurisé
          </span>
        </div>

        {/* Card */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 mb-2">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              Espace d'Administration
            </h1>

            <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
              DIARRA ENERGIE & BUSINESS
            </p>

            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed pt-1">
              Accès protégé réservé à la direction et aux gestionnaires habilités (Catalogue, Commandes, Devis & Stocks).
            </p>
          </div>

          {/* Error alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs flex items-start gap-2.5 animate-in shake duration-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Identifiant ou Adresse E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@diarraenergie.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Mot de Passe Administrateur
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-white text-xs placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label="Afficher ou masquer mot de passe"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400"
                />
                <span>Mémoriser la session</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 disabled:opacity-60 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <span>Connexion sécurisée en cours...</span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Accéder à l'Administration</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Identifiants d'Accès Fournis</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                Article 9
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Identifiant :</span>
                <span className="text-slate-200 font-bold select-all">admin@diarraenergie.com</span>
              </div>
              <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Mot de passe :</span>
                <span className="text-amber-300 font-bold select-all">Diarra2026!</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleQuickFill}
                className="flex-1 py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors text-center"
              >
                Remplir les champs
              </button>
              <button
                type="button"
                onClick={handleDirectConnect}
                className="flex-1 py-1.5 px-2.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-500/40 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                <span>Connexion 1-Clic</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="pt-2 border-t border-slate-700/60 text-center">
            <p className="text-[11px] text-slate-500">
              Conformité sécurité & gestion des accès — DIARRA ENERGIE & BUSINESS © 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
