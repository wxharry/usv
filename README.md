# USV
基于微信小程序的无人艇信息监视系统前端开发

后台登陆管理 [微信公众平台](https://mp.weixin.qq.com/)

## 功能简介

- 小程序接收来自后端的信息数据流并实时显示到地图上
- 历史数据以折线图的形式展示
- 给出参数的简单介绍



## 使用方法

下载本项目后，用微信开发者工具打开

[微信开发者工具下载链接](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)



## 代码简介

- `images`	存放需要的小图标
- `pages` 	页面代码
  - `index` 首页
  - `log` 日志
  - `data_new`  新版本（当时不会用git版本管理）的数据展示页
- `detail` 详细信息页

- `utils`	工具类函数包



## 组件介绍

### 地图

使用腾讯地图组件，详情可见小程序开发官网

- 地图会自动追踪艇的位置，让舰的图标保持在屏幕中央。
- 拖动地图可以自由查看地图
- 点击右下角按钮，地图会找到舰的位置



### 图表

参考[微信图表](https://github.com/xiaolin3303/wx-charts)，在小程序上显示折线图

- 改进了图表放大缩小的逻辑，可以通过手指捏放，放大缩小折线图。

  

## TO DO

- 实时显示数据

- 重构前端框架

- 预警消息通知

- 智能预报和问题分析

  

## 注意

- 电脑端和手机端仍存在差异，注意在手机上调试。

- 不同手机型号的显示不同，注意调整设计

  

## 参考链接

[微信小程序官方文档·组件](https://developers.weixin.qq.com/miniprogram/dev/component/)

[微信小程序图表工具](https://github.com/xiaolin3303/wx-charts)

[基于[wx-charts] line图（可拖动状态下）实现x轴的伸缩控制](https://blog.csdn.net/weixin_41075012/article/details/100056624)

[图标素材](https://www.iconfont.cn)



