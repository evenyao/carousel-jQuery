function Carousel($ct){
  this.init($ct)
  this.bind()
  this.autoPlay()
}

Carousel.prototype = {   //使用原型
  constructor: Carousel,
  init: function($ct){
    console.log(this)
    this.$ct = $ct
    this.$imgCt   = this.$ct.find('.img-ct')
    this.$imgs    = this.$ct.find('.img-ct > li')
    this.$preBtn  = this.$ct.find('.pre')
    this.$nextBtn = this.$ct.find('.next')
    this.$buttons = this.$ct.find('.buttons li')

    this.imgWidth = this.$imgs.width()
    this.imgCount = this.$imgs.length
    this.index = 0
    this.isAnimate = false

    this.$imgCt.append(this.$imgs.first().clone())   //将imgs里面第一张图加到imgCt最后
    this.$imgCt.prepend(this.$imgs.last().clone())   //将imgs里面最后一张图加到imgCt最前
    this.$imgCt.width((this.imgCount + 2) * this.imgWidth)  //设置imgCt的宽度 = 图片真实个数 * 图片宽度

    this.$imgCt.css('left', -this.imgWidth )
  },

  bind: function(){
    var _this = this
    this.$preBtn.on('click',function(){
      console.log('pred..')
      _this.playPre(1)    //执行一次playPre
    })
    this.$nextBtn.on('click',function(){
      console.log('next..')
      _this.playNext(1)  //执行一次playNext
    })
    this.$buttons.on('click',function(){
      var index = $(this).index()
      console.log($(this).index())
      if(_this.index > index){
        _this.playPre(_this.index - index)  //滚动的格数
      }else{
        _this.playNext(index - _this.index)
      }
    })
    //鼠标滑过视窗 停止自动轮播
    this.$ct.on('mouseover',function(){
      console.log('hover-in stopAuto()')
      _this.stopAuto()
    })
    //鼠标离开视窗 重新开始自动轮播
    this.$ct.on('mouseout',function(){
      console.log('hover-out autoplay()')
      _this.autoPlay()
    })
  },

  playPre: function(len){
    if(this.isAnimate) return
    this.isAnimate = true
    var _this = this
    this.$imgCt.animate({
      left: '+='+this.imgWidth  * len   //len为数量
    },function(){
      _this.index -= len
      if(_this.index < 0){  //当index<0，即next到第最左时 进行偏移
        _this.$imgCt.css('left', - (_this.imgWidth * _this.imgCount))  //偏移位置
        _this.index = _this.imgCount - 1   //并将index重置为imgCount - 1
      }
      _this.setButtons() //改变buttons样式
      _this.isAnimate = false
    })
  },

  playNext: function(len){
    if(this.isAnimate) return
    this.isAnimate = true
    var _this = this
    this.$imgCt.animate({
      left: '-='+this.imgWidth  * len
    },function(){
      _this.index += len
      if(_this.index === _this.imgCount){  //当index到达最大图片数时，即next到最后一张图片时 进行偏移
        _this.$imgCt.css('left', -_this.imgWidth)   //偏移位置
        _this.index = 0   //并将index重置为0
      }
      _this.setButtons() //改变buttons样式
      _this.isAnimate = false
    })
  },

  setButtons: function(){
    this.$buttons.eq(this.index).addClass('active').siblings().removeClass('active')
  },

  autoPlay: function(){
    var _this = this
    this.autoClock = setInterval(function(){
      _this.playNext(1)
    },3000)
  },

  stopAuto: function(){
    clearInterval(this.autoClock)
  }

}


new Carousel($('.carousel').eq(0))
new Carousel($('.carousel').eq(1))
