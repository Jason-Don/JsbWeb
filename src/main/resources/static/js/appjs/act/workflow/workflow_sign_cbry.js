/**
 * @author:zhangf
 * @description:工作流 任务签收
 * @date:2018/6/14
 */
var rwly = null;
var fileID = null;
$().ready(function() {
	Workflow_sign.init();
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

});
function downloadFile(){
	location.href = "/common/sysFile/downloadFile/"+fileID;
}
Workflow_sign = {

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
            	/*var newZzblry = $("#cbry").val()+data.userId+',';
            	$("#zzblry").attr("value",newZzblry);
            	var newZzblryMc = $("#cbryMc").val()+data.name+',';
            	$("#zzblryMc").attr("value",newZzblryMc);*/
            	
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
     
     sign : function(){
    	 var data = $('#add_form').serialize();
    	 data += '&taskPass=1'
    	 
         $.ajax({
             cache : true,
             type : "POST",
             url :"/act/workflow/signCbry",
             data : data,
             async : false,
             error : function(request) {
                 laryer.alert("Connection error");
             },
             success : function(data) {
                 if (data.code == 0) {
                     parent.layer.msg("操作成功");
     				parent.reLoad();
    				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
    				parent.layer.close(index);
                 } else {
                     parent.layer.alert(data.msg)
                 }
             }
         });
     },
     
     reject : function(){
    	 var data = $('#add_form').serialize();
    	 data += '&taskPass=0'

         $.ajax({
             cache : true,
             type : "POST",
             url :"/act/workflow/signCbry",
             data : data,
             async : false,
             error : function(request) {
                 laryer.alert("Connection error");
             },
             success : function(data) {
                 if (data.code == 0) {
                     parent.layer.msg("操作成功");
     				parent.reLoad();
    				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
    				parent.layer.close(index);
                 } else {
                     parent.layer.alert(data.msg)
                 }
             }
         });
     },
}

var openUser = function(){
	layer.open({
		type:2,
		title:"选择人员",
		area : [ '300px', '450px' ],
		content:"/sys/user/treeView"
	})
}

function loadUser(userIds,userNames){
	$("#rwzpry").val(userIds);
	$("#rwzpryNames").val(userNames);
}