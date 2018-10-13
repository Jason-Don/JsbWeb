$("#kssj").val(laydate.now(0, "YYYY-MM-DD hh:mm"));
$("#jssj").val(laydate.now(7, "YYYY-MM-DD hh:mm"));

$('#kssj').mobiscroll().datetime({
	theme:'ios',
	mode:'scroller',
	display:'bottom',
	lang:'zh',
	dateFormat:'yy-mm-dd',//格式必须这样写，否则时间轮不按照文本框时间显示
	minDate:new Date(2000,3,10,0,0),
	maxDate:new Date(2030,7,30,23,59),
	stepMinute:1
});
$('#jssj').mobiscroll().datetime({
	theme:'ios',
	mode:'scroller',
	display:'bottom',
	lang:'zh',
	dateFormat:'yy-mm-dd',
	minDate:new Date(2000,3,10,9,22),
	maxDate:new Date(2030,7,30,23,59),
	stepMinute:1
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
	$("#shryId").val(userIds);
	$("#shryMc").val(userNames);
}
// 返回
function go_back() {
	window.history.go(-1);
/*	location.reload();*/
	//window.location = "/app/over_time";
}
/**
 * 初始化页面 获得：1、用户信息；2、任务来源；
 */
function init() {
	$.ajax({
		url : '/utils/getCurrUserInfo',
		method : 'get',
		dataType : 'json',
		success : function(data) {
			// currUserInfo = data;
			$("#sqrId").attr("value", data.userId);
			$("#sqrMc").attr("value", data.name);
			$("#szbmId").attr("value", data.deptId);
			$("#szbmMc").attr("value", data.deptName);
		}
	});

	$.ajax({
		url : '/activiti/workflow/list?yxbz=Y&rwzt=ing',
		success : function(data) {
			var html = "";
			// 加载数据
			/*for (var i = 0; i < data.total; i++) {
				html += '<option value="' + data.rows[i].id + '">'
						+ data.rows[i].taskName + '</option>'
			}
			$("#glgzlc").append(html);*/
			var jsonArray = [];
			 var data_length = data.total;
			for (var i = 0; i < data_length; i++) {
				var obj = {};
				obj.key = data.rows[i].taskName;
				obj.value = data.rows[i].id;
				jsonArray.push(obj)
			}
//			jsonArray = [];
			if(jsonArray && jsonArray.length == 0){
				$('#glgzlcSelect').parents('.msg_div').addClass('hide_div');
			}else{
				$('#glgzlcSelect').attr('placeholder','请选择关联的流程');
				setSuggestData('glgzlcSelect','glgzlc',jsonArray);
			}
		}
	});

	$.ajax({
		url : '/common/dict/list/jb_type',
		success : function(data) {
			//var html = "";
			// 加载数据
			var jsonArray = [];
			var data_length = data.length;
			for (var i = 0; i < data_length; i++) {
				/*html += '<option value="' + data[i].value + '">' + data[i].name
						+ '</option>'*/
				var obj = {};
				obj.key = data[i].name;
				obj.value = data[i].value;
				jsonArray.push(obj)
			}
			if(jsonArray && jsonArray.length == 0){
				$('#jblxSelect').parents('.msg_div').addClass('hide_div');
			}else{
				$('#jblxSelect').attr('placeholder','请选择加班类型');
				setSuggestData('jblxSelect','jblx',jsonArray);
			}
		}
	});

	$.ajax({
		url : '/common/dict/list/jjqk_type',
				success : function(data) {
					var html = "";
					// 加载数据
					var data_length = data.length;
					for (var i = 0; i < data_length; i++) {
						html += '<label> <input onclick="isChecked()" name="jjqk" type="radio" value="'
								+ data[i].value
								+ '" id="jjqk'
								+ i
								+ '">'
								+ data[i].name + '</input></label>&nbsp'
					}
					$("#jjqk_type").append(html);
					///$("#jjqk0").attr("checked", "checked");
				}
			});
}
var jjqkChecked = '';
function isChecked(){
	jjqkChecked = 'Y';
}
$("#submit_button").click(function () {
	   // if($("#add_form").valid()){
	    	//console.log($('#add_form').serialize());
			if( jjqkChecked == ""){
				layer.msg('紧急情况未选择!');
				return false;
			}
			if($("#jblx").val() ==""){
				layer.msg('加班类型未选择!');
				return false;
			}
			
			if($("#shryMc").val() ==""){
				layer.msg('加班审核人员不能为空!');
				return false;
			}
			if($("#jbsy").val() ==""){
				layer.msg('加班事由不能为空!');
				return false;
			}
			
			if($("#kssj").val() ==""){
				layer.msg('加班开始时间不能为空!');
				return false;
			}
			
			if($("#jssj").val() ==""){
				layer.msg('加班结束时间不能为空!');
				return false;
			}
			
			if($("#jssj").val() <$("#kssj").val()){
				layer.msg('加班结束时间必须比开始时间晚!');
				return false;
			}
			
//			if($("#glgzlc").val() ==""){
//				layer.msg('未关联工作流程!');
//				return false;
//			}
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
	                	layer.msg("加班创建成功！");
	                	//layer.confirm("提交成功!",{btn:['确定']},function(){go_back()});
	                    go_back();
	    				//parent.reLoad();
	    				//var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
	    				//parent.layer.close(index);
	                } else {
	                    layer.msg(data.msg)
	                }
	            }
	        });
	   // }
	});

$().ready(function() {
	init();
});