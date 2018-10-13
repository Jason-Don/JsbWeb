/**
 * @author:zhangf
 * @description:工作流
 * @date:2018/6/14
 */
/*$(function(){

})*/
var jblx = null;
$().ready(function() {
	$('#kssjLabel').attr("value",$('#kssj').val());

	$('#jssjLabel').attr("value",$('#jssj').val());
	
	Overtime.init();
	
	jblx = $("#jblx").val();

});


Overtime = {

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
            	$("#sqrId").attr("value",data.userId);
            	$("#sqrMc").attr("value",data.name);
            	$("#szbmId").attr("value",data.deptId);
            	$("#szbmMc").attr("value",data.deptName);
            }
        });
        
        $.ajax({
        	url : '/activiti/workflow/list?yxbz=Y&rwzt=ing',
            success : function(data) {
            	var html = "";
    			//加载数据
    			for (var i = 0; i < data.total; i++) {
    				html += '<option value="' + data.rows[i].id + '">' + data.rows[i].taskName + '</option>'
    			}
    			$("#glgzlc").append(html);
    			$("#gllc").chosen({
    				maxHeight : 200
    			});
            }
        });*/
        
        $.ajax({
        	url : '/common/dict/list/jb_type',
            success : function(data) {
    			//加载数据
    			for (var i = 0; i < data.length; i++) {
    				if(data[i].value == jblx){
    					$("#jblxSelect").attr("value",data[i].name);
    					break;
    				}
    			}
            }
        });
        
        $.ajax({
        	url : '/common/dict/list/jjqk_type',
            success : function(data) {
            	var html = "";
    			//加载数据
    			for (var i = 0; i < data.length; i++) {
    				html += //'<label class="radio-inline"> <input name="jjqk" type="radio" value="'+data[i].value+'" id="jjqk'+i+'">'+data[i].name+'</input></label>'
    				'<label><input type="radio" id="'+data[i].value+'" name="nycd" value="'+data[i].value+'" disabled/>'+data[i].name+'</label>'
    			}
    	        $("#jjqk_type").append(html);
    	        
    	    	var jjqk = $('#jjqk').val()
    	    	$('#'+jjqk).attr("checked","checked");

            }
        });

        
     }

}

function pass(){
    $.ajax({
        cache : true,
        type : "POST",
        url :"/activiti/overtime/sh_pass",
        data : $('#add_form').serialize(),
        async : false,
        error : function(request) {
            parent.laryer.alert("Connection error");
        },
        success : function(data) {
            if (data.code == 0) {
                parent.layer.alert("提交成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);
            } else {
                parent.layer.alert(data.msg)
            }
        }
    });
}
function reject(){
    $.ajax({
        cache : true,
        type : "POST",
        url :"/activiti/overtime/sh_reject",
        data : $('#add_form').serialize(),
        async : false,
        error : function(request) {
            parent.laryer.alert("Connection error");
        },
        success : function(data) {
            if (data.code == 0) {
                parent.layer.alert("提交成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);
            } else {
                parent.layer.alert(data.msg)
            }
        }
    });
}