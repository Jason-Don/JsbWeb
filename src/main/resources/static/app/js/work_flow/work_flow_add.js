$(function() {
	$.ajax({
        url : '/utils/getCurrUserInfo',
        method : 'get',
        dataType : 'json',
        success : function(data) {
        	$("#cjryMc").attr("value",data.name);
        	$("#cjryId").attr("value",data.userId);
        }
    });
	$("#startTime").val(laydate.now(0, "YYYY-MM-DD hh:mm"));
	$("#endTime").val(laydate.now(7, "YYYY-MM-DD hh:mm"));
	$('#startTime').mobiscroll().datetime({
		theme:'ios',
		mode:'scroller',
		display:'bottom',
		lang:'zh',
		dateFormat:"yy-mm-dd",
		minDate:new Date(2000,3,10,0,0),
		maxDate:new Date(2030,7,30,23,59),
		stepMinute:1
	});
	$('#endTime').mobiscroll().datetime({
		theme:'ios',
		mode:'scroller',
		display:'bottom',
		lang:'zh',
		dateFormat:'yy-mm-dd',
		minDate:new Date(2000,3,10,9,22),
		maxDate:new Date(2030,7,30,23,59),
		stepMinute:1
	});
	
	getOptions();
});
var openUser = function() {
	layer.open({
		type : 2,
		title : "选择人员",
		area : [ '300px', '400px' ],
		content : "/app/user/userTree_single"
	})
}
function loadUser_1(userIds, userNames) {
	$("#rwzpry").val(userIds);
	$("#rwzpryMc").val(userNames);
}
// 返回
function go_back() {
	window.history.go(-1);
}

/*var fileInputField = document.getElementById("file");
fileInputField.addEventListener('change',function(evt){
	var reader =  new FileReader();
	reader.onload = function(evt){
		alert("aaa");
	}
	reader.readAsText(evt.target.files[0],'ISO-8859-7');
});*/

// 添加一个工作流程
function saveAndStart() {
	var formData = new FormData($("#add_form")[0]);
	if ($("#rwly").val() == "") {
		layer.msg('任务来源未选择!');
		return false;
	}
	if ($("#taskName").val() == "") {
		layer.msg('任务名称不能为空!');
		return false;
	}
	if ($("#rwzpryMc").val() == "") {
		layer.msg('任务指派人不能为空!');
		return false;
	}
	if ($("#rwnr").val() == "") {
		layer.msg('任务内容不能为空!');
		return false;
	}
	if ($("#rwkssj").val() == "") {
		layer.msg('任务开始时间不能为空!');
		return false;
	}
	if ($("#rwwcsj").val() != ""&&$("#rwwcsj").val() < $("#rwkssj").val()) {
		layer.msg('任务结束时间必须比开始时间晚!');
		return false;
	}
	$.ajax({
		cache : true,
		type : "POST",
		url : "/act/workflow/saveAndStart",
		data : formData,
		async : false,
		contentType : false,// FormData 必须
		processData : false,// FormData 必须
		cache : false, // 上传文件不需要缓存
		error : function(request) {
			laryer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				layer.msg("创建成功");
				$("#saveAndStart_button").hide();
				$("#success_message").show();
				go_back();
			} else {
				parent.layer.msg(data.msg);
			}
		}
	});
}
var json_rwlylist = [];
function getOptions(){
    $.ajax({
    	url : '/common/dict/list/rwly?sortBy=sort',
        success : function(data) {
			for (var i = 0; i < data.length; i++) {
				if(data[i].value=="QT"){
					continue;
				}
				var rwlydict={"rwly":data[i].name,"rwly_id":data[i].value};
				json_rwlylist.push(rwlydict);
			}
        }
    });

	$("#rwlyDisplay").bsSuggest({
		data:{
			"value":json_rwlylist
		},
		idField:"rwly_id",//设置作为id的字段
		keyField:"rwly",//设置作为输入框内容的字段
		effectiveFields:["rwly"]//设置显示的有效字段，其他的不予显示
   	}).on("onDataRequestSuccess",function(e,result){
		console.log(result);
	}).on("onSetSelectValue",function(e,keyword){
		$("#rwly").val($("#rwlyDisplay").attr("data-id"));
		//alert($("#rwly").val());
		console.log(keyword);
	}).on("onUnsetSelectValue",function(e){
		$("#rwly").val("");
		for(var j=0;j<json_rwlylist.length;j++)
		{
			if(json_rwlylist[j]["rwly"]==$("#rwlyDisplay").val())
				$("#rwly").val(json_rwlylist[j]["rwly_id"]);
		}
		if($("#rwly").val()=='')
			$("#rwly").val($("#rwlyDisplay").val());
		//alert($("#rwly").val());
		console.log(e);
	});
}

function openfilechooser(){
	$("#file").click();
}
function setfname(){
	var fname=$("#file").val().substring($("#file").val().lastIndexOf("\\")+1);
/*	console.log($("#file").val());
	var fname=$("#file").val();*/
	$("#fname").html(fname);
}
