# Development Guide

## 🚀 Getting Started

This guide will help you set up the NextGenCoding Interactive Lab development environment and understand the development workflow.

## 📋 Prerequisites

- **Node.js**: Version 18.0 or later
- **npm**: Version 8.0 or later (comes with Node.js)
- **Git**: For version control
- **VS Code**: Recommended editor with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd nextgencoding-lab
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint for code quality

# Additional commands
npm run lint:fix     # Auto-fix linting issues
npm run type-check   # TypeScript type checking (if added)
```

## 🏗️ Development Workflow

### 1. Feature Development
1. **Create Feature Branch**: `git checkout -b feature/new-lesson-system`
2. **Develop**: Make changes following coding standards
3. **Test**: Verify functionality across different lessons
4. **Commit**: Use descriptive commit messages
5. **Pull Request**: Submit for review

### 2. Lesson Development
1. **Plan Lesson**: Define learning objectives and task sequence
2. **Create Configuration**: Add lesson to `src/lib/lessons.js`
3. **Add Blocks**: Create any new custom blocks needed
4. **Implement Validation**: Add validation logic for tasks
5. **Test Flow**: Verify complete lesson progression

### 3. Component Development
1. **Create Component**: Follow naming conventions
2. **Add Documentation**: Include JSDoc comments
3. **Style with Tailwind**: Use utility classes consistently
4. **Test Integration**: Verify component works in context

## 📁 Project Structure Deep Dive

```
src/
├── app/                     # Next.js App Router
│   ├── page.js             # Home page (main entry)
│   ├── layout.js           # Root layout
│   ├── globals.css         # Global styles
│   └── lesson/             # Future: individual lesson routes
├── components/             # React components
│   ├── InteractiveLab.js   # Main app container
│   ├── blockly/            # Blockly integration
│   │   ├── BlocklyWorkspace.js
│   │   ├── CustomBlocks.js
│   │   └── blockly-custom.css
│   ├── panels/             # Split-panel components
│   │   ├── GuidePanel.js
│   │   └── PlaygroundPanel.js
│   ├── stage/              # Animation components
│   │   ├── Stage.js
│   │   └── Controls.js
│   └── ui/                 # Reusable UI components
│       ├── Button.js
│       └── ThemeToggle.js
├── contexts/               # React contexts
│   └── ThemeContext.js
├── lib/                    # Business logic
│   ├── lessons.js          # Lesson configurations
│   ├── validation.js       # Task validation logic
│   └── blockly-config.js   # Blockly setup utilities
└── styles/                 # Additional styles
    └── blockly-custom.css  # Blockly theme overrides
```

## 🎨 Styling Guidelines

### Tailwind CSS Usage
```javascript
// Use semantic class combinations
<div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto">

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Interactive states
<button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300">
```

### Component Styling Patterns
```javascript
// Container components
const containerClasses = "flex h-full";

// Panel components  
const panelClasses = "w-1/2 bg-white border-r border-gray-200 overflow-y-auto";

// Interactive elements
const buttonClasses = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600";
```

## 📚 Adding New Lessons

### 1. Lesson Configuration Structure
```javascript
// src/lib/lessons.js
export const lessons = [
  {
    id: 3, // Next available ID
    title: "Your Lesson Title",
    concept: "Brief description of what students will learn",
    tasks: [
      {
        id: 1,
        instruction: "Step-by-step instruction for student",
        blockType: "expected_block_type", // For validation
        category: "Events", // Blockly category
        blockImage: "/blocks/block-image.png", // Visual reference
        hint: "Helpful hint if student gets stuck"
      }
      // ... more tasks
    ],
    toolboxCategories: ["Events", "Motion", "Control"], // Available blocks
    sprite: {
      name: "Character Name",
      image: "/sprites/character.png",
      startPosition: { x: 0, y: 0 }
    },
    expectedBlocks: [
      // Expected block structure for validation
      {
        type: "event_whenflagclicked",
        next: {
          type: "motion_movesteps",
          fields: { STEPS: 10 }
        }
      }
    ]
  }
];
```

### 2. Validation Logic
```javascript
// src/lib/validation.js
export const validateTaskCompletion = (workspace, task) => {
  const topBlocks = workspace.getTopBlocks(true);
  
  // Custom validation logic based on task.blockType
  switch (task.blockType) {
    case 'motion_movesteps':
      return validateMotionBlock(topBlocks);
    case 'control_repeat':
      return validateRepeatBlock(topBlocks);
    default:
      return { isValid: true, message: 'Task completed!' };
  }
};
```

## 🧩 Creating Custom Blocks

### 1. Block Definition
```javascript
// src/components/blockly/CustomBlocks.js
Blockly.Blocks['your_custom_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Your Block Text")
        .appendField(new Blockly.FieldNumber(10), "VALUE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160); // Block color
    this.setTooltip("Helpful tooltip");
  }
};
```

### 2. Code Generation
```javascript
// JavaScript code generation
javascriptGenerator['your_custom_block'] = function(block) {
  const value = block.getFieldValue('VALUE');
  const code = `yourCustomFunction(${value});\n`;
  return code;
};
```

### 3. Execution Logic
```javascript
// src/components/panels/PlaygroundPanel.js
const executeBlockSequence = (block) => {
  switch (block.type) {
    case 'your_custom_block':
      const value = block.getFieldValue('VALUE');
      yourCustomBehavior(value);
      break;
    // ... other blocks
  }
  
  // Continue to next block
  if (block.getNextBlock()) {
    executeBlockSequence(block.getNextBlock());
  }
};
```

## 🔧 Development Tools

### ESLint Configuration
```javascript
// eslint.config.mjs
export default [
  {
    rules: {
      'react/prop-types': 'off', // Disable if not using TypeScript
      'no-unused-vars': 'warn',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];
```

### VS Code Settings
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

## 🐛 Debugging

### Common Issues

#### Blockly Workspace Not Loading
```javascript
// Check if blocklyDiv.current exists before initializing
useEffect(() => {
  if (blocklyDiv.current && !workspace.current) {
    // Initialize workspace
  }
}, []);
```

#### State Not Updating
```javascript
// Ensure state updates are handled correctly
const handleTaskComplete = (taskId) => {
  setCompletedTasks(prev => 
    prev.includes(taskId) ? prev : [...prev, taskId]
  );
};
```

#### CSS Styles Not Applying
```javascript
// Check Tailwind class names
<div className="w-1/2 bg-white"> {/* Correct */}
<div className="width-50 background-white"> {/* Incorrect */}
```

### Browser Developer Tools
- **Console**: Check for JavaScript errors
- **Network**: Verify asset loading
- **Elements**: Inspect component structure and styles
- **React DevTools**: Examine component state and props

## 🧪 Testing

### Manual Testing Checklist
- [ ] Lesson loads correctly
- [ ] Tasks progress in sequence
- [ ] Block validation works
- [ ] Code execution animates sprite
- [ ] Error states display helpful messages
- [ ] Responsive design works on different screen sizes

### Future: Automated Testing
```javascript
// Example test structure
describe('GuidePanel', () => {
  test('validates task completion correctly', () => {
    // Test validation logic
  });
  
  test('advances to next task on completion', () => {
    // Test progression logic
  });
});
```

## 📈 Performance Optimization

### React Optimization
```javascript
// Memoize expensive calculations
const isTaskCompleted = useMemo(() => 
  completedTasks.includes(currentTask.id), 
  [completedTasks, currentTask.id]
);

// Debounce workspace changes
const debouncedWorkspaceChange = useCallback(
  debounce((workspace) => onWorkspaceChange(workspace), 300),
  [onWorkspaceChange]
);
```

### Blockly Optimization
```javascript
// Cleanup workspace on unmount
useEffect(() => {
  return () => {
    if (workspace.current) {
      workspace.current.dispose();
    }
  };
}, []);
```

## 🚀 Deployment

### Build Process
```bash
npm run build    # Creates .next/ directory
npm run start    # Serves production build
```

### Environment Variables
```bash
# .env.local (for development)
NEXT_PUBLIC_APP_ENV=development

# .env.production (for production)
NEXT_PUBLIC_APP_ENV=production
```

This development guide provides the foundation for contributing to the NextGenCoding Interactive Lab. For specific questions, refer to the component documentation or architecture guide.
