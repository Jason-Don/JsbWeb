var prefix = "/activiti/workflow";
var userId = 0;
var curUsrName="";
/** **********************************app端工作流页面js******************************* */
var data_source;
//创建MeScroll对象
var mescroll = new MeScroll("OTN_2", {
	up: {
		auto: true, //是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
		callback: upCallback //上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
	}
});
/*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
function upCallback(page){
	//联网加载数据
//	console.log("page.num="+page.num);
	getListDataFromNet(page.num, page.size, function(data){
		//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
		mescroll.endSuccess(data.length);//传参:数据的总数; mescroll会自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
		//设置列表数据
		setListData(data);
	}, function(){
		//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        mescroll.endErr();
	},data_source);
}

/*设置列表数据*/
function setListData(data) {
	var listDom=document.getElementById("exampleTable_1");
	for (var i = 0; i < data.length; i++) {
		var newObj=data[i];
		var status_str;
		var tpye_div_class = 'pass';
		if(newObj.rwzt=='ing'){
			status_str = '进行中';
			tpye_div_class = 'passing'
	    }else if(newObj.rwzt=='end'){
	    	status_str = '已完成';
	    	tpye_div_class = 'passed'
	    }else{
	    	status_str = '未开始';
	    	tpye_div_class = 'no_pass'
	    }
		var current_clr='当前处理人：';
		if(newObj.assigneeMc){
			current_clr += newObj.assigneeMc;
		}else{
			current_clr="";
		}
		var div = 
			'<div class="td_div">'+
			'	<div class="operate_div touch_down">'+
			'		<div class="msg_div">'+
			'			<div class="hide_div checkbox_div">'+
			'				<input class="is_input" type="checkbox">'+
			'			</div>'+
			'			<div>'+
			'				<div class="msg_title msg_type_1">'+newObj.taskName+'</div>'+
			'				<div class="msg_title">创建人：'+newObj.cjryMc+'</div>'+
			'				<div class="msg_title">创建时间：'+newObj.cjsj+'</div>'+
			'				<div class="msg_type_2">'+current_clr+'</div>'+
			'				<span class="hide_div id_span">'+newObj.id+'</span>'+
			'			</div>'+
			'			<div id="status'+newObj.id+'" class="'+tpye_div_class+'">'+status_str+'</div>'+
			'		</div>'+
			'		<div class="edit_div"></div>'+
			'	</div>'+
			'	<div class="operate_btn_div" onclick="history(\''+ newObj.id+ '\');"><img src="images/circulation_flow.png"/>回退</div>'+
			'	<div class="operate_btn_div operate_btn_div_11" onclick="follow_flow(\''+ newObj.id+ '\');"><img src="images/flow_flow.png"/>核查</div>';
		if(userId == 1){
	    	div += 
	    		'	<div class="operate_btn_div operate_btn_div_0" onclick="delete_one(\''+ newObj.id+ '\');"><img src="images/error.png"/>删除</div>'+
	    		'</div>';
	    }else{
	    	div += '</div>';
	    }
		var str=
			'<tr><td>'+div+'</td></tr>';
		var liDom=document.createElement("tr");
		liDom.innerHTML=str;
		listDom.appendChild(liDom);//加在列表的后面,上拉加载
	}
	var a = document.getElementsByClassName("touch_down");
	for(var i=0;i<a.length;i++){
		a[i].addEventListener('touchstart',function(ev){
			down(this,ev);
		},false);
	}
	var b = document.getElementsByClassName("touch_edit");
	for(var i=0;i<b.length;i++){
		b[i].addEventListener('touchend',function(ev){
			up(this,ev);
		},false);
	}
}
//将所查到的所有数据按照每页的数量进行分块,匹配到每页里去
function getListDataFromNet(pageNum,pageSize,successCallback,errorCallback,data_source) {
	try{
		var newArr = data_source.slice((pageNum-1)*pageSize,pageNum*pageSize);
    	//联网成功的回调
    	successCallback&&successCallback(newArr);
	}catch(e){
		//联网失败的回调
		errorCallback&&errorCallback();
	}
}
$(function() {
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
	check_tab_1();
});
var result_1 = [];
var is_need_add = true;
//表格2的ajax的数据请求
function check_tab_1() {
	$.ajax({
        url : "/activiti/workflow/list?yxbz=Y&sort=cjsj&order=desc&taskName="+$("#key_words_1").val(),
        method : 'get',
        cache: false,
        dataType : 'json',
        async : false,
        success : function(data) {
        	result_1 = data;
        	var list1=result_1["rows"];
        	result_1["rows"]=sortByRwzt(list1);
        	data_source = result_1.rows;
        }
    });
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
//所有工作流程进行模糊搜索时,进行模糊匹配,清除之前的数据并且将查询的页码设置为1
function check_detail_other(){
	$('#exampleTable_1').find('tr').remove();
	check_tab_1();
	upCallback({'num':1,'size':5,'time':null});
	mescroll.optUp.page.num = 1;
}
// 添加工作流程
function add_work_flow() {
	window.location = "/app/workflow/work_flow_add";
}
// 查看详细_跳转页面
function check_detail(e) {
	window.location = "/app/workflow/work_flow_detail";
}
// 序号
function index(value, row, index) {
	return index + 1;
}
// 返回
function go_back() {
	window.location = "/app/index";
}
//打开流程图
function follow_flow(businessKey) {
	window.location = "/app/workflow/work_flow_img?businessKey="+businessKey;
	event.stopPropagation();
}
//查看流转记录
function history(id){
    window.location= "/app/workflow/history/"+id
    event.stopPropagation();
}
var ele,mouse_x,mouse_y,timeStart,timeEnd,time;
var is_down = false,is_hode = false,is_check_all = false,is_check_no = true;
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
	if(new_mouse_x - mouse_x > 20){
		$('.top_other.active').prev().click();
		return;
	}else if(new_mouse_x - mouse_x < -20){
		$('.top_other.active').next().click();
		return;
	}
	if(!is_down){
		return;
	}else if(is_hode){
		//如果是批量操作时,上下滑动距离较大则默认为移动页面
		if(Math.abs(new_mouse_y - mouse_y) < 20){
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
//			console.log("上下移动了");
//		}else if(new_mouse_x - mouse_x > 3){
////			console.log("右移动了");
//			$(ele).parents('tr').find('.delete_div').addClass('hide_div');
//		}else if(new_mouse_x - mouse_x < -3){
//			if($("#OTN_1").attr('class').indexOf("active in")==-1&&userId!=1){
//				//不触发左划删除
//				return false;
//			}
////			console.log("左移动了");
//			$(ele).parents('tr').find('.delete_div').removeClass('hide_div');
//			$(ele).parents('tr').siblings().find('.delete_div').addClass('hide_div');
		}else{
			if(timeEnd - timeStart > 500 && userId == 1){
				//console.log("按住不放");
				$('#delete_more').removeClass('hide_div');
//				$(".checkbox_div").removeClass('hide_div');
				$(ele).parents('tr').find('.delete_div').addClass('hide_div');
				$(ele).parents('tr').find('input')[0].checked = true;
				$(ele).parents('tr').siblings().find('.delete_div').addClass('hide_div');
				is_hode = true;
				$(ele).parents('table').addClass('input_show');
				$(' .check_more_none').addClass('hide_div');
				$(' .check_more').removeClass('hide_div');
			}else if(timeEnd - timeStart > 500){
				layer.msg("只有超级管理员才能批量操作！");			
			}else{
//				console.log("跳转");
				var businessKey = $(ele).parents('tr').find('.id_span').html();
				window.location = "/app/workflow/work_flow_detail/"+businessKey;
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
//取消按住事件,将所有选中的input全部设置为false,标记为未全选
function cancle_check(){
	$(' .check_more').addClass('hide_div');
	$(' .check_more_none').removeClass('hide_div');
	$(".checkbox_div").addClass('hide_div');
	$('.all_center').find('input.is_input').each(function (){
		$(this)[0].checked = false;
	});
	$('#check_all_span').html('全选');
	is_check_all = false;
	$('#delete_more').addClass('hide_div');
	is_hode = false;
	$(' .input_show').removeClass('input_show');
}
//获取当前时间
function getTime_mouse(){
	var now_time = new Date();
	return now_time.getTime();
}
//删除多个任务信息
function delete_more() {
	var ids = [];
	$('#exampleTable_1').find('input').each(function (){
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
	}, function(){
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : prefix + '/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					layer.msg("删除成功!");
					check_tab();
					check_detail_other();
				} else {
					layer.msg("删除失败!");
				}
			}
		});
	});
	event.stopPropagation();
}
//删除一条信息
function delete_one(id) {
	if(userId!=1){
		if($("#status"+id).html()=="已完成"||$("#status"+id).html()=="进行中"){
			layer.msg("不能删除进行中或已完成的任务!");
			event.stopPropagation();
			return;
		}
	}
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
	}, function() {
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : prefix + '/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					layer.msg("删除成功！");
					check_tab();
					check_detail_other();
				} else {
					layer.msg("删除失败！");
				}
			}
		});
	});
	event.stopPropagation();
}

function sortByRwzt(list){
//	console.log(list);
	for(var i=0;i<list.length;i++){
		if(list[i]["rwzt"] == "init" && i != 0){
			for(var j=i-1;j>=0;j--){
				if(list[j]["rwzt"]!="init"){
					var r=list[j];
					list[j]=list[j+1];
					list[j+1]=r;
				}else{break;}
			}
		}
	}
	return list;
}