// pages/home/home.js
import { innerAudioContext } from "./../../utils/util.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeindex: 1,
    imgUrls: [],
    line_left: '100%',
    player_flag: false,
    playFlag: false,
    add_flag: false,
    tuijianList: [],
    foot_index: 0
  },
  switchtab (e) {
    this.setData({
      activeindex: e.currentTarget.dataset.index,
      line_left: e.currentTarget.dataset.index * 100 +'%'
    })
  },
  player () {
    this.setData({
      player_flag: !this.data.player_flag,
      playFlag: !this.data.playFlag
    })
    if(this.data.playFlag == true) {
      
      // innerAudioContext.autoplay = this.data.playFlag
      innerAudioContext.src = 'https://api.bzqll.com/music/tencent/url?key=579621905&id='+this.data.tuijianList[this.data.foot_index].mid+'br=320'
      innerAudioContext.play()
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    }else {
      innerAudioContext.pause();
      innerAudioContext.onPause((res) => {
        console.log("暂停")
        // console.log(res.errCode)
      })
    }
    
  },
  switchPlay() {
    
  },
  add_like() {
    this.setData({
      add_flag: !this.data.add_flag
    })
  },
  onHomeEvent (e) {
    this.setData({
      foot_index: e.detail.index,
      player_flag: true,
      playFlag: true
    })

    innerAudioContext.autoplay = this.data.playFlag
    innerAudioContext.src = 'https://api.bzqll.com/music/tencent/url?key=579621905&id=' + this.data.tuijianList[this.data.foot_index].mid + 'br=320'
    // innerAudioContext.play()
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    console.log()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?albumid=' + this.data.tuijianList[this.data.foot_index].album.mid + '&index=' + this.data.foot_index
    })
  },
  onLoad: function (options) {
    innerAudioContext.onPause((res) => {
      console.log("暂停")
      // console.log(res.errCode)
      if (this.data.play_flag == false) {
        this.player();
      }
    })
    wx.request({
      url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1552715803733&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1',
      success: (res) => {
        // console.log(res.data)
        this.setData({
          imgUrls: res.data.data.slider
        })
      }
    })
    wx.request({
      url: 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=recom4281913687719865&g_tk=1662067997&loginUin=1336031493&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data={"comm":{"ct":24},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}}}',
      success: (res) => {
        this.setData({
          tuijianList: res.data.new_song.data.song_list
        })
        wx.setStorage({
          key: 'tuijianlist',
          data: res.data.new_song.data.song_list
        })
        console.log(this.data.tuijianList)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})