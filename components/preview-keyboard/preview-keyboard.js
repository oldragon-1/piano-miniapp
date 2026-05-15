/**
 * 预览页键盘组件 - Canvas 绘制右手旋律区（C4-F4）
 * 6个白键 + 4个黑键（仅作装饰）
 */

const WHITE_KEYS = [
  {id: 'C4', jianpu: 1},
  {id: 'D4', jianpu: 2},
  {id: 'E4', jianpu: 3},
  {id: 'F4', jianpu: 4},
  {id: 'G4', jianpu: 5},
  {id: 'A4', jianpu: 6},
  {id: 'B4', jianpu: 7},
]

const BLACK_KEYS = [
  {id: 'C#4', afterWhiteIndex: 0},
  {id: 'D#4', afterWhiteIndex: 1},
  {id: 'F#4', afterWhiteIndex: 3},
  {id: 'G#4', afterWhiteIndex: 4},
  {id: 'A#4', afterWhiteIndex: 5},
]

Component({
  properties: {
    highlightNote: { type: Number, value: 0 },
    highlightChord: { type: String, value: '' },
  },

  data: {
    canvasWidth: 750,
    canvasHeight: 200
  },

  lifetimes: {
    attached() {
      this._pressedKeys = {}
      this._animatingKeys = {}
    },
    ready() {
      this.initCanvas()
    }
  },

  observers: {
    'highlightNote, highlightChord': function() {
      this.draw()
    }
  },

  methods: {
    initCanvas() {
      const dpr = wx.getSystemInfoSync().pixelRatio || 2
      const query = this.createSelectorQuery()
      query.select('#previewPianoCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          if (!res[0] || !res[0].node) {
            setTimeout(() => this.initCanvas(), 200)
            return
          }
          const canvas = res[0].node
          const ctx = canvas.getContext('2d')
          
          // 用系统窗口尺寸计算
          const sysInfo = wx.getSystemInfoSync()
          const w = sysInfo.windowWidth
          const h = Math.floor(sysInfo.windowHeight * 0.3)
          
          canvas.width = w * dpr
          canvas.height = h * dpr
          ctx.scale(dpr, dpr)
          
          this._canvas = canvas
          this._ctx = ctx
          this._width = w
          this._height = h
          
          this.draw()
        })
    },

    draw() {
      const ctx = this._ctx
      if (!ctx) return
      
      const W = this._width
      const H = this._height
      const whiteCount = WHITE_KEYS.length
      const whiteWidth = W / whiteCount
      const blackWidth = whiteWidth * 0.6
      const blackHeight = H * 0.62
      
      ctx.clearRect(0, 0, W, H)
      
      // 1. 绘制白键
      for (let i = 0; i < whiteCount; i++) {
        const x = i * whiteWidth
        const key = WHITE_KEYS[i]
        const isNoteHighlight = this.isNoteKey(key.id)
        const isActive = this._pressedKeys[i] || this._animatingKeys[i]
        
        this.drawWhiteKey(ctx, x, 0, whiteWidth, H, key.id, {
          isNoteHighlight,
          isActive
        })
        
        // 绘制简谱数字
        ctx.save()
        ctx.fillStyle = isNoteHighlight ? '#e94560' : '#666'
        ctx.font = `bold ${Math.floor(H * 0.18)}px sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(key.jianpu.toString(), x + whiteWidth / 2, H * 0.75)
        ctx.restore()
      }
      
      // 2. 绘制黑键（装饰，不响应交互）
      for (const bk of BLACK_KEYS) {
        const x = (bk.afterWhiteIndex + 0.7) * whiteWidth
        
        ctx.fillStyle = '#1A1A1A'
        ctx.shadowColor = 'rgba(0,0,0,0.5)'
        ctx.shadowBlur = 4
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
        ctx.fillRect(x, 0, blackWidth, blackHeight)
        ctx.shadowColor = 'transparent'
      }
    },

    drawWhiteKey(ctx, x, y, w, h, keyId, options) {
      const { isNoteHighlight, isActive } = options
      
      ctx.save()
      
      // 基础色
      if (isActive) {
        ctx.fillStyle = '#e94560'
      } else if (isNoteHighlight) {
        ctx.fillStyle = '#ffd700'
      } else {
        ctx.fillStyle = '#FFFFF0'
      }
      
      const padding = 1
      ctx.fillRect(x + padding, y, w - padding * 2, h)
      
      // 高亮
      if (isNoteHighlight && !isActive) {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)'
        ctx.fillRect(x + padding, y, w - padding * 2, h)
      }
      
      // 键边线
      ctx.strokeStyle = '#ddd'
      ctx.lineWidth = 0.5
      ctx.strokeRect(x + padding, y, w - padding * 2, h)
      
      // 按下阴影
      if (isActive) {
        ctx.fillStyle = 'rgba(233, 69, 96, 0.4)'
        ctx.fillRect(x + padding, h * 0.7, w - padding * 2, h * 0.3)
      }
      
      ctx.restore()
    },

    isNoteKey(keyId) {
      const note = this.data.highlightNote
      if (!note) return false
      const keyNames = WHITE_KEYS.map(k => k.id)
      const noteIndex = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6 }[note]
      const keyIndex = keyNames.indexOf(keyId)
      return noteIndex === keyIndex
    },

    getWhiteKeyIndex(touchX, touchY) {
      const whiteCount = WHITE_KEYS.length
      const whiteWidth = this._width / whiteCount
      const keyIndex = Math.floor(touchX / whiteWidth)
      
      if (keyIndex < 0 || keyIndex >= whiteCount) return -1
      
      // 检查是否点在黑键区域
      for (const bk of BLACK_KEYS) {
        if (bk.afterWhiteIndex === keyIndex) {
          const blackStart = (keyIndex + 0.7) * whiteWidth
          const blackEnd = blackStart + whiteWidth * 0.6
          if (touchX >= blackStart && touchX <= blackEnd && touchY < this._height * 0.62) {
            return -1
          }
        }
      }
      
      return keyIndex
    },

    onTouchStart(e) {
      for (const touch of e.touches) {
        const x = touch.x
        const y = touch.y
        const keyIndex = this.getWhiteKeyIndex(x, y)
        
        if (keyIndex >= 0) {
          this._pressedKeys[keyIndex] = true
          this.draw()
          
          this.triggerEvent('keydown', {
            keyIndex,
            keyId: WHITE_KEYS[keyIndex].id,
            jianpu: WHITE_KEYS[keyIndex].jianpu
          })
        }
      }
    },

    onTouchMove(e) {
      for (const touch of e.touches) {
        const x = touch.x
        const y = touch.y
        const keyIndex = this.getWhiteKeyIndex(x, y)
        
        for (const idx in this._pressedKeys) {
          if (parseInt(idx) !== keyIndex) {
            delete this._pressedKeys[idx]
          }
        }
        if (keyIndex >= 0) {
          this._pressedKeys[keyIndex] = true
        }
        this.draw()
      }
    },

    onTouchEnd(e) {
      this._pressedKeys = {}
      this.draw()
      
      this.triggerEvent('keyup', {})
    },

    animateKey(keyIndex, duration = 300) {
      this._animatingKeys[keyIndex] = true
      this.draw()
      setTimeout(() => {
        this._animatingKeys[keyIndex] = false
        this.draw()
      }, duration)
    }
  }
})
