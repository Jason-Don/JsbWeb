$().ready(function(){
	$('#id').attr("value",parent.id.value);//注意，这个地方不加value是取不到值的
	$('#taskId').attr("value",parent.taskId.value);
})
function submit_task(e){
	if($("#fkqksm").val() ==""){
		layer.msg('尚未填写任务反馈!');
		return false;
	}
	var formData = new FormData($("#add_form")[0]);
	$.ajax({
		type : "POST",
		url :"/act/workflow/workflow_zjfk",
     	data : formData,
    	async : false,
      	contentType: false,//FormData 必须
       	processData: false,//FormData 必须
       	cache: false, //上传文件不需要缓存
     	error : function(request) {
     		laryer.alert("Connection error");
      	},
     	success : function(data) {
     		if (data.code == 0) {
            	parent.layer.msg("反馈提交成功！");
            	$(".btn",window.top.document).hide();
            	$("#success_message",window.top.document).html("反馈已成功提交！");
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
function openfilechooser(){
	$("#file_fk").click();
}
function setfname(){
	var fname=$("#file_fk").val().substring($("#file_fk").val().lastIndexOf("\\")+1);
	$("#fname").html(fname);
}