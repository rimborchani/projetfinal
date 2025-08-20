import { javascriptGenerator } from 'blockly/javascript';

// Event blocks
javascriptGenerator['event_whenflagclicked'] = function(block) {
  const code = '// Program start\n';
  return code;
};

// Motion blocks
javascriptGenerator['motion_movesteps'] = function(block) {
  const steps = block.getFieldValue('STEPS');
  const code = `moveSteps(${steps});\n`;
  return code;
};

javascriptGenerator['motion_turnright'] = function(block) {
  const degrees = block.getFieldValue('DEGREES');
  const code = `turnRight(${degrees});\n`;
  return code;
};

javascriptGenerator['motion_turnleft'] = function(block) {
  const degrees = block.getFieldValue('DEGREES');
  const code = `turnLeft(${degrees});\n`;
  return code;
};

// Control blocks
javascriptGenerator['control_repeat'] = function(block) {
  const times = block.getFieldValue('TIMES');
  const branch = javascriptGenerator.statementToCode(block, 'SUBSTACK');
  const code = `for (let i = 0; i < ${times}; i++) {\n${branch}}\n`;
  return code;
};

javascriptGenerator['control_forever'] = function(block) {
  const branch = javascriptGenerator.statementToCode(block, 'SUBSTACK');
  const code = `while (true) {\n${branch}}\n`;
  return code;
};

javascriptGenerator['control_wait'] = function(block) {
  const duration = block.getFieldValue('DURATION');
  const code = `wait(${duration});\n`;
  return code;
};

// Looks blocks
javascriptGenerator['looks_say'] = function(block) {
  const message = block.getFieldValue('MESSAGE');
  const code = `say("${message}");\n`;
  return code;
};

javascriptGenerator['looks_hide'] = function(block) {
  const code = 'hide();\n';
  return code;
};

javascriptGenerator['looks_show'] = function(block) {
  const code = 'show();\n';
  return code;
};

// Sound blocks
javascriptGenerator['sound_play'] = function(block) {
  const sound = block.getFieldValue('SOUND');
  const code = `playInstrument("${sound}");\n`;
  return code;
};

javascriptGenerator['sound_play_note'] = function(block) {
  const note = block.getFieldValue('NOTE');
  const duration = block.getFieldValue('DURATION');
  const code = `playNote("${note}", ${duration});\n`;
  return code;
};

javascriptGenerator['sound_play_drum'] = function(block) {
  const drum = block.getFieldValue('DRUM');
  const code = `playDrum("${drum}");\n`;
  return code;
};

javascriptGenerator['sound_set_volume'] = function(block) {
  const volume = block.getFieldValue('VOLUME');
  const code = `setVolume(${volume});\n`;
  return code;
};

javascriptGenerator['sound_change_volume'] = function(block) {
  const change = block.getFieldValue('CHANGE');
  const code = `changeVolume(${change});\n`;
  return code;
};

javascriptGenerator['sound_stop_all'] = function(block) {
  const code = 'stopAllSounds();\n';
  return code;
};

javascriptGenerator['sound_play_sound_until_done'] = function(block) {
  const sound = block.getFieldValue('SOUND');
  const code = `playSoundUntilDone("${sound}");\n`;
  return code;
};

// Chat blocks
javascriptGenerator['chat_send_message'] = function(block) {
  const message = block.getFieldValue('MESSAGE');
  const code = `sendMessage("${message}");\n`;
  return code;
};

javascriptGenerator['chat_reply_to_message'] = function(block) {
  const reply = block.getFieldValue('REPLY');
  const code = `replyToMessage("${reply}");\n`;
  return code;
};

javascriptGenerator['chat_set_username'] = function(block) {
  const username = block.getFieldValue('USERNAME');
  const code = `setUsername("${username}");\n`;
  return code;
};

javascriptGenerator['chat_add_emoji'] = function(block) {
  const emoji = block.getFieldValue('EMOJI');
  const code = `addEmoji("${emoji}");\n`;
  return code;
};

javascriptGenerator['chat_wait_for_message'] = function(block) {
  const code = 'waitForMessage();\n';
  return code;
};

javascriptGenerator['chat_show_typing'] = function(block) {
  const code = 'showTyping();\n';
  return code;
};

javascriptGenerator['chat_clear_messages'] = function(block) {
  const code = 'clearMessages();\n';
  return code;
};

javascriptGenerator['chat_auto_reply'] = function(block) {
  const autoReply = block.getFieldValue('AUTO_REPLY');
  const code = `setAutoReply("${autoReply}");\n`;
  return code;
};

// Looks blocks
javascriptGenerator['looks_say'] = function(block) {
  const message = block.getFieldValue('MESSAGE');
  const code = `say("${message}");\n`;
  return code;
};

// Runtime functions that will be available in the generated code
export const runtimeFunctions = {
  moveSteps: (steps) => {
    console.log(`Moving ${steps} steps`);
    // This will be replaced with actual sprite movement
  },
  
  turnRight: (degrees) => {
    console.log(`Turning right ${degrees} degrees`);
  },
  
  turnLeft: (degrees) => {
    console.log(`Turning left ${degrees} degrees`);
  },
  
  wait: (seconds) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  },
  
  say: (message) => {
    console.log(`Sprite says: ${message}`);
  },
  
  hide: () => {
    console.log('Hiding sprite');
  },
  
  show: () => {
    console.log('Showing sprite');
  },

  // Sound runtime functions
  playInstrument: (instrument) => {
    console.log(`🎹 Playing ${instrument} instrument`);
    
    // Show visual feedback
    const stage = document.querySelector('[class*="stage"]');
    if (stage) {
      const instrumentIndicator = document.createElement('div');
      instrumentIndicator.textContent = `🎹 ${instrument.toUpperCase()}`;
      instrumentIndicator.style.cssText = `
        position: absolute;
        top: 20px;
        left: 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: bold;
        font-size: 14px;
        z-index: 1000;
        animation: instrumentFloat 1s ease-out;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      `;
      
      // Add animation keyframes if not exists
      if (!document.querySelector('#instrumentAnimation')) {
        const style = document.createElement('style');
        style.id = 'instrumentAnimation';
        style.textContent = `
          @keyframes instrumentFloat {
            0% { transform: translateY(-10px) scale(0.8); opacity: 0; }
            50% { transform: translateY(0) scale(1.1); opacity: 1; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }
      
      stage.appendChild(instrumentIndicator);
      setTimeout(() => instrumentIndicator.remove(), 1000);
    }
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Enhanced frequencies for different instruments
      const frequencies = {
        drums: 100,
        guitar: 200,
        piano: 300,
        flute: 500,
        trumpet: 400
      };
      
      oscillator.frequency.setValueAtTime(frequencies[instrument] || 300, audioContext.currentTime);
      oscillator.type = 'sine';
      
      const volume = (window.globalVolume || 0.3) * 0.5;
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.8);
    } catch (error) {
      console.error('🚫 Audio error:', error);
      // Fallback visual feedback
      alert(`🎹 ${instrument} sound played! (Audio may be disabled)`);
    }
  },
  
  playNote: (note, duration) => {
    console.log(`Playing note ${note} for ${duration} seconds`);
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Musical note frequencies (4th octave)
      const noteFrequencies = {
        C: 261.63,
        D: 293.66,
        E: 329.63,
        F: 349.23,
        G: 392.00,
        A: 440.00,
        B: 493.88
      };
      
      oscillator.frequency.setValueAtTime(noteFrequencies[note] || 440, audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.log('Audio not supported');
    }
  },
  
  playDrum: (drumType) => {
    console.log(`🥁 Playing ${drumType} drum`);
    
    // Show visual feedback
    const stage = document.querySelector('[class*="stage"]');
    if (stage) {
      const drumIndicator = document.createElement('div');
      drumIndicator.textContent = `🥁 ${drumType.toUpperCase()}`;
      drumIndicator.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b6b, #feca57);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: bold;
        font-size: 14px;
        z-index: 1000;
        animation: drumPulse 0.5s ease-out;
        box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
      `;
      
      // Add animation keyframes if not exists
      if (!document.querySelector('#drumAnimation')) {
        const style = document.createElement('style');
        style.id = 'drumAnimation';
        style.textContent = `
          @keyframes drumPulse {
            0% { transform: scale(0) rotate(-10deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(5deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }
      
      stage.appendChild(drumIndicator);
      setTimeout(() => drumIndicator.remove(), 800);
    }
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const filterNode = audioContext.createBiquadFilter();
      
      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Enhanced drum sounds with better characteristics
      const drumSettings = {
        bass: { frequency: 60, type: 'sine', duration: 0.4, filterFreq: 100 },
        snare: { frequency: 200, type: 'sawtooth', duration: 0.15, filterFreq: 3000 },
        hihat: { frequency: 8000, type: 'square', duration: 0.08, filterFreq: 10000 },
        crash: { frequency: 5000, type: 'sawtooth', duration: 0.6, filterFreq: 8000 },
        kick: { frequency: 80, type: 'sine', duration: 0.3, filterFreq: 120 }
      };
      
      const settings = drumSettings[drumType] || drumSettings.snare;
      
      // Configure oscillator
      oscillator.frequency.setValueAtTime(settings.frequency, audioContext.currentTime);
      oscillator.type = settings.type;
      
      // Configure filter for better drum sound
      filterNode.type = 'lowpass';
      filterNode.frequency.setValueAtTime(settings.filterFreq, audioContext.currentTime);
      
      // Configure gain envelope for drum-like attack
      const volume = (window.globalVolume || 0.3) * 0.8;
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + settings.duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + settings.duration);
    } catch (error) {
      console.error('🚫 Audio error:', error);
      // Fallback visual feedback
      alert(`🥁 ${drumType} drum sound played! (Audio may be disabled)`);
    }
  },
  
  setVolume: (volume) => {
    console.log(`Setting volume to ${volume}%`);
    // Store volume in a global variable or audio manager
    window.globalVolume = volume / 100;
  },
  
  changeVolume: (change) => {
    const currentVolume = (window.globalVolume || 0.5) * 100;
    const newVolume = Math.max(0, Math.min(100, currentVolume + change));
    console.log(`Changing volume by ${change}%, new volume: ${newVolume}%`);
    window.globalVolume = newVolume / 100;
  },
  
  stopAllSounds: () => {
    console.log('Stopping all sounds');
    // This would stop all currently playing audio contexts
    // Implementation depends on how you manage audio instances
  },
  
  playSoundUntilDone: async (soundType) => {
    console.log(`Playing ${soundType} sound until done`);
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different sound effects
      const soundSettings = {
        whistle: { frequency: 2000, type: 'sine', duration: 1 },
        bell: { frequency: 800, type: 'sine', duration: 1.5 },
        clap: { frequency: 1000, type: 'sawtooth', duration: 0.2 },
        laugh: { frequency: 400, type: 'triangle', duration: 2 },
        bird: { frequency: 1500, type: 'sine', duration: 0.8 }
      };
      
      const settings = soundSettings[soundType] || soundSettings.bell;
      
      oscillator.frequency.setValueAtTime(settings.frequency, audioContext.currentTime);
      oscillator.type = settings.type;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + settings.duration);
      
      // Wait for the sound to finish
      await new Promise(resolve => setTimeout(resolve, settings.duration * 1000));
    } catch (error) {
      console.log('Audio not supported');
    }
  },

  // Chat runtime functions
  sendMessage: (message) => {
    console.log(`💬 Message sent: ${message}`);
    // Simulate adding message to chat
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message sent';
      messageDiv.innerHTML = `
        <div class="message-bubble">
          <span class="username">${window.currentUsername || 'أنت'}</span>
          <span class="text">${message}</span>
          <span class="time">${new Date().toLocaleTimeString('ar-TN', {hour: '2-digit', minute: '2-digit'})}</span>
        </div>
      `;
      chatContainer.appendChild(messageDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Store last message for replies
    window.lastMessage = message;
  },

  replyToMessage: (reply) => {
    console.log(`↩️ Reply sent: ${reply}`);
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      const replyDiv = document.createElement('div');
      replyDiv.className = 'message reply';
      replyDiv.innerHTML = `
        <div class="message-bubble">
          <div class="reply-to">رد على: "${window.lastMessage || 'رسالة سابقة'}"</div>
          <span class="username">${window.currentUsername || 'أنت'}</span>
          <span class="text">${reply}</span>
          <span class="time">${new Date().toLocaleTimeString('ar-TN', {hour: '2-digit', minute: '2-digit'})}</span>
        </div>
      `;
      chatContainer.appendChild(replyDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  },

  setUsername: (username) => {
    console.log(`👤 Username set to: ${username}`);
    window.currentUsername = username;
    
    // Update UI if exists
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
      usernameDisplay.textContent = username;
    }
  },

  addEmoji: (emoji) => {
    console.log(`😊 Emoji added: ${emoji}`);
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      const emojiDiv = document.createElement('div');
      emojiDiv.className = 'message emoji';
      emojiDiv.innerHTML = `
        <div class="message-bubble emoji-bubble">
          <span class="emoji-large">${emoji}</span>
          <span class="username">${window.currentUsername || 'أنت'}</span>
          <span class="time">${new Date().toLocaleTimeString('ar-TN', {hour: '2-digit', minute: '2-digit'})}</span>
        </div>
      `;
      chatContainer.appendChild(emojiDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  },

  waitForMessage: async () => {
    console.log('📨 Waiting for new message...');
    
    // Show waiting indicator
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      const waitingDiv = document.createElement('div');
      waitingDiv.className = 'message system';
      waitingDiv.id = 'waiting-indicator';
      waitingDiv.innerHTML = `
        <div class="message-bubble system-bubble">
          <span class="text">📨 في انتظار رسالة جديدة...</span>
        </div>
      `;
      chatContainer.appendChild(waitingDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Simulate waiting (in real app, this would listen for actual messages)
    await new Promise(resolve => {
      setTimeout(() => {
        // Remove waiting indicator
        const indicator = document.getElementById('waiting-indicator');
        if (indicator) {
          indicator.remove();
        }
        resolve();
      }, 2000);
    });
  },

  showTyping: async () => {
    console.log('⌨️ Showing typing indicator...');
    
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      const typingDiv = document.createElement('div');
      typingDiv.className = 'message system';
      typingDiv.id = 'typing-indicator';
      typingDiv.innerHTML = `
        <div class="message-bubble system-bubble">
          <span class="text">⌨️ ${window.currentUsername || 'أنت'} يكتب...</span>
        </div>
      `;
      chatContainer.appendChild(typingDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight;

      // Remove typing indicator after 2 seconds
      setTimeout(() => {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
          indicator.remove();
        }
      }, 2000);
    }
  },

  clearMessages: () => {
    console.log('🗑️ Clearing all messages');
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.innerHTML = `
        <div class="message system">
          <div class="message-bubble system-bubble">
            <span class="text">🗑️ تم مسح كل الرسائل</span>
          </div>
        </div>
      `;
    }
    
    // Clear stored data
    window.lastMessage = '';
  },

  setAutoReply: (replyType) => {
    console.log(`🤖 Auto reply set to: ${replyType}`);
    
    const autoReplies = {
      welcome: "أهلا وسهلا! 👋",
      thanks: "شكرا لك! 🙏",
      away: "معذرة، مش موجود حاليا 😔",
      howru: "كيفك؟ شلونك؟ 😊",
      bye: "باي! نشوفك قريب 👋"
    };

    const replyMessage = autoReplies[replyType] || "رد تلقائي";
    
    // Store auto reply for future use
    window.currentAutoReply = replyMessage;
    
    // Send the auto reply immediately as demonstration
    setTimeout(() => {
      window.runtimeFunctions?.sendMessage(`🤖 ${replyMessage}`);
    }, 1000);
  },

  say: (message) => {
    console.log(`💬 Character says: ${message}`);
    
    // Show speech bubble on stage
    const stage = document.querySelector('[class*="stage"]') || document.querySelector('.stage');
    if (stage) {
      // Remove any existing speech bubble
      const existingBubble = stage.querySelector('.speech-bubble');
      if (existingBubble) {
        existingBubble.remove();
      }
      
      const speechBubble = document.createElement('div');
      speechBubble.className = 'speech-bubble';
      speechBubble.textContent = message;
      speechBubble.style.cssText = `
        position: absolute;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        color: black;
        padding: 10px 15px;
        border-radius: 15px;
        border: 2px solid #9966FF;
        font-size: 14px;
        font-weight: bold;
        z-index: 1000;
        max-width: 200px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        word-wrap: break-word;
      `;
      
      stage.appendChild(speechBubble);
      
      // Remove speech bubble after 3 seconds
      setTimeout(() => {
        if (speechBubble && speechBubble.parentNode) {
          speechBubble.remove();
        }
      }, 3000);
    }
  }
};

export { javascriptGenerator };

// Make runtime functions available globally
if (typeof window !== 'undefined') {
  window.runtimeFunctions = runtimeFunctions;
}
