import { Product, ProjectReference, NewsArticle } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. ÉCLAIRAGE PUBLIC SOLAIRE
  {
    id: 'deb-eps-01',
    reference: 'DEB-SL-100-PRO',
    nom: 'Lampadaire Solaire Intégré All-In-One 100W Lumileds',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Lampadaires intégrés',
    descriptionCourte: 'Lampadaire solaire monobloc avec panneau monocristallin haute efficacité et batterie LiFePO4 intégrée. Idéal pour voiries urbaines et lotissements.',
    descriptionDetaillee: 'Le DEB-SL-100-PRO est conçu spécifiquement pour les conditions climatiques d’Afrique de l’Ouest. Équipé de puces LED Philips Lumileds 3030 délivrant 170 lm/W, d’un panneau monocristallin 120Wc et d’une batterie Lithium Fer Phosphate (LiFePO4) 12.8V 54Ah offrant plus de 3000 cycles. Régulateur MPPT intelligent avec programmation d’atténuation automatique (dimming) et capteur de présence radar.',
    prixFCFA: 195000,
    estSurDevis: false,
    stockDisponible: 64,
    delaiLivraisonJours: 2,
    imagePrincipale: '/src/assets/images/product_lampadaire_solaire_1791734634193.jpg',
    specs: {
      puissance: '100W LED (Équivalent 250W HPS)',
      fluxLumineux: '16 500 Lumens',
      panneauSolaire: 'Monocristallin 120Wc - Rendement 22.4%',
      batterieType: 'LiFePO4 Haute Température',
      batterieCapacite: '12.8V / 54Ah (691Wh)',
      autonomie: '36 à 48 heures (3 à 4 nuits d’autonomie)',
      hauteurMat: '6 à 8 mètres',
      indiceProtection: 'IP66 / IK09',
      garantie: '3 ans (Extension 5 ans disponible)',
      certifications: ['CE', 'RoHS', 'IEC 60598', 'ISO 9001']
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-eps-02',
    reference: 'DEB-SL-150-SPLIT',
    nom: 'Lampadaire Solaire Split 150W Haute Puissance Autoroute',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Lampadaires à panneau séparé',
    descriptionCourte: 'Système à panneau orientable séparé pour autoroutes, grands boulevards et zones industrielles à fort trafic.',
    descriptionDetaillee: 'Conception deux-corps permettant d’orienter le panneau plein Sud à l’angle optimal pour maximiser la captation solaire en zone tropicale. Bloc optique asymétrique Batwing pour éviter les zones d’ombre entre les candélabres espacés jusqu’à 35 mètres. Batterie LiFePO4 logée dans un caisson ventilé au pied ou en tête de mât.',
    prixFCFA: 320000,
    estSurDevis: true,
    stockDisponible: 30,
    delaiLivraisonJours: 5,
    imagePrincipale: '/src/assets/images/hero_diarra_solar_1791734623148.jpg',
    specs: {
      puissance: '150W LED Bridgelux',
      fluxLumineux: '24 000 Lumens',
      panneauSolaire: 'Bi-verre Monocristallin 200Wc',
      batterieType: 'LiFePO4 rackable avec BMS intelligent',
      batterieCapacite: '25.6V / 60Ah (1536Wh)',
      autonomie: '4 nuits garanties sans ensoleillement',
      hauteurMat: '8 à 10 mètres',
      indiceProtection: 'IP67 / IK10',
      garantie: '5 ans',
      certifications: ['CE', 'IEC 61215', 'IEC 62133']
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-eps-03',
    reference: 'DEB-MAT-OCTA-8M',
    nom: 'Mât Octogonal Galvanisé à Chaud 8m avec Crosse et Semelle',
    categorie: 'eclairage-solaire',
    sousCategorie: 'Mâts et accessoires',
    descriptionCourte: 'Mât candélabre en acier galvanisé à chaud selon norme EN ISO 1461, résistant aux vents côtiers et à la corrosion saline.',
    descriptionDetaillee: 'Mât conique octogonal en tôle d’acier de 4mm d’épaisseur, galvanisation intégrale intérieure et extérieure 85 microns. Livré avec platine d’ancrage renforcée 300x300mm, 4 tiges de scellement M20 et crosse simple ou double 1.5m d’avancée avec inclinaison 15°.',
    prixFCFA: 245000,
    estSurDevis: false,
    stockDisponible: 45,
    delaiLivraisonJours: 4,
    imagePrincipale: '/src/assets/images/product_lampadaire_solaire_1791734634193.jpg',
    specs: {
      puissance: 'Supporte luminaire jusqu’à 30kg + panneau 300Wc',
      hauteurMat: '8.00 mètres hors-sol',
      indiceProtection: 'Galvanisation EN ISO 1461 (Anti-corrosion C5)',
      garantie: '10 ans anti-corrosion'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },

  // 2. ÉCLAIRAGE PUBLIC ÉLECTRIQUE & LED
  {
    id: 'deb-epe-01',
    reference: 'DEB-LED-ST-120',
    nom: 'Luminaire de Voirie LED Réseau Électrique 120W Sonelec/Senelec/SBEE',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Luminaires LED voirie',
    descriptionCourte: 'Luminaire LED professionnel raccordé au réseau conventionnel pour voiries communales, boulevards et péages.',
    descriptionDetaillee: 'Luminaire LED conçu pour le remplacement direct des lampes sodium haute pression 250W. Corps en aluminium coulé sous pression traité anti-corrosion, driver MeanWell / Inventronics avec parafoudre intégré 10kV / 10kA pour absorber les surtensions réseau fréquentes.',
    prixFCFA: 85000,
    estSurDevis: false,
    stockDisponible: 120,
    delaiLivraisonJours: 2,
    imagePrincipale: '/src/assets/images/product_lampadaire_solaire_1791734634193.jpg',
    specs: {
      puissance: '120W (Cos phi > 0.96)',
      fluxLumineux: '18 000 Lumens (150 lm/W)',
      tensionFonctionnement: '100 - 277V AC / 50-60Hz',
      indiceProtection: 'IP66 / IK09 / Parafoudre 10kV',
      hauteurMat: '6 à 9 mètres',
      garantie: '5 ans',
      certifications: ['CE', 'CB', 'ENEC']
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },
  {
    id: 'deb-epe-02',
    reference: 'DEB-FLOOD-300-IND',
    nom: 'Projecteur LED Industriel 300W Arène, Stade & Chantiers Portuaires',
    categorie: 'eclairage-electrique',
    sousCategorie: 'Projecteurs extérieurs et industriels',
    descriptionCourte: 'Projecteur haute puissance pour aires logistiques, carrefours autoroutiers, stades et quais portuaires.',
    descriptionDetaillee: 'Projecteur modulaire à optiques interchangeables (30°, 60°, 90°). Radiateur d’aluminium thermique à ailettes de dissipation passive. Protection contre la poussière latéritique et la corrosion marine côtière.',
    prixFCFA: 185000,
    estSurDevis: false,
    stockDisponible: 38,
    delaiLivraisonJours: 3,
    imagePrincipale: '/src/assets/images/hero_diarra_solar_1791734623148.jpg',
    specs: {
      puissance: '300W LED',
      fluxLumineux: '45 000 Lumens',
      tensionFonctionnement: '180 - 265V AC',
      indiceProtection: 'IP67 / IK10',
      garantie: '5 ans'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },

  // 3. POMPES SOLAIRES & FORAGES
  {
    id: 'deb-ps-01',
    reference: 'DEB-PUMP-SUB-2HP',
    nom: 'Système de Pompage Solaire Immergé 2.2kW (3HP) Débit Forage 18m³/h',
    categorie: 'pompage-solaire',
    sousCategorie: 'Pompes solaires immergées',
    descriptionCourte: 'Pompe en inox 304 pour forages profonds jusqu’à 120m avec variateur solaire MPPT hybride solaire/groupe.',
    descriptionDetaillee: 'Système complet de pompage d’eau solaire pour exploitations maraîchères, élevages bovins et adduction d’eau potable villageoise (AEP). Corps de pompe et turbine 100% acier inoxydable AISI 304 résistant au sable. Variateur de fréquence MPPT automatique qui démarre dès le lever du soleil et régule le débit selon l’ensoleillement sans aucune batterie.',
    prixFCFA: 890000,
    estSurDevis: false,
    stockDisponible: 18,
    delaiLivraisonJours: 3,
    imagePrincipale: '/src/assets/images/product_pompe_solaire_1791734645113.jpg',
    specs: {
      puissance: '2.2 kW / 3.0 HP Triphasé 380V / 220V',
      debitMax: '18 m³/h (Débit journalier moyen : 60 à 100 m³/jour)',
      hmtMax: '115 mètres de Hauteur Manométrique Totale',
      profondeurImmersion: 'Recommandée 40m à 100m',
      panneauSolaire: 'Générateur PV recommandé : 3 300Wc (6x 550Wc)',
      indiceProtection: 'Moteur submersible IP68 / Coffret MPPT IP65',
      garantie: '2 ans constructeur',
      certifications: ['CE', 'ISO 9001', 'TÜV']
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-ps-02',
    reference: 'DEB-PUMP-SURF-1.5HP',
    nom: 'Pompe Solaire de Surface Centrifuge 1.1kW (1.5HP) Irrigation Goutte-à-Goutte',
    categorie: 'pompage-solaire',
    sousCategorie: 'Pompes solaires de surface',
    descriptionCourte: 'Pompage direct depuis fleuves, rivières, bassins de rétention et puits ouverts peu profonds.',
    descriptionDetaillee: 'Idéale pour les périmètres irrigués de la Vallée du Fleuve Sénégal, du fleuve Mono ou de la vallée de l’Ouémé. Corps en fonte avec roue laiton, moteur brushless DC synchrone à aimants permanents à haut rendement. Fournie avec son contrôleur MPPT numérique et capteurs de niveau de cuve.',
    prixFCFA: 495000,
    estSurDevis: false,
    stockDisponible: 25,
    delaiLivraisonJours: 2,
    imagePrincipale: '/src/assets/images/product_pompe_solaire_1791734645113.jpg',
    specs: {
      puissance: '1.1 kW / 1.5 HP',
      debitMax: '22 m³/h',
      hmtMax: '35 mètres',
      profondeurImmersion: 'Aspiration max 7 mètres',
      panneauSolaire: 'Recommandé 1 650Wc (3x 550Wc)',
      indiceProtection: 'IP55',
      garantie: '2 ans'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },
  {
    id: 'deb-ps-03',
    reference: 'DEB-PUMP-AGRO-7.5KW',
    nom: 'Station de Pompage Solaire Agricole Grand Débit 7.5kW (10HP)',
    categorie: 'pompage-solaire',
    sousCategorie: 'Systèmes de pompage pour forages',
    descriptionCourte: 'Solution industrielle sur-mesure pour grands périmètres agricoles de 5 à 20 hectares et AEP communale.',
    descriptionDetaillee: 'Station complète clé en main comprenant pompe submersible inox grand débit, armoire de commande solaire avec onduleur variateur de vitesse VFD à commutation hybride automatique (Solaire / Réseau Senelec-SBEE / Groupe électrogène), protection contre la marche à sec, parafoudres AC et DC et monitoring GSM distant.',
    prixFCFA: 2450000,
    estSurDevis: true,
    stockDisponible: 8,
    delaiLivraisonJours: 7,
    imagePrincipale: '/src/assets/images/product_pompe_solaire_1791734645113.jpg',
    specs: {
      puissance: '7.5 kW / 10 HP Triphasé 380V',
      debitMax: '45 m³/h (250 à 350 m³/jour selon saison)',
      hmtMax: '160 mètres',
      panneauSolaire: 'Champ solaire dédié 11 kWc (20x 550Wc)',
      indiceProtection: 'Armoire IP66 climatisée / Pompe IP68',
      garantie: '3 ans avec contrat de maintenance',
      certifications: ['CE', 'IEC 60034']
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },

  // 4. KITS SOLAIRES DOMESTIQUES ET PROFESSIONNELS
  {
    id: 'deb-kit-01',
    reference: 'DEB-KIT-VILLA-5KW',
    nom: 'Kit Solaire Hybride Villa & PME 5kVA / 10kWh LiFePO4',
    categorie: 'kits-solaires',
    sousCategorie: 'Systèmes pour maisons et villas',
    descriptionCourte: 'Autonomie énergétique totale contre les délestages pour villa familiale, bureaux et cliniques médicales.',
    descriptionDetaillee: 'Comprend 1 Onduleur Hybride 5kVA MPPT 48V pur sinus avec monitoring WiFi, 1 Armoire murale Lithium LiFePO4 51.2V 200Ah (10.24 kWh utile), 10 Panneaux solaires monocristallins 550Wc Tier-1 (5500Wc crête), coffrets de protection parafoudre DC et AC, câbles solaires souples 6mm² et structures de pose toiture terrasse ou bac alu.',
    prixFCFA: 3650000,
    estSurDevis: false,
    stockDisponible: 12,
    delaiLivraisonJours: 3,
    imagePrincipale: '/src/assets/images/product_kit_solaire_hybride_1791734655495.jpg',
    specs: {
      puissance: '5 000 VA / 5 000 W Pur Sinus',
      panneauSolaire: '10x 550Wc Monocristallin Half-Cell (5.5 kWc)',
      batterieType: 'Lithium LiFePO4 Smart BMS 6000 cycles',
      batterieCapacite: '51.2V / 200Ah (10.24 kWh)',
      autonomie: 'Assure 24h/24 : 2 climatiseurs 1CV, réfrigérateur, TV, éclairage, box internet',
      indiceProtection: 'Onduleur IP21 (Intérieur) / Panneaux IP68',
      garantie: 'Panneaux 25 ans / Batterie 5 ans / Onduleur 3 ans'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-kit-02',
    reference: 'DEB-KIT-DOM-1.5KW',
    nom: 'Kit Solaire Domestique Confort 1.5kVA / 2.5kWh Batterie Gel',
    categorie: 'kits-solaires',
    sousCategorie: 'Kits solaires domestiques',
    descriptionCourte: 'Alimentation de secours anti-coupure économique pour appartement, petite boutique et maison rurale.',
    descriptionDetaillee: 'Permet d’alimenter en continu un réfrigérateur basse consommation, la télévision, ventilateurs, ordinateurs et éclairage LED complet en cas de coupure de réseau ou en site isolé.',
    prixFCFA: 980000,
    estSurDevis: false,
    stockDisponible: 20,
    delaiLivraisonJours: 2,
    imagePrincipale: '/src/assets/images/product_kit_solaire_hybride_1791734655495.jpg',
    specs: {
      puissance: '1 500 VA / 1 200 W',
      panneauSolaire: '4x 400Wc Monocristallin (1.6 kWc)',
      batterieType: 'Batterie Gel Solaire Décharge Profonde',
      batterieCapacite: '2x 12V 150Ah couplées en 24V (3.6 kWh brut)',
      autonomie: '12 à 18 heures d’autonomie de base',
      garantie: '2 ans'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  },
  {
    id: 'deb-kit-03',
    reference: 'DEB-KIT-INDUS-15KW',
    nom: 'Centrale Solaire Autoconsommation Bâtiment & Siège Social 15kVA Triphasé',
    categorie: 'kits-solaires',
    sousCategorie: 'Installations pour entreprises',
    descriptionCourte: 'Réduction de 70% de la facture électrique d’entreprise et zéro coupure de production.',
    descriptionDetaillee: 'Système triphasé 380V/400V couplé au réseau et groupe électrogène avec injection zéro paramétrable. Comprend onduleur hybride triphasé 15kW, banc de batteries Lithium LiFePO4 rackable 20.48kWh et champ photovoltaïque de 18kWc.',
    prixFCFA: 9850000,
    estSurDevis: true,
    stockDisponible: 5,
    delaiLivraisonJours: 10,
    imagePrincipale: '/src/assets/images/hero_diarra_solar_1791734623148.jpg',
    specs: {
      puissance: '15 kW Triphasé 400V',
      panneauSolaire: '32x 550Wc Tier-1 (17.6 kWc)',
      batterieType: 'Lithium LiFePO4 Haute Tension',
      batterieCapacite: '20.48 kWh modulable jusqu’à 60 kWh',
      garantie: '5 ans équipements / 10 ans batteries'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },

  // 5. PANNEAUX, BATTERIES, ONDULEURS & ACCESSOIRES
  {
    id: 'deb-comp-01',
    reference: 'DEB-PV-550-MONO',
    nom: 'Panneau Solaire Monocristallin 550Wc Half-Cell Tier-1',
    categorie: 'composants-solaires',
    sousCategorie: 'Panneaux photovoltaïques',
    descriptionCourte: 'Module photovoltaïque bi-facial à demi-cellules haute performance résistant aux fortes chaleurs.',
    descriptionDetaillee: 'Technologie PERC / N-Type 144 demi-cellules avec coefficient de température optimisé pour le climat sahélien (-0.35%/°C). Cadre en aluminium anodisé argenté avec verre trempé antireflet 3.2mm certifié grêle et charge de vent côtière 2400Pa.',
    prixFCFA: 65000,
    estSurDevis: false,
    stockDisponible: 450,
    delaiLivraisonJours: 1,
    imagePrincipale: '/src/assets/images/hero_diarra_solar_1791734623148.jpg',
    specs: {
      puissance: '550 Wc (Tolérance positive 0~+5W)',
      tensionFonctionnement: 'Vmp: 42.1V / Voc: 49.9V / Imp: 13.06A',
      dimensions: '2279 x 1134 x 35 mm (28.5 kg)',
      garantie: '12 ans produit / 25 ans rendement linéaire à 84.8%',
      certifications: ['IEC 61215', 'IEC 61730', 'TÜV', 'CE']
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: false
  },
  {
    id: 'deb-comp-02',
    reference: 'DEB-BAT-LIFEPO4-48V',
    nom: 'Batterie Solaire Lithium LiFePO4 Murale 48V (51.2V) 100Ah 5.12kWh',
    categorie: 'composants-solaires',
    sousCategorie: 'Batteries solaires',
    descriptionCourte: 'Batterie résidentielle et tertiaire LiFePO4 avec écran LCD, communication CAN/RS485 pour onduleurs.',
    descriptionDetaillee: 'Cellules prismatiques Grade-A certifiées 6000 cycles à 80% DOD. BMS intelligent intégré avec protection surcharge, décharge profonde, court-circuit et sonde thermique. Compatible avec onduleurs Deye, Growatt, Victron, Must, SRNE.',
    prixFCFA: 950000,
    estSurDevis: false,
    stockDisponible: 34,
    delaiLivraisonJours: 2,
    imagePrincipale: '/src/assets/images/product_kit_solaire_hybride_1791734655495.jpg',
    specs: {
      batterieType: 'Lithium Fer Phosphate (LiFePO4)',
      batterieCapacite: '51.2V / 100Ah (5 120 Wh)',
      tensionFonctionnement: 'Plage 44.8V - 57.6V',
      autonomie: 'Courant de charge/décharge continu recommandé : 50A (Max 100A)',
      garantie: '5 ans constructeur',
      certifications: ['UN38.3', 'CE', 'IEC 62619']
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo', 'Sous-Région'],
    estPhare: true
  },
  {
    id: 'deb-comp-03',
    reference: 'DEB-INV-HYB-5KVA',
    nom: 'Onduleur Hybride Solaire MPPT 5kVA / 48V Pur Sinus WiFi',
    categorie: 'composants-solaires',
    sousCategorie: 'Onduleurs et régulateurs',
    descriptionCourte: 'Onduleur tout-en-un avec régulateur MPPT 80A intégré et module WiFi de suivi sur smartphone.',
    descriptionDetaillee: 'Fonctionne avec ou sans batterie. Plage MPPT étendue 120V - 450V DC permettant de brancher de longues chaînes de panneaux solaires. Priorité d’alimentation programmable (Solaire / Réseau / Batterie).',
    prixFCFA: 440000,
    estSurDevis: false,
    stockDisponible: 28,
    delaiLivraisonJours: 2,
    imagePrincipale: '/src/assets/images/product_kit_solaire_hybride_1791734655495.jpg',
    specs: {
      puissance: '5 000 VA / 5 000 W facteur de puissance 1.0',
      tensionFonctionnement: 'Sortie 230V AC ± 5% Pur Sinus',
      panneauSolaire: 'Puissance PV max connectable : 5 500Wc',
      garantie: '2 ans'
    },
    paysDisponibilite: ['Sénégal', 'Bénin', 'Togo'],
    estPhare: false
  }
];

export const INITIAL_PROJECTS: ProjectReference[] = [
  {
    id: 'proj-01',
    titre: 'Éclairage Public Solaire Autonome de la Corniche & Cité Communale',
    client: 'Mairie & Collectivité Territoriale',
    typeClient: 'Collectivité Territoriale',
    pays: 'Sénégal',
    ville: 'Saint-Louis',
    annee: '2025',
    description: 'Fourniture, génie civil et pose de 140 lampadaires solaires autonomes 100W All-In-One avec mâts octogonaux de 8m traités contre la corrosion marine.',
    pointsForts: ['140 points lumineux sécurisés', 'Zéro coût de facture Senelec', 'Éclairage ininterrompu 365 nuits/an'],
    categorie: 'eclairage-solaire',
    capaciteInstallee: '14 kW LED solaire autonome',
    image: '/src/assets/images/hero_diarra_solar_1791734623148.jpg'
  },
  {
    id: 'proj-02',
    titre: 'Station Solaire d’Adduction d’Eau Potable (AEP) & Forage Villageois',
    client: 'Projet Hydraulique Rurale & ONG Partenaire',
    typeClient: 'Organisation Non Gouvernementale',
    pays: 'Bénin',
    ville: 'Parakou (Zone Rurale Borgou)',
    annee: '2025',
    description: 'Installation d’une pompe solaire immergée 5.5kW avec champ photovoltaïque 8.8kWc alimentant un château d’eau de 40m³ et 6 bornes fontaines publiques.',
    pointsForts: ['Débit de 32 m³/h à 85m HMT', 'Accès à l’eau potable pour 4 200 habitants', 'Système sans batterie garanti sans maintenance chimique'],
    categorie: 'pompage-solaire',
    capaciteInstallee: '8.8 kWc solaire / 5.5 kW hydraulique',
    image: '/src/assets/images/product_pompe_solaire_1791734645113.jpg'
  },
  {
    id: 'proj-03',
    titre: 'Centrale Solaire Hybride 25kVA & Stockage LiFePO4 pour Clinique Médicale',
    client: 'Clinique Médico-Chirurgicale Privée',
    typeClient: 'Secteur de la Santé Privé',
    pays: 'Togo',
    ville: 'Lomé (Quartier Tokoin)',
    annee: '2026',
    description: 'Sécurisation électrique ininterrompue des blocs opératoires, de la chaîne de froid vaccinale et des respirateurs artificiels face aux coupures de réseau.',
    pointsForts: ['Temps de basculement 10ms imperceptible', 'Autonomie continue 14 heures de nuit', 'Économie annuelle de 8.5M FCFA de carburant groupe'],
    categorie: 'kits-solaires',
    capaciteInstallee: '25 kVA Onduleurs / 40.96 kWh LiFePO4 / 22 kWc PV',
    image: '/src/assets/images/product_kit_solaire_hybride_1791734655495.jpg'
  },
  {
    id: 'proj-04',
    titre: 'Éclairage LED de Sécurité & Voirie de la Zone Industrielle et Logistique',
    client: 'Consortium Logistique & BTP',
    typeClient: 'Entreprise BTP & Logistique',
    pays: 'Sénégal',
    ville: 'Diamniadio',
    annee: '2025',
    description: 'Rénovation complète de 85 luminaires LED 150W sur réseau avec armoires de commande crépusculaires et télégestion par segments.',
    pointsForts: ['Réduction de 55% de la puissance souscrite', 'Éclairage haute visibilité pour camions lourds', 'Parafoudre industriel 10kV certifié'],
    categorie: 'eclairage-electrique',
    capaciteInstallee: '12.7 kW LED haute performance',
    image: '/src/assets/images/product_lampadaire_solaire_1791734634193.jpg'
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-01',
    titre: 'Comment bien dimensionner un système de pompage solaire de forage en Afrique de l’Ouest ?',
    slug: 'guide-dimensionnement-pompage-solaire-sahel',
    date: '8 Octobre 2026',
    auteur: 'Ing. M. Diarra — Directeur Technique',
    categorie: 'Guide Technique & Conseils',
    resume: 'Découvrez les étapes indispensables pour calculer la HMT (Hauteur Manométrique Totale), le volume d’eau journalier nécessaire et le champ photovoltaïque sans risque de sous-dimensionnement.',
    contenuComplet: 'En zone soudano-sahélienne (Sénégal, Bénin, Togo), le pompage solaire représente l’alternative la plus rentable au groupe électrogène diesel. Pour réussir son installation, trois facteurs cruciaux doivent être mesurés avec précision : 1) La profondeur du niveau dynamique du forage ; 2) La hauteur géométrique du refoulement jusqu’au réservoir ; 3) Les pertes de charge dans les canalisations. DIARRA ENERGIE & BUSINESS met à disposition son bureau d’études pour réaliser une modélisation hydraulique certifiée avant toute commande.',
    tempsLecture: '5 min de lecture',
    image: '/src/assets/images/product_pompe_solaire_1791734645113.jpg'
  },
  {
    id: 'news-02',
    titre: 'Lampadaires Solaires All-in-One vs Split : Quel choix pour les mairies et collectivités ?',
    slug: 'comparatif-lampadaire-solaire-integre-vs-split',
    date: '24 Septembre 2026',
    auteur: 'Équipe Projets DIARRA ENERGIE',
    categorie: 'Éclairage Public',
    resume: 'Analyse comparative entre les luminaires monoblocs intégrés faciles à poser et les lampadaires à panneau séparé pour les voiries à fort gabarit.',
    contenuComplet: 'Le lampadaire solaire All-in-One présente l’avantage d’une installation ultra-rapide en moins de 15 minutes par mât sans câblage extérieur. Cependant, sur les voies de plus de 10 mètres de large ou les autoroutes, le système Split (panneau séparé orientable) permet d’installer des panneaux de 200Wc à 300Wc avec une inclinaison idéale pour garantir 100% de luminosité même durant l’hivernage et la saison des pluies.',
    tempsLecture: '4 min de lecture',
    image: '/src/assets/images/product_lampadaire_solaire_1791734634193.jpg'
  },
  {
    id: 'news-03',
    titre: 'Batteries Lithium LiFePO4 : Pourquoi elles supplantent définitivement le Gel et le Plomb en climat tropical',
    slug: 'pourquoi-choisir-batterie-lithium-lifepo4-climat-chaud',
    date: '12 Septembre 2026',
    auteur: 'Département Électrotechnique',
    categorie: 'Stockage & Énergie',
    resume: 'Une durée de vie multipliée par 5, résistance éprouvée aux températures dépassant 40°C et taux de décharge à 90% sans altération prématurée.',
    contenuComplet: 'Sous les températures ambiantes de Dakar, Cotonou ou Lomé, une batterie au gel subit une dégradation thermique accélérée limitant sa durée de vie à 2 ou 3 ans. La technologie LiFePO4 (Phosphate de fer et de lithium), grâce à sa stabilité chimique remarquable et ses systèmes BMS actifs, tolère des cycles profonds quotidiens avec plus de 6000 cycles garantis, soit plus de 10 ans d’usage continu.',
    tempsLecture: '6 min de lecture',
    image: '/src/assets/images/product_kit_solaire_hybride_1791734655495.jpg'
  }
];

export const DELIVERY_ZONES = [
  {
    pays: 'Sénégal',
    capital: 'Dakar',
    villes: ['Dakar', 'Pikine', 'Guédiawaye', 'Rufisque', 'Thiès', 'Mbour', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 'Touba'],
    fraisBaseFCFA: 5000,
    delaiMoyen: '24h à 72h',
    contactSupport: '+221 77 114 95 39',
    agenceLocale: 'Direction Régionale Sénégal, VDN / Almadies, Dakar'
  },
  {
    pays: 'Bénin',
    capital: 'Cotonou',
    villes: ['Cotonou', 'Abomey-Calavi', 'Porto-Novo', 'Parakou', 'Bohicon', 'Ouidah', 'Natitingou', 'Djougou'],
    fraisBaseFCFA: 6000,
    delaiMoyen: '24h à 72h',
    contactSupport: '+229 97 00 00 00',
    agenceLocale: 'Agence Bénin, Boulevard de la Marina / Haie Vive, Cotonou'
  },
  {
    pays: 'Togo',
    capital: 'Lomé',
    villes: ['Lomé', 'Tsévié', 'Kpalimé', 'Atakpamé', 'Sokodé', 'Kara', 'Dapaong'],
    fraisBaseFCFA: 6000,
    delaiMoyen: '24h à 72h',
    contactSupport: '+228 90 00 00 00',
    agenceLocale: 'Agence Togo, Boulevard du 13 Janvier, Lomé'
  }
];

export const COMPANY_CONTACTS = {
  raisonSociale: 'DIARRA ENERGIE & BUSINESS',
  slogan: 'L’Excellence de l’Énergie Solaire & de l’Éclairage Public en Afrique de l’Ouest',
  emailCommercial: 'contact@diarraenergie.com',
  emailDevis: 'devis@diarraenergie.com',
  whatsappPrincipal: '+221771149539',
  telephonePrincipal: '+221 77 114 95 39',
  heuresOuverture: 'Du Lundi au Vendredi : 08h00 - 18h30 | Samedi : 08h30 - 13h00',
  adresses: [
    {
      pays: 'Sénégal (Siège Régional)',
      adresse: 'Route de la VDN, Immeuble Solaire R+3, Dakar',
      telephone: '+221 77 114 95 39 / +221 33 800 00 00'
    },
    {
      pays: 'Bénin (Représentation Nationale)',
      adresse: 'Boulevard Saint-Michel, Haie Vive, Cotonou',
      telephone: '+229 97 00 00 00'
    },
    {
      pays: 'Togo (Représentation Nationale)',
      adresse: 'Carrefour 3K, Boulevard de la Paix, Lomé',
      telephone: '+228 90 00 00 00'
    }
  ]
};
