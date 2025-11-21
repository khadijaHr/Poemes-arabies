# 🌐 Arabic Love Verses — Site officiel  
👉 **https://ashaaral3ishq.com/**

# Guide d'installation - Arabic Love Verses avec Backend

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

## 🚀 Installation

### 1. Installer les dépendances du frontend

```bash
# À la racine du projet
npm install
```

### 2. Installer les dépendances du backend

```bash
cd server
npm install
cd ..
```

## ▶️ Démarrage de l'application

Vous devez démarrer **deux serveurs** : le backend et le frontend.

### Option 1 : Démarrage manuel 

**Terminal 1 - Backend :**
```bash
cd backend
npm start
```
Le serveur backend démarre sur `http://localhost:5000`

**Terminal 2 - Frontend :**
```bash
npm run dev
```
Le frontend démarre sur `http://localhost:8080` (ou un autre port)

## 🔧 Configuration

### Changer l'URL de l'API dans le frontend

Éditez `src/services/api.ts` et `.env`:
```typescript
const API_URL = 'http://localhost:5000/api/poems?apiKey=Apc1cwNz5@8'; // Changez l'URL
```

## 🌐 Déploiement en production

### Backend
- Déployez le dossier `backend/` sur un service comme Heroku, Railway, ou Render
- Configurez la variable d'environnement `PORT`
- Mettez à jour CORS pour n'accepter que votre domaine frontend

### Frontend
- Mettez à jour `API_URL` avec l'URL de votre backend en production
- Buildez : `npm run build`
- Déployez le dossier `dist/` sur Netlify, Vercel, ou autre

## 🐛 Dépannage

### Le frontend ne peut pas se connecter au backend

1. Vérifiez que le backend est démarré sur le port 5000
2. Vérifiez l'URL dans `api.ts` et `.env`
3. Vérifiez la console du navigateur pour les erreurs CORS

### Les commentaires ne se sauvegardent pas

1. Vérifiez les logs du serveur backend pour les erreurs
2. Testez l'API avec : `http://localhost:5000/api/health`

