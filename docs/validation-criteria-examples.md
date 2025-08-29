# Exemples de critères de validation pour les leçons

Ce document explique comment structurer les critères de validation dans les données de vos leçons pour utiliser le système de validation dynamique.

## Structure des critères de validation

Dans vos données de leçon, ajoutez un champ `validationCriteria` qui contient un tableau d'objets de critères :

```json
{
  "id": "lesson_001",
  "title": "Ma première animation",
  "description": "Apprendre à faire bouger un sprite",
  "validationCriteria": [
    {
      "type": "block_presence",
      "blockType": "event_whenflagclicked",
      "required": true,
      "successMessage": "✅ Parfait! Événement ajouté!",
      "errorMessage": "❌ Ajouter le bloc 'quand drapeau cliqué'",
      "hint": "Cherchez dans la catégorie Événements (orange)",
      "category": "Events"
    },
    {
      "type": "block_connection",
      "sourceBlock": "event_whenflagclicked",
      "targetBlock": "motion_movesteps",
      "required": true,
      "successMessage": "✅ Blocs bien connectés!",
      "errorMessage": "🔗 Connecter le mouvement sous l'événement"
    }
  ]
}
```

## Types de critères disponibles

### 1. `block_presence` - Présence d'un bloc
Vérifie qu'un bloc spécifique est présent dans l'espace de travail.

```json
{
  "type": "block_presence",
  "blockType": "motion_movesteps",
  "required": true,
  "successMessage": "✅ Bloc de mouvement ajouté!",
  "errorMessage": "❌ Ajouter un bloc de mouvement",
  "hint": "Catégorie Motion (bleue)",
  "category": "Motion"
}
```

### 2. `block_connection` - Connexion entre blocs
Vérifie qu'un bloc est connecté à un autre.

```json
{
  "type": "block_connection",
  "sourceBlock": "event_whenflagclicked",
  "targetBlock": "motion_movesteps",
  "required": true,
  "successMessage": "✅ Connexion correcte!",
  "errorMessage": "🔗 Connecter les blocs ensemble"
}
```

### 3. `block_sequence` - Séquence de blocs
Vérifie qu'une séquence de blocs est dans le bon ordre.

```json
{
  "type": "block_sequence",
  "sequence": [
    "event_whenflagclicked",
    "control_repeat",
    "motion_movesteps"
  ],
  "required": true,
  "successMessage": "✅ Séquence parfaite!",
  "errorMessage": "❌ Vérifier l'ordre des blocs"
}
```

### 4. `block_field_value` - Valeur d'un champ
Vérifie qu'un champ d'un bloc a la bonne valeur.

```json
{
  "type": "block_field_value",
  "blockType": "motion_movesteps",
  "fieldName": "STEPS",
  "expectedValue": "10",
  "required": true,
  "successMessage": "✅ Nombre de pas correct!",
  "errorMessage": "❌ Changer à 10 pas"
}
```

### 5. `block_count` - Nombre de blocs
Vérifie qu'il y a le bon nombre de blocs d'un type donné.

```json
{
  "type": "block_count",
  "blockType": "motion_movesteps",
  "expectedCount": 2,
  "required": true,
  "successMessage": "✅ Bon nombre de blocs de mouvement!",
  "errorMessage": "❌ Il faut exactement 2 blocs de mouvement"
}
```

## Exemple complet - Leçon "Dessiner un carré"

```json
{
  "id": "square_lesson",
  "title": "Dessiner un carré avec Nexie",
  "description": "Programmer Nexie pour dessiner un carré parfait",
  "validationCriteria": [
    {
      "type": "block_presence",
      "blockType": "event_whenflagclicked",
      "required": true,
      "successMessage": "🎉 Événement de départ ajouté!",
      "errorMessage": "🏁 Ajouter le bloc 'quand drapeau vert cliqué'",
      "hint": "Catégorie Événements (orange)",
      "category": "Events"
    },
    {
      "type": "block_connection",
      "sourceBlock": "event_whenflagclicked",
      "targetBlock": "control_repeat",
      "required": true,
      "successMessage": "🔄 Boucle connectée!",
      "errorMessage": "🔗 Connecter la boucle 'répéter' sous l'événement"
    },
    {
      "type": "block_field_value",
      "blockType": "control_repeat",
      "fieldName": "TIMES",
      "expectedValue": "4",
      "required": true,
      "successMessage": "✅ Répéter 4 fois pour un carré!",
      "errorMessage": "❌ Changer à 'répéter 4 fois'"
    },
    {
      "type": "block_presence",
      "blockType": "motion_movesteps",
      "required": true,
      "successMessage": "🚶 Mouvement ajouté!",
      "errorMessage": "➡️ Ajouter 'avancer de X pas' dans la boucle",
      "category": "Motion"
    },
    {
      "type": "block_presence",
      "blockType": "motion_turnright",
      "required": true,
      "successMessage": "↻ Rotation ajoutée!",
      "errorMessage": "🔄 Ajouter 'tourner à droite de 90°' dans la boucle",
      "category": "Motion"
    },
    {
      "type": "block_field_value",
      "blockType": "motion_turnright",
      "fieldName": "DEGREES",
      "expectedValue": "90",
      "required": true,
      "successMessage": "✅ Angle parfait pour un carré!",
      "errorMessage": "❌ Changer l'angle à 90 degrés"
    }
  ]
}
```

## Comment utiliser dans votre interface

Dans votre composant React, vous pouvez maintenant utiliser la validation dynamique :

```javascript
// Au lieu de passer task.blockType, passez l'objet task avec lessonId
const handleValidation = async () => {
  const result = await validateTaskCompletion(workspace, {
    lessonId: currentLesson.id  // ID de la leçon courante
  });
  
  setValidationResult(result);
};
```

## Avantages de cette approche

1. **Flexibilité** : Ajoutez de nouveaux types de validation sans modifier le code
2. **Maintenabilité** : Toute la logique de validation est centralisée
3. **Évolutivité** : Facile d'ajouter de nouvelles leçons via l'admin
4. **Réutilisabilité** : Les critères peuvent être combinés pour créer des validations complexes
5. **Personnalisation** : Messages et indices adaptés à chaque leçon

Cette méthode vous permet de gérer toutes vos validations directement depuis la page d'administration, sans avoir besoin de modifier le code à chaque nouvelle leçon !
