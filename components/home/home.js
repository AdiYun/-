// components/home/home.js
import { innerAudioContext } from "./../../utils/util.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls: {
      type: Array
    },
    list: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls: [],
    list: [],
    listlength: 20
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tap(e) {
      console.log(e)
      console.log(this.data.list)
    },
    change(e) {          
      this.triggerEvent('myevent', {index: e.currentTarget.dataset.index})
      wx.navigateTo({
        url: '/pages/detail/detail?albumid=' + this.data.list[e.currentTarget.dataset.index].album.mid + '&index=' + e.currentTarget.dataset.index
      })
      innerAudioContext.pause();
      innerAudioContext.onPause((res) => {
        console.log("暂停")
        // console.log(res.errCode)
      })
    },
    switchPlay(e) {
      this.triggerEvent('switchPlay')
    },
    backTop(e) {
      console.log(e)
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    }
  }
})
