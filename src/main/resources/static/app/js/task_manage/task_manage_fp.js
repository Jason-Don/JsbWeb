var fileID = null;
$(function() {
	$('#startTime').html(dateToGMT($("#rwkssj").val()));
	$('#endTime').val(dateToGMT($("#rwwcsj").val()));
	$('#endTime').mobiscroll().datetime({
		theme:'ios',
		mode:'scroller',
		display:'bottom',
		lang:'zh',
		dateFormat:'yy-mm-dd',
		minDate:new Date(2000,3,10,9,22),
		maxDate:new Date(2030,7,30,23,59),
		stepMinute:1
	});
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
});

//	返回
function go_back() {
	window.history.go(-1);
}
fileID = $("#files").val();
//下载文件
function downloadFile() {
	location.href = "/common/sysFile/downloadFile/" + fileID;
}
var openUser = function() {
	var rwbllx = $("input[name='rwbllx']:checked").val();//获取被选中的单选按钮
	if (rwbllx == "JB") {
		layer.open({
			type : 2,
			title : "选择人员",
			area : [ '300px', '400px' ],
			content : "/app/user/userTree_single"
		});
	} else {
		layer.open({
			type : 2,
			title : "选择人员",
			area : [ '300px', '450px' ],
			content : "/sys/user/treeView"
		});
	}
}
function loadUser(userIds, userNames) {
	$("#rwcbry").val(userIds);
	$("#rwcbryMc").val(userNames);
}
function loadUser_1(userIds, userNames) {
	$("#rwcbry").val(userIds);
	$("#rwcbryMc").val(userNames);
}

function submit_task() {
	var lx = $("input[name='rwbllx']:checked").val();
	if (lx == 'JB') {
		$("#rwcbry").attr("name","rwqtr");
		$("#rwcbryMc").attr("name","rwqtrMc");
	}
	else{
		$("#rwcbry").attr("name","cbry");
		$("#rwcbryMc").attr("name","cbryMc");
	}
	if ($("#rwcbry").val() == "") {
		if (lx == 'JB') {
			layer.msg('未选择任务牵头人!');
			return false;
		} else {
			layer.msg('未选择承办人!');
			return false;
		}
	}
	if ($("#comment").val() == "") {
		layer.msg('尚未填写反馈说明!');
		return false;
	}
//	alert($("#endTime").val());
//	return false;
	var data = $('#add_form').serialize();
	$.ajax({
		cache : true,
		type : "POST",
		url : "/act/workflow/fpOk",
		data : data,
		async : false,
		error : function(request) {
			laryer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				layer.msg("任务已经分配完成！");
				$("#submit_fpxx").hide();
				$("#reject").hide();
				$("#success_message").html("任务已经分配完成！");
				go_back();
			} else {
				layer.msg(data.msg);
			}
		}
	});
}
function rej(){
	layer.open({
	   		type : 2,
	   		title : '任务退回说明',
	   		closeBtn:0,
	        shadeClose : false,
	        area : [ '80%', '250px' ],
	        content : '/app/workflow/rejectpage'
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
	return datetime_str;
}