import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { TechnicalSpecModal } from './components/common/TechnicalSpecModal';
import { ProductComparisonModal } from './components/common/ProductComparisonModal';

// Views
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { CategoryPageView } from './components/views/CategoryPageView';
import { ServicesView } from './components/views/ServicesView';
import { ProjectsView } from './components/views/ProjectsView';
import { ShopView } from './components/views/ShopView';
import { QuoteRequestView } from './components/views/QuoteRequestView';
import { NewsView } from './components/views/NewsView';
import { ContactView } from './components/views/ContactView';
import { AccountView } from './components/views/AccountView';
import { CartCheckoutView } from './components/views/CartCheckoutView';
import { CGVView, PrivacyView, DeliveryPolicyView } from './components/views/LegalViews';
import { AdminView } from './components/views/AdminView';
import { ArchitectureDocView } from './components/views/ArchitectureDocView';

const MainContent: React.FC = () => {
  const { activeTab, toastMessage } = useApp();

  const renderView = () => {
    switch (activeTab) {
      case 'accueil':
        return <HomeView />;
      case 'a-propos':
        return <AboutView />;
      case 'eclairage-solaire':
        return <CategoryPageView categoryKey="eclairage-solaire" />;
      case 'eclairage-electrique':
        return <CategoryPageView categoryKey="eclairage-electrique" />;
      case 'pompage-solaire':
        return <CategoryPageView categoryKey="pompage-solaire" />;
      case 'kits-solaires':
        return <CategoryPageView categoryKey="kits-solaires" />;
      case 'composants-solaires':
        return <CategoryPageView categoryKey="composants-solaires" />;
      case 'services':
        return <ServicesView />;
      case 'realisations':
        return <ProjectsView />;
      case 'boutique':
        return <ShopView />;
      case 'devis':
        return <QuoteRequestView />;
      case 'actualites':
        return <NewsView />;
      case 'contact':
        return <ContactView />;
      case 'compte':
        return <AccountView />;
      case 'panier':
        return <CartCheckoutView />;
      case 'cgv':
        return <CGVView />;
      case 'confidentialite':
        return <PrivacyView />;
      case 'livraison':
        return <DeliveryPolicyView />;
      case 'admin':
        return <AdminView />;
      case 'architecture':
        return <ArchitectureDocView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-400 selection:text-slate-950">
      <Navbar />
      <main className="flex-1">
        {renderView()}
      </main>
      <Footer />
      <WhatsAppButton />
      <TechnicalSpecModal />
      <ProductComparisonModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl border border-slate-800 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
