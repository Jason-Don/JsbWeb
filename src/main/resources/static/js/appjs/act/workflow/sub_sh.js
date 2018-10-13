$().ready(function(){
	$('#id').attr("value",parent.id);
	$('#taskId').attr("value",parent.taskId);
	$('#taskPass').attr("value",parent.taskPass);
	$('#fk_id').attr("value",parent.fk_id);
})
function submit_task(e){
	if (!$("#comment").val()) {
		layer.alert('未填写审核意见!', {
			icon : 2,
			skin : 'layer-ext-moon'
		});
		return false;
	}
  var data = $('#add_form').serialize();
  $.ajax({
      cache : true,
      type : "POST",
      url :"/act/workflow/sh",
      data : data,
      async : false,
      error : function(request) {
          laryer.alert("Connection error");
      },
      success : function(data) {
          if (data.code == 0) {
              parent.layer.msg("操作成功");
          	parent.change_task_type(3);
        	var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
        	parent.layer.close(index);
          } else {
              parent.layer.alert(data.msg)
          }
      }
  });
}