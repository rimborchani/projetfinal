# 📝 Exemple de Remplissage du Champ `correctCode`

## Scénario : Leçon "Faire danser Nexie"

### 🎯 Objectif de la leçon
Créer une séquence où Nexie danse en bougeant et en jouant de la musique.

### 📋 Étapes de la leçon
1. **Step 1**: Ajouter le bloc "quand drapeau cliqué"
2. **Step 2**: Faire avancer Nexie de 50 pas
3. **Step 3**: Faire tourner Nexie à droite de 90 degrés  
4. **Step 4**: Jouer la note "Do" pendant 0.5 seconde
5. **Step 5**: Répéter cette séquence 4 fois

---

## 🔧 Processus de Génération du Code de Référence

### Étape 1 : L'admin construit la solution avec des blocs

```
🟨 Quand drapeau cliqué
   ↓
🟡 Répéter 4 fois
   ↓ (à l'intérieur de la boucle)
   🔵 Avancer de 50 pas
   ↓
   🔵 Tourner à droite de 90 degrés  
   ↓
   🟣 Jouer la note Do pendant 0.5 sec
```

### Étape 2 : Blockly génère automatiquement le code JavaScript

```javascript
for (var count = 0; count < 4; count++) {
  moveSteps(50);
  turnRight(90);
  playNote('C4', 0.5);
}
```

### Étape 3 : Ce code est stocké dans la colonne `correctCode`

---

## 💾 Exemple d'Enregistrement en Base de Données

```sql
INSERT INTO lessons (
  titre, 
  concept, 
  preview, 
  step1, 
  step2, 
  step3, 
  step4, 
  correctCode
) VALUES (
  'Faire danser Nexie',
  
  'Apprendre à combiner mouvement, rotation et son pour créer une danse',
  
  'Une leçon amusante pour créer une chorégraphie avec Nexie',
  
  'Commencez avec le bloc "quand drapeau cliqué" depuis la catégorie Événements',
  
  'Ajoutez le bloc "répéter 4 fois" depuis la catégorie Contrôle',
  
  'À l''intérieur de la boucle, placez "avancer de 50 pas" puis "tourner à droite de 90°"',
  
  'Terminez par "jouer la note Do" pour ajouter de la musique à la danse',
  
  'for (var count = 0; count < 4; count++) {
  moveSteps(50);
  turnRight(90);
  playNote(''C4'', 0.5);
}'
);
```

---

## 🧪 Exemples de Solutions Acceptées

Grâce au système de validation par code, **toutes ces solutions seraient acceptées** :

### ✅ Solution 1 : Structure classique
```
Event → Repeat(Motion + Motion + Sound)
```

### ✅ Solution 2 : Séquence décomposée  
```
Event → Motion → Motion → Sound → Motion → Motion → Sound → ...
```

### ✅ Solution 3 : Avec variables
```
Event → Set steps=50 → Repeat(Forward(steps) + TurnRight(90) + PlayNote(C))
```

**Pourquoi ?** Parce qu'elles génèrent toutes le **même code JavaScript final** après nettoyage !

---

## 📱 Interface Admin - Exemple Pratique

### Avant (sans correctCode)
```
Titre: "Faire danser Nexie"
Step 1: "Ajouter quand drapeau cliqué"
Step 2: "Répéter 4 fois..."
❌ Validation rigide - seul UN arrangement accepté
```

### Après (avec correctCode)
```
Titre: "Faire danser Nexie"
Step 1: "Ajouter quand drapeau cliqué"
Step 2: "Répéter 4 fois..."
Code de référence: ✅ Configuré (127 caractères)
🔧 [Gérer Code]

Détails:
┌─ Code généré ────────────────────────────┐
│ for (var count = 0; count < 4; count++) {│
│   moveSteps(50);                         │
│   turnRight(90);                         │
│   playNote('C4', 0.5);                  │
│ }                                        │
└──────────────────────────────────────────┘

📊 Workspace: 5 blocs (Event✅, Motion✅, Sound✅, Control✅)
```

---

## 🎮 Validation en Action

### Code Étudiant Exemple 1 (Formaté différemment)
```javascript
for(var count=0;count<4;count++){
moveSteps(50);turnRight(90);playNote('C4',0.5);
}
```

### Processus de Validation
```javascript
// Code de référence (nettoyé)
const referenceClean = "for(varcount=0;count<4;count++){moveSteps(50);turnRight(90);playNote('C4',0.5);}"

// Code étudiant (nettoyé)  
const studentClean = "for(varcount=0;count<4;count++){moveSteps(50);turnRight(90);playNote('C4',0.5);}"

// Comparaison
referenceClean === studentClean // ✅ true → VALIDÉ !
```

---

## 🔍 Exemple de Données Seed Complètes

```javascript
const exampleLessons = [
  {
    titre: "Faire danser Nexie",
    concept: "Combiner mouvement, rotation et son dans une boucle pour créer une danse",
    preview: "Créer une chorégraphie amusante avec Nexie",
    step1: "Commencez avec le bloc 'quand drapeau cliqué' depuis la catégorie Événements",
    step2: "Ajoutez le bloc 'répéter 4 fois' depuis la catégorie Contrôle",  
    step3: "À l'intérieur de la boucle, placez 'avancer de 50 pas' puis 'tourner à droite de 90°'",
    step4: "Terminez par 'jouer la note Do' pour ajouter de la musique à la danse",
    correctCode: `for (var count = 0; count < 4; count++) {
  moveSteps(50);
  turnRight(90);
  playNote('C4', 0.5);
}`
  },
  
  {
    titre: "Message secret de Nexie", 
    concept: "Utiliser les blocs de texte et d'attente pour créer des messages qui apparaissent progressivement",
    preview: "Faire dire plusieurs messages à Nexie avec des pauses",
    step1: "Commencez avec le bloc 'quand drapeau cliqué'",
    step2: "Ajoutez 'dire Salut!' pendant 2 secondes",
    step3: "Ajoutez 'attendre 1 seconde'", 
    step4: "Terminez par 'dire Comment ça va?' pendant 2 secondes",
    correctCode: `say('Salut!', 2);
wait(1);
say('Comment ça va?', 2);`
  }
];
```

---

## ✨ Résultat Final

Avec ce système, l'admin peut :

1. **Créer visuellement** la solution avec des blocs 🧩
2. **Générer automatiquement** le code de référence ⚡
3. **Valider intelligemment** toutes les solutions équivalentes ✅
4. **Maintenir facilement** les leçons sans coder 🛠️

Et les étudiants bénéficient d'une validation **plus juste** et **plus flexible** ! 🎉
