# API Reference

## 📚 Function and Hook Documentation

This document provides comprehensive API documentation for functions, hooks, and utilities used throughout the NextGenCoding Interactive Lab.

## 🏠 Core Application Hooks

### useAppState (Future Implementation)
Global state management hook using Zustand.

```javascript
const {
  currentUser,
  currentLesson,
  progress,
  settings,
  updateProgress,
  setCurrentLesson
} = useAppState();
```

**Returns**:
- `currentUser` - Current user information
- `currentLesson` - Active lesson object
- `progress` - User progress tracking
- `settings` - Application settings
- `updateProgress(lessonId, taskId)` - Update completion status
- `setCurrentLesson(lesson)` - Change active lesson

## 🎨 Theme Management

### useTheme
Theme context hook for managing light/dark mode.

```javascript
const { theme, toggleTheme, setTheme } = useTheme();
```

**Returns**:
- `theme` - Current theme ('light' | 'dark')
- `toggleTheme()` - Switch between themes
- `setTheme(themeName)` - Set specific theme

**Usage**:
```javascript
import { useTheme } from '../contexts/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

## 📖 Lesson Management API

### Lesson Configuration Structure
```typescript
interface Lesson {
  id: number;
  title: string;
  concept: string;
  tasks: Task[];
  toolboxCategories: string[];
  sprite: SpriteConfig;
  expectedBlocks: BlockStructure[];
}

interface Task {
  id: number;
  instruction: string;
  blockType: string;
  category: string;
  blockImage: string;
  hint: string;
}

interface SpriteConfig {
  name: string;
  image: string;
  startPosition: { x: number; y: number };
}
```

### getLessonById
Retrieve a specific lesson by ID.

```javascript
import { getLessonById } from '../lib/lessons';

const lesson = getLessonById(1);
```

**Parameters**:
- `id` (number) - Lesson identifier

**Returns**: `Lesson | null`

### getCurrentTask
Get the current task based on completed tasks.

```javascript
import { getCurrentTask } from '../lib/lessons';

const currentTask = getCurrentTask(lesson, completedTasks);
```

**Parameters**:
- `lesson` (Lesson) - Lesson object
- `completedTasks` (number[]) - Array of completed task IDs

**Returns**: `Task | null`

### isLessonComplete
Check if all tasks in a lesson are completed.

```javascript
import { isLessonComplete } from '../lib/lessons';

const isComplete = isLessonComplete(lesson, completedTasks);
```

**Parameters**:
- `lesson` (Lesson) - Lesson object
- `completedTasks` (number[]) - Array of completed task IDs

**Returns**: `boolean`

## 🔍 Validation API

### validateTaskCompletion
Main validation function for checking task completion.

```javascript
import { validateTaskCompletion } from '../lib/validation';

const result = validateTaskCompletion(workspace, task);
```

**Parameters**:
- `workspace` (Blockly.Workspace) - Blockly workspace instance
- `task` (Task) - Task configuration object

**Returns**: `ValidationResult`
```typescript
interface ValidationResult {
  isValid: boolean;
  message: string;
  suggestions?: string[];
}
```

### validateBlockSequence
Validate a sequence of connected blocks.

```javascript
import { validateBlockSequence } from '../lib/validation';

const result = validateBlockSequence(topBlocks, expectedStructure);
```

**Parameters**:
- `topBlocks` (Blockly.Block[]) - Array of top-level blocks
- `expectedStructure` (BlockStructure) - Expected block arrangement

**Returns**: `ValidationResult`

### validateLesson
Comprehensive lesson validation.

```javascript
import { validateLesson } from '../lib/validation';

const result = validateLesson(workspace, lesson);
```

**Parameters**:
- `workspace` (Blockly.Workspace) - Blockly workspace instance
- `lesson` (Lesson) - Complete lesson object

**Returns**: `ValidationResult`

### getHint
Generate contextual hints based on current state.

```javascript
import { getHint } from '../lib/validation';

const hint = getHint(workspace, task, attemptCount);
```

**Parameters**:
- `workspace` (Blockly.Workspace) - Current workspace state
- `task` (Task) - Current task object
- `attemptCount` (number) - Number of previous attempts

**Returns**: `string` - Contextual hint message

## 🧩 Blockly Integration API

### initializeBlocklyWorkspace
Initialize a Blockly workspace with custom configuration.

```javascript
import { initializeBlocklyWorkspace } from '../lib/blockly-config';

const workspace = initializeBlocklyWorkspace(
  containerElement,
  toolboxCategories,
  options
);
```

**Parameters**:
- `containerElement` (HTMLElement) - DOM element to contain workspace
- `toolboxCategories` (string[]) - Array of category names
- `options` (BlocklyOptions) - Additional configuration options

**Returns**: `Blockly.Workspace`

### createLessonToolbox
Generate toolbox configuration for a specific lesson.

```javascript
import { createLessonToolbox } from '../lib/blockly-config';

const toolbox = createLessonToolbox(lesson.toolboxCategories);
```

**Parameters**:
- `categories` (string[]) - Array of category names

**Returns**: `ToolboxDefinition`

### getWorkspaceBlocks
Extract all blocks from workspace in structured format.

```javascript
import { getWorkspaceBlocks } from '../lib/blockly-config';

const blocks = getWorkspaceBlocks(workspace);
```

**Parameters**:
- `workspace` (Blockly.Workspace) - Blockly workspace instance

**Returns**: `BlockInfo[]`
```typescript
interface BlockInfo {
  id: string;
  type: string;
  fields: Record<string, any>;
  inputs: Record<string, BlockInfo[]>;
  next?: BlockInfo;
}
```

## 🎭 Animation API

### animateSprite
Execute sprite animation based on block commands.

```javascript
import { animateSprite } from '../lib/animation';

await animateSprite(spriteRef, command, duration);
```

**Parameters**:
- `spriteRef` (React.RefObject) - Reference to sprite element
- `command` (AnimationCommand) - Animation instruction
- `duration` (number) - Animation duration in milliseconds

**Returns**: `Promise<void>`

### AnimationCommand Interface
```typescript
interface AnimationCommand {
  type: 'move' | 'rotate' | 'scale' | 'say';
  value?: number;
  text?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}
```

### executeBlockAnimation
Convert block to animation and execute.

```javascript
import { executeBlockAnimation } from '../lib/animation';

await executeBlockAnimation(block, spriteRef);
```

**Parameters**:
- `block` (Blockly.Block) - Block to animate
- `spriteRef` (React.RefObject) - Sprite element reference

**Returns**: `Promise<void>`

## 🎯 Execution Engine API

### executeProgram
Execute complete program from workspace.

```javascript
import { executeProgram } from '../lib/execution';

const executionState = await executeProgram(workspace, spriteRef);
```

**Parameters**:
- `workspace` (Blockly.Workspace) - Workspace containing program
- `spriteRef` (React.RefObject) - Sprite element reference

**Returns**: `Promise<ExecutionState>`
```typescript
interface ExecutionState {
  isRunning: boolean;
  currentBlock?: string;
  spritePosition: { x: number; y: number };
  spriteRotation: number;
  speechBubble?: string;
}
```

### stopExecution
Stop currently running program.

```javascript
import { stopExecution } from '../lib/execution';

stopExecution(executionState);
```

**Parameters**:
- `executionState` (ExecutionState) - Current execution state

**Returns**: `void`

### stepThroughProgram
Execute program step by step for debugging.

```javascript
import { stepThroughProgram } from '../lib/execution';

const nextState = await stepThroughProgram(executionState);
```

**Parameters**:
- `executionState` (ExecutionState) - Current execution state

**Returns**: `Promise<ExecutionState>`

## 🔧 Utility Functions

### debounce
Debounce function calls to improve performance.

```javascript
import { debounce } from '../lib/utils';

const debouncedFunction = debounce((value) => {
  console.log(value);
}, 300);
```

**Parameters**:
- `func` (Function) - Function to debounce
- `delay` (number) - Delay in milliseconds

**Returns**: `Function` - Debounced function

### formatMessage
Format validation and hint messages.

```javascript
import { formatMessage } from '../lib/utils';

const formatted = formatMessage(messageTemplate, variables);
```

**Parameters**:
- `template` (string) - Message template with placeholders
- `variables` (Record<string, any>) - Variable values

**Returns**: `string` - Formatted message

### generateBlockId
Generate unique IDs for custom blocks.

```javascript
import { generateBlockId } from '../lib/utils';

const blockId = generateBlockId('motion_movesteps');
```

**Parameters**:
- `prefix` (string) - Block type prefix

**Returns**: `string` - Unique block ID

## 📊 Progress Tracking API

### saveProgress
Save user progress to storage.

```javascript
import { saveProgress } from '../lib/progress';

await saveProgress(userId, lessonId, taskId, completionData);
```

**Parameters**:
- `userId` (string) - User identifier
- `lessonId` (number) - Lesson identifier
- `taskId` (number) - Task identifier  
- `completionData` (CompletionData) - Progress data

**Returns**: `Promise<void>`

### loadProgress
Load user progress from storage.

```javascript
import { loadProgress } from '../lib/progress';

const progress = await loadProgress(userId);
```

**Parameters**:
- `userId` (string) - User identifier

**Returns**: `Promise<ProgressData>`

### getProgressStats
Calculate progress statistics.

```javascript
import { getProgressStats } from '../lib/progress';

const stats = getProgressStats(progress);
```

**Parameters**:
- `progress` (ProgressData) - User progress data

**Returns**: `ProgressStats`
```typescript
interface ProgressStats {
  totalLessons: number;
  completedLessons: number;
  currentStreak: number;
  totalBlocks: number;
  averageTime: number;
}
```

## 🎨 Component Props Reference

### InteractiveLab Props
```typescript
interface InteractiveLabProps {
  initialLesson?: Lesson;
  onLessonComplete?: (lessonId: number) => void;
  theme?: 'light' | 'dark';
}
```

### GuidePanel Props
```typescript
interface GuidePanelProps {
  lesson: Lesson;
  completedTasks: number[];
  onTaskComplete: (taskId: number) => void;
  workspace: Blockly.Workspace | null;
}
```

### PlaygroundPanel Props
```typescript
interface PlaygroundPanelProps {
  lesson: Lesson;
  onWorkspaceChange: (workspace: Blockly.Workspace) => void;
}
```

### BlocklyWorkspace Props
```typescript
interface BlocklyWorkspaceProps {
  toolboxCategories: string[];
  onWorkspaceChange: (workspace: Blockly.Workspace) => void;
  initialBlocks?: string; // XML string
  readOnly?: boolean;
}
```

### Stage Props
```typescript
interface StageProps {
  sprite: SpriteConfig;
  position: { x: number; y: number };
  rotation?: number;
  isRunning: boolean;
  speechBubble?: string;
}
```

This API reference provides the foundation for extending and customizing the NextGenCoding Interactive Lab.
