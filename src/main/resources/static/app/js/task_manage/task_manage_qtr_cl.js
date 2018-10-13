var fileID = null;
$(function() {
	var rwwcsj = dateToGMT($('#rwwcsj').val());
	var rwkssj = dateToGMT($('#rwkssj').val());
	$('#startTime').text(rwkssj);
	$('#endTime').text(rwwcsj);
	
	show_detail_msg();

});
//	展示详情信息
function show_detail_msg() {
	var rwly = $('#rwly').val();
	$.ajax({
		url : '/common/dict/list/rwly?sortBy=sort',
		success : function(data) {
			//加载数据
			for (var i = 0; i < data.length; i++) {
				if (data[i].value == rwly) {					
					$("#rwlytext").html(data[i].name);
					break;
				}
			}
			if ($("#rwlytext").html() == "")
				$("#rwlytext").html(rwly);
		}
	});
	if ($("#nycd").val() == "JD")
		$("#nycdtext").text("简单");
	if ($("#nycd").val() == "ZC")
		$("#nycdtext").text("正常");
	if ($("#nycd").val() == "Nan")
		$("#nycdtext").text("难");

}
//	返回
function go_back() {
	window.history.go(-1);
}
fileID = $("#files").val();
//下载文件
function downloadFile() {
location.href = "/common/sysFile/downloadFile/" + fileID;
}

function commit() {
	layer.open({
	   		type : 2,
	   		title : '任务反馈信息',
	   		closeBtn:0,
	        shadeClose : false,
	        area : [ '80%', '270px' ],
	        content : '/app/workflow/feedback',
	});
}

function fb(){
	layer.open({
	   		type : 2,
	        title : '任务分配信息',
	        closeBtn:0,
	        shadeClose : false,
//	        area : [ '100%', '600px'],
	        area : [ '100%', '90%'],
	        content : '/app/workflow/fb',
	    });
}

function reject(){
	layer.open({
	   		type : 2,
	   		title : '任务退回说明',
	   		closeBtn:0,
	        shadeClose : false,
	        area : [ '80%', '250px' ],
	        content :  '/app/workflow/rejectpage',
	});
}
//用于把数据库里面CST(USA)标准的时间转换成GMT+0800标准时间
function dateToGMT(sqlDate){
	var dateStr=sqlDate.split(" ");
	var strGMT=dateStr[0]+" "+dateStr[1]+" "+dateStr[2]+" "+dateStr[5]+" "+dateStr[3]+" GMT+0800";
	var datetime=new Date(Date.parse(strGMT));
	var year =datetime.getFullYear();
	var month = (datetime.getMonth()+1)>9?(datetime.getMonth()+1):"0"+(datetime.getMonth()+1);
	var day = datetime.getDate()>9?datetime.getDate():"0"+datetime.getDate();
	var hour=datetime.getHours()>9?datetime.getHours():"0"+datetime.getHours();
	var min=datetime.getMinutes()>9?datetime.getMinutes():"0"+datetime.getMinutes();
	var datetime_str = year+"-"+month+"-"+day+" "+hour+":"+min;
	return datetime_str
}