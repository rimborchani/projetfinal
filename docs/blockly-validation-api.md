# API de Validation Blockly - Référence Technique

## 🔧 API Principale

### `validateTaskCompletion(workspace, task)`

Valide si une tâche spécifique a été complétée correctement par l'étudiant.

**Paramètres:**
- `workspace` (Blockly.Workspace) - Instance du workspace Blockly
- `task` (Object) - Objet task avec les propriétés suivantes:
  ```javascript
  {
    id: number,
    instruction: string,
    blockType: string,
    category: string,
    hint?: string
  }
  ```

**Retour:**
```javascript
{
  isValid: boolean,
  message: string
}
```

**Exemple d'usage:**
```javascript
import { validateTaskCompletion } from '../lib/validation';

const handleValidation = () => {
  const result = validateTaskCompletion(workspace, currentTask);
  
  if (result.isValid) {
    console.log('✅', result.message);
    onTaskComplete(currentTask.id);
  } else {
    console.log('❌', result.message);
    showErrorMessage(result.message);
  }
};
```

---

### `validateLesson(workspace, lesson)`

Valide l'ensemble d'une leçon selon la structure de blocs attendue.

**Paramètres:**
- `workspace` (Blockly.Workspace) - Instance du workspace
- `lesson` (Object) - Configuration de la leçon:
  ```javascript
  {
    id: number,
    title: string,
    tasks: Task[],
    expectedBlocks: ExpectedBlock[]
  }
  ```

**Structure ExpectedBlock:**
```javascript
{
  type: string,           // Type du bloc (ex: 'event_whenflagclicked')
  fields?: {              // Valeurs attendues des champs
    [fieldName]: any
  },
  next?: ExpectedBlock    // Bloc suivant dans la chaîne
}
```

**Exemple:**
```javascript
const lessonValidation = validateLesson(workspace, {
  id: 1,
  expectedBlocks: [{
    type: "event_whenflagclicked",
    next: {
      type: "motion_movesteps", 
      fields: { STEPS: 10 }
    }
  }]
});
```

---

### `validateBlockSequence(topBlocks, expectedBlock)`

Valide une séquence de blocs spécifique.

**Paramètres:**
- `topBlocks` (Block[]) - Array des blocs de niveau supérieur
- `expectedBlock` (ExpectedBlock) - Structure attendue

**Usage interne principalement, appelée par `validateLesson()`**

---

### `validateBlockChain(actualBlock, expectedBlock)`

Validation récursive d'une chaîne de blocs connectés.

**Paramètres:**
- `actualBlock` (Block) - Bloc actuel dans le workspace
- `expectedBlock` (ExpectedBlock) - Bloc attendu

**Vérifications effectuées:**
1. Type de bloc correspond
2. Valeurs des champs correspondent (si spécifiées)
3. Validation récursive du bloc suivant

---

### `getHint(workspace, task)`

Génère des indices contextuels basés sur l'état actuel du workspace.

**Paramètres:**
- `workspace` (Blockly.Workspace) - Instance du workspace
- `task` (Task) - Tâche actuelle

**Retour:**
- `string` - Message d'indice pour l'utilisateur

**Logique des hints:**
```javascript
// Aucun bloc -> Hint de démarrage
if (blockTypes.length === 0) {
  return "Start by dragging a block from the toolbox to the workspace!";
}

// Bloc manquant -> Hint de localisation
if (!blockTypes.includes(task.blockType)) {
  return `Look in the ${task.category} category for the '${task.blockType}' block.`;
}

// Bloc présent mais mal connecté -> Hint de connexion
return "Try connecting the blocks by dragging them close together.";
```

---

## 🏗️ Types de Blocs Supportés

### Events (Événements)
```javascript
'event_whenflagclicked'     // Quand drapeau cliqué
'event_whenkeypressed'      // Quand touche pressée  
'event_whenthisspriteclicked' // Quand ce sprite cliqué
```

### Motion (Mouvement)
```javascript
'motion_movesteps'          // Bouger de X pas
'motion_turnright'          // Tourner à droite de X degrés
'motion_turnleft'           // Tourner à gauche de X degrés
'motion_goto'               // Aller à x:X y:Y
'motion_glidesecstoxy'      // Glisser en X sec à x:X y:Y
```

### Looks (Apparence)
```javascript
'looks_say'                 // Dire X
'looks_sayforsecs'          // Dire X pendant X sec
'looks_think'               // Penser à X
'looks_show'                // Montrer
'looks_hide'                // Cacher
```

### Sound (Son)
```javascript
'sound_play'                // Jouer le son X
'sound_play_note'           // Jouer la note X pour X sec
'sound_play_drum'           // Jouer le tambour X pour X temps
'sound_set_volume'          // Mettre le volume à X%
'sound_play_sound_until_done' // Jouer le son X jusqu'à la fin
```

### Control (Contrôle)
```javascript
'control_wait'              // Attendre X sec
'control_repeat'            // Répéter X fois
'control_forever'           // Répéter indéfiniment
'control_if'                // Si alors
'control_if_else'           // Si alors sinon
```

### Chat (Communication)
```javascript
'chat_set_username'         // Définir nom d'utilisateur
'chat_send_message'         // Envoyer message
'chat_add_emoji'            // Ajouter emoji
'chat_show_typing'          // Montrer "en train de taper"
'chat_reply_to_message'     // Répondre au message
'chat_auto_reply'           // Réponse automatique
```

---

## 📋 Interface de Validation

### Structure de Réponse Standard
```javascript
interface ValidationResult {
  isValid: boolean;
  message: string;
  hint?: string;
  nextAction?: string;
}
```

### Codes d'Erreur Courants
```javascript
const ERROR_CODES = {
  MISSING_BLOCK: 'MISSING_BLOCK',
  WRONG_CONNECTION: 'WRONG_CONNECTION', 
  INCORRECT_FIELD_VALUE: 'INCORRECT_FIELD_VALUE',
  WRONG_SEQUENCE: 'WRONG_SEQUENCE',
  EXTRA_BLOCKS: 'EXTRA_BLOCKS'
};
```

### Messages Types par Erreur
```javascript
const ERROR_MESSAGES = {
  MISSING_BLOCK: (blockType) => `Missing ${blockType} block. Add it from the appropriate category.`,
  WRONG_CONNECTION: (expected, actual) => `Connect ${actual} to ${expected}.`,
  INCORRECT_FIELD_VALUE: (field, expected, actual) => `${field} should be ${expected}, not ${actual}.`,
  WRONG_SEQUENCE: () => 'Blocks are not in the correct order.',
  EXTRA_BLOCKS: () => 'Remove unnecessary blocks for this task.'
};
```

---

## 🎯 Validation Personnalisée

### Créer un Validateur Personnalisé

```javascript
export const validateCustomTask = (workspace, customCriteria) => {
  const blocks = workspace.getAllBlocks();
  
  // Logique de validation personnalisée
  const isValid = customCriteria.every(criteria => {
    return validateCriteria(blocks, criteria);
  });
  
  return {
    isValid,
    message: isValid 
      ? 'Validation personnalisée réussie!'
      : 'Critères personnalisés non satisfaits.'
  };
};

const validateCriteria = (blocks, criteria) => {
  switch (criteria.type) {
    case 'block_count':
      return blocks.length === criteria.expected;
    
    case 'block_type_present':
      return blocks.some(block => block.type === criteria.blockType);
    
    case 'field_value':
      const block = blocks.find(b => b.type === criteria.blockType);
      return block && block.getFieldValue(criteria.field) === criteria.value;
    
    default:
      return false;
  }
};
```

### Exemple d'Usage
```javascript
const customCriteria = [
  { type: 'block_count', expected: 3 },
  { type: 'block_type_present', blockType: 'motion_movesteps' },
  { type: 'field_value', blockType: 'motion_movesteps', field: 'STEPS', value: '50' }
];

const result = validateCustomTask(workspace, customCriteria);
```

---

## 🔍 Utilitaires de Validation

### `getBlocksByType(workspace, blockType)`
```javascript
export const getBlocksByType = (workspace, blockType) => {
  return workspace.getAllBlocks().filter(block => block.type === blockType);
};
```

### `getTopLevelBlocks(workspace)`
```javascript
export const getTopLevelBlocks = (workspace) => {
  return workspace.getTopBlocks(true); // true = ordered
};
```

### `getBlockConnections(block)`
```javascript
export const getBlockConnections = (block) => {
  return {
    previous: block.getPreviousBlock(),
    next: block.getNextBlock(),
    parent: block.getParent(),
    children: block.getChildren()
  };
};
```

### `validateFieldValue(block, fieldName, expectedValue)`
```javascript
export const validateFieldValue = (block, fieldName, expectedValue) => {
  const actualValue = block.getFieldValue(fieldName);
  return {
    isValid: actualValue === expectedValue,
    actual: actualValue,
    expected: expectedValue
  };
};
```

---

## 📊 Analytics et Métriques

### Collecter des Données de Validation
```javascript
export const trackValidation = (taskId, result, timeSpent) => {
  const data = {
    taskId,
    isValid: result.isValid,
    message: result.message,
    timeSpent,
    timestamp: Date.now(),
    sessionId: getCurrentSessionId()
  };
  
  // Envoyer aux analytics
  sendAnalytics('validation_event', data);
};
```

### Métriques Utiles à Collecter
```javascript
const METRICS = {
  TASK_COMPLETION_TIME: 'task_completion_time',
  VALIDATION_ATTEMPTS: 'validation_attempts', 
  HINT_USAGE_FREQUENCY: 'hint_usage_frequency',
  ERROR_PATTERNS: 'error_patterns',
  SUCCESS_RATE_BY_TASK: 'success_rate_by_task'
};
```

---

## 🚀 Performance et Optimisation

### Cache de Validation
```javascript
class ValidationCache {
  constructor() {
    this.cache = new Map();
    this.maxSize = 100;
  }
  
  get(key) {
    return this.cache.get(key);
  }
  
  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
  
  generateKey(workspace, task) {
    const blockTypes = workspace.getAllBlocks().map(b => b.type).sort();
    return `${task.id}_${blockTypes.join('_')}`;
  }
}

const validationCache = new ValidationCache();
```

### Validation Asynchrone
```javascript
export const validateTaskAsync = async (workspace, task) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = validateTaskCompletion(workspace, task);
      resolve(result);
    }, 0);
  });
};
```

---

## 🛠️ Testing et Debugging

### Mock Workspace pour Tests
```javascript
const createMockWorkspace = (blocks) => {
  return {
    getAllBlocks: () => blocks,
    getTopBlocks: () => blocks.filter(b => !b.parent),
    getBlockById: (id) => blocks.find(b => b.id === id)
  };
};

const createMockBlock = (type, fields = {}) => {
  return {
    type,
    getFieldValue: (field) => fields[field],
    getNextBlock: () => null,
    getPreviousBlock: () => null,
    getParent: () => null,
    getChildren: () => []
  };
};
```

### Tests Unitaires
```javascript
describe('Validation API', () => {
  test('validateTaskCompletion - success case', () => {
    const workspace = createMockWorkspace([
      createMockBlock('event_whenflagclicked'),
      createMockBlock('motion_movesteps', { STEPS: '10' })
    ]);
    
    const task = { blockType: 'event_whenflagclicked' };
    const result = validateTaskCompletion(workspace, task);
    
    expect(result.isValid).toBe(true);
    expect(result.message).toContain('Great!');
  });
});
```

Cette API de validation fournit tous les outils nécessaires pour créer des expériences d'apprentissage Blockly robustes et pédagogiquement efficaces.
