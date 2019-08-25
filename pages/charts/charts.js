var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
Page({
  data: {
    flex:1.5,//[1,2)
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
    
    allData: [
      {
        name: "电导率",
        data: [321, 321, 358, 358, 354, 354, 354, 354, 344, 344, 344, 344, 344, 344, 344, 344, 344, 344, 344, 344, 344, 344, 321, 317, 317, 317, 344, 344, 337, 337],
        unit: 'μs / cm'
      },
      {
        name: "溶解氧",
        data: [13.74, 13.74, 16.46, 16.46, 16.33, 16.46, 16.67, 16.67, 16.8, 16.92, 16.92, 16.92, 16.92, 16.92, 16.92, 17.01, 17.01, 16.8, 16.8, 16.8, 16.8, 16.8, 14.16, 14.16, 14.16, 14.5, 16.8, 16.8, 16.58, 16.8],
        unit:'mg/L'
      },
      {
        name: "ORP氧化还原电位",
        data: [138, 138, 138, 138, 139, 139, 138, 138, 138, 138, 138, 138, 138, 138, 138, 138, 138, 138, 138, 137, 137, 138, 137, 137, 138, 138, 137, 137, 136, 136],
        unit: 'mg/L'
      },
      {
        name: "氨氮",
        data: [0.8, 0.8, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.8, 0.7, 0.7, 0.7, 0.2, 0.2, 0.2, 0.2],
        unit:'mg/L'
      },
      {
        name: "浊度",
        data: [14.9, 14.6, 13.8, 13.6, 14.5, 14.9, 14.2, 15.3, 13.7, 14.2, 14.2, 14.2, 14.3, 14, 13.8, 13.8, 13.9, 14.2, 14.2, 13.9, 14.6, 14.5, 14.4, 14.8, 14.9, 15.4, 14.3, 14.3, 12.3, 13.4],
        unit:'NTU'
      },
      {
        name: "pH",
        data: [9.17, 9.17, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.15, 9.14, 9.14, 9.14, 9.14],
        unit: ''
      },
      {
        name: "温度",
        data: [23.8, 23.8, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 22.6, 23.8, 23.8, 23.7, 23.7, 23, 23, 22.9, 22.9],
        unit:'℃'
      },
      {
        name: "速度",
        data: [0, 0.9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1.1, 1.2, 1.4, 1.4, 1.3, 1.3, 1.3, 1.3],
        unit: 'm/s'
      }],
      selectChart:0 //default chart
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
    console.log(lineChart.getCurrentDataIndex(e));
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
    var categories = [];
    // var idx = that.data.selectChart
    var len = that.data.allData[idx].data.length
    var data = that.data.allData[idx].data
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
    console.log(e.currentTarget.dataset.idx);
    var that = this;
    var idx = e.currentTarget.dataset.idx
    // var simulationData = this.createSimulationData();
    var item = that.data.allData[idx];
    var getData = this.getData(idx)
    var series = [{
      name: item.name,
      data: getData.data,
      format: function (val, name) {
        return val.toFixed(1) + item.unit;
      }
    }];
    console.log(item.max)
    var yAxis= {
      title: item.name + (item.unit=='' ? '' : '('+ item.unit +')'),//如果指标没有单位，则不显示括号
      format: function (val) {
        return val.toFixed(1);
      },
    };
    console.log(yAxis.max)
    lineChart.updateData({
      categories: getData.categories,
      series: series,
      yAxis: yAxis
    });
  },
  
  onLoad: function (e) {
    var that = this;
    var idx = that.data.selectChart
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    } 
    // var simulationData = this.createSimulationData();
    var getData = this.getData(0)
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      enableScroll:true,
      categories: getData.categories,
      // animation: true,//记得打开动画
      // background: '#f5f5f5',
      series: [{//可显示多条数据的折现
        name: that.data.allData[idx].name,
          data: getData.data,
          format: function (val, name) {
            return val.toFixed(1) + 'μs/cm';
          }
        }],
      xAxis: {
          disableGrid: true,
      },
      yAxis: {
        title: '电导率 (μs/cm)',
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
  },
});