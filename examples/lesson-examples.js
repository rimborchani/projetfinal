/**
 * Exemple concret de remplissage de leçon pour test réel
 * Ce fichier montre comment créer et tester une nouvelle leçon avec validation
 */

// 📋 Exemple 1: Leçon Simple - Mouvement de Base
const lessonMovementBasique = {
  titre: "Premier Mouvement",
  concept: "Apprendre à faire bouger un personnage",
  preview: "Découvrez comment faire avancer votre personnage avec des blocs de mouvement",
  step1: "Ajoutez le bloc 'quand drapeau cliqué' pour commencer votre programme",
  step2: "Connectez un bloc 'avancer de 10 pas' sous le bloc événement",
  step3: "Ajoutez un bloc 'répéter 3 fois' pour créer une boucle",
  step4: "Terminez avec un bloc 'dire Bravo!' pour féliciter le joueur"
};

// 📋 Exemple 2: Leçon Musique - Sons et Rythmes
const lessonMusique = {
  titre: "Créer de la Musique",
  concept: "Introduction aux blocs sonores",
  preview: "Apprenez à créer des mélodies simples avec Blockly",
  step1: "Commencez par le bloc 'quand drapeau cliqué'",
  step2: "Ajoutez un bloc 'jouer la note Do pendant 0.5 seconde'",
  step3: "Utilisez un bloc 'attendre 1 seconde' pour créer une pause",
  step4: "Terminez avec un bloc 'jouer la note Mi pendant 0.5 seconde'"
};

// 📋 Exemple 3: Leçon Avancée - Formes Géométriques
const lessonGeometrie = {
  titre: "Dessiner un Carré",
  concept: "Géométrie avec la programmation",
  preview: "Utilisez les boucles pour dessiner des formes parfaites",
  step1: "Démarrez avec le bloc événement 'quand drapeau cliqué'",
  step2: "Créez une boucle 'répéter 4 fois' pour les 4 côtés du carré",
  step3: "Dans la boucle, ajoutez 'avancer de 100 pas' pour un côté",
  step4: "Ajoutez 'tourner à droite de 90 degrés' pour l'angle du carré"
};

// 🔧 Code de référence pour validation précise (optionnel)
const REFERENCE_CODES_EXEMPLES = {
  // Pour lessonMovementBasique
  "mouvement-basique": `for (var count = 0; count < 3; count++) {
  moveSteps(10);
}
say('Bravo!');`,
  
  // Pour lessonMusique  
  "musique": `playNote('C', 0.5);
wait(1);
playNote('E', 0.5);`,
  
  // Pour lessonGeometrie
  "geometrie": `for (var count = 0; count < 4; count++) {
  moveSteps(100);
  turnRight(90);
}`
};

// 🧪 Fonction de test pour créer une leçon via API
const creerLessonTest = async (lessonData, lessonId = null) => {
  try {
    console.log(`🚀 Création de la leçon: ${lessonData.titre}`);
    
    // Simuler l'appel API (remplacez par votre vraie URL en test)
    const response = await fetch('/api/lessons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lessonData)
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Leçon créée avec succès:', result.data);
    
    return result.data;
  } catch (error) {
    console.error('❌ Erreur création leçon:', error);
    return null;
  }
};

// 📊 Fonction pour tester la validation d'une leçon
const testerValidationLesson = (lessonId, blockType, userCode = null) => {
  console.log(`\n🧪 Test validation - Leçon ${lessonId}, Bloc ${blockType}`);
  
  // Simuler un workspace avec des blocs
  const mockWorkspace = {
    getAllBlocks: () => {
      const blocks = [];
      
      // Toujours commencer par l'événement
      blocks.push({
        type: 'event_whenflagclicked',
        getNextBlock: () => blocks[1] || null
      });
      
      // Ajouter le bloc selon le type testé
      switch (blockType) {
        case 'motion_movesteps':
          blocks.push({
            type: 'motion_movesteps',
            getFieldValue: (field) => field === 'STEPS' ? '10' : null,
            getNextBlock: () => null
          });
          break;
          
        case 'control_repeat':
          blocks.push({
            type: 'control_repeat',
            getFieldValue: (field) => field === 'TIMES' ? '3' : null,
            getNextBlock: () => null
          });
          break;
          
        case 'looks_say':
          blocks.push({
            type: 'looks_say',
            getFieldValue: (field) => field === 'MESSAGE' ? 'Bravo!' : null,
            getNextBlock: () => null
          });
          break;
          
        case 'sound_play_note':
          blocks.push({
            type: 'sound_play_note',
            getFieldValue: (field) => {
              if (field === 'NOTE') return 'C';
              if (field === 'DURATION') return '0.5';
              return null;
            },
            getNextBlock: () => null
          });
          break;
      }
      
      return blocks;
    },
    
    getTopBlocks: function(ordered = false) {
      return [this.getAllBlocks()[0]];
    }
  };
  
  // Simuler Blockly.JavaScript.workspaceToCode si code fourni
  if (userCode && typeof Blockly !== 'undefined') {
    global.Blockly = global.Blockly || {};
    global.Blockly.JavaScript = global.Blockly.JavaScript || {};
    global.Blockly.JavaScript.workspaceToCode = () => userCode;
  }
  
  // Test de validation (remplacez par votre vraie fonction)
  const task = { lessonId, blockType };
  
  // Simuler la validation selon votre système
  const validation = simulerValidation(mockWorkspace, task);
  
  console.log('Résultat validation:', validation);
  return validation;
};

// 🔧 Simulation de validation (remplacez par votre vraie fonction)
const simulerValidation = (workspace, task) => {
  const allBlocks = workspace.getAllBlocks();
  const blockTypes = allBlocks.map(block => block.type);
  
  // Vérifier la présence du bloc requis
  if (!blockTypes.includes(task.blockType)) {
    return {
      isValid: false,
      message: `❌ Bloc ${task.blockType} manquant`,
      hint: `Ajoutez le bloc ${task.blockType}`
    };
  }
  
  // Vérifier la connexion avec l'événement
  const eventBlock = allBlocks.find(block => block.type === 'event_whenflagclicked');
  if (!eventBlock) {
    return {
      isValid: false,
      message: '❌ Bloc événement "quand drapeau cliqué" manquant',
      hint: 'Commencez par ajouter le bloc événement'
    };
  }
  
  return {
    isValid: true,
    message: `🎉 Parfait! Bloc ${task.blockType} correctement placé!`,
    hint: 'Excellent travail!',
    validationMethod: 'traditional_validation'
  };
};

// 📋 Scripts de test complets
console.log('📚 EXEMPLES DE REMPLISSAGE DE LEÇONS POUR TEST RÉEL');
console.log('=================================================\n');

// Test 1: Leçon Mouvement
console.log('🎯 EXEMPLE 1: Leçon Mouvement de Base');
console.log('=====================================');
console.log('Données à insérer:');
console.log(JSON.stringify(lessonMovementBasique, null, 2));

testerValidationLesson('mouvement-basique', 'motion_movesteps');
testerValidationLesson('mouvement-basique', 'control_repeat');

// Test 2: Leçon Musique  
console.log('\n🎵 EXEMPLE 2: Leçon Musique');
console.log('==========================');
console.log('Données à insérer:');
console.log(JSON.stringify(lessonMusique, null, 2));

testerValidationLesson('musique', 'sound_play_note');

// Test 3: Leçon Géométrie
console.log('\n📐 EXEMPLE 3: Leçon Géométrie');
console.log('=============================');
console.log('Données à insérer:');
console.log(JSON.stringify(lessonGeometrie, null, 2));

testerValidationLesson('geometrie', 'control_repeat');

// Guide d'utilisation
console.log('\n📝 GUIDE D\'UTILISATION:');
console.log('=======================');
console.log('1. Copiez une des leçons d\'exemple ci-dessus');
console.log('2. Utilisez votre interface admin pour créer la leçon');
console.log('3. Testez avec les blocs correspondants');
console.log('4. (Optionnel) Ajoutez le code de référence pour validation précise');

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    lessonMovementBasique,
    lessonMusique, 
    lessonGeometrie,
    REFERENCE_CODES_EXEMPLES,
    creerLessonTest,
    testerValidationLesson
  };
}
