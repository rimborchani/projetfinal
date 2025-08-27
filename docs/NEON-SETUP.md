# 🚀 Guide de Configuration - Base de Données Neon

## 📋 Étapes pour Configurer Neon Database

### 1. Créer un Compte Neon
1. Allez sur [neon.tech](https://neon.tech)
2. Créez un compte gratuit
3. Créez un nouveau projet

### 2. Récupérer l'URL de Connexion
Dans votre dashboard Neon :
1. Allez dans **Settings** → **Connection Details**
2. Copiez la **Connection String**
3. Elle ressemble à : `postgresql://username:password@ep-hostname.region.aws.neon.tech/dbname`

### 3. Configurer l'Application
1. Ouvrez le fichier `.env.local` dans votre projet
2. Remplacez la ligne actuelle par votre vraie URL :
```bash
# Remplacez cette ligne d'exemple :
NEON_DATABASE_URL=postgresql://username:password@hostname/database

# Par votre vraie URL Neon :
NEON_DATABASE_URL=postgresql://votre-username:votre-password@ep-xxx.region.aws.neon.tech/votre-db
```

### 4. Configurer la Base de Données
```bash
# Générer et appliquer les migrations
npm run db:generate
npm run db:push

# Peupler avec des données d'exemple (optionnel)
npm run db:populate
```

### 5. Redémarrer l'Application
```bash
# Arrêter le serveur (Ctrl+C)
# Puis redémarrer
npm run dev
```

## 🔍 Vérification
- ✅ L'indicateur dans l'admin devrait afficher "🗄️ Base de données"
- ✅ Les leçons sont maintenant persistantes
- ✅ Pas de message d'avertissement jaune

## 🛠️ Résolution de Problèmes

### Erreur de Connexion
Si vous voyez encore des erreurs :
1. Vérifiez que l'URL est correcte (sans espaces, caractères spéciaux échappés)
2. Testez la connexion depuis Neon Dashboard
3. Vérifiez que votre base est bien démarrée (pas en veille)

### URL avec Caractères Spéciaux
Si votre mot de passe contient des caractères spéciaux, encodez-les :
- `@` → `%40`
- `#` → `%23`
- `&` → `%26`
- etc.

### Mode Gratuit Neon
Le plan gratuit de Neon :
- ✅ 1 projet
- ✅ 500MB de stockage
- ✅ Parfait pour ce projet
- ⚠️ Mise en veille automatique après inactivité

## 🎯 Mode Actuel
Votre application fonctionne actuellement en **mode stockage temporaire** :
- ✅ Toutes les fonctionnalités marchent
- ⚠️ Les données sont perdues au redémarrage
- 🔄 Configuration Neon optionnelle pour la persistance

Profitez de votre application ! La configuration Neon peut être faite plus tard.
