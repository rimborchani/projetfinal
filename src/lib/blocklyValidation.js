/**
 * Validation par comparaison de code Blockly - Version sans modification DB
 * Implémente exactement la méthode décrite dans le guide original
 */

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
  
  // First remove comments, then whitespace (order matters)
  let cleaned = code;
  
  // Remove single-line comments (starts with //)
  cleaned = cleaned.replace(/\/\/.*$/gm, '');

  // Remove multi-line comments (starts with /* and ends with */)
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Remove all whitespace (spaces, tabs, newlines) - do this last
  cleaned = cleaned.replace(/\s+/g, '');
  
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
 * Configuration des codes de référence - remplace la base de données
 * Au lieu de stocker dans la DB, on définit les codes ici
 */
const REFERENCE_CODES = {
  1: `for (var count = 0; count < 4; count++) {
  moveSteps(10);
}
say('Bravo !');`,

  2: `playNote('C', 0.5);
wait(1);
playNote('E', 0.5);`,

  3: `for (var count = 0; count < 4; count++) {
  moveSteps(100);
  turnRight(90);
}`
};

/**
 * Step 1: Admin's Role - Generating and Saving the Correct Answer
 * Génère le code de référence depuis le workspace de l'admin
 */
export const generateAndSaveCorrectCode = (lessonId, title = "My Lab") => {
  // This code runs in the "admin" environment.
  // It assumes 'Blockly' and 'Blockly.JavaScript' are loaded.

  if (typeof Blockly === 'undefined' || !Blockly.JavaScript) {
    throw new Error('Blockly et Blockly.JavaScript doivent être chargés');
  }

  // 1. Get the current active Blockly workspace.
  const adminWorkspace = Blockly.getMainWorkspace();

  if (!adminWorkspace) {
    throw new Error('Aucun workspace Blockly actif trouvé');
  }

  // 2. Use the JavaScript generator to convert the blocks into a code string.
  const correctCode = Blockly.JavaScript.workspaceToCode(adminWorkspace);

  // 3. Store this 'correctCode' string - Dans notre cas, on l'affiche pour que l'admin le copie
  console.log('🎯 Code de référence généré pour la leçon', lessonId, ':', title);
  console.log('Code à ajouter dans REFERENCE_CODES:');
  console.log('-----------------------------------');
  console.log(`${lessonId}: \`${correctCode}\`,`);
  console.log('-----------------------------------');

  return {
    lessonId,
    title,
    correctCode,
    message: 'Code généré avec succès! Copiez le code affiché dans la console vers REFERENCE_CODES.'
  };
};

/**
 * Step 2: User's Role - Generating Their Submitted Code
 * Génère le code soumis par l'utilisateur
 */
export const generateUserSubmittedCode = (lessonId) => {
  // This code runs in the "user" environment.

  if (typeof Blockly === 'undefined' || !Blockly.JavaScript) {
    throw new Error('Blockly JavaScript generator non disponible');
  }

  // 1. Get the user's current workspace.
  const userWorkspace = Blockly.getMainWorkspace();

  if (!userWorkspace) {
    throw new Error('Aucun workspace utilisateur trouvé');
  }

  // 2. Generate the code string from their blocks.
  const userSubmittedCode = Blockly.JavaScript.workspaceToCode(userWorkspace);

  // 3. Send this 'userSubmittedCode' to your backend for validation.
  // Dans notre cas, on retourne directement pour validation
  return {
    lessonId: lessonId,
    userCode: userSubmittedCode
  };
};

/**
 * Step 3: Verifying the Code (Backend)
 * Valide le code de l'utilisateur contre le code de référence
 */
export const validateUserSolution = (lessonId, userSubmittedCode) => {
  // Récupérer le code de référence (remplace: fetch from database)
  const correctCodeFromDB = REFERENCE_CODES[lessonId];

  if (!correctCodeFromDB) {
    // ✅ Retourner null pour permettre le fallback vers l'ancienne méthode
    return null; // Pas de code de référence = utiliser autre méthode de validation
  }

  // Valider la solution
  if (validateSolution(correctCodeFromDB, userSubmittedCode)) {
    console.log("Success! The user's solution is correct.");
    return {
      success: true,
      isValid: true,
      message: "🎉 Parfait! Votre solution est correcte!",
      lessonId,
      userCode: userSubmittedCode,
      referenceCode: correctCodeFromDB,
      validationMethod: 'code_comparison'
    };
  } else {
    console.log("Incorrect solution. Please try again.");
    return {
      success: true,
      isValid: false,
      message: "❌ Votre solution ne correspond pas encore à celle attendue. Essayez encore!",
      hint: "Vérifiez l'ordre et les paramètres de vos blocs",
      lessonId,
      userCode: userSubmittedCode,
      referenceCode: correctCodeFromDB,
      validationMethod: 'code_comparison'
    };
  }
};

/**
 * Fonction complète de validation pour intégration dans votre système existant
 */
export const validateLessonWithBlocklyCode = (workspace, lessonId) => {
  try {
    // Générer le code utilisateur
    if (!workspace) {
      throw new Error('Workspace requis pour la validation');
    }

    if (typeof Blockly === 'undefined' || !Blockly.JavaScript) {
      throw new Error('Blockly JavaScript generator non disponible');
    }

    // Step 2: Generate user code
    const userSubmittedCode = Blockly.JavaScript.workspaceToCode(workspace);
    
    // Step 3: Validate
    const result = validateUserSolution(lessonId, userSubmittedCode);
    
    // ✅ Si pas de code de référence, retourner null pour permettre fallback
    if (result === null) {
      return null; // Permet au système parent d'utiliser l'ancienne méthode
    }
    
    return result;

  } catch (error) {
    return {
      success: false,
      isValid: false,
      message: 'Erreur lors de la validation par code',
      error: error.message,
      validationMethod: 'code_comparison_error'
    };
  }
};

/**
 * Fonction helper pour ajouter facilement de nouveaux codes de référence
 */
export const addReferenceCode = (lessonId, code) => {
  REFERENCE_CODES[lessonId] = code;
  console.log(`✅ Code de référence ajouté pour la leçon ${lessonId}`);
};

/**
 * Fonction helper pour voir tous les codes de référence
 */
export const listReferenceCodes = () => {
  console.log('📋 Codes de référence configurés:');
  Object.entries(REFERENCE_CODES).forEach(([id, code]) => {
    console.log(`Leçon ${id}:`, code.substring(0, 50) + '...');
  });
  return REFERENCE_CODES;
};

// Export des fonctions utilitaires pour réutilisation
export { cleanCode, validateSolution };
