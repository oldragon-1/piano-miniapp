/**
 * 首页
 */
const songs = require('../../data/songs')

Page({
  data: {
    dailySong: null,
    filteredSongs: [],
    displayCount: 6,
    searchText: '',
    activeTag: '',
    showNotationModal: false,
    notationModalTitle: '',
    notationLines: []
  },

  onLoad() {
    this.loadSongs()
  },

  onShow() {
    // 每次显示时刷新（用户可能新增了自定义曲谱）
    this.loadSongs()
  },

  loadSongs() {
    const daily = songs.getDailyRecommendation()

    // 加载用户自定义曲谱
    const userSongs = wx.getStorageSync('userSongs') || []
    const userSongItems = userSongs.map(s => ({
      id: s.id,
      title: s.title || '未命名曲谱',
      source: 'user_import',
      difficulty: 'easy',
      access: 'free',
      tags: ['自定义'],
      noteCount: s.notes ? s.notes.length : 0
    }))

    // 合并：内置曲目 + 用户曲谱，随机排序（每次不同）
    const allSongs = [...songs.songs, ...userSongItems]
    // Fisher-Yates 洗牌算法
    for (let i = allSongs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allSongs[i], allSongs[j]] = [allSongs[j], allSongs[i]]
    }

    this.setData({
      dailySong: daily,
      filteredSongs: allSongs,
      displayCount: 6
    })
  },

  onSearch(e) {
    const text = e.detail.value.toLowerCase()
    this.setData({ searchText: text })

    if (!text) {
      this.loadSongs()
      return
    }

    const userSongs = wx.getStorageSync('userSongs') || []
    const userSongItems = userSongs.map(s => ({
      id: s.id,
      title: s.title || '未命名曲谱',
      source: 'user_import',
      difficulty: 'easy',
      access: 'free',
      tags: ['自定义'],
      noteCount: s.notes ? s.notes.length : 0
    }))
    const allSongs = [...songs.songs, ...userSongItems]

    const filtered = allSongs.filter(s =>
      s.title.toLowerCase().includes(text) ||
      s.tags.some(t => t.toLowerCase().includes(text))
    )
    this.setData({ filteredSongs: filtered, displayCount: 6 })
  },

  onTagTap(e) {
    const tag = e.currentTarget.dataset.tag
    this.setData({ activeTag: tag, displayCount: 6 })

    const userSongs = wx.getStorageSync('userSongs') || []
    const userSongItems = userSongs.map(s => ({
      id: s.id,
      title: s.title || '未命名曲谱',
      source: 'user_import',
      difficulty: 'easy',
      access: 'free',
      tags: ['自定义'],
      noteCount: s.notes ? s.notes.length : 0
    }))
    const allSongs = [...songs.songs, ...userSongItems]

    if (!tag) {
      this.setData({ filteredSongs: allSongs })
      return
    }

    const filtered = allSongs.filter(s => s.tags.includes(tag))
    this.setData({ filteredSongs: filtered })
  },

  showMoreSongs() {
    this.setData({ displayCount: this.data.filteredSongs.length })
  },

  startPlay() {
    const songId = this.data.dailySong?.id || 'twinkle_star'
    wx.navigateTo({ url: `/pages/play/play?songId=${songId}` })
  },

  goImport() {
    wx.navigateTo({ url: '/pages/import/import' })
  },

  goProfile() {
    wx.navigateTo({ url: '/pages/profile/profile' })
  },

  onSongTap(e) {
    const songId = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/play/play?songId=${songId}` })
  },

  /**
   * 查看简谱
   */
  showNotation(e) {
    const songId = e.currentTarget.dataset.id
    let songNotes = null
    let songTitle = ''

    // 用户自定义曲目
    if (songId.startsWith('user_')) {
      const userSongs = wx.getStorageSync('userSongs') || []
      const song = userSongs.find(s => s.id === songId)
      if (song) {
        songNotes = song.notes
        songTitle = song.title || '我的曲谱'
      }
    } else {
      // 内置曲目
      const song = songs.songMap[songId]
      if (song) {
        songNotes = song.notes
        songTitle = song.title
      }
    }

    if (!songNotes) return

    const lines = []
    let line = ''
    let beatCount = 0
    const beatsPerLine = 8

    for (let i = 0; i < songNotes.length; i++) {
      const n = songNotes[i]
      const durText = n.duration >= 2 ? n.duration.toString() : ''
      const noteText = n.note + durText
      if (line.length > 0) line += ' '
      line += noteText
      beatCount += n.duration
      if (beatCount >= beatsPerLine) {
        lines.push(line)
        line = ''
        beatCount = 0
      }
    }
    if (line) lines.push(line)

    this.setData({
      showNotationModal: true,
      notationModalTitle: songTitle,
      notationLines: lines
    })
  },

  hideNotationModal() {
    this.setData({ showNotationModal: false })
  }
})
