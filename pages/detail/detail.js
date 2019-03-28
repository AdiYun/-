// pages/detail/detail.js
import { innerAudioContext, formatTime } from "./../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detaillist: [],
    albumid: '',
    detaillrc: '',
    playFlag: true,
    play_flag: true,
    currentIndex222: 0,
    marginTop: 0,
    currentProcess: '00:00',
    totalProcess: '--:--',
    currentProcessNum: 0,
    totalProcessNum: 1,
    canSlider: false
  },
  kuaijin(e) {
    innerAudioContext.seek(e.detail.value)
  },
  player() {
    this.setData({
      player_flag: !this.data.player_flag,
      playFlag: !this.data.playFlag
    })
    if (this.data.playFlag == true) {

      // innerAudioContext.autoplay = this.data.playFlag
      innerAudioContext.src = this.data.detaillist.songs[0].url || 'https://api.bzqll.com/music/tencent/url?key=579621905&id=' + this.data.detaillist.mid + 'br=320'
      innerAudioContext.play()
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    } else {
      innerAudioContext.pause();
      innerAudioContext.onPause((res) => {
        console.log("暂停")
        // console.log(res.errCode)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    innerAudioContext.onPause((res) => {
      console.log("暂停")
      // console.log(res.errCode)
      this.data.play_flag == true
      
    })
    this.setData({
      albumid: options.albumid
    })
    innerAudioContext.onEnded(() => {
      this.player()
      
    })
    console.log(options)
    wx.request({
      url: 'https://api.bzqll.com/music/tencent/album?key=579621905&id='+this.data.albumid,
      // url: 'https://api.bzqll.com/music/tencent/album?key=579621905&id=002WADis3j4vGf',
      success: (res) => {
        this.setData({
          detaillist: res.data.data
        })
        console.log(res.data.data.songs[0].lrc)
        if (res.data.data.songs[0].lrc) {
        wx.request({
          url: res.data.data.songs[0].lrc,
          success: (res) => {
            var lines = res.data.split('\n')
            var result =[];
            var pattern = /\[\d{2}:\d{2}.\d{2}\]/g
            while (!pattern.test(lines[0])) {
              lines = lines.slice(1);
            };
            //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
            lines[lines.length - 1].length === 0 && lines.pop();
            lines.forEach(function (v /*数组元素值*/, i /*元素索引*/, a /*数组本身*/) {
              var time = v.match(pattern),
                value = v.replace(pattern, '');
              time.forEach(function (v1, i1, a1) {
                var t = v1.slice(1, -1).split(':');
                //将结果压入最终数组
                result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
              });
            });
            result.sort(function (a, b) {
              return a[0] - b[0];
            });
            console.log(result)
            this.setData({
              detaillrc: result
            })
          },
          fail: (error) => {
            this.setData({
              detaillrc: ['暂时没有歌词']
            })
          }
        })
        } else {
          this.setData({
            detaillrc: ['暂时没有歌词']
          })
        }
        // innerAudioContext.autoplay = this.data.playFlag
        innerAudioContext.src = this.data.detaillist.songs[0].url || 'https://api.bzqll.com/music/tencent/url?key=579621905&id=' + this.data.detaillist.mid + 'br=320'
        innerAudioContext.play()
        innerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
        
        let index= 0
        innerAudioContext.onTimeUpdate(()=> {
          // console.log(innerAudioContext.currentTime)
          this.setData({
            currentProcessNum: innerAudioContext.currentTime
          })
          
          this.setData({
            currentProcess: formatTime(Math.floor(innerAudioContext.currentTime / 60), Math.floor((innerAudioContext.currentTime / 60 - Math.floor(innerAudioContext.currentTime / 60)) * 60))
          })
          if (this.data.totalProcess == '--:--') {
            this.setData({
              totalProcess: formatTime(Math.floor(innerAudioContext.duration / 60), Math.floor((innerAudioContext.duration / 60 - Math.floor(innerAudioContext.duration / 60)) * 60)),
              totalProcessNum: Math.floor(innerAudioContext.duration)
            })
            // console.log(innerAudioContext.duration)
          }
          if (this.data.currentIndex222 >= 3) {//超过6行开始滚动
            this.setData({
              marginTop: (this.data.currentIndex222 - 3) * 21
            })
          }
          // 文稿对应行颜色改变
          if (this.data.currentIndex222 != this.data.detaillrc.length - 1) {//
            var j = 0;
            for (var j = this.data.currentIndex222; j < this.data.detaillrc.length; j++) {
              // 当前时间与前一行，后一行时间作比较， j:代表当前行数
              if (this.data.currentIndex222 == this.data.detaillrc.length - 2) {
                //最后一行只能与前一行时间比较
                if (parseFloat(innerAudioContext.currentTime) > parseFloat(this.data.detaillrc[this.data.detaillrc.length - 1][0])) {
                  this.setData({
                    currentIndex222: this.data.detaillrc.length - 1
                  })
                  return;
                }
              } else {
                if (parseFloat(innerAudioContext.currentTime) > parseFloat(this.data.detaillrc[j][0]) && parseFloat(innerAudioContext.currentTime) < parseFloat(this.data.detaillrc[j + 1][0])) {
                  this.setData({
                    currentIndex222: j
                  })
                  return;
                }
              }
            }
          }
        })
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