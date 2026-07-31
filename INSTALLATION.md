# 📦 Guide d'Installation Complet

## Option 1 : Installation Locale (Recommandée)

### Prérequis
- **Node.js 16+** ([télécharger](https://nodejs.org/))
- **npm** (inclus avec Node.js)
- **Git** (optionnel)

### Étapes

#### 1. Clonez le projet
```bash
git clone https://github.com/orneturmukan-crypto/genealogie.git
cd genealogie
```

Ou téléchargez le ZIP et extrayez-le.

#### 2. Installez les dépendances
```bash
npm install
```

C'est normal que ça prenne 1-2 minutes.

#### 3. Lancez l'app
```bash
npm run dev
```

Vous verrez quelque chose comme :
```
VITE v5.0.0  ready in XXXms

➜ Local:   http://localhost:5173/
➜ press h to show help
```

#### 4. Ouvrez dans votre navigateur
Cliquez sur le lien ou allez à **http://localhost:5173/**

---

## Option 2 : Déployer sur Vercel (Gratuit)

### Étapes

1. **Créez un compte GitHub** (si vous n'en avez pas)
   - https://github.com/signup

2. **Créez un repo GitHub**
   - Allez sur https://github.com/new
   - Nommez-le `genealogie`
   - Cliquez "Create repository"

3. **Uploadez les fichiers**
   - Cliquez sur "uploading an existing file"
   - Glissez-déposez TOUS les fichiers du projet
   - Commit

4. **Connectez à Vercel**
   - Allez sur https://vercel.com
   - Cliquez "Import Project"
   - Sélectionnez votre repo GitHub
   - Cliquez "Deploy"

5. **Accédez votre app**
   - Vercel vous donnera une URL comme `https://genealogie-xyz.vercel.app`
   - Votre app est maintenant en ligne ! 🎉

---

## Option 3 : Installer comme PWA sur le Téléphone

### Android (Chrome)

1. Ouvrez l'app web sur votre téléphone
2. Cliquez sur le menu ⋮ (trois points)
3. Cliquez "Installer l'application"
4. L'app apparaît sur votre écran d'accueil

### iPhone (Safari)

1. Ouvrez l'app web dans Safari
2. Cliquez le bouton Partager (flèche vers le haut)
3. Cliquez "Sur l'écran d'accueil"
4. Nommez l'app (ex: "Généalogie")
5. Cliquez "Ajouter"

---

## 🐛 Dépannage

### ❌ "npm: command not found"
→ Node.js n'est pas installé. [Téléchargez-le](https://nodejs.org/).

### ❌ "Port 5173 is already in use"
→ Un autre processus utilise le port. Essayez :
```bash
npm run dev -- --port 3000
```

### ❌ L'app ne charge pas
→ Vérifiez que vous êtes dans le bon dossier :
```bash
cd genealogie
npm run dev
```

### ❌ Erreur de build
→ Supprimez `node_modules` et réinstallez :
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 📝 Commandes Utiles

```bash
# Lancer le dev server
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser le build
npm run preview

# Nettoyer les caches
rm -rf node_modules dist
npm install
```

---

## ✅ Vérification

Une fois l'app lancée, vérifiez que vous voyez :
- ✅ "📚 Mon Arbre Généalogique" en titre
- ✅ Boutons "Ajouter", "Exporter", "Importer"
- ✅ Onglets "📋 Liste" et "🌳 Arbre"

Si tout est là, vous êtes prêt ! 🚀

---

## 🆘 Besoin d'aide ?

- Consultez le README.md
- Ouvrez une issue sur GitHub
- Vérifiez que Node.js 16+ est installé

Bon courage ! 📚
