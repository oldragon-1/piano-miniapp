/**
 * 音频合成模块 v3.0 - 全音域支持（C3-C8）
 * 覆盖音域 C3 ~ C8（36白键+25黑键）
 *
 * v3.0 改进：
 * - 扩展频率表至 C8，支持36键全键盘
 * - jianpuToNote 支持 octave=2(倍高音 C6-B6) 和 octave=3(超高音 C7-C8)
 * - jianpuToNoteRight 支持简谱 1-29（C4-C8）
 *
 * v2.2 改进：
 * - 扩展频率表至 E5，支持高音 1̇(8)=C5, 2̇(9)=D5, 3̇(10)=E5
 * - jianpuToNoteRight 支持 note 值 1-10
 * - 修复 note 7(B4) 虽有映射但键盘无对应键的遗留问题
 */

// 音符频率表 (C3 ~ C8)
const NOTE_FREQS = {
  // C3 ~ B3
  'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56,
  'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00,
  'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
  // C4 ~ B4
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13,
  'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
  'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  // C5 ~ B5
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25,
  'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99,
  'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
  // C6 ~ B6
  'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51,
  'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98, 'G6': 1567.98,
  'G#6': 1661.22, 'A6': 1760.00, 'A#6': 1864.66, 'B6': 1975.53,
  // C7 ~ B7
  'C7': 2093.00, 'C#7': 2217.46, 'D7': 2349.32, 'D#7': 2489.02,
  'E7': 2637.02, 'F7': 2793.83, 'F#7': 2959.96, 'G7': 3135.96,
  'G#7': 3322.44, 'A7': 3520.00, 'A#7': 3729.31, 'B7': 3951.07,
  // C8
  'C8': 4186.01
}

// 简谱 → 音名映射（中音区 C4-B4）
const JIANPU_TO_NOTE_C4 = {1: 'C4', 2: 'D4', 3: 'E4', 4: 'F4', 5: 'G4', 6: 'A4', 7: 'B4'}
// 低音区 C3-B3（和弦用）
const JIANPU_TO_NOTE_C3 = {1: 'C3', 2: 'D3', 3: 'E3', 4: 'F3', 5: 'G3', 6: 'A3', 7: 'B3'}
// 高音区 C5-B5
const JIANPU_TO_NOTE_C5 = {8: 'C5', 9: 'D5', 10: 'E5', 11: 'F5', 12: 'G5', 13: 'A5', 14: 'B5'}
// 倍高音区 C6-B6（简谱 15-21）
const JIANPU_TO_NOTE_C6 = {15: 'C6', 16: 'D6', 17: 'E6', 18: 'F6', 19: 'G6', 20: 'A6', 21: 'B6'}
// 超高音区 C7-C8（简谱 22-29）
const JIANPU_TO_NOTE_C7 = {22: 'C7', 23: 'D7', 24: 'E7', 25: 'F7', 26: 'G7', 27: 'A7', 28: 'B7'}
const JIANPU_TO_NOTE_C8 = {29: 'C8'}

const CHORD_NOTES = {
  'C':  ['C3', 'E3', 'G3'], 'Dm': ['D3', 'F3', 'A3'],
  'Em': ['E3', 'G3', 'B3'], 'F':  ['F3', 'A3', 'C4'],
  'G':  ['G3', 'B3', 'D4'], 'Am': ['A3', 'C4', 'E4']
}

let audioCtx = null

function getAudioContext() {
  if (audioCtx) return audioCtx
  try {
    audioCtx = wx.createWebAudioContext ? wx.createWebAudioContext() : null
    // 有些设备需要 resume
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
  } catch (e) {
    console.warn('[audio] createWebAudioContext failed:', e)
    audioCtx = null
  }
  return audioCtx
}

// 钢琴谐波配置（模拟泛音分布）
const HARMONICS = [
  { mul: 1.0, type: 'triangle', gain: 1.0 },
  { mul: 2.0, type: 'sine',     gain: 0.45 },
  { mul: 3.0, type: 'sine',     gain: 0.28 },
  { mul: 4.0, type: 'sine',     gain: 0.15 },
  { mul: 5.0, type: 'sine',     gain: 0.08 },
  { mul: 6.0, type: 'sine',     gain: 0.04 },
]

/**
 * 播放单个音符
 */
function playNote(noteName, duration = 0.3, volume = 0.8) {
  const freq = NOTE_FREQS[noteName]
  if (!freq) return

  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const now = ctx.currentTime

    // 包络参数
    const attackTime = 0.004
    const decayTime = 0.15
    const sustainLevel = 0.30
    const releaseTime = Math.min(1.5, duration * 0.5)
    const totalDuration = duration + releaseTime + 0.05

    // 主输出 Gain
    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(volume * 1.0, now)
    masterGain.connect(ctx.destination)

    // 创建各层谐波振荡器
    HARMONICS.forEach((h) => {
      const harmFreq = freq * h.mul
      if (harmFreq > 3000) return  // 超高频泛音去掉

      const osc = ctx.createOscillator()
      osc.type = h.type
      osc.frequency.setValueAtTime(harmFreq, now)

      // 高频谐波微失谐，产生温暖感
      if (h.mul >= 3) {
        osc.detune.setValueAtTime(h.mul % 2 === 0 ? 2 : -1.5, now)
      }

      const gainNode = ctx.createGain()
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(volume * h.gain * 0.5, now + attackTime)
      gainNode.gain.linearRampToValueAtTime(volume * h.gain * 0.5 * sustainLevel, now + attackTime + decayTime)
      gainNode.gain.setValueAtTime(volume * h.gain * 0.35 * sustainLevel, now + duration)
      gainNode.gain.linearRampToValueAtTime(0, now + duration + releaseTime)

      osc.connect(gainNode)
      gainNode.connect(masterGain)
      osc.start(now)
      osc.stop(now + totalDuration)
    })
  } catch (e) {
    console.warn('[audio] playNote error:', e)
  }
}

function playChord(chordName, duration = 1.0, volume = 0.4) {
  const notes = CHORD_NOTES[chordName]
  if (!notes) return
  notes.forEach(note => playNote(note, duration, volume))
}

function getFrequency(noteName) { return NOTE_FREQS[noteName] || 0 }

/**
 * 简谱数字 → 右手区音名
 * 支持 1-7(中音 C4-B4), 8-14(高音 C5-B5), 15-21(倍高音 C6-B6), 22-29(超高音 C7-C8)
 */
function jianpuToNoteRight(jianpuNum) {
  return JIANPU_TO_NOTE_C8[jianpuNum] ||
         JIANPU_TO_NOTE_C7[jianpuNum] ||
         JIANPU_TO_NOTE_C6[jianpuNum] ||
         JIANPU_TO_NOTE_C5[jianpuNum] ||
         JIANPU_TO_NOTE_C4[jianpuNum] ||
         'C4'
}

function jianpuToNoteLeft(jianpuNum) { return JIANPU_TO_NOTE_C3[jianpuNum] || 'C3' }

/**
 * 根据八度信息获取音名
 * @param {number} jianpuNum - 简谱数字 1-7
 * @param {number} octave - 八度: -1=低(C3-B3), 0=中(C4-B4), 1=高(C5-B5), 2=倍高(C6-B6), 3=超高(C7-C8)
 */
function jianpuToNote(jianpuNum, octave) {
  if (octave === -1) return JIANPU_TO_NOTE_C3[jianpuNum] || 'C3'
  if (octave === 1) return JIANPU_TO_NOTE_C5[jianpuNum] || JIANPU_TO_NOTE_C4[jianpuNum] || 'C4'
  if (octave === 2) return JIANPU_TO_NOTE_C6[jianpuNum] || JIANPU_TO_NOTE_C5[jianpuNum] || JIANPU_TO_NOTE_C4[jianpuNum] || 'C4'
  if (octave === 3) return JIANPU_TO_NOTE_C8[jianpuNum] || JIANPU_TO_NOTE_C7[jianpuNum] || JIANPU_TO_NOTE_C6[jianpuNum] || JIANPU_TO_NOTE_C5[jianpuNum] || JIANPU_TO_NOTE_C4[jianpuNum] || 'C4'
  // octave = 0 或默认
  return JIANPU_TO_NOTE_C5[jianpuNum] || JIANPU_TO_NOTE_C4[jianpuNum] || 'C4'
}

module.exports = {
  playNote, playChord, getFrequency,
  jianpuToNoteRight, jianpuToNoteLeft, jianpuToNote,
  CHORD_NOTES, NOTE_FREQS
}
