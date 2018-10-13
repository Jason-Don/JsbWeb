/**
 * @author:zhangf
 * @description:牵头人审核
 * @date:2018/6/14
 */
var rwly = null;
var fileID = null;
var id = null;
var taskId = null;
var taskPass = null;
var fk_id = null;
$().ready(function() {
	id = $("#id").val();
	taskId = $("#taskId").val();
	Workflow_qtr_sh.init();
	fileID = $("#files").val();
	fk_id = $("#fk_id").val();
	var rwwcsjFormat = new Date($('#rwwcsj').val());
	var rwwcsj = rwwcsjFormat.getFullYear()+'-'+(rwwcsjFormat.getMonth()+1)+'-'+rwwcsjFormat.getDate();
	$('#rwwcsjLabel').attr("value",rwwcsj);
	
	var rwkssjjFormat = new Date($('#rwkssj').val());
	var rwkssj = rwkssjjFormat.getFullYear()+'-'+(rwkssjjFormat.getMonth()+1)+'-'+rwkssjjFormat.getDate();
	$('#rwkssjLabel').attr("value",rwkssj);
	
	
	var nycd = $('#nycd').val()
	$('#'+nycd).attr("checked","checked");
	
	rwly = $('#rwly').val()

});
function downloadFile(){
	location.href = "/common/sysFile/downloadFile/"+fileID;
}
Workflow_qtr_sh = {

	//var currUserInfo : null;
    // TODO:JS
    /**
     * 初始化页面
     * 获得：1、用户信息；2、任务来源；
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
		taskPass = 1;
		layer.open({
   	   		type : 2,
   	   		title : '审核通过',
   	   		maxmin : true,
   	        shadeClose : false,
   	        area : [ '600px', '300px' ],
   	        content : '../sub_sh',
		});

     },

    reject : function(){
    	taskPass = 0;
    	layer.open({
   	   		type : 2,
   	   		title : '审核不通过',
   	   		maxmin : true,
   	        shadeClose : false,
   	        area : [ '600px', '300px' ],
   	        content : '../sub_sh',
		});

    },
    close: function(){
    	var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
        parent.layer.close(index);
        parent.reLoad();
    }
}
function change_task_type(n){
	if(n == 0){
		$("#task_detail_type").text("任务更换任务处理人完成,请关闭页面");
	}else if(n == 1){
		$("#task_detail_type").text("任务已经分办完成,请关闭页面");
	}else if(n == 2){
		$("#task_detail_type").text("任务已经处理完成,请关闭页面");
	}else{
		$("#task_detail_type").text("任务已经退回,请关闭页面");
	}
	$(".already_detail").removeClass("hide_div");
	$(".no_detail").addClass("hide_div");
}