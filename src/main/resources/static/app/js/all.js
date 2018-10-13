$(document).ready(function(){
	start_resize();
});
$(window).resize(function(){
    start_resize();
});
//			初始化高度
function start_resize(){
	$("#app_div").css('height',$(document.body).height()+'px');
	$("#app_div").css('background-size','100% '+($(document.body).height()+'px'));
}