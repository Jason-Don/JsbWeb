/**
 * @author:zhangf
 * @description:工作流 任务签收
 * @date:2018/6/14
 */
var rwly = null;
var fileID = null;
var id = null;
var taskId = null;

$().ready(function() {
	id = $("#id").val();
	taskId = $("#taskId").val();
    rwly = $('#rwly').val();
	fileID = $("#files").val();
    Workflow_qtr_cl.init();
	var rwwcsjFormat = new Date($('#rwwcsj').val());
	var rwwcsj = rwwcsjFormat.getFullYear()+'-'+(rwwcsjFormat.getMonth()+1)+'-'+rwwcsjFormat.getDate();
	$('#rwwcsjLabel').attr("value",rwwcsj);
	
	var rwkssjjFormat = new Date($('#rwkssj').val());
	var rwkssj = rwkssjjFormat.getFullYear()+'-'+(rwkssjjFormat.getMonth()+1)+'-'+rwkssjjFormat.getDate();
	$('#rwkssjLabel').attr("value",rwkssj);
	
	
	var nycd = $('#nycd').val();
	$('#'+nycd).attr("checked","checked");
	
	

});
function downloadFile(){
	location.href = "/common/sysFile/downloadFile/"+fileID;
}
Workflow_qtr_cl = {

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
            	//currUserInfo = data;
            	$("#rwzpqsry").attr("value",data.userId);
            	$("#rwzpqsryMc").attr("value",data.name);
            	if($("#rwlySelect").val()=="")
    				$("#rwlySelect").val(rwly);
            }
        });
        
        $.ajax({
        	url : '/common/dict/list/rwly?sortBy=sort',
            success : function(data) {
    			//加载数据
    			for (var i = 0; i < data.length; i++) {
    				if(data[i].value == rwly){
    					$("#rwlySelect").attr("value",data[i].name);
    					console.log(data[i].name);
    					break;
    				}
    			}
            }
        });
	},
	commit : function(){
		layer.open({
   	   		type : 2,
   	   		title : '任务反馈信息',
   	   		maxmin : true,
   	        shadeClose : false,
   	        area : [ '600px', '300px' ],
   	        content : '../sub_zjfk',
		});

	},

	fb : function(){
		layer.open({
  	   		type : 2,
  	        title : '任务分配信息',
  	        maxmin : true,
  	        shadeClose : false,
  	        area : [ '800px', '600px' ],
  	        content : '../workflow_points_for',
  	    })
 	},

	reject : function(){
		layer.open({
   	   		type : 2,
   	   		title : '任务退回',
   	   		maxmin : true,
   	        shadeClose : false,
   	        area : [ '600px', '300px' ],
   	        content : '../workflow_return',
		})
//        var data = $('#add_form').serialize();
//        data += '&taskPass=0'
//        $.ajax({
//            cache : true,
//            type : "POST",
//            url :"/act/workflow/sign",
//            data : data,
//            async : false,
//            error : function(request) {
//                laryer.alert("Connection error");
//            },
//            success : function(data) {
//                if (data.code == 0) {
//                    parent.layer.msg("操作成功");
//                    parent.reLoad();
//                    var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
//                    parent.layer.close(index);
//                } else {
//                    parent.layer.alert(data.msg)
//                }
//            }
//        });
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