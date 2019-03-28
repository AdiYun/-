const formatTime = (a, b) => {
  // const year = date.getFullYear()
  // const month = date.getMonth() + 1
  // const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  return [a, b].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const innerAudioContext = wx.createInnerAudioContext()
module.exports = {
  formatTime: formatTime,
  innerAudioContext
}
