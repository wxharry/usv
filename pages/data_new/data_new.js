// pages/data/data.js
Page({

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
      width: 30,
      height: 30
    }],
    unfolded:false,
    animation: '',
    automove:false,
    scale: 18
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

  touch(e){
    // var that = this;
    // // console.log(e)
    // this.setData({
    //   "map.longitude": that.data.markers[0].longitude,
    //   "map.latitude": that.data.markers[0].latitude,
    //   automove: true,
    // })
  },
  //单击地图可以追踪艇的位置
  tap(e){
    var that = this;
    this.setData({
      "map.longitude": that.data.markers[0].longitude,
      "map.latitude": that.data.markers[0].latitude,
      "scale":18,
      automove: true,
    })
    // this.getCenterLocation()
  },

  onLoad(option){
    this.mapCtx = wx.createMapContext("myMap");
  },

  onReady: function () {
    var that = this
    wx.request({ 
      url: 'http://49.234.116.74:8000/show_data/',
      // url:'https://www.coursehelper.xyz:8000/show_data/',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode == 200) {
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
            // "markers[0].longitude": data.longitude + 0.0042,
            // "markers[0].latitude": data.latitude - 0.002,

          })
          that.translateMarker(data.latitude - 0.002, data.longitude + 0.0042)
          // that.translateMarker(that.data.markers[0].latitude, that.data.markers[0].latitude)

          // that.moveToLocation(data.latitude - 0.002, data.longitude + 0.0042)
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
    // that.onReady()//自动更新  // 下方表格的移动
    this.animation = wx.createAnimation({
      duration: 700,
      timingFunction: 'ease',
      transformOrigin: 'left top 0',
      success: function (res) {
        // console.log(res)
      }
    })
  },

  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        // console.log(res.longitude)
        // console.log(res.latitude)
      }
    })
  },
  //将地图中心移动到当前定位点
  moveToLocation: function (lat, lon) {
    this.mapCtx.moveToLocation({
      latitude:lat,
      longitude:lon
    })
  },
  //平移marker，带动画
  translateMarker: function (lat, lon) {
    var that = this;
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: false,
      // duration: 500,
      destination: {
        latitude: lat,
        longitude: lon,
      },
      animationEnd() {
        // console.log('animation end')
        if (that.data.automove) {
          that.setData({
            "map.longitude": lon,
            "map.latitude": lat,
            // "markers[0].longitude": data.longitude + 0.0042,
            // "markers[0].latitude": data.latitude - 0.002,
          })
        }
      }
    })

  },
  scaleClick: function () {
    this.mapCtx.getScale({
      success: function (res) {
        // console.log(res)
        return res.scale;
      }
    })
  },

  // 打开数据表
  unfold() {
    this.animation.translateY(-0.35 * wx.getSystemInfoSync().windowHeight).step();
    // var s = this.scaleClick()+1 ;
    // console.log(s)
    this.setData({
      animation: this.animation.export(),
      unfolded: true,
      // scale: s-1
    })
    // console.log('scale = ' + this.data.scale);
  },

  // 关闭数据表
  fold() {
    this.animation.translateY(0).step();
    // var s = this.scaleClick();
    // console.log(this.data.scale);
    this.setData({
      animation: this.animation.export(),
      unfolded: false,
      // scale: (s + 1),
    })
    // console.log('scale = ' + this.data.scale);
  },

  // 触碰监测
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
    if(end!=undefined){
      // console.log(start[1] - end[1])
      if (end[1] - start[1] > dist) {
        // console.log('下滑')
        this.fold()
      } else if (start[1] - end[1] > dist) {
        // console.log('上滑')
        this.unfold()
      } else {
        // console.log('静止')
      }
    }

  },
  tapPanel:function(e){
    if (this.data.unfolded){
      this.fold()
    }
    else{
      this.unfold()
    }
  },
  navigateTo:function(){
    wx.navigateTo({
      url: '/pages/detail',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})