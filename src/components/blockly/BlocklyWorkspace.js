'use client';

import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import { javascriptGenerator } from 'blockly/javascript';
import './CustomBlocks';
import './CodeGenerator';
import '../../styles/blockly-custom.css';

export default function BlocklyWorkspace({ toolboxCategories, onWorkspaceChange }) {
  const blocklyDiv = useRef(null);
  const workspace = useRef(null);
  const onWorkspaceChangeRef = useRef(onWorkspaceChange);

  // Update the ref when the callback changes
  useEffect(() => {
    onWorkspaceChangeRef.current = onWorkspaceChange;
  }, [onWorkspaceChange]);

  useEffect(() => {
    if (blocklyDiv.current && !workspace.current) {
      // Enhanced colorful toolbox configuration
      const toolbox = {
        kind: 'categoryToolbox',
        contents: [
          {
            kind: 'category',
            name: '🏁 أحداث',
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
            name: '🏃 حركة',
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
            name: '🎮 تحكم', 
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
            name: '✨ مظهر',
            colour: '#9966FF',
            contents: [
              {
                kind: 'block',
                type: 'looks_say',
                fields: {
                  MESSAGE: 'أهلا!'
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
            name: '🎵 صوت',
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
                  CHANGE: 10
                }
              },
              {
                kind: 'block',
                type: 'sound_stop_all'
              },
              {
                kind: 'block',
                type: 'sound_play_sound_until_done',
                fields: {
                  SOUND: 'bell'
                }
              }
            ]
          },
          {
            kind: 'category',
            name: '💬 شات',
            colour: '#00BCD4',
            contents: [
              {
                kind: 'block',
                type: 'chat_send_message',
                fields: {
                  MESSAGE: 'أهلا!'
                }
              },
              {
                kind: 'block',
                type: 'chat_reply_to_message',
                fields: {
                  REPLY: 'شكرا!'
                }
              },
              {
                kind: 'block',
                type: 'chat_set_username',
                fields: {
                  USERNAME: 'أحمد'
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
      };

      try {      workspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: toolbox,
        rtl: true, // Enable RTL layout
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 0.8,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2
        },
        trashcan: true,
        scrollbars: true,
        sounds: false
      });

        // Force immediate styling after workspace creation
        setTimeout(() => {
          const toolboxDiv = document.querySelector('.blocklyToolboxDiv');
          if (toolboxDiv) {
            const isDark = document.documentElement.classList.contains('dark');
            
            // Force toolbox styling
            toolboxDiv.style.cssText = `
              background-color: ${isDark ? '#0f172a' : '#f8fafc'} !important;
              color: ${isDark ? '#f1f5f9' : '#1e293b'} !important;
              border-right: 2px solid ${isDark ? '#334155' : '#e2e8f0'} !important;
              width: 220px !important;
            `;
            
            // Force category row styling
            toolboxDiv.querySelectorAll('.blocklyTreeRow').forEach(row => {
              row.style.cssText = `
                background-color: ${isDark ? '#1e293b' : '#ffffff'} !important;
                color: ${isDark ? '#f1f5f9' : '#1e293b'} !important;
                border: 1px solid ${isDark ? '#334155' : '#e2e8f0'} !important;
                padding: 12px 16px !important;
                margin: 4px 8px !important;
                border-radius: 8px !important;
              `;
            });
            
            // Force label styling
            toolboxDiv.querySelectorAll('.blocklyTreeLabel').forEach(label => {
              label.style.cssText = `
                color: ${isDark ? '#f1f5f9' : '#1e293b'} !important;
                font-weight: 600 !important;
                font-size: 14px !important;
                opacity: 1 !important;
              `;
            });
          }
        }, 100);

        // Pass workspace to parent
        if (onWorkspaceChangeRef.current) {
          onWorkspaceChangeRef.current(workspace.current);
        }

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
  }, [toolboxCategories]); // Remove onWorkspaceChange from dependencies

  return (
    <div className="w-full h-full">
      <div
        ref={blocklyDiv}
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}
