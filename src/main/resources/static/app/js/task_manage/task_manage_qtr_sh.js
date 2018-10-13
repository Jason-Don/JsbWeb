/*牵头人审核页面的js*/
var rwly = null;
var id = null;
var taskId = null;
var taskPass = null;
var fk_id = null;
$().ready(function() {
	id = $("#id").val();
	taskId = $("#taskId").val();
	Workflow_qtr_sh.init();
	fk_id = $("#fk_id").val();
	var rwwcsjFormat = new Date($('#rwwcsj').val());
	var rwwcsj = rwwcsjFormat.getFullYear()+'-'+(rwwcsjFormat.getMonth()+1)+'-'+rwwcsjFormat.getDate();
	$('#startTime').html(rwwcsj);
	
	var rwkssjjFormat = new Date($('#rwkssj').val());
	var rwkssj = rwkssjjFormat.getFullYear()+'-'+(rwkssjjFormat.getMonth()+1)+'-'+rwkssjjFormat.getDate();
	$('#endTime').html(rwkssj);
	
	
	var nycd = $('#nycd').val()
	$('#'+nycd).attr("checked","checked");
	
	rwly = $('#rwly').val()

});
function downloadFile(fileID_tag){
	var fileID=$("#"+fileID_tag).val();
	location.href = "/common/sysFile/downloadFile/"+fileID;
}
Workflow_qtr_sh = {
    /**
     * 初始化页面
     */
     init :function(){
        $.ajax({
            url : '/utils/getCurrUserInfo',
            method : 'get',
            dataType : 'json',
            success : function(data) {
            	
            	$("#zzblry").attr("value",data.userId);
            	$("#zzblryMc").attr("value",data.name);
            	
            }
        });      
        $.ajax({
        	url : '/common/dict/list/rwly?sortBy=sort',
            success : function(data) {
    			//加载数据
    			for (var i = 0; i < data.length; i++) {
    				if(data[i].value == rwly){
    					$("#rwlySelect").attr("value",data[i].name);
    					break;
    				}
    			}
    			if($("#rwlySelect").val()=="")
    				$("#rwlySelect").val(rwly);
            }
        });
     },
	commit : function(){
		if($("#shyj").val()==''){
			layer.msg("请填写审核意见。");
			return false;
		}
		var data = $('#add_form').serialize();
		data += '&taskPass=1';
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
		    	  layer.msg("审核意见已提交！");
		    	  go_back();
		      }
		  });
     },
    reject : function(){
    	if($("#shyj").val()==''){
			layer.msg("请填写审核意见。");
			return false;
		}
    	var data = $('#add_form').serialize();
    	data += '&taskPass=0';
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
		    	  layer.msg("审核意见已提交！");
		    	  go_back();
		      }
		});
    }
}
function change_task_type(n){
	$("#task_detail_type").text("审核信息已提交");
	$(".already_detail").removeClass("hide_div");
	$(".no_detail").addClass("hide_div");
}
function go_back(){
	window.history.go(-1);
}