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

  // Function to create toolbox
  const createToolbox = () => ({
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: `🏁 Events`,
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
        name: `🏃 Motion`,
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
        name: `🎮 Control`,
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
        name: `✨ Looks`,
        colour: '#9966FF',
        contents: [
          {
            kind: 'block',
            type: 'looks_say',
            fields: {
              MESSAGE: 'Hello!'
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
        name: `🎵 Sound`,
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
            type: 'sound_stop_all'
          }
        ]
      },
      {
        kind: 'category',
        name: `💬 Chat`,
        colour: '#00BCD4',
        contents: [
          {
            kind: 'block',
            type: 'chat_send_message',
            fields: {
              MESSAGE: 'Hello!'
            }
          },
          {
            kind: 'block',
            type: 'chat_reply_to_message',
            fields: {
              REPLY: 'Thank you!'
            }
          },
          {
            kind: 'block',
            type: 'chat_set_username',
            fields: {
              USERNAME: 'Student'
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

        // Force apply custom styles to Blockly toolbox
        setTimeout(() => {
          applyCustomBlocklyStyles();
        }, 100);

        setTimeout(() => {
          applyCustomBlocklyStyles();
        }, 500);

        setTimeout(() => {
          applyCustomBlocklyStyles();
        }, 1000);

        // Set up observer to watch for new Blockly elements
        const observer = new MutationObserver(() => {
          applyCustomBlocklyStyles();
        });

        // Observe changes to the blockly div
        if (blocklyDiv.current) {
          observer.observe(blocklyDiv.current, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
          });
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
  }, []);

  // Function to force apply custom styles
  const applyCustomBlocklyStyles = () => {
    try {
      // Apply styles to toolbox categories
      const treeRows = document.querySelectorAll('.blocklyTreeRow');
      treeRows.forEach(row => {
        row.style.cssText = `
          background: linear-gradient(145deg, #ffffff, #f8fafc) !important;
          color: #1e293b !important;
          padding: 16px 20px !important;
          margin: 8px 12px !important;
          border-radius: 15px !important;
          border: 3px solid transparent !important;
          box-shadow: 0 6px 12px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9) !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          cursor: pointer !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
        `;
        
        // Add hover listeners
        row.addEventListener('mouseenter', () => {
          if (!row.classList.contains('blocklyTreeRowSelected')) {
            row.style.cssText += `
              background: linear-gradient(145deg, #f1f5f9, #e2e8f0) !important;
              border-color: #3b82f6 !important;
              box-shadow: 0 12px 24px rgba(59, 130, 246, 0.2), 0 6px 12px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255,255,255,1) !important;
              transform: translateY(-4px) scale(1.05) !important;
            `;
          }
        });
        
        row.addEventListener('mouseleave', () => {
          if (!row.classList.contains('blocklyTreeRowSelected')) {
            row.style.cssText = `
              background: linear-gradient(145deg, #ffffff, #f8fafc) !important;
              color: #1e293b !important;
              padding: 16px 20px !important;
              margin: 8px 12px !important;
              border-radius: 15px !important;
              border: 3px solid transparent !important;
              box-shadow: 0 6px 12px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9) !important;
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
              cursor: pointer !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
              font-weight: 700 !important;
              text-transform: uppercase !important;
              letter-spacing: 1px !important;
              transform: translateY(0) scale(1) !important;
            `;
          }
        });
      });

      // Apply styles to selected rows
      const selectedRows = document.querySelectorAll('.blocklyTreeRowSelected');
      selectedRows.forEach(row => {
        row.style.cssText = `
          background: linear-gradient(145deg, #3b82f6, #2563eb) !important;
          color: #ffffff !important;
          border-color: #1d4ed8 !important;
          padding: 16px 20px !important;
          margin: 8px 12px !important;
          border-radius: 15px !important;
          border: 3px solid #1d4ed8 !important;
          box-shadow: 0 12px 30px rgba(59, 130, 246, 0.5), 0 6px 15px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2) !important;
          transform: translateY(-2px) scale(1.02) !important;
          cursor: pointer !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 1px !important;
        `;
      });

      // Apply styles to labels
      const labels = document.querySelectorAll('.blocklyTreeLabel');
      labels.forEach(label => {
        label.style.cssText = `
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          font-size: 16px !important;
          font-weight: 800 !important;
          text-transform: uppercase !important;
          letter-spacing: 1.2px !important;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
        `;
      });

      console.log('Custom Blockly styles applied successfully');
    } catch (error) {
      console.error('Error applying custom Blockly styles:', error);
    }
  };

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
