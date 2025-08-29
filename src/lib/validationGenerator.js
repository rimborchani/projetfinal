// Générateur de validation automatique pour les leçons
// Fichier: src/lib/validationGenerator.js

/**
 * Templates de validation prêts à l'emploi
 */
export const VALIDATION_TEMPLATES = {
  mouvement_simple: (params = {}) => [
    {
      type: 'block_presence',
      blockType: 'event_whenflagclicked',
      errorMessage: "Ajouter l'événement 'quand drapeau cliqué'",
    },
    {
      type: 'block_field_value',
      blockType: 'motion_movesteps',
      fieldName: 'STEPS',
      expectedValue: params.steps || '10',
      successMessage: 'Parfait! Avancer de ' + (params.steps || 10) + ' pas!',
      errorMessage: 'Changer à ' + (params.steps || 10) + ' pas exactement',
    },
    {
      type: 'block_connection',
      sourceBlock: 'event_whenflagclicked',
      targetBlock: 'motion_movesteps',
      errorMessage: "Connecter le mouvement sous l'événement",
    },
  ],

  repetition: (params = {}) => [
    {
      type: 'block_presence',
      blockType: 'event_whenflagclicked',
      errorMessage: "Commencer par l'événement",
    },
    {
      type: 'block_field_value',
      blockType: 'control_repeat',
      fieldName: 'TIMES',
      expectedValue: params.times || '3',
      successMessage: 'Répéter ' + (params.times || 3) + ' fois!',
      errorMessage: 'Changer à répéter ' + (params.times || 3) + ' fois',
    },
    {
      type: 'block_field_value',
      blockType: params.action || 'motion_movesteps',
      fieldName: getFieldName(params.action || 'motion_movesteps'),
      expectedValue: params.actionValue || '10',
      errorMessage: 'Ajuster la valeur à ' + (params.actionValue || 10),
    },
  ],

  carre: (params = {}) => [
    {
      type: 'block_field_value',
      blockType: 'control_repeat',
      fieldName: 'TIMES',
      expectedValue: '4',
      successMessage: '4 répétitions pour un carré parfait!',
      errorMessage: 'Un carré = 4 côtés = répéter 4 fois',
    },
    {
      type: 'block_field_value',
      blockType: 'motion_movesteps',
      fieldName: 'STEPS',
      expectedValue: params.sideLength || '50',
      errorMessage: 'Chaque côté doit faire ' + (params.sideLength || 50) + ' pas',
    },
    {
      type: 'block_field_value',
      blockType: 'motion_turnright',
      fieldName: 'DEGREES',
      expectedValue: '90',
      errorMessage: 'Tourner de 90° pour un angle droit',
    },
  ],

  dialogue: (params = {}) => [
    {
      type: 'block_presence',
      blockType: 'event_whenflagclicked',
      errorMessage: "Commencer par l'événement",
    },
    {
      type: 'block_field_value',
      blockType: 'looks_say',
      fieldName: 'MESSAGE',
      expectedValue: params.message || 'Bonjour!',
      successMessage: 'Parfait! Le message "' + (params.message || 'Bonjour!') + '" s\'affichera!',
      errorMessage: 'Le sprite doit dire "' + (params.message || 'Bonjour!') + '" exactement',
    },
  ],

  son_et_mouvement: (params = {}) => [
    {
      type: 'block_presence',
      blockType: 'event_whenflagclicked',
      errorMessage: "Commencer par l'événement",
    },
    {
      type: 'block_presence',
      blockType: 'sound_play',
      errorMessage: 'Ajouter un son',
    },
    {
      type: 'block_field_value',
      blockType: 'motion_movesteps',
      fieldName: 'STEPS',
      expectedValue: params.steps || '30',
      errorMessage: 'Avancer de ' + (params.steps || 30) + ' pas',
    },
  ],
};

/**
 * Obtient le nom du champ selon le type de bloc
 */
export function getFieldName(blockType) {
  const fieldMap = {
    motion_movesteps: 'STEPS',
    motion_turnright: 'DEGREES',
    motion_turnleft: 'DEGREES',
    control_repeat: 'TIMES',
    control_wait: 'DURATION',
    looks_say: 'MESSAGE',
    looks_think: 'MESSAGE',
    sound_play_note: 'NOTE',
    chat_send_message: 'MESSAGE',
  };
  return fieldMap[blockType] || 'VALUE';
}

/**
 * Génère automatiquement les critères de validation
 */
export function generateValidation(template, parameters = {}) {
  if (VALIDATION_TEMPLATES[template]) {
    return VALIDATION_TEMPLATES[template](parameters);
  }
  return VALIDATION_TEMPLATES.mouvement_simple(parameters);
}

/**
 * Génère la validation à partir de réponses simples (assistant)
 */
export function generateFromAnswers(answers = {}) {
  const criteria = [];
  criteria.push({
    type: 'block_presence',
    blockType: 'event_whenflagclicked',
    errorMessage: "Ajouter l'événement 'quand drapeau cliqué'",
  });

  if (answers.hasMovement) {
    criteria.push({
      type: 'block_field_value',
      blockType: 'motion_movesteps',
      fieldName: 'STEPS',
      expectedValue: answers.steps || '10',
      errorMessage: 'Faire avancer de ' + (answers.steps || 10) + ' pas',
    });
  }

  if (answers.hasRotation) {
    criteria.push({
      type: 'block_field_value',
      blockType: 'motion_turnright',
      fieldName: 'DEGREES',
      expectedValue: answers.degrees || '90',
      errorMessage: 'Tourner de ' + (answers.degrees || 90) + ' degrés',
    });
  }

  if (answers.hasLoop) {
    criteria.unshift({
      type: 'block_field_value',
      blockType: 'control_repeat',
      fieldName: 'TIMES',
      expectedValue: answers.times || '3',
      errorMessage: 'Répéter ' + (answers.times || 3) + ' fois',
    });
  }

  if (answers.hasSpeech) {
    criteria.push({
      type: 'block_field_value',
      blockType: 'looks_say',
      fieldName: 'MESSAGE',
      expectedValue: answers.message || 'Bonjour!',
      errorMessage: 'Dire "' + (answers.message || 'Bonjour!') + '" exactement',
    });
  }

  if (answers.hasSound) {
    criteria.push({
      type: 'block_presence',
      blockType: 'sound_play',
      errorMessage: 'Ajouter un effet sonore',
    });
  }

  return criteria;
}

/**
 * Templates rapides pour l'UI (admin)
 */
export const QUICK_TEMPLATES = {
  'Mouvement simple': {
    template: 'mouvement_simple',
    description: "Le sprite avance d'un nombre de pas",
    fields: [{ name: 'steps', label: 'Nombre de pas', default: '10' }],
  },
  'Animation répétée': {
    template: 'repetition',
    description: 'Répéter une action plusieurs fois',
    fields: [
      { name: 'times', label: 'Nombre de répétitions', default: '3' },
      { name: 'steps', label: 'Pas à chaque fois', default: '20' },
    ],
  },
  'Carré parfait': {
    template: 'carre',
    description: 'Dessiner un carré avec Nexie',
    fields: [{ name: 'sideLength', label: 'Longueur du côté', default: '50' }],
  },
  'Sprite parlant': {
    template: 'dialogue',
    description: 'Le sprite dit un message',
    fields: [{ name: 'message', label: 'Message à dire', default: 'Salut!' }],
  },
  'Action avec son': {
    template: 'son_et_mouvement',
    description: 'Mouvement avec effet sonore',
    fields: [{ name: 'steps', label: 'Distance', default: '25' }],
  },
};

const ValidationGenerator = {
  VALIDATION_TEMPLATES,
  getFieldName,
  generateValidation,
  generateFromAnswers,
  QUICK_TEMPLATES,
};

export default ValidationGenerator;
