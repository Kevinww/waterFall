$(document).ready(function(){
   $(window).on("load",function(){
       imgLocation();
       var dataImg = {"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.png"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"}]};
       window.onscroll = function(){
           if(scrollSide()){
               $.each(dataImg.data,function(index,value){
                   var att = $(value).attr("src");
                   //$(".allcontent").append('<div class="box"><div class="content"><img src="att"></div>></div>');
                   var box = $("<div>").addClass("box").appendTo($(".allcontent"));
                   var content = $("<div>").addClass("content").appendTo(box);
                   //console.log($(value).attr("src"));
                   $("<img>").attr("src","./images/"+$(value).attr("src")).appendTo(content);
               });
               imgLocation();
           }
       };
   });
});

function imgLocation(){
    var box = $(".box");
    var boxWidth = box.eq(0).width();//获取box的宽度
    var num = Math.floor($(window).width()/boxWidth);//计算一行能放几张照片
    var boxArr = [];
    box.each(function(index,value){        //遍历box
        var boxHeight = box.eq(index).height();  //获取每个box的高度
        if(index < num){
            boxArr[index] = boxHeight;    //第一行照片直接赋值
        }else{
            var minboxHeight = Math.min.apply(null,boxArr);  //判断第一行照片高度最低值
            var minboxIndex = $.inArray(minboxHeight,boxArr); //高度最低的照片的下标
            $(value).css({   //第二行照片的位置设置
                "position":"absolute",
                "top":minboxHeight,
                "left":box.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex]+=box.eq(index).height();//重新计算当前最低高度
        }
    });
}

function scrollSide(){
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop+Math.floor(box.last().height()/2);//当滚动到最后一张图片的一般高度的时候加载照片（最后一张照片距离顶部的高度+最后一个box一半的高度）
    var documentHeight = $(document).width();//当前容器的高度
    var scrollHeight = $(window).scrollTop();//当前滚动的高度
    return (lastboxHeight < scrollHeight + documentHeight)?true:false;
}