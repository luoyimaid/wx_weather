// pages/weather/weather.js
var app = getApp()
var bmap = require('../../libs/bmap-wx.min.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
      weekday:['周日','周一','周二','周三','周四','周五','周六'],
      showday:['今天','明天',''],
      weatherData: '' ,
      cityDatas:'',
    icons: ['../../images/pic/clothing.png', '../../images/pic/carwashing.png', '../../images/pic/pill.png', '../../images/pic/running.png', '../../images/pic/sun.png'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var date = new Date();
    console.log(date.getDay());

    that.setData({
      'showday[2]': this.data.weekday[(date.getDay() + 2)%7]
    });

    console.log(this.data.showday);
    wx.getLocation({
      success: function(res) {
        var latitude  = res.latitude;//维度
        var longitude = res.longitude;//经度
        console.log(latitude + "-----" + longitude);
        that.getCity(latitude,longitude);//调用函数或的城市
      },
    })
  },

  /*
  *获得城市的函数定义
  */
  getCity: function(lat, lng){
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var param = {
      location: lat + "," + lng,
      output:"json",//返回的数据格式
      ak:"DZp7V0P1homr4Kr9oGCLYnZM9EPmd6A6"
    };
    var that = this;

    wx.request({
      url: url,
      data: param,
      success: function(res){
        console.log(res);
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;
        that.setData({
          city : city,
          district:district,
          street:street
        });
        //调用自定义函数获取天气信息、
        // city = city.substring(0,city.length-1);
        that.getweather(city);
        that.getweather1(city);
        that.getweatherbaidu1();
        // that.getweatherbaidu(city,lat,lng);
      }
    })
  },
  /*
   * 获取天气函数
   */
  

  getweatherbaidu1: function (){
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'Uo3rYwLqaHm1GWwskYeR8R45gN7ZVTUM'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0]; 
    //   console.log("baidu")
      console.log(data)
      that.setData({
        cityDatas : data,
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    }); 
  },

//   获取当前的天气指数
  getweather: function(city){
    console.log(city);
    var that = this;
    var url = "https://free-api.heweather.com/s6/weather/now?parameters";
    var param = {
      key : "30328d5c7d0549818b70d9eeb953cd82",
      location : city
    };

    //发出请求

    wx.request({
      url: url,
      data:param,
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res);
        that.setData({
          now: res.data.HeWeather6[0].now,
        });
      }
    })
  },

  /*
   * 获取未来天气函数
   */

  getweather1: function (city) {
    // console.log(city);
    var that = this;
    var url = "https://free-api.heweather.com/s6/weather/forecast?parameters";
    var param = {
      key: "30328d5c7d0549818b70d9eeb953cd82",
      location: city
    };

    //发出请求

    wx.request({
      url: url,
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          forecast: res.data.HeWeather6[0].daily_forecast,
        });

      }
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
    var that = this;
    var date = new Date();
    console.log(date.getDay());

    that.setData({
      'showday[2]': this.data.weekday[(date.getDay() + 2) % 7]
    });

    console.log(this.data.showday);
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude;//维度
        var longitude = res.longitude;//经度
        console.log(latitude + "-----" + longitude);
        that.getCity(latitude, longitude);//调用函数或的城市
      },
    })
    console.log("pulldownrefreash completed")
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
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