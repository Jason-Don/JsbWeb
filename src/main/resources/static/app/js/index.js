$(document).ready(function() {
    var $slider = $(".slider"),  //轮播所在的div
    $slideBGs = $(".slide__bg"),  //轮播的背景图
    diff = 0, 
    curSlide = 0,  //当前展示 的轮播图
    numOfSlides = $(".slide").length - 1,  //轮播图的数量-1
    animating = false, 
    animTime = 500,  //轮播花费的时间
    autoSlideTimeout, 
    autoSlideDelay = 3000,  //轮播的时间间隔
    $pagination = $(".slider-pagi");

    //创建轮播的数量以及相应的页码，给相应的属性data
    function createBullets() {
        for (var i = 0; i < numOfSlides + 1; i++) {
            var $li = $("<li class='slider-pagi__elem'></li>");
            $li.addClass("slider-pagi__elem-" + i).data("page", i);
            if (!i)
                $li.addClass("active");
            $pagination.append($li);
        }
    }
    ;
    
    createBullets();
    
    function manageControls() {
        $(".slider-control").removeClass("inactive");
        if (!curSlide)
            $(".slider-control.left").addClass("inactive");
        if (curSlide === numOfSlides)
            $(".slider-control.right").addClass("inactive");
    }
    ;
    //定时轮播
    function autoSlide() {
        autoSlideTimeout = setTimeout(function() {
            //每次当前的位置+1,如果大于轮播图的数量-1则重置为0
            curSlide++;
            if (curSlide > numOfSlides)
                curSlide = 0;
            changeSlides();
        }, autoSlideDelay);
    }
    ;
    
    autoSlide();
    //改变当前展示的图片
    function changeSlides(instant) {
        //如果正在轮播，则
        if (!instant) {
            animating = true;
            manageControls();
            $slider.addClass("animating");
            $slider.css("top");
            $(".slide").removeClass("active");
            $(".slide-" + curSlide).addClass("active");
            setTimeout(function() {
                $slider.removeClass("animating");
                animating = false;
            }, animTime);
        }
        //关闭定时器
        window.clearTimeout(autoSlideTimeout);
        //页码样式更改
        $(".slider-pagi__elem").removeClass("active");
        $(".slider-pagi__elem-" + curSlide).addClass("active");
        $slider.css("transform", "translate3d(" + -curSlide * 100 + "%,0,0)");
        $slideBGs.css("transform", "translate3d(" + curSlide * 50 + "%,0,0)");
        diff = 0;
        //更改完成之后再次调用定时器
        autoSlide();
    }
    
    function navigateLeft() {
        if (animating)
            return;
        if (curSlide > 0)
            curSlide--;
        changeSlides();
    }
    
    function navigateRight() {
        if (animating)
            return;
        if (curSlide < numOfSlides)
            curSlide++;
        changeSlides();
    }
    
    $(document).on("touchstart", ".slider", function(e) {
        if (animating)
            return;
        window.clearTimeout(autoSlideTimeout);
        var startX = e.pageX || e.originalEvent.touches[0].pageX, 
        winW = $(window).width();
        diff = 0;
        
        $(".slider").on("touchmove", function(e) {
            var x = e.pageX || e.originalEvent.touches[0].pageX;
            diff = (startX - x) / winW * 70;
            if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0))
                diff /= 2;
            $slider.css("transform", "translate3d(" + (-curSlide * 100 - diff) + "%,0,0)");
            $slideBGs.css("transform", "translate3d(" + (curSlide * 50 + diff / 2) + "%,0,0)");
        });
    });
    
    $(".slider").on("touchend", function(e) {
        //取消移动事件的绑定
        $(document).off("mousemove touchmove");
        if (animating)
            return;
        if (!diff) {
            changeSlides(true);
            console.log(1);
            return;
        }
        if (diff > -8 && diff < 8) {
            changeSlides();
            return;
        }
        if (diff <= -8) {
            navigateLeft();
        }
        if (diff >= 8) {
            navigateRight();
        }
    });
    
    $(document).on("click", ".slider-control", function() {
        if ($(this).hasClass("left")) {
            navigateLeft();
        } else {
            navigateRight();
        }
    });
    
    $(document).on("click", ".slider-pagi__elem", function() {
        curSlide = $(this).data("page");
        changeSlides();
    });

});
$(function() {
    var userid = $('#userId').val();
    //监听下按松开事件来实现滑动效果
    var up_edit = document.getElementsByClassName("touch_edit");
    for(var i=0;i<up_edit.length;i++){
    	up_edit[i].addEventListener("touchstart", function(ev) {
            down(this, ev);
        }, false);
    }
    for(var i=0;i<up_edit.length;i++){
    	up_edit[i].addEventListener("touchend", function(ev) {
	        up(this, ev);
	    }, false);
    }
});
var mouse_x, mouse_y;
//鼠标下按事件
function down(e) {
    mouse_x = event.touches[0].pageX;
    mouse_y = event.touches[0].pageY;
}
//鼠标下按后松开事件
function up(e) {
    var new_mouse_x = event.changedTouches[0].pageX;
    var new_mouse_y = event.changedTouches[0].pageY;
    if (new_mouse_x - mouse_x > 20) {
        $('.top_other.active').prev().click();
        return;
    } else if (new_mouse_x - mouse_x < -20) {
        $('.top_other.active').next().click();
        return;
    }
}
//跳转li
var now_num = 1;
var is_move = false;
function tz_iframe_web(e, n) {
    if (!$(e).hasClass('active')) {
        if (!is_move) {
            is_move = true;
            //进行样式增加以及兄弟节点样式清除
            $(e).addClass('active');
            $(e).siblings().removeClass('active');
//            if (n == 1) {
//                $("#OTN_1").children("iframe").attr('src', 'function/home_page.html');
//                $("#function_btn_1").children("img").attr('src', 'images/home_page_1.png');
//                $("#function_btn_2").children("img").attr('src', 'images/setting.png');
//            } else if (n == 2) {
//                $("#OTN_2").children("iframe").attr('src', 'function/setting.html');
//                $("#function_btn_1").children("img").attr('src', 'images/home_page.png');
//                $("#function_btn_2").children("img").attr('src', 'images/setting_1.png');
//            }
            var all_li = $('.all_li');
            var offset = ($('.all_li .tab-pane').width()) * -(n - 1);
            //把其点中的div放在当前div的后一位,这样只需要移动一个div的距离就够了
            //						$('.all_li #OTN_'+now_num).after($('.all_li #OTN_'+n));
            all_li.stop().animate({marginLeft: offset}, 200, function() {
                //移动完成之后将选中的div放在首位,然后清空移动位置
                //							all_li.prepend($('.all_li #OTN_'+n));
                //							$(this).css('margin-left','0px');
                is_move = false;
            });
            //完成操作之后将当前显示的位置为选中的div
            now_num = n;
        } else {
            layer.msg("正在操作,请稍后!");
        }
    }
}
function tz_function(n) {
    if (n == 1) {
        window.location = "/app/workflow";
    } else if (n == 2) {
        window.location = "/app/over_time";
    } else if (n == 3) {
        window.location = "task_manage/task_manage.html"; //"/activiti/task/todo";
    } else if (n == 4) {
        window.location = "/app/notice";
    } else if (n == 5) {
        window.location = "/app/tjfx";
    } else if (n == 6) {
        window.location = "interior_news/interior_news.html";
    } else if (n == 7) {
        window.location = "/app/user/usersbook";
    } else if (n == 8) {
        window.location = "file_manage/file_list.html";
    }
}
function change_psd() {
    $("#open_change_psd").click();
}
function log_out() {
    window.location = "/appLogout";
}
