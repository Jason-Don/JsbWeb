/**
 * @author:zhangf
 * @description:工作流 任务签收
 * @date:2018/6/14
 */
var rwly = null;
var fileID = null;
var id = null;
var taskId = null;
var assignee = null;
var assigneeMc = null;
var cbry = null;
var cbryMc = null;

$().ready(function() {
	Workflow_fp.init();
	fileID = $("#files").val();
	id = $("#id").val();
	taskId = $("#taskId").val();
	assignee = $("#assignee").val();
	assigneeMc = $("#assigneeMc").val();
	cbry = $("#cbry").val();
	cbryMc = $("#cbryMc").val();
	var rwwcsjFormat = new Date($('#rwwcsj').val());
	var rwwcsj = rwwcsjFormat.getFullYear()+'-'+(rwwcsjFormat.getMonth()+1)+'-'+rwwcsjFormat.getDate();
	$('#rwwcsjLabel').attr("value",rwwcsj);
	
	var rwkssjjFormat = new Date($('#rwkssj').val());
	var rwkssj = rwkssjjFormat.getFullYear()+'-'+(rwkssjjFormat.getMonth()+1)+'-'+rwkssjjFormat.getDate();
	$('#rwkssjLabel').attr("value",rwkssj);
	
	
	var nycd = $('#nycd').val()
	$('#'+nycd).attr("checked","checked");
	
	var rwbllx = $('#rwbllx').val()
	$('#'+rwbllx).attr("checked","checked");
	
	rwly = $('#rwly').val()

});
function downloadFile(){
	location.href = "/common/sysFile/downloadFile/"+fileID;
}
Workflow_fp = {

	//var currUserInfo : null;
    // TODO:JS
    /**
     * 初始化页面
     * 获得：1、用户信息；2、任务来源；
     */
     init :function(){
/*        $.ajax({
            url : '/utils/getCurrUserInfo',
            method : 'get',
            dataType : 'json',
            success : function(data) {
            	//currUserInfo = data;
            	$("#rwzpqsry").attr("value",data.userId);
            	$("#rwzpqsryMc").attr("value",data.name);
            }
        });*/
        
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
	ok : function(){
		layer.open({
  	   		type : 2,
  	        title : '重新分配任务信息',
  	        maxmin : true,
  	        shadeClose : false,
  	        area : [ '800px', '600px' ],
  	        content : '../workflow_afresh_allot.html',
  	    });

	},
	reject : function(){
		layer.open({
    	   		type : 2,
    	   		title : '任务退回',
    	   		maxmin : true,
    	        shadeClose : false,
    	        area : [ '600px', '300px' ],
    	        content : '../sub_end.html',
 		});
//    	 var data = $('#add_form').serialize();
//    	 data += '&taskPass=0'
//         $.ajax({
//             cache : true,
//             type : "POST",
//             url :"/act/workflow/zdcbry_sub",
//             data : data,
//             async : false,
//             error : function(request) {
//                 laryer.alert("Connection error");
//             },
//             success : function(data) {
//                 if (data.code == 0) {
//                     parent.layer.msg("操作成功");
//     				parent.reLoad();
//    				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
//    				parent.layer.close(index);
//                 } else {
//                     parent.layer.alert(data.msg)
//                 }
//             }
//         });
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