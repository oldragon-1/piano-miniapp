/**
 * 弹奏页 - 横向简谱引导模式（设计文档v2）
 * 正确键后自动推进，错误键闪红，无需计时
 *
 * 滚动居中策略 v6：
 * - scroll-view 带 scroll-x 是原生组件，不尊重 flex:1
 * - CSS 改为 flex:0 0 46.15% 显式设置宽度
 * - onReady 用 屏幕宽度-chordHint宽度 计算 scroll-view 实际可见宽度
 * - rpxToPx = 屏幕实际宽度 / 750（横屏下 750rpx=屏幕长边）
 * - 预计算每个音符 scrollLeft，播放时直接查表
 */
const audioSynth = require('../../utils/audio-synth')
const songs = require('../../data/songs')

Page({
  data: {
    songId: '',
    songTitle: '',
    currentNote: 0,
    currentLowNote: 0,
    currentChord: '',
    noteStatus: 'waiting',
    progress: 0,
    bpm: 80,

    score: 0,
    combo: 0,
    maxCombo: 0,
    correctCount: 0,
    wrongCount: 0,
    showScore: false,

    notes: [],
    noteWidths: [],
    currentIndex: 0,
    isPlaying: false,
    isAutoPlaying: false,
    keyboardW: 375,
    keyboardH: 300,
    scrollLeft: 0,
    songLayer: 1     // 键盘层级：1=17键，2=21键
  },

  // 实例属性（不在 data 中，不触发渲染）
  _scrollViewWidth: 0,
  _rpxToPx: 1,
  _noteScrollPositions: [],
  _lastScrollTarget: -1,
  _autoPlayTimer: null,

  onLoad(options) {
    const sys = wx.getSystemInfoSync()
    this.setData({
      keyboardW: Math.round(sys.windowWidth),
      keyboardH: Math.round(sys.windowHeight * 0.45)
    })
    const songId = options.songId || 'twinkle_star'
    this.loadSong(songId)
  },

  onReady() {
    wx.createSelectorQuery()
      .select('.keyboard-area')
      .boundingClientRect()
      .select('.chord-hint')
      .boundingClientRect()
      .exec((res) => {
        const screenPxWidth = (res && res[0] && res[0].width > 0) ? res[0].width : 0
        const chordHintWidth = (res && res[1] && res[1].width > 0) ? res[1].width : 0

        if (screenPxWidth > 0) {
          console.log('[play] keyboard-area (screen width):', screenPxWidth)
          this.setData({
            keyboardW: Math.round(screenPxWidth),
            keyboardH: Math.round(res[0].height)
          })
        }
        if (chordHintWidth > 0) {
          console.log('[play] chord-hint width:', chordHintWidth)
        }

        // 核心修复：scroll-view 带 scroll-x 不尊重 flex:1，
        // boundingClientRect 返回全屏宽度，所以必须用差值计算
        if (screenPxWidth > 0 && chordHintWidth > 0) {
          this._scrollViewWidth = screenPxWidth - chordHintWidth
          this._rpxToPx = screenPxWidth / 750  // 横屏下 750rpx = 屏幕长边
          console.log('[play] computed scrollViewWidth:', this._scrollViewWidth,
                      'rpxToPx:', this._rpxToPx.toFixed(4))
        }

        this._precomputeScrollPositions()
        if (this.data.currentIndex > 0) {
          this._scrollToNote(this.data.currentIndex)
        }
      })
  },

  /**
   * 预计算每个音符的 scrollLeft
   * 所有音符统一 margin 6rpx，active 只用 scale 不变布局
   * scrollLeft = noteCenter - viewWidth * 0.5（居中）
   */
  _precomputeScrollPositions() {
    const noteWidths = this.data.noteWidths
    if (!noteWidths.length || !this._scrollViewWidth) return

    const rpxToPx = this._rpxToPx

    // CSS 值：.note-item margin: 0 6rpx, .notation-track padding: 0 8rpx
    const marginPx = 6 * rpxToPx
    const paddingPx = 8 * rpxToPx

    const anchorPoint = this._scrollViewWidth * 0.5  // 居中

    const positions = []
    let accWidth = paddingPx  // track 左 padding

    for (let i = 0; i < noteWidths.length; i++) {
      const noteWidthPx = noteWidths[i] * rpxToPx

      if (i > 0) accWidth += marginPx

      const noteCenter = accWidth + noteWidthPx / 2
      positions.push(Math.max(0, noteCenter - anchorPoint))

      accWidth += noteWidthPx + marginPx
    }

    this._noteScrollPositions = positions
    console.log('[play] precomputed', positions.length, 'positions',
                'viewW:', this._scrollViewWidth,
                'rpxToPx:', rpxToPx.toFixed(4),
                'sample:', positions.slice(0, 5).map(p => Math.round(p)),
                'mid:', positions.slice(Math.floor(positions.length/2), Math.floor(positions.length/2)+3).map(p => Math.round(p)))
  },

  /** 用 scroll-left 滚动到预计算位置 */
  _scrollToNote(index) {
    if (this._lastScrollTarget === index) return
    this._lastScrollTarget = index

    if (!this._noteScrollPositions.length) return
    const targetPos = this._noteScrollPositions[index]
    if (targetPos === undefined) return

    // 加微小偏移确保每次 scrollLeft 值不同（微信重复值不触发滚动）
    const scrollLeft = Math.max(0, targetPos) + index * 0.001
    console.log('[play] scrollToNote:', index, 'scrollLeft:', scrollLeft.toFixed(1))
    this.setData({ scrollLeft })
  },

  loadSong(songId) {
    // 停止自动播放（如有）
    this._stopAutoPlay()

    let song = songs.songMap[songId]

    // 用户自定义曲目从本地存储查找
    if (!song && songId.startsWith('user_')) {
      const userSongs = wx.getStorageSync('userSongs') || []
      song = userSongs.find(s => s.id === songId)
    }

    if (!song) {
      song = songs.getDailyRecommendation()
    }

    const noteWidths = song.notes.map(n => {
      if (n.duration >= 2) return 160
      if (n.duration >= 1.5) return 120
      if (n.duration >= 0.75) return 80
      return 60
    })

    // 预计算音符显示信息（高音点/低音点）
    const displayNotes = song.notes.map(n => {
      const note = n.note || 0
      const octave = n.octave || 0
      let displayNum = note
      let dotHigh = 0   // 上方圆点数量（高音）
      let dotLow = 0    // 下方圆点数量（低音）

      if (octave === -1) {
        // 低音：数字下方显示点
        displayNum = note
        dotLow = 1
      } else if (octave === 1) {
        // 高音：数字上方显示点
        displayNum = note
        dotHigh = 1
      } else {
        // 根据 note 值判断高音
        // note 1-7：中音，无点
        // note 8-14：高音（C5-B5），1个上方点
        // note 15-21：倍高音（C6-B6），2个上方点
        if (note > 21) {
          displayNum = note - 21
          dotHigh = 3
        } else if (note > 14) {
          displayNum = note - 14
          dotHigh = 2
        } else if (note > 7) {
          displayNum = note - 7
          dotHigh = 1
        } else {
          displayNum = note
          dotHigh = 0
        }
      }

      return {
        ...n,
        displayNum,
        dotHigh,
        dotLow
      }
    })

    this.setData({
      songId: songId,
      songTitle: song.title,
      notes: displayNotes,
      noteWidths,
      currentIndex: 0,
      score: 0, combo: 0, maxCombo: 0,
      correctCount: 0, wrongCount: 0,
      showScore: false, isPlaying: true,
      scrollLeft: 0,
      songLayer: song.layer || 1
    })
    this._lastScrollTarget = -1
    this._precomputeScrollPositions()
    this.showCurrentNote()
  },

  showCurrentNote() {
    const { notes, currentIndex } = this.data
    if (currentIndex >= notes.length) {
      this.finishSong()
      return
    }
    const note = notes[currentIndex]
    const noteOctave = note.octave || 0

    this.setData({
      currentNote: note.note,
      currentLowNote: noteOctave === -1 ? note.note : 0,
      currentChord: note.chord || '',
      noteStatus: 'waiting',
      progress: (currentIndex / notes.length * 100).toFixed(1)
    })

    this._scrollToNote(currentIndex)
  },

  onKeyDown(e) {
    if (!this.data.isPlaying || this.data.isAutoPlaying) return
    const { keyIndex, keyId } = e.detail
    const { notes, currentIndex, currentChord } = this.data
    if (currentIndex >= notes.length) return

    const currentNote = notes[currentIndex]
    const noteOctave = currentNote.octave || 0

    // 左手区（index 0-6）
    if (keyIndex < 7) {
      // 如果当前旋律音是低音（octave=-1），在左手区做旋律判定
      if (noteOctave === -1) {
        const expectedKey = audioSynth.jianpuToNoteLeft(currentNote.note)
        if (keyId === expectedKey) {
          // 正确！播和弦+旋律音
          if (currentChord) audioSynth.playChord(currentChord, 0.8, 0.4)
          audioSynth.playNote(keyId, 0.5, 0.8)
          this.setData({
            noteStatus: 'correct',
            score: this.data.score + 100,
            combo: this.data.combo + 1,
            correctCount: this.data.correctCount + 1
          })
          if (this.data.combo + 1 > this.data.maxCombo) {
            this.setData({ maxCombo: this.data.combo + 1 })
          }
          setTimeout(() => {
            this.setData({ currentIndex: currentIndex + 1 })
            this.showCurrentNote()
          }, 200)
        } else {
          // 按错左手键
          this.setData({
            noteStatus: 'wrong',
            score: Math.max(0, this.data.score - 10),
            combo: 0,
            wrongCount: this.data.wrongCount + 1
          })
          audioSynth.playNote(keyId, 0.15, 0.3)
          setTimeout(() => {
            this.setData({ noteStatus: 'waiting' })
          }, 300)
        }
        return
      }
      // 普通和弦模式
      if (currentChord) {
        audioSynth.playChord(currentChord, 0.8, 0.4)
      } else {
        audioSynth.playNote(keyId, 0.3, 0.5)
      }
      return
    }

    // 右手区 → 旋律判定
    const expectedNote = currentNote.note
    const expectedKey = audioSynth.jianpuToNoteRight(expectedNote)

    if (keyId === expectedKey) {
      this.setData({
        noteStatus: 'correct',
        score: this.data.score + 100,
        combo: this.data.combo + 1,
        correctCount: this.data.correctCount + 1
      })
      if (this.data.combo + 1 > this.data.maxCombo) {
        this.setData({ maxCombo: this.data.combo + 1 })
      }
      audioSynth.playNote(keyId, 0.5, 0.8)

      setTimeout(() => {
        this.setData({ currentIndex: currentIndex + 1 })
        this.showCurrentNote()
      }, 200)
    } else {
      this.setData({
        noteStatus: 'wrong',
        score: Math.max(0, this.data.score - 10),
        combo: 0,
        wrongCount: this.data.wrongCount + 1
      })
      audioSynth.playNote(keyId, 0.15, 0.3)

      setTimeout(() => {
        this.setData({ noteStatus: 'waiting' })
      }, 300)
    }
  },

  onKeyUp() {},

  finishSong() {
    this._stopAutoPlay()
    this.setData({ isPlaying: false })
    const total = this.data.correctCount + this.data.wrongCount
    const accuracy = total > 0 ? Math.round(this.data.correctCount / total * 100) : 0
    this.setData({ showScore: true, accuracy })

    // 记录弹奏历史
    const app = getApp()
    if (app.savePlayRecord) {
      app.savePlayRecord(this.data.songId, this.data.score, this.data.maxCombo)
    }
  },

  restartSong() {
    this.loadSong(this.data.songId || 'twinkle_star')
  },

  goBack() {
    this._stopAutoPlay()
    wx.navigateBack()
  },

  slowDown() {
    this.setData({ bpm: Math.max(40, this.data.bpm - 10) })
  },

  speedUp() {
    this.setData({ bpm: Math.min(160, this.data.bpm + 10) })
  },

  // ============ 乐谱导航：点按跳转 + 前后翻句 ============

  /** 点按简谱数字跳转到对应位置 */
  jumpToNote(e) {
    const index = e.currentTarget.dataset.index
    if (index === undefined || index >= this.data.notes.length) return
    // 停止自动播放
    this._stopAutoPlay()
    // 跳转到目标位置
    this.setData({
      currentIndex: index,
      isPlaying: true,
      showScore: false
    })
    this.showCurrentNote()
  },

  /** 跳到上一句（后退8个音符） */
  jumpPrevPhrase() {
    this._stopAutoPlay()
    let newIndex = Math.max(0, this.data.currentIndex - 8)
    this.setData({
      currentIndex: newIndex,
      isPlaying: true,
      showScore: false
    })
    this.showCurrentNote()
  },

  /** 跳到下一句（前进8个音符） */
  jumpNextPhrase() {
    this._stopAutoPlay()
    let newIndex = Math.min(this.data.notes.length - 1, this.data.currentIndex + 8)
    this.setData({
      currentIndex: newIndex,
      isPlaying: true,
      showScore: false
    })
    this.showCurrentNote()
  },

  // ============ 自动播放（演示模式） ============

  /** 开始/停止自动播放演示 */
  startAutoPlay() {
    // 如果正在播放，则停止
    if (this.data.isAutoPlaying) {
      this._stopAutoPlay()
      wx.showToast({ title: '已停止演示', icon: 'none', duration: 800 })
      return
    }

    // 如果已经弹完，重置从头开始
    if (this.data.showScore || this.data.currentIndex >= this.data.notes.length) {
      this.loadSong(this.data.songId || 'twinkle_star')
    }

    this.setData({
      isAutoPlaying: true,
      isPlaying: false,
      showScore: false
    })

    wx.showToast({ title: '演示模式', icon: 'none', duration: 1000 })

    // 从当前索引开始播放
    this._autoPlayNext()
  },

  /** 停止自动播放 */
  _stopAutoPlay() {
    if (this._autoPlayTimer) {
      clearTimeout(this._autoPlayTimer)
      this._autoPlayTimer = null
    }
    if (this.data.isAutoPlaying) {
      this.setData({
        isAutoPlaying: false,
        isPlaying: true,
        currentNote: 0,
        currentChord: ''
      })
    }
  },

  /** 自动播放下一个音符（递归链） */
  _autoPlayNext() {
    if (!this.data.isAutoPlaying) return

    const { notes, currentIndex, bpm } = this.data
    if (currentIndex >= notes.length) {
      // 演示结束
      this.setData({
        isAutoPlaying: false,
        isPlaying: true,
        currentNote: 0,
        currentChord: ''
      })
      wx.showToast({ title: '演示结束，开始弹奏吧！', icon: 'none', duration: 1500 })
      return
    }

    const note = notes[currentIndex]
    const noteOctave = note.octave || 0
    const beatMs = (60 / bpm) * 1000  // 一拍多少毫秒
    const noteDuration = note.duration * beatMs / 1000  // 音符持续时间（秒）

    // 更新 UI
    this.setData({
      currentNote: note.note,
      currentLowNote: noteOctave === -1 ? note.note : 0,
      currentChord: note.chord || '',
      noteStatus: 'waiting',
      progress: (currentIndex / notes.length * 100).toFixed(1)
    })

    // 播放旋律音（根据八度选择左右手音名）
    const keyId = noteOctave === -1 ? audioSynth.jianpuToNoteLeft(note.note) : audioSynth.jianpuToNoteRight(note.note)
    audioSynth.playNote(keyId, noteDuration * 0.9, 0.6)

    // 播和弦（如有）
    if (note.chord) {
      audioSynth.playChord(note.chord, noteDuration * 0.8, 0.35)
    }

    // 滚动到当前音符
    this._scrollToNote(currentIndex)

    // 计算下一音符的延迟时间
    const delayMs = note.duration * beatMs

    // 调度下一音符
    this._autoPlayTimer = setTimeout(() => {
      this.setData({ currentIndex: currentIndex + 1 })
      this._autoPlayNext()
    }, delayMs)
  },

  /** 页面卸载时清理定时器 */
  onUnload() {
    this._stopAutoPlay()
  }
})
