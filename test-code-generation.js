/**
 * Test pour les utilitaires de génération de code
 */

import { 
  getWorkspaceSummary,
  validateWorkspaceForCodeGeneration 
} from '../src/lib/codeGeneration.js';

console.log('🧪 Test des utilitaires de génération de code');

// Mock d'un workspace Blockly
const mockWorkspace = {
  getAllBlocks: () => [
    { type: 'event_whenflagclicked' },
    { type: 'control_repeat' },
    { type: 'motion_movesteps' },
    { type: 'looks_say' }
  ],
  getTopBlocks: (ordered) => [
    { type: 'event_whenflagclicked' }
  ]
};

// Test getWorkspaceSummary
console.log('');
console.log('📊 Test getWorkspaceSummary');
const summary = getWorkspaceSummary(mockWorkspace);
console.log('Summary:', JSON.stringify(summary, null, 2));

// Test avec workspace null
console.log('');
console.log('❌ Test avec workspace null');
const nullSummary = getWorkspaceSummary(null);
console.log('Null summary:', nullSummary);

// Test validateWorkspaceForCodeGeneration sans Blockly
console.log('');
console.log('🔧 Test validateWorkspaceForCodeGeneration (sans Blockly)');
const validation = validateWorkspaceForCodeGeneration(mockWorkspace);
console.log('Validation result:', JSON.stringify(validation, null, 2));

console.log('');
console.log('🎉 Tests utilitaires terminés!');
