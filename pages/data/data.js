// pages/data/data.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    battery:100,
    map:{
      longitude: 121.3895035 + 0.0042,
      latitude: 31.31570244 - 0.002
    },
    paras: [
      {
        name: "电导率",
        data: 321,
        status: "正常",
        norm:{
          max:5000,
          min:0
        }
      },
      {
        name: "溶解氧",
        data: 13.74,
        status: "正常",
        norm: {
          max: 20,
          min: 2
        }
      },
      {
        name: "ORP",
        data: 138,
        status: "正常",
        norm: {
          max: 1500,
          min: 50
        }
      },
      {
        name: "氨氮",
        data: 0.8,
        status: "正常",
        norm: {
          max: 2,
          min: 0
        }
      },
      {
        name: "浊度",
        data: 14.9,
        status: "正常",
        norm: {
          max: 5000,
          min: 0
        }
      },
      {
        name: "pH",
        data: 9.17,
        status: "正常",
        norm: {
          max: 9,
          min: 6
        }
      },
      {
        name: "温度",
        data: 23.8,
        status: "正常",
        norm: {
          max: 50,
          min: 5
        }
      },
      {
        name: "速度",
        data: 1.0,
        norm: {
          max: 5,
          min: 0
        }
      }],
    markers: [{
      iconPath: "/images/icon.png",
      id: 0,
      longitude: 121.3895035 + 0.0042,
      latitude: 31.31570244 - 0.002,
      // latitude:31.31617737
      // longitude:121.38876343
      width: 30,
      height: 30
    }],
    automove:true,
    animation:'',
  },
  //拖动停止追踪艇的位置
  regionchange(e) {
    // console.log(e.causedBy)
    if(e.causedBy == 'gesture'){
      this.setData({
        automove:false
      })
    }
  },
  markertap(e) {
    // console.log(e.markerId)
  },
  controltap(e) {
    // this.mapCtx.moveToLocation()
    // console.log(e.controlId)
  },
  touch(e){
    var that = this;
    console.log(e)
    this.setData({
      "map.longitude": that.data.markers[0].longitude,
      "map.latitude": that.data.markers[0].latitude,
      automove: true,
    })
  },
  //单击地图可以追踪艇的位置
  tap(e){
    var that = this;
    console.log(e)
    this.setData({
      "map.longitude": that.data.markers[0].longitude,
      "map.latitude": that.data.markers[0].latitude,
      automove: true,
    })
    console.log(that.data.automove)
  },

  onReady: function () {
    var that = this
    wx.request({ 
      url: 'http://49.234.116.74:8000/show_data/',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode == 200) {
          // console.log("success")
          // console.log(res)
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

          })
          if (that.data.automove) {
            
            that.setData({
              "map.longitude": data.longitude + 0.0042,
              "map.latitude": data.latitude - 0.002,
              // "markers[0].longitude": data.longitude + 0.0042,
              // "markers[0].latitude": data.latitude - 0.002,
            })
            
          }
          if (that.data.markers[0].longitude != data.longitude + 0.0042 || that.data.markers[0].latitude != data.latitude - 0.002) {
            that.setData({
              "markers[0].longitude": data.longitude + 0.0042,
              "markers[0].latitude": data.latitude - 0.002,
            })
          }
          // console.log("longitude: " + that.data.map.longitude - 0.0042)
          // console.log("latitude: " + that.data.map.latitude + 0.002)
          // console.log(that.data.map)
        }
        else {
          console.log(res.statusCode)
        }
      },
      fail: function (res) {
        console.log(res.statusCode)
      },
      complete: function (res) {
        
      },
    })
    setTimeout(function(){
      that.onReady()//自动更新
    }, 1000)
    // that.onReady()//自动更新
    // 下方表格的移动
    this.animation = wx.createAnimation({
      duration: 700,
      timingFunction: 'ease',
      transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    })
  }, 
  // 打开数据表
  unfold() {
    var that = this
    // this.animationbg.opacity(0.71).step();
    this.animation.translateY(-0.35 * wx.getSystemInfoSync().windowHeight).step();
    this.setData({
      // animationbg: this.animationbg.export(),
      animation: this.animation.export(),
      unfolded: true,
    })
  },
  // 关闭数据表
  fold() {
    // this.animationbg.opacity(0).step();
    this.animation.translateY(0).step();
    this.setData({
      // animationbg: this.animationbg.export(),
      animation: this.animation.export(),
      unfolded: false,
    })
  },
  touchStart: function (e) {
    // console.log(e.touches[0].pageX)
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.data.touchS = [sx, sy]
  },
  touchMove: function (e) {
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.data.touchE = [sx, sy]
  },
  touchEnd: function (e) {
    let start = this.data.touchS
    let end = this.data.touchE
    var dist = 100
    // console.log(start)
    // console.log(end)
    console.log(start[1] - end[1])
    if (start[1] - end[1] < - dist) {
      console.log('下滑')
      this.fold()
    } else if (start[1] - end[1] > dist) {
      console.log('上滑')
      this.unfold()
    } else {
      console.log('静止')
    }
  },
  tapPanel:function(e){
    this.unfold()
  },
  navigateTo:function(){
    wx.navigateTo({
      url: '../charts/charts',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})