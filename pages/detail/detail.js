var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
Page({
  data: {
    flex:1.5,//[1,2) 
    activeTab:0,
    paras: [
      {
        name: "温度",
        data: 23.8,
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
        name: "电导率",
        data: 321,
        status: "正常"
      },
      // {
      //   name: "速度",
      //   data: 1.0,
      // }
      ],
    
    allData: [
      {
        name: "温度",
        data: [23.8, 23.8, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 23.8, 23.8, 23.7, 23.7, 23, 23, 22.9, 22.9],
        txt: '',
        unit: '℃'
      },

      {
        name: "溶解氧",
        data: [13.74, 13.74, 16.46, 16.46, 16.33, 16.46, 16.67, 16.67, 16.8, 16.92, 16.92, 16.92, 16.92, 16.92, 16.92, 17.01, 17.01, 16.8, 16.8, 16.8, 16.8, 16.8, 14.16, 14.16, 14.16, 14.5, 16.8, 16.8, 16.58, 16.8],
        txt: '',
        unit:'mg/L'
      },
      {
        name: "ORP氧化还原电位",
        data: [138, 138, 138, 138, 139, 139, 138, 138, 138, 138, 138, 138, 138, 138, 138, 138, 138, 138, 138, 137, 137, 138, 137, 137, 138, 138, 137, 137, 136, 136],
        txt: '',
        unit: 'mg/L'
      },
      {
        name: "氨氮",
        data: [0.8, 0.8, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.8, 0.7, 0.7, 0.7, 0.2, 0.2, 0.2, 0.2],
        txt: '',
        unit:'mg/L'
      },
      {
        name: "浊度",
        data: [14.9, 14.6, 13.8, 13.6, 14.5, 14.9, 14.2, 15.3, 13.7, 14.2, 14.2, 14.2, 14.3, 14, 13.8, 13.8, 13.9, 14.2, 14.2, 13.9, 14.6, 14.5, 14.4, 14.8, 14.9, 15.4, 14.3, 14.3, 12.3, 13.4],
        txt: '',
        unit:'NTU'
      },
      {
        name: "pH",
        data: [9.17, 9.17, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.14, 9.14, 9.14, 9.14],
        txt: '',
        unit: ''
      },
      {
        name: "电导率",
        data: [321, 321, 358, 358, 354, 354, 354, 354, 344, 344, 344, 344, 344, 344, 344, 344, 344, 344, 344, 344, 344, 344, 321, 317, 317, 317, 344, 344, 337, 337],
        txt: '',
        unit: 'μs / cm'
      },
      // {
      //   name: "速度",
      //   data: [0, 0.9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.1, 1.2, 1.4, 1.4, 1.3, 1.3, 1.3, 1.3],
      //   txt: '',
      //   unit: 'm/s'
      // }
      ],
    selectChart:0, //default chart
    touch: {
      distance: 0,
      // scale: 1,
      // baseWidth: 0,
      // baseHeight: 0,
      // scaleWidth: 600,
      // scaleHeight: 800,
    },
    // context:'',
  },
  switchNav:function(e){
    // console.log(e.currentTarget.dataset.idx);
    var idx = e.currentTarget.dataset.idx;
    if(idx != this.data.activeTab){
      this.setData({
        activeTab: idx,
      })
      this.chgChart(e)
    }

  },

  flex: function (e) {
    var that = this,
    flex = that.data.flex;
    // console.log(e)
    if (e.currentTarget.dataset.state === 'minus') {
      flex -= 0.1;
      flex = flex <= 1 ? 1 : flex;
    } else {
      flex += 0.1;
      flex = flex >= 2 ? 1.9 : flex;
    }
    //节流
    setTimeout(function () {
      that.setData({
        flex: flex,
      });
      lineChart.updateData({
        flex: flex,
      });
      wx.setStorage({
        key: 'flex',
        data: flex,
      })
    }, 200)
  },


  touchHandler: function (e) {
    // console.log(e)
    // console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
        // background: '#7cb5ec',
      format: function (item, category) {
          return category + ' ' + item.name + ':' + item.data 
      }
    });
    lineChart.scrollStart(e)
  },
  scroll:function(e){
    lineChart.scroll(e)
  },    
  scrollend:function(e){
    lineChart.scrollEnd(e)
  },
  //双指缩放的控件
  touchStartHandle(e) {
    // 单手指缩放开始，也不做任何处理 
    if (e.touches.length == 1) {
      // console.log("单滑了")
      // console.log(lineChart.getCurrentDataIndex(e));
      lineChart.showToolTip(e, {
        // background: '#7cb5ec',
        format: function (item, category) {
          return category + ' ' + item.name + ':' + item.data
        }
      });
      lineChart.scrollStart(e)
      return
    }
    else{
      // console.log('双手指触发开始')
      // 注意touchstartCallback 真正代码的开始 
      // 一开始我并没有这个回调函数，会出现缩小的时候有瞬间被放大过程的bug 
      // 当两根手指放上去的时候，就将distance 初始化。 
      let xMove = e.touches[1].x - e.touches[0].x;
      let yMove = e.touches[1].y - e.touches[0].y;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      this.setData({
        'touch.distance': distance,
      })
    }

  },

  touchMoveHandle(e) {
    var that = this
    // console.log(e)
    let touch = this.data.touch
    if (e.touches.length == 1) {
      // console.log("单滑了");
      lineChart.scroll(e)
      return
    }
    else if (e.touches.length == 2) {
      // console.log('双手指运动开始')
      let xMove = e.touches[1].x - e.touches[0].x;
      let yMove = e.touches[1].y - e.touches[0].y; 
      // 新的 ditance 
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      let distanceDiff = distance - that.data.touch.distance;
      distanceDiff = Math.abs(distanceDiff) < 15? 0 : distanceDiff
      let newFlex = this.data.flex + 0.007 * distanceDiff 
      // 为了防止缩放得太大，所以scale需要限制，同理最小值也是 
      // console.log('newFlex = '+ newFlex)
      newFlex = newFlex <= 1 ? 1 : newFlex;
      newFlex = newFlex >= 2 ? 1.9 : newFlex;
      // console.log('Flex = ' + that.data.flex)
      //节流
      setTimeout(function () {
        that.setData({
          flex: newFlex,
        });
        lineChart.updateData({
          flex: newFlex,
        });
        wx.setStorage({
          key: 'flex',
          data: newFlex,
        })
      }, 200)
    }
  },
  //随机生成数据
  // createSimulationData: function () {
  //   var categories = [];
  //   var data = [];
  //   for (var i = 0; i < 100; i++) {
  //     categories.push(i);//横坐标各点的名称
  //     data.push(Math.random()*(20-10)+10);//该横坐标下的值
  //   }
  //   // data[4] = null;
  //   return {
  //     categories: categories,
  //     data: data
  //   }
  // },
  //从data中获取数据
  getData:function(idx){
    var that = this
    var item = that.data.allData[idx]
    var categories = [];
    // var idx = that.data.selectChart
    var len = item.data.length
    var data = item.data
    for (var i = 0; i < len; i++) {
      categories.push(i);//横坐标各点的名称
      // data.push(Math.random() * (20 - 10) + 10);//该横坐标下的值
    }
    return {
      categories: categories,
      data: data
    }
  },
  //更新数据
  updateData: function (e) {
    // console.log(e.currentTarget.dataset.idx);
    // var that = this;
    // var idx = e.currentTarget.dataset.idx
    // // var simulationData = this.createSimulationData();
    // var item = that.data.allData[idx];
    // var getData = this.getData(idx)
    // var series = [{
    //   name: item.name,
    //   data: getData.data,
    //   format: function (val, name) {
    //     return val.toFixed(1) + item.unit;
    //   }
    // }];
    // console.log(item.max)
    // var yAxis= {
    //   title: item.name + (item.unit=='' ? '' : '('+ item.unit +')'),//如果指标没有单位，则不显示括号
    //   format: function (val) {
    //     return val.toFixed(1);
    //   },
    // };
    // console.log(yAxis.max)
    lineChart.updateData({
      // categories: getData.categories,
      // series: series,
      // yAxis: yAxis,
      animation: false
    });
  },

  //切换表格
  chgChart:function(e){
    var idx = e.currentTarget.dataset.idx
    this.setData({
      selectChart:idx
    }),
    this.onLoad()
    // console.log(e.currentTarget.dataset.idx);
    // var that = this;
    // var idx = e.currentTarget.dataset.idx
    // // var simulationData = this.createSimulationData();
    // var item = that.data.allData[idx];
    // var getData = this.getData(idx)
    // var series = [{
    //   name: item.name,
    //   data: getData.data,
    //   format: function (val, name) {
    //     return val.toFixed(1) + item.unit;
    //   }
    // }];
    // console.log(item.max)
    // var yAxis= {
    //   title: item.name + (item.unit=='' ? '' : '('+ item.unit +')'),//如果指标没有单位，则不显示括号
    //   format: function (val) {
    //     return val.toFixed(1);
    //   },
    // };
    // console.log(yAxis.max)
    // lineChart.updateData({
    //   categories: getData.categories,
    //   series: series,
    //   yAxis: yAxis,
    //   animation: false
    // });
  },
  
  onLoad: function (e) {
    var that = this;
    var idx = that.data.selectChart;
    var item = that.data.allData[idx];
    // console.log(item)
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    } 
    // var simulationData = this.createSimulationData();
    var getData = this.getData(idx)
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      enableScroll:true,
      categories: getData.categories,
      // animation: false,
      // background: '#f5f5f5',
      series: [{//可显示多条数据的折现
        name: item.name,
        data: getData.data,
        format: function (val, name) {
          return val.toFixed(1) + item.unit;
        }
      }],
      xAxis: {
          disableGrid: true,
      },
      yAxis: {
        title: item.name + (item.unit == '' ? '' : '(' + item.unit + ')'),//如果指标没有单位，则不显示括号
        format: function (val) {
            return val.toFixed(1);
        },
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: false,
      flex: that.data.flex,
      extra: {
        lineStyle: 'curve'
      }
    });
    wx.request({
      // url: 'http://192.168.1.109:8000/text/',
      url:'http://49.234.116.74:8000/text/',
      success:function(res){
        // console.log(res.data.diandaolv)
        var data = res.data
        that.setData({
          "allData[0].txt": data.temperature,
          "allData[1].txt": data.rongjieyang,
          "allData[2].txt": data.orp,
          "allData[3].txt": data.andan,
          "allData[4].txt": data.zhuodu,
          "allData[5].txt": data.ph,
          "allData[6].txt": data.diandaolv,
          // "allData[7].txt": data.vel,
        })
      }
    })


  },


});