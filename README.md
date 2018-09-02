# 无限轮播组件
以面向对象的方式实现无线轮播效果组件

预览地址：https://evenyao.github.io/carousel-jQuery/

## 逻辑图
我们的demo轮播为四张图，如有多张图，逻辑相同

当初始化之前，CSS中如果撤除 `overflow: hidden;` ，即可看到该样式，即四张图排列在一起（此时容器的宽度已经通过JS计算得到）

- 初始化之后，在第1张图之前添加一张图4，在第4张图之后添加一张图1（即最后一张图添加第一张图，第一张图添加最后一张图）
- 当 nextBtn 被点击的时候，向右移
- 但当 next 到最后一张图片时，下面已经没有图片了，所以此时作一个判断操作，当判断到达最后一张图片的时候，将整体全部左移，并将原始的第一张图片放到视窗的位置，如图所示
- 当 preBtn 被点击的时候，向左移
- 当 pre 到第一张图片时，与上同理，如图所示

![](https://upload-images.jianshu.io/upload_images/12904618-f7d05ade58b9e9bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[JS源码](https://github.com/evenyao/carousel-jQuery/blob/master/main.js)

## 原理效果

![](https://upload-images.jianshu.io/upload_images/12904618-a1abbb71a91e0a18.gif?imageMogr2/auto-orient/strip)

然后将 css 中视窗容器的 `overflow: hidden; `重新添加即可

![](https://upload-images.jianshu.io/upload_images/12904618-ba250dc5eb24898c.gif?imageMogr2/auto-orient/strip)

## 其他
设置自动轮播，并添加鼠标 `hover` 事件

`mouseover` 时：停止自动轮播

`mouseout` 时：重新开始自动轮播
