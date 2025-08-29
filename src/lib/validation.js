/**
 * Validation functions for checking if student's block arrangement is correct
 */

/**
 * Utilitaire pour valider du texte de manière flexible
 * Accepte différentes variantes d'un même concept
 */
const validateFlexibleText = (actualText, expectedVariants, context = '') => {
  if (!actualText || typeof actualText !== 'string') {
    return { isValid: false, message: `Aucun texte trouvé${context ? ` dans ${context}` : ''}` };
  }
  
  const actualLower = actualText.toLowerCase().trim();
  const variants = Array.isArray(expectedVariants) ? expectedVariants : [expectedVariants];
  
  // Vérifier si le texte contient une des variantes acceptées
  const matchFound = variants.some(variant => 
    actualLower.includes(variant.toLowerCase().trim())
  );
  
  if (matchFound) {
    return {
      isValid: true,
      message: `🎉 Parfait! "${actualText}" est une réponse valide!`,
      matchedText: actualText
    };
  }
  
  return {
    isValid: false,
    message: `Le texte "${actualText}" ne correspond pas aux attentes`,
    hint: `Essayez avec: ${variants.join(', ')}`,
    actualText
  };
};

/**
 * Dictionnaire des variantes acceptées pour différents concepts
 */
const TEXT_VARIANTS = {
  greetings: ['bonjour', 'hello', 'hi', 'salut', 'coucou', 'hey', 'bonsoir', 'good morning', 'good evening'],
  farewell: ['au revoir', 'bye', 'goodbye', 'à bientôt', 'see you', 'adieu', 'ciao'],
  success: ['bravo', 'super', 'excellent', 'parfait', 'great', 'awesome', 'well done', 'félicitations'],
  completion: ['terminé', 'fini', 'done', 'finished', 'complete', 'voilà', 'c\'est fait']
};

/**
 * A utility function to clean a code string by removing all whitespace and comments.
 * This ensures the comparison focuses on the logic, not formatting.
 * @param {string} code - The raw code string to clean.
 * @returns {string} The cleaned code string.
 */
function cleanCode(code) {
  if (!code || typeof code !== 'string') {
    return '';
  }
  
  // Remove all whitespace (spaces, tabs, newlines)
  let cleaned = code.replace(/\s+/g, '');

  // Remove single-line comments (starts with //)
  cleaned = cleaned.replace(/\/\/.*$/gm, '');

  // Remove multi-line comments (starts with /* and ends with */)
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
  
  return cleaned;
}

/**
 * Compares two code strings to see if they are logically identical.
 * @param {string} correctCode - The code from the admin's correct solution.
 * @param {string} userCode - The code from the user's submission.
 * @returns {boolean} True if the codes are logically the same, false otherwise.
 */
function validateSolution(correctCode, userCode) {
  const cleanedCorrectCode = cleanCode(correctCode);
  const cleanedUserCode = cleanCode(userCode);
  
  // A direct string comparison now works perfectly.
  return cleanedCorrectCode === cleanedUserCode;
}

/**
 * Validates user's solution by comparing generated JavaScript code
 * This is the most reliable method as it focuses on logic rather than visual structure
 * @param {Object} workspace - The Blockly workspace
 * @param {string} correctCode - The correct JavaScript code to compare against
 * @returns {Object} Validation result with isValid, message, and additional info
 */
export const validateByCodeComparison = (workspace, correctCode) => {
  if (!workspace) {
    return { 
      isValid: false, 
      message: 'Workspace non disponible', 
      hint: 'Assurez-vous que Blockly est correctement initialisé' 
    };
  }

  if (!correctCode || typeof correctCode !== 'string') {
    return {
      isValid: false,
      message: 'Code de référence manquant',
      hint: 'Cette leçon n\'a pas de solution de référence définie'
    };
  }

  try {
    // Generate JavaScript code from user's workspace
    const userSubmittedCode = Blockly.JavaScript.workspaceToCode(workspace);
    
    // Compare the codes using our validation function
    const isValid = validateSolution(correctCode, userSubmittedCode);
    
    return {
      isValid: isValid,
      message: isValid 
        ? '🎉 Parfait! Votre solution est correcte!' 
        : '❌ Votre solution ne correspond pas à la réponse attendue. Vérifiez vos blocs.',
      hint: isValid 
        ? 'Excellent travail! Vous pouvez passer à la leçon suivante.' 
        : 'Comparez votre solution avec les instructions et essayez à nouveau.',
      userCode: userSubmittedCode,
      cleanedUserCode: cleanCode(userSubmittedCode),
      cleanedCorrectCode: cleanCode(correctCode),
      validationMethod: 'code_comparison'
    };
  } catch (error) {
    console.error('Erreur lors de la génération du code:', error);
    return {
      isValid: false,
      message: 'Erreur lors de la validation du code',
      hint: 'Vérifiez que vos blocs sont correctement configurés',
      error: error.message
    };
  }
};

/**
 * Enhanced validation function that tries code comparison first, then falls back to criteria-based validation
 * @param {Object} workspace - The Blockly workspace
 * @param {string} lessonId - The lesson identifier
 * @returns {Object} Validation result
 */
export const validateLessonWithCodeComparison = async (workspace, lessonId) => {
  if (!workspace) {
    return { 
      isValid: false, 
      message: 'Workspace non disponible', 
      hint: 'Assurez-vous que Blockly est correctement initialisé' 
    };
  }

  try {
    // Récupérer les données de la leçon depuis l'API
    const response = await fetch(`/api/lessons/${lessonId}`);
    if (!response.ok) {
      throw new Error('Leçon non trouvée');
    }
    
    const lesson = await response.json();
    
    // Try code comparison first if correctCode is available
    if (lesson.correctCode && typeof lesson.correctCode === 'string' && lesson.correctCode.trim() !== '') {
      const codeValidationResult = validateByCodeComparison(workspace, lesson.correctCode);
      
      // Add lesson context to the result
      return {
        ...codeValidationResult,
        lessonTitle: lesson.title,
        lessonId: lessonId,
        validationMethod: 'code_comparison'
      };
    }
    
    // Fallback to existing criteria-based validation
    console.log('Code de référence non disponible, utilisation de la validation par critères');
    return await validateLessonDynamically(workspace, lessonId);
    
  } catch (error) {
    console.error('Erreur lors de la validation avec comparaison de code:', error);
    return { 
      isValid: false, 
      message: 'Erreur lors de la validation de la leçon', 
      hint: 'Vérifiez que la leçon existe et est correctement configurée',
      error: error.message
    };
  }
};

/**
 * Méthode de validation dynamique basée sur les données de la leçon
 * Cette méthode lit les critères de validation depuis les données de la leçon
 * au lieu de les coder en dur dans le switch/case
 */
export const validateLessonDynamically = async (workspace, lessonId) => {
  if (!workspace) {
    return { 
      isValid: false, 
      message: 'Workspace non disponible', 
      hint: 'Assurez-vous que Blockly est correctement initialisé' 
    };
  }

  try {
    // Récupérer les données de la leçon depuis l'API
    const response = await fetch(`/api/lessons/${lessonId}`);
    if (!response.ok) {
      throw new Error('Leçon non trouvée');
    }
    
    const lesson = await response.json();
    
    // Extraire les critères de validation depuis les données de la leçon
  const validationCriteria = lesson.validationCriteria || lesson.expectedBlocks || [];
    
    if (!validationCriteria || validationCriteria.length === 0) {
      // Aucun critère défini côté leçon: signaler au client d'utiliser un fallback
      return {
        isValid: false,
        noCriteria: true,
        message: 'Aucun critère de validation spécifique pour cette leçon',
        hint: 'Leçon sans règles explicites. On bascule vers une validation simple par bloc.'
      };
    }

    // Analyser l'espace de travail
    const allBlocks = workspace.getAllBlocks();
    const blockTypes = allBlocks.map(block => block.type);
    
  // Validation basée sur les critères dynamiques
  return await validateByCriteria(workspace, blockTypes, allBlocks, validationCriteria, lesson);
    
  } catch (error) {
    console.error('Erreur lors de la validation dynamique:', error);
    return { 
      isValid: false, 
      message: 'Erreur lors de la validation de la leçon', 
      hint: 'Vérifiez que la leçon existe et est correctement configurée' 
    };
  }
};

/**
 * Validation basée sur des critères dynamiques
 */
const validateByCriteria = async (workspace, blockTypes, allBlocks, criteria, lesson) => {
  const results = [];
  
  // Parcourir chaque critère de validation
  for (const criterion of criteria) {
    const result = await validateSingleCriterion(workspace, blockTypes, allBlocks, criterion);
    results.push(result);
    
    // Si un critère échoue et qu'il est obligatoire, arrêter la validation
    if (!result.isValid && criterion.required !== false) {
      return result;
    }
  }
  
  // Tous les critères sont satisfaits
  const allValid = results.every(r => r.isValid);
  return {
    isValid: allValid,
    message: allValid 
      ? `🎉 Excellent! Leçon "${lesson.title}" terminée avec succès!`
      : 'Certains critères ne sont pas encore remplis',
    results: results
  };
};

/**
 * Valide un seul critère
 */
const validateSingleCriterion = async (workspace, blockTypes, allBlocks, criterion) => {
  switch (criterion.type) {
    case 'block_presence':
      return validateBlockPresence(blockTypes, criterion);
    
    case 'block_connection':
      return validateBlockConnection(allBlocks, criterion);
    
    case 'block_sequence':
      return validateDynamicBlockSequence(allBlocks, criterion);
    
    case 'block_field_value':
      return validateBlockFieldValue(allBlocks, criterion);
    
    case 'block_count':
      return validateBlockCount(blockTypes, criterion);

    // New: result-based validation via simulation
  case 'state_goal': {
      try {
    const { simulateWorkspace, compareState } = await import('./blockExecutor.js');
    const finalState = simulateWorkspace(workspace, { maxSteps: criterion.maxSteps || 10000 });
        const { isMatch, details } = compareState(finalState, criterion.goal || {});
        return {
          isValid: isMatch,
          message: isMatch
            ? (criterion.successMessage || '✅ Objectif atteint par exécution!')
            : (criterion.errorMessage || `❌ Résultat incorrect. ${details?.join(' | ')}`),
          state: finalState,
          details
        };
      } catch (e) {
        return { isValid: false, message: '❌ Erreur simulation', hint: String(e?.message || e) };
      }
    }
    
    default:
      return {
        isValid: true,
        message: `Type de critère non reconnu: ${criterion.type}`
      };
  }
};

/**
 * Valide la présence d'un bloc
 */
const validateBlockPresence = (blockTypes, criterion) => {
  const hasBlock = blockTypes.includes(criterion.blockType);
  return {
    isValid: hasBlock,
    message: hasBlock 
      ? criterion.successMessage || `✅ Bloc "${criterion.blockType}" trouvé!`
      : criterion.errorMessage || `❌ Ajouter le bloc "${criterion.blockType}"`,
    hint: criterion.hint || `Cherchez dans la catégorie ${criterion.category || 'appropriée'}`
  };
};

/**
 * Valide la connexion entre blocs
 */
const validateBlockConnection = (allBlocks, criterion) => {
  const sourceBlock = allBlocks.find(block => block.type === criterion.sourceBlock);
  const targetBlock = allBlocks.find(block => block.type === criterion.targetBlock);
  
  if (!sourceBlock || !targetBlock) {
    return {
      isValid: false,
      message: criterion.errorMessage || `❌ Blocs "${criterion.sourceBlock}" et "${criterion.targetBlock}" requis`
    };
  }
  
  const nextBlock = sourceBlock.getNextBlock();
  const isConnected = nextBlock && nextBlock.type === criterion.targetBlock;
  
  return {
    isValid: isConnected,
    message: isConnected 
      ? criterion.successMessage || `✅ Blocs correctement connectés!`
      : criterion.errorMessage || `🔗 Connecter "${criterion.targetBlock}" sous "${criterion.sourceBlock}"`
  };
};

/**
 * Valide une séquence de blocs
 */
const validateDynamicBlockSequence = (allBlocks, criterion) => {
  const sequence = criterion.sequence || [];
  
  // Trouver le bloc de départ
  const startBlock = allBlocks.find(block => block.type === sequence[0]);
  if (!startBlock) {
    return {
      isValid: false,
      message: `❌ Bloc de départ "${sequence[0]}" manquant`
    };
  }
  
  // Vérifier la séquence
  let currentBlock = startBlock;
  for (let i = 1; i < sequence.length; i++) {
    currentBlock = currentBlock.getNextBlock();
    if (!currentBlock || currentBlock.type !== sequence[i]) {
      return {
        isValid: false,
        message: `❌ Séquence incorrecte à l'étape ${i + 1}. Attendu: "${sequence[i]}"`
      };
    }
  }
  
  return {
    isValid: true,
    message: criterion.successMessage || `✅ Séquence de blocs correcte!`
  };
};

/**
 * Valide la valeur d'un champ de bloc
 */
const validateBlockFieldValue = (allBlocks, criterion) => {
  const block = allBlocks.find(block => block.type === criterion.blockType);
  if (!block) {
    return {
      isValid: false,
      message: `❌ Bloc "${criterion.blockType}" manquant`
    };
  }
  
  const fieldValue = block.getFieldValue(criterion.fieldName);
  const isValid = fieldValue === criterion.expectedValue;
  
  return {
    isValid: isValid,
    message: isValid
      ? criterion.successMessage || `✅ Valeur correcte: ${fieldValue}`
      : criterion.errorMessage || `❌ Changer "${criterion.fieldName}" à "${criterion.expectedValue}"`
  };
};

/**
 * Valide le nombre de blocs d'un type
 */
const validateBlockCount = (blockTypes, criterion) => {
  const count = blockTypes.filter(type => type === criterion.blockType).length;
  const isValid = count === criterion.expectedCount;
  
  return {
    isValid: isValid,
    message: isValid
      ? criterion.successMessage || `✅ Nombre correct de blocs "${criterion.blockType}": ${count}`
      : criterion.errorMessage || `❌ Attendu ${criterion.expectedCount} blocs "${criterion.blockType}", trouvé ${count}`
  };
};

export const validateLesson = (workspace, lesson) => {
  const topBlocks = workspace.getTopBlocks(true);
  const expectedBlocks = lesson.expectedBlocks;
  
  if (!expectedBlocks || expectedBlocks.length === 0) {
    return { isValid: true, message: 'No specific validation required' };
  }

  return validateBlockSequence(topBlocks, expectedBlocks[0]);
};

export const validateBlockSequence = (topBlocks, expectedBlock) => {
  // Find the starting block (usually event_whenflagclicked)
  const startBlock = topBlocks.find(block => block.type === expectedBlock.type);
  
  if (!startBlock) {
    return {
      isValid: false,
      message: `Missing ${expectedBlock.type} block. Make sure to start with the correct event block!`
    };
  }

  // Validate the sequence
  return validateBlockChain(startBlock, expectedBlock);
};

export const validateBlockChain = (actualBlock, expectedBlock) => {
  if (!actualBlock && !expectedBlock) {
    return { isValid: true, message: 'Perfect! All blocks are correctly connected.' };
  }

  if (!actualBlock && expectedBlock) {
    return {
      isValid: false,
      message: `Missing ${expectedBlock.type} block in your sequence.`
    };
  }

  if (actualBlock && !expectedBlock) {
    return {
      isValid: false,
      message: 'You have extra blocks that are not needed for this lesson.'
    };
  }

  // Check if block types match
  if (actualBlock.type !== expectedBlock.type) {
    return {
      isValid: false,
      message: `Expected ${expectedBlock.type} but found ${actualBlock.type}.`
    };
  }

  // Check field values if specified
  if (expectedBlock.fields) {
    for (const [fieldName, expectedValue] of Object.entries(expectedBlock.fields)) {
      const actualValue = actualBlock.getFieldValue(fieldName);
      if (actualValue !== expectedValue) {
        return {
          isValid: false,
          message: `${fieldName} should be ${expectedValue}, but it's ${actualValue}.`
        };
      }
    }
  }

  // Recursively check next block
  const nextActual = actualBlock.getNextBlock();
  const nextExpected = expectedBlock.next;

  return validateBlockChain(nextActual, nextExpected);
};

export const validateTaskCompletion = async (workspace, task) => {
  // Si la tâche a un lessonId, utiliser la nouvelle méthode de validation Blockly
  if (task.lessonId) {
    try {
      // Import de la nouvelle validation Blockly
      const { validateLessonWithBlocklyCode } = await import('./blocklyValidation.js');
      
      // Essayer la validation par comparaison de code Blockly
      const blocklyResult = validateLessonWithBlocklyCode(workspace, task.lessonId);
      
      // ✅ Si la validation Blockly trouve un code de référence ET réussit, retourner le résultat
      if (blocklyResult !== null && blocklyResult.validationMethod === 'code_comparison') {
        return blocklyResult;
      }
      
      // ✅ Sinon (pas de code de référence), fallback vers la méthode dynamique
      const dynamicResult = await validateLessonDynamically(workspace, task.lessonId);
      
      // Si la validation dynamique n'a pas de critères, utiliser la méthode par cas
      if (dynamicResult && dynamicResult.noCriteria) {
        const allBlocks = workspace.getAllBlocks();
        const blockTypes = allBlocks.map(block => block.type);
        return validateTaskCase(task.blockType, blockTypes, allBlocks, workspace);
      }
      return dynamicResult;
      
    } catch (error) {
      console.log('Erreur dans la validation Blockly:', error.message);
      
      // Fallback : validation par critères existante
      const allBlocks = workspace.getAllBlocks();
      const blockTypes = allBlocks.map(block => block.type);
      return validateTaskCase(task.blockType, blockTypes, allBlocks, workspace);
    }
  }
  
  // Sinon, utiliser l'ancienne méthode avec switch/case
  const allBlocks = workspace.getAllBlocks();
  const blockTypes = allBlocks.map(block => block.type);

  return validateTaskCase(task.blockType, blockTypes, allBlocks, workspace);
};

/**
 * Fonction de validation par cas (ancienne méthode)
 * Garde la compatibilité avec l'existant
 */
const validateTaskCase = (blockType, blockTypes, allBlocks, workspace) => {
  switch (blockType) {
    case 'event_whenflagclicked':
      return {
        isValid: blockTypes.includes('event_whenflagclicked'),
        message: blockTypes.includes('event_whenflagclicked') 
          ? '🎉 Parfait! Tu as ajouté le bloc "quand drapeau cliqué"!' 
          : '❌ Ajoute le bloc "quand drapeau cliqué" depuis la catégorie Événements (orange).',
        hint: '💡 Cherche le bloc avec un drapeau vert dans la section Events',
        validationId: 'event_flag_clicked',
        expectedBlock: {
          type: 'event_whenflagclicked',
          category: 'Events',
          color: 'orange',
          icon: '🏁'
        }
      };

    case 'motion_movesteps':
      const hasEventBlock = blockTypes.includes('event_whenflagclicked');
      const hasMotionBlock = blockTypes.includes('motion_movesteps');
      
      if (!hasEventBlock) {
        return {
          isValid: false,
          message: 'First add the "when flag clicked" block, then connect the motion block.'
        };
      }

      if (!hasMotionBlock) {
        return {
          isValid: false,
          message: 'Add the "move steps" block from the Motion category.'
        };
      }

      // Check if blocks are connected
      const eventBlock = allBlocks.find(block => block.type === 'event_whenflagclicked');
      const motionBlock = allBlocks.find(block => block.type === 'motion_movesteps');
      
      if (eventBlock && motionBlock) {
        const nextBlock = eventBlock.getNextBlock();
        if (nextBlock && nextBlock.type === 'motion_movesteps') {
          return {
            isValid: true,
            message: 'Perfect! Your blocks are connected correctly!'
          };
        } else {
          return {
            isValid: false,
            message: 'Connect the motion block below the event block by snapping them together.'
          };
        }
      }
      break;

    case 'complete':
      // Check if the program can run (has event block with connected motion)
      const hasCompleteSequence = validateCompleteSequence(workspace);
      return {
        isValid: hasCompleteSequence,
        message: hasCompleteSequence 
          ? 'Excellent! Your program is ready to run. Click the green flag!' 
          : 'Make sure your blocks are connected in the right order.'
      };

    // Sound blocks validation
    case 'sound_play':
      return {
        isValid: blockTypes.includes('sound_play'),
        message: blockTypes.includes('sound_play') 
          ? 'Great! You added the play sound block!' 
          : 'Add the "play sound" block from the Sound category.'
      };

    case 'sound_play_note':
      return {
        isValid: blockTypes.includes('sound_play_note'),
        message: blockTypes.includes('sound_play_note') 
          ? 'Excellent! You added the play note block!' 
          : 'Add the "play note" block from the Sound category.'
      };

    case 'sound_play_drum':
      return {
        isValid: blockTypes.includes('sound_play_drum'),
        message: blockTypes.includes('sound_play_drum') 
          ? 'Perfect! You added the drum sound block!' 
          : 'Add the "play drum" block from the Sound category.'
      };

    case 'sound_set_volume':
      return {
        isValid: blockTypes.includes('sound_set_volume'),
        message: blockTypes.includes('sound_set_volume') 
          ? 'Great! You set the volume!' 
          : 'Add the "set volume" block from the Sound category.'
      };

    case 'sound_play_sound_until_done':
      return {
        isValid: blockTypes.includes('sound_play_sound_until_done'),
        message: blockTypes.includes('sound_play_sound_until_done') 
          ? 'Perfect! Sound will play until finished!' 
          : 'Add the "play sound until done" block from the Sound category.'
      };

    case 'sound_stop_all':
      return {
        isValid: blockTypes.includes('sound_stop_all'),
        message: blockTypes.includes('sound_stop_all') 
          ? '⏹️ Perfect! All sounds will be stopped!' 
          : '⏹️ Add the "stop all sounds" block from the Sound category.'
      };

    // Control blocks validation
    case 'control_wait':
      return {
        isValid: blockTypes.includes('control_wait'),
        message: blockTypes.includes('control_wait') 
          ? 'Great! You added a wait block for timing!' 
          : 'Add the "wait" block from the Control category.'
      };

    case 'control_repeat':
      return {
        isValid: blockTypes.includes('control_repeat'),
        message: blockTypes.includes('control_repeat') 
          ? '🔄 Excellent! You added a repeat loop!' 
          : '🔄 Add the "repeat" block from the Control category.',
        hint: '💡 Look for the "repeat" block in the Control (yellow) category',
        validationId: 'control_repeat_loop',
        expectedBlock: {
          type: 'control_repeat',
          category: 'Control',
          color: 'yellow',
          icon: '🔄'
        }
      };

    // Looks blocks validation
    case 'looks_say':
      const hasSayBlock = blockTypes.includes('looks_say');
      
      if (!hasSayBlock) {
        return {
          isValid: false,
          message: '❌ Ajoutez le bloc "dire" depuis la catégorie Apparence',
          hint: 'Cherchez le bloc violet "dire" dans la catégorie Looks'
        };
      }
      
      // Vérifier le contenu du bloc say pour plus de flexibilité
      const sayBlock = allBlocks.find(block => block.type === 'looks_say');
      if (sayBlock && sayBlock.getFieldValue) {
        const sayText = sayBlock.getFieldValue('MESSAGE') || '';
        
        if (sayText.trim() === '') {
          return {
            isValid: true,
            message: '✅ Bloc "dire" ajouté! Tapez un message à l\'intérieur',
            hint: 'Essayez "Bonjour", "Hello", ou n\'importe quel message!'
          };
        }
        
        // Validation flexible - accepter tout message non vide
        const sayTextLower = sayText.toLowerCase().trim();
        
        // Messages spéciaux avec réactions personnalisées
        if (TEXT_VARIANTS.greetings.some(greeting => sayTextLower.includes(greeting))) {
          return {
            isValid: true,
            message: `🎉 Magnifique salutation! Votre personnage dit "${sayText}"`,
            hint: 'Parfait! Les salutations rendent votre programme convivial!'
          };
        }
        
        if (TEXT_VARIANTS.success.some(success => sayTextLower.includes(success))) {
          return {
            isValid: true,
            message: `🏆 Excellent message de félicitation! "${sayText}"`,
            hint: 'Super choix! Les encouragements motivent!'
          };
        }
        
        if (TEXT_VARIANTS.completion.some(complete => sayTextLower.includes(complete))) {
          return {
            isValid: true,
            message: `✅ Parfait message de fin! "${sayText}"`,
            hint: 'Bien pensé! Indiquer la fin d\'un programme est important!'
          };
        }
        
        // Accepter tout autre message créatif
        return {
          isValid: true,
          message: `🎨 Message créatif! Votre personnage dit "${sayText}"`,
          hint: 'Fantastique! La créativité rend la programmation amusante!'
        };
      }
      
      return {
        isValid: true,
        message: '✅ Bloc "dire" ajouté avec succès!',
        hint: 'Maintenant tapez un message dans le bloc!'
      };

    // Advanced Motion blocks validation
    case 'motion_goto':
      return {
        isValid: blockTypes.includes('motion_goto'),
        message: blockTypes.includes('motion_goto') 
          ? '🎯 Perfect! Your character can teleport to any position!' 
          : '🎯 Add the "go to x: y:" block from the Motion category.'
      };

    case 'motion_glide':
      return {
        isValid: blockTypes.includes('motion_glide'),
        message: blockTypes.includes('motion_glide') 
          ? '✈️ Excellent! Your character will glide smoothly!' 
          : '✈️ Add the "glide to x: y:" block from the Motion category.'
      };

    case 'motion_point_direction':
      return {
        isValid: blockTypes.includes('motion_point_direction'),
        message: blockTypes.includes('motion_point_direction') 
          ? '🧭 Great! You set the direction!' 
          : '🧭 Add the "point in direction" block from the Motion category.'
      };

    case 'motion_point_towards':
      return {
        isValid: blockTypes.includes('motion_point_towards'),
        message: blockTypes.includes('motion_point_towards') 
          ? '👀 Perfect! Your character will look towards the target!' 
          : '👀 Add the "point towards" block from the Motion category.'
      };

    case 'motion_change_x':
      return {
        isValid: blockTypes.includes('motion_change_x'),
        message: blockTypes.includes('motion_change_x') 
          ? '🔄 Excellent! You can move horizontally!' 
          : '🔄 Add the "change x by" block from the Motion category.'
      };

    case 'motion_change_y':
      return {
        isValid: blockTypes.includes('motion_change_y'),
        message: blockTypes.includes('motion_change_y') 
          ? '🔄 Great! You can move vertically!' 
          : '🔄 Add the "change y by" block from the Motion category.'
      };

    case 'motion_set_x':
      return {
        isValid: blockTypes.includes('motion_set_x'),
        message: blockTypes.includes('motion_set_x') 
          ? '📍 Perfect! You set the horizontal position!' 
          : '📍 Add the "set x to" block from the Motion category.'
      };

    case 'motion_set_y':
      return {
        isValid: blockTypes.includes('motion_set_y'),
        message: blockTypes.includes('motion_set_y') 
          ? '📍 Excellent! You set the vertical position!' 
          : '📍 Add the "set y to" block from the Motion category.'
      };

    case 'motion_if_on_edge_bounce':
      return {
        isValid: blockTypes.includes('motion_if_on_edge_bounce'),
        message: blockTypes.includes('motion_if_on_edge_bounce') 
          ? '🏀 Great! Your character will bounce off edges!' 
          : '🏀 Add the "if on edge, bounce" block from the Motion category.'
      };

    case 'motion_set_rotation_style':
      return {
        isValid: blockTypes.includes('motion_set_rotation_style'),
        message: blockTypes.includes('motion_set_rotation_style') 
          ? '🔄 Perfect! You set the rotation style!' 
          : '🔄 Add the "set rotation style" block from the Motion category.'
      };

    case 'motion_move_forward':
      return {
        isValid: blockTypes.includes('motion_move_forward'),
        message: blockTypes.includes('motion_move_forward') 
          ? '⬆️ Excellent! Moving forward in current direction!' 
          : '⬆️ Add the "move forward" block from the Motion category.'
      };

    case 'motion_move_backward':
      return {
        isValid: blockTypes.includes('motion_move_backward'),
        message: blockTypes.includes('motion_move_backward') 
          ? '⬇️ Great! Moving backward!' 
          : '⬇️ Add the "move backward" block from the Motion category.'
      };

    case 'motion_turnright':
      return {
        isValid: blockTypes.includes('motion_turnright'),
        message: blockTypes.includes('motion_turnright') 
          ? '↻ Perfect! Your character can turn right!' 
          : '↻ Add the "turn right" block from the Motion category.'
      };

    case 'motion_turnleft':
      return {
        isValid: blockTypes.includes('motion_turnleft'),
        message: blockTypes.includes('motion_turnleft') 
          ? '↺ Excellent! Your character can turn left!' 
          : '↺ Add the "turn left" block from the Motion category.'
      };

    // Chat blocks validation
    case 'chat_set_username':
      return {
        isValid: blockTypes.includes('chat_set_username'),
        message: blockTypes.includes('chat_set_username') 
          ? 'رائع! حطيت اسم المستخدم!' 
          : 'حط بلوك "حط اسم المستخدم" من فئة الشات.'
      };

    case 'chat_send_message':
      return {
        isValid: blockTypes.includes('chat_send_message'),
        message: blockTypes.includes('chat_send_message') 
          ? 'ممتاز! بعثت رسالة!' 
          : 'حط بلوك "ابعث رسالة" من فئة الشات.'
      };

    case 'chat_add_emoji':
      return {
        isValid: blockTypes.includes('chat_add_emoji'),
        message: blockTypes.includes('chat_add_emoji') 
          ? 'عظيم! زدت إيموجي!' 
          : 'حط بلوك "زيد إيموجي" من فئة الشات.'
      };

    case 'chat_show_typing':
      return {
        isValid: blockTypes.includes('chat_show_typing'),
        message: blockTypes.includes('chat_show_typing') 
          ? 'ممتاز! راح يظهر إنك تكتب!' 
          : 'حط بلوك "أظهر الكتابة" من فئة الشات.'
      };

    case 'chat_reply_to_message':
      return {
        isValid: blockTypes.includes('chat_reply_to_message'),
        message: blockTypes.includes('chat_reply_to_message') 
          ? 'رائع! ردت على الرسالة!' 
          : 'حط بلوك "رد على رسالة" من فئة الشات.'
      };

    case 'chat_auto_reply':
      return {
        isValid: blockTypes.includes('chat_auto_reply'),
        message: blockTypes.includes('chat_auto_reply') 
          ? 'عظيم! حطيت رد تلقائي!' 
          : 'حط بلوك "رد تلقائي" من فئة الشات.'
      };

    default:
      return {
        isValid: false,
        message: `Block type "${task.blockType}" is not recognized. Please check the instructions.`
      };
  }

  return { isValid: false, message: 'Please check your blocks.' };
};

const validateCompleteSequence = (workspace) => {
  const topBlocks = workspace.getTopBlocks(true);
  const eventBlock = topBlocks.find(block => block.type === 'event_whenflagclicked');
  
  if (!eventBlock) return false;
  
  const nextBlock = eventBlock.getNextBlock();
  return nextBlock && nextBlock.type === 'motion_movesteps';
};

// Helper function for providing hints
export const getHint = (workspace, task) => {
  const allBlocks = workspace.getAllBlocks();
  const blockTypes = allBlocks.map(block => block.type);

  if (blockTypes.length === 0) {
    return "Start by dragging a block from the toolbox to the workspace!";
  }

  switch (task.blockType) {
    case 'event_whenflagclicked':
      if (!blockTypes.includes('event_whenflagclicked')) {
        return "Look in the Events category (orange blocks) for the 'when flag clicked' block.";
      }
      break;

    case 'motion_movesteps':
      if (!blockTypes.includes('motion_movesteps')) {
        return "Look in the Motion category (blue blocks) for the 'move steps' block.";
      } else {
        return "Try connecting the motion block to the event block by dragging it close and snapping it underneath.";
      }
      break;

    case 'sound_play':
      if (!blockTypes.includes('sound_play')) {
        return "Look in the Sound category (purple blocks) for the 'play sound' block.";
      }
      break;

    case 'sound_play_note':
      if (!blockTypes.includes('sound_play_note')) {
        return "Look in the Sound category for the 'play note' block. You can choose different notes!";
      }
      break;

    case 'sound_play_drum':
      if (!blockTypes.includes('sound_play_drum')) {
        return "Look in the Sound category for the 'play drum' block. Try different drum sounds!";
      }
      break;

    case 'control_wait':
      if (!blockTypes.includes('control_wait')) {
        return "Look in the Control category (yellow blocks) for the 'wait' block.";
      }
      break;

    case 'looks_say':
      if (!blockTypes.includes('looks_say')) {
        return "Look in the Looks category (purple blocks) for the 'say' block.";
      }
      break;

    // Advanced Motion hints
    case 'motion_goto':
      if (!blockTypes.includes('motion_goto')) {
        return "Look in the Motion category (blue blocks) for the 'go to x: y:' block to teleport instantly.";
      }
      break;

    case 'motion_glide':
      if (!blockTypes.includes('motion_glide')) {
        return "Look in the Motion category for the 'glide' block to move smoothly over time.";
      }
      break;

    case 'motion_point_direction':
      if (!blockTypes.includes('motion_point_direction')) {
        return "Look in the Motion category for the 'point in direction' block. Use 90 for right, -90 for left!";
      }
      break;

    case 'motion_point_towards':
      if (!blockTypes.includes('motion_point_towards')) {
        return "Look in the Motion category for the 'point towards' block to face a specific target.";
      }
      break;

    case 'motion_change_x':
      if (!blockTypes.includes('motion_change_x')) {
        return "Look in the Motion category for 'change x by' to move left (negative) or right (positive).";
      }
      break;

    case 'motion_change_y':
      if (!blockTypes.includes('motion_change_y')) {
        return "Look in the Motion category for 'change y by' to move down (negative) or up (positive).";
      }
      break;

    case 'motion_set_x':
      if (!blockTypes.includes('motion_set_x')) {
        return "Look in the Motion category for 'set x to' to place your character at a specific horizontal position.";
      }
      break;

    case 'motion_set_y':
      if (!blockTypes.includes('motion_set_y')) {
        return "Look in the Motion category for 'set y to' to place your character at a specific vertical position.";
      }
      break;

    case 'motion_if_on_edge_bounce':
      if (!blockTypes.includes('motion_if_on_edge_bounce')) {
        return "Look in the Motion category for 'if on edge, bounce' to make your character bounce off screen edges.";
      }
      break;

    case 'motion_set_rotation_style':
      if (!blockTypes.includes('motion_set_rotation_style')) {
        return "Look in the Motion category for 'set rotation style' to control how your character rotates.";
      }
      break;

    case 'motion_move_forward':
      if (!blockTypes.includes('motion_move_forward')) {
        return "Look in the Motion category for 'move forward' to move in the current direction.";
      }
      break;

    case 'motion_move_backward':
      if (!blockTypes.includes('motion_move_backward')) {
        return "Look in the Motion category for 'move backward' to move in the opposite direction.";
      }
      break;

    case 'motion_turnright':
      if (!blockTypes.includes('motion_turnright')) {
        return "Look in the Motion category (blue blocks) for the 'turn right' block.";
      }
      break;

    case 'motion_turnleft':
      if (!blockTypes.includes('motion_turnleft')) {
        return "Look in the Motion category (blue blocks) for the 'turn left' block.";
      }
      break;

    case 'chat_set_username':
      if (!blockTypes.includes('chat_set_username')) {
        return "دور في فئة الشات (الزرقاء الفاتحة) على بلوك 'حط اسم المستخدم'.";
      }
      break;

    case 'chat_send_message':
      if (!blockTypes.includes('chat_send_message')) {
        return "دور في فئة الشات على بلوك 'ابعث رسالة'.";
      }
      break;

    case 'chat_add_emoji':
      if (!blockTypes.includes('chat_add_emoji')) {
        return "دور في فئة الشات على بلوك 'زيد إيموجي'.";
      }
      break;

    case 'complete':
      return "Click the green flag above the stage to run your program and see the magic happen!";
  }

  return "You're doing great! Keep following the instructions.";
};
