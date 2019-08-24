// pages/data/data.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    battery:100,
    map:{
      longitude:121.40170584,
      latitude:31.31244167
    },
    paras: [
      {
        name: "电导率",
        data: 321,
        status: "正常"
      },
      {
        name: "溶解氧",
        data: 13.74,
        status: "正常"
      },
      {
        name: "ORP",
        data: 138,
        status: "正常"
      },
      {
        name: "氨氮",
        data: 0.8,
        status: "正常"
      },
      {
        name: "浊度",
        data: 14.9,
        status: "正常"
      },
      {
        name: "pH",
        data: 9.17,
        status: "正常"
      },
      {
        name: "温度",
        data: 23.8,
        status: "正常"
      },
      {
        name: "速度",
        data: 1.0,
      }],
    markers: [{
      iconPath: "/images/icon.png",
      id: 0,
      latitude: 31.31244167,
      longitude: 121.40170584,
      // latitude:31.31617737
      // longitude:121.38876343
      width: 30,
      height: 30
    }],
    // polyline: [{
    //   points: [{
    //     longitude: 31.31244167,
    //     latitude: 121.40170584
    //   }, {
    //     longitude: 31.32244180,
    //     latitude: 121.42170590
    //   }],
    //   color: "#000000",
    //   width: 2,
    //   dottedLine: true
    // }],
    controls: [{
      id: 1,
      // iconPath: '/images/icon.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]

  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this

    setTimeout(function () {
      that.setData({
        "markers[0].longitude": that.data.markers[0].longitude + 0.000001,
        "markers[0].latitude": that.data.markers[0].latitude,
        "map.longitude": that.data.map.longitude + 0.000001,
        "map.latitude": that.data.map.latitude
      })//要延时执行的代码
      console.log(that.data.markers[0].longitude)
    }, 1500) //延迟时间 这里是1秒

    /*wx.request({ //需要实时更新把他打开，测试用就没打开
      url: 'http://172.20.10.5:8000/show_data/',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode == 200) {
          console.log("success")
          console.log(res)
          var data = res.data
          that.setData({
            battery: data.battery,
            "paras[0].data": data.diandaolv,
            "paras[1].data": data.rongjieyang,
            "paras[2].data": data.orp,
            "paras[3].data": data.andan,
            "paras[4].data": data.zhuodu,
            "paras[5].data": data.ph,
            "paras[6].data": data.temperature,
            "paras[7].data": data.vel,
            "markers[0].longitude": data.longitude,
            "markers[0].latitude": data.latitude
          })
        }
        else {
          console.log(res.statusCode)
        }
      },
      fail: function (res) {
        console.log("fail")
      },
      complete: function (res) {
        
      },
    })*/
    // this.onReady()//自动更新
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