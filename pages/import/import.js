/**
 * 导入页 - 贴谱就弹
 */
const musicEngine = require('../../utils/music-engine')

Page({
  data: {
    songTitle: '',
    notation: '',
    keyIndex: 0,
    keyOptions: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    progIndex: 0,
    progOptions: ['流行', '卡农', '悲伤', '快乐'],
    progKeys: ['pop', 'canon', 'sad', 'happy'],

    transformed: false,
    noteCount: 0,
    showCopyrightModal: false,
    pendingNotation: ''
  },

  onTitleInput(e) {
    this.setData({ songTitle: e.detail.value })
  },

  onNotationInput(e) {
    this.setData({ notation: e.detail.value })
  },

  onKeyChange(e) {
    this.setData({ keyIndex: e.detail.value })
  },

  onProgressionChange(e) {
    this.setData({ progIndex: e.detail.value })
  },

  transformNotation() {
    const notation = this.data.notation.trim()
    if (!notation) {
      wx.showToast({ title: '请先粘贴简谱', icon: 'none' })
      return
    }

    // 显示版权确认弹窗
    this.setData({ pendingNotation: notation, showCopyrightModal: true })
  },

  hideCopyrightModal() {
    this.setData({ showCopyrightModal: false })
  },

  confirmTransform() {
    this.setData({ showCopyrightModal: false })
    this.doTransform(this.data.pendingNotation)
  },

  doTransform(notation) {
    const originalKey = this.data.keyOptions[this.data.keyIndex]
    const progression = this.data.progKeys[this.data.progIndex]
    const title = this.data.songTitle.trim() || '我的曲谱'

    const result = musicEngine.transformNotation(notation, {
      originalKey,
      progression,
      title
    })

    if (!result.notes || result.notes.length === 0) {
      wx.showToast({ title: '未能识别简谱，请检查格式', icon: 'none' })
      return
    }

    // 保存到本地存储
    const savedSongs = wx.getStorageSync('userSongs') || []
    result.id = 'user_' + Date.now()
    result.source = 'user_import'
    savedSongs.unshift(result)
    wx.setStorageSync('userSongs', savedSongs)

    // 临时保存到全局供预览页使用
    const app = getApp()
    app.globalData.importedSong = result

    this.setData({
      transformed: true,
      noteCount: result.notes.length
    })

    wx.showToast({ title: '保存成功！', icon: 'success' })
  },

  goPreview() {
    wx.navigateTo({
      url: `/pages/preview/preview?songId=imported`
    })
  },

  goPlay() {
    // 读取刚保存的最新曲谱
    const savedSongs = wx.getStorageSync('userSongs') || []
    if (savedSongs.length > 0) {
      wx.navigateTo({ url: `/pages/play/play?songId=${savedSongs[0].id}` })
    }
  }
})
