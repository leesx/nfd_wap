//px 转化为rem
;(function(window,document){
    function init(){
        var doc = document;
        var w = doc.documentElement.clientWidth;
        /*console.log(w);*/
        doc.documentElement.style.fontSize=w/10+'px';
    }
    init();
    window.onresize =function(){
        setTimeout(init,300)
    };
})(window,document);


$(function(){

    $(document).on('click','.alert-text', function () {
        var successHTML = '<i class="icon-success"></i><p>恭喜您!支付成功 </p><p>出借金额(¥)：<em class="red">48,544.25</em></p>';
        $.modal({
            text: successHTML,
            buttons: [
                {
                    text: '资金交录',
                    onClick: function() {
                        $.alert('You clicked first button!')
                    }
                },
                {
                    text: '继续出借',
                    onClick: function() {
                        $.alert('You clicked second button!')
                    }
                }
            ]
        })
    });
    //实名认证弹窗
    $(document).on('click','#renzhengBtn', function () {
        var successHTML = '<i class="icon-success"></i><p>恭喜您!您已通过实名认证 </p>';
        $.alert(successHTML);
    });
    //修改密码弹窗
    $(document).on('click','#updatePswBtn', function () {
        var successHTML = '<i class="icon-success"></i><p>恭喜您!密码修改成功  </p><p>请牢记您的密码12***tytty</p>';
        $.alert(successHTML);
    });
    //修改手机号  updatePhoneOK
    $(document).on('click','#updatePhoneOK', function () {
        var successHTML = '<i class="icon-success"></i><p>恭喜您!手机号修改成功 </p><p>请牢记您的密码138****5555</p>';
        $.alert(successHTML);
    });
    //提现_选择银行卡
    $("#bankCardPicker").picker({
        toolbarTemplate: '<header class="bar bar-nav">\
  <button class="button button-link pull-right close-picker">确定</button>\
  <h1 class="title">选择银行卡</h1>\
  </header>',
        cols: [
            {
                textAlign: 'center',
                values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
            }
        ]
    });
    //定位输入框的位置
   	;(function(window,$){
       var t=10;
	   var timer = null;
	   var headerH = $('.bar-header').height();
		$(window).on('resize',function(e){
			timer && clearTimeout(timer);
			timer = setTimeout(function(){
				$('.content').scrollTop(t-headerH-30);// 30像素左右
				//$('.input-txt').val(t-headerH);
			}, 0);
		})
		$('.input-txt').on('focus',function(e){
		         t = $(this).offset().top;
		});
   	})(window,Zepto);
    //获取当前 Transform的translate的x,y
    function getTransform(ele) {
        /*return window.getComputedStyle(ele)['webkitTransform'].match(/\-?[0-9]+\.?[0-9]*!/g)[4]-0;*/
        var  matrix = new WebKitCSSMatrix(getComputedStyle(ele, null).WebkitTransform);
        return {
            x:matrix.e,
            y:matrix.f
        }
    }

    function SlidePm(){
        var $PmSlide = $('#pmSlideShow');
        var len = $PmSlide.find('.show-item').length;
        var w = $PmSlide.find('.show-item').width()+1;//加1px的误差
        var winW = $(window).width();
        var i=0;
        console.log(len*w);
        $PmSlide.width(len*w).css({'transform':'translate3d('+(-(len*w-winW)/2)+'px,0,0)'});
        var pre = 0;
        $PmSlide.on('touchstart',function(e){
            e.preventDefault();
            this.startTime = new Date().getTime();
            console.log(getTransform(this).x);
            this.startX = e.touches[0].pageX;
            this.cue3dX = getTransform(this).x;
            this.style.webkitTransition = 'none'
        });
        $PmSlide.on('touchmove',function(e){
            e.preventDefault();
            pre = e.touches[0].pageX - this.startX + this.cue3dX;
            this.style.webkitTransform = 'translate3d('+ pre +'px, 0px, 0px)';
        });
        $PmSlide.on('touchend',function(e){
            e.preventDefault();
            this.endTime = new Date().getTime();
            var disTime = (this.endTime - this.startTime)/1000;
            console.log('时间差：'+disTime);
            if(disTime < 0.5){
                this.style.webkitTransition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) 0s';
            }
            //this.startX = 0;
            if(getTransform(this).x>0){
                this.style.webkitTransform = 'translate3d(0px, 0px, 0px)';
            }else if(getTransform(this).x<-w*(len-2)){
                this.style.webkitTransform = 'translate3d(-'+(w*(len-2))+'px, 0px, 0px)';
            }else{
                this.style.webkitTransform = 'translate3d('+ (e.changedTouches[0].pageX - this.startX + this.cue3dX) +'px, 0, 0)';
            }
        });
    }
    var pmSlide = new SlidePm();
    /*function SlidePm(){
        var $pmShowWrap = $('.pm-show-wrap');
        var len = $pmShowWrap.find('.show-item').length;
        var w = $pmShowWrap.find('.show-item').width()+1;//加1px的误差
        var winW = $(window).width();
        var i=0;
        $pmShowWrap.width(len*w).css({'transform':'translate3d('+(-(len*w-winW)/2)+'px,0,0)'});
        $pmShowWrap.on('swipeLeft',function(e){
            e.preventDefault();
            i++;
            if(i>=len-2){
                i=0;
                $(this).css({'transform':'translate3d(0,0,0)'})
            }else{
                $(this).css({'transform':'translate3d('+((-w)*i-(len*w-winW)/2)+'px,0,0)'})
            }
            console.log(i);

        });
        $pmShowWrap.on('swipeRight',function(e){
            e.preventDefault();
            i--;
            /!*if(i<=2-len) i=0;*!/
            console.log(i);
            $(this).css({'transform':'translate3d('+((w)*i+(len*w-winW)/2)+'px,0,0)'})
        });
    }*/
});
