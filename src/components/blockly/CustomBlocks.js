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

// Advanced Motion Blocks
Blockly.Blocks['motion_goto'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🎯")
        .appendField("روح للموقع")
        .appendField("س:")
        .appendField(new Blockly.FieldNumber(0, -240, 240), "X")
        .appendField("ص:")
        .appendField(new Blockly.FieldNumber(0, -180, 180), "Y");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("روح مباشرة للموقع المحدد بالإحداثيات");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['motion_glide'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("✈️")
        .appendField("اطلع في")
        .appendField(new Blockly.FieldNumber(1, 0, 10), "SECS")
        .appendField("ثانية")
        .appendField("للموقع س:")
        .appendField(new Blockly.FieldNumber(0, -240, 240), "X")
        .appendField("ص:")
        .appendField(new Blockly.FieldNumber(0, -180, 180), "Y");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("اطلع بسلاسة للموقع المحدد في المدة المعطاة");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['motion_point_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🧭")
        .appendField("اتجه نحو")
        .appendField(new Blockly.FieldNumber(90, -179, 180), "DIRECTION")
        .appendField("درجة");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("اتجه نحو الاتجاه المحدد (90=يمين، -90=يسار، 0=فوق، 180=تحت)");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['motion_point_towards'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("👀")
        .appendField("اتجه نحو")
        .appendField(new Blockly.FieldDropdown([
          ["مؤشر الفأرة", "mouse"],
          ["وسط الشاشة", "center"],
          ["اللاعب", "player"],
          ["العدو", "enemy"],
          ["الهدف", "target"]
        ]), "TARGET");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("اتجه نحو الكائن أو المكان المحدد");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['motion_change_x'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄")
        .appendField("غير س بـ")
        .appendField(new Blockly.FieldNumber(10, -Infinity, Infinity), "DX");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("غير موقع س (الأفقي) بالقيمة المحددة");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['motion_change_y'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄")
        .appendField("غير ص بـ")
        .appendField(new Blockly.FieldNumber(10, -Infinity, Infinity), "DY");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("غير موقع ص (العمودي) بالقيمة المحددة");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['motion_set_x'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📍")
        .appendField("حط س على")
        .appendField(new Blockly.FieldNumber(0, -240, 240), "X");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("حط الموقع الأفقي (س) على القيمة المحددة");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['motion_set_y'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("📍")
        .appendField("حط ص على")
        .appendField(new Blockly.FieldNumber(0, -180, 180), "Y");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("حط الموقع العمودي (ص) على القيمة المحددة");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['motion_if_on_edge_bounce'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🏀")
        .appendField("إذا لمست الحافة، ارتد");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("إذا وصلت لحافة الشاشة، ارتد للاتجاه المعاكس");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['motion_set_rotation_style'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("🔄")
        .appendField("حط نمط الدوران على")
        .appendField(new Blockly.FieldDropdown([
          ["كل الاتجاهات", "all around"],
          ["يمين-يسار فقط", "left-right"],
          ["لا تدور", "don't rotate"]
        ]), "STYLE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("اختر كيفية دوران الشخصية عند تغيير الاتجاه");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['motion_move_forward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⬆️")
        .appendField("تحرك للأمام")
        .appendField(new Blockly.FieldNumber(10, -Infinity, Infinity), "STEPS")
        .appendField("خطوة");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("تحرك للأمام في الاتجاه الحالي");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['motion_move_backward'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("⬇️")
        .appendField("تحرك للخلف")
        .appendField(new Blockly.FieldNumber(10, -Infinity, Infinity), "STEPS")
        .appendField("خطوة");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#4C97FF");
    this.setTooltip("تحرك للخلف في الاتجاه المعاكس");
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
