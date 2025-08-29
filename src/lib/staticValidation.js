/**
 * Configuration des codes de référence sans base de données
 * Chaque leçon a son code de référence défini statiquement
 */

export const LESSON_REFERENCE_CODES = {
  1: {
    title: "Faire bouger Nexie en boucle",
    referenceCode: `for (var count = 0; count < 4; count++) {
  moveSteps(10);
}
say('Bravo !');`
  },
  
  2: {
    title: "Apprendre les Sons avec Nexie", 
    referenceCode: `playNote('C', 0.5);
wait(1);
playNote('E', 0.5);`
  },
  
  3: {
    title: "Nexie fait le carré",
    referenceCode: `for (var count = 0; count < 4; count++) {
  moveSteps(100);
  turnRight(90);
}`
  }
};

/**
 * Fonction pour obtenir le code de référence d'une leçon
 */
export const getReferenceCode = (lessonId) => {
  const lesson = LESSON_REFERENCE_CODES[lessonId];
  return lesson ? lesson.referenceCode : null;
};

/**
 * Validation par code sans base de données
 */
export const validateLessonByCode = (workspace, lessonId) => {
  const referenceCode = getReferenceCode(lessonId);
  
  if (!referenceCode) {
    console.log(`Pas de code de référence pour la leçon ${lessonId}, utilisation de la validation par critères`);
    return null; // Fallback vers l'ancienne méthode
  }
  
  // Générer le code utilisateur
  if (typeof Blockly === 'undefined' || !Blockly.JavaScript) {
    throw new Error('Blockly JavaScript generator non disponible');
  }
  
  const userCode = Blockly.JavaScript.workspaceToCode(workspace);
  
  // Nettoyer les codes pour comparaison
  const cleanCode = (code) => code.replace(/\s+/g, '').replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  
  const cleanReference = cleanCode(referenceCode);
  const cleanUser = cleanCode(userCode);
  
  return {
    isValid: cleanReference === cleanUser,
    message: cleanReference === cleanUser 
      ? '🎉 Parfait! Votre solution est correcte!'
      : '❌ Votre solution ne correspond pas encore à celle attendue',
    userCode: userCode,
    referenceCode: referenceCode,
    validationMethod: 'static_code_comparison'
  };
};
