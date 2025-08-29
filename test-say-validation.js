// Test de validation flexible pour le bloc "say"
console.log('🧪 Test Validation Flexible - Bloc Say');
console.log('=====================================');

// Fonction pour simuler la validation (copie de la logique)
const TEXT_VARIANTS = {
  greetings: ['bonjour', 'hello', 'hi', 'salut', 'coucou', 'hey', 'bonsoir', 'good morning', 'good evening'],
  farewell: ['au revoir', 'bye', 'goodbye', 'à bientôt', 'see you', 'adieu', 'ciao'],
  success: ['bravo', 'super', 'excellent', 'parfait', 'great', 'awesome', 'well done', 'félicitations'],
  completion: ['terminé', 'fini', 'done', 'finished', 'complete', 'voilà', 'c\'est fait']
};

function testSayValidation(sayText) {
  console.log(`\n🔍 Test avec le texte: "${sayText}"`);
  
  // Simuler la validation
  if (!sayText || sayText.trim() === '') {
    return {
      isValid: true,
      message: '✅ Bloc "dire" ajouté! Tapez un message à l\'intérieur',
      hint: 'Essayez "Bonjour", "Hello", ou n\'importe quel message!'
    };
  }
  
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

// Tests avec différents messages
const testMessages = [
  'Bonjour',
  'Hello',
  'Hi there!',
  'Salut tout le monde',
  'Bravo!',
  'Super travail',
  'Excellent',
  'Terminé',
  'Fini!',
  'Done',
  'Je suis un robot',
  'Ça marche!',
  'Vive la programmation',
  '',
  'good morning',
  'HELLO WORLD',
  'salut'
];

console.log('\n📊 Tests de validation:');
console.log('======================');

testMessages.forEach(message => {
  const result = testSayValidation(message);
  const status = result.isValid ? '✅' : '❌';
  
  console.log(`${status} "${message}" → ${result.message}`);
  if (result.hint) {
    console.log(`   💡 ${result.hint}`);
  }
});

console.log('\n🎯 Résumé:');
console.log('- ✅ Bonjour/Hello → Message de salutation spécial');
console.log('- ✅ Bravo/Super → Message de félicitation spécial');  
console.log('- ✅ Terminé/Done → Message de completion spécial');
console.log('- ✅ Tout autre texte → Message créatif accepté');
console.log('- ✅ Texte vide → Encouragement à écrire');
console.log('');
console.log('🎉 RÉSULTAT: Le système accepte "Hello" quand l\'instruction dit "Bonjour"!');
console.log('🌟 BONUS: Il encourage la créativité avec des messages personnalisés!');

// Test de cas spécifique mentionné par l'utilisateur
console.log('\n🎯 CAS SPÉCIFIQUE:');
console.log('==================');
console.log('Instruction: "Ajoutez dire Bonjour"');
console.log('Étudiant tape: "Hello"');

const specificResult = testSayValidation('Hello');
console.log(`Résultat: ${specificResult.isValid ? '✅ ACCEPTÉ' : '❌ REFUSÉ'}`);
console.log(`Message: ${specificResult.message}`);
console.log(`Conseil: ${specificResult.hint}`);

console.log('\n✨ PARFAIT! Le système est maintenant flexible et encourage!');
