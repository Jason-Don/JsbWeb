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
	
	if($("#shyj").text()=="null"){
		$("#shxx").addClass("hidden");
	}

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
    					$("#jblxSelect").html(data[i].name);
    					break;
    				}
    			}
            }
        });
        var jjqk = $('#jjqk').val();
    	if(jjqk == 'YB'){
    		$('#jjqk_type').html('一般');
    	}else if(jjqk == 'ZY'){
    		$('#jjqk_type').html('重要');
    	}else if(jjqk == 'JJ'){
    		$('#jjqk_type').html('紧急');
    	}else{
    		$('#jjqk_type').html('未选择');
    	}
        
     }

}

$("#submit_button").click(function () {
   // if($("#add_form").valid()){
    	console.log($('#add_form').serialize());
        $.ajax({
            cache : true,
            type : "POST",
            url :"/activiti/overtime/save",
            data : $('#add_form').serialize(),
            async : false,
            error : function(request) {
                parent.laryer.alert("Connection error");
            },
            success : function(data) {
                if (data.code == 0) {
                    parent.layer.alert("提交成功");
                    $("#photo_info").click();
                } else {
                    parent.layer.alert(data.msg)
                }
            }
        });
   // }
});