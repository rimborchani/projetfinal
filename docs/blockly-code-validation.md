# Guide de Validation par Comparaison de Code 🧑‍💻

## Vue d'ensemble

Cette implémentation introduit une nouvelle méthode de validation des leçons Blockly basée sur la comparaison du code JavaScript généré. Cette approche est plus fiable que l'analyse de la structure des blocs car elle se concentre sur la logique réelle du programme.

## Fonctionnement

### 1. Côté Administrateur
- L'admin crée la solution correcte avec des blocs Blockly
- Le système génère automatiquement le code JavaScript correspondant
- Ce code est sauvegardé comme "code de référence" dans la base de données

### 2. Côté Étudiant
- L'étudiant construit sa solution avec des blocs
- Lors de la soumission, le système génère le code JavaScript de sa solution
- Le code est comparé avec le code de référence
- Si les codes correspondent (après nettoyage), la solution est validée

## Utilisation

### Interface Admin

1. **Accéder à la gestion des leçons** : `/admin/lessons`

2. **Créer/modifier une leçon** avec le code de référence :
   - Remplir les champs habituels (titre, concept, étapes)
   - Cliquer sur "Générer Code de Référence"
   - Construire la solution avec Blockly sur une page de lab
   - Revenir à l'admin et cliquer "Générer depuis Blockly"
   - Le code sera automatiquement généré et peut être sauvegardé

3. **Gestion du code de référence** :
   - Chaque leçon affiche l'état de son code de référence
   - Bouton "Gérer Code" pour chaque leçon
   - Possibilité de voir/modifier le code directement

### Validation Automatique

Le système utilise une hiérarchie de validation :

1. **Validation par code (priorité)** : Si la leçon a un code de référence
2. **Validation par critères** : Si des critères spécifiques sont définis
3. **Validation par cas** : Méthode legacy pour compatibilité

```javascript
// Exemple d'utilisation dans le code
import { validateLessonWithCodeComparison } from '../lib/validation';

const result = await validateLessonWithCodeComparison(workspace, lessonId);
if (result.isValid) {
  console.log('Solution correcte !');
} else {
  console.log('Essayez encore :', result.message);
}
```

## Structure du Code de Référence

Le code de référence est stocké dans la base de données :

```sql
-- Nouveau champ dans le modèle Lesson
correctCode String @default("") -- Generated JavaScript code for validation
```

## API Endpoints

### Mise à jour partielle du code de référence
```http
PATCH /api/lessons/[id]
Content-Type: application/json

{
  "correctCode": "for (var count = 0; count < 4; count++) {\n  moveSteps(10);\n}\nsay('Bravo !');"
}
```

### Récupération d'une leçon avec son code
```http
GET /api/lessons/[id]
```

## Algorithme de Nettoyage

Le système nettoie les codes avant comparaison :

```javascript
function cleanCode(code) {
  // Supprime tous les espaces, tabs, retours à la ligne
  let cleaned = code.replace(/\s+/g, '');
  
  // Supprime les commentaires //
  cleaned = cleaned.replace(/\/\/.*$/gm, '');
  
  // Supprime les commentaires /* */
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
  
  return cleaned;
}
```

## Avantages

1. **Fiabilité** : Se base sur la logique plutôt que la structure visuelle
2. **Flexibilité** : Les étudiants peuvent organiser leurs blocs différemment
3. **Simplicité** : Comparaison directe de chaînes de caractères
4. **Automatisation** : Génération automatique du code de référence
5. **Compatibilité** : Fonctionne avec les méthodes existantes

## Exemples

### Code de référence pour une boucle simple
```javascript
// Blocs : Event + Repeat(4) + Move(10) + Say
for (var count = 0; count < 4; count++) {
  moveSteps(10);
}
say('Bravo !');
```

### Code de référence pour une mélodie
```javascript
// Blocs : Event + PlayNote + Wait + PlayNote
playNote('C', 0.5);
wait(1);
playNote('E', 0.5);
```

## Débogage

Les résultats de validation incluent des informations détaillées :

```javascript
{
  isValid: true/false,
  message: "Message d'état",
  hint: "Conseil pour l'utilisateur",
  userCode: "Code généré par l'étudiant",
  cleanedUserCode: "Code nettoyé de l'étudiant",
  cleanedCorrectCode: "Code nettoyé de référence",
  validationMethod: "code_comparison",
  lessonTitle: "Titre de la leçon",
  lessonId: "ID de la leçon"
}
```

Cette approche offre une validation robuste et flexible pour les leçons Blockly, en se concentrant sur la logique réelle des programmes créés par les étudiants.
