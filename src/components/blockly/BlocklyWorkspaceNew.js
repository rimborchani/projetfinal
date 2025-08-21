'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import { javascriptGenerator } from 'blockly/javascript';
import './CustomBlocks';
import './CodeGenerator';
import BlocklyTranslationSync from './BlocklyTranslationSync';
import '../../styles/blockly-custom.css';

export default function BlocklyWorkspace({ toolboxCategories, onWorkspaceChange }) {
  const { t, language } = useLanguage();
  const blocklyDiv = useRef(null);
  const workspace = useRef(null);
  const onWorkspaceChangeRef = useRef(onWorkspaceChange);

  // Update the ref when the callback changes
  useEffect(() => {
    onWorkspaceChangeRef.current = onWorkspaceChange;
  }, [onWorkspaceChange]);

  // Function to create translated toolbox
  const createToolbox = () => ({
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: `🏁 ${t('events')}`,
        colour: '#FF8C00',
        contents: [
          {
            kind: 'block',
            type: 'event_whenflagclicked'
          }
        ]
      },
      {
        kind: 'category', 
        name: `🏃 ${t('motion')}`,
        colour: '#4C97FF',
        contents: [
          {
            kind: 'block',
            type: 'motion_movesteps',
            fields: {
              STEPS: 10
            }
          },
          {
            kind: 'block',
            type: 'motion_turnright',
            fields: {
              DEGREES: 15
            }
          },
          {
            kind: 'block',
            type: 'motion_turnleft',
            fields: {
              DEGREES: 15
            }
          }
        ]
      },
      {
        kind: 'category',
        name: `🎮 ${t('control')}`,
        colour: '#FFAB19',
        contents: [
          {
            kind: 'block',
            type: 'control_repeat',
            fields: {
              TIMES: 10
            }
          },
          {
            kind: 'block',
            type: 'control_forever'
          },
          {
            kind: 'block',
            type: 'control_wait',
            fields: {
              DURATION: 1
            }
          }
        ]
      },
      {
        kind: 'category',
        name: `✨ ${t('looks')}`,
        colour: '#9966FF',
        contents: [
          {
            kind: 'block',
            type: 'looks_say',
            fields: {
              MESSAGE: language === 'tn' ? 'أهلا!' : 'Bonjour!'
            }
          },
          {
            kind: 'block',
            type: 'looks_hide'
          },
          {
            kind: 'block',
            type: 'looks_show'
          }
        ]
      },
      {
        kind: 'category',
        name: `🎵 ${t('sound')}`,
        colour: '#D65CD6',
        contents: [
          {
            kind: 'block',
            type: 'sound_play',
            fields: {
              SOUND: 'piano'
            }
          },
          {
            kind: 'block',
            type: 'sound_play_note',
            fields: {
              NOTE: 'C',
              DURATION: 0.5
            }
          },
          {
            kind: 'block',
            type: 'sound_play_drum',
            fields: {
              DRUM: 'kick'
            }
          },
          {
            kind: 'block',
            type: 'sound_set_volume',
            fields: {
              VOLUME: 50
            }
          },
          {
            kind: 'block',
            type: 'sound_change_volume',
            fields: {
              VOLUME: 10
            }
          },
          {
            kind: 'block',
            type: 'sound_play_sound_until_done',
            fields: {
              SOUND: 'bell'
            }
          },
          {
            kind: 'block',
            type: 'sound_stop_all_sounds'
          }
        ]
      },
      {
        kind: 'category',
        name: `💬 ${t('chat')}`,
        colour: '#00BCD4',
        contents: [
          {
            kind: 'block',
            type: 'chat_send_message',
            fields: {
              MESSAGE: language === 'tn' ? 'أهلا!' : 'Salut!'
            }
          },
          {
            kind: 'block',
            type: 'chat_reply_to_message',
            fields: {
              REPLY: language === 'tn' ? 'شكرا!' : 'Merci!'
            }
          },
          {
            kind: 'block',
            type: 'chat_set_username',
            fields: {
              USERNAME: language === 'tn' ? 'أحمد' : 'Ahmed'
            }
          },
          {
            kind: 'block',
            type: 'chat_add_emoji',
            fields: {
              EMOJI: '😀'
            }
          },
          {
            kind: 'block',
            type: 'chat_wait_for_message'
          },
          {
            kind: 'block',
            type: 'chat_show_typing'
          },
          {
            kind: 'block',
            type: 'chat_clear_messages'
          },
          {
            kind: 'block',
            type: 'chat_auto_reply',
            fields: {
              AUTO_REPLY: 'welcome'
            }
          }
        ]
      }
    ]
  });

  useEffect(() => {
    if (blocklyDiv.current && !workspace.current) {
      try {
        const toolbox = createToolbox();
        
        // Initialize Blockly workspace with enhanced configuration
        workspace.current = Blockly.inject(blocklyDiv.current, {
          toolbox: toolbox,
          collapse: true,
          comments: true,
          disable: true,
          maxBlocks: Infinity,
          trashcan: true,
          horizontalLayout: false,
          toolboxPosition: 'start',
          css: true,
          rtl: false,
          scrollbars: true,
          sounds: true,
          oneBasedIndex: true,
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
            minScale: 0.3,
            scaleSpeed: 1.2,
            pinch: true
          },
          move: {
            scrollbars: {
              horizontal: true,
              vertical: true
            },
            drag: true,
            wheel: false
          }
        });

        // Pass workspace instance to parent
        if (onWorkspaceChangeRef.current) {
          onWorkspaceChangeRef.current(workspace.current);
        }

        // Add event listener for workspace changes
        workspace.current.addChangeListener(() => {
          if (onWorkspaceChangeRef.current) {
            onWorkspaceChangeRef.current(workspace.current);
          }
        });

        console.log('Blockly workspace initialized successfully');
      } catch (error) {
        console.error('Error initializing Blockly workspace:', error);
      }
    }

    return () => {
      if (workspace.current) {
        workspace.current.dispose();
        workspace.current = null;
      }
    };
  }, [language]); // Re-create workspace when language changes

  // Update toolbox when language changes
  useEffect(() => {
    if (workspace.current) {
      const newToolbox = createToolbox();
      workspace.current.updateToolbox(newToolbox);
    }
  }, [language, t]);

  return (
    <div className="w-full h-full">
      <BlocklyTranslationSync />
      <div
        ref={blocklyDiv}
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}
