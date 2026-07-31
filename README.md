# 📚 Mon Arbre Généalogique

Une application web progressive (PWA) pour gérer votre généalogie avec le système Sosa-Stradonitz.

## ✨ Fonctionnalités

- 🌳 **Vue Arbre Hiérarchique** - Visualisez votre généalogie de manière interactive
- 📋 **Vue Liste** - Gérez les individus dans une liste détaillée
- 🔢 **Système Sosa-Stradonitz** - Numérotation standardisée des généalogies
- 📅 **Gestion des Dates** - Naissance, décès, mariage
- 📍 **Lieux** - Enregistrez les lieux de vie
- 💍 **Mariage** - Date et lieu de mariage
- 📊 **Statistiques** - Nombre total, générations, vivants/décédés
- 🔍 **Recherche et Filtrage** - Trouvez rapidement un individu
- 💾 **Sauvegarde Automatique** - Vos données sont sauvegardées localement
- 📤 **Export/Import JSON** - Sauvegardez et restaurez vos données
- 📱 **PWA** - Installez l'app sur votre téléphone!

## 🚀 Installation

### Prérequis
- Node.js 16+ et npm

### Étapes

1. **Clonez le repo** :
```bash
git clone https://github.com/orneturmukan-crypto/genealogie.git
cd genealogie
```

2. **Installez les dépendances** :
```bash
npm install
```

3. **Lancez le serveur de développement** :
```bash
npm run dev
```

4. **Ouvrez votre navigateur** :
```
http://localhost:5173
```

## 🏗️ Build pour la Production

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`.

## 📱 Installation comme PWA

### Sur Android (Chrome)
1. Ouvrez l'app dans Chrome
2. Cliquez sur le menu ⋮
3. Cliquez sur "Installer l'application"

### Sur iPhone (Safari)
1. Ouvrez l'app dans Safari
2. Cliquez sur Partager
3. Cliquez sur "Sur l'écran d'accueil"

## 💾 Données

Vos données sont stockées **localement** dans votre navigateur (localStorage) et ne sont jamais envoyées à un serveur.

### Sauvegarde
Utilisez le bouton "Exporter" pour télécharger vos données en JSON.

### Restauration
Utilisez le bouton "Importer" pour charger vos données sauvegardées.

## 📖 Système Sosa-Stradonitz

Ce système numérique standard numérate les ancêtres :

```
       1 (vous)
      / \
     2   3  (parents)
    / \ / \
   4 5 6 7 (grands-parents)
  /...
```

**Règle** : Le père d'une personne n'est = 2 × numéro. La mère = 2 × numéro + 1.

## 🛠️ Stack Technique

- **React 18** - Interface utilisateur
- **Vite 5** - Bundler et dev server
- **Tailwind CSS 3** - Styles
- **Lucide React** - Icônes
- **vite-plugin-pwa** - Support PWA

## 📝 Structure du Projet

```
genealogie/
├── src/
│   ├── App.jsx          # Composant principal
│   ├── main.jsx         # Point d'entrée
│   └── index.css        # Styles Tailwind
├── index.html           # HTML principal
├── vite.config.js       # Config Vite
├── tailwind.config.js   # Config Tailwind
├── package.json         # Dépendances
└── README.md            # Ce fichier
```

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à :
- Reporter des bugs
- Proposer des améliorations
- Soumettre des pull requests

## 📄 Licence

MIT

## 👤 Auteur

Créé avec ❤️ pour les amateurs de généalogie.

---

**Besoin d'aide ?** Consultez la documentation ou ouvrez une issue sur GitHub.
