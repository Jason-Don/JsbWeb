var result = [];
var userId=0;
function init(){
    $.ajax({
        url : '/app/over_time/list',
        method : 'get',
        cache: false,
        dataType : 'json',
        async : false,
        success : function(data) {
        	result = data;
        }
    });
    $.ajax({
		url : '/utils/getCurrUserInfo',
		method : 'get',
		dataType : 'json',
		cache : false,
		async : false,
		success : function(data) {
			userId = data.userId;
			curUsrName = data.name;
		}
	});
}
function check_tab() {
	$('#exampleTable').bootstrapTable('load', result);
	var down_edit = document.getElementsByClassName("touch_down");
	for(var i=0;i<down_edit.length;i++){
		down_edit[i].addEventListener("touchstart",function(ev){
			down(this,ev);
		},false);
	}
	var up_edit = document.getElementsByClassName("touch_edit");
	for(var i=0;i<up_edit.length;i++){
		up_edit[i].addEventListener("touchend",function(ev){
			up(this,ev);
		},false);
	}
}


$(function() {
	$('#exampleTable').bootstrapTable({
		iconSize : 'outline',
		queryParams : 'queryParams',
		icons : {
			refresh : 'glyphicon-repeat',
			toggle : 'glyphicon-list-alt',
			columns : 'glyphicon-list'
		}
	});
	init();
	check_tab();
});
// 删除加班信息
function batchRemove() {
	var rows = $("#exampleTable").bootstrapTable('getSelections');
	if (rows == [] || rows == null || rows == "" || rows.length == 0) {
		swal({
			title : '',
			text : '请至少选择一条要删除的记录!',
			type : 'warning'
		});
	} else {
		swal({
			title : "",
			text : "您确定要删除选中的记录吗?",
			type : 'warning',
			showCancelButton : true,
			cancelButtonText : '取消',
			closeOnConfirm : false,
			confirmButtonText : '确定',
			confirmButtonColor : '#DD6B55'
		}, function() {
			var ids = new Array();
			// 遍历所有选择的行数据，取每条数据对应的ID
			$.each(rows, function(i, row) {
				ids[i] = row['id'];
			});
			$.ajax({
				type : 'POST',
				data : {
					"ids" : ids
				},
				url : '/activiti/overtime/batchRemove',
				success : function(r) {
					if (r.code == 0) {
						swal("删除成功!", "", "success");
						init();
						check_tab();
					} else {
						swal("删除失败!", "", "error");
					}
				}
			});
			// 发送删除请求

		});
	}
}
// 添加加班信息
function add() {
	window.location = "/app/over_time/over_time_add";
}

function status(value,row,index) {
    if(row.status=='0'){
    	return '未审核';
    }
    if(row.status=='1'){
    	return '审核通过';
    }
    if(row.status=='2'){
    	return '审核不通过';
    }
}

// 跟踪流程
function flow_img(value,row,index) {
	return '<div onclick="follow_flow(\''+ row.id+ '\');" class="tab_edit_div">流程图</div>';
}
// 查看详情操作
function operate(value, row, index) {
	return '<div onclick="check_detail(\''+ row.id+ '\');" class="tab_edit_div">详情</div>';
}
// 查看详细_跳转页面
function check_detail(businessKey) {
	window.location = "/app/over_time/over_time_detail/"+businessKey;
}
// 序号
function index(value, row, index) {
	return index + 1;
}
// 返回
function go_back() {
	window.location = "/app/index";
}
// 打开流程图
/*function follow_flow(businessKey) {
	window.location = "/activiti/task/trace/photo/"+businessKey;
}*/
function follow_flow(businessKey){
	window.location = "/app/workflow/work_flow_img?businessKey="+businessKey;
	event.stopPropagation();
}
//表格操作
function operate_td(value, row, index){
	var status_str;
    var tpye_div_class = 'passed';
	if(row.status=='0'){
		status_str = '未审核';
		tpye_div_class = 'no_pass'
    }
    if(row.status=='1'){
    	status_str = '审核通过';
		tpye_div_class = 'passed'
    }
    if(row.status=='2'){
    	status_str = '审核不通过';
		tpye_div_class = 'pass_no'
    }
    var div = 
		'<div class="td_div">'+
		'	<div class="operate_div touch_down">'+
		'		<div class="msg_div">'+
		'			<div class="hide_div checkbox_div">'+
		'				<input class="is_input" type="checkbox">'+
		'			</div>'+
		'			<div>'+
		'				<div class="msg_type_1">'+row.jbsy+'</div>'+
		'				<div class="msg_title">申请发起人：'+row.sqrMc+'</div>'+
		'				<div class="msg_title">发起时间：'+row.sqsj+'</div>'+
		'				<div class="msg_type_2">审核人：'+row.shryMc+'</div>'+
		'				<span class="hide_div id_span">'+row.id+'</span>'+
		'			</div>'+
		'			<div class="'+tpye_div_class+'">'+status_str+'</div>'+
		'		</div>'+
		'		<div class="edit_div">'+
		'		</div>'+
		'	</div>'+
		'	<div class="operate_btn_div"  onclick="follow_flow(\''+ row.id+ '\');"><img src="images/flow_flow.png"/>流程图</div>';
    if(userId==1 || row.status == '0'){
    	div += 
    		'	<div class="operate_btn_div operate_btn_div_0" onclick="delete_one(\''+ row.id+ '\');"><img src="images/error.png"/>删除</div>'+
    		'</div>';
    }else{
    	div += '</div>';
    }
	return div;
}
var ele,mouse_x,mouse_y,timeStart,timeEnd,time;
var is_down = false,is_hode = false,is_check_all = false,is_check_no = true;
//鼠标下按事件
function down(e){
//	if(!is_down){
//		is_down = true;
//		mouse_x = event.pageX;
//		mouse_y = event.pageY;
//		timeStart = getTime_mouse();
//		ele = e;
//	}
	is_down = true;
	mouse_x = event.touches[0].pageX;
	mouse_y = event.touches[0].pageY;
	timeStart = getTime_mouse();
	ele = e;
}
//鼠标下按后松开事件
function up(e,ev){
	if($(ele).hasClass('is_input')){
		is_down = false;
		return;
	}
	var new_mouse_x = event.changedTouches[0].pageX;
	var new_mouse_y = event.changedTouches[0].pageY; 
	if(!is_down){
		return;
	}else if(is_hode){
		//如果是批量操作时,上下滑动距离较大则默认为移动页面
		if(Math.abs(new_mouse_y - mouse_y) < 10){
			$(ele).find('input').click();
			is_check_all = true;
			for(var i=0;i<$(".checkbox_div").children('input').length;i++){
				if(!$(".checkbox_div").children('input').eq(i)[0].checked){
					is_check_all = false;
					break;
				}
			}
			if(is_check_all){
				$('#check_all_span').html('全不选');
			}else{
				$('#check_all_span').html('全选');
			}
			is_down = false;
			is_check_no = true;
			for(var i=0;i<$(".checkbox_div").children('input').length;i++){
				if($(".checkbox_div").children('input').eq(i)[0].checked){
					is_check_no = false;
					break;
				}
			}
			if(is_check_no){
				$('#delete_more').addClass('hide_div');
			}else{
				$('#delete_more').removeClass('hide_div');
			}
		}
		return;
	}
	timeEnd = getTime_mouse();
//	var new_mouse_x = event.pageX;
//	var new_mouse_y = event.pageY; 
	if(is_down){
		if(Math.abs(new_mouse_y - mouse_y) > 10){
//			console.log("上下移动了");
		}else if(new_mouse_x - mouse_x > 3){
//			console.log("右移动了");
			$(ele).parents('tr').find('.delete_div').addClass('hide_div');
		}else if(new_mouse_x - mouse_x < -3){
//			console.log("左移动了");
			$(ele).parents('tr').find('.delete_div').removeClass('hide_div');
			$(ele).parents('tr').siblings().find('.delete_div').addClass('hide_div');
		}else{
			if(timeEnd - timeStart > 500 &&userId ==1){
//				console.log("按住不放");
				$('#delete_more').removeClass('hide_div');
				$(".checkbox_div").removeClass('hide_div');
				$(ele).parents('tr').find('.delete_div').addClass('hide_div');
				$(ele).parents('tr').find('input')[0].checked = true;
				$(ele).parents('tr').siblings().find('.delete_div').addClass('hide_div');
				is_hode = true;
				$(' .check_more_none').addClass('hide_div');
				$(' .check_more').removeClass('hide_div');
			}else{
//				console.log("跳转");
				var businessKey = $(ele).parents('tr').find('.id_span').html();
				window.location = "/app/over_time/over_time_detail/"+businessKey;
			}
		}
	}
	is_down = false;
}
//全选或者全不选
function check_all(e){
	if(is_check_all){
		$(".checkbox_div").children('input').each(function (){
			$(this)[0].checked = false;
		});
		$(e).html('全选');
		$('#delete_more').addClass('hide_div');
		is_check_all = false;
	}else{
		$(".checkbox_div").children('input').each(function (){
			$(this)[0].checked = true;
		});
		$(e).html('全不选');
		$('#delete_more').removeClass('hide_div');
		is_check_all = true;
	}
}
//取消按住事件
function cancle_check(){
	$(' .check_more').addClass('hide_div');
	$(' .check_more_none').removeClass('hide_div');
	$(".checkbox_div").addClass('hide_div');
//	$('#exampleTable').find('input').each(function (){
//		$(this)[0].checked = false;
//	});
	$('.all_center').find('input.is_input').each(function (){
		$(this)[0].checked = false;
	});
	$('#check_all_span').html('全选');
	is_check_all = false;
	$('#delete_more').addClass('hide_div');
	is_hode = false;
}
//获取当前时间
function getTime_mouse(){
	var now_time = new Date();
	return now_time.getTime();
}
//删除多个加班信息
function delete_more() {
	var ids = [];
	$('#exampleTable').find('input').each(function (){
		if($(this)[0].checked){
			ids.push($(this).parents('tr').find('.id_span').html());
		}
	});
	swal({
		title : "",
		text : "您确定要删除选中的记录吗?",
		type : 'warning',
		showCancelButton : true,
		cancelButtonText : '取消',
		closeOnConfirm : 	true,
		confirmButtonText : '确定',
		confirmButtonColor : '#DD6B55'
	}, function() {
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : '/activiti/overtime/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					swal.close();
					layer.msg("删除成功！");
					cancle_check();//用于消除多选状态
					init();
					check_tab();
				} else {
					layer.msg("删除失败!");
				}
			}
		});
	});
	//event.stopPropagation();
}
//删除一条加班信息
function delete_one(id) {
	var ids = [id];
	if(ids.length == 0){
		return;
	}
	swal({
		title : "",
		text : "您确定要删除选中的记录吗?",
		type : 'warning',
		showCancelButton : true,
		cancelButtonText : '取消',
		closeOnConfirm : 	true,
		confirmButtonText : '确定',
		confirmButtonColor : '#DD6B55'
	}, function(){
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : '/activiti/overtime/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					swal.close();
					layer.msg("删除成功！");
					init();
					check_tab();
				} else {
					swal("删除失败!", "", "error");
				}
			}
		});
	});
	event.stopPropagation();
}
