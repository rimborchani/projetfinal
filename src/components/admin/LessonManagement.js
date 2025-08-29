'use client';

import { useState, useEffect } from 'react';
import { LessonClient } from '../../lib/lessonClient';
import { 
  generateCorrectCodeFromWorkspace, 
  validateWorkspaceForCodeGeneration,
  getWorkspaceSummary 
} from '../../lib/codeGeneration';

export default function LessonManagement() {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingLesson, setEditingLesson] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [dataSource, setDataSource] = useState('unknown');
  
  // États pour la génération de code de référence
  const [showCodeGenerator, setShowCodeGenerator] = useState(false);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [workspaceSummary, setWorkspaceSummary] = useState(null);
  const [selectedLessonForCode, setSelectedLessonForCode] = useState(null);
  
  const [formData, setFormData] = useState({
    titre: '',
    concept: '',
    preview: '',
    step1: '',
    step2: '',
    step3: '',
    step4: '',
    correctCode: '' // Nouveau champ pour le code de référence
  });

  // États pour les validations
  const [validationSteps, setValidationSteps] = useState([
    { id: 1, instruction: '', blockType: '', category: '', hint: '' },
    { id: 2, instruction: '', blockType: '', category: '', hint: '' },
    { id: 3, instruction: '', blockType: '', category: '', hint: '' },
    { id: 4, instruction: '', blockType: '', category: '', hint: '' }
  ]);

  // Types de blocs disponibles pour validation
  const availableBlockTypes = [
    { value: 'event_whenflagclicked', label: 'Quand drapeau cliqué', category: 'Events' },
    { value: 'motion_movesteps', label: 'Avancer de X pas', category: 'Motion' },
    { value: 'motion_goto', label: 'Aller à position', category: 'Motion' },
    { value: 'motion_glide', label: 'Glisser vers position', category: 'Motion' },
    { value: 'motion_turnright', label: 'Tourner à droite', category: 'Motion' },
    { value: 'motion_turnleft', label: 'Tourner à gauche', category: 'Motion' },
    { value: 'sound_play', label: 'Jouer son', category: 'Sound' },
    { value: 'sound_play_note', label: 'Jouer note', category: 'Sound' },
    { value: 'control_wait', label: 'Attendre', category: 'Control' },
    { value: 'control_repeat', label: 'Répéter', category: 'Control' },
    { value: 'looks_say', label: 'Dire', category: 'Looks' },
    { value: 'chat_set_username', label: 'Définir nom utilisateur', category: 'Chat' },
    { value: 'chat_send_message', label: 'Envoyer message', category: 'Chat' },
    { value: 'complete', label: 'Étape finale (exécution)', category: 'Complete' }
  ];

  // Charger les leçons
  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/lessons');
      const result = await response.json();
      
      if (result.success) {
        setLessons(result.data);
        setDataSource(result.source || 'unknown');
      } else {
        console.error('Erreur API:', result.error);
        setLessons([]);
        setDataSource('error');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des leçons:', error);
      setLessons([]);
      setDataSource('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Nouvelle fonction : Générer le code de référence depuis Blockly
  const generateCorrectCode = async (lessonId = null) => {
    try {
      setGeneratingCode(true);
      setGeneratedCode('');
      setWorkspaceSummary(null);

      // Vérifier que Blockly est disponible
      if (typeof window === 'undefined' || typeof Blockly === 'undefined') {
        alert('Blockly n\'est pas disponible. Assurez-vous d\'être sur une page avec Blockly.');
        return;
      }

      // Obtenir l'espace de travail Blockly actuel
      const workspace = Blockly.getMainWorkspace();
      
      // Valider l'espace de travail
      const validation = validateWorkspaceForCodeGeneration(workspace);
      
      if (!validation.success) {
        alert(`Erreur de validation: ${validation.error}`);
        return;
      }

      // Générer le code
      const correctCode = generateCorrectCodeFromWorkspace(workspace);
      setGeneratedCode(correctCode);
      
      // Obtenir un résumé de l'espace de travail pour l'affichage
      const summary = getWorkspaceSummary(workspace);
      setWorkspaceSummary(summary);

      // Si un lesson ID est fourni, mettre à jour automatiquement
      if (lessonId) {
        await updateLessonCorrectCode(lessonId, correctCode);
      }

    } catch (error) {
      console.error('Erreur lors de la génération du code:', error);
      alert(`Erreur: ${error.message}`);
    } finally {
      setGeneratingCode(false);
    }
  };

  // Fonction pour sauvegarder le code de référence
  const updateLessonCorrectCode = async (lessonId, correctCode) => {
    try {
      const response = await fetch(`/api/lessons/${lessonId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correctCode: correctCode
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du code');
      }

      const result = await response.json();
      
      if (result.success) {
        alert('Code de référence sauvegardé avec succès !');
        await loadLessons(); // Recharger la liste
      } else {
        throw new Error(result.error || 'Erreur inconnue');
      }

    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  // Fonction pour ouvrir le générateur de code pour une leçon spécifique
  const openCodeGeneratorForLesson = (lesson) => {
    setSelectedLessonForCode(lesson);
    setShowCodeGenerator(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const lessonData = {
        titre: formData.titre,
        concept: formData.concept,
        preview: formData.preview,
        step1: formData.step1,
        step2: formData.step2,
        step3: formData.step3,
        step4: formData.step4,
        correctCode: formData.correctCode || ''
      };

      if (editingLesson) {
        // Mise à jour
        const response = await fetch(`/api/lessons/${editingLesson.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lessonData)
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour');
        }

        setEditingLesson(null);
      } else {
        // Création
        const response = await fetch('/api/lessons', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(lessonData)
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la création');
        }

        setShowAddForm(false);
      }
      
      // Réinitialiser le formulaire
      setFormData({
        titre: '',
        concept: '',
        preview: '',
        step1: '',
        step2: '',
        step3: '',
        step4: '',
        correctCode: ''
      });
      
      // Recharger les leçons
      await loadLessons();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde de la leçon');
    }
  };

  const handleEdit = (lesson) => {
    setEditingLesson(lesson);
  // Supporte les deux formats: DB brut (titre/step1..4) et format UI (title/concept/preview/tasks)
  const titre = lesson.titre ?? lesson.title ?? '';
  const concept = lesson.concept ?? '';
  const preview = lesson.preview ?? '';
  const step1 = lesson.step1 ?? lesson.tasks?.[0]?.instruction ?? '';
  const step2 = lesson.step2 ?? lesson.tasks?.[1]?.instruction ?? '';
  const step3 = lesson.step3 ?? lesson.tasks?.[2]?.instruction ?? '';
  const step4 = lesson.step4 ?? lesson.tasks?.[3]?.instruction ?? '';
  const correctCode = lesson.correctCode ?? '';
  
  setFormData({ titre, concept, preview, step1, step2, step3, step4, correctCode });
    setShowAddForm(true);
  };

  const handleDelete = async (lessonId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette leçon ?')) {
      try {
        await LessonClient.deleteLesson(lessonId);
        await loadLessons();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de la leçon');
      }
    }
  };

  const cancelEdit = () => {
    setEditingLesson(null);
    setShowAddForm(false);
    setShowCodeGenerator(false);
    setSelectedLessonForCode(null);
    setGeneratedCode('');
    setWorkspaceSummary(null);
    setFormData({
      titre: '',
  concept: '',
  preview: '',
      step1: '',
      step2: '',
      step3: '',
  step4: '',
  correctCode: ''
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Leçons</h1>
            <div className="flex items-center space-x-4 mt-2">
              <p className="text-gray-600">Gérez les leçons de votre plateforme d&apos;apprentissage</p>
              
              {/* Indicateur de source de données */}
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                dataSource === 'database' ? 'bg-green-100 text-green-800' :
                dataSource === 'memory' ? 'bg-yellow-100 text-yellow-800' :
                dataSource === 'error' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {dataSource === 'database' && '🗄️ Base de données'}
                {dataSource === 'memory' && '💾 Stockage temporaire'}
                {dataSource === 'error' && '❌ Erreur de chargement'}
                {dataSource === 'unknown' && '❓ Source inconnue'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {showAddForm ? 'Annuler' : 'Nouvelle Leçon'}
          </button>
        </div>
      </div>

      {/* Avertissement pour stockage temporaire */}
      {dataSource === 'memory' && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Stockage Temporaire Actif
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Vos leçons sont stockées temporairement en mémoire. Elles seront perdues au redémarrage du serveur.
                  Pour un stockage permanent, configurez votre base de données Neon dans le fichier .env.local.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulaire d'ajout/modification */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingLesson ? 'Modifier la Leçon' : 'Nouvelle Leçon'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre de la leçon
              </label>
              <input
                type="text"
                value={formData.titre}
                onChange={(e) => setFormData({...formData, titre: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Ex: Introduction à la programmation"
              />
            </div>

            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Concept (résumé de la leçon)
                </label>
                <textarea
                  value={formData.concept}
                  onChange={(e) => setFormData({...formData, concept: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                  placeholder="Expliquez l'objectif et le concept de la leçon..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preview (courte description)
                </label>
                <textarea
                  value={formData.preview}
                  onChange={(e) => setFormData({...formData, preview: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                  placeholder="Texte d&apos;aperçu affiché en en-tête"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Étape 1
                </label>
                <textarea
                  value={formData.step1}
                  onChange={(e) => setFormData({...formData, step1: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                  placeholder="Description de la première étape..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Étape 2
                </label>
                <textarea
                  value={formData.step2}
                  onChange={(e) => setFormData({...formData, step2: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                  placeholder="Description de la deuxième étape..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Étape 3
                </label>
                <textarea
                  value={formData.step3}
                  onChange={(e) => setFormData({...formData, step3: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                  placeholder="Description de la troisième étape..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Étape 4
                </label>
                <textarea
                  value={formData.step4}
                  onChange={(e) => setFormData({...formData, step4: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                  placeholder="Description de la quatrième étape..."
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {editingLesson ? 'Mettre à jour' : 'Créer la leçon'}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Annuler
              </button>
              
              {/* Nouveau bouton pour générer le code de référence */}
              <button
                type="button"
                onClick={() => setShowCodeGenerator(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <span>🔧</span>
                <span>Générer Code de Référence</span>
              </button>
            </div>

            {/* Section Code de Référence */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                <span>🎯</span>
                <span>Code de Référence (pour validation automatique)</span>
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code JavaScript généré
                </label>
                <textarea
                  value={formData.correctCode}
                  onChange={(e) => setFormData({...formData, correctCode: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  rows={6}
                  placeholder="Le code JavaScript sera généré automatiquement depuis vos blocs Blockly..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  Ce code sera utilisé pour valider automatiquement les solutions des étudiants. 
                  Utilisez le bouton &quot;Générer Code de Référence&quot; pour le créer depuis vos blocs Blockly.
                </p>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Générateur de Code de Référence */}
      {showCodeGenerator && (
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2 text-purple-800">
            <span>🔧</span>
            <span>Générateur de Code de Référence</span>
          </h2>
          
          <div className="bg-white rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-800 mb-2">Instructions :</h3>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>Allez sur une page contenant un workspace Blockly (ex: /lab/1)</li>
              <li>Construisez la solution correcte avec les blocs</li>
              <li>Revenez ici et cliquez sur &quot;Générer depuis Blockly&quot;</li>
              <li>Le code JavaScript sera généré et peut être sauvegardé</li>
            </ol>
          </div>

          <div className="space-y-4">
            {selectedLessonForCode && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Leçon sélectionnée :</strong> {selectedLessonForCode.titre}
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => generateCorrectCode(selectedLessonForCode?.id)}
                disabled={generatingCode}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {generatingCode ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Génération...</span>
                  </>
                ) : (
                  <>
                    <span>⚡</span>
                    <span>Générer depuis Blockly</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => setShowCodeGenerator(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Fermer
              </button>
            </div>

            {/* Résultats de la génération */}
            {workspaceSummary && (
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">Résumé de l&apos;espace de travail :</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Blocs totaux :</span> {workspaceSummary.totalBlocks}
                  </div>
                  <div>
                    <span className="font-medium">Blocs principaux :</span> {workspaceSummary.topBlocks}
                  </div>
                  <div>
                    <span className="font-medium">Événements :</span> {workspaceSummary.hasEventBlocks ? '✅' : '❌'}
                  </div>
                  <div>
                    <span className="font-medium">Mouvement :</span> {workspaceSummary.hasMotionBlocks ? '✅' : '❌'}
                  </div>
                </div>
              </div>
            )}

            {generatedCode && (
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">Code généré :</h4>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">
                  <code>{generatedCode}</code>
                </pre>
                
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={() => setFormData({...formData, correctCode: generatedCode})}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    📋 Copier dans le formulaire
                  </button>
                  
                  {selectedLessonForCode && (
                    <button
                      onClick={() => updateLessonCorrectCode(selectedLessonForCode.id, generatedCode)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      💾 Sauvegarder directement
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Liste des leçons */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Leçons Existantes ({lessons.length})
          </h2>
        </div>

        {lessons.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-medium mb-2">Aucune leçon</h3>
            <p>Commencez par créer votre première leçon.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {lesson.titre ?? lesson.title}
                    </h3>
                    { (lesson.concept || lesson.preview) && (
                      <p className="text-sm text-gray-600 mb-2">{lesson.concept || lesson.preview}</p>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Étape 1:</h4>
                        <p className="text-sm text-gray-600">{lesson.step1 ?? lesson.tasks?.[0]?.instruction}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Étape 2:</h4>
                        <p className="text-sm text-gray-600">{lesson.step2 ?? lesson.tasks?.[1]?.instruction}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Étape 3:</h4>
                        <p className="text-sm text-gray-600">{lesson.step3 ?? lesson.tasks?.[2]?.instruction}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Étape 4:</h4>
                        <p className="text-sm text-gray-600">{lesson.step4 ?? lesson.tasks?.[3]?.instruction}</p>
                      </div>
                    </div>

                    {lesson.created_at && (
                      <div className="text-xs text-gray-500">
                        Créé le: {new Date(lesson.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    )}

                    {/* Informations sur le code de référence */}
                    <div className="mt-2 p-2 bg-gray-50 rounded">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-gray-600">Code de référence :</span>
                          {lesson.correctCode && lesson.correctCode.trim() !== '' ? (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              ✅ Configuré ({lesson.correctCode.length} caractères)
                            </span>
                          ) : (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              ⚠️ Non configuré
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => openCodeGeneratorForLesson(lesson)}
                          className="text-xs bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded transition-colors"
                        >
                          🔧 Gérer Code
                        </button>
                      </div>
                      
                      {lesson.correctCode && lesson.correctCode.trim() !== '' && (
                        <details className="mt-2">
                          <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                            Voir le code de référence
                          </summary>
                          <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-20">
                            <code>{lesson.correctCode}</code>
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(lesson)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(lesson.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
