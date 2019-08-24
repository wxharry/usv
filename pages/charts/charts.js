var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
Page({
  data: {
    
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
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 100; i++) {
      categories.push('2016-' + (i + 1));//横坐标各点的名称
      data.push(Math.random()*(20-10)+10);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },//随机生成数据

  updateData: function () {
    var simulationData = this.createSimulationData();
    var series = [{
      name: '成交量1',
      data: simulationData.data,
      format: function (val, name) {
          return val.toFixed(2) + '万';
      }
    }];
    lineChart.updateData({
      categories: simulationData.categories,
      series: series
    });
  },
  
  onLoad: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    } 
    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      enableScroll:true,
      // eachSpacing:100,
      categories: simulationData.categories,
      animation: false,//记得打开动画
      // background: '#f5f5f5',
      series: [{//可显示多条数据的折现
          name: '成交量1',
          data: simulationData.data,
          format: function (val, name) {
              return val.toFixed(2) + '万';
          }
        }],
        xAxis: {
            disableGrid: true,
        },
        yAxis: {
            title: '电导率 (单位)',
            format: function (val) {
                return val.toFixed(2);
            },
            min: 0
        },
        width: windowWidth,
        height: 200,
        dataLabel: false,
        dataPointShape: 'rect',
        // flex: that.data.flex,
        extra: {
          lineStyle: 'curve'
        }
    });
  },
  // flex: function (e) {
  //   var that = this,
  //     flex = that.data.flex;
  //   if (e.currentTarget.dataset.state === 'minus') {
  //     flex -= 0.1;
  //     flex = flex <= 1 ? 1 : flex;
  //   } else {
  //     flex += 0.1;
  //     flex = flex >= 2 ? 1.9 : flex;
  //   }
  //   //节流
  //   setTimeout(function () {
  //     that.setData({
  //       flex: flex,
  //     });
  //     lineChart.updateData({
  //       flex: flex,
  //     });
  //     wx.setStorage({
  //       key: 'flex',
  //       data: flex,
  //     })
  //   }, 200)
  // },
});