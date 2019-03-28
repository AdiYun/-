// components/rank/rank.js
import { innerAudioContext } from "./../../utils/util.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    search(e) {
      wx.request({
        url: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=57126771654652665&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w='+e.detail.value+'&g_tk=1391306671&loginUin=1336031493&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0',
        success: (res) => {
          console.log(res.data.data.song.list)
          this.setData({
            list: res.data.data.song.list
          })
        }
      })
      console.log(e.detail.value)
    },
    change(e) {
      console.log(this.data.list[e.currentTarget.dataset.index].id)
      this.triggerEvent('myevent', { index: e.currentTarget.dataset.index })
      wx.navigateTo({
        url: '/pages/detail/detail?albumid=' + this.data.list[e.currentTarget.dataset.index].album.mid + '&index=' + e.currentTarget.dataset.index
      })
      innerAudioContext.pause();
      innerAudioContext.onPause((res) => {
        console.log("暂停")
        // console.log(res.errCode)
      })
    }
  }
})
