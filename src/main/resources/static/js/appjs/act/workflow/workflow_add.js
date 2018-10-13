/**
 * @author:zhangf
 * @description:工作流
 * @date:2018/6/14
 */
$().ready(function() {
	Workflow.init();
});

Workflow = {
    /**
     * 初始化页面
     */
     init :function(){
        $.ajax({
            url : '/utils/getCurrUserInfo',
            method : 'get',
            dataType : 'json',
            success : function(data) {
            	$("#cjryMc").attr("value",data.name);
            	$("#cjryId").attr("value",data.userId);
            }
        });
        
        $.ajax({
        	url : '/common/dict/list/rwly?sortBy=sort',
            success : function(data) {
            	var html = "";
    			//加载数据
    			for (var i = 0; i < data.length; i++) {
    					html += '<option value="' + data[i].value + '">' + data[i].name + '</option>';
    			}
    			$("#rwly").append(html);
            }
        });
     },
     
     
     saveAndStart : function(){
         var formData = new FormData($("#add_form")[0]);
         
 		if($("#rwly").val() ==""){
			layer.alert('任务来源未选择!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}
		
		if($("#taskName").val() ==""){
			layer.alert('任务名称不能为空!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}
		
		if($("#rwzpryMc").val() ==""){
			layer.alert('任务指派人不能为空!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}
		
		if($("#rwnr").val() ==""){
			layer.alert('任务内容不能为空!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}
		
		if($("#rwkssj").val() ==""){
			layer.alert('任务开始时间不能为空!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}
		
	/*	if($("#rwwcsj").val() ==""){
			layer.alert('任务结束时间不能为空!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}*/
		
		if($("#rwwcsj").val() !=""&&$("#rwwcsj").val() <$("#rwkssj").val()){
			layer.alert('任务结束时间必须比开始时间晚!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}
         
         
         $.ajax({
             cache : true,
             type : "POST",
             url :"/act/workflow/saveAndStart",
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
                     parent.layer.msg("保存成功");
      				parent.reLoad();
    				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
    				parent.layer.close(index);
                 } else {
                     parent.layer.alert(data.msg)
                 }
             }
         });
     }
}

var openUser_1 = function(){
	layer.open({
		type:2,
		title:"选择人员",
		area : [ '300px', '450px' ],
		content:"/sys/user/tree_single"
	})
}

function loadUser_1(userIds,userNames){
	$("#rwzpry").val(userIds);
	$("#rwzpryMc").val(userNames);
}
function create_rwly(){
	if($("#rwly").val()=="QT"){
		layer.prompt(
			{title:'请输入任务来源',formType:3},
			function(val, index){
				var is_exit = false;
				for(var i=0;i<$("#rwly").children("option").length;i++){
					if($("#rwly").children("option").eq(i).text().trim() == val){
						layer.alert('任务来源选项已存在,已选择!',{icon:2,skin:'layer-ext-moon'});
						is_exit = true;
						$("#rwly").val($("#rwly").children("option").eq(i).val());
						break;
					}
				}
				if(!is_exit){
					var html = '<option value="' + val + '">' + val + '</option>';
					$("#rwly").append(html);
					$("#rwly").val(val);
				}
				layer.close(index);
			}
		);
	}
}
