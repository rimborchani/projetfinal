# Blockly Integration Documentation

## 🧩 Overview

The NextGenCoding Interactive Lab uses Google Blockly as its visual programming environment. This document covers the integration architecture, custom blocks, workspace configuration, and execution engine.

## 🏗️ Integration Architecture

### Core Components
- **BlocklyWorkspace**: React component wrapping Blockly editor
- **CustomBlocks**: Educational block definitions
- **Execution Engine**: Interprets blocks as sprite actions
- **Validation System**: Checks block arrangements

### File Structure
```
src/components/blockly/
├── BlocklyWorkspace.js       # Main workspace component
├── BlocklyWorkspaceFixed.js  # Alternative fixed-size workspace
├── CustomBlocks.js           # Custom block definitions
├── CodeGenerator.js          # Block-to-code translation
└── blockly-custom.css        # Visual customizations
```

## 🔧 Workspace Configuration

### Basic Setup
```javascript
// src/components/blockly/BlocklyWorkspace.js
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';

const workspace = Blockly.inject(blocklyDiv.current, {
  toolbox: toolboxConfig,
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3
  },
  trashcan: true,
  sounds: false,
  rtl: false // Set to true for Arabic layout
});
```

### Toolbox Configuration
```javascript
const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'أحداث', // Events in Arabic
      colour: '210',
      contents: [
        { kind: 'block', type: 'event_whenflagclicked' }
      ]
    },
    {
      kind: 'category',
      name: 'حركة', // Motion in Arabic
      colour: '260', 
      contents: [
        {
          kind: 'block',
          type: 'motion_movesteps',
          fields: { STEPS: 10 }
        },
        { kind: 'block', type: 'motion_turnright' },
        { kind: 'block', type: 'motion_turnleft' }
      ]
    },
    {
      kind: 'category',
      name: 'مظهر', // Looks in Arabic
      colour: '330',
      contents: [
        {
          kind: 'block',
          type: 'looks_say',
          fields: { MESSAGE: 'مرحبا!' }
        }
      ]
    },
    {
      kind: 'category',
      name: 'تحكم', // Control in Arabic
      colour: '120',
      contents: [
        {
          kind: 'block',
          type: 'control_repeat',
          fields: { TIMES: 10 }
        }
      ]
    }
  ]
};
```

### Lesson-Specific Toolbox
```javascript
// Dynamic toolbox based on lesson requirements
const createLessonToolbox = (lesson) => {
  const availableCategories = lesson.toolboxCategories;
  const allCategories = {
    'Events': { name: 'أحداث', colour: '210', blocks: [...] },
    'Motion': { name: 'حركة', colour: '260', blocks: [...] },
    'Looks': { name: 'مظهر', colour: '330', blocks: [...] },
    'Control': { name: 'تحكم', colour: '120', blocks: [...] }
  };

  return {
    kind: 'categoryToolbox',
    contents: availableCategories.map(cat => allCategories[cat])
  };
};
```

## 🎨 Custom Block Definitions

### Event Blocks
```javascript
// When Green Flag Clicked
Blockly.Blocks['event_whenflagclicked'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("عند النقر على العلم الأخضر"); // Arabic text
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("يبدأ تشغيل البرنامج عند النقر على العلم الأخضر");
  }
};

// JavaScript generation
javascriptGenerator['event_whenflagclicked'] = function(block) {
  return '// Program starts here\n';
};
```

### Motion Blocks
```javascript
// Move Steps
Blockly.Blocks['motion_movesteps'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("تحرك") // Move
        .appendField(new Blockly.FieldNumber(10, 1), "STEPS")
        .appendField("خطوات"); // steps
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip("يحرك الشخصية عدد من الخطوات للأمام");
  }
};

javascriptGenerator['motion_movesteps'] = function(block) {
  const steps = block.getFieldValue('STEPS');
  return `moveSteps(${steps});\n`;
};

// Turn Right
Blockly.Blocks['motion_turnright'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("استدر يمين")
        .appendField(new Blockly.FieldNumber(90, 1, 360), "DEGREES")
        .appendField("درجة");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
  }
};
```

### Control Blocks
```javascript
// Repeat Loop
Blockly.Blocks['control_repeat'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("كرر")
        .appendField(new Blockly.FieldNumber(10, 1), "TIMES")
        .appendField("مرات");
    this.appendStatementInput("DO")
        .appendField("فعل");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  }
};

javascriptGenerator['control_repeat'] = function(block) {
  const times = block.getFieldValue('TIMES');
  const statements = javascriptGenerator.statementToCode(block, 'DO');
  return `for (let i = 0; i < ${times}; i++) {\n${statements}}\n`;
};
```

### Looks Blocks
```javascript
// Say Block
Blockly.Blocks['looks_say'] = {
  init: function() {
    this.appendValueInput("MESSAGE")
        .setCheck("String")
        .appendField("قل");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
  }
};

// Alternative: Say with text field
Blockly.Blocks['looks_say_simple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("قل")
        .appendField(new Blockly.FieldTextInput("مرحبا!"), "MESSAGE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
  }
};
```

## ⚡ Execution Engine

### Block Interpretation
```javascript
// src/components/panels/PlaygroundPanel.js
const executeCode = (workspace) => {
  const topBlocks = workspace.getTopBlocks(true);
  
  // Find entry point (usually event block)
  const flagBlock = topBlocks.find(block => 
    block.type === 'event_whenflagclicked'
  );
  
  if (flagBlock) {
    executeBlockSequence(flagBlock.getNextBlock());
  }
};

const executeBlockSequence = async (block) => {
  if (!block) return;

  // Execute current block
  await executeBlock(block);
  
  // Continue to next block
  if (block.getNextBlock()) {
    await executeBlockSequence(block.getNextBlock());
  }
};

const executeBlock = async (block) => {
  switch (block.type) {
    case 'motion_movesteps':
      const steps = parseInt(block.getFieldValue('STEPS')) || 10;
      await animateMovement(steps);
      break;
      
    case 'motion_turnright':
      const degrees = parseInt(block.getFieldValue('DEGREES')) || 90;
      await animateRotation(degrees);
      break;
      
    case 'control_repeat':
      const times = parseInt(block.getFieldValue('TIMES')) || 10;
      const innerBlock = block.getInputTargetBlock('DO');
      for (let i = 0; i < times; i++) {
        await executeBlockSequence(innerBlock);
      }
      break;
      
    case 'looks_say':
      const message = block.getFieldValue('MESSAGE') || 'مرحبا!';
      showSpeechBubble(message);
      break;
  }
};
```

### Animation Functions
```javascript
const animateMovement = (steps) => {
  return new Promise(resolve => {
    const pixelsPerStep = 10;
    const totalDistance = steps * pixelsPerStep;
    
    setSpritePosition(prev => ({
      x: prev.x + totalDistance,
      y: prev.y
    }));
    
    // Wait for CSS transition
    setTimeout(resolve, 300);
  });
};

const animateRotation = (degrees) => {
  return new Promise(resolve => {
    setSpriteRotation(prev => prev + degrees);
    setTimeout(resolve, 300);
  });
};

const showSpeechBubble = (message) => {
  setSpeechBubble(message);
  setTimeout(() => setSpeechBubble(''), 2000);
};
```

## 🔍 Validation System

### Block Structure Validation
```javascript
// src/lib/validation.js
export const validateBlockStructure = (workspace, expectedStructure) => {
  const topBlocks = workspace.getTopBlocks(true);
  
  // Find the main script
  const mainScript = topBlocks.find(block => 
    block.type === expectedStructure.type
  );
  
  if (!mainScript) {
    return {
      isValid: false,
      message: `Missing ${expectedStructure.type} block`
    };
  }
  
  return validateBlockChain(mainScript, expectedStructure);
};

const validateBlockChain = (block, expected) => {
  // Check block type
  if (block.type !== expected.type) {
    return {
      isValid: false,
      message: `Expected ${expected.type}, found ${block.type}`
    };
  }
  
  // Check field values
  if (expected.fields) {
    for (const [field, value] of Object.entries(expected.fields)) {
      const blockValue = block.getFieldValue(field);
      if (blockValue != value) {
        return {
          isValid: false,
          message: `Field ${field} should be ${value}`
        };
      }
    }
  }
  
  // Check next block
  if (expected.next) {
    const nextBlock = block.getNextBlock();
    if (!nextBlock) {
      return {
        isValid: false,
        message: `Missing next block: ${expected.next.type}`
      };
    }
    return validateBlockChain(nextBlock, expected.next);
  }
  
  return { isValid: true, message: 'Perfect!' };
};
```

### Task-Specific Validation
```javascript
export const validateTaskCompletion = (workspace, task) => {
  const topBlocks = workspace.getTopBlocks(true);
  
  switch (task.blockType) {
    case 'event_whenflagclicked':
      return validateEventBlock(topBlocks);
      
    case 'motion_movesteps':
      return validateMotionSequence(topBlocks);
      
    case 'control_repeat':
      return validateLoopStructure(topBlocks);
      
    case 'complete':
      return validateCompleteProgram(topBlocks, task);
      
    default:
      return { isValid: true, message: 'Task completed!' };
  }
};
```

## 🎨 Visual Customization

### CSS Overrides
```css
/* src/styles/blockly-custom.css */

/* Workspace background */
.blocklyMainBackground {
  fill: #f8fafc !important;
}

/* Grid lines */
.blocklyGridPattern line {
  stroke: #e2e8f0 !important;
}

/* Block shadows */
.blocklyBlockCanvas .blocklyDraggable {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* Category colors */
.blocklyTreeLabel {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
}

/* Arabic text support */
.blocklyText {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-anchor: middle;
}

/* Highlight connected blocks */
.blocklyHighlighted {
  stroke: #2563eb !important;
  stroke-width: 3px !important;
}
```

### Theme Configuration
```javascript
const theme = Blockly.Theme.defineTheme('educational', {
  'base': Blockly.Themes.Classic,
  'blockStyles': {
    'event_blocks': {
      'colourPrimary': '#FFD700',
      'colourSecondary': '#FFC000',
      'colourTertiary': '#CC9900'
    },
    'motion_blocks': {
      'colourPrimary': '#4A90E2',
      'colourSecondary': '#357ABD',
      'colourTertiary': '#2C5F8F'
    }
  },
  'categoryStyles': {
    'event_category': {
      'colour': '#FFD700'
    },
    'motion_category': {
      'colour': '#4A90E2'
    }
  }
});
```

## 🔧 Advanced Features

### Workspace Serialization
```javascript
// Save workspace state
const saveWorkspace = () => {
  const xml = Blockly.Xml.workspaceToDom(workspace.current);
  const xmlText = Blockly.Xml.domToText(xml);
  localStorage.setItem('blockly_workspace', xmlText);
};

// Load workspace state
const loadWorkspace = () => {
  const xmlText = localStorage.getItem('blockly_workspace');
  if (xmlText) {
    const xml = Blockly.Xml.textToDom(xmlText);
    Blockly.Xml.domToWorkspace(xml, workspace.current);
  }
};
```

### Custom Context Menu
```javascript
Blockly.ContextMenuRegistry.registry.register({
  displayText: 'Explain This Block',
  preconditionFn: (scope) => {
    return scope.block ? 'enabled' : 'hidden';
  },
  callback: (scope) => {
    const block = scope.block;
    showBlockExplanation(block.type);
  },
  scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
  id: 'explain_block'
});
```

### Performance Optimization
```javascript
// Disable unnecessary features for education
const workspaceConfig = {
  toolbox: toolboxConfig,
  collapse: false,
  comments: false,
  disable: false,
  maxBlocks: Infinity,
  oneBasedIndex: true,
  readOnly: false,
  scrollbars: true,
  sounds: false,
  theme: educationalTheme,
  zoom: {
    controls: true,
    wheel: false, // Disable mouse wheel zoom
    maxScale: 2,
    minScale: 0.5
  }
};
```

This Blockly integration provides a robust foundation for visual programming education while maintaining flexibility for future enhancements.
