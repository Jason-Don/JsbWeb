$().ready(function(){
	$('#id').attr("value",parent.id);
	$('#taskId').attr("value",parent.taskId);
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
function submit_task(e) {
	if ($("#comment").val() == "") {
		layer.alert('尚未填写任务反馈!', {
			icon : 2,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	var data = $('#add_form').serialize();
	data += "&taskPass=2"
	console.log(data);
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
				parent.layer.msg("操作成功");
				parent.change_task_type(1);
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);
			} else {
				parent.layer.alert(data.msg)
			}
		}
	});
}