/**
 * @author:zhangf
 * @description:工作流 承办人处理页
 * @date:2018/6/14
 */
var rwly = null;
var fileID = null;
var id = null;
var taskId = null;
$().ready(function() {
	id = $("#id").val();
	taskId = $("#taskId").val();
	Workflow_fk.init();
	fileID = $("#files").val();
	var rwwcsjFormat = new Date($('#rwwcsj').val());
	var rwwcsj = rwwcsjFormat.getFullYear()+'-'+(rwwcsjFormat.getMonth()+1)+'-'+rwwcsjFormat.getDate();
	$('#rwwcsjLabel').attr("value",rwwcsj);
	
	var rwkssjjFormat = new Date($('#rwkssj').val());
	var rwkssj = rwkssjjFormat.getFullYear()+'-'+(rwkssjjFormat.getMonth()+1)+'-'+rwkssjjFormat.getDate();
	$('#rwkssjLabel').attr("value",rwkssj);
	
	
	var nycd = $('#nycd').val()
	$('#'+nycd).attr("checked","checked");
	
	rwly = $('#rwly').val()
    loadFkHistory();
});
function downloadFile(){
	location.href = "/common/sysFile/downloadFile/"+fileID;
}
Workflow_fk = {

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
		layer.open({
   	   		type : 2,
   	   		title : '任务反馈信息',
   	   		maxmin : true,
   	        shadeClose : false,
   	        area : [ '600px', '300px' ],
   	        content : '../workflow_feedback',
		});
//		if($("#fkqksm").val() ==""){
// 			layer.alert('尚未填写任务反馈!',{icon:2,skin:'layer-ext-moon'});
// 			return false;
// 		}
//         var formData = new FormData($("#add_form")[0]);
//    	 //console.log($('#add_form').serialize());
//         $.ajax({
//             type : "POST",
//             url :"/act/workflow/workflow_fk",
//             data : formData,
//             async : false,
//             contentType: false,//FormData 必须
//             processData: false,//FormData 必须
//             cache: false, //上传文件不需要缓存
//             error : function(request) {
//                 laryer.alert("Connection error");
//             },
//             success : function(data) {
//                 if (data.code == 0) {
//                     parent.layer.msg("提交成功");
//     				parent.reLoad();
//    				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
//    				parent.layer.close(index);
//                 } else {
//                     parent.layer.alert(data.msg)
//                 }
//             }
//         });
     },

    reject : function(){
    	layer.open({
   	   		type : 2,
   	   		title : '任务退回',
   	   		maxmin : true,
   	        shadeClose : false,
   	        area : [ '600px', '300px' ],
   	        content : '../workflow_return',
		});
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
function loadFkHistory(){
    $.ajax({
        url : '/act/workflow/fkHistory/'+id,
        method : 'get',
        dataType : 'json',
        async : false,
        success : function(data) {
        	if(data.length > 0){
        		$(".is_fk").removeClass("hide_div");
        	}
    		var html = "";
			for (var i = 0; i < data.length; i++) {
				if(i>0){
					html += '<div class="border_div"></div>';
				}
				html +='<div class="more_div_pj read_only"><label class="label_left">承办人员:</label><input class="input" readonly="readonly" type="text" value="'+data[i].cbryMc+'" /></div>'
				html +='<div class="more_div_pj read_only"><label class="label_left">反馈详情:</label><textarea readonly="readonly">'+data[i].fkqksm+'</textarea></div>'
				html += '<div class="more_div_pj"><label class="label_left label_left_1">反馈附件:</label><a href="#" onclick="downloadFileById(\''+ data[i].fileId+ '\')">'+data[i].fileMc+'</a></div>';
				var shjg = '';
				if(data[i].sfshtg == 'Y'){
					shjg = '通过';
				}else{
					shjg = '不通过';
				}
				html +='<div class="more_div_pj read_only"><label class="label_left">是否审核通过:</label><input class="input" readonly="readonly" type="text" value="'+shjg+'" /></div>'
				html +='<div class="more_div_pj read_only"><label class="label_left">审核意见:</label><input class="input" readonly="readonly" type="text" value="'+data[i].shyj+'" /></div>'
			}
			$("#fkDiv").append(html);
        }
    }); 
}
function downloadFileById(fileID){
	location.href = "/common/sysFile/downloadFile/"+fileID;
}