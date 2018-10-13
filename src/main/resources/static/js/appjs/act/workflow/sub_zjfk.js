$().ready(function(){
	$('#id').attr("value",parent.id);
	$('#taskId').attr("value",parent.taskId);
})
function submit_task(e){
	if($("#fkqksm").val() ==""){
		layer.alert('尚未填写任务反馈!',{icon:2,skin:'layer-ext-moon'});
		return false;
	}
	var formData = new FormData($("#add_form")[0]);
	//console.log($('#add_form').serialize());
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
            	parent.layer.msg("提交成功");
              	parent.change_task_type(2);
            	var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
            	parent.layer.close(index);
          	} else {
            	parent.layer.alert(data.msg)
        	}
     	}
	});
}