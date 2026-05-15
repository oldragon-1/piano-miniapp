/**
 * 我的页面
 */
const songs = require('../../data/songs')

Page({
  data: {
    weeklyPlayDays: 0,
    totalPlays: 0,
    userSongCount: 0,
    recentSongs: [],
    userSongs: [],
    bestSong: { title: '暂无', score: 0 },
    favoriteSong: { title: '暂无', count: 0 },
    showNotationModal: false,
    notationModalTitle: '',
    notationLines: []
  },

  onLoad() {
    this.loadStats()
    this._generateShareImage()
  },

  onShow() {
    this.loadStats()
    this._generateShareImage()
  },

  loadStats() {
    const history = wx.getStorageSync('playHistory') || []
    const userSongs = wx.getStorageSync('userSongs') || []

    // Calculate weekly play days
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    weekStart.setHours(0, 0, 0, 0)
    const days = new Set()
    history.forEach(h => {
      const d = new Date(h.date)
      if (d >= weekStart) {
        days.add(d.toDateString())
      }
    })

    // Get recent songs with song titles
    const recentSongs = history.slice(0, 5).map(h => {
      const song = songs.songMap[h.songId]
      // 也从用户曲谱里找
      const userSong = !song ? userSongs.find(s => s.id === h.songId) : null
      return {
        id: h.songId,
        title: song ? song.title : (userSong ? userSong.title : '自定义曲目'),
        score: h.score,
        date: new Date(h.date).toLocaleDateString('zh-CN')
      }
    })

    // 用户曲谱列表（展示标题+音符数）
    const userSongList = userSongs.map(s => ({
      id: s.id,
      title: s.title || '未命名曲谱',
      noteCount: s.notes ? s.notes.length : 0,
      date: s.id ? new Date(parseInt(s.id.replace('user_', ''))).toLocaleDateString('zh-CN') : ''
    }))

    // 计算最擅长的曲目（得分最高）和常弹曲目（次数最多）
    let bestSong = { title: '暂无', score: 0 }
    let favoriteSong = { title: '暂无', count: 0 }
    const songPlayCount = {}

    if (history.length > 0) {
      // 得分最高的
      history.forEach(h => {
        // 找歌名
        const song = songs.songMap[h.songId]
        const userSong = !song ? userSongs.find(s => s.id === h.songId) : null
        const title = song ? song.title : (userSong ? userSong.title : '自定义曲目')

        // 记录最高分
        if (h.score > bestSong.score) {
          bestSong = { title, score: h.score }
        }

        // 统计弹奏次数
        if (!songPlayCount[title]) songPlayCount[title] = 0
        songPlayCount[title]++
      })

      // 弹奏次数最多的
      let maxCount = 0
      Object.keys(songPlayCount).forEach(title => {
        if (songPlayCount[title] > maxCount) {
          maxCount = songPlayCount[title]
          favoriteSong = { title, count: songPlayCount[title] }
        }
      })
    }

    this.setData({
      weeklyPlayDays: days.size,
      totalPlays: history.length,
      userSongCount: userSongs.length,
      recentSongs,
      userSongs: userSongList,
      bestSong,
      favoriteSong
    })
  },

  goImport() {
    wx.navigateTo({ url: '/pages/import/import' })
  },

  playUserSong(e) {
    const songId = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/play/play?songId=${songId}` })
  },

  deleteUserSong(e) {
    const songId = e.currentTarget.dataset.id
    const song = this.data.userSongs.find(s => s.id === songId)
    wx.showModal({
      title: '删除曲谱',
      content: `确定删除"${song.title}"吗？`,
      confirmColor: '#E86A00',
      success: (res) => {
        if (res.confirm) {
          const userSongs = wx.getStorageSync('userSongs') || []
          const updated = userSongs.filter(s => s.id !== songId)
          wx.setStorageSync('userSongs', updated)
          this.loadStats()
          wx.showToast({ title: '已删除', icon: 'success' })
        }
      }
    })
  },

  showNotation(e) {
    const songId = e.currentTarget.dataset.id
    const userSongs = wx.getStorageSync('userSongs') || []
    const song = userSongs.find(s => s.id === songId)
    if (!song || !song.notes) return

    // 将 notes 数组格式化为可读简谱
    const notes = song.notes
    const lines = []
    let line = ''
    let beatCount = 0
    const beatsPerLine = 8  // 每行8拍

    for (let i = 0; i < notes.length; i++) {
      const n = notes[i]
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
      notationModalTitle: song.title || '简谱',
      notationLines: lines
    })
  },

  hideNotationModal() {
    this.setData({ showNotationModal: false })
  },

  goHome() {
    wx.navigateBack({ delta: 1 })
  },

  // ============ 分享功能 ============

  /** 分享给朋友 */
  onShareAppMessage() {
    const stats = this.data
    return {
      title: '我最近在练「' + (stats.favoriteSong.title !== '暂无' ? stats.favoriteSong.title : '钢琴曲') + '」🎹',
      path: '/pages/profile/profile',
      imageUrl: this._shareImagePath || '/images/share_card_bg.png'
    }
  },

  /** 分享到朋友圈 */
  onShareTimeline() {
    const stats = this.data
    return {
      title: '我最近在练「' + (stats.favoriteSong.title !== '暂无' ? stats.favoriteSong.title : '钢琴曲') + '」🎹',
      imageUrl: this._shareImagePath || '/images/share_card_bg.png'
    }
  },

  /** 生成带成就的分享图片 */
  _generateShareImage() {
    const that = this
    const query = wx.createSelectorQuery().in(this)
    query.select('#shareCanvas').node().exec((res) => {
      if (!res || !res[0] || !res[0].node) return
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')
      const W = 360, H = 640

      // 设置画布实际像素
      const dpr = wx.getSystemInfoSync().pixelRatio || 2
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)

      // === 背景：暖橙渐变 ===
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H)
      bgGrad.addColorStop(0, '#FF8C00')
      bgGrad.addColorStop(0.4, '#FFA500')
      bgGrad.addColorStop(0.7, '#FFB84D')
      bgGrad.addColorStop(1, '#FFD4A0')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, W, H)

      // === 装饰：底部钢琴键 ===
      const keyCount = 14
      const keyW = W / keyCount
      ctx.fillStyle = 'rgba(255,255,255,0.12)'
      for (let i = 0; i < keyCount; i++) {
        const kx = i * keyW
        const kh = i % 2 === 0 ? 100 : 70
        ctx.fillRect(kx, H - kh, keyW - 2, kh)
      }

      // === 装饰：漂浮音符 ===
      ctx.fillStyle = 'rgba(255,255,255,0.08)'
      const notes = [
        [80, 120, 16], [280, 80, 12], [50, 300, 10],
        [300, 200, 14], [180, 400, 11], [310, 480, 9]
      ]
      notes.forEach(([nx, ny, ns]) => {
        ctx.font = `${ns}px sans-serif`
        ctx.fillText('♩', nx, ny)
      })

      // === 半透明遮罩（文字区加深） ===
      ctx.fillStyle = 'rgba(0,0,0,0.25)'
      ctx.fillRect(20, 30, W - 40, 100)
      ctx.fillRect(30, 150, W - 60, 300)
      ctx.fillRect(30, 470, W - 60, 60)

      // === 标题 ===
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 22px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('🎹 钢琴谱简化助手', W / 2, 55)

      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.font = '14px sans-serif'
      ctx.fillText('我的练琴成就', W / 2, 85)

      // === 内容化展示 ===
      const stats = that.data

      // 最擅长的曲目
      ctx.fillStyle = 'rgba(255,255,255,0.15)'
      ctx.beginPath()
      ctx.roundRect(30, 160, W - 60, 100, 12)
      ctx.fill()

      ctx.fillStyle = '#FFD700'
      ctx.font = 'bold 16px sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText('🏆 我的拿手好曲', 50, 190)

      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 24px sans-serif'
      ctx.fillText(stats.bestSong.title, 50, 230)

      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.font = '13px sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText('最高 ' + stats.bestSong.score + ' 分', W - 50, 230)

      // 常弹的曲目
      ctx.fillStyle = 'rgba(255,255,255,0.15)'
      ctx.beginPath()
      ctx.roundRect(30, 280, W - 60, 100, 12)
      ctx.fill()

      ctx.fillStyle = '#FFD700'
      ctx.font = 'bold 16px sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText('🎵 我常弹的曲目', 50, 310)

      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 24px sans-serif'
      ctx.fillText(stats.favoriteSong.title, 50, 350)

      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.font = '13px sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText('弹了 ' + stats.favoriteSong.count + ' 次', W - 50, 350)

      // 最近弹奏
      if (stats.recentSongs.length > 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.15)'
        ctx.beginPath()
        ctx.roundRect(30, 400, W - 60, 90, 12)
        ctx.fill()

        ctx.fillStyle = '#FFD700'
        ctx.font = 'bold 16px sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText('🕐 最近在练', 50, 430)

        const recents = stats.recentSongs.slice(0, 3)
        ctx.fillStyle = 'rgba(255,255,255,0.8)'
        ctx.font = '15px sans-serif'
        recents.forEach((r, i) => {
          ctx.fillText(r.title, 50 + (i * 95), 470)
        })
      }

      // === 底部邀约 ===
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = '15px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('扫描小程序码，一起轻松学钢琴', W / 2, 570)

      // === 导出为临时文件 ===
      wx.canvasToTempFilePath({
        canvas,
        x: 0, y: 0,
        width: W, height: H,
        destWidth: W * dpr,
        destHeight: H * dpr,
        fileType: 'png',
        quality: 1
      }, that).then((res) => {
        if (res && res.tempFilePath) {
          that._shareImagePath = res.tempFilePath
          console.log('[share] image generated:', res.tempFilePath)
        }
      }).catch(() => {
        // 静默失败
      })
    })
  }
})
