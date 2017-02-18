
//轮播图 渐隐渐现
function Tab(opt){
    if(!opt.id) return;
    this.default={
        url:'json/data.txt',
        duration:2000,
        effect:0
    };
    for(var attr in opt){
        this.default[attr]=opt[attr];
    }
    this.$box=$('#'+this.default.id);
    this.$boxInner=this.$box.find('.boxInner');
    this.$aDiv=null;
    this.$aImg=null;
    this.$ul=this.$box.children('ul');
    this.$aLi=null;
    this.$left=this.$box.find('.left');
    this.$right=this.$box.find('.right');
    this.data=null;
    this.n=0;
    this.timer=null;
    this.init();
};
Tab.prototype={
    constructor:Tab,
    init:function(){
        var _this=this;

        this.getData();

        this.bind();

        this.lazyImg();

        clearInterval(this.timer);
        this.timer=setInterval(function(){
            _this.autoMove();
        },this.default.duration)

        this.overout();

        this.handleChange();

        this.leftRight();
    },
    getData:function(){

        var _this=this;
        $.ajax({
            type:'GET',
            url:_this.default.url,
            async:false,
            dataType:'json',
            success:function(val){
                _this.data=val;
            }
        })
    },
    bind:function(){

        var strDiv='';
        var strLi='';
        $.each(this.data,function(index,item){
            strDiv+='<div><img src="" realImg="'+item.imgSrc+'" alt=""></div>';
            strLi+=index==0?'<li class="on"></li>':'<li></li>';
        });
        this.$boxInner.html(strDiv);
        this.$ul.html(strLi);
        this.$aDiv=this.$boxInner.children('div');
        this.$aImg=this.$boxInner.find('img');
        this.$aLi=this.$ul.children('li');
    },
    lazyImg:function(){
        var _this=this;
        $.each(this.$aImg,function(index,item){
            var tmpImg=new Image;
            tmpImg.src=$(item).attr('realImg');
            tmpImg.onload=function(){
                $(item).attr('src',tmpImg.src);
                tmpImg=null;
                _this.$aDiv.first().css('zIndex',1).animate({opacity:1})
            }

        })
    },
    autoMove:function(){
        if(this.n>=this.$aDiv.length-1){
            this.n=-1;
        }
        this.n++;
        this.setBanner();
    },
    setBanner:function(){
        var _this=this;
        $.each(this.$aDiv,function(index,item){
            if(index==_this.n){
                $(item).css('zIndex',1).siblings().css('zIndex',0);
                $(item).animate({opacity:1},function(){
                    $(item).siblings().animate({opacity:0});
                })
            }
        });
        this.bannerTip();
    },
    bannerTip:function(){
        var _this=this;
        $.each(this.$aLi,function(index,item){
            item.className=index==_this.n?'on':null;
            /*if(index==_this.n){
             $(item).addClass('on');
             }else{
             $(item).removeClass('on');
             }*/
        })
    },
    overout:function(){
        var _this=this;
        this.$box.mouseover(function(){
            clearInterval(_this.timer);
            /*_this.$left[0].style.display=_this.$right[0].style.display='block';*/
            _this.$left.show();
            _this.$right.show();
        });
        this.$box.mouseout(function(){
            _this.timer=setInterval(function(){
                _this.autoMove();
            },_this.default.duration);
            _this.$left.hide();
            _this.$right.hide();
        })
    },
    handleChange:function(){
        var _this=this;
        this.$aLi.click(function(){
            _this.n=$(this).index();
            _this.setBanner();
        })
    },
    leftRight:function(){
        var _this=this;
        this.$right.click(function(){
            _this.autoMove();
        })
        this.$left.click(function(){
            if(_this.n<=0){
                _this.n=_this.$aDiv.length;
            }
            _this.n--;
            _this.setBanner();
        })
    }

};
//执行轮播图
var tab1=new Tab({
    id:'bannerMain'
});
//计时器
function timer(){
    var oDiv=document.getElementById("seckillTimer");
    var oSpan=oDiv.getElementsByTagName('span')[0];
    var oSpan1=oDiv.getElementsByTagName('span')[1];
    var oSpan2=oDiv.getElementsByTagName('span')[2];
    countDown();
    setInterval(countDown,1000);
    function getTime(n){
        return n>=0 && n<10?'0'+n:''+n;
    }
    function countDown(){
        var oDate=new Date();
        var s=Math.floor((new Date('2017/1/1 00:00:00')-oDate)/1000);
        var d=Math.floor(s/86400);
        s%=86400;
        var h=Math.floor(s/3600);
        s%=3600;
        var m=Math.floor(s/60);
        s%=60;
        var str=getTime(h);
        var str1=getTime(m);
        var str2=getTime(s);
        oSpan.innerHTML=str;
        oSpan1.innerHTML=str1;
        oSpan2.innerHTML=str2;
    }
}
timer();
//选项卡
$(document).ready(function(){
    $('.banner-left-nav li').mouseover(function () {
        $(this).addClass('on');
        $(this).siblings('li').removeClass('on');
        $(this).children('.banner-le-hi').show();
        $(this).siblings('li').children('.banner-le-hi').hide();
    })
    $('.banner-left-nav li').mouseout(function () {
        $(this).removeClass('on');
        $(this).children('.banner-le-hi').hide();
    })
});
//选项卡--排行榜
~function(){
    var oDiv=document.getElementById("merchClass");
    var aBtn=oDiv.getElementsByTagName("a");
    var aDiv=oDiv.getElementsByTagName("div");
    for(var i=0;i<aBtn.length;i++){
        aBtn[i].index=i;
        aBtn[i].onmouseover=function(){
            for(var j=0;j<aBtn.length;j++){
                aDiv[j].className="";
                aBtn[j].style.border="";
            }
            aDiv[this.index].className="hidden show";
            aBtn[this.index].style.borderBottomColor="#f10214";
        }
    };
}();

//左右切换轮播图
(function () {
    //在同一个父级下获取元素
    var oBox = document.getElementById('circuBanner');
    var oBoxInner = oBox.getElementsByTagName("div")[0];
    var aDiv = oBoxInner.getElementsByTagName('div');
    var aImg=oBoxInner.getElementsByTagName('img');
    var oBtnLeft = oBox.getElementsByClassName("left");
    var oBtnRight = oBox.getElementsByClassName("right");
    var data = null;
    var timer=null;
    var n=0;
    //4.图片自动轮播
    function autoMove(){
        if(n>=aDiv.length-1){
            n=0;
            utils.css(oBoxInner,'left',-n*570);
        }
        n++;
        // utils.css(oBoxInner,'left',-n*1000);
        animate({
            id:oBoxInner,
            target:{
                left:-n*570
            },
            duration:1000,
            effect:2
        })
    }
    //8.点击左右按钮进行切换；
    oBtnRight.onclick=autoMove();
    oBtnLeft.onclick=function(){
        if(n<=0){
            n=aDiv.length-1;
            utils.css(oBoxInner,'left',-n*1000);
        }
        n--;
        animate({
            id:oBoxInner,
            target:{
                left:-n*1000
            },
            duration:1000,
            effect:2
        });
    }
})();
//回到顶部左侧导航
leftTotop();
function leftTotop(){
    var oBtn=document.getElementById("btnTotop");
    oBtn.onclick=function(){
        var target=utils.win('scrollTop');
        var duration=500;
        var interval=10;
        var step=target/duration*interval;
        var timer=setInterval(function(){
            //每次拿到最新位置，并在最新位置上-=step；还需要再重新赋值新位置；
            var curTop=utils.win('scrollTop');
            if(curTop<=0){
                clearInterval(timer);
                return;
            }
            curTop-=step;
            utils.win('scrollTop',curTop);
        },interval)
    };
}

//超过一屏显示左侧导航
~(function navLeftShow(){
    var btnLeft=document.getElementById("asideLeft");
    var navTopFix=document.getElementById("navTopFix");
    window.onscroll=function(){
        if(utils.win('scrollTop')>utils.win('clientHeight')){
            btnLeft.style.display='block';
            navTopFix.style.display='block';
        }else{
            btnLeft.style.display='none';
            navTopFix.style.display='none';
        }
    };
})();
// //左侧导航 点击变换颜色
window.onload=function(){
    var oDiv=document.getElementById("asideLeft");
    var aBtn=oDiv.getElementsByTagName("li");
    for(var i=0;i<aBtn.length;i++){
        aBtn[i].index=i;
        aBtn[i].onclick=function(){
            for(var j=0;j<aBtn.length;j++){
                aBtn[j].className="";
            }
            this.className="aside-on";
        }

    }
};

//轮播图旁边促销和广告
~function(){
    var oDiv=document.getElementById("adver");
    var aBtn=oDiv.getElementsByTagName("span");
    var aDiv=oDiv.getElementsByTagName("div");
    for(var i=0;i<aBtn.length;i++){
        aBtn[i].index=i;
        aBtn[i].onmouseover=function(){
            for(var j=0;j<aBtn.length;j++){
                aDiv[j].className="";
                aBtn[j].style.border="";
            }
            aDiv[this.index].className="hidden show";
            aBtn[this.index].style.borderBottomColor="#f10214";
        }
    };
}();

//延迟加载
(function () {
    $(function () {
        $("img").delayLoading({
            defaultImg: "../img/140.png",   // 预加载前显示的图片
            errorImg: "",   // 读取图片错误时替换图片(默认：与defaultImg一样)
            imgSrcAttr: "originalSrc",//记录图片路径的属性(默认：originalSrc，页面img的src属性也要替换为originalSrc)
            beforehand: 0,  // 预先提前多少像素加载图片(默认：0)
            event: "scroll", // 触发加载图片事件(默认：scroll)
            duration: "normal", // 三种预定淡出(入)速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认:"normal"
            container: window,     // 对象加载的位置容器(默认：window)
            success: function (imgObj) {
            }, // 加载图片成功后的回调函数(默认：不执行任何操作)
            error: function (imgObj) {
            }  // 加载图片失败后的回调函数(默认：不执行任何操作)
        });
    });
})();


