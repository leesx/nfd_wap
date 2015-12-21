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



    //获取当前 Transform的translate的x,y
    function getTransform(ele) {
        /*return window.getComputedStyle(ele)['webkitTransform'].match(/\-?[0-9]+\.?[0-9]*!/g)[4]-0;*/
        var  matrix = new WebKitCSSMatrix(getComputedStyle(ele, null).WebkitTransform);
        return {
            x:matrix.e,
            y:matrix.f
        }
    }
    //首页私房钱左右滑动
    function SlidePm(ele){
        this.ele = ele;
        this.chilenLen = ele.find('.show-item').length;
        this.w = ele.find('.show-item').width()+1;//加1px的误差
    }
    SlidePm.prototype.init = function(){

        var wrapWidth = this.chilenLen*this.w;
        var winW = $(window).width();
        this.ele.width(wrapWidth).css({'transform':'translate3d('+(-(wrapWidth-winW)/2)+'px,0,0)'});
        this.bindDom(this.ele);
    };
    SlidePm.prototype.bindDom  =function(){
        var _this = this;
        _this.ele.on('touchstart',function(e){
            this.startTime = new Date().getTime();
            this.startX = e.touches[0].pageX;
            this.startY = e.touches[0].pageY;
            this.cur3dX = getTransform(this).x;
            this.isScrolling = 0;
            this.style.webkitTransition = 'none'
        });
        _this.ele.on('touchmove',function(e){
            e.preventDefault();
            this.disX = e.touches[0].pageX - this.startX + this.cur3dX;
            this.disY = e.touches[0].pageY - this.startY;
            this.style.webkitTransform = 'translate3d('+ this.disX +'px, 0px, 0px)';

        });
        _this.ele.on('touchend',function(e){
            this.endTime = new Date().getTime();
            var disTime = (this.endTime - this.startTime)/1000;
            if(disTime < 0.5 || disTime > 1){
                this.style.webkitTransition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) 0s';
            }
            if(getTransform(this).x>0){
                this.style.webkitTransform = 'translate3d(0px, 0px, 0px)';
            }else if(getTransform(this).x<-_this.w*(_this.chilenLen-2)){
                this.style.webkitTransform = 'translate3d(-'+(_this.w*(_this.chilenLen-2))+'px, 0px, 0px)';
            }else{
                this.style.webkitTransform = 'translate3d('+ (e.changedTouches[0].pageX - this.startX + this.cur3dX) +'px, 0, 0)';
            }
        });
    };
    var pmSlide = new SlidePm($('#pmSlideShow'));
    pmSlide.init();
    //显示下拉菜单
    $(document).on("pageInit",'#sanbiaoList', function(e, pageId, $page){
        console.log($page);
        $('#dropMenuBtn').on('click','',function(e){
            console.log($(e.target));

            $(e.target).parent().find('.J_dropMenu').toggleClass('show-menu');
        });
    });
    $(document).on("pageInit", function(){

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
            });
            $('.input-txt').on('focus',function(e){
                t = $(this).offset().top;
            });
        })(window,Zepto);
        //密码是否可见
        $('.eye').click(function(){
            if(!this.isEyed){
                $(this).removeClass('eye-active').prev().attr({'type':'text'});
                this.isEyed = true;
            }else{
                $(this).addClass('eye-active').prev().attr({'type':'password'});
                this.isEyed = false;
            }

        })
    });
    //提现_选择银行卡
    $(document).on("pageInit", "#withdrawDepositPage",function(){

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
    });



    //初始化lightUI框架
    $.init();
});
