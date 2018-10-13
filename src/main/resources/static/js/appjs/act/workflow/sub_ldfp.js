$().ready(function() {
	$('#id').attr("value", parent.id);
	$('#taskId').attr("value", parent.taskId);// 通过父级页面的变量名取到js中定义的变量
	if (parent.rwwcsjLabel.value != "尚未选择")
		$('#rwwcsj').attr("value", parent.rwwcsjLabel.value);// 通过父级页面的id取到节点的值
})
var openUser_1 = function() {
	layer.open({
		type : 2,
		title : "选择人员",
		area : [ '300px', '450px' ],
		content : "/sys/user/tree_single"
	})
}

function loadUser_1(userIds, userNames) {
	$("#rwqtr").val(userIds);
	$("#rwqtrMc").val(userNames);
}

var openUser = function() {
	layer.open({
		type : 2,
		title : "选择人员",
		area : [ '300px', '450px' ],
		content : "/sys/user/treeView"
	})
}

function loadUser(userIds, userNames) {
	$("#cbry").val(userIds);
	$("#cbryMc").val(userNames);
}
function submit_task(e) {
	if (lx == 'JB') {
		if ($("#rwqtr").val() == "") {
			layer.alert('未选择任务牵头人!', {
				icon : 2,
				skin : 'layer-ext-moon'
			});
			return false;
		}
	}
	if (lx == 'FB') {
		if ($("#cbry").val() == "") {
			layer.alert('未选择承办人!', {
				icon : 2,
				skin : 'layer-ext-moon'
			});
			return false;
		}
		$("#rwqtr").val(null);// 领导指派阶段，选择分办就没有任务牵头人
		$("#rwqtrMc").val(null);
	}
	if ($("#comment").val() == "") {
		layer.alert('尚未填写反馈说明!', {
			icon : 2,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	if ($("#rwwcsj").val() == "") {
		layer.alert('任务结束时间不能为空!', {
			icon : 2,
			skin : 'layer-ext-moon'
		});
		return false;
	}
	var wcsj=new Date($("#rwwcsj").val());
	var kssj=new Date(timeToGMT(parent.rwkssj.value));
	if($("#rwwcsj").val() !=""&&wcsj<kssj){
		layer.alert('任务结束时间必须比开始时间晚!',{icon:2,skin:'layer-ext-moon'});
		return false;
	}
	var data = $('#add_form').serialize();
	data += "&taskPass=1"
	$.ajax({
		cache : true,
		type : "POST",
		url : "/act/workflow/fpOk",
		data : data,
		async : false,
		error : function(request) {
			laryer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.change_task_type(1);
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);
			} else {
				parent.layer.alert(data.msg)
			}
		}
	});
}
var lx = "JB";// 默认
$("input:radio[name=rwbllx]").change(function() {
	// console.log($(this).val());
	lx = $(this).val();
	if ($(this).val() == "JB") {
		$(".FB").addClass("hide_div");
		$(".JB").removeClass("hide_div");
	} else {
		$(".JB").addClass("hide_div");
		$(".FB").removeClass("hide_div");
	}
});
//以下函数用以修正时差
function timeToGMT(strDate){
	var dateStr=strDate.split(" ");
	var strGMT=dateStr[0]+" "+dateStr[1]+" "+dateStr[2]+" "+dateStr[5]+" "+dateStr[3]+" GMT+0800";
	var datetime=new Date(Date.parse(strGMT));
	return datetime
}