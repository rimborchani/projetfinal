'use client';

import { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import * as Blockly from 'blockly/core';

// Function to update block definitions with translations
const updateBlockDefinitions = (t) => {
  // Event Blocks
  if (Blockly.Blocks['event_whenflagclicked']) {
    Blockly.Blocks['event_whenflagclicked'].init = function() {
      this.appendDummyInput()
          .appendField(t('when_flag_clicked_text').replace('🏁', ''))
          .appendField("🏁")
          .appendField(t('when_flag_clicked_text').includes('يتنقر') ? 'يتنقر' : '');
      this.setNextStatement(true, null);
      this.setColour("#FF8C00");
      this.setTooltip(t('when_flag_clicked_text'));
      this.setHelpUrl("");
    };
  }
  
  // Motion Blocks
  if (Blockly.Blocks['motion_movesteps']) {
    Blockly.Blocks['motion_movesteps'].init = function() {
      const text = t('move_steps_text');
      const parts = text.split('{}');
      this.appendDummyInput()
          .appendField(parts[0] || "تحرك")
          .appendField(new Blockly.FieldNumber(10, -Infinity, Infinity), "STEPS")
          .appendField(parts[1] || "خطوة");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#4C97FF");
      this.setTooltip(text);
      this.setHelpUrl("");
    };
  }

  // Control Blocks
  if (Blockly.Blocks['control_repeat']) {
    Blockly.Blocks['control_repeat'].init = function() {
      const text = t('repeat_text');
      const parts = text.split('{}');
      this.appendDummyInput()
          .appendField(parts[0] || "كرر")
          .appendField(new Blockly.FieldNumber(10, 1, Infinity), "TIMES")
          .appendField(parts[1] || "مرة");
      this.appendStatementInput("SUBSTACK")
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#FFAB19");
      this.setTooltip(text);
      this.setHelpUrl("");
    };
  }

  if (Blockly.Blocks['control_wait']) {
    Blockly.Blocks['control_wait'].init = function() {
      const text = t('wait_text');
      const parts = text.split('{}');
      this.appendDummyInput()
          .appendField(parts[0] || "استنى")
          .appendField(new Blockly.FieldNumber(1, 0, Infinity), "DURATION")
          .appendField(parts[1] || "ثانية");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#FFAB19");
      this.setTooltip(text);
      this.setHelpUrl("");
    };
  }

  // Sound Blocks
  if (Blockly.Blocks['sound_play']) {
    Blockly.Blocks['sound_play'].init = function() {
      const text = t('play_sound_text');
      this.appendDummyInput()
          .appendField("🎵")
          .appendField(text.replace('🎵', '').replace('{}', ''))
          .appendField(new Blockly.FieldDropdown([
            [t('piano'), "piano"],
            [t('guitar'), "guitar"],
            [t('drums'), "drums"],
            [t('flute'), "flute"],
            [t('trumpet'), "trumpet"]
          ]), "SOUND");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#D65CD6");
      this.setTooltip(text);
      this.setHelpUrl("");
    };
  }

  // Looks Blocks
  if (Blockly.Blocks['looks_say']) {
    Blockly.Blocks['looks_say'].init = function() {
      const text = t('say_text');
      this.appendDummyInput()
          .appendField(text.replace('{}', ''))
          .appendField(new Blockly.FieldTextInput(t('language') === 'tn' ? "أهلا!" : "Bonjour!"), "MESSAGE");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#9966FF");
      this.setTooltip(text);
      this.setHelpUrl("");
    };
  }
};

export default function BlocklyTranslationSync() {
  const { t, language } = useLanguage();

  useEffect(() => {
    // Update block definitions when language changes
    updateBlockDefinitions(t);
    
    // Force refresh of any existing Blockly workspace
    const workspace = Blockly.getMainWorkspace();
    if (workspace) {
      // Clear and rebuild toolbox
      workspace.updateToolbox(workspace.options.toolbox);
    }
  }, [language, t]);

  return null; // This is a utility component, no UI
}
