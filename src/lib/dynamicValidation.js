/**
 * Validation dynamique par génération de code de référence
 * Génère le code attendu à partir de la définition des blocs
 */

export const LESSON_BLOCK_DEFINITIONS = {
  1: {
    title: "Faire bouger Nexie en boucle",
    expectedBlocks: [
      { type: 'event_whenflagclicked' },
      { 
        type: 'control_repeat',
        times: 4,
        children: [
          { type: 'motion_movesteps', steps: 10 }
        ]
      },
      { type: 'looks_say', message: 'Bravo !' }
    ]
  },
  
  2: {
    title: "Sons avec Nexie",
    expectedBlocks: [
      { type: 'event_whenflagclicked' },
      { type: 'sound_play_note', note: 'C', duration: 0.5 },
      { type: 'control_wait', seconds: 1 },
      { type: 'sound_play_note', note: 'E', duration: 0.5 }
    ]
  }
};

/**
 * Génère le code de référence à partir de la définition des blocs
 */
export const generateReferenceFromBlocks = (blockDefinition) => {
  let code = '';
  
  for (const block of blockDefinition.expectedBlocks) {
    switch (block.type) {
      case 'event_whenflagclicked':
        // Pas de code généré pour l'événement
        break;
        
      case 'control_repeat':
        code += `for (var count = 0; count < ${block.times}; count++) {\n`;
        if (block.children) {
          for (const child of block.children) {
            code += '  ' + generateBlockCode(child) + '\n';
          }
        }
        code += '}\n';
        break;
        
      default:
        code += generateBlockCode(block) + '\n';
    }
  }
  
  return code.trim();
};

const generateBlockCode = (block) => {
  switch (block.type) {
    case 'motion_movesteps':
      return `moveSteps(${block.steps || 10});`;
      
    case 'motion_turnright':
      return `turnRight(${block.degrees || 90});`;
      
    case 'looks_say':
      return `say('${block.message || 'Hello'}');`;
      
    case 'sound_play_note':
      return `playNote('${block.note}', ${block.duration});`;
      
    case 'control_wait':
      return `wait(${block.seconds});`;
      
    default:
      return `// Unknown block: ${block.type}`;
  }
};

/**
 * Validation avec génération dynamique du code de référence
 */
export const validateWithDynamicReference = (workspace, lessonId) => {
  const lessonDef = LESSON_BLOCK_DEFINITIONS[lessonId];
  
  if (!lessonDef) {
    console.log(`Pas de définition pour la leçon ${lessonId}`);
    return null;
  }
  
  // Générer le code de référence
  const referenceCode = generateReferenceFromBlocks(lessonDef);
  
  // Générer le code utilisateur
  const userCode = Blockly.JavaScript.workspaceToCode(workspace);
  
  // Comparer
  const cleanCode = (code) => code.replace(/\s+/g, '').replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  
  const isValid = cleanCode(referenceCode) === cleanCode(userCode);
  
  return {
    isValid,
    message: isValid 
      ? '🎉 Excellent! Votre solution est parfaite!'
      : '❌ Continuez, vous êtes sur la bonne voie!',
    userCode,
    referenceCode,
    validationMethod: 'dynamic_code_generation'
  };
};
