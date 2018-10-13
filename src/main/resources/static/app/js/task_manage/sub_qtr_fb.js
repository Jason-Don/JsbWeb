$().ready(function(){
	$('#id').attr("value",parent.id.value);
	$('#taskId').attr("value",parent.taskId.value);
})
var openUser = function(){
	layer.open({
		type:2,
		title:"选择人员",
		area : [ '300px', '450px' ],
		content:"/sys/user/treeView"
	})
}

function loadUser(userIds,userNames){
	$("#cbry").val(userIds);
	$("#cbryMc").val(userNames);
}
function submit_task(e){
	if ($("#comment").val() == "") {
		layer.msg('尚未填写任务反馈!');
		return false;
	}
	var data = $('#add_form').serialize();
	data += "&taskPass=2"
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
				parent.layer.msg("处理成功！");
				$(".btn", window.top.document).hide();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.go_back();
				parent.layer.close(index);
			} else {
				parent.layer.msg(data.msg)
			}
		}
	});
}

function cancel() {
	var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
	parent.layer.close(index);
}