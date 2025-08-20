# Lesson System Documentation

## 📚 Overview

The lesson system is the educational core of NextGenCoding Interactive Lab. It provides a structured, progressive learning experience through configuration-driven lessons that combine visual instructions with hands-on block programming.

## 🏗️ Lesson Architecture

### Lesson Structure
```javascript
const lesson = {
  id: number,                    // Unique lesson identifier
  title: string,                 // Display title
  concept: string,               // Learning objective description
  tasks: Task[],                 // Array of step-by-step tasks
  toolboxCategories: string[],   // Available Blockly categories
  sprite: SpriteConfig,          // Character configuration
  expectedBlocks: BlockStructure[] // Validation criteria
}
```

### Task Structure
```javascript
const task = {
  id: number,                    // Unique task identifier within lesson
  instruction: string,           // Student-facing instruction text
  blockType: string,             // Expected block type for validation
  category: string,              // Blockly toolbox category
  blockImage: string,            // Visual reference image path
  hint: string                   // Help text for struggling students
}
```

## 📖 Current Lesson Curriculum

### Lesson 1: Making Characters Move
**Learning Objective**: Introduction to events and motion

**Concepts Covered**:
- Event-driven programming (`when green flag clicked`)
- Basic movement commands (`move 10 steps`)
- Cause and effect in programming

**Task Progression**:
1. Add event trigger block
2. Connect motion block
3. Execute and observe results

**Validation**: Checks for proper block connection and types

### Lesson 2: Loops and Repetition (Planned)
**Learning Objective**: Understanding iteration and control flow

**Concepts Covered**:
- Repeat loops
- Efficiency in programming
- Pattern recognition

### Lesson 3: Interactive Programming (Planned)
**Learning Objective**: User input and program responses

**Concepts Covered**:
- Event handling
- Conditional responses
- User interaction patterns

## 🔧 Creating New Lessons

### Step 1: Define Learning Objectives
```javascript
// Planning template
const lessonPlan = {
  concept: "What will students learn?",
  prerequisites: ["Required prior knowledge"],
  outcomes: ["What students will be able to do"],
  vocabulary: ["New terms introduced"]
};
```

### Step 2: Design Task Sequence
```javascript
// Task design considerations
const taskDesign = {
  scaffolding: "Build on previous knowledge",
  clarity: "Clear, actionable instructions",
  feedback: "Immediate validation and hints",
  progression: "Logical step-by-step advancement"
};
```

### Step 3: Implement Lesson Configuration
```javascript
// src/lib/lessons.js
export const lessons = [
  // ...existing lessons
  {
    id: 4,
    title: "Variables and Data",
    concept: "Learn how to store and use information in your programs using variables.",
    tasks: [
      {
        id: 1,
        instruction: "Create a variable called 'score' to keep track of points.",
        blockType: "data_variable",
        category: "Variables",
        blockImage: "/blocks/create-variable.png",
        hint: "Variables are like containers that hold information!"
      },
      {
        id: 2,
        instruction: "Set the score variable to 0 at the start of your program.",
        blockType: "data_setvariableto",
        category: "Variables", 
        blockImage: "/blocks/set-variable.png",
        hint: "Use the 'set variable to' block to give your variable a value."
      },
      {
        id: 3,
        instruction: "Display the score on the screen using the 'say' block.",
        blockType: "looks_say",
        category: "Looks",
        blockImage: "/blocks/say-block.png",
        hint: "You can drag the variable block into the say block!"
      }
    ],
    toolboxCategories: ["Events", "Variables", "Looks"],
    sprite: {
      name: "Nexie",
      image: "/sprites/nexie-cat.png",
      startPosition: { x: 0, y: 0 }
    },
    expectedBlocks: [
      {
        type: "event_whenflagclicked",
        next: {
          type: "data_setvariableto",
          fields: { VARIABLE: "score", VALUE: "0" },
          next: {
            type: "looks_say",
            fields: { MESSAGE: "score" }
          }
        }
      }
    ]
  }
];
```

### Step 4: Add Required Custom Blocks
```javascript
// src/components/blockly/CustomBlocks.js
Blockly.Blocks['data_variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("variable")
        .appendField(new Blockly.FieldVariable("item"), "VAR");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip("Returns the value of a variable");
  }
};
```

### Step 5: Implement Validation Logic
```javascript
// src/lib/validation.js
export const validateTaskCompletion = (workspace, task) => {
  const topBlocks = workspace.getTopBlocks(true);
  
  switch (task.blockType) {
    case 'data_variable':
      return validateVariableCreation(topBlocks, task);
    case 'data_setvariableto':
      return validateVariableAssignment(topBlocks, task);
    default:
      return validateGenericTask(topBlocks, task);
  }
};

const validateVariableCreation = (blocks, task) => {
  const variableBlocks = blocks.filter(block => 
    block.type === 'data_variable'
  );
  
  if (variableBlocks.length === 0) {
    return {
      isValid: false,
      message: "Create a variable first! Look in the Variables category."
    };
  }
  
  return { isValid: true, message: "Great! You created a variable!" };
};
```

## 🎯 Lesson Design Principles

### 1. Progressive Complexity
- **Start Simple**: Begin with single-block concepts
- **Build Gradually**: Add complexity incrementally
- **Connect Concepts**: Link new learning to previous lessons

### 2. Clear Communication
- **Simple Language**: Age-appropriate vocabulary
- **Visual Aids**: Block images and diagrams
- **Consistent Terminology**: Use the same terms throughout

### 3. Immediate Feedback
- **Validation Messages**: Specific, helpful error messages
- **Visual Confirmation**: Animated feedback for correct solutions
- **Hint System**: Progressive help without giving away answers

### 4. Engagement Strategies
- **Narrative Context**: Story-driven lesson themes
- **Character Interaction**: Sprite responses to code
- **Achievement Recognition**: Completion celebrations

## 🔄 Lesson Flow Management

### Task Progression Logic
```javascript
// src/components/panels/GuidePanel.js
const handleCheckWork = () => {
  if (workspace) {
    const validation = validateTaskCompletion(workspace, currentTask);
    
    if (validation.isValid) {
      onTaskComplete(currentTask.id);
      
      // Auto-advance with delay for feedback
      setTimeout(() => {
        if (currentTaskIndex < lesson.tasks.length - 1) {
          setCurrentTaskIndex(currentTaskIndex + 1);
        }
      }, 1500);
    } else {
      setValidationMessage(validation.message);
    }
  }
};
```

### Completion Tracking
```javascript
// Track individual task completion
const [completedTasks, setCompletedTasks] = useState([]);

// Check if lesson is complete
const allTasksCompleted = lesson.tasks.every(task => 
  completedTasks.includes(task.id)
);
```

## 🎨 Visual Design Guidelines

### Block Image Standards
- **Size**: 200x100px recommended
- **Format**: PNG with transparency
- **Style**: Match Blockly's visual design
- **Annotation**: Highlight relevant parts

### Instruction Writing
```javascript
// Good: Specific and actionable
"Find the 'move 10 steps' block in the Motion category and drag it below the green flag block."

// Avoid: Vague or confusing
"Add a motion block somewhere."
```

### Hint System
```javascript
// Progressive hint levels
const hints = {
  level1: "Look in the Motion category for movement blocks.",
  level2: "The 'move 10 steps' block is blue colored.",
  level3: "Drag the blue movement block and connect it under the green flag block."
};
```

## 📊 Lesson Analytics (Future)

### Tracking Metrics
- Task completion rates
- Time spent per task
- Hint usage frequency
- Common error patterns

### Data Structure
```javascript
const lessonAnalytics = {
  lessonId: number,
  studentId: string,
  startTime: timestamp,
  completionTime: timestamp,
  tasksCompleted: number[],
  hintsUsed: number[],
  validationAttempts: number[]
};
```

## 🔮 Future Enhancements

### Adaptive Learning
- **Difficulty Adjustment**: Modify complexity based on performance
- **Personalized Hints**: Context-aware help system
- **Learning Path Optimization**: Suggest lesson sequences

### Assessment Integration
- **Knowledge Checks**: Quiz questions between lessons
- **Portfolio Creation**: Student project galleries
- **Progress Reporting**: Detailed learning analytics

### Content Expansion
- **Branching Scenarios**: Multiple solution paths
- **Creative Projects**: Open-ended coding challenges
- **Collaborative Lessons**: Pair programming activities

The lesson system forms the educational backbone of the platform, providing structured learning experiences that grow with students' programming understanding.
