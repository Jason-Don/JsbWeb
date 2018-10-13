/**
 * @author:zhangf
 * @description:工作流
 * @date:2018/6/14
 */
/*$(function(){

})*/
$().ready(function() {
	Overtime.init();
});

Overtime = {

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
    			/*$("#gllc").chosen({
    				maxHeight : 200
    			});*/
            }
        });
        
        $.ajax({
        	url : '/common/dict/list/jb_type',
            success : function(data) {
            	var html = "";
    			//加载数据
    			for (var i = 0; i < data.length; i++) {
    				html += '<option value="' + data[i].value + '">' + data[i].name + '</option>'
    			}
    			$("#jblx").append(html);
            }
        });
        
        $.ajax({
        	url : '/common/dict/list/jjqk_type',
            success : function(data) {
            	var html = "";
    			//加载数据
    			for (var i = 0; i < data.length; i++) {
    				html += '<label class="radio-inline"> <input name="jjqk" type="radio" value="'+data[i].value+'" id="jjqk'+i+'">'+data[i].name+'</input></label>'
    			}
    	        $("#jjqk_type").append(html);
    			$("#jjqk0").attr("checked","checked");;
            }
        });

        
     }

}

$("#submit_button").click(function () {
   // if($("#add_form").valid()){
    	console.log($('#add_form').serialize());
		if($("#jblx").val() ==""){
			layer.alert('加班类型未选择!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}
		
		if($("#shryMc").val() ==""){
			layer.alert('加班审核人员不能为空!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}
		if($("#jbsy").val() ==""){
			layer.alert('加班事由不能为空!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}
		
		if($("#kssj").val() ==""){
			layer.alert('加班开始时间不能为空!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}
		
		if($("#jssj").val() ==""){
			layer.alert('加班结束时间不能为空!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}
		
		if($("#jssj").val() <$("#kssj").val()){
			layer.alert('加班结束时间必须比开始时间晚!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}

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
    				parent.reLoad();
    				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
    				parent.layer.close(index);
                } else {
                    parent.layer.alert(data.msg)
                }
            }
        });
   // }
});

var openUser = function(){
	layer.open({
		type:2,
		title:"选择人员",
		area : [ '300px', '450px' ],
		content:"/sys/user/treeView"
	})
}

function loadUser(userIds,userNames){
	$("#shryId").val(userIds);
	$("#shryMc").val(userNames);
}