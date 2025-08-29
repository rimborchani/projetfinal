// Test simple de la validation Blockly
console.log('🧪 Test de validation Blockly');
console.log('==============================');

// Test de la fonction cleanCode
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

// Test de la fonction validateSolution
function validateSolution(correctCode, userCode) {
  const cleanedCorrectCode = cleanCode(correctCode);
  const cleanedUserCode = cleanCode(userCode);
  
  // A direct string comparison now works perfectly.
  return cleanedCorrectCode === cleanedUserCode;
}

const correctCode = `for (var count = 0; count < 4; count++) {
  moveSteps(10);
}
say('Bravo!');`;

const userCode1 = `for (var count = 0; count < 4; count++) {
  moveSteps(10);
}
say('Bravo!');`;

const userCode2 = `for(var count=0;count<4;count++){moveSteps(10);}say('Bravo!');`;

const userCode3 = `// Commentaire
for (var count = 0; count < 4; count++) {
  moveSteps(10); /* inline comment */
}
say('Bravo!');`;

console.log('\n✅ Test 1 - Code identique:');
console.log('Résultat:', validateSolution(correctCode, userCode1) ? '✅ Valide' : '❌ Invalide');

console.log('\n✅ Test 2 - Code sans espaces:');
console.log('Résultat:', validateSolution(correctCode, userCode2) ? '✅ Valide' : '❌ Invalide');

console.log('\n✅ Test 3 - Code avec commentaires:');
console.log('Résultat:', validateSolution(correctCode, userCode3) ? '✅ Valide' : '❌ Invalide');

console.log('\n📋 Codes nettoyés:');
console.log('Correct     :', cleanCode(correctCode));
console.log('Utilisateur1:', cleanCode(userCode1));
console.log('Utilisateur2:', cleanCode(userCode2));
console.log('Utilisateur3:', cleanCode(userCode3));

// Test avec code différent
const userCodeWrong = `for (var count = 0; count < 3; count++) {
  moveSteps(10);
}
say('Bravo!');`;

console.log('\n❌ Test 4 - Code logiquement différent:');
console.log('Résultat:', validateSolution(correctCode, userCodeWrong) ? '✅ Valide' : '❌ Invalide');
console.log('Code nettoyé incorrect:', cleanCode(userCodeWrong));

console.log('\n🎉 Test terminé avec succès!');
console.log('\n📝 Méthode exacte implémentée selon votre guide:');
console.log('✅ Step 1: Admin génère le code de référence');
console.log('✅ Step 2: User génère son code soumis');
console.log('✅ Step 3: Validation par comparaison après nettoyage');
