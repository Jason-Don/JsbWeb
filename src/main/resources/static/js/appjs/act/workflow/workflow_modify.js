/**
 * @author:zhangf
 * @description:工作流
 * @date:2018/6/14
 */
var rwly =null;
var fileID = "";
$().ready(function() {
	rwly = $('#rwlyOld').val()
	fileID = $("#fileId").val();
	Workflow.init();
	 if(!$('#rwkssjOld').val()){
		$('#rwkssj').attr("value","尚未选择");
	}else{
		console.log($('#rwkssjOld').val());
		var rwkssj =dateToGMT($('#rwkssjOld').val());
		$('#rwkssj').attr("value", rwkssj);
	}
    if(!$('#rwwcsjOld').val()){
    	$('#rwwcsj').val('尚未选择');
    }else{
    	var rwwcsj = dateToGMT($('#rwwcsjOld').val());
    	$('#rwwcsj').attr("value",rwwcsj);
    }  
});

Workflow = {
    /**
     * 初始化页面
     */
     init :function(){
        $.ajax({
        	url : '/common/dict/list/rwly?sortBy=sort',
			async:false,
            success : function(data) {
            	var html = "";
    			//加载数据
            	var tj=0;
    			for (var i = 0; i < data.length; i++) {
    				if(data[i].value!=rwly)
    					html += '<option value="' + data[i].value + '">' + data[i].name + '</option>';
    				else		
    				{ 
    					tj++;
    					html += '<option value="' + data[i].value + '" selected="selected">' + data[i].name + '</option>';
    				}
    			}
    			if(tj==0)
    			{
    				html += '<option value='+rwly+' selected="selected">' + rwly + '</option>';
    			}
    			$("#rwly").append(html);
            }
        });
     },


    modifySaveAndStart : function(){
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
		var kssj=new Date($("#rwkssj").val());
		var wcsj=new Date($("#rwwcsj").val());
		if($("#rwwcsj").val() !=""&&wcsj<kssj){
			layer.alert('任务结束时间必须比开始时间晚!',{icon:2,skin:'layer-ext-moon'});
			return false;
		}
                 
         $.ajax({
             cache : true,
             type : "POST",
             url :"/act/workflow/modifySaveAndStart",
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

function downloadFile(){
    location.href = "/common/sysFile/downloadFile/"+fileID;
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