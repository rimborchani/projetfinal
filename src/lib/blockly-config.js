import * as Blockly from 'blockly/core';

export const BLOCKLY_CONFIG = {
  toolbox: {
    kind: 'categoryToolbox',
    contents: []
  },
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 0.9,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
  },
  trashcan: true,
  scrollbars: true,
  sounds: false,
  horizontalLayout: false,
  toolboxPosition: 'start',
  css: true,
  media: 'https://unpkg.com/blockly/media/',
  rtl: false
};

export const createEducationalTheme = () => {
  return Blockly.Theme.defineTheme('educational', {
    'base': Blockly.Themes.Classic,
    'blockStyles': {
      'event_blocks': {
        'colourPrimary': '#FF8C00',
        'colourSecondary': '#FF7F00',
        'colourTertiary': '#FF6500'
      },
      'motion_blocks': {
        'colourPrimary': '#4C97FF',
        'colourSecondary': '#4280D7',
        'colourTertiary': '#3373DC'
      },
      'control_blocks': {
        'colourPrimary': '#FFAB19',
        'colourSecondary': '#EC9C13',
        'colourTertiary': '#CF8B17'
      },
      'looks_blocks': {
        'colourPrimary': '#9966FF',
        'colourSecondary': '#855CD6',
        'colourTertiary': '#774DCB'
      },
      'sound_blocks': {
        'colourPrimary': '#D65CD6',
        'colourSecondary': '#C44DC4',
        'colourTertiary': '#B23DB2'
      },
      'chat_blocks': {
        'colourPrimary': '#00BCD4',
        'colourSecondary': '#00ACC1',
        'colourTertiary': '#0097A7'
      }
    },
    'categoryStyles': {
      'event_category': {
        'colour': '#FF8C00'
      },
      'motion_category': {
        'colour': '#4C97FF'
      },
      'control_category': {
        'colour': '#FFAB19'
      },
      'looks_category': {
        'colour': '#9966FF'
      },
      'sound_category': {
        'colour': '#D65CD6'
      },
      'chat_category': {
        'colour': '#00BCD4'
      }
    }
  });
};
