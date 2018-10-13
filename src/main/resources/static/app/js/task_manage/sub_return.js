$().ready(function() {
	$('#id').attr("value", parent.id.value);
	$('#taskId').attr("value", parent.taskId.value);
})
function submit_task(e) {
	if ($("#comment").val() == "") {
		layer.msg('未填写退回说明!');
		return false;
	}
	var data = $('#add_form').serialize();
	$.ajax({
		cache : true,
		type : "POST",
		url : "/app/workflow/reject",
		data : data,
		async : false,
		error : function(request) {
			laryer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("任务已退回！");
				$(".submit_div",window.top.document).hide();
            	$("#success_message",window.top.document).html("任务已经退回！");
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