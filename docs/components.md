# Component Documentation

## 📋 Component Reference

This document provides detailed documentation for all React components in the NextGenCoding Interactive Lab.

## 🏠 Root Components

### InteractiveLab
**Location**: `src/components/InteractiveLab.js`

Main application container that manages the split-panel layout and shared state.

```javascript
export default function InteractiveLab()
```

**State**:
- `currentLesson` - Active lesson configuration
- `completedTasks` - Array of completed task IDs
- `workspace` - Blockly workspace instance

**Features**:
- Manages lesson progression
- Coordinates between Guide and Playground panels
- Handles task completion state

---

## 📖 Panel Components

### GuidePanel
**Location**: `src/components/panels/GuidePanel.js`

Left panel component displaying lesson instructions and task progression.

```javascript
export default function GuidePanel({ 
  lesson, 
  completedTasks, 
  onTaskComplete, 
  workspace 
})
```

**Props**:
- `lesson` - Current lesson object with tasks and metadata
- `completedTasks` - Array of completed task IDs
- `onTaskComplete` - Callback when task is validated successfully
- `workspace` - Blockly workspace for validation

**Features**:
- Task-by-task instruction display
- Block arrangement validation
- Progress indicators and completion feedback
- Hint system for struggling students

**Key Methods**:
- `handleCheckWork()` - Validates current workspace against task requirements
- `handleNextTask()` - Advances to next task in sequence

### PlaygroundPanel
**Location**: `src/components/panels/PlaygroundPanel.js`

Right panel containing the interactive Blockly workspace and execution environment.

```javascript
export default function PlaygroundPanel({ 
  lesson, 
  onWorkspaceChange 
})
```

**Props**:
- `lesson` - Current lesson configuration
- `onWorkspaceChange` - Callback when workspace instance changes

**State**:
- `isRunning` - Whether code is currently executing
- `workspace` - Blockly workspace instance
- `spritePosition` - Current sprite coordinates

**Features**:
- Blockly workspace integration
- Code execution engine
- Sprite animation control
- Run/stop controls

---

## 🧩 Blockly Components

### BlocklyWorkspace
**Location**: `src/components/blockly/BlocklyWorkspace.js`

Core Blockly editor integration with custom configuration.

```javascript
export default function BlocklyWorkspace({ 
  toolboxCategories, 
  onWorkspaceChange 
})
```

**Props**:
- `toolboxCategories` - Array of block categories to show
- `onWorkspaceChange` - Callback when workspace is created/modified

**Features**:
- Custom Arabic/English block categories
- Lesson-specific toolbox filtering
- Workspace event handling
- Custom block definitions

**Configuration**:
```javascript
const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    { kind: 'category', name: 'أحداث', colour: '210' }, // Events
    { kind: 'category', name: 'حركة', colour: '260' },   // Motion
    // ... more categories
  ]
}
```

### CustomBlocks
**Location**: `src/components/blockly/CustomBlocks.js`

Defines custom Blockly blocks for educational content.

**Block Types**:
- `event_whenflagclicked` - Start execution trigger
- `motion_movesteps` - Move sprite by specified steps
- `control_repeat` - Loop execution
- `looks_say` - Display speech bubble

**Example Block Definition**:
```javascript
Blockly.Blocks['motion_movesteps'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("تحرك")
        .appendField(new Blockly.FieldNumber(10), "STEPS")
        .appendField("خطوات");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
  }
};
```

---

## 🎭 Stage Components

### Stage
**Location**: `src/components/stage/Stage.js`

Visual output area displaying animated sprites and execution results.

```javascript
export default function Stage({ sprite, position, isRunning })
```

**Props**:
- `sprite` - Sprite configuration (name, image, etc.)
- `position` - Current sprite coordinates `{ x, y }`
- `isRunning` - Animation state flag

**Features**:
- Grid background for spatial reference
- Animated sprite character (Nexie the Cat)
- Smooth position transitions
- Visual feedback during execution

**Sprite Rendering**:
- Custom CSS-based cat character
- Responsive animations
- Position-based transformations

### Controls
**Location**: `src/components/stage/Controls.js`

Execution control buttons (Run/Stop) for the playground.

```javascript
export default function Controls({ onRun, onStop, isRunning })
```

**Props**:
- `onRun` - Callback to start code execution
- `onStop` - Callback to stop execution and reset
- `isRunning` - Current execution state

**Features**:
- Green flag (run) button with icon
- Red stop button
- Disabled state management

---

## 🎨 UI Components

### Button
**Location**: `src/components/ui/Button.js`

Reusable button component with consistent styling.

```javascript
export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick,
  ...props 
})
```

**Props**:
- `children` - Button content
- `variant` - Style variant ('primary', 'secondary', 'success', 'danger')
- `size` - Size variant ('sm', 'md', 'lg')
- `disabled` - Disabled state
- `onClick` - Click handler

**Variants**:
- `primary` - Blue background, white text
- `secondary` - Gray background
- `success` - Green background (for completion)
- `danger` - Red background (for errors)

### ThemeToggle
**Location**: `src/components/ui/ThemeToggle.js`

Theme switching component (prepared for dark mode).

```javascript
export default function ThemeToggle()
```

**Features**:
- Light/dark mode toggle
- Icon-based interface
- Theme persistence (planned)

---

## 🔧 Context Components

### ThemeContext
**Location**: `src/contexts/ThemeContext.js`

Theme management context provider.

```javascript
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  // ...
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

**Features**:
- Global theme state management
- Theme switching functionality
- CSS class management for styling

---

## 📝 Component Conventions

### Props Pattern
```javascript
// Destructured props with defaults
export default function Component({ 
  requiredProp, 
  optionalProp = defaultValue,
  ...restProps 
}) {
  // Implementation
}
```

### State Management
```javascript
// Local state for component-specific data
const [localState, setLocalState] = useState(initialValue);

// Prop callbacks for parent communication
const handleEvent = () => {
  onEventCallback(data);
};
```

### Event Handling
```javascript
// Descriptive handler names
const handleCheckWork = () => { /* ... */ };
const handleNextTask = () => { /* ... */ };
const handleWorkspaceChange = (workspace) => { /* ... */ };
```

### Styling Approach
```javascript
// Tailwind CSS classes
<div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto">
  {/* Content */}
</div>
```

## 🔄 Component Lifecycle

### Initialization Flow
1. **App Router**: Next.js loads `page.js`
2. **InteractiveLab**: Mounts with default lesson
3. **Panels**: GuidePanel and PlaygroundPanel mount
4. **Blockly**: Workspace initializes with lesson-specific toolbox
5. **Stage**: Sprite renders at starting position

### User Interaction Flow
1. **Instruction**: User reads task in GuidePanel
2. **Block Arrangement**: User drags blocks in BlocklyWorkspace
3. **Validation**: User clicks "Check My Work"
4. **Execution**: User clicks green flag to run code
5. **Feedback**: Stage animates and provides visual feedback

This component architecture supports modular development and easy extension of educational features.
