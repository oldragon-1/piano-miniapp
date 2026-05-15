/**
 * 钢琴键盘组件 v6 - 全音域36键版
 * 音域：C3 ~ C8（36白键+25黑键）
 * 左手区：C3-B3（7白键，和弦高亮）
 * 右手区：C4-C8（29白键，简谱1-29，旋律落点）
 * B3/C4之间虚线分隔，标注"左手·和弦区"/"右手·旋律区"
 *
 * v6 改进：
 * - 扩展到36键全键盘（C3-C8）
 * - 支持 layer=1(17键), layer=2(21键), layer=3(36键) 自动切换
 * - 简谱支持 1-29（对应 C4-C8）
 *
 * v5 改进：
 * - 右手区扩展到 E5，支持简谱 1-10（1̇=8, 2̇=9, 3̇=10）
 * - 修复 note 7(B4) 无对应按键的 bug
 * - 高音键简谱显示带点标记
 */

const WHITE_KEYS = [
  // 左手区（和弦区）
  {id: 'C3', label: 'C3', jianpu: 0, isLeft: true},
  {id: 'D3', label: 'D3', jianpu: 0, isLeft: true},
  {id: 'E3', label: 'E3', jianpu: 0, isLeft: true},
  {id: 'F3', label: 'F3', jianpu: 0, isLeft: true},
  {id: 'G3', label: 'G3', jianpu: 0, isLeft: true},
  {id: 'A3', label: 'A3', jianpu: 0, isLeft: true},
  {id: 'B3', label: 'B3', jianpu: 0, isLeft: true},
  // 右手区（旋律区）—— 简谱 1-29 (C4-C8)
  {id: 'C4', label: '1', jianpu: 1, isLeft: false},
  {id: 'D4', label: '2', jianpu: 2, isLeft: false},
  {id: 'E4', label: '3', jianpu: 3, isLeft: false},
  {id: 'F4', label: '4', jianpu: 4, isLeft: false},
  {id: 'G4', label: '5', jianpu: 5, isLeft: false},
  {id: 'A4', label: '6', jianpu: 6, isLeft: false},
  {id: 'B4', label: '7', jianpu: 7, isLeft: false},
  {id: 'C5', label: '1̇', jianpu: 8, isLeft: false, isHigh: true},
  {id: 'D5', label: '2̇', jianpu: 9, isLeft: false, isHigh: true},
  {id: 'E5', label: '3̇', jianpu: 10, isLeft: false, isHigh: true},
  {id: 'F5', label: '4̇', jianpu: 11, isLeft: false, isHigh: true},
  {id: 'G5', label: '5̇', jianpu: 12, isLeft: false, isHigh: true},
  {id: 'A5', label: '6̇', jianpu: 13, isLeft: false, isHigh: true},
  {id: 'B5', label: '7̇', jianpu: 14, isLeft: false, isHigh: true},
  {id: 'C6', label: '1̇̇', jianpu: 15, isLeft: false, isHigh: true},
  {id: 'D6', label: '2̇̇', jianpu: 16, isLeft: false, isHigh: true},
  {id: 'E6', label: '3̇̇', jianpu: 17, isLeft: false, isHigh: true},
  {id: 'F6', label: '4̇̇', jianpu: 18, isLeft: false, isHigh: true},
  {id: 'G6', label: '5̇̇', jianpu: 19, isLeft: false, isHigh: true},
  {id: 'A6', label: '6̇̇', jianpu: 20, isLeft: false, isHigh: true},
  {id: 'B6', label: '7̇̇', jianpu: 21, isLeft: false, isHigh: true},
  {id: 'C7', label: '1̇̇̇', jianpu: 22, isLeft: false, isHigh: true},
  {id: 'D7', label: '2̇̇̇', jianpu: 23, isLeft: false, isHigh: true},
  {id: 'E7', label: '3̇̇̇', jianpu: 24, isLeft: false, isHigh: true},
  {id: 'F7', label: '4̇̇̇', jianpu: 25, isLeft: false, isHigh: true},
  {id: 'G7', label: '5̇̇̇', jianpu: 26, isLeft: false, isHigh: true},
  {id: 'A7', label: '6̇̇̇', jianpu: 27, isLeft: false, isHigh: true},
  {id: 'B7', label: '7̇̇̇', jianpu: 28, isLeft: false, isHigh: true},
  {id: 'C8', label: '1̇̇̇̇', jianpu: 29, isLeft: false, isHigh: true},
]

const BLACK_KEYS = [
  {id: 'C#3', afterWhiteIndex: 0},
  {id: 'D#3', afterWhiteIndex: 1},
  {id: 'F#3', afterWhiteIndex: 3},
  {id: 'G#3', afterWhiteIndex: 4},
  {id: 'A#3', afterWhiteIndex: 5},
  {id: 'C#4', afterWhiteIndex: 7},
  {id: 'D#4', afterWhiteIndex: 8},
  {id: 'F#4', afterWhiteIndex: 10},
  {id: 'G#4', afterWhiteIndex: 11},
  {id: 'A#4', afterWhiteIndex: 12},
  {id: 'C#5', afterWhiteIndex: 14},
  {id: 'D#5', afterWhiteIndex: 15},
  // Medium 扩展：F#5 G#5 A#5
  {id: 'F#5', afterWhiteIndex: 17},
  {id: 'G#5', afterWhiteIndex: 18},
  {id: 'A#5', afterWhiteIndex: 19},
  // Hard 扩展：C6-G7 的黑键
  {id: 'C#6', afterWhiteIndex: 21},
  {id: 'D#6', afterWhiteIndex: 22},
  {id: 'F#6', afterWhiteIndex: 24},
  {id: 'G#6', afterWhiteIndex: 25},
  {id: 'A#6', afterWhiteIndex: 26},
  {id: 'C#7', afterWhiteIndex: 28},
  {id: 'D#7', afterWhiteIndex: 29},
  {id: 'F#7', afterWhiteIndex: 31},
  {id: 'G#7', afterWhiteIndex: 32},
  {id: 'A#7', afterWhiteIndex: 33},
]

const CHORD_KEY_MAP = {
  'C':  [0, 2, 4],
  'Dm': [1, 3, 5],
  'Em': [2, 4, 6],
  'F':  [3, 5, 7],
  'G':  [4, 6, 8],
  'Am': [5, 7, 9],
}

// 简谱数字 → 白键索引（右手区 C4=7 ~ C8=35，支持简谱1-29）
const JIANPU_TO_INDEX = {
  1: 7, 2: 8, 3: 9, 4: 10, 5: 11, 6: 12, 7: 13,
  8: 14, 9: 15, 10: 16, 11: 17, 12: 18, 13: 19, 14: 20,
  15: 21, 16: 22, 17: 23, 18: 24, 19: 25, 20: 26, 21: 27,
  22: 28, 23: 29, 24: 30, 25: 31, 26: 32, 27: 33, 28: 34, 29: 35
}
// 左手区简谱映射（低音区C3-B3，用于全音域弹奏）
const JIANPU_TO_LEFT_INDEX = {1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6}
const LEFT_COUNT = 7

Component({
  properties: {
    highlightChord: { type: String, value: '' },
    highlightNote: { type: Number, value: 0 },
    highlightLowNote: { type: Number, value: 0 },  // 低音旋律高亮（octave=-1）
    showDivider: { type: Boolean, value: true },
    canvasWidth: { type: Number, value: 0 },   // 由页面传入实际宽度
    canvasHeight: { type: Number, value: 0 },   // 由页面传入实际高度
    layer: { type: Number, value: 1 }         // 1=17键(C3-E5), 2=21键(C3-B5), 3=36键(C3-C8)
  },

  data: {
    canvasW: 300,   // canvas CSS 宽度（逻辑像素），渲染用
    canvasH: 150,    // canvas CSS 高度（逻辑像素）
    octaveOffset: 0,  // 八度偏移（0-2，每页12键）
    octaveLabel: 'C3-G4'  // 当前八度范围标签
  },

  lifetimes: {
    attached() {
      this._pressed = {}
    },
    ready() {
      // 延迟 800ms，确保页面 onReady 中的 SelectorQuery 已完成并传回正确尺寸
      setTimeout(() => this.initCanvas(), 800)
    }
  },

  observers: {
    'highlightChord, highlightNote, highlightLowNote': function() {
      this.draw()
      this.toggleBreath()
    },
    // 监听页面传入的尺寸变化（onReady 校正后）
    'canvasWidth, canvasHeight': function(w, h) {
      if (w > 0 && h > 0) {
        this.setData({ canvasW: w, canvasH: h })
        // 如果 canvas 已初始化，需要重新调整 buffer
        if (this._canvas) {
          this._reinitWithSize(w, h)
        }
      }
    },
    // 监听 layer 变化，Hard 层初始化八度
    'layer': function(layer) {
      if (layer === 3) {
        this.setData({ octaveOffset: 0 })
        this._updateOctaveLabel()
      }
    },
    // 监听 highlightNote，自动切换八度
    'highlightNote': function(note) {
      if (this.data.layer !== 3 || !note) return
      const targetIndex = JIANPU_TO_INDEX[note]
      if (targetIndex === undefined) return
      
      const [start, end] = this._getVisibleKeyRange()
      if (targetIndex < start || targetIndex > end) {
        // 不在可见范围，自动切换八度
        const newOffset = Math.floor(targetIndex / 12)
        this.setData({ octaveOffset: Math.min(newOffset, 2) })
        this._updateOctaveLabel()
      }
    }
  },

  methods: {
    // === 八度切换（仅 Hard 层） ===
    onOctaveDown() {
      if (this.data.layer !== 3) return
      const newOffset = Math.max(0, this.data.octaveOffset - 1)
      this.setData({ octaveOffset: newOffset })
      this._updateOctaveLabel()
      this.draw()
    },

    onOctaveUp() {
      if (this.data.layer !== 3) return
      const newOffset = Math.min(2, this.data.octaveOffset + 1)
      this.setData({ octaveOffset: newOffset })
      this._updateOctaveLabel()
      this.draw()
    },

    _updateOctaveLabel() {
      const labels = ['C3-G4', 'A4-E6', 'F6-C8']
      const label = labels[this.data.octaveOffset] || 'C3-G4'
      this.setData({ octaveLabel: label })
    },

    // 获取可见键范围 [startIndex, endIndex]（闭区间）
    _getVisibleKeyRange() {
      const offset = this.data.octaveOffset
      const ranges = [
        [0, 11],   // C3-G4 (12 keys)
        [12, 23],  // A4-E6 (12 keys)
        [24, 35]   // F6-C8 (12 keys)
      ]
      return ranges[offset] || ranges[0]
    },

    toggleBreath() {
      if (this.data.highlightNote || this.data.highlightChord) {
        if (!this._breathTimer) {
          this._breathTimer = setInterval(() => this.draw(), 80)
        }
      } else {
        if (this._breathTimer) {
          clearInterval(this._breathTimer)
          this._breathTimer = null
        }
      }
    },

    initCanvas() {
      const sys = wx.getSystemInfoSync()
      const dpr = sys.pixelRatio || 2

      // 优先使用页面传入的实际尺寸，否则 fallback
      let targetW = this.data.canvasWidth
      let targetH = this.data.canvasHeight
      if (!targetW || !targetH) {
        targetW = Math.round(sys.windowWidth)
        targetH = Math.round(sys.windowHeight * 0.45)
      }

      console.log('[piano-keyboard] initCanvas — props:', this.data.canvasWidth, 'x', this.data.canvasHeight, '→ target:', targetW, 'x', targetH)

      this.setData({ canvasW: targetW, canvasH: targetH })

      this._initWithSize(targetW, targetH, dpr)
    },

    _reinitWithSize(w, h) {
      const sys = wx.getSystemInfoSync()
      const dpr = sys.pixelRatio || 2
      console.log('[piano-keyboard] reinit with new size:', w, 'x', h)
      this.setData({ canvasW: w, canvasH: h })
      // 等渲染后重新设置 buffer
      setTimeout(() => this._initWithSize(w, h, dpr), 50)
    },

    _initWithSize(targetW, targetH, dpr) {
      wx.createSelectorQuery().in(this)
        .select('#pianoCanvas')
        .node()
        .exec((nodeRes) => {
          if (!nodeRes || !nodeRes[0] || !nodeRes[0].node) {
            if (!this._initRetry) this._initRetry = 0
            this._initRetry++
            if (this._initRetry < 6) {
              setTimeout(() => this.initCanvas(), 400)
            }
            return
          }

          const canvas = nodeRes[0].node
          const ctx = canvas.getContext('2d')

          // 获取 canvas 实际渲染尺寸（flex 布局后）
          wx.createSelectorQuery().in(this)
            .select('#pianoCanvas')
            .boundingClientRect()
            .exec((rectRes) => {
              let actualW = targetW
              let actualH = targetH
              
              // 如果 flex 布局已生效，使用实际渲染尺寸
              if (rectRes && rectRes[0]) {
                actualW = rectRes[0].width
                actualH = rectRes[0].height
              }
              
              // buffer = 实际CSS逻辑尺寸 × dpr
              canvas.width = actualW * dpr
              canvas.height = actualH * dpr
              ctx.scale(dpr, dpr)

              this._canvas = canvas
              this._ctx = ctx
              this._width = actualW
              this._height = actualH
              this._dpr = dpr

              console.log('[piano-keyboard] canvas init OK: logical', actualW, 'x', actualH, 'buffer:', canvas.width, 'x', canvas.height)
              this.draw()
            })
        })
    },

    draw() {
      const ctx = this._ctx
      if (!ctx || !this._width) return
      const W = this._width, H = this._height
      const HEADER_H = Math.max(26, Math.floor(H * 0.13))  // 顶部标签区高度
      const KEY_H = H - HEADER_H  // 键盘实际可用高度
      
      // 根据 layer 和 octaveOffset 决定显示哪些白键
      let keyCount, startIndex = 0
      if (this.data.layer === 3) {
        // Hard 层：根据 octaveOffset 显示可见键
        const [start, end] = this._getVisibleKeyRange()
        startIndex = start
        keyCount = end - start + 1
      } else {
        // Easy/Medium 层：显示所有键
        keyCount = this.data.layer === 1 ? 17 : 21
      }
      
      const keyW = W / keyCount
      const blackW = keyW * 0.58, blackH = KEY_H * 0.62
      const chord = this.data.highlightChord
      const note = this.data.highlightNote
      const lowNote = this.data.highlightLowNote

      ctx.clearRect(0, 0, W, H)

      // === 0. 顶部标签区（独立于键盘，不重叠） ===
      ctx.fillStyle = '#F4F1DE'
      ctx.fillRect(0, 0, W, HEADER_H)
      
      // 仅 Easy/Medium 层显示左右手分区
      if (this.data.showDivider && this.data.layer !== 3) {
        const dx = LEFT_COUNT * keyW
        // 分隔线延伸到标签区
        ctx.strokeStyle = 'rgba(130, 23, 255, 0.4)'
        ctx.lineWidth = 1.5
        ctx.setLineDash([6, 4])
        ctx.beginPath()
        ctx.moveTo(dx, 0)
        ctx.lineTo(dx, HEADER_H)
        ctx.stroke()
        ctx.setLineDash([])
        // 区域标签
        const labelSize = Math.max(12, Math.floor(HEADER_H * 0.55))
        ctx.fillStyle = '#8217FF'
        ctx.font = `bold ${labelSize}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('左手·和弦区', dx / 2, HEADER_H / 2)
        ctx.fillText('右手·旋律区', dx + (W - dx) / 2, HEADER_H / 2)
      }
      // 标签区底部分割线
      ctx.strokeStyle = 'rgba(130, 23, 255, 0.25)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, HEADER_H)
      ctx.lineTo(W, HEADER_H)
      ctx.stroke()

      // === 1. 白键（从 HEADER_H 开始绘制） ===
      for (let i = startIndex; i < startIndex + keyCount; i++) {
        const x = (i - startIndex) * keyW
        const key = WHITE_KEYS[i]
        const pressed = !!this._pressed[i]

        let isChordHL = false
        if (key.isLeft && chord && CHORD_KEY_MAP[chord]) {
          isChordHL = CHORD_KEY_MAP[chord].includes(i)
        }
        const isNoteHL = (!key.isLeft && note > 0 && i === JIANPU_TO_INDEX[note]) ||
                         (key.isLeft && lowNote > 0 && i === JIANPU_TO_LEFT_INDEX[lowNote])

        // 白键填充
        let baseColor = '#FFFFF5'
        if (pressed) {
          baseColor = '#FFD700'  // 按下时金色
        } else if (isChordHL) {
          baseColor = 'rgba(130, 23, 255, 0.12)'  // 和弦高亮：淡紫色
        } else if (isNoteHL) {
          baseColor = 'rgba(255, 215, 0, 0.25)'  // 旋律高亮：淡金色
        }
        ctx.fillStyle = baseColor
        ctx.fillRect(x, HEADER_H, keyW - 0.5, KEY_H)

        // 和弦高亮光晕
        if (isChordHL) {
          ctx.save()
          ctx.fillStyle = 'rgba(130, 23, 255, 0.18)'
          ctx.shadowColor = 'rgba(130, 23, 255, 0.25)'
          ctx.shadowBlur = 12
          ctx.fillRect(x + 2, HEADER_H + 4, keyW - 5, KEY_H - 8)
          ctx.restore()
        }

        // 旋律高亮光晕（呼吸效果）
        if (isNoteHL) {
          const breath = 0.25 + 0.15 * Math.sin(Date.now() * 0.004)
          ctx.fillStyle = `rgba(255, 215, 0, ${breath * 0.5})`
          ctx.shadowColor = `rgba(255, 215, 0, ${breath * 0.4})`
          ctx.shadowBlur = 16
          ctx.fillRect(x + 2, HEADER_H + 4, keyW - 5, KEY_H - 8)
          ctx.shadowBlur = 0
        }

        // 边线
        ctx.strokeStyle = '#E0D0C0'
        ctx.lineWidth = 0.5
        ctx.strokeRect(x, HEADER_H, keyW, KEY_H)

        // 简谱数字（根据图层决定显示逻辑）
        let showJianpu = false
        let displayNum = 0
        let dotCount = 0
        if (this.data.layer === 3) {
          // Hard层：所有键都显示简谱编号（1-7加圆点，与乐谱区一致）
          showJianpu = key.jianpu > 0
          if (showJianpu) {
            const jianpu = key.jianpu
            // 计算显示数字（1-7）和圆点数量
            if (jianpu <= 7) {
              displayNum = jianpu
              dotCount = 0
            } else if (jianpu <= 14) {
              displayNum = jianpu - 7
              dotCount = 1
            } else if (jianpu <= 21) {
              displayNum = jianpu - 14
              dotCount = 2
            } else {
              displayNum = jianpu - 21
              dotCount = 3
            }
          }
        } else {
          // Easy/Medium层：右手区显示简谱，左手区在低音旋律模式时亮起对应键
          showJianpu = key.jianpu > 0 || (key.isLeft && lowNote > 0 && i === JIANPU_TO_LEFT_INDEX[lowNote])
          // 将 jianpu 8/9/10 转换为 1/2/3（高音），显示时加圆点
          const jp = key.isLeft ? lowNote : key.jianpu
          if (jp > 21) {
            displayNum = jp - 21
            dotCount = 3
          } else if (jp > 14) {
            displayNum = jp - 14
            dotCount = 2
          } else if (jp > 7) {
            displayNum = jp - 7
            dotCount = 1
          } else {
            displayNum = jp
            dotCount = 0
          }
        }
        
        if (showJianpu) {
          // Hard层使用更小的字体，位置调整到下方
          const isHard = this.data.layer === 3
          const fontSize = isHard ? Math.max(10, Math.floor(KEY_H * 0.12)) : Math.max(14, Math.floor(KEY_H * 0.20))
          ctx.font = `bold ${fontSize}px sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          
          const centerX = x + keyW / 2
          // Hard层：位置调整到下方空白区域中间；Easy/Medium层：保持原位置
          const centerY = isHard ? HEADER_H + KEY_H * 0.75 : HEADER_H + KEY_H * 0.42
          
          ctx.fillStyle = isNoteHL ? '#8217FF' : (isHard ? '#999' : (key.isHigh ? '#CC9900' : (key.isLeft ? '#CC9900' : '#999')))
          ctx.fillText(String(displayNum), centerX, centerY)
          
          // 高音点（根据 dotCount 显示正确数量的圆点）
          if (dotCount > 0) {
            ctx.fillStyle = isNoteHL ? '#8217FF' : (isHard ? '#999' : '#CC9900')
            const dotY = centerY - fontSize * 0.7
            for (let d = 0; d < dotCount; d++) {
              ctx.beginPath()
              ctx.arc(centerX, dotY - d * fontSize * 0.3, Math.max(2, fontSize * 0.1), 0, Math.PI * 2)
              ctx.fill()
            }
          }
        }

        // 音名标注（底部）—— 左手区显示音名，右手区显示简谱
        if (key.isLeft) {
          ctx.fillStyle = pressed ? '#FFD700' : 'rgba(150,150,150,0.6)'
          ctx.font = `${Math.max(10, Math.floor(KEY_H * 0.10))}px sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'bottom'
          ctx.fillText(key.label, x + keyW / 2, H - 4)
        }
      }

      // === 2. 黑键（从 HEADER_H 开始） ===
      for (const bk of BLACK_KEYS) {
        // 根据 layer 和 octaveOffset 跳过不在范围内的黑键
        let inRange = false
        if (this.data.layer === 3) {
          const [start, end] = this._getVisibleKeyRange()
          inRange = bk.afterWhiteIndex >= start && bk.afterWhiteIndex < end
        } else {
          inRange = bk.afterWhiteIndex < keyCount
        }
        if (!inRange) continue
        
        // 计算 x 位置（相对于可见区域的起始位置）
        let x
        if (this.data.layer === 3) {
          const [start] = this._getVisibleKeyRange()
          x = (bk.afterWhiteIndex - start + 0.7) * keyW
        } else {
          x = (bk.afterWhiteIndex + 0.7) * keyW
        }
        
        ctx.fillStyle = '#1A1A1A'
        ctx.shadowColor = 'rgba(0,0,0,0.6)'
        ctx.shadowBlur = 4
        ctx.shadowOffsetX = 1
        ctx.shadowOffsetY = 3
        ctx.fillRect(x, HEADER_H, blackW, blackH)
        ctx.shadowColor = 'transparent'
      }

      // === 3. 分隔线（键盘区域内，仅 Easy/Medium 层显示） ===
      if (this.data.showDivider && this.data.layer !== 3) {
        const dx = LEFT_COUNT * keyW
        ctx.strokeStyle = 'rgba(130, 23, 255, 0.5)'
        ctx.lineWidth = 2
        ctx.setLineDash([8, 6])
        ctx.beginPath()
        ctx.moveTo(dx, HEADER_H)
        ctx.lineTo(dx, H)
        ctx.stroke()
        ctx.setLineDash([])
      }
    },

    isChordKey(keyId) {
      const chord = this.data.highlightChord
      if (!chord || !CHORD_KEY_MAP[chord]) return false
      const idx = WHITE_KEYS.findIndex(k => k.id === keyId)
      return CHORD_KEY_MAP[chord].includes(idx)
    },

    isNoteKey(keyId) {
      if (!this.data.highlightNote) return false
      const targetIdx = JIANPU_TO_INDEX[this.data.highlightNote]
      const idx = WHITE_KEYS.findIndex(k => k.id === keyId)
      return idx === targetIdx
    },

    // === 触控 ===
    getWhiteKeyIndex(tx, ty) {
      const HEADER_H = Math.max(26, Math.floor(this._height * 0.13))
      // 触摸在标签区，忽略
      if (ty < HEADER_H) return -1
      
      let keyCount, startIndex = 0
      if (this.data.layer === 3) {
        // Hard 层：根据 octaveOffset 计算可见键范围和 keyW
        const [start, end] = this._getVisibleKeyRange()
        startIndex = start
        keyCount = end - start + 1
      } else {
        // Easy/Medium 层：显示所有键
        keyCount = this.data.layer === 1 ? 17 : 21
      }
      
      const keyW = this._width / keyCount
      const KEY_H = this._height - HEADER_H
      
      // idx 是可见范围内的索引（0 到 keyCount-1）
      const idx = Math.floor(tx / keyW)
      if (idx < 0 || idx >= keyCount) return -1
      
      // 转换为实际键索引
      const actualIdx = startIndex + idx
      
      for (const bk of BLACK_KEYS) {
        if (bk.afterWhiteIndex === actualIdx) {
          const lx = (idx + 0.7) * keyW
          const blackH = KEY_H * 0.62
          if (tx >= lx && tx <= lx + keyW * 0.58 && ty < HEADER_H + blackH) return -1
        }
      }
      return actualIdx
    },

    onTouchStart(e) {
      if (!this._width) return
      for (const t of e.touches) {
        // t.x/t.y 是相对于 canvas 左上角的逻辑像素坐标
        // 因为 canvas CSS 尺寸 = this._width × this._height，所以直接用
        const idx = this.getWhiteKeyIndex(t.x, t.y)
        console.log('[piano-keyboard] touch:', Math.round(t.x), Math.round(t.y), '→ keyIdx:', idx, '(keyW:', Math.round(this._width / (this.data.layer === 1 ? 17 : (this.data.layer === 2 ? 21 : WHITE_KEYS.length))), ')')
        if (idx >= 0) {
          this._pressed[idx] = true
          this.draw()
          this.triggerEvent('keydown', {
            keyIndex: idx,
            keyId: WHITE_KEYS[idx].id,
            jianpu: WHITE_KEYS[idx].jianpu
          })
        }
      }
    },

    onTouchEnd() {
      this._pressed = {}
      this.draw()
      this.triggerEvent('keyup', {})
    }
  }
})
