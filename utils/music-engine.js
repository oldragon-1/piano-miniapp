/**
 * 乐谱改造引擎 - 简谱转C调白键版
 * 功能：转调、白键约束、和弦简化、节奏量化
 */

// 12平均律半音阶（0=C, 1=C#, 2=D, ... 11=B）
const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// C大调自然音阶（只弹白键）: C D E F G A B
const C_MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11]

// 简谱数字对应的C大调音级: 1=C, 2=D, 3=E, 4=F, 5=G, 6=A, 7=B
const JIANPU_TO_C_MAJOR = {
  1: 0,  // C
  2: 2,  // D
  3: 4,  // E
  4: 5,  // F
  5: 7,  // G
  6: 9,  // A
  7: 11  // B
}

// 6个基础和弦（白键和弦）
const BASIC_CHORDS = ['C', 'Dm', 'Em', 'F', 'G', 'Am']

// 常用和弦进行模板（C大调）
const COMMON_PROGRESSIONS = {
  'pop': ['C', 'G', 'Am', 'F'],       // 流行万能和弦
  'canon': ['C', 'G', 'Am', 'Em', 'F', 'C', 'F', 'G'], // 卡农进行
  'sad': ['Am', 'F', 'C', 'G'],       // 悲伤进行
  'happy': ['C', 'F', 'G', 'C']       // 快乐进行
}

// 音符所属和弦判断
const NOTE_TO_CHORD = {
  1: 'C',   // C属于C和弦
  2: 'Dm',  // D属于Dm
  3: 'Em',  // E属于Em (也可属于C)
  4: 'F',   // F属于F
  5: 'G',   // G属于G (也可属于C)
  6: 'Am',  // A属于Am
  7: 'G'    // B属于G
}

/**
 * 解析简谱字符串
 * @param {string} notation - 简谱字符串，支持格式: "5 5 6 5 3 1" 或 "556531"
 * @param {object} options - 可选配置
 * @returns {array} 音符数组 [{note, duration, chord}, ...]
 */
function parseNotation(notation, options = {}) {
  const {
    originalKey = 'C',    // 原调（如 'G' 表示 1=G）
    timeSignature = '4/4', // 拍号
    bpm = 80               // 速度
  } = options
  
  if (!notation || typeof notation !== 'string') {
    return []
  }
  
  // 1. 清理并分割简谱
  const rawNotes = notation.trim()
    .replace(/[^1-7]/g, ' ')  // 只保留数字1-7
    .split(/\s+/)
    .filter(n => n && n.length > 0)
    .map(Number)
  
  if (rawNotes.length === 0) {
    return []
  }
  
  // 2. 转调到C大调
  const keyOffset = getKeyOffset(originalKey)
  const cMajorNotes = rawNotes.map(n => transposeToC(n, keyOffset))
  
  // 3. 白键约束：确保所有音都在C大调白键上
  const whiteKeyNotes = cMajorNotes.map(n => constrainToWhiteKey(n))
  
  // 4. 节奏量化：根据拍号分配时长
  const notes = quantizeRhythm(whiteKeyNotes, timeSignature)
  
  return notes
}

/**
 * 计算调性偏移量
 */
function getKeyOffset(key) {
  const keyMap = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
    'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8,
    'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
  }
  return keyMap[key] || 0
}

/**
 * 将音符偏移到C大调
 */
function transposeToC(jianpuNum, keyOffset) {
  if (keyOffset === 0) return jianpuNum  // 已经是C调
  
  // 简谱数字对应C大调音级，加上偏移后找最接近的白键
  const chromaticNote = (JIANPU_TO_C_MAJOR[jianpuNum] - keyOffset + 12) % 12
  return chromaticNote
}

/**
 * 约束到最近的白键（C大调音阶）
 */
function constrainToWhiteKey(chromaticNote) {
  // 如果已经在白键上，直接返回
  if (C_MAJOR_SCALE.includes(chromaticNote)) {
    // 找到对应的简谱数字
    return chromaticToJianpu(chromaticNote)
  }
  
  // 找最近的白键
  let minDist = 12
  let nearest = 0
  for (const whiteKey of C_MAJOR_SCALE) {
    const dist = Math.abs(chromaticNote - whiteKey)
    if (dist < minDist) {
      minDist = dist
      nearest = whiteKey
    }
  }
  return chromaticToJianpu(nearest)
}

/**
 * 半音阶音级转简谱数字
 */
function chromaticToJianpu(chromaticNote) {
  const mapping = {0: 1, 2: 2, 4: 3, 5: 4, 7: 5, 9: 6, 11: 7}
  return mapping[chromaticNote] || 1
}

/**
 * 节奏量化
 */
function quantizeRhythm(jianpuNotes, timeSignature) {
  const [beatsPerMeasure] = timeSignature.split('/').map(Number)
  const notes = []
  
  for (let i = 0; i < jianpuNotes.length; i++) {
    const note = jianpuNotes[i]
    const chord = NOTE_TO_CHORD[note] || 'C'
    
    notes.push({
      note: note,      // 1-7
      duration: 1.0,   // 默认一拍
      chord: chord     // 当前和弦
    })
  }
  
  return notes
}

/**
 * 根据音符自动分配合弦进行
 */
function assignChordProgression(notes, progressionName = 'pop') {
  const progression = COMMON_PROGRESSIONS[progressionName] || COMMON_PROGRESSIONS.pop
  const notesPerChord = Math.max(1, Math.floor(notes.length / progression.length))
  
  let chordIndex = 0
  let noteCount = 0
  
  for (const note of notes) {
    note.chord = progression[chordIndex]
    noteCount++
    if (noteCount >= notesPerChord && chordIndex < progression.length - 1) {
      chordIndex++
      noteCount = 0
    }
  }
  
  return notes
}

/**
 * 完整改造流程
 */
function transformNotation(notation, options = {}) {
  const notes = parseNotation(notation, options)
  
  if (options.progression) {
    assignChordProgression(notes, options.progression)
  }
  
  return {
    title: options.title || '未命名',
    source: 'user_import',
    notes: notes
  }
}

module.exports = {
  parseNotation,
  transformNotation,
  constrainToWhiteKey,
  transposeToC,
  assignChordProgression,
  COMMON_PROGRESSIONS,
  NOTE_TO_CHORD,
  C_MAJOR_SCALE,
  BASIC_CHORDS
}
