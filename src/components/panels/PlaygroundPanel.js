'use client';

import { useState, useCallback } from 'react';
import BlocklyWorkspace from '../blockly/BlocklyWorkspace';
import Stage from '../stage/Stage';
import Controls from '../stage/Controls';

export default function PlaygroundPanel({ lesson, onWorkspaceChange }) {
  const [isRunning, setIsRunning] = useState(false);
  const [workspace, setWorkspace] = useState(null);
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
  const [spriteRotation, setSpriteRotation] = useState(0);
  const [speechBubble, setSpeechBubble] = useState('');

  const handleRun = () => {
    if (workspace) {
      setIsRunning(true);
      // Run asynchronously so UI stays responsive
      executeCode(workspace).finally(() => {
        // When execution naturally ends, ensure state reflects it
        setIsRunning(false);
      });
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    // Reset sprite position & rotation
    setSpritePosition({ x: 0, y: 0 });
    setSpriteRotation(0);
    setSpeechBubble('');
  };

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const executeCode = async (workspace) => {
    const topBlocks = workspace.getTopBlocks(true);
    
    // Find the "when flag clicked" block
    const flagBlock = topBlocks.find(block => block.type === 'event_whenflagclicked');
    
    if (flagBlock) {
      // Start from the block after the event trigger
      await executeBlockSequence(flagBlock.getNextBlock());
    } else if (topBlocks.length > 0) {
      // Fallback: run the first top script if no event block is found
      await executeBlockSequence(topBlocks[0]);
    }
  };

  const executeBlockSequence = async (block) => {
    if (!block) return;

    // Execute current block
    await executeSingleBlock(block);

    // Continue to next block in sequence
    const nextBlock = block.getNextBlock();
    if (nextBlock) {
      await executeBlockSequence(nextBlock);
    }
  };

  const executeSingleBlock = async (block) => {
    switch (block.type) {
      case 'event_whenflagclicked':
        // No-op, handled by starting at next block
        return;
      case 'motion_movesteps': {
        const steps = parseInt(block.getFieldValue('STEPS')) || 10;
        await moveSpriteSteps(steps);
        return;
      }
      case 'motion_turnright': {
        const degrees = parseInt(block.getFieldValue('DEGREES')) || 15;
        await rotateSprite(degrees);
        return;
      }
      case 'motion_turnleft': {
        const degrees = parseInt(block.getFieldValue('DEGREES')) || 15;
        await rotateSprite(-degrees);
        return;
      }
      case 'control_repeat': {
        const times = parseInt(block.getFieldValue('TIMES')) || 10;
        const innerBlock = block.getInputTargetBlock('SUBSTACK');
        for (let i = 0; i < times; i++) {
          if (!innerBlock) break;
          await executeBlockSequence(innerBlock);
        }
        return;
      }
      case 'control_wait': {
        const secs = parseFloat(block.getFieldValue('DURATION')) || 1;
        await sleep(secs * 1000);
        return;
      }
      case 'looks_say': {
        const message = block.getFieldValue('MESSAGE') || 'مرحبا!';
        showSpeechBubble(message);
        return;
      }
      case 'looks_hide': {
        // Could set sprite opacity to 0
        return;
      }
      case 'looks_show': {
        // Could set sprite opacity to 1
        return;
      }
      // Sound blocks
      case 'sound_play': {
        const sound = block.getFieldValue('SOUND') || 'piano';
        playSoundEffect(sound);
        return;
      }
      case 'sound_play_note': {
        const note = block.getFieldValue('NOTE') || 'C';
        const duration = parseFloat(block.getFieldValue('DURATION')) || 0.5;
        playNoteSound(note, duration);
        return;
      }
      case 'sound_play_drum': {
        const drum = block.getFieldValue('DRUM') || 'kick';
        playDrumSound(drum);
        return;
      }
      case 'sound_set_volume': {
        const volume = parseInt(block.getFieldValue('VOLUME')) || 50;
        setSoundVolume(volume);
        return;
      }
      case 'sound_change_volume': {
        const change = parseInt(block.getFieldValue('CHANGE')) || 10;
        changeSoundVolume(change);
        return;
      }
      case 'sound_stop_all': {
        stopAllSounds();
        return;
      }
      case 'sound_play_sound_until_done': {
        const sound = block.getFieldValue('SOUND') || 'bell';
        await playSoundUntilDone(sound);
        return;
      }
      // Chat blocks
      case 'chat_send_message': {
        const message = block.getFieldValue('MESSAGE') || 'أهلا!';
        sendChatMessage(message);
        return;
      }
      case 'chat_reply_to_message': {
        const reply = block.getFieldValue('REPLY') || 'شكرا!';
        replyChatMessage(reply);
        return;
      }
      case 'chat_set_username': {
        const username = block.getFieldValue('USERNAME') || 'مستخدم';
        setChatUsername(username);
        return;
      }
      case 'chat_add_emoji': {
        const emoji = block.getFieldValue('EMOJI') || '😀';
        addChatEmoji(emoji);
        return;
      }
      case 'chat_wait_for_message': {
        await waitForChatMessage();
        return;
      }
      case 'chat_show_typing': {
        showChatTyping();
        return;
      }
      case 'chat_clear_messages': {
        clearChatMessages();
        return;
      }
      case 'chat_auto_reply': {
        const autoReply = block.getFieldValue('AUTO_REPLY') || 'welcome';
        setChatAutoReply(autoReply);
        return;
      }
      default:
        // Unhandled blocks are skipped gracefully
        return;
    }
  };

  const moveSpriteSteps = async (steps) => {
    // Convert steps to pixels (tweakable scale)
    const distance = steps * 5;
    
    // Calculate movement based on current rotation
    const radians = (spriteRotation * Math.PI) / 180;
    const deltaX = distance * Math.cos(radians);
    const deltaY = distance * Math.sin(radians);
    
    setSpritePosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));
    // Allow CSS transition to render
    await sleep(250);
  };

  const rotateSprite = async (degrees) => {
    setSpriteRotation(prev => prev + degrees);
    await sleep(200);
  };

  const showSpeechBubble = (message) => {
    setSpeechBubble(message);
    setTimeout(() => setSpeechBubble(''), 2000);
  };

  // Chat helper functions
  const sendChatMessage = (message) => {
    if (window.runtimeFunctions?.sendMessage) {
      window.runtimeFunctions.sendMessage(message);
    }
  };

  const replyChatMessage = (reply) => {
    if (window.runtimeFunctions?.replyToMessage) {
      window.runtimeFunctions.replyToMessage(reply);
    }
  };

  const setChatUsername = (username) => {
    if (window.runtimeFunctions?.setUsername) {
      window.runtimeFunctions.setUsername(username);
    }
  };

  const addChatEmoji = (emoji) => {
    if (window.runtimeFunctions?.addEmoji) {
      window.runtimeFunctions.addEmoji(emoji);
    }
  };

  const waitForChatMessage = async () => {
    if (window.runtimeFunctions?.waitForMessage) {
      await window.runtimeFunctions.waitForMessage();
    } else {
      await sleep(2000); // fallback
    }
  };

  const showChatTyping = () => {
    if (window.runtimeFunctions?.showTyping) {
      window.runtimeFunctions.showTyping();
    }
  };

  const clearChatMessages = () => {
    if (window.runtimeFunctions?.clearMessages) {
      window.runtimeFunctions.clearMessages();
    }
  };

  const setChatAutoReply = (autoReply) => {
    if (window.runtimeFunctions?.setAutoReply) {
      window.runtimeFunctions.setAutoReply(autoReply);
    }
  };

  // Sound helper functions
  const playSoundEffect = (sound) => {
    if (window.runtimeFunctions?.playInstrument) {
      window.runtimeFunctions.playInstrument(sound);
    }
  };

  const playNoteSound = (note, duration) => {
    if (window.runtimeFunctions?.playNote) {
      window.runtimeFunctions.playNote(note, duration);
    }
  };

  const playDrumSound = (drum) => {
    if (window.runtimeFunctions?.playDrum) {
      window.runtimeFunctions.playDrum(drum);
    }
  };

  const setSoundVolume = (volume) => {
    if (window.runtimeFunctions?.setVolume) {
      window.runtimeFunctions.setVolume(volume);
    }
  };

  const changeSoundVolume = (change) => {
    if (window.runtimeFunctions?.changeVolume) {
      window.runtimeFunctions.changeVolume(change);
    }
  };

  const stopAllSounds = () => {
    if (window.runtimeFunctions?.stopAllSounds) {
      window.runtimeFunctions.stopAllSounds();
    }
  };

  const playSoundUntilDone = async (sound) => {
    if (window.runtimeFunctions?.playSoundUntilDone) {
      await window.runtimeFunctions.playSoundUntilDone(sound);
    } else {
      await sleep(1000); // fallback
    }
  };

  const handleWorkspaceInit = useCallback((workspaceInstance) => {
    setWorkspace(workspaceInstance);
    onWorkspaceChange(workspaceInstance);
  }, [onWorkspaceChange]);

  // Determine if this is a chat lesson
  const isChatLesson = lesson.toolboxCategories && lesson.toolboxCategories.includes('Chat');
  const stageType = isChatLesson ? 'chat' : 'normal';

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-white text-lg">⚡</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Coding Playground</h2>
              <p className="text-blue-100 text-sm">Drag, drop, and run your code!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-white text-sm font-medium">
              {isRunning ? 'Running' : 'Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Stage Area */}
      <div className="h-64 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 relative border-b-4 border-gradient-to-r from-indigo-400 to-purple-500 shadow-lg">
        <Controls 
          onRun={handleRun}
          onStop={handleStop}
          isRunning={isRunning}
        />
        <Stage 
          sprite={lesson.sprite}
          position={spritePosition}
          rotation={spriteRotation}
          speechBubble={speechBubble}
          isRunning={isRunning}
          stageType={stageType}
        />
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>

      {/* Blockly Workspace */}
      <div className="flex-1 relative bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800">
        {/* Workspace Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-gray-800 to-slate-700 text-white px-4 py-2 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🧩</span>
              <span className="font-semibold">Visual Code Builder</span>
            </div>
            <div className="text-sm bg-white/10 backdrop-blur-sm rounded px-2 py-1">
              {lesson.toolboxCategories?.join(' • ') || 'All Categories'}
            </div>
          </div>
        </div>
        
        {/* Blockly Container */}
        <div className="pt-12 h-full">
          <BlocklyWorkspace 
            toolboxCategories={lesson.toolboxCategories}
            onWorkspaceChange={handleWorkspaceInit}
          />
        </div>
        
        {/* Corner Decorations */}
        <div className="absolute bottom-4 right-4 opacity-20">
          <div className="flex flex-col space-y-2">
            <div className="w-8 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            <div className="w-6 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full ml-2"></div>
            <div className="w-4 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full ml-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
