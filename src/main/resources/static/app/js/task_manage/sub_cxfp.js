$().ready(function() {
	$('#id').attr("value", parent.id);
	$('#taskId').attr("value", parent.taskId);
	$('#assignee').attr("value", parent.assignee);
	$('#assigneeMc').attr("value", parent.assigneeMc);
	$('#cbry').attr("value", parent.cbry);
	$('#cbryMc').attr("value", parent.cbryMc);
})
var openUser_1 = function() {
	layer.open({
		type : 2,
		title : "选择人员",
		area : [ '300px', '450px' ],
		content : "/sys/user/tree_single"
	})
}

function loadUser_1(userIds, userNames) {
	$("#rwzpry").val(userIds);
	$("#rwzpryMc").val(userNames);
}
function submit_task(e) {
	if ($("#newAssignee").val() == "") {
		layer.msg('未选择任务承办人!');
		return false;
	}
	var data = $('#add_form').serialize();
	data += '&taskPass=1'
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
				parent.layer.msg("保存成功");
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
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