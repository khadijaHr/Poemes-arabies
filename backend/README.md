# Backend API - Arabic Love Verses

Backend Node.js/Express pour gérer les poèmes arabes avec MySQL.

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- MySQL (v5.7 ou supérieur)
- npm ou yarn

## 🚀 Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer la base de données MySQL

#### Créer la base de données

Ouvrez MySQL et exécutez le fichier `database.sql` :

```bash
mysql -u root -p < database.sql
```

Ou via MySQL Workbench / phpMyAdmin, importez le fichier `database.sql`.

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du dossier backend (copiez `.env.example`) :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=arabic_love_verses
PORT=5000
API_KEY=votre_cle_api_super_secrete
```

**Important :**

1. Remplacez `votre_mot_de_passe` par votre mot de passe MySQL.
2. Définissez `API_KEY` avec une valeur secrète et partagez-la uniquement avec les clients autorisés. Toutes les requêtes vers `/api` doivent fournir cette clé via l'en-tête `x-api-key` ou le paramètre `apiKey`.

## 🎯 Démarrage

### Mode développement (avec auto-reload)

```bash
npm run dev
```

### Mode production

```bash
npm start
```

Le serveur démarrera sur `http://localhost:5000`

## 📡 Routes API

### GET /api/health
Test de santé du serveur
```json
{
  "status": "OK",
  "message": "Backend API is running!"
}
```

### GET /api/poems
Récupère tous les poèmes avec leurs vers
```json
[
  {
    "id": "1",
    "title": "رؤية الحبيب",
    "author": "شاعرة الحب — خديجة هرموش",
    "verses": ["...", "..."],
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /api/poems/:id
Récupère un poème spécifique par son ID
```json
{
  "id": "1",
  "title": "رؤية الحبيب",
  "author": "شاعرة الحب — خديجة هرموش",
  "verses": ["...", "..."],
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

### POST /api/poems
Ajoute un nouveau poème
```json
{
  "title": "Titre du poème",
  "author": "Nom de l'auteur (optionnel)",
  "verses": ["Vers 1", "Vers 2", "Vers 3"]
}
```

## 🗂️ Structure du projet

```
backend/
├── config/
│   └── db.js           # Configuration de la connexion MySQL
├── database.sql        # Schéma et données de la base de données
├── server.js           # Point d'entrée du serveur Express
├── package.json        # Dépendances et scripts
├── .env.example        # Exemple de configuration
└── README.md          # Ce fichier
```

## 🛠️ Technologies utilisées

- **Express.js** - Framework web
- **MySQL2** - Driver MySQL avec support des promesses
- **CORS** - Gestion des requêtes cross-origin
- **dotenv** - Gestion des variables d'environnement
- **Nodemon** - Auto-reload en développement

## 🔧 Dépannage

### Erreur de connexion à la base de données

1. Vérifiez que MySQL est démarré
2. Vérifiez les identifiants dans le fichier `.env`
3. Vérifiez que la base de données `arabic_love_verses` existe

### Port déjà utilisé

Si le port 5000 est déjà utilisé, changez la valeur de `PORT` dans le fichier `.env`

## 📝 Notes

- Le charset UTF8MB4 est utilisé pour supporter les caractères arabes
- Les poèmes sont stockés dans deux tables : `poems` et `verses`
- La relation entre les tables utilise des clés étrangères avec CASCADE DELETE
