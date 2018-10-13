var rwly = null;
var fileID = "";
$(function() {
		var rwkssj =dateToGMT($('#rwkssjOld').val());
		$('#startTime').attr("value", rwkssj);
	    if(!$('#rwwcsjOld').val()){
	    	$('#endTime').val('尚未选择');
	    }else{
	    	var rwwcsj = dateToGMT($('#rwwcsjOld').val());
	    	$('#endTime').attr("value",rwwcsj);
	    }  
//	$("#startTime").val(laydate.now(0, "YYYY-MM-DD hh:mm"));
//	$("#endTime").val(laydate.now(7, "YYYY-MM-DD hh:mm"));
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
		var rwly = $('#rwly').val();
		$.ajax({
			url : '/common/dict/list/rwly?sortBy=sort',
			success : function(data) {
				//加载数据
				for (var i = 0; i < data.length; i++) {
					if (data[i].value == rwly) {
						$("#rwlyDisplay").val(data[i].name);
						break;
					}
				}
				if ($("#rwlyDisplay").html() == "")
					$("#rwlyDisplay").html(rwly);
			}
		});
});


Workflow = {
	/**
	 * 初始化页面 获得：1、用户信息；2、任务来源；
	 */
	init : function() {
		$.ajax({
			url : '/common/dict/list/rwly?sortBy=sort',
			async : false,
			success : function(data) {
				var html = "";
				// 加载数据
				var tj = 0;
				for (var i = 0; i < data.length; i++) {
					if (data[i].value != rwly)
						html += '<option value="' + data[i].value + '">'
								+ data[i].name + '</option>';
					else {
						tj++;
						html += '<option value="' + data[i].value
								+ '" selected="selected">' + data[i].name
								+ '</option>';
					}
				}
				if (tj == 0) {
					html += '<option value=' + rwly + ' selected="selected">'
							+ rwly + '</option>';
				}
				$("#rwly").append(html);
			}
		});
	},

	modifySaveAndStart : function() {
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

		if ($("#startTime").val() == "") {
			layer.msg('任务开始时间不能为空!');
			return false;
		}
		if ($("#startTime").val() > $("#endTime").val()){
			layer.msg('任务结束时间必须比开始时间晚!');
			return false;
		}

		$.ajax({
			cache : true,
			type : "POST",
			url : "/act/workflow/modifySaveAndStart",
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
					layer.msg("保存成功");
					$(".submit_div",window.top.document).hide();
	            	$("#success_message",window.top.document).html("任务已发起！");
	            	go_back();
				} else {
					layer.msg(data.msg)
				}
			}
		});
	}
}

var openUser_1 = function() {
	layer.open({
		type : 2,
		title : "选择人员",
		area : [ '300px', '450px' ],
		content : "/sys/user/tree_single"
	})
}

function loadUser_1(userIds, userNames) {
	$("#rwzpry").val(userIds);
	$("#rwzpryMc").val(userNames);
}

function downloadFile() {
	location.href = "/common/sysFile/downloadFile/" + fileID;
}

function create_rwly() {
	if ($("#rwly").val() == "QT") {
		layer.prompt({
			title : '请输入任务来源',
			formType : 3
		}, function(val, index) {
			var is_exit = false;
			for (var i = 0; i < $("#rwly").children("option").length; i++) {
				if ($("#rwly").children("option").eq(i).text().trim() == val) {
					layer.msg('任务来源选项已存在,已选择!');
					is_exit = true;
					$("#rwly").val($("#rwly").children("option").eq(i).val());
					break;
				}
			}
			if (!is_exit) {
				var html = '<option value="' + val + '">' + val + '</option>';
				$("#rwly").append(html);
				$("#rwly").val(val);
			}
			layer.close(index);
		});
	}
}

function go_back() {
	window.history.go(-1);
}

var json_rwlylist = [];
function getOptions() {
	$.ajax({
		url : '/common/dict/list/rwly?sortBy=sort',
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].value == "QT") {
					continue;
				}
				var rwlydict = {
					"rwly" : data[i].name,
					"rwly_id" : data[i].value
				};
				//alert(data[i].name);
				json_rwlylist.push(rwlydict);
			}
		}
	});

	$("#rwlyDisplay").bsSuggest({
		data : {
			"value" : json_rwlylist
		},
		idField : "rwly_id",//设置作为id的字段
		keyField : "rwly",//设置作为输入框内容的字段
		effectiveFields : [ "rwly" ]
	//设置显示的有效字段，其他的不予显示
	}).on("onDataRequestSuccess", function(e, result) {
		console.log(result);
	}).on("onSetSelectValue", function(e, keyword) {
		$("#rwly").val($("#rwlyDisplay").attr("data-id"));
		//alert($("#rwly").val());
		console.log(keyword);
	}).on("onUnsetSelectValue", function(e) {
		$("#rwly").val("");
		for (var j = 0; j < json_rwlylist.length; j++) {
			if (json_rwlylist[j]["rwly"] == $("#rwlyDisplay").val())
				$("#rwly").val(json_rwlylist[j]["rwly_id"]);
		}
		if ($("#rwly").val() == '')
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
	$("#fname").html(fname);
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