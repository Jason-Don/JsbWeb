			//	显示隐藏select
			function trigger_select(e){
				$(".sel_div ").addClass("hide_div");
				if($(e).hasClass("Open")){
					$(".select_div").removeClass("Open");
					$(e).children("div").addClass("hide_div");
					$(e).removeClass("Open");
				}else{
					$(".select_div").removeClass("Open");
					$(e).addClass("same_border").removeClass("no_border");
					$(e).children("div").removeClass("hide_div");
					$(e).addClass("Open");
				}
				event.stopPropagation();
			}
			$(function(){
				//	点击其他位置让select隐藏
				$(document).click(function(){
					$(".sel_div").addClass("hide_div");
					$(".select_m").removeClass("Open");
					for(var i=0;i<$(".select_m").length;i++){
						for(var j=0;j<$(".select_m").eq(i).find(".sel_li").length;j++){
							if($(".select_m").eq(i).find(".sel_li").eq(j).hasClass("sel_li_check_1")){
								$(".select_m").eq(i).find(".sel_li").eq(j).removeClass("sel_li_check_1").addClass("sel_li_check");
								$(".select_m").eq(i).find(".sel_li").eq(j).siblings().removeClass("sel_li_hover")
								break;
							}
						}
					}
				});
				//	option悬浮更改样式
				$(".sel_li").mouseover(function(){
					for(var i=0;i<$(this).parent().children("li").length;i++){
						if($(this).parent().children("li").eq(i).hasClass("sel_li_check")){
							$(this).parent().children("li").eq(i).removeClass("sel_li_check").addClass("sel_li_check_1");
							break;
						}
					}
					$(this).siblings().removeClass("sel_li_hover");
					$(this).addClass("sel_li_hover");
				});
				//	更换option时更换样式
				$(".sel_li").click(function(){
					$(this).siblings().removeClass("sel_li_check").removeClass("sel_li_check_1");
					$(this).removeClass("sel_li_hover").addClass("sel_li_check");
					var name = $(this).text();
					$(this).parent().siblings("span").text(name);
					$(this).parent().parent().addClass("Open");
				});
			});