/**
 * Exemples d'utilisation de la validation Blockly - Méthode exacte
 * Tests et démonstrations de la méthode de validation par comparaison de code
 */

// Import des fonctions de validation
import { 
  generateAndSaveCorrectCode, 
  generateUserSubmittedCode, 
  validateUserSolution,
  validateLessonWithBlocklyCode,
  addReferenceCode,
  listReferenceCodes,
  cleanCode,
  validateSolution
} from '../src/lib/blocklyValidation.js';

/**
 * Test 1: Step 1 - Admin Role (Code Generation)
 * Simule la génération du code de référence par l'admin
 */
export const testAdminCodeGeneration = () => {
  console.log('🧪 Test 1: Génération du code admin');
  console.log('=====================================');
  
  try {
    // Simuler qu'il y a un workspace Blockly avec des blocs
    if (typeof Blockly === 'undefined') {
      console.log('⚠️ Blockly non disponible - simulation du résultat');
      
      // Simuler le résultat que produirait la fonction
      const mockResult = {
        lessonId: 'test-1',
        title: 'Test Lesson',
        correctCode: `for (var count = 0; count < 4; count++) {\n  moveSteps(10);\n}\nsay('Terminé!');`,
        message: 'Code généré avec succès!'
      };
      
      console.log('📝 Résultat simulé:', mockResult);
      console.log('Code à ajouter dans REFERENCE_CODES:');
      console.log(`test-1: \`${mockResult.correctCode}\`,`);
      return mockResult;
    } else {
      // Test réel avec Blockly
      const result = generateAndSaveCorrectCode('test-1', 'Test Movement Lesson');
      console.log('✅ Code généré avec succès:', result);
      return result;
    }
  } catch (error) {
    console.error('❌ Erreur génération:', error);
    return null;
  }
};

/**
 * Test 2: Step 2 - User Code Generation
 * Simule la génération du code soumis par l'utilisateur
 */
export const testUserCodeGeneration = () => {
  console.log('\n🧪 Test 2: Génération du code utilisateur');
  console.log('==========================================');
  
  try {
    if (typeof Blockly === 'undefined') {
      console.log('⚠️ Blockly non disponible - simulation du résultat');
      
      // Simuler différents codes utilisateur
      const mockUserCodes = [
        {
          lessonId: 'test-1',
          userCode: `for (var count = 0; count < 4; count++) {\n  moveSteps(10);\n}\nsay('Terminé!');`, // Code correct
          description: 'Code identique (correct)'
        },
        {
          lessonId: 'test-1', 
          userCode: `for (var count = 0; count < 4; count++) {\n  moveSteps(10);\n  // commentaire\n}\nsay('Terminé!');`, // Avec commentaire
          description: 'Code avec commentaire (correct)'
        },
        {
          lessonId: 'test-1',
          userCode: `for (var count = 0; count < 3; count++) {\n  moveSteps(10);\n}\nsay('Terminé!');`, // Différent
          description: 'Code différent (incorrect)'
        }
      ];
      
      console.log('📝 Codes utilisateur simulés:');
      mockUserCodes.forEach((mock, index) => {
        console.log(`${index + 1}. ${mock.description}:`);
        console.log(mock.userCode);
        console.log('---');
      });
      
      return mockUserCodes;
    } else {
      // Test réel avec Blockly
      const result = generateUserSubmittedCode('test-1');
      console.log('✅ Code utilisateur généré:', result);
      return result;
    }
  } catch (error) {
    console.error('❌ Erreur génération utilisateur:', error);
    return null;
  }
};

/**
 * Test 3: Step 3 - Code Validation
 * Teste la fonction de validation des codes
 */
export const testCodeValidation = () => {
  console.log('\n🧪 Test 3: Validation des codes');
  console.log('===============================');
  
  // Codes de test
  const correctCode = `for (var count = 0; count < 4; count++) {
  moveSteps(10);
}
say('Terminé!');`;

  const testCases = [
    {
      name: 'Code identique',
      userCode: `for (var count = 0; count < 4; count++) {
  moveSteps(10);
}
say('Terminé!');`,
      expected: true
    },
    {
      name: 'Code avec espaces différents',
      userCode: `for(var count=0;count<4;count++){
moveSteps(10);
}
say('Terminé!');`,
      expected: true
    },
    {
      name: 'Code avec commentaires',
      userCode: `// Boucle de mouvement
for (var count = 0; count < 4; count++) {
  moveSteps(10); // Avancer
}
/* Message final */
say('Terminé!');`,
      expected: true
    },
    {
      name: 'Code logiquement différent',
      userCode: `for (var count = 0; count < 3; count++) {
  moveSteps(10);
}
say('Terminé!');`,
      expected: false
    },
    {
      name: 'Code complètement différent',
      userCode: `moveSteps(20);
say('Bonjour!');`,
      expected: false
    }
  ];
  
  console.log('📝 Tests de validation:');
  console.log('Code de référence:', correctCode);
  console.log('---');
  
  testCases.forEach((testCase, index) => {
    const result = validateSolution(correctCode, testCase.userCode);
    const status = result === testCase.expected ? '✅' : '❌';
    
    console.log(`${index + 1}. ${status} ${testCase.name}`);
    console.log(`   Résultat: ${result}, Attendu: ${testCase.expected}`);
    if (result !== testCase.expected) {
      console.log(`   Code nettoyé correct: "${cleanCode(correctCode)}"`);
      console.log(`   Code nettoyé utilisateur: "${cleanCode(testCase.userCode)}"`);
    }
    console.log('---');
  });
};

/**
 * Test 4: Validation complète avec leçons
 * Teste le système complet avec différentes leçons
 */
export const testCompleteValidation = () => {
  console.log('\n🧪 Test 4: Validation complète par leçons');
  console.log('==========================================');
  
  // Ajouter quelques codes de référence pour les tests
  addReferenceCode('test-motion', `for (var count = 0; count < 4; count++) {
  moveSteps(10);
}
say('Bravo !');`);

  addReferenceCode('test-sound', `playNote('C', 0.5);
wait(1);
playNote('E', 0.5);`);

  // Afficher les codes configurés
  console.log('📋 Codes de référence configurés:');
  listReferenceCodes();
  
  // Tests de validation
  const testValidations = [
    {
      lessonId: 'test-motion',
      userCode: `for (var count = 0; count < 4; count++) {
  moveSteps(10);
}
say('Bravo !');`,
      description: 'Motion - Code correct'
    },
    {
      lessonId: 'test-motion', 
      userCode: `for (var count = 0; count < 3; count++) {
  moveSteps(10);
}
say('Bravo !');`,
      description: 'Motion - Code incorrect'
    },
    {
      lessonId: 'test-sound',
      userCode: `playNote('C', 0.5);
wait(1);
playNote('E', 0.5);`,
      description: 'Sound - Code correct'
    },
    {
      lessonId: 'unknown-lesson',
      userCode: `moveSteps(10);`,
      description: 'Leçon inexistante'
    }
  ];
  
  console.log('\n📝 Tests de validation par leçon:');
  testValidations.forEach((test, index) => {
    console.log(`\n${index + 1}. ${test.description}`);
    const result = validateUserSolution(test.lessonId, test.userCode);
    console.log(`   Résultat:`, result);
  });
};

/**
 * Test 5: Performance et nettoyage de code
 * Teste les performances du nettoyage de code
 */
export const testCodeCleaning = () => {
  console.log('\n🧪 Test 5: Nettoyage et performance');
  console.log('===================================');
  
  const complexCode = `
    // Ceci est un commentaire
    for (var count = 0; count < 4; count++) {
      // Avancer de 10 pas
      moveSteps(10);
      
      /* Commentaire
         sur plusieurs lignes */
      turnRight(90);
    }
    
    // Message final
    say('Terminé!'); /* inline comment */
  `;
  
  console.log('Code original:', complexCode);
  console.log('---');
  
  const startTime = performance.now();
  const cleanedCode = cleanCode(complexCode);
  const endTime = performance.now();
  
  console.log('Code nettoyé:', cleanedCode);
  console.log(`Temps de nettoyage: ${(endTime - startTime).toFixed(2)}ms`);
  
  // Test avec beaucoup de répétitions pour la performance
  const iterations = 1000;
  const perfStartTime = performance.now();
  
  for (let i = 0; i < iterations; i++) {
    cleanCode(complexCode);
  }
  
  const perfEndTime = performance.now();
  console.log(`Performance: ${iterations} nettoyages en ${(perfEndTime - perfStartTime).toFixed(2)}ms`);
  console.log(`Moyenne: ${((perfEndTime - perfStartTime) / iterations).toFixed(4)}ms par nettoyage`);
};

/**
 * Exécuter tous les tests
 */
export const runAllTests = () => {
  console.log('🚀 Lancement de tous les tests de validation Blockly');
  console.log('=====================================================\n');
  
  testAdminCodeGeneration();
  testUserCodeGeneration(); 
  testCodeValidation();
  testCompleteValidation();
  testCodeCleaning();
  
  console.log('\n✅ Tous les tests terminés!');
  console.log('Consultez la console pour les détails.');
};

/**
 * Test interactif pour le navigateur
 */
export const interactiveTest = () => {
  if (typeof window !== 'undefined') {
    // Test dans le navigateur
    console.log('🌐 Test interactif dans le navigateur');
    
    // Exposer les fonctions de test dans window pour utilisation dans la console
    window.blocklyValidationTests = {
      testAdminCodeGeneration,
      testUserCodeGeneration,
      testCodeValidation,
      testCompleteValidation,
      testCodeCleaning,
      runAllTests
    };
    
    console.log('📋 Fonctions de test disponibles dans window.blocklyValidationTests');
    console.log('Tapez: window.blocklyValidationTests.runAllTests()');
  }
};

// Auto-exécution si dans Node.js
if (typeof window === 'undefined' && typeof module !== 'undefined') {
  console.log('🔧 Mode Node.js détecté - exécution des tests');
  runAllTests();
}

// Export pour utilisation externe
export default {
  testAdminCodeGeneration,
  testUserCodeGeneration, 
  testCodeValidation,
  testCompleteValidation,
  testCodeCleaning,
  runAllTests,
  interactiveTest
};
