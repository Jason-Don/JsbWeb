var fileID = null;
$(function() {
	var rwwcsjFormat = new Date($('#rwwcsj').val());
	var rwwcsj = rwwcsjFormat.getFullYear() + '-'
			+ (rwwcsjFormat.getMonth() + 1) + '-' + rwwcsjFormat.getDate();
	$('#endTime').html(rwwcsj);
	
	var rwkssjjFormat = new Date($('#rwkssj').val());
	var rwkssj = rwkssjjFormat.getFullYear() + '-'
			+ (rwkssjjFormat.getMonth() + 1) + '-' + rwkssjjFormat.getDate();
	$('#startTime').html(rwkssj);
	
	
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
	
	var rwbllx = $('#rwbllx').val()
	$('[value='+rwbllx+']').attr("checked","checked");
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
	layer.open({
		type : 2,
		title : "选择人员",
		area : [ '300px', '400px' ],
		content : "/app/user/userTree_single"
	})
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
	if ($("#rwcbry").val() == "") {
			layer.msg('未选择承办人!');
			return false;
	}
	if ($("#comment").val() == "") {
		layer.msg('尚未填写反馈说明!');
		return false;
	}
	var data = $('#add_form').serialize();
	console.log(data);
	data += "&taskPass=1"
	$.ajax({
		cache : true,
		type : "POST",
		url : "/act/workflow/zdcbry_sub",
		data : data,
		async : false,
		error : function(request) {
			laryer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				$(".submit_div").hide();
				$("#success_message").html("更改承办人已提交！");
				layer.msg("更改承办人已提交！");
				go_back();
			} else {
				layer.msg(data.msg)
			}
		}
	});
}
function end(){
	layer.open({
		type : 2,
		title : "终止任务说明",
		area : [ '300px', '250px' ],
		content : "/app/workflow/sub_end"
	})
}
