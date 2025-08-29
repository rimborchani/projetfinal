/**
 * Admin Interface pour la Validation Blockly
 * Permet de générer et gérer les codes de référence
 */

import React, { useState, useCallback } from 'react';
import { Button } from '../ui/Button';

const BlocklyValidationAdmin = () => {
  const [lessonId, setLessonId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Step 1: Admin's Role - Generate code from workspace
  const handleGenerateCode = useCallback(async () => {
    if (!lessonId.trim()) {
      alert('Veuillez saisir un ID de leçon');
      return;
    }

    setIsGenerating(true);
    try {
      // Import de la fonction de génération
      const { generateAndSaveCorrectCode } = await import('../../lib/blocklyValidation');
      
      // Générer le code depuis le workspace admin
      const result = generateAndSaveCorrectCode(lessonId, lessonTitle || `Leçon ${lessonId}`);
      
      setGeneratedCode(result.correctCode);
      alert('Code généré avec succès! Regardez la console pour copier le code vers REFERENCE_CODES.');
      
    } catch (error) {
      alert(`Erreur lors de la génération: ${error.message}`);
      console.error('Erreur génération code:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [lessonId, lessonTitle]);

  // Step 2: Test validation with current workspace
  const handleTestValidation = useCallback(async () => {
    if (!lessonId.trim()) {
      alert('Veuillez saisir un ID de leçon');
      return;
    }

    try {
      // Import des fonctions de validation
      const { validateLessonWithBlocklyCode } = await import('../../lib/blocklyValidation');
      
      // Valider avec le workspace actuel
      if (typeof Blockly === 'undefined' || !Blockly.getMainWorkspace) {
        throw new Error('Blockly non disponible');
      }

      const workspace = Blockly.getMainWorkspace();
      const result = validateLessonWithBlocklyCode(workspace, lessonId);
      
      setValidationResult(result);
      
    } catch (error) {
      alert(`Erreur lors de la validation: ${error.message}`);
      console.error('Erreur validation:', error);
    }
  }, [lessonId]);

  // Helper pour copier le code
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Code copié dans le presse-papiers!');
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🎯 Administration Validation Blockly
      </h2>

      {/* Section Configuration */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Configuration de la Leçon</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID Leçon (requis)
            </label>
            <input
              type="text"
              value={lessonId}
              onChange={(e) => setLessonId(e.target.value)}
              placeholder="Ex: 1, 2, lesson-motion..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre Leçon (optionnel)
            </label>
            <input
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              placeholder="Ex: Déplacement de base"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Section Génération */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-blue-700">
          Step 1: Génération du Code de Référence
        </h3>
        
        <div className="mb-4">
          <p className="text-sm text-blue-600 mb-4">
            1. Construisez la solution correcte avec les blocs Blockly<br/>
            2. Cliquez sur "Générer Code" pour extraire le code JavaScript<br/>
            3. Copiez le code affiché vers REFERENCE_CODES dans blocklyValidation.js
          </p>
          
          <Button 
            onClick={handleGenerateCode}
            disabled={!lessonId.trim() || isGenerating}
            className="mb-4"
          >
            {isGenerating ? '🔄 Génération...' : '🎯 Générer Code de Référence'}
          </Button>
        </div>

        {generatedCode && (
          <div className="bg-white rounded-md border border-blue-200 p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-700">Code Généré:</h4>
              <Button 
                onClick={() => copyToClipboard(generatedCode)}
                className="text-xs px-2 py-1"
              >
                📋 Copier
              </Button>
            </div>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto text-gray-800">
              <code>{generatedCode}</code>
            </pre>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-700 font-medium">
                📝 À ajouter dans REFERENCE_CODES:
              </p>
              <pre className="mt-2 text-xs bg-yellow-100 p-2 rounded overflow-x-auto">
                <code>{`${lessonId}: \`${generatedCode}\`,`}</code>
              </pre>
              <Button 
                onClick={() => copyToClipboard(`${lessonId}: \`${generatedCode}\`,`)}
                className="mt-2 text-xs px-2 py-1"
              >
                📋 Copier Format REFERENCE_CODES
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Section Test */}
      <div className="mb-8 p-4 bg-green-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-green-700">
          Step 2 & 3: Test de Validation
        </h3>
        
        <div className="mb-4">
          <p className="text-sm text-green-600 mb-4">
            Testez la validation en construisant une solution dans le workspace et en cliquant sur "Tester Validation"
          </p>
          
          <Button 
            onClick={handleTestValidation}
            disabled={!lessonId.trim()}
            className="mb-4"
          >
            🧪 Tester Validation
          </Button>
        </div>

        {validationResult && (
          <div className={`p-4 rounded-md border ${
            validationResult.isValid 
              ? 'bg-green-100 border-green-200' 
              : 'bg-red-100 border-red-200'
          }`}>
            <h4 className="font-medium mb-2">
              {validationResult.isValid ? '✅ Validation Réussie' : '❌ Validation Échouée'}
            </h4>
            
            <p className={`mb-3 ${
              validationResult.isValid ? 'text-green-700' : 'text-red-700'
            }`}>
              {validationResult.message}
            </p>
            
            {validationResult.userCode && (
              <details className="mt-4">
                <summary className="cursor-pointer font-medium text-sm text-gray-600">
                  🔍 Voir Code Utilisateur
                </summary>
                <pre className="mt-2 bg-white p-3 rounded text-xs overflow-x-auto border">
                  <code>{validationResult.userCode}</code>
                </pre>
              </details>
            )}
            
            {validationResult.referenceCode && (
              <details className="mt-4">
                <summary className="cursor-pointer font-medium text-sm text-gray-600">
                  🎯 Voir Code de Référence
                </summary>
                <pre className="mt-2 bg-white p-3 rounded text-xs overflow-x-auto border">
                  <code>{validationResult.referenceCode}</code>
                </pre>
              </details>
            )}
            
            <div className="mt-4 text-xs text-gray-500">
              Méthode: {validationResult.validationMethod}
            </div>
          </div>
        )}
      </div>

      {/* Section Instructions */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          📋 Instructions d'Utilisation
        </h3>
        
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">1</span>
            <div>
              <strong>Admin - Génération:</strong> Construisez la solution correcte avec les blocs, 
              puis générez le code de référence.
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">2</span>
            <div>
              <strong>Configuration:</strong> Ajoutez le code généré dans l'objet REFERENCE_CODES 
              du fichier blocklyValidation.js.
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">3</span>
            <div>
              <strong>Utilisateur - Validation:</strong> Les solutions des étudiants seront automatiquement 
              comparées au code de référence.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlocklyValidationAdmin;
