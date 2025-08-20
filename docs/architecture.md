# Architecture Guide

## 🏗️ Application Architecture

NextGenCoding Interactive Lab follows a component-based architecture with clear separation of concerns between UI, business logic, and educational content.

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── page.js             # Main entry point
│   ├── layout.js           # Root layout with providers
│   ├── globals.css         # Global styles
│   └── lesson/             # Individual lesson pages (future)
├── components/             # React components
│   ├── InteractiveLab.js   # Main application container
│   ├── blockly/            # Blockly-related components
│   ├── panels/             # Split-panel UI components
│   ├── stage/              # Animation and sprite components
│   └── ui/                 # Reusable UI components
├── contexts/               # React context providers
├── lib/                    # Business logic and utilities
└── styles/                 # Component-specific styles
```

## 🔄 Data Flow

### Application State Flow
```
InteractiveLab (Root)
├── currentLesson (from lessons.js)
├── completedTasks (array of task IDs)
└── workspace (Blockly workspace instance)
    ├── → GuidePanel (validation & progression)
    └── → PlaygroundPanel (code execution)
```

### Lesson Progression Flow
1. **Lesson Load**: Load lesson configuration from `lessons.js`
2. **Task Display**: Show current task instructions in GuidePanel
3. **Block Arrangement**: Student arranges blocks in Blockly workspace
4. **Validation**: Check block arrangement against expected structure
5. **Progression**: Advance to next task on successful validation
6. **Execution**: Run code and animate sprite in Stage component

## 🧩 Component Architecture

### Container Components
- **InteractiveLab**: Root container managing shared state
- **GuidePanel**: Left panel with instructions and validation
- **PlaygroundPanel**: Right panel with Blockly and execution

### Presentation Components
- **BlocklyWorkspace**: Blockly editor integration
- **Stage**: Sprite animation and visual feedback
- **Controls**: Run/stop buttons for code execution

### Utility Components
- **Button**: Consistent button styling
- **ThemeToggle**: Theme switching (future feature)

## 🔧 Core Systems

### 1. Lesson System (`lib/lessons.js`)
```javascript
const lesson = {
  id: number,
  title: string,
  concept: string,           // Learning objective
  tasks: Task[],            // Step-by-step instructions
  toolboxCategories: string[], // Available Blockly categories
  sprite: SpriteConfig,     // Character configuration
  expectedBlocks: BlockStructure[] // Validation criteria
}
```

### 2. Validation System (`lib/validation.js`)
- **Block Structure Validation**: Checks if blocks are connected correctly
- **Task Completion Logic**: Determines when student has completed a task
- **Hint Generation**: Provides contextual help based on current state

### 3. Blockly Integration (`components/blockly/`)
- **Custom Blocks**: Extended Blockly blocks for educational content
- **Workspace Configuration**: Lesson-specific toolbox and settings
- **Code Generation**: Convert blocks to executable instructions

### 4. Animation System (`components/stage/`)
- **Sprite Management**: Character positioning and animation
- **Execution Engine**: Interpret block arrangements as sprite actions
- **Visual Feedback**: Real-time response to code execution

## 🎯 Design Patterns

### 1. Container/Presentation Pattern
- **Containers**: Manage state and business logic
- **Presentations**: Pure UI components with props interface

### 2. Render Props Pattern
- Workspace state shared between panels via callback props
- Enables loose coupling between Blockly integration and UI

### 3. Configuration-Driven Development
- Lessons defined as data structures rather than hardcoded
- New lessons can be added by extending configuration

### 4. Validation Strategy Pattern
- Different validation rules for different task types
- Extensible validation system for new block types

## 🔀 State Management

### Local State (useState)
- Component-specific UI state (current task, validation messages)
- Temporary state that doesn't need global access

### Prop Drilling
- Lesson configuration passed down through component tree
- Workspace instance shared between related components

### Future: Global State (Zustand)
```javascript
// Prepared for future expansion
const useAppStore = create((set) => ({
  currentUser: null,
  progress: {},
  settings: {},
  updateProgress: (lessonId, taskId) => set(/* ... */),
}))
```

## 🧪 Testing Strategy

### Component Testing
- Unit tests for validation logic
- Integration tests for Blockly workspace
- Snapshot tests for UI consistency

### End-to-End Testing
- Complete lesson flow testing
- Block arrangement and validation
- Sprite animation and feedback

## 📈 Performance Considerations

### Blockly Optimization
- Lazy loading of Blockly workspace
- Efficient block rendering for large programs
- Memory management for workspace cleanup

### React Optimization
- Memoization of expensive validation calculations
- Debounced workspace change events
- Optimized re-renders with dependency arrays

### Asset Loading
- Lazy loading of sprite images and animations
- Progressive enhancement for slower connections

## 🔮 Extensibility Points

### Adding New Lessons
1. Define lesson configuration in `lessons.js`
2. Add any required custom blocks
3. Implement validation logic
4. Test progression and feedback

### Custom Block Types
1. Define block in `CustomBlocks.js`
2. Add to appropriate toolbox category
3. Implement execution behavior
4. Add validation rules

### New Animation Features
1. Extend sprite configuration options
2. Add animation behaviors to execution engine
3. Update Stage component rendering

This architecture supports the educational goals while maintaining code organization and extensibility for future enhancements.
