# 🎯 Validation des valeurs spécifiques des blocs

## Comment valider qu'un bloc a la bonne valeur

### Exemple : "Avancer 10 pas"

**Votre instruction :** "Ajouter le bloc avancer 10 pas"

**Configuration de validation :**
```json
[
  {
    "type": "block_presence",
    "blockType": "motion_movesteps",
    "errorMessage": "🚶 Ajouter le bloc 'avancer'"
  },
  {
    "type": "block_field_value",
    "blockType": "motion_movesteps",
    "fieldName": "STEPS",
    "expectedValue": "10",
    "successMessage": "✅ Parfait! Avancer 10 pas!",
    "errorMessage": "❌ Changer la valeur à 10 pas"
  }
]
```

### Exemple : "Répéter 4 fois"

**Votre instruction :** "Ajouter une boucle répéter 4 fois"

**Configuration de validation :**
```json
[
  {
    "type": "block_presence",
    "blockType": "control_repeat",
    "errorMessage": "🔄 Ajouter le bloc 'répéter'"
  },
  {
    "type": "block_field_value",
    "blockType": "control_repeat",
    "fieldName": "TIMES",
    "expectedValue": "4",
    "successMessage": "✅ Parfait! Répéter 4 fois!",
    "errorMessage": "❌ Changer à 'répéter 4 fois'"
  }
]
```

### Exemple : "Tourner de 90 degrés"

**Votre instruction :** "Tourner à droite de 90 degrés"

**Configuration de validation :**
```json
[
  {
    "type": "block_presence",
    "blockType": "motion_turnright",
    "errorMessage": "↻ Ajouter le bloc 'tourner à droite'"
  },
  {
    "type": "block_field_value",
    "blockType": "motion_turnright",
    "fieldName": "DEGREES",
    "expectedValue": "90",
    "successMessage": "✅ Parfait! 90 degrés!",
    "errorMessage": "❌ Changer l'angle à 90 degrés"
  }
]
```

## 📋 Liste des champs pour chaque bloc

### Blocs de mouvement
- `motion_movesteps` → Champ: `"STEPS"` (ex: "10", "50")
- `motion_turnright` → Champ: `"DEGREES"` (ex: "90", "45")
- `motion_turnleft` → Champ: `"DEGREES"` (ex: "90", "45")
- `motion_goto` → Champs: `"X"` et `"Y"` (ex: "100", "-50")

### Blocs de contrôle
- `control_repeat` → Champ: `"TIMES"` (ex: "4", "10")
- `control_wait` → Champ: `"DURATION"` (ex: "1", "2.5")

### Blocs d'apparence
- `looks_say` → Champ: `"MESSAGE"` (ex: "Bonjour!", "Fini!")
- `looks_think` → Champ: `"MESSAGE"` (ex: "Je réfléchis...")

### Blocs de son
- `sound_play_note` → Champs: `"NOTE"` (ex: "60") et `"DURATION"` (ex: "0.5")

## 🔍 Comment ça fonctionne dans le code

1. **L'étudiant glisse un bloc** "avancer X pas"
2. **Il change la valeur** à 10 pas
3. **Il clique "Vérifier mon travail"**
4. **Le système vérifie :**
   - Bloc `motion_movesteps` présent ? ✅
   - Champ `STEPS` = "10" ? ✅
   - → Validation réussie ! 🎉

## 📝 Exemple complet - Leçon "Dessiner un carré"

**Instructions de la leçon :**
- "Ajouter l'événement quand drapeau cliqué"
- "Ajouter une boucle répéter 4 fois"
- "Dans la boucle, avancer de 50 pas"
- "Dans la boucle, tourner à droite de 90 degrés"

**Configuration de validation :**
```json
[
  {
    "type": "block_presence",
    "blockType": "event_whenflagclicked",
    "errorMessage": "🏁 Ajouter l'événement 'quand drapeau cliqué'"
  },
  {
    "type": "block_presence",
    "blockType": "control_repeat",
    "errorMessage": "🔄 Ajouter la boucle 'répéter'"
  },
  {
    "type": "block_field_value",
    "blockType": "control_repeat",
    "fieldName": "TIMES",
    "expectedValue": "4",
    "errorMessage": "❌ Changer à 'répéter 4 fois'"
  },
  {
    "type": "block_presence",
    "blockType": "motion_movesteps",
    "errorMessage": "🚶 Ajouter 'avancer' dans la boucle"
  },
  {
    "type": "block_field_value",
    "blockType": "motion_movesteps",
    "fieldName": "STEPS",
    "expectedValue": "50",
    "errorMessage": "❌ Changer à 'avancer 50 pas'"
  },
  {
    "type": "block_presence",
    "blockType": "motion_turnright",
    "errorMessage": "↻ Ajouter 'tourner à droite' dans la boucle"
  },
  {
    "type": "block_field_value",
    "blockType": "motion_turnright",
    "fieldName": "DEGREES",
    "expectedValue": "90",
    "errorMessage": "❌ Changer à '90 degrés'"
  }
]
```

## 🎨 Messages personnalisés

Vous pouvez personnaliser les messages selon votre texte :

```json
{
  "type": "block_field_value",
  "blockType": "motion_movesteps",
  "fieldName": "STEPS",
  "expectedValue": "10",
  "successMessage": "🎉 Super! Nexie va avancer de 10 pas!",
  "errorMessage": "🚶 Change le nombre de pas à 10",
  "hint": "Clique sur le nombre dans le bloc et tape 10"
}
```

## 🧪 Comment tester

1. Ajoutez cette configuration à votre leçon
2. L'étudiant glisse les blocs
3. S'il met "avancer 5 pas" au lieu de "10", il voit le message d'erreur
4. S'il corrige à "10 pas", validation réussie!

C'est ainsi que le système reconnaît exactement quel bloc et quelle valeur sont corrects selon votre texte d'instruction!
