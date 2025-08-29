/**
 * Test script pour valider le système de comparaison de code Blockly
 */

import { 
  validateByCodeComparison, 
  cleanCode, 
  validateSolution 
} from '../src/lib/validation.js';

// Test de la fonction cleanCode
console.log('🧪 Test de la fonction cleanCode');

const testCode1 = `
  for (var count = 0; count < 4; count++) {
    moveSteps(10);
  }
  say('Bravo !');
`;

const testCode2 = `for(var count=0;count<4;count++){moveSteps(10);}say('Bravo!');`;

console.log('Code original 1:', testCode1);
console.log('Code nettoyé 1:', cleanCode(testCode1));
console.log('');
console.log('Code original 2:', testCode2);
console.log('Code nettoyé 2:', cleanCode(testCode2));
console.log('');

// Test de la fonction validateSolution
console.log('🧪 Test de la fonction validateSolution');

const correctCode = `
for (var count = 0; count < 4; count++) {
  moveSteps(10);
}
say('Bravo !');
`;

const userCode1 = `for(var count=0; count<4; count++) { moveSteps(10); } say('Bravo !');`; // Correct mais formaté différemment
const userCode2 = `moveSteps(10); moveSteps(10); moveSteps(10); say('Bravo !');`; // Incorrect

const test1 = validateSolution(correctCode, userCode1);
const test2 = validateSolution(correctCode, userCode2);

console.log('Test 1 (code correct, format différent):', test1 ? '✅ PASS' : '❌ FAIL');
console.log('Test 2 (code incorrect):', test2 ? '❌ FAIL (devrait être false)' : '✅ PASS');
console.log('');

// Test avec des commentaires
console.log('🧪 Test avec des commentaires');

const codeWithComments = `
// Boucle pour faire bouger Nexie
for (var count = 0; count < 4; count++) {
  moveSteps(10); // Avancer de 10 pas
}
/* Message de fin */
say('Bravo !');
`;

const codeWithoutComments = `
for (var count = 0; count < 4; count++) {
  moveSteps(10);
}
say('Bravo !');
`;

const test3 = validateSolution(codeWithComments, codeWithoutComments);
console.log('Test 3 (avec/sans commentaires):', test3 ? '✅ PASS' : '❌ FAIL');

// Test API simulation
console.log('');
console.log('🧪 Test de structure de réponse API');

// Simulation de ce qu'on obtiendrait de l'API
const mockApiResponse = {
  success: true,
  data: {
    id: 5,
    title: "Faire bouger Nexie en boucle",
    correctCode: `for (var count = 0; count < 4; count++) {
  moveSteps(10);
}
say('Bravo !');`,
    tasks: [
      { instruction: "Ajouter 'quand drapeau cliqué'" },
      { instruction: "Ajouter 'avancer de 10 pas'" }
    ]
  }
};

console.log('Mock API response correctCode:', mockApiResponse.data.correctCode);
console.log('Code de référence présent:', mockApiResponse.data.correctCode ? '✅' : '❌');

console.log('');
console.log('🎉 Tous les tests terminés!');
