/**
 * Utility functions for Blockly code generation and management
 * This implements the code comparison validation method
 */

/**
 * Generates JavaScript code from the current Blockly workspace
 * This function should be called from the admin interface when saving a lesson
 * @param {Object} workspace - The Blockly workspace instance
 * @returns {string} Generated JavaScript code
 */
export const generateCorrectCodeFromWorkspace = (workspace) => {
  if (!workspace) {
    throw new Error('Workspace is required to generate code');
  }

  // Check if Blockly and JavaScript generator are available
  if (typeof Blockly === 'undefined' || !Blockly.JavaScript) {
    throw new Error('Blockly JavaScript generator is not available');
  }

  try {
    // Generate JavaScript code from the admin's workspace
    const correctCode = Blockly.JavaScript.workspaceToCode(workspace);
    
    return correctCode;
  } catch (error) {
    throw new Error(`Failed to generate code from workspace: ${error.message}`);
  }
};

/**
 * Generates JavaScript code from user's workspace during validation
 * @param {Object} workspace - The user's Blockly workspace instance
 * @returns {string} Generated JavaScript code
 */
export const generateUserCodeFromWorkspace = (workspace) => {
  if (!workspace) {
    throw new Error('User workspace is required');
  }

  if (typeof Blockly === 'undefined' || !Blockly.JavaScript) {
    throw new Error('Blockly JavaScript generator is not available');
  }

  try {
    // Generate JavaScript code from user's workspace
    const userCode = Blockly.JavaScript.workspaceToCode(workspace);
    
    return userCode;
  } catch (error) {
    throw new Error(`Failed to generate user code: ${error.message}`);
  }
};

/**
 * Saves lesson with correct code to database via API
 * @param {Object} lessonData - Lesson data including correct code
 * @returns {Promise} API response
 */
export const saveLessonWithCorrectCode = async (lessonData) => {
  try {
    const response = await fetch('/api/lessons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lessonData)
    });

    if (!response.ok) {
      throw new Error(`Failed to save lesson: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`API error when saving lesson: ${error.message}`);
  }
};

/**
 * Updates existing lesson with correct code
 * @param {string} lessonId - The lesson ID to update
 * @param {Object} updateData - Updated lesson data including correct code
 * @returns {Promise} API response
 */
export const updateLessonWithCorrectCode = async (lessonId, updateData) => {
  try {
    const response = await fetch(`/api/lessons/${lessonId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error(`Failed to update lesson: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`API error when updating lesson: ${error.message}`);
  }
};

/**
 * Validates that we can successfully generate code from workspace
 * @param {Object} workspace - Blockly workspace to validate
 * @returns {Object} Validation result with success status and generated code
 */
export const validateWorkspaceForCodeGeneration = (workspace) => {
  try {
    if (!workspace) {
      return {
        success: false,
        error: 'Workspace is null or undefined',
        code: null
      };
    }

    // Check if there are any blocks in the workspace
    const allBlocks = workspace.getAllBlocks();
    if (!allBlocks || allBlocks.length === 0) {
      return {
        success: false,
        error: 'No blocks found in workspace',
        code: null
      };
    }

    // Try to generate code
    const generatedCode = generateCorrectCodeFromWorkspace(workspace);
    
    return {
      success: true,
      error: null,
      code: generatedCode,
      blockCount: allBlocks.length
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      code: null
    };
  }
};

/**
 * Helper function to get workspace summary for debugging
 * @param {Object} workspace - Blockly workspace
 * @returns {Object} Workspace summary
 */
export const getWorkspaceSummary = (workspace) => {
  if (!workspace) {
    return { error: 'No workspace provided' };
  }

  try {
    const allBlocks = workspace.getAllBlocks();
    const topBlocks = workspace.getTopBlocks(true);
    
    const blockTypes = allBlocks.map(block => block.type);
    const blockCounts = blockTypes.reduce((counts, type) => {
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    }, {});

    return {
      totalBlocks: allBlocks.length,
      topBlocks: topBlocks.length,
      blockTypes: [...new Set(blockTypes)],
      blockCounts: blockCounts,
      hasEventBlocks: blockTypes.some(type => type.startsWith('event_')),
      hasMotionBlocks: blockTypes.some(type => type.startsWith('motion_')),
      hasSoundBlocks: blockTypes.some(type => type.startsWith('sound_')),
      hasControlBlocks: blockTypes.some(type => type.startsWith('control_')),
      hasLooksBlocks: blockTypes.some(type => type.startsWith('looks_')),
      hasChatBlocks: blockTypes.some(type => type.startsWith('chat_'))
    };
  } catch (error) {
    return { error: error.message };
  }
};
