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
	$('#exampleTable_1').bootstrapTable({
		iconSize : 'outline',
		queryParams : 'queryParams',
		icons : {
			refresh : 'glyphicon-repeat',
			toggle : 'glyphicon-list-alt',
			columns : 'glyphicon-list'
		}
	});
	$('#exampleTable_2').bootstrapTable({
		iconSize : 'outline',
		queryParams : 'queryParams',
		icons : {
			refresh : 'glyphicon-repeat',
			toggle : 'glyphicon-list-alt',
			columns : 'glyphicon-list'
		}
	});
	
	var up_edit = document.getElementsByClassName("touch_edit");
	up_edit[0].addEventListener("touchstart",function(ev){
		down(this,ev);
	},false);
	up_edit[0].addEventListener("touchend",function(ev){
		up(this,ev);
	},false);
	
	check_tab();
});

var mouse_x,mouse_y;
//鼠标下按事件
function down(e){
	mouse_x = event.touches[0].pageX;
	mouse_y = event.touches[0].pageY;
}
//鼠标下按后松开事件
function up(e){
	var new_mouse_x = event.changedTouches[0].pageX;
	var new_mouse_y = event.changedTouches[0].pageY; 
	if(new_mouse_x - mouse_x > 20){
		$('.top_other.active').prev().click();
		return;
	}else if(new_mouse_x - mouse_x < -20){
		$('.top_other.active').next().click();
		return;
	}
}

function check_tab() {
	$.ajax({
        url : '/activiti/task/todoList',
        method : 'get',
        cache: false,
        dataType : 'json',
        async : false,
        success : function(data) {
        	$('#exampleTable').bootstrapTable('load', data);
        }
    });
    $.ajax({
        url : '/activiti/task/historyList',
        method : 'get',
        cache: false,
        dataType : 'json',
        async : false,
        success : function(data) {
        	$('#exampleTable_1').bootstrapTable('load', data);
        }
    });
    $.ajax({
        url : '/activiti/task/gotoList',
        method : 'get',
        cache: false,
        dataType : 'json',
        async : false,
        success : function(data) {
        	$('#exampleTable_2').bootstrapTable('load', data);
        }
    });
}
// 跟踪流程
function flow_img(value, row, index) {
	return '<a class="tab_edit_div" onclick="follow_flow(\''+ row.processDefinitionId+'\',\''+row.processInstanceId+ '\')">流程图</a>';
}
function follow_flow(processDefinitionId,processInstanceId){
	window.location = "/app/workflow/work_flow_img?processDefinitionId="+processDefinitionId+"&businessKey="+processInstanceId;
	event.stopPropagation();
}
function flow_history(value, row, index) {
	return '<a class="tab_edit_div" onclick="history(\''+ row.businessKey+'\')">查看</a>';
}
var businessKey="";
function history(id){
    window.location= "/app/workflow/history/"+id
    event.stopPropagation();
}

function flow_img_2(value, row, index) {
	return '<div onclick="lct(\''+row.id+'\');" class="tab_edit_div">图片</div>';
}
function lct(id){
	window.location = "/app/task_manage/task_img?readId="+id;
}
// 查看详情操作
function operate(value, row, index) {
	var html = '';
	var url = '';
	if (row.name == "加班申请审核") {
		url = "/app/over_time/over_time_sh/"+ row.businessKey+"/"+row.id;
	} else if (row.name == "制定并发起任务") {
		url= "/app/workflow/modify/"+ row.id;
	} else if (row.name == "领导分配任务") {
		url= "/app/workflow/fp/"+ row.id;
	} else if (row.name == "牵头人处理任务") {
		url= "/app/workflow/qtr_cl/"+ row.id;
	} else if (row.name == "承办人处理") {
		url= "/app/workflow/fk/"+ row.id;
	} else if (row.name == "重新分配任务") {
		url= "/app/workflow/cxfp/"+ row.id;
	} else if (row.name == "任务评价") {
		url= "/app/workflow/pj/"+ row.id;
	}else if (row.name == "牵头人审核") {
		url="/app/workflow/qtr_sh/"+ row.id;
	}
	html += '<div onclick="reLocation(\''+url+'\');" class="tab_edit_div">处理</div>';
	return html;
}
// 查看详细_跳转页面
function over_time_detail(businessKey) {
	window.location = "/app/over_time/over_time_detail/"+businessKey;
}
function reLocation(url) {
	window.location = url;
	event.stopPropagation();
}

function operate_1(value, row, index) {
	var detailURL = '';
	if(row.title == '加班申请'){
		detailURL = '/app/over_time/over_time_detail/'+ row.businessKey;
	}else{
		detailURL = '/app/workflow/work_flow_detail/'+ row.businessKey;
	}
	//var f = '<span class="btn btn-success btn-sm" title="详情"  mce_href="#" onclick="ck(\''+ detailURL+ '\')">详情</span> ';
	return '<div onclick="ck(\''+ detailURL+ '\')" class="tab_edit_div">详情</div>';
}
function ck(detailURL){
	window.location = detailURL;
}
function operate_2(value, row, index) {
	return '<div onclick="open_task(this,' + (index + 1)
			+ ');" class="tab_edit_div">发起任务</div>';
}

// 返回
function go_back() {
	window.location = "../index.html";
}
// 发起任务
function open_task(e, n) {
	if (n == 1) {
		window.location = "../over_time/over_time_add.html";
	} else if (n == 2) {
		window.location = "/app/workflow/work_flow_add";
	}
}
//表格操作
function operate_td(value, row, index){
//	var status_str;
//	if(row.rwzt=='ing'){
//		status_str = '进行中';
//    }else if(row.rwzt=='end'){
//    	status_str = '已完成';
//    }else{
//    	status_str = '未开始';
//    }
	var url = '';
	if (row.name == "加班申请审核") {
		url = "/app/over_time/over_time_sh/"+ row.businessKey+"/"+row.id;
	} else if (row.name == "制定并发起任务") {
		url= "/app/workflow/modify/"+ row.id;
	} else if (row.name == "领导分配任务") {
		url= "/app/workflow/fp/"+ row.id;
	} else if (row.name == "牵头人处理任务") {
		url= "/app/workflow/qtr_cl/"+ row.id;
	} else if (row.name == "承办人处理") {
		url= "/app/workflow/fk/"+ row.id;
	} else if (row.name == "重新分配任务") {
		url= "/app/workflow/cxfp/"+ row.id;
	} else if (row.name == "任务评价") {
		url= "/app/workflow/pj/"+ row.id;
	}else if (row.name == "牵头人审核") {
		url="/app/workflow/qtr_sh/"+ row.id;
	}
	var detailURL = '';
	if(row.title == '加班申请'){
		detailURL = '/app/over_time/over_time_detail/'+ row.businessKey;
	}else{
		detailURL = '/app/workflow/work_flow_detail/'+ row.businessKey;
	}
	var div = 
		'<div onclick="ck(\''+ detailURL + '\');" class="td_div">'+
		'	<div class="operate_div">'+
		'		<div class="msg_div">'+
		'			<div class="hide_div checkbox_div">'+
		'			</div>'+
		'			<div>'+
		'				<div class="msg_title msg_type_1">'+row.title+'</div>'+
//		'				<div class="msg_title">'+row.name+'</div>'+
//		'				<div class="msg_type_2">'+row.assigneeMc+'</div>'+
		'				<span class="hide_div id_span">'+row.id+'</span>'+
		'			</div>'+
		'			<div class="short_div">'+row.name+'</div>'+
		'		</div>'+
		'		<div class="edit_div"></div>'+
		'	</div>'+
		'	<div class="operate_btn_div" onclick="reLocation(\''+ url+ '\');"><img src="../images/deal_flow.png"/>处理</div>'+
		'	<div class="operate_btn_div operate_btn_div_1" onclick="history(\''+ row.businessKey+ '\');"><img src="../images/circulation_flow.png"/>流转记录</div>'+
		'	<div class="operate_btn_div operate_btn_div_2" onclick="follow_flow(\''+ row.processDefinitionId+'\',\''+row.processInstanceId+ '\');"><img src="../images/flow_flow.png"/>流程图</div>'+
		'</div>';
	return div;
}
function operate_td_1(value, row, index){
	var detailURL = '';
	if(row.title == '加班申请'){
		detailURL = '/app/over_time/over_time_detail/'+ row.businessKey;
	}else{
		detailURL = '/app/workflow/work_flow_detail/'+ row.businessKey;
	}
	var div = 
		'<div onclick="ck(\''+ detailURL + '\');" class="td_div">'+
		'	<div class="operate_div">'+
		'		<div class="msg_div">'+
		'			<div class="hide_div checkbox_div">'+
		'			</div>'+
		'			<div>'+
		'				<div class="msg_title msg_type_1">'+row.title+'</div>'+
		'				<div class="msg_title">'+row.handleTime+'</div>'+
//		'				<div class="msg_type_2">'+row.assigneeMc+'</div>'+
		'				<span class="hide_div id_span">'+row.id+'</span>'+
		'			</div>'+
		'			<div class="middle_div">'+row.name+'</div>'+
		'		</div>'+
		'		<div class="edit_div"></div>'+
		'	</div>'+
		'	<div class="operate_btn_div" onclick="history(\''+ row.businessKey + '\');"><img src="../images/circulation_flow.png"/>流转记录</div>'+
		'	<div class="operate_btn_div operate_btn_div_11" onclick="follow_flow(\''+ row.processDefinitionId+'\',\''+row.processInstanceId+ '\');"><img src="../images/flow_flow.png"/>流程图</div>'+
		'</div>';
	return div;
}
//跳转li
var now_num = 1;
var is_move = false;
function tz_li(e,n){
	//如果点击的不是当前的div就触发事件进行操作
	if(!$(e).hasClass('active')){
//		方式1,连续点击两个不同的div进行移动,会移动一个did的距离,然后跳转到最后点击的div的位置
//		is_move = true;
//		//进行样式增加以及兄弟节点样式清除
//		$(e).addClass('active');
//		$(e).siblings().removeClass('active');
//		var all_li = $('.all_li');
//		var offset = ($('.all_li .tab-pane').width())*-1;
//		//把其点中的div放在当前div的后一位,这样只需要移动一个div的距离就够了
//		$('.all_li #OTN_'+now_num).after($('.all_li #OTN_'+n));
//		all_li.stop().animate({marginLeft:offset},200,function(){
//			//移动完成之后将选中的div放在首位,然后清空移动位置
//			all_li.prepend($('.all_li #OTN_'+n));
//			$(this).css('margin-left','0px');
//			is_move = false;
//		});
//		//完成操作之后将当前显示的位置为选中的div
//		now_num = n;
//		方式2,连续点击两个不同的div进行移动,会提示正在进行操作,请稍后,后一个点击的事件无效
		if(!is_move){
			is_move = true;
			//进行样式增加以及兄弟节点样式清除
			$(e).addClass('active');
			$(e).siblings().removeClass('active');
			var all_li = $('.all_li');
			var offset = ($('.all_li .tab-pane').width())*-(n-1);
			//把其点中的div放在当前div的后一位,这样只需要移动一个div的距离就够了
//			$('.all_li #OTN_'+now_num).after($('.all_li #OTN_'+n));
			all_li.stop().animate({marginLeft:offset},200,function(){
				//移动完成之后将选中的div放在首位,然后清空移动位置
//				all_li.prepend($('.all_li #OTN_'+n));
//				$(this).css('margin-left','0px');
				is_move = false;
			});
			//完成操作之后将当前显示的位置为选中的div
			now_num = n;
		}else{
			layer.msg("正在操作,请稍后!");
		}
	}
}
