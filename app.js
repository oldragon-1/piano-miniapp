App({
  globalData: {
    currentSong: null,
    importedSong: null,
    playHistory: [],
    weeklyPlayDays: 0
  },

  onLaunch() {
    // Load play history from local storage
    try {
      const history = wx.getStorageSync('playHistory') || []
      this.globalData.playHistory = history

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
      this.globalData.weeklyPlayDays = days.size
    } catch (e) {
      console.error('Load history error:', e)
    }
  },

  // Save play record
  savePlayRecord(songId, score, combo) {
    const record = {
      songId,
      score,
      combo,
      date: new Date().toISOString()
    }
    const history = this.globalData.playHistory
    history.unshift(record)
    if (history.length > 50) history.pop()
    this.globalData.playHistory = history
    wx.setStorageSync('playHistory', history)
  }
})
