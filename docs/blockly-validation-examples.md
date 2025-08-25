# Exemples Pratiques de Validation Blockly

## 🎯 Cas d'Usage Concrets

Cette documentation présente des exemples réels d'implémentation de validation pour différents scénarios pédagogiques.

---

## 📝 Exemple 1: Validation Simple - Premier Bloc

### Objectif
Faire ajouter le bloc "quand drapeau vert cliqué" à l'étudiant.

### Configuration de la Tâche
```javascript
const task = {
  id: 1,
  instruction: "Glissez le bloc 'quand drapeau vert cliqué' dans l'espace de travail",
  blockType: "event_whenflagclicked",
  category: "Events",
  hint: "Cherchez l'icône du drapeau vert dans la catégorie Événements !"
};
```

### Implémentation de la Validation
```javascript
case 'event_whenflagclicked':
  const hasEventBlock = blockTypes.includes('event_whenflagclicked');
  return {
    isValid: hasEventBlock,
    message: hasEventBlock 
      ? '🎉 Parfait ! Vous avez ajouté le bloc de démarrage !' 
      : '🚀 Ajoutez le bloc "quand drapeau cliqué" depuis la catégorie Événements (orange).'
  };
```

### Test
```javascript
// Mock workspace avec le bloc correct
const workspace = {
  getAllBlocks: () => [
    { type: 'event_whenflagclicked' }
  ]
};

const result = validateTaskCompletion(workspace, task);
// result.isValid === true
// result.message === "🎉 Parfait ! Vous avez ajouté le bloc de démarrage !"
```

---

## 🏃‍♂️ Exemple 2: Validation avec Connexion - Mouvement

### Objectif
Connecter un bloc mouvement sous le bloc événement.

### Configuration
```javascript
const task = {
  id: 2,
  instruction: "Connectez le bloc 'bouger de 10 pas' sous le bloc événement",
  blockType: "motion_movesteps",
  category: "Motion",
  hint: "Faites glisser le bloc bleu près du bloc orange jusqu'à voir une forme blanche d'emboîtement"
};
```

### Validation Avancée
```javascript
case 'motion_movesteps':
  const hasEventBlock = blockTypes.includes('event_whenflagclicked');
  const hasMotionBlock = blockTypes.includes('motion_movesteps');
  
  // Étape 1: Vérifier la présence des blocs
  if (!hasEventBlock) {
    return {
      isValid: false,
      message: '⚠️ Ajoutez d\'abord le bloc "quand drapeau cliqué", puis le bloc mouvement.'
    };
  }

  if (!hasMotionBlock) {
    return {
      isValid: false,
      message: '🔵 Ajoutez le bloc "bouger de X pas" depuis la catégorie Mouvement (blocs bleus).'
    };
  }

  // Étape 2: Vérifier la connexion
  const eventBlock = allBlocks.find(block => block.type === 'event_whenflagclicked');
  const motionBlock = allBlocks.find(block => block.type === 'motion_movesteps');
  
  if (eventBlock && motionBlock) {
    const nextBlock = eventBlock.getNextBlock();
    if (nextBlock && nextBlock.type === 'motion_movesteps') {
      return {
        isValid: true,
        message: '🎯 Excellent ! Les blocs sont parfaitement connectés ! Cliquez le drapeau pour voir votre personnage bouger !'
      };
    } else {
      return {
        isValid: false,
        message: '🔗 Connectez le bloc mouvement (bleu) juste sous le bloc événement (orange) en les emboîtant.'
      };
    }
  }
  
  return {
    isValid: false,
    message: '🤔 Quelque chose ne va pas. Vérifiez que vous avez les deux blocs et qu\'ils sont connectés.'
  };
```

### Test Complet
```javascript
const createConnectedBlocks = () => {
  const eventBlock = {
    type: 'event_whenflagclicked',
    getNextBlock: () => motionBlock
  };
  
  const motionBlock = {
    type: 'motion_movesteps',
    getPreviousBlock: () => eventBlock,
    getFieldValue: (field) => field === 'STEPS' ? '10' : null
  };
  
  return [eventBlock, motionBlock];
};

const workspace = {
  getAllBlocks: () => createConnectedBlocks()
};

const result = validateTaskCompletion(workspace, task);
// result.isValid === true
```

---

## 🔁 Exemple 3: Validation de Boucle avec Contenu

### Objectif
Créer une boucle "répéter 5 fois" avec un bloc mouvement à l'intérieur.

### Configuration de Leçon
```javascript
const lesson = {
  id: 3,
  title: "Mouvement en Boucle",
  tasks: [
    {
      id: 1,
      instruction: "Ajoutez le bloc 'quand drapeau cliqué'",
      blockType: "event_whenflagclicked"
    },
    {
      id: 2, 
      instruction: "Ajoutez une boucle 'répéter 5 fois' sous l'événement",
      blockType: "control_repeat"
    },
    {
      id: 3,
      instruction: "Mettez un bloc 'bouger de 10 pas' DANS la boucle",
      blockType: "loop_with_content"
    }
  ],
  expectedBlocks: [{
    type: "event_whenflagclicked",
    next: {
      type: "control_repeat",
      fields: { TIMES: "5" },
      children: [{
        type: "motion_movesteps",
        fields: { STEPS: "10" }
      }]
    }
  }]
};
```

### Validation Complexe
```javascript
case 'loop_with_content':
  const validation = validateLoopWithContent(workspace);
  return validation;

const validateLoopWithContent = (workspace) => {
  const allBlocks = workspace.getAllBlocks();
  const blockTypes = allBlocks.map(block => block.type);
  
  // Vérifier présence des blocs requis
  const requiredBlocks = ['event_whenflagclicked', 'control_repeat', 'motion_movesteps'];
  const missingBlocks = requiredBlocks.filter(type => !blockTypes.includes(type));
  
  if (missingBlocks.length > 0) {
    return {
      isValid: false,
      message: `❌ Blocs manquants: ${missingBlocks.join(', ')}. Ajoutez-les dans l'ordre !`
    };
  }
  
  // Vérifier la structure
  const eventBlock = allBlocks.find(block => block.type === 'event_whenflagclicked');
  const repeatBlock = eventBlock?.getNextBlock();
  
  if (!repeatBlock || repeatBlock.type !== 'control_repeat') {
    return {
      isValid: false,
      message: '🔗 Connectez la boucle "répéter" directement sous l\'événement'
    };
  }
  
  // Vérifier le contenu de la boucle
  const loopChildren = repeatBlock.getChildren();
  const hasMotionInside = loopChildren.some(child => child.type === 'motion_movesteps');
  
  if (!hasMotionInside) {
    return {
      isValid: false,
      message: '📥 Glissez le bloc "bouger de 10 pas" À L\'INTÉRIEUR de la boucle (dans la partie creuse)'
    };
  }
  
  // Vérifier la valeur de répétition
  const repeatValue = repeatBlock.getFieldValue('TIMES');
  if (repeatValue !== '5') {
    return {
      isValid: false,
      message: `🔢 Changez le nombre de répétitions à 5 (actuellement: ${repeatValue})`
    };
  }
  
  return {
    isValid: true,
    message: '🌟 Fantastique ! Votre boucle va faire bouger le personnage 5 fois. Testez-la !'
  };
};
```

---

## 🎵 Exemple 4: Validation Multimédia - Son

### Objectif
Créer une séquence musicale avec différents sons.

### Configuration
```javascript
const musicTask = {
  id: 4,
  instruction: "Créez une mélodie avec 3 notes différentes",
  blockType: "music_sequence",
  category: "Sound",
  expectedSequence: [
    { type: 'sound_play_note', fields: { NOTE: 'C4', DURATION: 1 } },
    { type: 'sound_play_note', fields: { NOTE: 'E4', DURATION: 1 } },
    { type: 'sound_play_note', fields: { NOTE: 'G4', DURATION: 1 } }
  ]
};
```

### Validation Musicale
```javascript
case 'music_sequence':
  return validateMusicSequence(workspace, task.expectedSequence);

const validateMusicSequence = (workspace, expectedSequence) => {
  const allBlocks = workspace.getAllBlocks();
  const soundBlocks = allBlocks.filter(block => block.type === 'sound_play_note');
  
  // Vérifier le nombre de notes
  if (soundBlocks.length === 0) {
    return {
      isValid: false,
      message: '🎵 Ajoutez des blocs "jouer la note" depuis la catégorie Son (violet)'
    };
  }
  
  if (soundBlocks.length < expectedSequence.length) {
    return {
      isValid: false,
      message: `🎼 Ajoutez ${expectedSequence.length - soundBlocks.length} note(s) de plus pour compléter la mélodie`
    };
  }
  
  // Vérifier la séquence (ordre des notes)
  const eventBlock = allBlocks.find(block => block.type === 'event_whenflagclicked');
  if (!eventBlock) {
    return {
      isValid: false,
      message: '🚀 Commencez par ajouter le bloc "quand drapeau cliqué"'
    };
  }
  
  // Parcourir la séquence et vérifier chaque note
  let currentBlock = eventBlock.getNextBlock();
  let noteIndex = 0;
  
  while (currentBlock && noteIndex < expectedSequence.length) {
    const expected = expectedSequence[noteIndex];
    
    if (currentBlock.type !== expected.type) {
      return {
        isValid: false,
        message: `🎹 Note ${noteIndex + 1}: Utilisez un bloc "jouer la note"`
      };
    }
    
    const actualNote = currentBlock.getFieldValue('NOTE');
    const expectedNote = expected.fields.NOTE;
    
    if (actualNote !== expectedNote) {
      return {
        isValid: false,
        message: `🎶 Note ${noteIndex + 1}: Changez pour ${expectedNote} (actuellement: ${actualNote})`
      };
    }
    
    currentBlock = currentBlock.getNextBlock();
    noteIndex++;
  }
  
  if (noteIndex === expectedSequence.length) {
    return {
      isValid: true,
      message: '🎊 Bravo ! Votre mélodie Do-Mi-Sol est parfaite ! Écoutez-la !'
    };
  }
  
  return {
    isValid: false,
    message: '🎵 Vérifiez l\'ordre et les connexions de vos notes'
  };
};
```

---

## 💬 Exemple 5: Validation Chat Multilingue

### Objectif
Créer un système de chat simple en arabe.

### Configuration
```javascript
const chatTask = {
  id: 5,
  instruction: "ابعث رسالة ترحيب بالعربية",
  blockType: "chat_arabic_greeting",
  category: "Chat"
};
```

### Validation Multilingue
```javascript
case 'chat_arabic_greeting':
  return validateArabicChatGreeting(workspace);

const validateArabicChatGreeting = (workspace) => {
  const allBlocks = workspace.getAllBlocks();
  const blockTypes = allBlocks.map(block => block.type);
  
  // Vérifier l'événement de démarrage
  if (!blockTypes.includes('event_whenflagclicked')) {
    return {
      isValid: false,
      message: 'ابدا بإضافة بلوك "كي الراية تتنقر" من فئة الأحداث'
    };
  }
  
  // Vérifier le nom d'utilisateur
  if (!blockTypes.includes('chat_set_username')) {
    return {
      isValid: false,
      message: 'حط اسم المستخدم باستخدام بلوك "حط اسم المستخدم"'
    };
  }
  
  // Vérifier le message
  if (!blockTypes.includes('chat_send_message')) {
    return {
      isValid: false,
      message: 'ابعث رسالة باستخدام بلوك "ابعث رسالة"'
    };
  }
  
  // Vérifier le contenu du message
  const messageBlock = allBlocks.find(block => block.type === 'chat_send_message');
  const messageContent = messageBlock?.getFieldValue('MESSAGE');
  
  const arabicGreetings = ['مرحبا', 'أهلا', 'السلام عليكم', 'مساء الخير', 'صباح الخير'];
  const hasArabicGreeting = arabicGreetings.some(greeting => 
    messageContent?.includes(greeting)
  );
  
  if (!hasArabicGreeting) {
    return {
      isValid: false,
      message: 'اكتب تحية بالعربية في الرسالة (مثل: مرحبا، أهلا، السلام عليكم...)'
    };
  }
  
  // التحقق من الترتيب
  const eventBlock = allBlocks.find(block => block.type === 'event_whenflagclicked');
  let currentBlock = eventBlock.getNextBlock();
  
  if (!currentBlock || currentBlock.type !== 'chat_set_username') {
    return {
      isValid: false,
      message: 'ضع بلوك "حط اسم المستخدم" مباشرة تحت بلوك الحدث'
    };
  }
  
  currentBlock = currentBlock.getNextBlock();
  if (!currentBlock || currentBlock.type !== 'chat_send_message') {
    return {
      isValid: false,
      message: 'ضع بلوك "ابعث رسالة" تحت بلوك اسم المستخدم'
    };
  }
  
  return {
    isValid: true,
    message: '🎉 ممتاز! رسالة الترحيب جاهزة. شغل البرنامج واستمتع بالشات!'
  };
};
```

---

## 🎨 Exemple 6: Validation Créative - Dessin

### Objectif  
Dessiner un carré avec le sprite.

### Configuration
```javascript
const drawingTask = {
  id: 6,
  instruction: "Dessinez un carré en bougeant et tournant",
  blockType: "draw_square",
  expectedPattern: {
    steps: 4,
    moveDistance: 100,
    turnAngle: 90
  }
};
```

### Validation Géométrique
```javascript
case 'draw_square':
  return validateSquareDrawing(workspace, task.expectedPattern);

const validateSquareDrawing = (workspace, pattern) => {
  const allBlocks = workspace.getAllBlocks();
  
  // Vérifier la présence d'une boucle
  const repeatBlock = allBlocks.find(block => block.type === 'control_repeat');
  if (!repeatBlock) {
    return {
      isValid: false,
      message: '📐 Pour dessiner un carré, utilisez une boucle "répéter 4 fois"'
    };
  }
  
  // Vérifier le nombre de répétitions
  const repeatCount = parseInt(repeatBlock.getFieldValue('TIMES'));
  if (repeatCount !== pattern.steps) {
    return {
      isValid: false,
      message: `🔢 Un carré a ${pattern.steps} côtés. Changez à "répéter ${pattern.steps} fois"`
    };
  }
  
  // Vérifier le contenu de la boucle
  const loopChildren = repeatBlock.getChildren();
  const moveBlock = loopChildren.find(child => child.type === 'motion_movesteps');
  const turnBlock = loopChildren.find(child => child.type === 'motion_turnright');
  
  if (!moveBlock) {
    return {
      isValid: false,
      message: '🚶‍♂️ Ajoutez un bloc "bouger" dans la boucle pour tracer les côtés'
    };
  }
  
  if (!turnBlock) {
    return {
      isValid: false,
      message: '🔄 Ajoutez un bloc "tourner à droite" dans la boucle pour les angles'
    };
  }
  
  // Vérifier les valeurs
  const moveDistance = parseInt(moveBlock.getFieldValue('STEPS'));
  const turnAngle = parseInt(turnBlock.getFieldValue('DEGREES'));
  
  if (turnAngle !== pattern.turnAngle) {
    return {
      isValid: false,
      message: `📐 Pour un carré, tournez de ${pattern.turnAngle} degrés à chaque angle (actuellement: ${turnAngle})`
    };
  }
  
  if (moveDistance < 50) {
    return {
      isValid: false,
      message: '📏 Bougez d\'au moins 50 pas pour voir le carré clairement'
    };
  }
  
  return {
    isValid: true,
    message: '🎨 Parfait ! Votre carré géométrique est prêt ! Admirez votre œuvre d\'art mathématique !'
  };
};
```

---

## 🧪 Tests Automatisés

### Suite de Tests pour Validation
```javascript
describe('Validation Examples', () => {
  
  test('Simple block validation', () => {
    const workspace = createMockWorkspace([
      { type: 'event_whenflagclicked' }
    ]);
    
    const task = { blockType: 'event_whenflagclicked' };
    const result = validateTaskCompletion(workspace, task);
    
    expect(result.isValid).toBe(true);
    expect(result.message).toContain('Parfait');
  });
  
  test('Connected blocks validation', () => {
    const eventBlock = {
      type: 'event_whenflagclicked',
      getNextBlock: () => motionBlock
    };
    
    const motionBlock = {
      type: 'motion_movesteps',
      getPreviousBlock: () => eventBlock
    };
    
    const workspace = {
      getAllBlocks: () => [eventBlock, motionBlock]
    };
    
    const task = { blockType: 'motion_movesteps' };
    const result = validateTaskCompletion(workspace, task);
    
    expect(result.isValid).toBe(true);
  });
  
  test('Loop with content validation', () => {
    const loopBlock = {
      type: 'control_repeat',
      getFieldValue: (field) => field === 'TIMES' ? '5' : null,
      getChildren: () => [{ type: 'motion_movesteps' }]
    };
    
    const workspace = {
      getAllBlocks: () => [
        { type: 'event_whenflagclicked', getNextBlock: () => loopBlock },
        loopBlock,
        { type: 'motion_movesteps' }
      ]
    };
    
    const result = validateLoopWithContent(workspace);
    expect(result.isValid).toBe(true);
  });
  
});
```

---

Ces exemples montrent comment implémenter des validations robustes et pédagogiquement efficaces pour différents types de tâches Blockly, du plus simple au plus complexe. Chaque exemple peut être adapté selon vos besoins spécifiques d'apprentissage.
