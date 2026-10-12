import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // Initial Database Records
  const databaseData = {
    metadata: {
      nomEntreprise: "DIARRA ENERGIE & BUSINESS",
      description: "Base de données commerciale et technique pour solutions solaires, pompage et éclairage public en Afrique de l'Ouest",
      zones: ["Sénégal", "Bénin", "Togo", "Sous-Région"],
      version: "2.0.0",
      derniereMiseAJour: "2026-10-12T05:00:00Z",
      format: "PostgreSQL Compatible JSON / Relational DDL"
    },
    tables: {
      products: [
        {
          id: "deb-eps-01",
          reference: "DEB-SL-100-PRO",
          nom: "Lampadaire Solaire Intégré All-In-One 100W Lumileds",
          categorie: "eclairage-solaire",
          sousCategorie: "Lampadaires intégrés",
          prixFCFA: 195000,
          estSurDevis: false,
          stockDisponible: 64,
          specs: {
            puissance: "100W LED",
            fluxLumineux: "16 500 Lumens",
            panneauSolaire: "Monocristallin 120Wc",
            batterieType: "LiFePO4 12.8V 54Ah",
            autonomie: "36 à 48 heures",
            hauteurMat: "6 à 8 mètres",
            indiceProtection: "IP66 / IK09",
            garantie: "3 ans"
          }
        },
        {
          id: "deb-eps-02",
          reference: "DEB-SL-150-SPLIT",
          nom: "Lampadaire Solaire Split 150W Haute Puissance Autoroute",
          categorie: "eclairage-solaire",
          sousCategorie: "Lampadaires à panneau séparé",
          prixFCFA: 320000,
          estSurDevis: true,
          stockDisponible: 30,
          specs: {
            puissance: "150W LED Bridgelux",
            fluxLumineux: "24 000 Lumens",
            panneauSolaire: "Bi-verre 200Wc",
            batterieType: "LiFePO4 25.6V 60Ah",
            autonomie: "4 nuits garanties",
            hauteurMat: "8 à 10 mètres",
            indiceProtection: "IP67 / IK10",
            garantie: "5 ans"
          }
        },
        {
          id: "deb-ps-01",
          reference: "DEB-PUMP-SUB-2HP",
          nom: "Système de Pompage Solaire Immergé 2.2kW (3HP) Débit Forage 18m³/h",
          categorie: "pompage-solaire",
          sousCategorie: "Pompes solaires immergées",
          prixFCFA: 890000,
          estSurDevis: false,
          stockDisponible: 18,
          specs: {
            puissance: "2.2 kW / 3.0 HP",
            debitMax: "18 m³/h",
            hmtMax: "115 mètres",
            profondeurImmersion: "40m à 100m",
            garantie: "2 ans"
          }
        },
        {
          id: "deb-kit-01",
          reference: "DEB-KIT-VILLA-5KW",
          nom: "Kit Solaire Hybride Villa & PME 5kVA / 10kWh LiFePO4",
          categorie: "kits-solaires",
          sousCategorie: "Systèmes pour maisons et villas",
          prixFCFA: 3650000,
          estSurDevis: false,
          stockDisponible: 12,
          specs: {
            puissance: "5 000 VA / 5 000 W Pur Sinus",
            batterieCapacite: "51.2V / 200Ah (10.24 kWh LiFePO4)",
            panneauSolaire: "10x 550Wc (5.5 kWc)",
            garantie: "5 ans batterie / 25 ans panneaux"
          }
        },
        {
          id: "deb-comp-01",
          reference: "DEB-PV-550-MONO",
          nom: "Panneau Solaire Monocristallin 550Wc Half-Cell Tier-1",
          categorie: "composants-solaires",
          sousCategorie: "Panneaux photovoltaïques",
          prixFCFA: 65000,
          estSurDevis: false,
          stockDisponible: 450,
          specs: {
            puissance: "550 Wc",
            rendement: "21.8%",
            garantie: "12 ans produit / 25 ans performance"
          }
        }
      ],
      orders: [
        {
          id: "ord-init-1",
          numeroCommande: "DEB-CMD-2026-0842",
          dateCreation: "2026-10-09 14:22",
          client: {
            nomComplet: "Ousmane Fall",
            raisonSociale: "Fall Agro BTP",
            email: "o.fall@fallagro.sn",
            telephone: "+221 77 123 45 67",
            pays: "Sénégal",
            ville: "Thiès"
          },
          totalFCFA: 905000,
          methodeLivraison: "transporteur_interurbain",
          moyenPaiement: "wave",
          statutCommande: "en_preparation",
          statutPaiement: "paye"
        }
      ],
      quotes: [
        {
          id: "quote-init-1",
          numeroDevis: "DEB-DEV-2026-0319",
          dateCreation: "2026-10-07 10:15",
          demandeur: {
            nomComplet: "Mme Aïcha Bio",
            entreprise: "Commune de Parakou — Direction Technique",
            email: "services.techniques@parakou.bj",
            telephone: "+229 97 45 88 12",
            paysProjet: "Bénin",
            villeProjet: "Parakou"
          },
          projet: {
            typeProjet: "eclairage-solaire",
            intitule: "Projet Éclairage Public Solaire Boulevard Central (60 mâts 8m)",
            quantiteEstimee: 60,
            descriptionBesoin: "Installation de 60 lampadaires solaires monoblocs 100W avec candélabres octogonaux 8m."
          },
          estimationEstimeeFCFA: 26400000,
          statut: "en_etude"
        }
      ],
      deliveryZones: [
        { pays: "Sénégal", capital: "Dakar", fraisBaseFCFA: 5000, delaiMoyen: "24h à 72h" },
        { pays: "Bénin", capital: "Cotonou", fraisBaseFCFA: 6000, delaiMoyen: "24h à 72h" },
        { pays: "Togo", capital: "Lomé", fraisBaseFCFA: 6000, delaiMoyen: "24h à 72h" }
      ]
    }
  };

  // 1. JSON Database Endpoint
  app.get('/api/database', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(databaseData);
  });

  // 2. Direct JSON Download Link
  app.get('/api/database/download', (req, res) => {
    res.setHeader('Content-Disposition', 'attachment; filename="diarra_energie_database_backup.json"');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(databaseData, null, 2));
  });

  // 3. PostgreSQL Schema / DDL script endpoint
  app.get('/api/database/sql', (req, res) => {
    const sqlSchema = `
-- ====================================================================
-- BASE DE DONNÉES OFFICIELLE : DIARRA ENERGIE & BUSINESS
-- Version : 2.0 (PostgreSQL / OHADA E-Commerce Compliant)
-- ====================================================================

CREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(50) PRIMARY KEY,
    nom_complet VARCHAR(150) NOT NULL,
    raison_sociale VARCHAR(150),
    type_client VARCHAR(50) DEFAULT 'entreprise',
    email VARCHAR(150) NOT NULL,
    telephone VARCHAR(50) NOT NULL,
    pays VARCHAR(50) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    adresse TEXT NOT NULL,
    numero_fiscal VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(50) PRIMARY KEY,
    reference VARCHAR(50) UNIQUE NOT NULL,
    nom VARCHAR(255) NOT NULL,
    categorie VARCHAR(100) NOT NULL,
    sous_categorie VARCHAR(100),
    prix_fcfa NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    est_sur_devis BOOLEAN DEFAULT FALSE,
    stock_disponible INT DEFAULT 0,
    delai_livraison_jours INT DEFAULT 3,
    specs JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    numero_commande VARCHAR(50) UNIQUE NOT NULL,
    client_id VARCHAR(50) REFERENCES clients(id),
    sous_total_fcfa NUMERIC(14, 2) NOT NULL,
    frais_livraison_fcfa NUMERIC(14, 2) NOT NULL,
    total_fcfa NUMERIC(14, 2) NOT NULL,
    methode_livraison VARCHAR(50) NOT NULL,
    moyen_paiement VARCHAR(50) NOT NULL, -- wave, orange_money, moov_money, mtn_momo, carte_bancaire, virement
    statut_commande VARCHAR(50) DEFAULT 'en_attente', -- en_attente, confirmee, en_preparation, expediee, livree, annulee
    statut_paiement VARCHAR(50) DEFAULT 'en_cours_de_validation',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quotes (
    id VARCHAR(50) PRIMARY KEY,
    numero_devis VARCHAR(50) UNIQUE NOT NULL,
    client_nom VARCHAR(150) NOT NULL,
    client_email VARCHAR(150) NOT NULL,
    client_telephone VARCHAR(50) NOT NULL,
    pays_projet VARCHAR(50) NOT NULL,
    ville_projet VARCHAR(100) NOT NULL,
    type_projet VARCHAR(100) NOT NULL,
    description_besoin TEXT NOT NULL,
    estimation_fcfa NUMERIC(14, 2),
    statut VARCHAR(50) DEFAULT 'recu', -- recu, en_etude, devis_transmis, accepte, refuse
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================================
-- SEED DATA (DIARRA ENERGIE & BUSINESS)
-- ====================================================================
INSERT INTO products (id, reference, nom, categorie, prix_fcfa, est_sur_devis, stock_disponible)
VALUES
('deb-eps-01', 'DEB-SL-100-PRO', 'Lampadaire Solaire Intégré All-In-One 100W', 'eclairage-solaire', 195000, FALSE, 64),
('deb-eps-02', 'DEB-SL-150-SPLIT', 'Lampadaire Solaire Split 150W Autoroute', 'eclairage-solaire', 320000, TRUE, 30),
('deb-ps-01', 'DEB-PUMP-SUB-2HP', 'Système de Pompage Solaire Immergé 2.2kW (3HP)', 'pompage-solaire', 890000, FALSE, 18),
('deb-kit-01', 'DEB-KIT-VILLA-5KW', 'Kit Solaire Hybride 5kVA / 10kWh LiFePO4', 'kits-solaires', 3650000, FALSE, 12),
('deb-comp-01', 'DEB-PV-550-MONO', 'Panneau Solaire Monocristallin 550Wc Tier-1', 'composants-solaires', 65000, FALSE, 450)
ON CONFLICT (id) DO NOTHING;
    `;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(sqlSchema);
  });

  // Mount Vite middleware for development
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });
  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DIARRA ENERGIE & BUSINESS Server running on http://0.0.0.0:${PORT}`);
    console.log(`Database API endpoint: http://0.0.0.0:${PORT}/api/database`);
  });
}

startServer();
