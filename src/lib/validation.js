/**
 * Validation functions for checking if student's block arrangement is correct
 */

export const validateLesson = (workspace, lesson) => {
  const topBlocks = workspace.getTopBlocks(true);
  const expectedBlocks = lesson.expectedBlocks;
  
  if (!expectedBlocks || expectedBlocks.length === 0) {
    return { isValid: true, message: 'No specific validation required' };
  }

  return validateBlockSequence(topBlocks, expectedBlocks[0]);
};

export const validateBlockSequence = (topBlocks, expectedBlock) => {
  // Find the starting block (usually event_whenflagclicked)
  const startBlock = topBlocks.find(block => block.type === expectedBlock.type);
  
  if (!startBlock) {
    return {
      isValid: false,
      message: `Missing ${expectedBlock.type} block. Make sure to start with the correct event block!`
    };
  }

  // Validate the sequence
  return validateBlockChain(startBlock, expectedBlock);
};

export const validateBlockChain = (actualBlock, expectedBlock) => {
  if (!actualBlock && !expectedBlock) {
    return { isValid: true, message: 'Perfect! All blocks are correctly connected.' };
  }

  if (!actualBlock && expectedBlock) {
    return {
      isValid: false,
      message: `Missing ${expectedBlock.type} block in your sequence.`
    };
  }

  if (actualBlock && !expectedBlock) {
    return {
      isValid: false,
      message: 'You have extra blocks that are not needed for this lesson.'
    };
  }

  // Check if block types match
  if (actualBlock.type !== expectedBlock.type) {
    return {
      isValid: false,
      message: `Expected ${expectedBlock.type} but found ${actualBlock.type}.`
    };
  }

  // Check field values if specified
  if (expectedBlock.fields) {
    for (const [fieldName, expectedValue] of Object.entries(expectedBlock.fields)) {
      const actualValue = actualBlock.getFieldValue(fieldName);
      if (actualValue !== expectedValue) {
        return {
          isValid: false,
          message: `${fieldName} should be ${expectedValue}, but it's ${actualValue}.`
        };
      }
    }
  }

  // Recursively check next block
  const nextActual = actualBlock.getNextBlock();
  const nextExpected = expectedBlock.next;

  return validateBlockChain(nextActual, nextExpected);
};

export const validateTaskCompletion = (workspace, task) => {
  const allBlocks = workspace.getAllBlocks();
  const blockTypes = allBlocks.map(block => block.type);

  switch (task.blockType) {
    case 'event_whenflagclicked':
      return {
        isValid: blockTypes.includes('event_whenflagclicked'),
        message: blockTypes.includes('event_whenflagclicked') 
          ? 'Great! You added the "when flag clicked" block!' 
          : 'Add the "when flag clicked" block from the Events category.'
      };

    case 'motion_movesteps':
      const hasEventBlock = blockTypes.includes('event_whenflagclicked');
      const hasMotionBlock = blockTypes.includes('motion_movesteps');
      
      if (!hasEventBlock) {
        return {
          isValid: false,
          message: 'First add the "when flag clicked" block, then connect the motion block.'
        };
      }

      if (!hasMotionBlock) {
        return {
          isValid: false,
          message: 'Add the "move steps" block from the Motion category.'
        };
      }

      // Check if blocks are connected
      const eventBlock = allBlocks.find(block => block.type === 'event_whenflagclicked');
      const motionBlock = allBlocks.find(block => block.type === 'motion_movesteps');
      
      if (eventBlock && motionBlock) {
        const nextBlock = eventBlock.getNextBlock();
        if (nextBlock && nextBlock.type === 'motion_movesteps') {
          return {
            isValid: true,
            message: 'Perfect! Your blocks are connected correctly!'
          };
        } else {
          return {
            isValid: false,
            message: 'Connect the motion block below the event block by snapping them together.'
          };
        }
      }
      break;

    case 'complete':
      // Check if the program can run (has event block with connected motion)
      const hasCompleteSequence = validateCompleteSequence(workspace);
      return {
        isValid: hasCompleteSequence,
        message: hasCompleteSequence 
          ? 'Excellent! Your program is ready to run. Click the green flag!' 
          : 'Make sure your blocks are connected in the right order.'
      };

    // Sound blocks validation
    case 'sound_play':
      return {
        isValid: blockTypes.includes('sound_play'),
        message: blockTypes.includes('sound_play') 
          ? 'Great! You added the play sound block!' 
          : 'Add the "play sound" block from the Sound category.'
      };

    case 'sound_play_note':
      return {
        isValid: blockTypes.includes('sound_play_note'),
        message: blockTypes.includes('sound_play_note') 
          ? 'Excellent! You added the play note block!' 
          : 'Add the "play note" block from the Sound category.'
      };

    case 'sound_play_drum':
      return {
        isValid: blockTypes.includes('sound_play_drum'),
        message: blockTypes.includes('sound_play_drum') 
          ? 'Perfect! You added the drum sound block!' 
          : 'Add the "play drum" block from the Sound category.'
      };

    case 'sound_set_volume':
      return {
        isValid: blockTypes.includes('sound_set_volume'),
        message: blockTypes.includes('sound_set_volume') 
          ? 'Great! You set the volume!' 
          : 'Add the "set volume" block from the Sound category.'
      };

    case 'sound_play_sound_until_done':
      return {
        isValid: blockTypes.includes('sound_play_sound_until_done'),
        message: blockTypes.includes('sound_play_sound_until_done') 
          ? 'Perfect! Sound will play until finished!' 
          : 'Add the "play sound until done" block from the Sound category.'
      };

    // Control blocks validation
    case 'control_wait':
      return {
        isValid: blockTypes.includes('control_wait'),
        message: blockTypes.includes('control_wait') 
          ? 'Great! You added a wait block for timing!' 
          : 'Add the "wait" block from the Control category.'
      };

    case 'control_repeat':
      return {
        isValid: blockTypes.includes('control_repeat'),
        message: blockTypes.includes('control_repeat') 
          ? 'Excellent! You added a repeat loop!' 
          : 'Add the "repeat" block from the Control category.'
      };

    // Looks blocks validation
    case 'looks_say':
      return {
        isValid: blockTypes.includes('looks_say'),
        message: blockTypes.includes('looks_say') 
          ? 'Great! Your character can now speak!' 
          : 'Add the "say" block from the Looks category.'
      };

    // Advanced Motion blocks validation
    case 'motion_goto':
      return {
        isValid: blockTypes.includes('motion_goto'),
        message: blockTypes.includes('motion_goto') 
          ? '🎯 Perfect! Your character can teleport to any position!' 
          : '🎯 Add the "go to x: y:" block from the Motion category.'
      };

    case 'motion_glide':
      return {
        isValid: blockTypes.includes('motion_glide'),
        message: blockTypes.includes('motion_glide') 
          ? '✈️ Excellent! Your character will glide smoothly!' 
          : '✈️ Add the "glide to x: y:" block from the Motion category.'
      };

    case 'motion_point_direction':
      return {
        isValid: blockTypes.includes('motion_point_direction'),
        message: blockTypes.includes('motion_point_direction') 
          ? '🧭 Great! You set the direction!' 
          : '🧭 Add the "point in direction" block from the Motion category.'
      };

    case 'motion_point_towards':
      return {
        isValid: blockTypes.includes('motion_point_towards'),
        message: blockTypes.includes('motion_point_towards') 
          ? '👀 Perfect! Your character will look towards the target!' 
          : '👀 Add the "point towards" block from the Motion category.'
      };

    case 'motion_change_x':
      return {
        isValid: blockTypes.includes('motion_change_x'),
        message: blockTypes.includes('motion_change_x') 
          ? '🔄 Excellent! You can move horizontally!' 
          : '🔄 Add the "change x by" block from the Motion category.'
      };

    case 'motion_change_y':
      return {
        isValid: blockTypes.includes('motion_change_y'),
        message: blockTypes.includes('motion_change_y') 
          ? '🔄 Great! You can move vertically!' 
          : '🔄 Add the "change y by" block from the Motion category.'
      };

    case 'motion_set_x':
      return {
        isValid: blockTypes.includes('motion_set_x'),
        message: blockTypes.includes('motion_set_x') 
          ? '📍 Perfect! You set the horizontal position!' 
          : '📍 Add the "set x to" block from the Motion category.'
      };

    case 'motion_set_y':
      return {
        isValid: blockTypes.includes('motion_set_y'),
        message: blockTypes.includes('motion_set_y') 
          ? '📍 Excellent! You set the vertical position!' 
          : '📍 Add the "set y to" block from the Motion category.'
      };

    case 'motion_if_on_edge_bounce':
      return {
        isValid: blockTypes.includes('motion_if_on_edge_bounce'),
        message: blockTypes.includes('motion_if_on_edge_bounce') 
          ? '🏀 Great! Your character will bounce off edges!' 
          : '🏀 Add the "if on edge, bounce" block from the Motion category.'
      };

    case 'motion_set_rotation_style':
      return {
        isValid: blockTypes.includes('motion_set_rotation_style'),
        message: blockTypes.includes('motion_set_rotation_style') 
          ? '🔄 Perfect! You set the rotation style!' 
          : '🔄 Add the "set rotation style" block from the Motion category.'
      };

    case 'motion_move_forward':
      return {
        isValid: blockTypes.includes('motion_move_forward'),
        message: blockTypes.includes('motion_move_forward') 
          ? '⬆️ Excellent! Moving forward in current direction!' 
          : '⬆️ Add the "move forward" block from the Motion category.'
      };

    case 'motion_move_backward':
      return {
        isValid: blockTypes.includes('motion_move_backward'),
        message: blockTypes.includes('motion_move_backward') 
          ? '⬇️ Great! Moving backward!' 
          : '⬇️ Add the "move backward" block from the Motion category.'
      };

    case 'motion_turnright':
      return {
        isValid: blockTypes.includes('motion_turnright'),
        message: blockTypes.includes('motion_turnright') 
          ? '↻ Perfect! Your character can turn right!' 
          : '↻ Add the "turn right" block from the Motion category.'
      };

    case 'motion_turnleft':
      return {
        isValid: blockTypes.includes('motion_turnleft'),
        message: blockTypes.includes('motion_turnleft') 
          ? '↺ Excellent! Your character can turn left!' 
          : '↺ Add the "turn left" block from the Motion category.'
      };

    // Chat blocks validation
    case 'chat_set_username':
      return {
        isValid: blockTypes.includes('chat_set_username'),
        message: blockTypes.includes('chat_set_username') 
          ? 'رائع! حطيت اسم المستخدم!' 
          : 'حط بلوك "حط اسم المستخدم" من فئة الشات.'
      };

    case 'chat_send_message':
      return {
        isValid: blockTypes.includes('chat_send_message'),
        message: blockTypes.includes('chat_send_message') 
          ? 'ممتاز! بعثت رسالة!' 
          : 'حط بلوك "ابعث رسالة" من فئة الشات.'
      };

    case 'chat_add_emoji':
      return {
        isValid: blockTypes.includes('chat_add_emoji'),
        message: blockTypes.includes('chat_add_emoji') 
          ? 'عظيم! زدت إيموجي!' 
          : 'حط بلوك "زيد إيموجي" من فئة الشات.'
      };

    case 'chat_show_typing':
      return {
        isValid: blockTypes.includes('chat_show_typing'),
        message: blockTypes.includes('chat_show_typing') 
          ? 'ممتاز! راح يظهر إنك تكتب!' 
          : 'حط بلوك "أظهر الكتابة" من فئة الشات.'
      };

    case 'chat_reply_to_message':
      return {
        isValid: blockTypes.includes('chat_reply_to_message'),
        message: blockTypes.includes('chat_reply_to_message') 
          ? 'رائع! ردت على الرسالة!' 
          : 'حط بلوك "رد على رسالة" من فئة الشات.'
      };

    case 'chat_auto_reply':
      return {
        isValid: blockTypes.includes('chat_auto_reply'),
        message: blockTypes.includes('chat_auto_reply') 
          ? 'عظيم! حطيت رد تلقائي!' 
          : 'حط بلوك "رد تلقائي" من فئة الشات.'
      };

    default:
      return {
        isValid: false,
        message: `Block type "${task.blockType}" is not recognized. Please check the instructions.`
      };
  }

  return { isValid: false, message: 'Please check your blocks.' };
};

const validateCompleteSequence = (workspace) => {
  const topBlocks = workspace.getTopBlocks(true);
  const eventBlock = topBlocks.find(block => block.type === 'event_whenflagclicked');
  
  if (!eventBlock) return false;
  
  const nextBlock = eventBlock.getNextBlock();
  return nextBlock && nextBlock.type === 'motion_movesteps';
};

// Helper function for providing hints
export const getHint = (workspace, task) => {
  const allBlocks = workspace.getAllBlocks();
  const blockTypes = allBlocks.map(block => block.type);

  if (blockTypes.length === 0) {
    return "Start by dragging a block from the toolbox to the workspace!";
  }

  switch (task.blockType) {
    case 'event_whenflagclicked':
      if (!blockTypes.includes('event_whenflagclicked')) {
        return "Look in the Events category (orange blocks) for the 'when flag clicked' block.";
      }
      break;

    case 'motion_movesteps':
      if (!blockTypes.includes('motion_movesteps')) {
        return "Look in the Motion category (blue blocks) for the 'move steps' block.";
      } else {
        return "Try connecting the motion block to the event block by dragging it close and snapping it underneath.";
      }
      break;

    case 'sound_play':
      if (!blockTypes.includes('sound_play')) {
        return "Look in the Sound category (purple blocks) for the 'play sound' block.";
      }
      break;

    case 'sound_play_note':
      if (!blockTypes.includes('sound_play_note')) {
        return "Look in the Sound category for the 'play note' block. You can choose different notes!";
      }
      break;

    case 'sound_play_drum':
      if (!blockTypes.includes('sound_play_drum')) {
        return "Look in the Sound category for the 'play drum' block. Try different drum sounds!";
      }
      break;

    case 'control_wait':
      if (!blockTypes.includes('control_wait')) {
        return "Look in the Control category (yellow blocks) for the 'wait' block.";
      }
      break;

    case 'looks_say':
      if (!blockTypes.includes('looks_say')) {
        return "Look in the Looks category (purple blocks) for the 'say' block.";
      }
      break;

    // Advanced Motion hints
    case 'motion_goto':
      if (!blockTypes.includes('motion_goto')) {
        return "Look in the Motion category (blue blocks) for the 'go to x: y:' block to teleport instantly.";
      }
      break;

    case 'motion_glide':
      if (!blockTypes.includes('motion_glide')) {
        return "Look in the Motion category for the 'glide' block to move smoothly over time.";
      }
      break;

    case 'motion_point_direction':
      if (!blockTypes.includes('motion_point_direction')) {
        return "Look in the Motion category for the 'point in direction' block. Use 90 for right, -90 for left!";
      }
      break;

    case 'motion_point_towards':
      if (!blockTypes.includes('motion_point_towards')) {
        return "Look in the Motion category for the 'point towards' block to face a specific target.";
      }
      break;

    case 'motion_change_x':
      if (!blockTypes.includes('motion_change_x')) {
        return "Look in the Motion category for 'change x by' to move left (negative) or right (positive).";
      }
      break;

    case 'motion_change_y':
      if (!blockTypes.includes('motion_change_y')) {
        return "Look in the Motion category for 'change y by' to move down (negative) or up (positive).";
      }
      break;

    case 'motion_set_x':
      if (!blockTypes.includes('motion_set_x')) {
        return "Look in the Motion category for 'set x to' to place your character at a specific horizontal position.";
      }
      break;

    case 'motion_set_y':
      if (!blockTypes.includes('motion_set_y')) {
        return "Look in the Motion category for 'set y to' to place your character at a specific vertical position.";
      }
      break;

    case 'motion_if_on_edge_bounce':
      if (!blockTypes.includes('motion_if_on_edge_bounce')) {
        return "Look in the Motion category for 'if on edge, bounce' to make your character bounce off screen edges.";
      }
      break;

    case 'motion_set_rotation_style':
      if (!blockTypes.includes('motion_set_rotation_style')) {
        return "Look in the Motion category for 'set rotation style' to control how your character rotates.";
      }
      break;

    case 'motion_move_forward':
      if (!blockTypes.includes('motion_move_forward')) {
        return "Look in the Motion category for 'move forward' to move in the current direction.";
      }
      break;

    case 'motion_move_backward':
      if (!blockTypes.includes('motion_move_backward')) {
        return "Look in the Motion category for 'move backward' to move in the opposite direction.";
      }
      break;

    case 'motion_turnright':
      if (!blockTypes.includes('motion_turnright')) {
        return "Look in the Motion category (blue blocks) for the 'turn right' block.";
      }
      break;

    case 'motion_turnleft':
      if (!blockTypes.includes('motion_turnleft')) {
        return "Look in the Motion category (blue blocks) for the 'turn left' block.";
      }
      break;

    case 'chat_set_username':
      if (!blockTypes.includes('chat_set_username')) {
        return "دور في فئة الشات (الزرقاء الفاتحة) على بلوك 'حط اسم المستخدم'.";
      }
      break;

    case 'chat_send_message':
      if (!blockTypes.includes('chat_send_message')) {
        return "دور في فئة الشات على بلوك 'ابعث رسالة'.";
      }
      break;

    case 'chat_add_emoji':
      if (!blockTypes.includes('chat_add_emoji')) {
        return "دور في فئة الشات على بلوك 'زيد إيموجي'.";
      }
      break;

    case 'complete':
      return "Click the green flag above the stage to run your program and see the magic happen!";
  }

  return "You're doing great! Keep following the instructions.";
};
