var prefix = "";
var userId = "";
$(function() {
	//表格初始化
    $('#exampleTable').bootstrapTable({
		search: true,
		showRefresh: true,
		showToggle: true,
		showColumns: true,
		pagination: true,
		onClickRow: onClickRow,
		onDblClickRow: onDblClickRow,//双击进入核查
		checkToSelect: false,
		iconSize: 'outline',
		queryParams:'queryParams',
		icons: {
			refresh: 'glyphicon-repeat',
			toggle: 'glyphicon-list-alt',
			columns: 'glyphicon-list'
		}
	});
    $('#exampleTable_1').bootstrapTable({
		search: true,
		showRefresh: true,
		showToggle: true,
		showColumns: true,
		pagination: true,
		onClickRow: onClickRow,
		checkToSelect: false,
		iconSize: 'outline',
		queryParams:'queryParams',
		icons: {
			refresh: 'glyphicon-repeat',
			toggle: 'glyphicon-list-alt',
			columns: 'glyphicon-list'
		}
	});
    //页面加载完成进行搜索
    reLoad(); 
});

//表格查询
function reLoad() {
	$.ajax({
		type : "get",
		url : "/ywgl/jsbZfrw/zfrwDBlist",
//		async : true,
//		cache : false,
		data : {
			limit: 10,
			offset:0
		},
		success : function(result){
			if(result.rows==null || result.rows=="" ){
				$('#exampleTable').bootstrapTable('removeAll');//清空
			}else{
				$('#exampleTable').bootstrapTable('load',result.rows);
			}
		},
		error : function() {
			//alert("程序执行异常，请联系管理员！");
		}
	});
	$.ajax({
		type : "get",
		url : "/ywgl/jsbZfrwFk/zfrwFkDBlist",
//		async : true,
//		cache : false,
		data : {
			limit: 10,
			offset:0
		},
		success : function(result){
//			result = {"total":2,"rows":[
//                {"id":"3","zfrwId":"3","hzMc":"赵送文","hzSfzhm":"362527195803211711","gkdj":"1","zfdd":"凤凰古城",
//                 "lng":"127.111","lat":"128.222","hzqkRyzw":"1","hzqkCqzwQx":"长期在外","hzqkBqwd":"1","hzqkJhrlz":"1",
//                 "hzqkFyqk":"1","hzqkFxdj":"1","hzqkQtqksm":"无补充","mjzfsx":"无","zfrq":"2018-09-30 12:32:25",
//                 "xczfrq":"2018-10-30 12:32:25","zfmjJh":"0012201","zfmjMc":"民警A号","lhsfryJh":"002000125",
//                 "lhsfryMc":"民警AA号","scsj":"2018-09-30 12:32:25","isread":"0","readTime":"2018-10-30 12:52:25"}
//			]};
			if(result.rows==null || result.rows=="" ){
				$('#exampleTable_1').bootstrapTable('removeAll');//清空
			}else{
				$('#exampleTable_1').bootstrapTable('load',result.rows);
			}
		},
		error : function() {
			//alert("程序执行异常，请联系管理员！");
		}
	});
}
//操作(反馈)
function operate(value, row, index){
//	var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="编辑" onclick="edit(\''
//		+ row.id
//		+ '\')"><i class="fa fa-edit"></i></a> ';
//	var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove(\''
//		+ row.id
//		+ '\')"><i class="fa fa-remove"></i></a> ';
	var f = '<a class="btn btn-success btn-sm" href="#" title="走访反馈"  mce_href="#" onclick="zffk(\''
		+ row.taskId
		+ '\')"><i class="fa fa-key"></i></a> ';
	return f ;
}
function operate_1(value, row, index){
	var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="详情" onclick="sy(\''
	+ row.taskId
	+ '\')"><i class="fa fa-edit"></i></a> ';
	var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove(\''
		+ row.id
		+ '\')"><i class="fa fa-remove"></i></a> ';
//	var f = '<a class="btn btn-success btn-sm" href="#" title="备用"  mce_href="#" onclick="resetPwd(\''
//		+ row.id
//		+ '\')"><i class="fa fa-key"></i></a> ';
	return e ;
}
//双击行进入核查
function onDblClickRow(row,ele){
	zffk(row.id);
}
//单个点击事件
function onClickRow(row,ele){
//	$(ele).find('input').click();
	$(ele).children("td").eq(0).find("input").click();
}
var curUsrName = "";
function cb(businessKey){
	layer.confirm("确定要催办？",{btn : [ '确定', '取消' ]},function(){
		$.ajax({
			url : "/utils/cb/"+businessKey,
			type : "post",
			success : function(r) {
				if (r.code==0) {
					layer.msg(r.msg);
					reLoad();
				}else{
					layer.msg(r.msg);
				}
			}
		});
	})
}
var businessKey = "";
function history(id){
    businessKey = id;
    perContent = layer.open({
        type : 2,
        title :' ',
//        title : '流转记录',
        maxmin : true,
        shadeClose : true, // 点击遮罩关闭层
        area : [ '900px', '520px' ],
        anim:3,                    //动画
        content : "/act/workflow/workflow_history" // iframe的url
    });
}
//走访反馈详情
function sy(taskId){
	perContent = layer.open({
		type : 2,
		title : '  ',
		maxmin : true,
		shadeClose : true, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		anim:3,                    //动画
		content : "/ywgl/jsbZfrwFk/sy/"+taskId, // iframe的url
		btn: ['审阅','关闭'],
        yes: function(index,layero){
        	var zffkAdd_form = layer.getChildFrame('#add_form',index);
        	$.ajax({
        		cache : true,
        		type : "POST",
        		url : "/ywgl/jsbZfrwFk/syTg",
        		data : zffkAdd_form.serialize(),// 序列化
        		async : false,
        		error : function(request) {
        			parent.layer.alert("Connection error");
        		},
        		success : function(data) {
        			if (data.code == 0) {
        				layer.msg("操作成功");
        				reLoad();
        				//var index = layer.getFrameIndex(window.name); // 获取窗口索引
        				layer.close(index);

        			} else {
        				layer.alert(data.msg)
        			}
        		}
        	});
        },
        btn2: function(index,layero){
        	layer.close(index);
        }
	});
	layer.full(perContent);
}
function gz(businessKey){
	perContent =layer.open({
		type : 2,
		title :' ',
//		title : '跟踪',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '900px', '520px' ],
		anim:3, 
		content : "/activiti/task/trace/photo/"+businessKey
	});
	layer.full(perContent);
}
function add() {
	layer.open({
		type : 2,
		title :' ',
		/*title : '发起任务',*/
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '1000px', '560px' ],
		content : "/act/workflow/workflow_add" // iframe的url
	});
}
function zffk(taskId){
	layer.open({
		type : 2,
		title :' ',
		/*title : '发起任务',*/
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '1000px', '560px' ],
		content : "/ywgl/jsbZfrwFk/add/"+taskId, // iframe的url
		btn: ['保存','关闭'],
        yes: function(index,layero){
        	var zffkAdd_form = layer.getChildFrame('#add_form',index);
        	$.ajax({
        		cache : true,
        		type : "POST",
        		url : "/ywgl/jsbZfrwFk/save",
        		data : zffkAdd_form.serialize(),// 序列化
        		async : false,
        		error : function(request) {
        			parent.layer.alert("Connection error");
        		},
        		success : function(data) {
        			if (data.code == 0) {
        				layer.msg("操作成功");
        				reLoad();
        				//var index = layer.getFrameIndex(window.name); // 获取窗口索引
        				layer.close(index);

        			} else {
        				layer.alert(data.msg)
        			}
        		}
        	});
        },
        btn2: function(index,layero){
        	layer.close(index);
        }
	});
}
function saveZfFk(data) {


}
function edit(id) {
	layer.open({
		type : 2,
		title : '编辑任务',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/edit/' + id // iframe的url
	});
}
function remove(id,rwzt) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix+"/remove",
			type : "post",
			data : {
				'taskId' : id
			},
			success : function(r) {
				if (r.code==0) {
					layer.msg(r.msg);
					reLoad();
				}else{
					layer.msg(r.msg);
				}
			}
		});
	})
}

function batchRemove() {
	var table = 'exampleTable';
    if(!$("#tab-1").hasClass("active")){
    	table = "exampleTable_1";
    }
	var rows = $('#'+table).bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.alert('请选择要删除的数据!',{icon:2,skin:'layer-ext-moon'});
		return;
	}
	var isDelete = true;
	for(var i=0;i<rows.length;i++){
		//任务状态有进行中或者已完成
		if(rows[i].rwzt =="end" || rows[i].rwzt =="ing"){
			isDelete = false;
			break;
		}
	}
	//超级管理人可以删除任何任务,其他角色我的工作流程只能删除未进行中任务，不能删除进行中和已完成任务
	if(isDelete ==false){//选择了进行中和已完成任务
    	if(curUsrName=="超级管理员"){//判断超级管理员，可以删除进行中和已完成任务
    		layer.confirm("确认要删除选中的'" + rows.length + "'条数据,任务删除后不可恢复?", {
    			btn : [ '确定', '取消' ]
    		// 按钮
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
    				url : prefix + '/batchRemove',
    				success : function(r) {
    					if (r.code == 0) {
    						layer.msg(r.msg);
    						reLoad();
    					} else {
    						layer.msg(r.msg);
    					}
    				}
    			});
    		});
    	}else{
    		layer.alert('不能删除进行中和已完成工作流程!',{icon:2,skin:'layer-ext-moon'});
			return;
    	}
	}else{//只选择了未开始任务
		layer.confirm("确认要删除选中的'" + rows.length + "'条数据,任务删除后不可恢复?", {
			btn : [ '确定', '取消' ]
		// 按钮
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
				url : prefix + '/batchRemove',
				success : function(r) {
					if (r.code == 0) {
						layer.msg(r.msg);
						reLoad();
					} else {
						layer.msg(r.msg);
					}
				}
			});
		});
	}	
}
function loadDept(deptIds, depts) {
	$("#deptIds").val(deptIds);
	$("#depts").val(depts);
}









function load() {
	$('#exampleTable').bootstrapTable({
		method : 'get', // 服务器数据的请求方式 get or post
		url : "/ywgl/jsbZfrw/zfrwDBlist", // 服务器数据的加载地址
	//	showRefresh : true,
	//	showToggle : true,
	//	showColumns : true,
		iconSize : 'outline',
		toolbar : '#exampleToolbar',
		striped : true, // 设置为true会有隔行变色效果
		dataType : "json", // 服务器返回的数据类型
		pagination : true, // 设置为true会在底部显示分页条
		// queryParamsType : "limit",
		// //设置为limit则会发送符合RESTFull格式的参数
		singleSelect : false, // 设置为true将禁止多选
		// contentType : "application/x-www-form-urlencoded",
		// //发送到服务器的数据编码类型
		pageSize : 10, // 如果设置了分页，每页数据条数
		pageNumber : 1, // 如果设置了分布，首页页码
		//search : true, // 是否显示搜索框
		showColumns : false, // 是否显示内容下拉框（选择显示的列）
		sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
		queryParams : function(params) {
			return {
				//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
				limit: params.limit,
				offset:params.offset
	           // name:$('#searchName').val(),
	           // username:$('#searchName').val()
			};
		},
		// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
		// queryParamsType = 'limit' ,返回参数必须包含
		// limit, offset, search, sort, order 否则, 需要包含:
		// pageSize, pageNumber, searchText, sortName,
		// sortOrder.
		// 返回false将会终止请求
		columns : [
				{
					checkbox : true
				},
												{
					field : 'id', 
					title : '任务ID' 
				},
												{
					field : 'bzfhzMc', 
					title : '被走访患者_名称' 
				},
												{
					field : 'bzfhzSfzhm', 
					title : '被走访患者_身份证号码' 
				},
												{
					field : 'rwssjgDm', 
					title : '任务所属机关_代码' 
				},
												{
					field : 'rwssjgMc', 
					title : '任务所属机关_名称' 
				},
												{
					field : 'jhzfrq', 
					title : '计划走访日期' 
				},
												{
					field : 'scsj', 
					title : '生成时间' 
				},
												{
					title : '操作',
					field : 'id',
					align : 'center',
					formatter : function(value, row, index) {
						var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="编辑" onclick="edit(\''
								+ row.id
								+ '\')"><i class="fa fa-edit"></i></a> ';
						var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove(\''
								+ row.id
								+ '\')"><i class="fa fa-remove"></i></a> ';
						var f = '<a class="btn btn-success btn-sm" href="#" title="走访反馈"  mce_href="#" onclick="zffk(\''
								+ row.taskId
								+ '\')"><i class="fa fa-key"></i></a> ';
						return f ;
					}
				} ]
	});
	
	$('#exampleTable_1').bootstrapTable({
		method : 'get', // 服务器数据的请求方式 get or post
		url : "/ywgl/jsbZfrwFk/zfrwFkDBlist", // 服务器数据的加载地址
	//	showRefresh : true,
	//	showToggle : true,
	//	showColumns : true,
		iconSize : 'outline',
		toolbar : '#exampleToolbar',
		striped : true, // 设置为true会有隔行变色效果
		dataType : "json", // 服务器返回的数据类型
		pagination : true, // 设置为true会在底部显示分页条
		// queryParamsType : "limit",
		// //设置为limit则会发送符合RESTFull格式的参数
		singleSelect : false, // 设置为true将禁止多选
		// contentType : "application/x-www-form-urlencoded",
		// //发送到服务器的数据编码类型
		pageSize : 10, // 如果设置了分页，每页数据条数
		pageNumber : 1, // 如果设置了分布，首页页码
		//search : true, // 是否显示搜索框
		showColumns : false, // 是否显示内容下拉框（选择显示的列）
		sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
		queryParams : function(params) {
			return {
				//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
				limit: params.limit,
				offset:params.offset
	           // name:$('#searchName').val(),
	           // username:$('#searchName').val()
			};
		},
		// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
		// queryParamsType = 'limit' ,返回参数必须包含
		// limit, offset, search, sort, order 否则, 需要包含:
		// pageSize, pageNumber, searchText, sortName,
		// sortOrder.
		// 返回false将会终止请求
		columns : [
				{
					checkbox : true
				},
												{
					field : 'id', 
					title : '走访任务_反馈ID' 
				},
												{
					field : 'zfrwId', 
					title : '走访任务ID' 
				},
												{
					field : 'hzMc', 
					title : '患者名称' 
				},
												{
					field : 'hzSfzhm', 
					title : '患者身份证号码' 
				},
												{
					field : 'gkdj', 
					title : '管控等级(1=一级管控，2=二级管控，3=三级管控)' 
				},
												{
					field : 'zfdd', 
					title : '走访地点' 
				},
												{
					field : 'lng', 
					title : '经度' 
				},
												{
					field : 'lat', 
					title : '纬度' 
				},
												{
					field : 'hzqkRyzw', 
					title : '患者情况_人员在位(1=在家，2=长期在外，3=走失)' 
				},
												{
					field : 'hzqkCqzwQx', 
					title : '患者情况_长期在外_去向' 
				},
												{
					field : 'hzqkBqwd', 
					title : '患者情况_病情稳定(1=为发病，2=偶然发病，3=经常发病)' 
				},
												{
					field : 'hzqkJhrlz', 
					title : '患者情况_监护人履职(1=履行，2=无力履行，3=不履行)' 
				},
												{
					field : 'hzqkFyqk', 
					title : '患者情况_服药情况(1=规律，2=不规律，3=服药间断，4=无力购药，5=不服药)' 
				},
												{
					field : 'hzqkFxdj', 
					title : '患者情况_风险等级(0=0级，1=1级，2=2级，3=3级，4=4级，5=5级)' 
				},
												{
					field : 'hzqkQtqksm', 
					title : '患者情况_其他情况说明' 
				},
												{
					field : 'mjzfsx', 
					title : '民警嘱咐事项' 
				},
												{
					field : 'zfrq', 
					title : '走访日期' 
				},
												{
					field : 'xczfrq', 
					title : '下次走访日期' 
				},
												{
					field : 'zfmjJh', 
					title : '走访民警_警号' 
				},
												{
					field : 'zfmjMc', 
					title : '走访民警_名称' 
				},
												{
					field : 'lhsfryJh', 
					title : '联合随访人员_警号' 
				},
												{
					field : 'lhsfryMc', 
					title : '联合随访人员_名称' 
				},
												{
					field : 'scsj', 
					title : '生成时间' 
				},
												{
					field : 'isread', 
					title : '是否已读(0=未读，1已读)' 
				},
												{
					field : 'readTime', 
					title : '已读_时间' 
				},
												{
					title : '操作',
					field : 'id',
					align : 'center',
					formatter : function(value, row, index) {
						var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="编辑" onclick="edit(\''
								+ row.id
								+ '\')"><i class="fa fa-edit"></i></a> ';
						var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove(\''
								+ row.id
								+ '\')"><i class="fa fa-remove"></i></a> ';
						var f = '<a class="btn btn-success btn-sm" href="#" title="备用"  mce_href="#" onclick="resetPwd(\''
								+ row.id
								+ '\')"><i class="fa fa-key"></i></a> ';
						return e + d ;
					}
				} ]
	});
}