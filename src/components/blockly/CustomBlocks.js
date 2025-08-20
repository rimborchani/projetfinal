import * as Blockly from 'blockly/core';

// Event Blocks in Tunisian Arabic
Blockly.Blocks['event_whenflagclicked'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("كي")
        .appendField("🏁")
        .appendField("يتنقر");
    this.setNextStatement(true, null);
    this.setColour("#FF8C00");
    this.setTooltip("ابدا البرنامج كي يتنقر الراية الخضراء");
    this.setHelpUrl("");
  }
};

// Motion Blocks in Tunisian Arabic
Blockly.Blocks['motion_movesteps'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("تحرك")
        .appendField(new Blockly.FieldNumber(10, -Infinity, Infinity), "STEPS")
        .appendField("خطوة");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("حرك الشخصية للقدام بعدد الخطوات المحدد");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['motion_turnright'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("دور")
        .appendField("↻")
        .appendField("يمين")
        .appendField(new Blockly.FieldNumber(15, -Infinity, Infinity), "DEGREES")
        .appendField("درجة");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("دور الشخصية لليمين بالدرجات المحددة");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['motion_turnleft'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("دور")
        .appendField("↺")
        .appendField("يسار")
        .appendField(new Blockly.FieldNumber(15, -Infinity, Infinity), "DEGREES")
        .appendField("درجة");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("دور الشخصية لليسار بالدرجات المحددة");
    this.setHelpUrl("");
  }
};

// Control Blocks in Tunisian Arabic
Blockly.Blocks['control_repeat'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("كرر")
        .appendField(new Blockly.FieldNumber(10, 1, Infinity), "TIMES")
        .appendField("مرة");
    this.appendStatementInput("SUBSTACK")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FFAB19");
    this.setTooltip("كرر البلوكات اللي لوطا بالعدد المحدد من المرات");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['control_forever'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("كرر دايما");
    this.appendStatementInput("SUBSTACK")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setColour("#FFAB19");
    this.setTooltip("كرر البلوكات اللي لوطا للأبد");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['control_wait'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("استنى")
        .appendField(new Blockly.FieldNumber(1, 0, Infinity), "DURATION")
        .appendField("ثانية");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FFAB19");
    this.setTooltip("استنى للمدة المحددة بالثواني");
    this.setHelpUrl("");
  }
};

// Looks Blocks in Tunisian Arabic
Blockly.Blocks['looks_say'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("قول")
        .appendField(new Blockly.FieldTextInput("أهلا!"), "MESSAGE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9966FF");
    this.setTooltip("خلي الشخصية تقول شي");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['looks_hide'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("اختفي");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9966FF");
    this.setTooltip("اخفي الشخصية");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['looks_show'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ابان");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#9966FF");
    this.setTooltip("أظهر الشخصية");
    this.setHelpUrl("");
  }
};

// Sound Blocks in Tunisian Arabic
Blockly.Blocks['sound_play'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎵")
        .appendField("اعزف")
        .appendField(new Blockly.FieldDropdown([
          ["طبول", "drums"],
          ["غيتار", "guitar"], 
          ["بيانو", "piano"],
          ["فلوت", "flute"],
          ["ترومبيت", "trumpet"]
        ]), "SOUND");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#D65CD6");
    this.setTooltip("اعزف صوت موسيقي");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sound_play_note'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎹")
        .appendField("اعزف نوتة")
        .appendField(new Blockly.FieldDropdown([
          ["دو", "C"],
          ["ري", "D"],
          ["مي", "E"],
          ["فا", "F"],
          ["صول", "G"],
          ["لا", "A"],
          ["سي", "B"]
        ]), "NOTE")
        .appendField("لمدة")
        .appendField(new Blockly.FieldNumber(0.5, 0.1, 4), "DURATION")
        .appendField("ثانية");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#D65CD6");
    this.setTooltip("اعزف نوتة موسيقية لمدة معينة");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sound_play_drum'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🥁")
        .appendField("اضرب طبلة")
        .appendField(new Blockly.FieldDropdown([
          ["باص", "bass"],
          ["سنير", "snare"],
          ["هاي هات", "hihat"],
          ["كراش", "crash"],
          ["كيك", "kick"]
        ]), "DRUM");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#D65CD6");
    this.setTooltip("اضرب نوع من الطبول");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sound_set_volume'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔊")
        .appendField("حط مستوى الصوت على")
        .appendField(new Blockly.FieldNumber(50, 0, 100), "VOLUME")
        .appendField("%");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#D65CD6");
    this.setTooltip("غير مستوى الصوت من 0 إلى 100");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sound_change_volume'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔊")
        .appendField("زيد في مستوى الصوت")
        .appendField(new Blockly.FieldNumber(10, -100, 100), "CHANGE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#D65CD6");
    this.setTooltip("زيد أو انقص من مستوى الصوت");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sound_stop_all'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⏹️")
        .appendField("وقف كل الأصوات");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#D65CD6");
    this.setTooltip("وقف كل الأصوات اللي تعزف");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sound_play_sound_until_done'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎧")
        .appendField("اعزف الصوت")
        .appendField(new Blockly.FieldDropdown([
          ["صافرة", "whistle"],
          ["جرس", "bell"],
          ["تصفيق", "clap"],
          ["ضحك", "laugh"],
          ["زقزقة عصفور", "bird"]
        ]), "SOUND")
        .appendField("لين يكمل");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#D65CD6");
    this.setTooltip("اعزف الصوت واستنى لين يكمل");
    this.setHelpUrl("");
  }
};

// Chat Blocks in Tunisian Arabic
Blockly.Blocks['chat_send_message'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("💬")
        .appendField("ابعث رسالة")
        .appendField(new Blockly.FieldTextInput("أهلا!"), "MESSAGE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00BCD4");
    this.setTooltip("ابعث رسالة في الشات");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['chat_reply_to_message'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("↩️")
        .appendField("رد على الرسالة")
        .appendField(new Blockly.FieldTextInput("شكرا!"), "REPLY");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00BCD4");
    this.setTooltip("رد على آخر رسالة");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['chat_set_username'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("👤")
        .appendField("حط اسم المستخدم")
        .appendField(new Blockly.FieldTextInput("أحمد"), "USERNAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00BCD4");
    this.setTooltip("حط اسم المستخدم متاعك");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['chat_add_emoji'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("😊")
        .appendField("زيد إيموجي")
        .appendField(new Blockly.FieldDropdown([
          ["😀", "😀"],
          ["😂", "😂"],
          ["❤️", "❤️"],
          ["👍", "👍"],
          ["🔥", "🔥"],
          ["💯", "💯"],
          ["🎉", "🎉"],
          ["👏", "👏"]
        ]), "EMOJI");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00BCD4");
    this.setTooltip("زيد إيموجي للرسالة");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['chat_wait_for_message'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📨")
        .appendField("استنى رسالة جديدة");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00BCD4");
    this.setTooltip("استنى لين تجي رسالة جديدة");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['chat_show_typing'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⌨️")
        .appendField("أظهر")
        .appendField('"')
        .appendField("يكتب...")
        .appendField('"');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00BCD4");
    this.setTooltip("أظهر إنك تكتب رسالة");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['chat_clear_messages'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🗑️")
        .appendField("امسح كل الرسائل");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00BCD4");
    this.setTooltip("امسح كل الرسائل من الشات");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['chat_auto_reply'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🤖")
        .appendField("رد تلقائي")
        .appendField(new Blockly.FieldDropdown([
          ["أهلا وسهلا", "welcome"],
          ["شكرا لك", "thanks"],
          ["معذرة، مش موجود", "away"],
          ["كيفك؟", "howru"],
          ["باي!", "bye"]
        ]), "AUTO_REPLY");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#00BCD4");
    this.setTooltip("رد تلقائي على الرسائل");
    this.setHelpUrl("");
  }
};

export default {
  // Export all custom blocks
  initializeBlocks: () => {
    // All blocks are already defined above
    console.log('بلوكات تعليمية مخصصة تم تهيئتها');
  }
};
