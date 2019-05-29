//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    maxLength:5,
    path:[],
    canvasArr:[
      {
        canvasId:'canvas1',
        color:'#f5f5dc'
      },
      {
        canvasId:'canvas2',
        color:'#ffe4c4'
      },
      {
        canvasId:'canvas3',
        color:'#deb887'
      },
      {
        canvasId:'canvas4',
        color:'#5f9ea0'
      },
      {
        canvasId:'canvas5',
        color:'#00ffff'
      },
      {
        canvasId:'canvas6',
        color:'#008b8b'
      },
      {
        canvasId:'canvas7',
        color:'#bdb76b'
      },
      {
        canvasId:'canvas8',
        color:'#e9967a'
      },
      {
        canvasId:'canvas9',
        color:'#00bfff'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.init()
    //canvasArr.map((item,index)=> this.onDraw(item,index))
    this.drawPath()
    this.bindLoop = this.loop.bind(this)
    // 清除上一局的动画
    this.cancelAnimationFrame(this.aniId);
    this.frame = 0;
    
    this.aniId = this.requestAnimationFrame(
      this.bindLoop
    )
  
  },
  init: function(){
   
    var lastTime = 0;
    var requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
    this.requestAnimationFrame = requestAnimationFrame
  
  
    var cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
    this.cancelAnimationFrame = cancelAnimationFrame
    
  },
  loop: function() {

    this.frame++
    
    const { path } = this.data
    if(!path.length) return
    if(this.frame % 30 === 0 ){
     
    
      const { canvasArr } = this.data
      canvasArr.map(item => this.onClear(item))
     
      const index = path.pop()
      const item = canvasArr[index]
      this.onFill(item)
    }

    this.aniId = this.requestAnimationFrame(
      this.bindLoop
    )
  },
  drawPath: function(){
    const { path, maxLength, canvasArr } = this.data
    const width = Math.sqrt(canvasArr.length)
    let i = parseInt(Math.random() * width),j = parseInt(Math.random() * width);
    let signArr = new Array(canvasArr.length).fill(0)

    
    do{
     
      let currentIndex = i  + j * width
      if(!signArr[currentIndex]){

        path.push(currentIndex)
        signArr[currentIndex] = 1

      }

      const temp = Math.random()
      if(temp < 0.3){
        i = ( i + 1 ) % width
      }else if(temp < 0.6){
        j = ( j + 1 ) % width
      }else{
        i = ( i + 1 ) % width
        j = ( j + 1 ) % width
      }
    }while(path.length < maxLength)
  },
  onClear: function({ canvasId }){
    
    const context = wx.createCanvasContext(canvasId)
    context.clearRect(0, 0, 100, 100)
    context.draw()
  },
  onFill: function({ canvasId }){
    const context = wx.createCanvasContext(canvasId)
    context.setFillStyle('#ff4500')
    context.fillRect(0, 0, 100, 100)
    context.draw()
  },
  onDraw: function ({ canvasId },index) {
    const context = wx.createCanvasContext(canvasId)
    context.setFontSize(12)
    context.setFillStyle("#000")
    context.fillText(index,25, 50)
    context.draw()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
})
