import * as Blockly from 'blockly/core';

export const BLOCKLY_CONFIG = {
  toolbox: {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: 'الأحداث',
        categorystyle: 'event_category',
        contents: [
          {
            kind: 'block',
            type: 'event_whenflagclicked'
          }
        ]
      },
      {
        kind: 'category', 
        name: 'الحركة',
        categorystyle: 'motion_category',
        contents: [
          {
            kind: 'block',
            type: 'motion_movesteps'
          },
          {
            kind: 'block',
            type: 'motion_turnright'
          },
          {
            kind: 'block',
            type: 'motion_turnleft'
          },
          {
            kind: 'block',
            type: 'motion_goto'
          },
          {
            kind: 'block',
            type: 'motion_glide'
          },
          {
            kind: 'block',
            type: 'motion_point_direction'
          },
          {
            kind: 'block',
            type: 'motion_point_towards'
          },
          {
            kind: 'block',
            type: 'motion_change_x'
          },
          {
            kind: 'block',
            type: 'motion_change_y'
          },
          {
            kind: 'block',
            type: 'motion_set_x'
          },
          {
            kind: 'block',
            type: 'motion_set_y'
          },
          {
            kind: 'block',
            type: 'motion_if_on_edge_bounce'
          },
          {
            kind: 'block',
            type: 'motion_set_rotation_style'
          },
          {
            kind: 'block',
            type: 'motion_move_forward'
          },
          {
            kind: 'block',
            type: 'motion_move_backward'
          }
        ]
      },
      {
        kind: 'category',
        name: 'الظهور',
        categorystyle: 'looks_category',
        contents: [
          {
            kind: 'block',
            type: 'looks_say'
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
        name: 'الصوت',
        categorystyle: 'sound_category',
        contents: [
          {
            kind: 'block',
            type: 'sound_play'
          },
          {
            kind: 'block',
            type: 'sound_play_note'
          },
          {
            kind: 'block',
            type: 'sound_play_drum'
          },
          {
            kind: 'block',
            type: 'sound_set_volume'
          },
          {
            kind: 'block',
            type: 'sound_change_volume'
          },
          {
            kind: 'block',
            type: 'sound_stop_all'
          },
          {
            kind: 'block',
            type: 'sound_play_sound_until_done'
          }
        ]
      },
      {
        kind: 'category',
        name: 'التحكم',
        categorystyle: 'control_category',
        contents: [
          {
            kind: 'block',
            type: 'control_wait'
          },
          {
            kind: 'block',
            type: 'control_repeat'
          },
          {
            kind: 'block',
            type: 'control_forever'
          }
        ]
      },
      {
        kind: 'category',
        name: 'الشات',
        categorystyle: 'chat_category',
        contents: [
          {
            kind: 'block',
            type: 'chat_send_message'
          },
          {
            kind: 'block',
            type: 'chat_reply_to_message'
          },
          {
            kind: 'block',
            type: 'chat_set_username'
          },
          {
            kind: 'block',
            type: 'chat_add_emoji'
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
            type: 'chat_auto_reply'
          }
        ]
      }
    ]
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
