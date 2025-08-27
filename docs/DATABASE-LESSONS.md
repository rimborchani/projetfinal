# 📚 Gestion de la Base de Données - Leçons

## 🚀 Configuration Initiale

### 1. Variables d'environnement
Copiez le fichier `.env.example` vers `.env.local` et configurez votre base de données Neon :

```bash
cp .env.example .env.local
```

Éditez `.env.local` et ajoutez votre URL de connexion Neon :
```
NEON_DATABASE_URL=postgresql://username:password@hostname/database
```

### 2. Configuration de la base de données
```bash
# Génère les migrations
npm run db:generate

# Applique les migrations à la base de données
npm run db:push

# Peuple la base avec des leçons d'exemple
npm run db:populate

# Ou faites tout en une commande
npm run db:setup
```

## 🛠️ Utilisation

### Interface d'Administration
Accédez à l'interface de gestion des leçons :
```
http://localhost:3000/admin/lessons
```

### API Endpoints
```javascript
// Récupérer toutes les leçons
GET /api/lessons

// Récupérer une leçon spécifique
GET /api/lessons/[id]

// Créer une nouvelle leçon
POST /api/lessons
{
  "titre": "Titre de la leçon",
  "step1": "Description étape 1",
  "step2": "Description étape 2", 
  "step3": "Description étape 3",
  "step4": "Description étape 4"
}

// Modifier une leçon
PUT /api/lessons/[id]
{
  "titre": "Nouveau titre",
  "step1": "Nouvelle étape 1",
  ...
}

// Supprimer une leçon
DELETE /api/lessons/[id]
```

## 🗃️ Structure de la Base de Données

### Table `lessons`
```sql
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  titre TEXT NOT NULL,
  step1 TEXT NOT NULL,
  step2 TEXT NOT NULL,
  step3 TEXT NOT NULL,
  step4 TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

## 📱 Intégration dans l'Application

Les leçons sont automatiquement chargées depuis la base de données dans `InteractiveLab.js`. Le système utilise :

1. **LessonService** : Service pour les opérations CRUD
2. **lessonsDB.js** : Cache et fallback vers les leçons statiques
3. **API Routes** : Endpoints REST pour l'administration
4. **LessonManagement** : Interface d'administration

## 🔄 Migration depuis les Leçons Statiques

L'application utilise un système de fallback :
- Si la base de données est accessible → utilise les leçons de la BDD
- Si la base de données n'est pas accessible → utilise les leçons statiques

Cela garantit que l'application fonctionne toujours, même sans connexion à la base de données.

## 🛠️ Commandes Utiles

```bash
# Ouvrir Drizzle Studio pour visualiser les données
npm run db:studio

# Régénérer les migrations après modification du schéma
npm run db:generate

# Appliquer les migrations
npm run db:push

# Repeupler la base avec les exemples
npm run db:populate
```

## 🎯 Bonnes Pratiques

1. **Sauvegarde** : Sauvegardez régulièrement votre base Neon
2. **Validation** : Les leçons sont validées avant insertion
3. **Cache** : Les leçons sont mises en cache côté client (5 min)
4. **Fallback** : Système de repli vers les leçons statiques
5. **API** : Utilisez les endpoints REST pour l'intégration externe
