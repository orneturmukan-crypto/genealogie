#!/bin/bash

echo "🚀 Démarrage de l'application Généalogie..."
echo ""

# Vérifier si Node est installé
if ! command -v node &> /dev/null
then
    echo "❌ Node.js n'est pas installé !"
    echo "📥 Téléchargez-le sur https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js trouvé : $(node -v)"
echo "✅ npm trouvé : $(npm -v)"
echo ""

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    echo ""
fi

# Lancer le dev server
echo "🎯 Lancement du serveur développement..."
echo "📱 Ouvrez votre navigateur à : http://localhost:5173"
echo ""
npm run dev
