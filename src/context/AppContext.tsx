import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  QuoteRequest,
  ProjectReference,
  NewsArticle,
  TargetCountry,
  OrderStatus,
  QuoteStatus
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_PROJECTS, INITIAL_NEWS } from '../data/mockData';

export type Currency = 'XOF' | 'EUR' | 'USD';

export type AppView =
  | 'accueil'
  | 'a-propos'
  | 'eclairage-solaire'
  | 'eclairage-electrique'
  | 'pompage-solaire'
  | 'kits-solaires'
  | 'composants-solaires'
  | 'services'
  | 'realisations'
  | 'boutique'
  | 'devis'
  | 'actualites'
  | 'contact'
  | 'compte'
  | 'panier'
  | 'cgv'
  | 'confidentialite'
  | 'livraison'
  | 'admin'
  | 'architecture';

interface AppContextType {
  activeTab: AppView;
  setActiveTab: (tab: AppView) => void;
  selectedCountry: TargetCountry;
  setSelectedCountry: (country: TargetCountry) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountFCFA: number) => string;

  // Products
  products: Product[];
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartTotalFCFA: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  // Orders
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'numeroCommande' | 'dateCreation' | 'statutCommande' | 'statutPaiement'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Quotes
  quotes: QuoteRequest[];
  createQuote: (quote: Omit<QuoteRequest, 'id' | 'numeroDevis' | 'dateCreation' | 'statut'>) => QuoteRequest;
  updateQuoteStatus: (quoteId: string, status: QuoteStatus, responseNotes?: string) => void;

  // Comparison
  comparisonList: Product[];
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;

  // Technical Modal
  specModalProduct: Product | null;
  setSpecModalProduct: (p: Product | null) => void;

  // Projects & News
  projects: ProjectReference[];
  news: NewsArticle[];
  addProject: (proj: ProjectReference) => void;
  addNews: (art: NewsArticle) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Admin Authentication
  isAdminAuthenticated: boolean;
  adminUser: { name: string; email: string; role: string } | null;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<AppView>('accueil');
  const [selectedCountry, setSelectedCountry] = useState<TargetCountry>('Sénégal');
  const [currency, setCurrency] = useState<Currency>('XOF');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [specModalProduct, setSpecModalProduct] = useState<Product | null>(null);
  const [comparisonList, setComparisonList] = useState<Product[]>([]);

  // Smooth scroll to top on tab change
  const setActiveTab = (tab: AppView) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 0. Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('deb_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(() => {
    try {
      const saved = sessionStorage.getItem('deb_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const loginAdmin = (emailInput: string, passInput: string): boolean => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passInput.trim();

    // Accepted admin credentials
    const isValid =
      (cleanEmail === 'admin@diarraenergie.com' || cleanEmail === 'directeur@diarraenergie.com' || cleanEmail === 'admin') &&
      (cleanPass === 'Admin@Diarra2026!' || cleanPass === 'Diarra2026!' || cleanPass === 'admin123');

    if (isValid) {
      const user = {
        name: cleanEmail.includes('directeur') ? 'M. Diarra — Directeur Général' : 'Administrateur Principal',
        email: cleanEmail.includes('@') ? cleanEmail : 'admin@diarraenergie.com',
        role: 'Super Administrateur'
      };
      setIsAdminAuthenticated(true);
      setAdminUser(user);
      try {
        sessionStorage.setItem('deb_admin_auth', 'true');
        sessionStorage.setItem('deb_admin_user', JSON.stringify(user));
      } catch (e) {
        console.warn('Session storage error', e);
      }
      showToast('Connexion réussie. Bienvenue dans l’Espace d’Administration.');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    try {
      sessionStorage.removeItem('deb_admin_auth');
      sessionStorage.removeItem('deb_admin_user');
    } catch (e) {
      console.warn('Session storage error', e);
    }
    showToast('Session administrateur fermée.');
  };

  // 1. Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('deb_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deb_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [products]);

  const addProduct = (p: Product) => {
    setProducts((prev) => [p, ...prev]);
    showToast(`Produit ${p.reference} ajouté au catalogue.`);
  };

  const updateProduct = (p: Product) => {
    setProducts((prev) => prev.map((item) => (item.id === p.id ? p : item)));
    showToast(`Produit ${p.reference} mis à jour.`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast('Produit retiré du catalogue.');
  };

  // 2. Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('deb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deb_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage cart error', e);
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`« ${product.nom} » ajouté au panier (${quantity}x)`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Article retiré du panier');
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalFCFA = cart.reduce(
    (sum, item) => sum + item.product.prixFCFA * item.quantity,
    0
  );

  // 3. Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('deb_orders');
      if (saved) return JSON.parse(saved);
      // Preload initial sample order for instant testing
      return [
        {
          id: 'ord-init-1',
          numeroCommande: 'DEB-CMD-2026-0842',
          dateCreation: '2026-10-09 14:22',
          client: {
            nomComplet: 'Ousmane Fall',
            raisonSociale: 'Fall Agro BTP',
            typeClient: 'entreprise',
            email: 'o.fall@fallagro.sn',
            telephone: '+221 77 123 45 67',
            pays: 'Sénégal',
            ville: 'Thiès',
            adresseLivraison: 'Avenue Général de Gaulle, Zone Maraîchère',
            numeroFiscal: 'SN-TH-2024-B-998'
          },
          articles: [
            {
              productId: 'deb-ps-01',
              reference: 'DEB-PUMP-SUB-2HP',
              nom: 'Système de Pompage Solaire Immergé 2.2kW (3HP)',
              prixUnitaireFCFA: 890000,
              quantite: 1,
              totalLigneFCFA: 890000
            }
          ],
          sousTotalFCFA: 890000,
          fraisLivraisonFCFA: 15000,
          totalFCFA: 905000,
          methodeLivraison: 'transporteur_interurbain',
          moyenPaiement: 'wave',
          statutPaiement: 'paye',
          statutCommande: 'en_preparation',
          numeroSuivi: 'TR-SN-TH-9941'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deb_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage orders error', e);
    }
  }, [orders]);

  const createOrder = (orderData: Omit<Order, 'id' | 'numeroCommande' | 'dateCreation' | 'statutCommande' | 'statutPaiement'>): Order => {
    const timestamp = Date.now().toString().slice(-4);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      numeroCommande: `DEB-CMD-2026-${timestamp}`,
      dateCreation: new Date().toISOString().replace('T', ' ').slice(0, 16),
      statutCommande: 'confirmee',
      statutPaiement: orderData.moyenPaiement === 'wave' || orderData.moyenPaiement === 'orange_money' ? 'paye' : 'en_cours_de_validation'
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Commande ${newOrder.numeroCommande} enregistrée avec succès !`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, statutCommande: status } : ord))
    );
    showToast(`Statut de commande actualisé : ${status}`);
  };

  // 4. Quotes state
  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    try {
      const saved = localStorage.getItem('deb_quotes');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'quote-init-1',
          numeroDevis: 'DEB-DEV-2026-0319',
          dateCreation: '2026-10-07 10:15',
          demandeur: {
            nomComplet: 'Mme Aïcha Bio',
            entreprise: 'Commune de Parakou — Direction Technique',
            typeEntite: 'collectivite',
            email: 'services.techniques@parakou.bj',
            telephone: '+229 97 45 88 12',
            whatsapp: '+229 97 45 88 12',
            paysProjet: 'Bénin',
            villeProjet: 'Parakou',
            lieuDit: 'Avenue de la Préfecture'
          },
          projet: {
            typeProjet: 'eclairage-solaire',
            intitule: 'Projet Éclairage Public Solaire Boulevard Central (60 mâts 8m)',
            datePrevisionnelle: 'Décembre 2026',
            quantiteEstimee: 60,
            descriptionBesoin: 'Installation de 60 lampadaires solaires monoblocs 100W avec candélabres octogonaux 8m et massifs de béton pour sécuriser le tronçon urbain.',
            eclairageData: {
              longueurVoieKm: 2.4,
              largeurVoieM: 12,
              hauteurMatSouhaiteeM: 8,
              typeVoirie: 'boulevard'
            }
          },
          estimationEstimeeFCFA: 26400000,
          statut: 'en_etude'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('deb_quotes', JSON.stringify(quotes));
    } catch (e) {
      console.warn('Storage quotes error', e);
    }
  }, [quotes]);

  const createQuote = (quoteData: Omit<QuoteRequest, 'id' | 'numeroDevis' | 'dateCreation' | 'statut'>): QuoteRequest => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `dev-${Date.now()}`,
      numeroDevis: `DEB-DEV-2026-${randomSuffix}`,
      dateCreation: new Date().toISOString().replace('T', ' ').slice(0, 16),
      statut: 'recu'
    };
    setQuotes((prev) => [newQuote, ...prev]);
    showToast(`Demande de devis ${newQuote.numeroDevis} transmise à nos ingénieurs !`);
    return newQuote;
  };

  const updateQuoteStatus = (quoteId: string, status: QuoteStatus, responseNotes?: string) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quoteId
          ? {
              ...q,
              statut: status,
              reponseCommerciale: responseNotes || q.reponseCommerciale
            }
          : q
      )
    );
    showToast(`Statut du devis actualisé : ${status}`);
  };

  // 5. Comparison
  const toggleCompare = (product: Product) => {
    setComparisonList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Retiré du comparateur : ${product.nom}`);
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        showToast('Vous pouvez comparer jusqu’à 4 équipements simultanément');
        return prev;
      }
      showToast(`Ajouté au comparateur : ${product.nom}`);
      return [...prev, product];
    });
  };

  const clearCompare = () => setComparisonList([]);

  // 6. Projects & News
  const [projects, setProjects] = useState<ProjectReference[]>(INITIAL_PROJECTS);
  const [news, setNews] = useState<NewsArticle[]>(INITIAL_NEWS);

  const addProject = (p: ProjectReference) => {
    setProjects((prev) => [p, ...prev]);
    showToast('Référence projet publiée.');
  };

  const addNews = (n: NewsArticle) => {
    setNews((prev) => [n, ...prev]);
    showToast('Article conseil publié.');
  };

  // Currency Formatter
  const formatPrice = (amountFCFA: number): string => {
    if (currency === 'EUR') {
      const eur = amountFCFA / 655.957;
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(eur);
    }
    if (currency === 'USD') {
      const usd = amountFCFA / 605;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(usd);
    }
    // Default XOF / FCFA with clean space separator
    return new Intl.NumberFormat('fr-FR').format(amountFCFA) + ' FCFA';
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCountry,
        setSelectedCountry,
        currency,
        setCurrency,
        formatPrice,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        cartCount,
        cartTotalFCFA,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        orders,
        createOrder,
        updateOrderStatus,
        quotes,
        createQuote,
        updateQuoteStatus,
        comparisonList,
        toggleCompare,
        clearCompare,
        specModalProduct,
        setSpecModalProduct,
        projects,
        news,
        addProject,
        addNews,
        toastMessage,
        showToast,
        isAdminAuthenticated,
        adminUser,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
