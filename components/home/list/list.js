// components/home/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail(e) {
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/detail/detail?id='+e.currentTarget.dataset.id
      })
    }
  }
})
