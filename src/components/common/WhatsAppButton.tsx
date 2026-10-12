import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle, X, Send } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { selectedCountry } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const isSenegalRegion = selectedCountry !== 'Bénin' && selectedCountry !== 'Togo' && selectedCountry !== 'Sous-Région';
  const locationLabel = selectedCountry === 'Sénégal'
    ? 'le Sénégal'
    : isSenegalRegion
    ? `la région de ${selectedCountry} (Sénégal)`
    : selectedCountry === 'Sous-Région'
    ? 'la Sous-Région'
    : `le ${selectedCountry}`;

  const [customMessage, setCustomMessage] = useState(
    `Bonjour DIARRA ENERGIE & BUSINESS, je souhaite des renseignements sur vos équipements et solutions solaires pour ${locationLabel}.`
  );

  React.useEffect(() => {
    setCustomMessage(
      `Bonjour DIARRA ENERGIE & BUSINESS, je souhaite des renseignements sur vos équipements et solutions solaires pour ${locationLabel}.`
    );
  }, [locationLabel]);

  const phoneNumbers: Record<string, string> = {
    'Sénégal': '221771149539',
    'Bénin': '22997000000',
    'Togo': '22890000000',
    'Sous-Région': '221771149539'
  };

  const currentPhone = phoneNumbers[selectedCountry] || '221771149539';

  const handleSend = () => {
    const encoded = encodeURIComponent(customMessage);
    const url = `https://wa.me/${currentPhone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-80 p-4 mb-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                WA
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Conseiller Commercial WhatsApp</p>
                <p className="text-[11px] text-slate-500">
                  {isSenegalRegion ? `Antenne Sénégal · ${selectedCountry}` : `Antenne ${selectedCountry}`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-slate-600">
            <p className="mb-2">
              Échangez directement avec un ingénieur technico-commercial DIARRA ENERGIE :
            </p>
            <textarea
              aria-label="Message WhatsApp"
              rows={3}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800"
            />
          </div>

          <button
            onClick={handleSend}
            className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-xs rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ouvrir WhatsApp (+{currentPhone})</span>
          </button>
        </div>
      ) : null}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
        aria-label="Contacter sur WhatsApp"
        title="Discuter sur WhatsApp avec un ingénieur"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};
