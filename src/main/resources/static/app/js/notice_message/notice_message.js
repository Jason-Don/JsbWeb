var prefix = "/oa/notify"
load();
function load() {
	$('#exampleTable').bootstrapTable({
		iconSize : 'outline',
		queryParams : 'queryParams',
		icons : {
			refresh : 'glyphicon-repeat',
			toggle : 'glyphicon-list-alt',
			columns : 'glyphicon-list'
		}
	});
	/*$('#exampleTable').bootstrapTable({
		method : 'get', // 服务器数据的请求方式 get or post
		url : prefix + "/selfList", // 服务器数据的加载地址
		iconSize : 'outline',
		dataType : "json", // 服务器返回的数据类型
		icons : {
			refresh : 'glyphicon-repeat',
			toggle : 'glyphicon-list-alt',
			columns : 'glyphicon-list'
		},
		showColumns : false, // 是否显示内容下拉框（选择显示的列）
		sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
		queryParams : 'queryParams',
		queryParams : function(params) {
			return {
				title : $('#key_words').val()
			};
		},
		columns : [ {
			checkbox : true
		}, {
			visible : false,
			field : 'id',
			title : '编号'
		}, {
			visible : false,
			field : 'type',
			title : '类型'
		}, {
			field : 'title',
			width : '20%',
			title : '名称',
		}, {
			field : 'isRead',
			title : '状态',
			align : 'center',
			formatter : function(value, row, index) {
				if (value == 0) {
					return '<span class="label label-warning">未读</span>';
				} else if (value == 1) {
					return '<span class="label label-primary">已读</span>';
				}
			}
		}, {
			visible : true,
			field : 'createDate',
			title : '创建时间'
		}, {
			visible : false,
			field : 'updateDate',
			title : '更新时间'
		}, {
			title : '操作',
			align : 'center',
			formatter : function(value, row, index) {
					return  '<div onclick="check_detail(\'' + row.id+ '\')"class="tab_edit_div">详情</div>';
			}
		} ]
	});*/
	init();
	check_tab();
}
var result = [];
function init(){
    $.ajax({
        url : prefix + "/selfList",
        method : 'get',
        cache: false,
        dataType : 'json',
        async : false,
        success : function(data) {
        	result = data;
        }
    });
}
function check_tab() {
	$('#exampleTable').bootstrapTable('load', result.rows);var down_edit = document.getElementsByClassName("touch_down");
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

function reLoad() {
//	$('#exampleTable').bootstrapTable('refresh');
	var key_words=$('#key_words').val();
	send_data={title:key_words};
	$.ajax({
        url : prefix + "/selfList",
        method : 'get',
        cache: false,
        dataType : 'json',
        data:send_data,
        async : false,
        success : function(data) {
        	result = data;
        }
    });
	check_tab();
}
 
// 查看详细_跳转页面
function check_detail(id) {
	window.location = "/app/notice/read/" + id;
}
function batch_read(){
	var rows = $("#exampleTable").bootstrapTable('getSelections');
	if (rows == [] || rows == null || rows == "" || rows.length == 0) {
		swal({
			title : '',
			text : '请至少选择一条记录!',
			type : 'warning'
		});
	} else {
		var ids = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			ids[i] = row['id'];
		});
		// 发送已读请求
		$.ajax({
			type : 'POST',
			data : {
				"idlist" : ids
			},
			url : '/app/notice/batch_read',
			success : function(r) {
				var n=JSON.stringify(r);
				if(n>0){
					swal( '成功已读选中通知!','','success');
				}				
				reLoad();
			}
		});
	}
}
// 返回
function go_back() {
	window.history.go(-1);
}


//表格操作
function operate_td(value, row, index){
    var hide_div = 'hide_div',readed_title = 'readed_title';
    if(row.isRead == '0'){
    	hide_div = '';
    	readed_title = '';
    }
    
	var div = 
		'<div class="td_div">'+
		'	<div class="operate_div touch_down">'+
		'		<div class="msg_div">'+
		'			<div class="hide_div checkbox_div">'+
		'				<input class="is_input" type="checkbox">'+
		'			</div>'+
		'			<div>'+
		'				<div class="read_no_div '+hide_div+'">'+
		'					<div></div>	'+				
		'				</div>'+
		'				<div class="'+readed_title+' msg_title">'+row.title+'</div>'+
		'				<div class="msg_type_2">'+row.updateDate+'</div>'+
		'				<span class="hide_div id_span">'+row.id+'</span>'+
		'			</div>'+
		'		</div>'+
		'	</div>'+
		'	<div onclick="delete_one(\''+ row.id+ '\');" class="delete_div hide_div">已读</div>'+
		'</div>';
	return div;
}
var ele,mouse_x,mouse_y,timeStart,timeEnd,time;
var is_down = false,is_move = false,is_hode = false,is_check_all = false,is_check_no = true;
//鼠标下按事件
function down(e){
	is_down = true;
	mouse_x = event.touches[0].pageX;
	mouse_y = event.touches[0].pageY;
	timeStart = getTime_mouse();
	ele = e;
}
//鼠标下按后松开事件
function up(e){
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
	if(is_down){
		if(Math.abs(new_mouse_y - mouse_y) > 10){
			console.log("上下移动了");
		}else if(new_mouse_x - mouse_x > 3){
			console.log("右移动了");
			$(ele).parents('tr').find('.delete_div').addClass('hide_div');
		}else if(new_mouse_x - mouse_x < -3){
			console.log("左移动了");
			$(ele).parents('tr').find('.delete_div').removeClass('hide_div');
			$(ele).parents('tr').siblings().find('.delete_div').addClass('hide_div');
			
		}else{
			is_move = false;
			if(timeEnd - timeStart > 500){
				console.log("按住不放");
				$('#delete_more').removeClass('hide_div');
				$(".checkbox_div").removeClass('hide_div');
				$(ele).parents('tr').find('.delete_div').addClass('hide_div');
				$(ele).parents('tr').find('input')[0].checked = true;
				$(ele).parents('tr').siblings().find('.delete_div').addClass('hide_div');
				is_hode = true;
				$(' .check_more_none').addClass('hide_div');
				$(' .check_more').removeClass('hide_div');
			}else{
				console.log("跳转");
				var businessKey = $(ele).parents('tr').find('.id_span').html();
				check_detail(businessKey);
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
	$.ajax({
		type : 'POST',
		data : {
			"idlist" : ids
		},
		url : '/app/notice/batch_read',
		success : function(r) {
//			var n=JSON.stringify(r);
//			if(n>0){
//				swal( '成功已读选中通知!','','success');
//			}				
			init();
			check_tab();
		}
	});
	cancle_check();
	event.stopPropagation();
}
//删除一条加班信息
function delete_one(id) {
	var ids = [id];
	if(ids.length == 0){
		return;
	}
	$.ajax({
		type : 'POST',
		data : {
			"idlist" : ids
		},
		url : '/app/notice/batch_read',
		success : function(r) {
//			var n=JSON.stringify(r);
//			if(n>0){
//				swal( '成功已读选中通知!','','success');
//			}				
			init();
			check_tab();
		}
	});
	event.stopPropagation();
}