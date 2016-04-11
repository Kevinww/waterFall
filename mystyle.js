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
    var boxWidth = box.eq(0).width();//��ȡbox�Ŀ��
    var num = Math.floor($(window).width()/boxWidth);//����һ���ܷż�����Ƭ
    var boxArr = [];
    box.each(function(index,value){        //����box
        var boxHeight = box.eq(index).height();  //��ȡÿ��box�ĸ߶�
        if(index < num){
            boxArr[index] = boxHeight;    //��һ����Ƭֱ�Ӹ�ֵ
        }else{
            var minboxHeight = Math.min.apply(null,boxArr);  //�жϵ�һ����Ƭ�߶����ֵ
            var minboxIndex = $.inArray(minboxHeight,boxArr); //�߶���͵���Ƭ���±�
            $(value).css({   //�ڶ�����Ƭ��λ������
                "position":"absolute",
                "top":minboxHeight,
                "left":box.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex]+=box.eq(index).height();//���¼��㵱ǰ��͸߶�
        }
    });
}

function scrollSide(){
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop+Math.floor(box.last().height()/2);//�����������һ��ͼƬ��һ��߶ȵ�ʱ�������Ƭ�����һ����Ƭ���붥���ĸ߶�+���һ��boxһ��ĸ߶ȣ�
    var documentHeight = $(document).width();//��ǰ�����ĸ߶�
    var scrollHeight = $(window).scrollTop();//��ǰ�����ĸ߶�
    return (lastboxHeight < scrollHeight + documentHeight)?true:false;
}