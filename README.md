# NextGenCoding Interactive Lab 🎓

A visual programming education platform that teaches coding concepts through interactive Blockly-based lessons. The lab features a split-panel design with guided instructions on the left and a hands-on Blockly playground on the right.

## 🎯 Project Overview

NextGenCoding Interactive Lab is designed to make programming education accessible and engaging for beginners through visual block-based programming. Students learn by following step-by-step instructions while building actual programs using drag-and-drop blocks.

### Key Features

- **Two-Panel Learning Interface**: Instruction panel (left) + Interactive playground (right)
- **Visual Block Programming**: Powered by Google Blockly
- **Instant Feedback Loop**: Real-time code execution with visual results
- **Gamified Learning**: Progress tracking, XP system, and achievement badges
- **Guided Lessons**: Step-by-step instructions with visual block examples
- **Live Preview Stage**: See your code come to life with animated sprites

## 🏗️ Architecture & Design

### Left Panel: The "Guide" Panel
- **Concept Explanation**: Simple, digestible lesson introductions
- **Task Instructions**: Clear, numbered steps to follow
- **Visual Block Examples**: Images of actual Blockly blocks to find
- **"Check My Work" Button**: Automated validation and feedback

### Right Panel: The "Playground" Panel
- **Blockly Workspace**: Drag-and-drop coding environment
- **Focused Toolbox**: Only relevant block categories for each lesson
- **Live Stage**: Real-time preview with sprite characters (like Nexie the Cat)
- **Control Panel**: Green Flag (Run) and Stop buttons

### Learning Workflow
1. **Read** → Student reads instruction on the left
2. **Do** → Student drags blocks in the playground
3. **See** → Student runs code and sees immediate results
4. **Repeat** → Continue building step by step
5. **Check** → Validate work and receive feedback

## 🛠️ Technology Stack

- **Frontend**: Next.js 15.3.4 with React 19
- **Styling**: Tailwind CSS 4
- **Visual Programming**: Google Blockly
- **Language**: JavaScript/TypeScript
- **Development**: ESLint for code quality

## 📋 Development Roadmap

### Phase 1: Foundation Setup
- [ ] Install and configure Blockly library
- [ ] Create basic two-panel layout
- [ ] Implement responsive design with Tailwind CSS
- [ ] Set up routing for different lessons

### Phase 2: Core Components
- [ ] **Guide Panel Components**
  - [ ] Concept explanation component
  - [ ] Task instruction list
  - [ ] Visual block showcase
  - [ ] "Check My Work" button with validation
- [ ] **Playground Panel Components**
  - [ ] Blockly workspace integration
  - [ ] Dynamic toolbox configuration
  - [ ] Live stage/preview area
  - [ ] Control buttons (run/stop)

### Phase 3: Blockly Integration
- [ ] Configure custom Blockly blocks for education
- [ ] Implement block categories (Events, Motion, Looks, etc.)
- [ ] Create sprite character system
- [ ] Build code execution engine
- [ ] Add visual feedback system

### Phase 4: Educational Features
- [ ] Lesson management system
- [ ] Progress tracking
- [ ] Code validation engine
- [ ] Hint system for stuck students
- [ ] Achievement/badge system

### Phase 5: Content & Polish
- [ ] Create starter lesson content
- [ ] Implement gamification elements
- [ ] Add sound effects and animations
- [ ] Build comprehensive help system
- [ ] Performance optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd nextgencoding-lab
npm install
```

2. **Install Blockly**:
```bash
npm install blockly
```

3. **Run development server**:
```bash
npm run dev
```

4. **Open in browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Component Structure

```
src/
├── app/
│   ├── page.js                 # Main landing page
│   ├── layout.js               # Root layout
│   ├── lesson/
│   │   └── [id]/
│   │       └── page.js         # Individual lesson pages
│   └── globals.css             # Global styles
├── components/
│   ├── panels/
│   │   ├── GuidePanel.js       # Left instruction panel
│   │   └── PlaygroundPanel.js  # Right Blockly workspace
│   ├── blockly/
│   │   ├── BlocklyWorkspace.js # Blockly integration
│   │   ├── CustomBlocks.js     # Custom block definitions
│   │   └── CodeGenerator.js    # Code execution logic
│   ├── ui/
│   │   ├── Button.js           # Reusable button component
│   │   ├── ProgressBar.js      # Learning progress indicator
│   │   └── Badge.js            # Achievement badges
│   └── stage/
│       ├── Stage.js            # Live preview area
│       ├── Sprite.js           # Character sprites
│       └── Controls.js         # Run/stop buttons
├── lib/
│   ├── lessons.js              # Lesson content and configuration
│   ├── validation.js           # Code validation logic
│   └── blockly-config.js       # Blockly workspace configuration
└── styles/
    └── blockly-custom.css      # Custom Blockly styling
```

## 📚 Key Dependencies to Add

```json
{
  "dependencies": {
    "blockly": "^12.x.x",
    "zustand": "^4.x.x"
  }
}
```

## 🎯 Learning Objectives

### Primary Goals
- Introduce programming concepts through visual blocks
- Build computational thinking skills
- Create engaging, interactive learning experiences
- Provide immediate feedback and validation

### Target Concepts
- **Events**: Program triggers and user interactions
- **Motion**: Movement and animation commands
- **Loops**: Repetition and iteration
- **Conditionals**: Decision-making logic
- **Variables**: Data storage and manipulation
- **Functions**: Code organization and reusability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌟 Acknowledgments

- Google Blockly team for the visual programming framework
- Scratch team for educational programming inspiration
- Next.js team for the robust React framework
