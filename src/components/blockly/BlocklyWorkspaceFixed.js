'use client';

import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import { javascriptGenerator } from 'blockly/javascript';
import './CustomBlocks';

export default function BlocklyWorkspace({ toolboxCategories, onWorkspaceChange }) {
  const blocklyDiv = useRef(null);
  const workspace = useRef(null);

  useEffect(() => {
    if (blocklyDiv.current && !workspace.current) {
      // Simple toolbox configuration that works
      const toolbox = {
        kind: 'categoryToolbox',
        contents: [
          {
            kind: 'category',
            name: 'Events',
            colour: '210',
            contents: [
              {
                kind: 'block',
                type: 'event_whenflagclicked'
              }
            ]
          },
          {
            kind: 'category', 
            name: 'Motion',
            colour: '260',
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
            name: 'Control', 
            colour: '120',
            contents: [
              {
                kind: 'block',
                type: 'control_repeat',
                fields: {
                  TIMES: 10
                }
              }
            ]
          }
        ]
      };

      try {
        workspace.current = Blockly.inject(blocklyDiv.current, {
          toolbox: toolbox,
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

        // Pass workspace to parent
        if (onWorkspaceChange) {
          onWorkspaceChange(workspace.current);
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
  }, [toolboxCategories, onWorkspaceChange]);

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
