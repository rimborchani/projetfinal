// Generic, safe simulator for Blockly/Scratch-like blocks
// Simulates the final state without eval, by mapping block types to actions

// State model for the sprite/environment
export function createInitialState() {
  return {
    x: 0,
    y: 0,
    direction: 90, // Scratch default: 90 (pointing right). Adjust if your system differs
    time: 0,
    messages: [], // looks_say history (strings)
    visible: true,
    rotationStyle: 'all around',
    volume: 50,
    sound: {
      last: null,
      playing: [], // list of sound ids currently playing
      note: null, // { note, duration }
      drum: null // last drum id
    },
    chat: {
      username: '',
      messages: [], // sent messages
      emojis: [], // added emojis
      typing: false,
      cleared: 0,
      autoReply: null
    },
    logs: [],
    stepsExecuted: 0,
  };
}

// Main entry: simulate all stacks starting from the first event block, or all top stacks
export function simulateWorkspace(workspace, options = {}) {
  const state = createInitialState();
  const maxSteps = options.maxSteps ?? 10000;
  const topBlocks = workspace.getTopBlocks(true);

  // Prefer starting from an event_whenflagclicked stack if present
  const startBlocks = [];
  const flag = topBlocks.find(b => b.type === 'event_whenflagclicked');
  if (flag) startBlocks.push(flag); else startBlocks.push(...topBlocks);

  for (const start of startBlocks) {
    executeChain(start, state, { maxSteps });
  }

  return state;
}

function executeChain(block, state, ctx) {
  let current = block;
  while (current && state.stepsExecuted < ctx.maxSteps) {
    executeBlock(current, state, ctx);
    state.stepsExecuted++;
    current = current.getNextBlock();
  }
}

function executeBlock(block, state, ctx) {
  switch (block.type) {
    case 'motion_movesteps': {
      const raw = safeField(block, 'STEPS', '0');
      const steps = toNumber(raw, 0);
      moveForward(state, steps);
      log(state, `move ${steps}`);
      break;
    }
    case 'motion_turnright': {
      const raw = safeField(block, 'DEGREES', '0');
      const deg = toNumber(raw, 0);
      state.direction = normalizeDeg(state.direction + deg);
      log(state, `turn right ${deg}`);
      break;
    }
    case 'motion_turnleft': {
      const raw = safeField(block, 'DEGREES', '0');
      const deg = toNumber(raw, 0);
      state.direction = normalizeDeg(state.direction - deg);
      log(state, `turn left ${deg}`);
      break;
    }
    case 'motion_point_direction': {
      const deg = toNumber(safeField(block, 'DIRECTION', `${state.direction}`), state.direction);
      state.direction = normalizeDeg(deg);
      log(state, `point direction ${deg}`);
      break;
    }
    case 'motion_point_towards': {
      const target = safeField(block, 'TARGET', 'center');
      if (target === 'center') {
        // angle from current (x,y) to origin (0,0)
        const ang = Math.atan2(0 - state.y, 0 - state.x) * 180 / Math.PI;
        state.direction = normalizeDeg(ang);
      } else {
        // For unsupported targets, leave as-is but log
      }
      log(state, `point towards ${target}`);
      break;
    }
    case 'motion_goto': {
      const x = toNumber(safeField(block, 'X', `${state.x}`), state.x);
      const y = toNumber(safeField(block, 'Y', `${state.y}`), state.y);
      state.x = x; state.y = y;
      log(state, `goto (${x}, ${y})`);
      break;
    }
    case 'motion_glide': {
      // Simplify glide as instant move to avoid time interpolation
      const secs = toNumber(safeField(block, 'SECS', '1'), 1);
      const x = toNumber(safeField(block, 'X', `${state.x}`), state.x);
      const y = toNumber(safeField(block, 'Y', `${state.y}`), state.y);
      state.time += secs;
      state.x = x; state.y = y;
      log(state, `glide ${secs}s to (${x}, ${y})`);
      break;
    }
    case 'motion_change_x': {
      const dx = toNumber(safeField(block, 'DX', '0'), 0);
      state.x += dx;
      log(state, `change x by ${dx}`);
      break;
    }
    case 'motion_change_y': {
      const dy = toNumber(safeField(block, 'DY', '0'), 0);
      state.y += dy;
      log(state, `change y by ${dy}`);
      break;
    }
    case 'motion_set_x': {
      const x = toNumber(safeField(block, 'X', `${state.x}`), state.x);
      state.x = x;
      log(state, `set x to ${x}`);
      break;
    }
    case 'motion_set_y': {
      const y = toNumber(safeField(block, 'Y', `${state.y}`), state.y);
      state.y = y;
      log(state, `set y to ${y}`);
      break;
    }
    case 'motion_if_on_edge_bounce': {
      const before = state.direction;
      const bounced = applyEdgeBounce(state);
      log(state, `if on edge bounce${bounced ? ` (dir ${before} -> ${state.direction})` : ''}`);
      break;
    }
    case 'motion_set_rotation_style': {
      const style = safeField(block, 'STYLE', state.rotationStyle);
      state.rotationStyle = style;
      log(state, `rotation style ${style}`);
      break;
    }
    case 'motion_move_forward': {
      const steps = toNumber(safeField(block, 'STEPS', '0'), 0);
      moveForward(state, steps);
      log(state, `move forward ${steps}`);
      break;
    }
    case 'motion_move_backward': {
      const steps = toNumber(safeField(block, 'STEPS', '0'), 0);
      moveForward(state, -steps);
      log(state, `move backward ${steps}`);
      break;
    }
    case 'control_wait': {
      const secs = toNumber(safeField(block, 'DURATION', '1'), 1);
      state.time += secs;
      log(state, `wait ${secs}s`);
      break;
    }
    case 'control_repeat': {
      const times = Math.max(0, Math.floor(toNumber(safeField(block, 'TIMES', '0'), 0)));
      const subFirst = getFirstStatementBlock(block);
      for (let i = 0; i < times && state.stepsExecuted < ctx.maxSteps; i++) {
        executeChain(subFirst, state, ctx);
      }
      log(state, `repeat ${times}x`);
      break;
    }
    case 'control_forever': {
      const subFirst = getFirstStatementBlock(block);
      // Loop until we hit the step cap
      while (state.stepsExecuted < ctx.maxSteps) {
        executeChain(subFirst, state, ctx);
      }
      log(state, 'forever (truncated by maxSteps)');
      break;
    }
    case 'looks_say': {
      const msg = safeField(block, 'MESSAGE', '');
      state.messages.push(msg);
      log(state, `say "${msg}"`);
      break;
    }
    case 'looks_hide': {
      state.visible = false;
      log(state, 'hide');
      break;
    }
    case 'looks_show': {
      state.visible = true;
      log(state, 'show');
      break;
    }
    case 'sound_set_volume': {
      const v = clamp(0, 100, toNumber(safeField(block, 'VOLUME', `${state.volume}`), state.volume));
      state.volume = v;
      log(state, `set volume ${v}%`);
      break;
    }
    case 'sound_change_volume': {
      const delta = toNumber(safeField(block, 'CHANGE', '0'), 0);
      state.volume = clamp(0, 100, state.volume + delta);
      log(state, `change volume by ${delta} -> ${state.volume}%`);
      break;
    }
    case 'sound_play': {
      const s = safeField(block, 'SOUND', 'unknown');
      state.sound.last = s;
      state.sound.playing.push(s);
      log(state, `play sound ${s}`);
      break;
    }
    case 'sound_play_note': {
      const note = safeField(block, 'NOTE', 'C');
      const dur = toNumber(safeField(block, 'DURATION', '0.5'), 0.5);
      state.sound.note = { note, duration: dur };
      state.time += dur;
      log(state, `play note ${note} for ${dur}s`);
      break;
    }
    case 'sound_play_drum': {
      const drum = safeField(block, 'DRUM', 'drum');
      state.sound.drum = drum;
      state.sound.last = `drum:${drum}`;
      log(state, `play drum ${drum}`);
      break;
    }
    case 'sound_play_sound_until_done': {
      const s = safeField(block, 'SOUND', 'unknown');
      const dur = soundDurationSeconds(s);
      state.sound.last = s;
      state.sound.playing.push(s);
      state.time += dur;
      // Assume it finishes
      state.sound.playing = state.sound.playing.filter(x => x !== s);
      log(state, `play ${s} until done (${dur}s)`);
      break;
    }
    case 'sound_stop_all': {
      state.sound.playing = [];
      log(state, 'stop all sounds');
      break;
    }
    case 'chat_set_username': {
      const u = safeField(block, 'USERNAME', '');
      state.chat.username = u;
      log(state, `chat username = ${u}`);
      break;
    }
    case 'chat_send_message': {
      const m = safeField(block, 'MESSAGE', '');
      state.chat.messages.push(m);
      log(state, `chat send: ${m}`);
      break;
    }
    case 'chat_reply_to_message': {
      const r = safeField(block, 'REPLY', '');
      state.chat.messages.push(r);
      log(state, `chat reply: ${r}`);
      break;
    }
    case 'chat_add_emoji': {
      const e = safeField(block, 'EMOJI', '😀');
      state.chat.emojis.push(e);
      log(state, `chat emoji: ${e}`);
      break;
    }
    case 'chat_wait_for_message': {
      // Simulate waiting and then an incoming message placeholder
      state.time += 0.1;
      state.chat.messages.push('[incoming]');
      log(state, 'chat wait for message');
      break;
    }
    case 'chat_show_typing': {
      state.chat.typing = true;
      log(state, 'chat show typing');
      break;
    }
    case 'chat_clear_messages': {
      state.chat.cleared += state.chat.messages.length;
      state.chat.messages = [];
      log(state, 'chat clear messages');
      break;
    }
    case 'chat_auto_reply': {
      const ar = safeField(block, 'AUTO_REPLY', 'welcome');
      state.chat.autoReply = ar;
      // simulate sending the auto-reply once
      state.chat.messages.push(`[auto:${ar}]`);
      log(state, `chat auto-reply ${ar}`);
      break;
    }
    // Events do not change state; they only anchor a stack
    case 'event_whenflagclicked': {
      log(state, 'event: flag');
      break;
    }
    default: {
      // Unknown block: no-op, but keep traversing
      log(state, `noop: ${block.type}`);
      break;
    }
  }
}

function moveForward(state, steps) {
  // direction in degrees, 0=up? Scratch uses 90 as right. Our state.direction follows Scratch.
  const rad = (state.direction * Math.PI) / 180;
  state.x += steps * Math.cos(rad);
  state.y += steps * Math.sin(rad);
}

function normalizeDeg(d) {
  let v = d % 360;
  if (v < 0) v += 360;
  return v;
}

function clamp(min, max, n) {
  return Math.min(max, Math.max(min, n));
}

function safeField(block, name, fallback) {
  try {
    const v = block.getFieldValue?.(name);
    return (v ?? fallback);
  } catch {
    return fallback;
  }
}

function toNumber(v, defVal) {
  const n = Number(v);
  return Number.isFinite(n) ? n : defVal;
}

function getFirstStatementBlock(block) {
  // Try common statement input names first
  const common = ['SUBSTACK', 'SUBSTACK1', 'SUBSTACK2', 'DO', 'DO0'];
  for (const name of common) {
    const target = block.getInputTargetBlock?.(name);
    if (target) return target;
  }
  // Fallback: scan inputList
  const list = block.inputList || [];
  for (const input of list) {
    const t = block.getInputTargetBlock?.(input.name);
    if (t) return t;
  }
  return null;
}

function log(state, entry) {
  state.logs.push(entry);
}

// Validation helper: compare final state against a goal
export function compareState(finalState, goal) {
  const messages = [];
  let ok = true;

  if (goal.position) {
    const tol = goal.position.tolerance ?? 0.5;
    const dx = Math.abs(finalState.x - goal.position.x);
    const dy = Math.abs(finalState.y - goal.position.y);
    const posOk = dx <= tol && dy <= tol;
    ok = ok && posOk;
    if (!posOk) messages.push(`Position attendue (${goal.position.x}, ${goal.position.y}), obtenue (${finalState.x.toFixed(1)}, ${finalState.y.toFixed(1)})`);
  }

  if (typeof goal.direction === 'number') {
    const dirOk = normalizeDeg(finalState.direction) === normalizeDeg(goal.direction);
    ok = ok && dirOk;
    if (!dirOk) messages.push(`Direction attendue ${goal.direction}°, obtenue ${Math.round(normalizeDeg(finalState.direction))}°`);
  }

  if (goal.message) {
    const last = finalState.messages[finalState.messages.length - 1] ?? '';
    const msgOk = last === goal.message;
    ok = ok && msgOk;
    if (!msgOk) messages.push(`Message attendu "${goal.message}", obtenu "${last}"`);
  }

  if (typeof goal.visible === 'boolean') {
    const vOk = finalState.visible === goal.visible;
    ok = ok && vOk;
    if (!vOk) messages.push(`Visibilité attendue ${goal.visible ? 'visible' : 'caché'}`);
  }

  if (typeof goal.volume === 'number') {
    const volOk = Math.round(finalState.volume) === Math.round(goal.volume);
    ok = ok && volOk;
    if (!volOk) messages.push(`Volume attendu ${goal.volume}%, obtenu ${finalState.volume}%`);
  }

  if (goal.sound) {
    if (goal.sound.last) {
      const sOk = finalState.sound.last === goal.sound.last;
      ok = ok && sOk;
      if (!sOk) messages.push(`Dernier son attendu "${goal.sound.last}", obtenu "${finalState.sound.last}"`);
    }
    if (typeof goal.sound.playingCount === 'number') {
      const cOk = finalState.sound.playing.length === goal.sound.playingCount;
      ok = ok && cOk;
      if (!cOk) messages.push(`Nombre de sons en cours ${finalState.sound.playing.length} (attendu ${goal.sound.playingCount})`);
    }
  }

  if (goal.chat) {
    if (typeof goal.chat.username === 'string') {
      const uOk = finalState.chat.username === goal.chat.username;
      ok = ok && uOk;
      if (!uOk) messages.push(`Nom d'utilisateur attendu "${goal.chat.username}", obtenu "${finalState.chat.username}"`);
    }
    if (typeof goal.chat.minMessages === 'number') {
      const mOk = finalState.chat.messages.length >= goal.chat.minMessages;
      ok = ok && mOk;
      if (!mOk) messages.push(`Au moins ${goal.chat.minMessages} messages requis (obtenu ${finalState.chat.messages.length})`);
    }
    if (typeof goal.chat.contains === 'string') {
      const contains = finalState.chat.messages.some(m => String(m).includes(goal.chat.contains));
      ok = ok && contains;
      if (!contains) messages.push(`Le chat doit contenir "${goal.chat.contains}"`);
    }
    if (typeof goal.chat.lastEmoji === 'string') {
      const last = finalState.chat.emojis[finalState.chat.emojis.length - 1];
      const eOk = last === goal.chat.lastEmoji;
      ok = ok && eOk;
      if (!eOk) messages.push(`Dernier emoji attendu ${goal.chat.lastEmoji}`);
    }
  }

  if (Array.isArray(goal.logsIncludes)) {
    for (const needle of goal.logsIncludes) {
      const found = finalState.logs.some(l => String(l).includes(needle));
      ok = ok && found;
      if (!found) messages.push(`Trace manquante: ${needle}`);
    }
  }

  return { isMatch: ok, details: messages };
}

// Simulate bouncing on screen edges similar to Scratch stage
function applyEdgeBounce(state) {
  const minX = -240, maxX = 240, minY = -180, maxY = 180;
  let bounced = false;
  if (state.x < minX) { state.x = minX; state.direction = normalizeDeg(180 - state.direction); bounced = true; }
  if (state.x > maxX) { state.x = maxX; state.direction = normalizeDeg(180 - state.direction); bounced = true; }
  if (state.y < minY) { state.y = minY; state.direction = normalizeDeg(-state.direction); bounced = true; }
  if (state.y > maxY) { state.y = maxY; state.direction = normalizeDeg(-state.direction); bounced = true; }
  return bounced;
}

function soundDurationSeconds(name) {
  // Rough defaults matching CodeGenerator.js intentions
  const map = {
    whistle: 1,
    bell: 1.5,
    clap: 0.2,
    laugh: 2,
    bird: 0.8,
  };
  return map[name] ?? 1;
}
