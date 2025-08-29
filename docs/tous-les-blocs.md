# 📋 Référence Complète - Tous les Blocs

## 🎯 RÉPONSE DIRECTE

**NON !** Il n'y a pas une fonction de validation pour chaque bloc.

Il y a **UNE SEULE fonction intelligente** qui s'adapte à TOUS les blocs selon votre configuration.

## 🧠 Le Secret du Système

```javascript
// UNE fonction universelle qui fonctionne pour TOUS les blocs
function validateSingleCriterion(workspace, blockTypes, allBlocks, criterion) {
  switch (criterion.type) {
    case 'block_presence':     // Le bloc existe ?
    case 'block_field_value':  // La valeur est correcte ?
    case 'block_connection':   // Les blocs sont connectés ?
    case 'block_sequence':     // L'ordre est bon ?
    case 'block_count':        // Le nombre est correct ?
  }
}
```

## 📝 TOUS LES BLOCS DISPONIBLES

### 🟠 Événements (Events)
- `event_whenflagclicked` → Quand drapeau cliqué

### 🔵 Mouvement (Motion)  
- `motion_movesteps` → Avancer (champ: `STEPS`)
- `motion_goto` → Aller à position (champs: `X`, `Y`)
- `motion_turnright` → Tourner droite (champ: `DEGREES`)
- `motion_turnleft` → Tourner gauche (champ: `DEGREES`)
- `motion_glide` → Glisser (champs: `SECS`, `X`, `Y`)

### 🟡 Contrôle (Control)
- `control_repeat` → Répéter (champ: `TIMES`)
- `control_wait` → Attendre (champ: `DURATION`)

### 🟣 Apparence (Looks)
- `looks_say` → Dire (champ: `MESSAGE`)
- `looks_think` → Penser (champ: `MESSAGE`)

### 🟢 Son (Sound)
- `sound_play` → Jouer son
- `sound_play_note` → Jouer note (champs: `NOTE`, `DURATION`)

### 💬 Chat
- `chat_set_username` → Nom (champ: `USERNAME`)
- `chat_send_message` → Message (champ: `MESSAGE`)

## 🔧 5 VALIDATIONS UNIVERSELLES

Ces 5 types marchent pour TOUS les blocs :

### 1️⃣ Bloc présent ?
```json
{
  "type": "block_presence",
  "blockType": "motion_movesteps",
  "errorMessage": "🚶 Ajouter le bloc avancer"
}
```

### 2️⃣ Valeur correcte ?
```json
{
  "type": "block_field_value",
  "blockType": "motion_movesteps",
  "fieldName": "STEPS",
  "expectedValue": "10",
  "errorMessage": "❌ Changer à 10 pas"
}
```

### 3️⃣ Blocs connectés ?
```json
{
  "type": "block_connection",
  "sourceBlock": "event_whenflagclicked",
  "targetBlock": "motion_movesteps",
  "errorMessage": "🔗 Connecter les blocs"
}
```

### 4️⃣ Ordre correct ?
```json
{
  "type": "block_sequence",
  "sequence": ["event_whenflagclicked", "motion_movesteps"],
  "errorMessage": "❌ Mauvais ordre"
}
```

### 5️⃣ Nombre correct ?
```json
{
  "type": "block_count",
  "blockType": "motion_movesteps",
  "expectedCount": 3,
  "errorMessage": "❌ Il faut 3 blocs de mouvement"
}
```

## 🎯 EXEMPLE CONCRET

**Votre instruction :** "Répéter 4 fois : avancer 50 pas, tourner 90°"

**Configuration automatique :**
```json
[
  {
    "type": "block_field_value",
    "blockType": "control_repeat",
    "fieldName": "TIMES",
    "expectedValue": "4",
    "errorMessage": "🔄 Changer à répéter 4 fois"
  },
  {
    "type": "block_field_value",
    "blockType": "motion_movesteps",
    "fieldName": "STEPS",
    "expectedValue": "50",
    "errorMessage": "🚶 Changer à 50 pas"
  },
  {
    "type": "block_field_value",
    "blockType": "motion_turnright",
    "fieldName": "DEGREES",
    "expectedValue": "90",
    "errorMessage": "↻ Changer à 90 degrés"
  }
]
```

**Résultat :** Le système vérifie automatiquement chaque valeur selon vos critères !

## ✨ AVANTAGES

✅ **Pas de code à écrire** - Juste de la configuration  
✅ **Fonctionne pour tous les blocs** - Même les futurs  
✅ **Messages personnalisés** - Pour chaque situation  
✅ **Flexible** - Combinez les validations  
✅ **Extensible** - Ajoutez facilement de nouveaux types  

## 🚀 CONCLUSION

Vous n'avez **JAMAIS** besoin de créer une nouvelle fonction de validation !

Le système s'adapte automatiquement à tous vos blocs avec les mêmes 5 types de validation universels.

**C'est ça, la magie du système ! ✨**
