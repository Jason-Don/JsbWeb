if($("#status").val()==1)
	$("#status_text").text("正常");
else
	$("#status_text").text("禁用");
//	返回
function go_back() {
	window.history.go(-1);
}