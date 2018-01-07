// pages/jifen/jifen.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jfindex: 3,
    jifen: [
    ],
    source:0
  },
  initJ: function () {
  
    var jf = this.data.jifen;
    for (var item in jf) {
      jf[item].active = false;
    }
    this.setData({
      jifen: jf
    })
  },
  chooseIt: function (e) {
    var jf = this.data.jifen;
    if (jf[e.currentTarget.dataset.index].active) {
      jf[e.currentTarget.dataset.index].active = false;
      this.setData({
        jifen: jf,
        jfindex: 3,
   
      })
    } else {
      this.initJ();
      console.log(e)
      jf[e.currentTarget.dataset.index].active = true;
      this.setData({
        jifen: jf,
        jfindex: e.currentTarget.dataset.index,
        source: this.data.jifen[e.currentTarget.dataset.index].value
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.post('shop/findimageandtext', { type: 4, appid: app.sunwouId },
      function (res) {
        var list=JSON.parse(res.body[0].image).list;
        var rs=[];
        for(var i=0;i<list.length;i++)
        {
            var temp={active:false,label:list[i].label,value:list[i].value};
            rs.push(temp);
        }
        that.setData({
          jifen:rs
        })
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
  
  },
    luck: function () {
    if (this.data.jfindex == 3) {
      wx.showModal({
        title: '提示',
        content: '选择兑换方式',
        showCancel: false,
        confirmText: '朕知道了'
      })
    }
    else {
      app.post('user/source',
        { type: 2, number: this.data.source, userId: app.globalData.userId },
        function (res) {
          wx.showModal({
            title: '提示',
            content: res.result,
            showCancel: false,
            confirmText: '朕知道了'
          })
        })
    }
  }
})
