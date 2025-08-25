# Guide Pratique de Validation Blockly

## 🎯 Guide pour les Éducateurs

Ce guide pratique vous aide à comprendre et utiliser efficacement le système de validation Blockly pour créer des expériences d'apprentissage optimales.

## 📚 Configuration d'une Nouvelle Leçon

### Étape 1: Définir la Structure de la Leçon

```javascript
const nouvelleLecon = {
  id: 7,
  title: "Ma Nouvelle Leçon",
  concept: "Description du concept à apprendre",
  tasks: [
    {
      id: 1,
      instruction: "Instructions claires pour l'étudiant",
      blockType: "type_de_bloc_attendu",
      category: "Catégorie du bloc",
      blockImage: "/blocks/image.png",
      hint: "Indice utile pour aider l'étudiant"
    }
  ],
  toolboxCategories: ["Events", "Motion", "Control"],
  expectedBlocks: [
    {
      type: "event_whenflagclicked",
      next: {
        type: "motion_movesteps",
        fields: { STEPS: 10 }
      }
    }
  ]
};
```

### Étape 2: Ajouter la Validation

Dans `src/lib/validation.js`, ajoutez votre nouveau cas de validation:

```javascript
case 'mon_nouveau_bloc':
  return {
    isValid: blockTypes.includes('mon_nouveau_bloc'),
    message: blockTypes.includes('mon_nouveau_bloc') 
      ? 'Excellent! Vous avez ajouté le nouveau bloc!' 
      : 'Ajoutez le bloc depuis la catégorie appropriée.'
  };
```

### Étape 3: Configurer les Hints

```javascript
case 'mon_nouveau_bloc':
  if (!blockTypes.includes('mon_nouveau_bloc')) {
    return "Cherchez dans la catégorie Personnalisée pour le nouveau bloc.";
  }
  break;
```

## 🔧 Types de Validation Disponibles

### 1. Validation Simple (Présence de Bloc)
```javascript
// Vérifie simplement si le bloc est présent
case 'sound_play':
  return {
    isValid: blockTypes.includes('sound_play'),
    message: blockTypes.includes('sound_play') 
      ? 'Super! Vous avez ajouté le son!' 
      : 'Ajoutez un bloc son de la catégorie Son.'
  };
```

### 2. Validation avec Connexion
```javascript
// Vérifie la présence ET la connexion correcte
case 'motion_movesteps':
  const hasEventBlock = blockTypes.includes('event_whenflagclicked');
  const hasMotionBlock = blockTypes.includes('motion_movesteps');
  
  if (!hasEventBlock) {
    return {
      isValid: false,
      message: 'Ajoutez d\'abord le bloc "quand drapeau cliqué".'
    };
  }

  if (hasEventBlock && hasMotionBlock) {
    const eventBlock = allBlocks.find(block => block.type === 'event_whenflagclicked');
    const nextBlock = eventBlock.getNextBlock();
    
    if (nextBlock && nextBlock.type === 'motion_movesteps') {
      return {
        isValid: true,
        message: 'Parfait! Les blocs sont bien connectés!'
      };
    }
  }
```

### 3. Validation avec Valeurs de Champs
```javascript
// Vérifie les valeurs des paramètres
const validateBlockFields = (actualBlock, expectedFields) => {
  for (const [fieldName, expectedValue] of Object.entries(expectedFields)) {
    const actualValue = actualBlock.getFieldValue(fieldName);
    if (actualValue !== expectedValue) {
      return {
        isValid: false,
        message: `${fieldName} devrait être ${expectedValue}, mais c'est ${actualValue}.`
      };
    }
  }
  return { isValid: true };
};
```

### 4. Validation de Séquence Complète
```javascript
// Valide une séquence entière de blocs
const validateCompleteSequence = (workspace, expectedSequence) => {
  const topBlocks = workspace.getTopBlocks(true);
  let currentBlock = topBlocks.find(block => block.type === expectedSequence[0].type);
  
  for (let i = 0; i < expectedSequence.length; i++) {
    if (!currentBlock || currentBlock.type !== expectedSequence[i].type) {
      return {
        isValid: false,
        message: `Étape ${i + 1}: Bloc manquant ou incorrect`
      };
    }
    currentBlock = currentBlock.getNextBlock();
  }
  
  return { isValid: true, message: 'Séquence parfaite!' };
};
```

## 💡 Création de Messages de Feedback Efficaces

### Messages de Succès
```javascript
// ✅ Bons exemples
"Excellent! Votre programme est prêt à fonctionner!"
"Parfait! Les blocs sont bien connectés!"
"رائع! حطيت اسم المستخدم!" // Support multilingue
"Super! Vous maîtrisez les boucles!"

// ❌ À éviter
"Correct."
"Bien."
"OK."
```

### Messages d'Erreur Constructifs
```javascript
// ✅ Bons exemples
"Ajoutez le bloc 'quand drapeau cliqué' depuis la catégorie Événements."
"Connectez le bloc mouvement sous le bloc événement en le faisant glisser."
"Changez le nombre de pas à 10 dans le bloc mouvement."

// ❌ À éviter  
"Erreur."
"Incorrect."
"Mauvaise réponse."
```

### Messages de Hints Progressifs
```javascript
// Niveau 1: Hint général
"Cherchez dans la catégorie Mouvement pour les blocs bleus."

// Niveau 2: Hint spécifique
"Le bloc 'bouger de X pas' se trouve dans la catégorie Mouvement."

// Niveau 3: Hint détaillé
"Faites glisser le bloc bleu 'bouger de 10 pas' sous le bloc orange 'quand drapeau cliqué'."
```

## 🎮 Patterns de Validation Courants

### Pattern 1: Validation Progressive
```javascript
// Étape par étape, chaque tâche valide la précédente + la nouvelle
const validateProgressive = (workspace, lesson, taskIndex) => {
  // Valider toutes les tâches jusqu'à l'index actuel
  for (let i = 0; i <= taskIndex; i++) {
    const taskValidation = validateTaskCompletion(workspace, lesson.tasks[i]);
    if (!taskValidation.isValid) {
      return {
        isValid: false,
        message: `Étape ${i + 1}: ${taskValidation.message}`
      };
    }
  }
  return { isValid: true, message: 'Toutes les étapes sont complétées!' };
};
```

### Pattern 2: Validation avec Pré-requis
```javascript
const validateWithPrerequisites = (workspace, task, prerequisites) => {
  // Vérifier d'abord les pré-requis
  for (const prereq of prerequisites) {
    const prereqValidation = validateTaskCompletion(workspace, prereq);
    if (!prereqValidation.isValid) {
      return {
        isValid: false,
        message: `Complétez d'abord: ${prereq.instruction}`
      };
    }
  }
  
  // Puis valider la tâche actuelle
  return validateTaskCompletion(workspace, task);
};
```

### Pattern 3: Validation avec Options Multiples
```javascript
const validateMultipleOptions = (workspace, acceptableBlockTypes) => {
  const blockTypes = workspace.getAllBlocks().map(block => block.type);
  
  const hasValidOption = acceptableBlockTypes.some(type => 
    blockTypes.includes(type)
  );
  
  return {
    isValid: hasValidOption,
    message: hasValidOption 
      ? 'Excellent! Vous avez choisi une solution valide!'
      : `Utilisez un de ces blocs: ${acceptableBlockTypes.join(', ')}`
  };
};
```

## 🌍 Support Multilingue

### Configuration des Messages
```javascript
const messages = {
  fr: {
    success: "Excellent! Continuez comme ça!",
    error: "Essayez encore, vous y êtes presque!",
    hint: "Cherchez dans la catégorie {category}"
  },
  ar: {
    success: "رائع! واصل هكا!",
    error: "حاول مرة أخرى، أنت قريب!",
    hint: "دور في فئة {category}"
  }
};

const getLocalizedMessage = (key, language = 'fr', params = {}) => {
  let message = messages[language][key] || messages.fr[key];
  
  // Remplacer les paramètres
  Object.entries(params).forEach(([param, value]) => {
    message = message.replace(`{${param}}`, value);
  });
  
  return message;
};
```

### Usage dans la Validation
```javascript
case 'chat_send_message':
  const isValid = blockTypes.includes('chat_send_message');
  return {
    isValid,
    message: isValid 
      ? getLocalizedMessage('success', 'ar')
      : getLocalizedMessage('error', 'ar', { category: 'الشات' })
  };
```

## 📊 Debugging et Tests

### Ajouter des Logs de Debug
```javascript
export const validateTaskCompletion = (workspace, task) => {
  const allBlocks = workspace.getAllBlocks();
  const blockTypes = allBlocks.map(block => block.type);

  // Log pour debugging
  console.debug('Validation Debug:', {
    taskType: task.blockType,
    availableBlocks: blockTypes,
    taskInstruction: task.instruction
  });

  // ... reste de la validation
};
```

### Tests de Validation
```javascript
// Test unitaire simple
const testValidation = () => {
  const mockWorkspace = {
    getAllBlocks: () => [
      { type: 'event_whenflagclicked', getNextBlock: () => mockBlocks[1] },
      { type: 'motion_movesteps', getFieldValue: () => '10' }
    ],
    getTopBlocks: () => [mockBlocks[0]]
  };

  const task = { blockType: 'motion_movesteps' };
  const result = validateTaskCompletion(mockWorkspace, task);
  
  console.assert(result.isValid === true, 'Validation should pass');
  console.log('Test passed:', result.message);
};
```

## 🚀 Optimisations de Performance

### Cache de Validation
```javascript
const validationCache = new Map();

export const validateTaskCompletionCached = (workspace, task) => {
  const cacheKey = `${task.id}_${workspace.getAllBlocks().length}`;
  
  if (validationCache.has(cacheKey)) {
    return validationCache.get(cacheKey);
  }
  
  const result = validateTaskCompletion(workspace, task);
  validationCache.set(cacheKey, result);
  
  return result;
};
```

### Validation Différée
```javascript
let validationTimeout;

const deferredValidation = (workspace, task, callback) => {
  clearTimeout(validationTimeout);
  
  validationTimeout = setTimeout(() => {
    const result = validateTaskCompletion(workspace, task);
    callback(result);
  }, 500); // Attendre 500ms après la dernière modification
};
```

## 📝 Checklist pour Nouvelle Validation

- [ ] **Message de succès** encourageant et clair
- [ ] **Message d'erreur** constructif avec action à faire
- [ ] **Hints progressifs** du général au spécifique
- [ ] **Support multilingue** si applicable
- [ ] **Tests unitaires** pour vérifier le comportement
- [ ] **Documentation** des nouveaux blocs et validations
- [ ] **Gestion d'erreurs** pour les cas edge
- [ ] **Performance** optimisée pour grandes leçons

## 🎯 Exemples Concrets

### Validation pour une Boucle Simple
```javascript
case 'control_repeat':
  const hasEventBlock = blockTypes.includes('event_whenflagclicked');
  const hasRepeatBlock = blockTypes.includes('control_repeat');
  
  if (!hasEventBlock) {
    return {
      isValid: false,
      message: 'Commencez par ajouter le bloc "quand drapeau cliqué".'
    };
  }
  
  if (!hasRepeatBlock) {
    return {
      isValid: false,
      message: 'Ajoutez le bloc "répéter" depuis la catégorie Contrôle.'
    };
  }
  
  // Vérifier que la boucle contient des blocs
  const repeatBlock = allBlocks.find(block => block.type === 'control_repeat');
  const innerBlocks = repeatBlock.getChildren();
  
  if (innerBlocks.length === 0) {
    return {
      isValid: false,
      message: 'Ajoutez des blocs à l\'intérieur de la boucle répéter.'
    };
  }
  
  return {
    isValid: true,
    message: 'Parfait! Votre boucle est prête à fonctionner!'
  };
```

Ce guide vous donne tous les outils nécessaires pour créer et maintenir un système de validation Blockly efficace et pédagogiquement solide.
