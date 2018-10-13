
var prefix = "/activiti/workflow";
var userId = "";
$(function() {
	load();
});
var curUsrName = "";
function load() {
    $.ajax({
        url : '/utils/getCurrUserInfo',
        method : 'get',
        dataType : 'json',
        async : false,
        success : function(data) {
        	//currUserInfo = data;
        	userId = data.userId;
        	curUsrName = data.name;
        	if(data.name!="超级管理员"){
            	$("#deleteDiv2").hide();
        	}
        }
    });
	$('#exampleTable').bootstrapTable({
		method : 'get', // 服务器数据的请求方式 get or post
		url : prefix + "/list?cjryId="+userId+"&yxbz=Y&sort=cjsj&order=desc", // 服务器数据的加载地址
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
				offset:params.offset,
	           // name:$('#searchName').val(),
				taskName:$('#searchName').val()
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
					field:'Number',
					title:'序号',
					align:'center',
					width:20,
					formatter:function(value,row,index){
						var pageSize=$('#exampleTable').bootstrapTable('getOptions').pageSize;
						var pageNumber=$('#exampleTable').bootstrapTable('getOptions').pageNumber;
						return pageSize*(pageNumber-1)+index+1;
					}
				},
				{
					field : 'taskName', 
					title : '任务名称' 
				},
				{
					field : 'cjryMc', 
					title : '创建人' 
				},
				{
					field : 'cjsj', 
					title : '创建时间' 
			    },
				{
					field : 'rwzpryMc', 
					title : '室领导审核' 
			    },
				{
					field : 'cbryMc', 
					title : '承办人' 
				},
				{
					field : 'sjrwwcsj', 
					title : '完成时间' 
				},
				{
					field : 'rwzt', 
					title : '任务状态',
                    formatter:function (value,row,index) {
                	    if(row.rwzt=='init'){
                	    	return '未开始';
                	    }
                	    if(row.rwzt=='ing'){
                	    	return '进行中';
                	    }
                	    if(row.rwzt=='end'){
                	    	return '已完成';
                	    }
                    }
				},
				{
					field : 'assigneeMc', 
					title : '当前任务处理人' 
				},
                {
                    field : 'id',
                    title : '流程图',
                    formatter:function (value,row,index) {
                       /* var e = '<a   href="/activiti/task/trace/photo/'+row.id+'"  title="图片" target="_blank">图片</a> ';
                        return e;*/
                        return '<span class="btn btn-success btn-sm " onclick="gz(\''+ row.id+ '\')">跟踪</span>';
                    }
                },
            {
                field : 'id',
                title : '流转记录',
                formatter:function (value,row,index) {
                    /* var e = '<a   href="/activiti/task/trace/photo/'+row.id+'"  title="图片" target="_blank">图片</a> ';
                     return e;*/
                    return '<span class="btn btn-success btn-sm " onclick="history(\''+ row.id+ '\')">查看</span>';
                }
            },
				/*								{
					field : 'wcqkpj', 
					title : '完成情况评价' 
				},
												{
					field : 'yxbz', 
					title : '有效标志' 
				},*/
												{
					title : '操作',
					field : 'id',
					align : 'center',
					formatter : function(value, row, index) {
						var e = '<span class="btn btn-primary btn-sm '+s_edit_h+'" mce_href="#" title="编辑" onclick="edit(\''
								+ row.taskId
								+ '\')">编辑</span> ';
						var d = '<span class="btn btn-warning btn-sm '+s_remove_h+'" title="删除"  mce_href="#" onclick="remove(\''
								+ row.taskId
								+ '\',\''
								+ row.rwzt
								+ '\')">删除</span> ';
						var c = '<span class="btn btn-warning btn-sm" title="催办"  mce_href="#" onclick="cb(\''
							+ row.id
							+ '\')">催办</span>';
						var f = '<span class="btn btn-success btn-sm" title="详情"  mce_href="#" onclick="show(\''
								+ row.id
								+ '\')">详情</span> ';
						if(row.wcqkpf == null){
							return c+f;
						}
						return f;
					}
				} ]
	});
	
	$('#exampleTable_1').bootstrapTable({
		method : 'get', // 服务器数据的请求方式 get or post
		url : prefix + "/list?yxbz=Y&sort=cjsj&order=desc", // 服务器数据的加载地址
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
				offset:params.offset,
				taskName:$('#taskName').val(),
				rwzt:$('#rwzt').val(),
				fqsjq:$('#fqsjq').val(),
				fqsjz:$('#fqsjz').val(),
				deptIds:$('#deptIds').val()
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
					/*								{
						field : 'id', 
						title : '任务id' 
					},*/

					/*								{
						field : 'cjryId', 
						title : '创建人员id' 
					},*/
					{
						field:'Number',
						title:'序号',
						align:'center',
						width:20,
						formatter:function(value,row,index){
							var pageSize=$('#exampleTable_1').bootstrapTable('getOptions').pageSize;
							var pageNumber=$('#exampleTable_1').bootstrapTable('getOptions').pageNumber;
							return pageSize*(pageNumber-1)+index+1;
						}
					},
					{
						field : 'taskName', 
						title : '任务名称' 
					},
					/*								{
						field : 'rwly', 
						title : '任务来源' 
					},*/
					{
						field : 'cjryMc', 
						title : '创建人' 
					},
					/*								{
						field : 'rwnr', 
						title : '任务内容' 
					},*/
					/*								{
						field : 'blyj', 
						title : '办理意见' 
					},*/
					/*								{
						field : 'nycd', 
						title : '难易程度' 
					},*/
					/*								{
						field : 'rwkssj', 
						title : '任务开始时间' 
					},
					{
						field : 'rwwcsj', 
						title : '任务完成时间' 
					},*/
					{
						field : 'cjsj', 
						title : '创建时间' 
				    },
					{
						field : 'rwzpryMc', 
						title : '室领导审核' 
				    },
//				    {
//						field : 'cbry_mc', 
//						title : '当前处理人' 
//					},
					/*								{
						field : 'fqsj', 
						title : '发起时间' 
					},*/
					/*								{
						field : 'rwzpqsry', 
						title : '任务指派签收人员' 
					},
													{
						field : 'rwbllx', 
						title : '任务办理类型' 
					},

													{
						field : 'zzblry', 
						title : '任务最终办理人员' 
					},
													{
						field : 'sjrwwcsj', 
						title : '实际任务完成时间' 
					},*/
					{
						field : 'cbryMc', 
						title : '承办人' 
					},
					{
						field : 'sjrwwcsj', 
						title : '完成时间' 
					},
												{
					field : 'rwzt', 
					title : '任务状态',
                    formatter:function (value,row,index) {
                    	    if(row.rwzt=='init'){
                    	    	return '未开始';
                    	    }
                    	    if(row.rwzt=='ing'){
                    	    	return '进行中';
                    	    }
                    	    if(row.rwzt=='end'){
                    	    	return '已完成';
                    	    }
                        }
				},
				{
					field : 'assigneeMc', 
					title : '当前任务处理人' 
				},
                {
                    field : 'id',
                    title : '流程图',
                    formatter:function (value,row,index) {
                       /* var e = '<a   href="/activiti/task/trace/photo/'+row.id+'"  title="图片" target="_blank">图片</a> ';
                        return e;*/
                        return '<span class="btn btn-success btn-sm " onclick="gz(\''+ row.id+ '\')">跟踪</span>';
                    }
                },
                {
                field : 'id',
                title : '流转记录',
                formatter:function (value,row,index) {
                    /* var e = '<a   href="/activiti/task/trace/photo/'+row.id+'"  title="图片" target="_blank">图片</a> ';
                     return e;*/
                    return '<span class="btn btn-success btn-sm " onclick="history(\''+ row.id+ '\')">查看</span>';
                }
                },
				/*								{
					field : 'wcqkpj', 
					title : '完成情况评价' 
				},
												{
					field : 'yxbz', 
					title : '有效标志' 
				},*/
												{
					title : '操作',
					field : 'id',
					align : 'center',
					formatter : function(value, row, index) {
						var e = '<span class="btn btn-primary btn-sm '+s_edit_h+'" mce_href="#" title="编辑" onclick="edit(\''
								+ row.taskId
								+ '\')">编辑</span> ';
						var d = '<span class="btn btn-warning btn-sm '+s_remove_h+'" title="删除"  mce_href="#" onclick="remove(\''
								+ row.taskId
								+ '\',\''
								+ row.rwzt
								+ '\')">删除</span> ';
						var f = '<span class="btn btn-success btn-sm" title="详情"  mce_href="#" onclick="show(\''
								+ row.id
								+ '\')">详情</span> ';
						return f;
					}
				} ]
	});
}
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

function show(id){
	//alert(id)
	perContent = layer.open({
		type : 2,
		title : '  ',
		maxmin : true,
		shadeClose : true, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		anim:3,                    //动画
		content : "/act/workflow/workflow_show/"+id // iframe的url
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
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
	$('#exampleTable_1').bootstrapTable('refresh');
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