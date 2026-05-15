/**
 * 预览页 - 简谱展示 + 演示播放 + 交互
 */
const songs = require('../../data/songs')
const audioSynth = require('../../utils/audio-synth')

Page({
  data: {
    songTitle: '',
    songId: '',
    notes: [],
    currentIndex: 0,
    currentNote: 0,
    currentChord: '',
    speed: 'normal',
    speedBpm: 80,
    isPlaying: false,
    noteTextMap: { 1: 'Do', 2: 'Re', 3: 'Mi', 4: 'Fa', 5: 'Sol', 6: 'La', 7: 'Si' }
  },

  onLoad(options) {
    const songId = options.songId || 'twinkle_star'
    this.loadSong(songId)
  },

  loadSong(songId) {
    // 优先从全局获取刚导入的曲谱
    if (songId === 'imported') {
      const app = getApp()
      const imported = app.globalData.importedSong
      if (imported) {
        this.setData({
          songId: imported.id || 'imported',
          songTitle: imported.title || '我的曲谱',
          notes: imported.notes,
          currentIndex: 0
        })
        return
      }
    }

    // 用户自定义曲目从本地存储查找
    if (songId.startsWith('user_')) {
      const userSongs = wx.getStorageSync('userSongs') || []
      const song = userSongs.find(s => s.id === songId)
      if (song) {
        this.setData({
          songId: songId,
          songTitle: song.title || '我的曲谱',
          notes: song.notes,
          currentIndex: 0,
          currentNote: 0,
          currentChord: ''
        })
        return
      }
    }

    // 内置曲目
    const song = songs.songMap[songId] || songs.getDailyRecommendation()
    this.setData({
      songId: songId,
      songTitle: song.title,
      notes: song.notes,
      currentIndex: 0,
      currentNote: 0,
      currentChord: ''
    })
  },

  setSpeed(e) {
    const speed = e.currentTarget.dataset.speed
    const bpm = speed === 'slow' ? 60 : 80
    this.setData({ speed, speedBpm: bpm })
    if (this.data.isPlaying) {
      this.stopDemo()
      this.startDemo()
    }
  },

  togglePlayDemo() {
    if (this.data.isPlaying) {
      this.stopDemo()
    } else {
      this.startDemo()
    }
  },

  startDemo() {
    const { notes, speedBpm } = this.data
    if (!notes.length) return

    let index = 0
    const interval = 60000 / speedBpm

    this.setData({ isPlaying: true, currentIndex: 0 })

    this._demoTimer = setInterval(() => {
      if (index >= notes.length) {
        this.stopDemo()
        this.setData({ currentIndex: 0, currentNote: 0, currentChord: '' })
        return
      }

      const note = notes[index]
      const noteName = audioSynth.jianpuToNoteRight(note.note)

      this.setData({
        currentIndex: index,
        currentNote: note.note,
        currentChord: note.chord || ''
      })

      audioSynth.playNote(noteName, 0.4, 0.7)

      if (index === 0 || notes[index - 1]?.chord !== note.chord) {
        audioSynth.playChord(note.chord, 1.0, 0.3)
      }

      index++
    }, interval)
  },

  stopDemo() {
    if (this._demoTimer) {
      clearInterval(this._demoTimer)
      this._demoTimer = null
    }
    this.setData({
      isPlaying: false,
      currentIndex: 0,
      currentNote: 0,
      currentChord: ''
    })
  },

  onKeyDown(e) {
    const { keyId } = e.detail
    audioSynth.playNote(keyId, 0.4, 0.7)
  },

  startPlay() {
    this.stopDemo()
    wx.navigateTo({ url: `/pages/play/play?songId=${this.data.songId}` })
  },

  onUnload() {
    this.stopDemo()
  }
})
