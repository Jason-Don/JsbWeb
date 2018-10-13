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
	Workflow_fp.init();
	id = $("#id").val();
	taskId = $("#taskId").val();
	fileID = $("#files").val();
	if(!$('#rwwcsj').val())
	{
		$('#rwwcsjLabel').attr("value","尚未选择");
	}else{
		var rwwcsj=dateToGMT($('#rwwcsj').val());
		$('#rwwcsjLabel').attr("value",rwwcsj);
	}
	var rwkssj = dateToGMT($("#rwkssj").val());
	$('#rwkssjLabel').attr("value",rwkssj);
	
	$('#JD').attr("checked","checked");
	var nycd = $('#nycd').val()
	$('#'+nycd).attr("checked","checked");
	
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
        $.ajax({
            url : '/utils/getCurrUserInfo',
            method : 'get',
            dataType : 'json',
            success : function(data) {
            	//currUserInfo = data;
            	$("#rwzpqsry").attr("value",data.userId);
            	$("#rwzpqsryMc").attr("value",data.name);
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
     
	ok : function(){
		layer.open({
   	   		type : 2,
   	   		title : '任务分配信息',
   	   		maxmin : true,
   	        shadeClose : false,
   	        area : [ '800px', '500px' ],
   	        content : '../workflow_assigning_task',
		});

     },

    reject : function(){
    	layer.open({
   	   		type : 2,
   	   		title : '任务退回',
   	   		maxmin : true,
   	        shadeClose : false,
   	        area : [ '600px', '250px' ],
   	        content : '../workflow_return',
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
//用于把数据库里面CST(USA)标准的时间转换成GMT+0800标准时间
function dateToGMT(sqlDate){
	var dateStr=sqlDate.split(" ");
	var strGMT=dateStr[0]+" "+dateStr[1]+" "+dateStr[2]+" "+dateStr[5]+" "+dateStr[3]+" GMT+0800";
	var datetime=new Date(Date.parse(strGMT));
	var year =datetime.getFullYear();
	var month = (datetime.getMonth()+1)>9?(datetime.getMonth()+1):"0"+(datetime.getMonth()+1);
	var day = datetime.getDate()>9?datetime.getDate():"0"+datetime.getDate();
	var hour=datetime.getHours()>9?datetime.getHours():"0"+datetime.getHours();
	var min=datetime.getMinutes()>9?datetime.getMinutes():"0"+datetime.getMinutes();
	var datetime_str = year+"-"+month+"-"+day+" "+hour+":"+min;
	return datetime_str
}