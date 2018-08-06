//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    colorArrays: ["#ffc8bd", "#ffc8bd", "#f6efb5", "#f6efb5", "#ffc8bd", "#ffc8bd", "#ffc8bd"],
    colorArrays0: ["#f8785f", "#f8785f", "#ccbb30", "#ccbb30", "#f8785f", "#f8785f", "#f8785f"],
    colorArrays1: ["#a9341d", "#a9341d", "#948717", "#948717", "#a9341d", "#a9341d", "#a9341d"],
    wlist: [
      { "xqj": 1, "skjc": 1, "skcd": 2, "kcmc": "多媒体技术@1310" },
      { "xqj": 1, "skjc": 3, "skcd": 2, "kcmc": "人机交互@1105" },
      { "xqj": 1, "skjc": 5, "skcd": 2, "kcmc": "编译原理@3205" },
      { "xqj": 2, "skjc": 1, "skcd": 2, "kcmc": "数字图像处理@1405" },
      { "xqj": 2, "skjc": 3, "skcd": 2, "kcmc": "人工智能@1209" },
      { "xqj": 2, "skjc": 9, "skcd": 2, "kcmc": "人工智能实验@机房" },
      { "xqj": 3, "skjc": 3, "skcd": 2, "kcmc": "嵌入式系统@3508" },
      { "xqj": 3, "skjc": 5, "skcd": 4, "kcmc": "嵌入式系统实验@机房" },
      { "xqj": 4, "skjc": 1, "skcd": 2, "kcmc": "人机交互@1105" },
      { "xqj": 4, "skjc": 3, "skcd": 2, "kcmc": "编译原理@1310" },
      { "xqj": 4, "skjc": 5, "skcd": 2, "kcmc": "人工智能@1310" },
      { "xqj": 5, "skjc": 3, "skcd": 2, "kcmc": "it项目管理@1105" },
      { "xqj": 6, "skjc": 1, "skcd": 4, "kcmc": "软件项目管理@机房" },
      { "xqj": 7, "skjc": 5, "skcd": 2, "kcmc": "编译原理实验@机房" },
      { "xqj": 7, "skjc": 7, "skcd": 2, "kcmc": "人机交互上机@机房" },
    ],
    tmpwlist: [{ "xqj": 1, "skjc": 1, "skcd": 1, "kcmc": " " }],
    tmproom:" ",
    tmpname:" ",
    pos : {},
    hasadded:false,
    animation:{},
    addclass:false,
    animationData:{},
    flag : 0,
    week: {
      tcs: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
      ],
      tc: 0,},

      js: {
        tcs: [
            "一",
            "二",
            "三",
            "四",
            "五",
            "六",
            "七",
            "八",
            "九",
            "十",

        ],
        tc: 0,
    },
    js2: {
      tcs: [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
      ],
      tc: 0,
    }
  },


  onLoad: function () {
    console.log('onLoad')
    console.log(this.data.wlist);
  },

  jump: function (e) {
    wx.switchTab({
    url: '../weather/weather',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
    })
  },

  settime:function(){
    var that = this;
    this.setData({
      tmpwlist: { "xqj": 0, "skjc": 1, "skcd": 1, "kcmc": " " },
      'js.tc': 0,
      'js2.tc': 0,
      'week2.tc': 0,

    })
    console.log("点击事件触发")
    var animation = wx.createAnimation({
      duration:500,
      timingFunction:'linear'
    })
    that.animation=animation
    animation.translateY(200).step()
    that.setData({
      animationData:animation.export(),
      addclass : true,
    })
  },

  classInput: function (e) {
    console.log(e.detail.value);
    this.data.tmpname = e.detail.value;
    this.data.tmpwlist["kcmc"] = e.detail.value;
    console.log(this.data.tmpwlist["kcmc"]);
    this.data.flag = 1;
  },

  
  roomInput: function (e) {
    this.data.tmproom = e.detail.value
    console.log(this.data.tmproom);
    this.data.flag = 1;
  },

  changeTc:function(e){
    var tc = e.detail.value;
    console.log("change date-->:",tc);
    this.setData({
      'week.tc' : tc,
      tmpwlist: { "xqj": tc, "skjc": this.data.js.tc, "skcd": 1, "kcmc": " " },
    })
  

    // console.log(this.data.week.tc);
  },

  changeJs: function (e) {
    var tmp = e.detail.value;
    console.log("change start-->:", tmp);
    var tmpp = tmp;
    // tmpp++;
    this.setData({
      'js.tc' : tmp,
      tmpwlist: { "xqj": this.data.week.tc, "skjc": tmpp, "skcd": 1, "kcmc": " " },
    }) 
    if(tmp>this.data.js2.tc){
      this.setData({ 'js2.tc': tmp,})
    }
    },


  changeJs2: function (e) {

    var tmp = e.detail.value;
    console.log("change end-->:", tmp);
    
    if(tmp < this.data.js.tc){
      tmp = this.data.js.tc;
    }

    this.setData({
      'js2.tc': tmp,
    })

    this.data.tmpwlist["skcd"] = tmp - this.data.js.tc+1;
    console.log("change length-->:", this.data.tmpwlist["skcd"]);
  },


  confirm:function(e){

    if (this.data.flag == 0){
      console.log("什么也没干");
      this.quit();
      return;
    }
    this.data.tmpwlist["kcmc"] =  this.data.tmpname + '@' + this.data.tmproom ;
    var del=[];
    this.data.tmpwlist["xqj"]++;
    this.data.tmpwlist["skjc"]++;
    var newed = this.data.tmpwlist["skjc"] + this.data.tmpwlist["skcd"] - 1;
    console.log("修改前");
    console.log(this.data.tmpwlist);


    for(var i=0;i<this.data.wlist.length;i++){
      var date = this.data.wlist[i]["xqj"];
      var st = this.data.wlist[i]["skjc"];
      var ed = this.data.wlist[i]["skcd"] + st - 1;
      console.log(date + " " + st + " " + ed + " newst" + this.data.tmpwlist["skjc"] + " newed" + newed);
      if (date == this.data.tmpwlist["xqj"] ){
        if ((ed >= this.data.tmpwlist["skjc"] && ed <= newed)||(st >= this.data.tmpwlist["skjc"]&&st<=newed)||(this.data.tmpwlist["skjc"]<=st&&newed>=ed))
          {del.push(i);
            console.log(i);          
          }
      }
    }
     console.log(del);
    for(var i =0;i<del.length;i++){
      this.data.wlist.splice(del[i],1);
    }
    console.log(this.data.tmpwlist);
    this.data.wlist.push(this.data.tmpwlist);

    console.log("修改后" );
    console.log(this.data.wlist);
    this.quit();
    var tmp = this.data.wlist;
    this.setData({
      wlist:tmp,
    })  
  },

  quit: function () {
    console.log("退出")
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        addclass: false
      })
    }.bind(this), 200)

  }

})


 
