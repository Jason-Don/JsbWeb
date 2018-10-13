
var prefix = "/activiti/overtime";
var userId = "";
$(function() {
	load();
});

function load() {
    $.ajax({
        url : '/utils/getCurrUserInfo',
        method : 'get',
        dataType : 'json',
        async : false,
        success : function(data) {
        	//currUserInfo = data;
        	userId = data.userId;
        }
    });
	$('#exampleTable').bootstrapTable({
				method : 'get', // 服务器数据的请求方式 get or post
				url : prefix + "/list?sqrId="+userId+"&yxbz=Y&sort=sqsj&order=desc", // 服务器数据的加载地址
				iconSize : 'outline',
				toolbar : '#exampleToolbar',
				striped : true, // 设置为true会有隔行变色效果
				dataType : "json", // 服务器返回的数据类型
				pagination : true, // 设置为true会在底部显示分页条
				// queryParamsType : "limit",
				// //设置为limit则会发送符合RESTFull格式的参数
				singleSelect : false, // 设置为true将禁止多选
				pageSize : 10, // 如果设置了分页，每页数据条数
				pageNumber : 1, // 如果设置了分布，首页页码
//				search : true, // 是否显示搜索框
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
				columns : [
						{
							checkbox : true
						},
						/*								{
							field : 'id', 
							title : 'ID' 
						},*/
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
							field : 'sqrMc', 
							title : '申请人名称' 
						},
						{
							field : 'szbmMc', 
							title : '所在部门' 
						},
						{
							field : 'sqsj', 
							title : '申请时间' 
						},
						{
							field : 'jjqk', 
							title : '紧急情况',
							formatter : function(value, row, index) {
								if(value=="YB"){
									return  "一般";
								}
								if(value=="ZY"){
									return  "重要";
								}
								if(value=="JJ"){
									return  "紧急";
								}
							}
						},
					 /*								{
							field : 'jblx', 
							title : '加班类型' 
						},
														{
							field : 'jbsy', 
							title : '加班事由' 
						},*/
						{
							field : 'kssj', 
							title : '开始时间' 
						},
						{
							field : 'jssj', 
							title : '结束时间' 
						},
						/*								{
							field : 'glgzlc', 
							title : '关联工作流程' 
						},
														{
							field : 'yxbz', 
							title : '有效标志' 
						},*/
						{
							field : 'shryMc', 
							title : '审核人' 
						},
						{
							field : 'status', 
							title : '任务状态',
			                formatter:function (value,row,index) {
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
						 },
			             {
			                    field : 'id',
			                    title : '流程图',
			                    formatter:function (value,row,index) {
			                       return '<a class="btn btn-success btn-sm " onclick="gz(\''+ row.id+ '\')">跟踪</a>';
			                    }
			             },
			             {
								title : '操作',
								field : 'id',
								align : 'center',
								formatter : function(value, row, index) {
									var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" mce_href="#" title="编辑" onclick="edit(\''
											+ row.id
											+ '\')"><i class="fa fa-edit"></i></a> ';
									var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" title="删除"  mce_href="#" onclick="remove(\''
											+ row.id
											+ '\')"><i class="fa fa-remove"></i></a> ';
									var f = '<a class="btn btn-success btn-sm" title="查看"  mce_href="#" onclick="show(\''
										+ row.id
										+ '\')">查看</a> ';
									return f ;
								}
						} ]
			});
	$('#exampleTable_1').bootstrapTable({
		method : 'get', // 服务器数据的请求方式 get or post
		url : prefix + "/list?yxbz=Y&sort=sqsj&order=desc", // 服务器数据的加载地址
		iconSize : 'outline',
		toolbar : '#exampleToolbar',
		striped : true, // 设置为true会有隔行变色效果
		dataType : "json", // 服务器返回的数据类型
		pagination : true, // 设置为true会在底部显示分页条
		singleSelect : false, // 设置为true将禁止多选
		pageSize : 10, // 如果设置了分页，每页数据条数
		pageNumber : 1, // 如果设置了分布，首页页码
//		search : true, // 是否显示搜索框
		showColumns : false, // 是否显示内容下拉框（选择显示的列）
		sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
		queryParams : function(params) {
			return {
				limit: params.limit,
				offset:params.offset
			};
		},
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
					field : 'sqrMc', 
					title : '申请人名称' 
				},
												{
					field : 'szbmMc', 
					title : '所在部门' 
				},
												{
					field : 'sqsj', 
					title : '申请时间' 
				},
												{
					field : 'jjqk', 
					title : '紧急情况',
					formatter : function(value, row, index) {
						if(value=="YB"){
							return  "一般";
						}
						if(value=="ZY"){
							return  "重要";
						}
						if(value=="JJ"){
							return  "紧急";
						}
					}
				},
				{
					field : 'kssj', 
					title : '开始时间' 
				},
				{
					field : 'jssj', 
					title : '结束时间' 
				},
				{
					field : 'shryMc', 
					title : '审核人' 
				},
				{
					field : 'status', 
					title : '任务状态',
                    formatter:function (value,row,index) {
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
				},
                {
                    field : 'id',
                    title : '流程图',
                    formatter:function (value,row,index) {
                        return '<a class="btn btn-success btn-sm " onclick="gz(\''+ row.id+ '\')">跟踪</a>';
                    }
                },
                {
					title : '操作',
					field : 'id',
					align : 'center',
					formatter : function(value, row, index) {
						var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" mce_href="#" title="编辑" onclick="edit(\''
								+ row.id
								+ '\')"><i class="fa fa-edit"></i></a> ';
						var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" title="删除"  mce_href="#" onclick="remove(\''
								+ row.id
								+ '\')"><i class="fa fa-remove"></i></a> ';
						var f = '<a class="btn btn-success btn-sm" title="查看"  mce_href="#" onclick="show(\''
							+ row.id
							+ '\')">查看</a> ';
						return f ;
					}
				} ]
	});
}
function gz(businessKey){
	layer.open({
		type : 2,
		title :' ',
//		title : '跟踪',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '900px', '520px' ],
		content : "/activiti/task/trace/photo/"+businessKey
	});
}
function show(id){
	layer.open({
		type : 2,
		title :' ',
//		title : '查看加班信息',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : "/activiti/overtime/overtime_show/"+id // iframe的url
	});
}
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
	$('#exampleTable_1').bootstrapTable('refresh');
}
function add() {
	layer.open({
		type : 2,
		title :' ',
		/*title : '新增加班信息',*/
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '1000px', '550px' ],
		content : prefix + '/add' // iframe的url
	});
}
function edit(id) {
	layer.open({
		type : 2,
		title : '编辑加班信息',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/edit/' + id // iframe的url
	});
}
function remove(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix+"/remove",
			type : "post",
			data : {
				'id' : id
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
	var can_delete=true;
	var table = 'exampleTable';
    if(!$("#tab-1").hasClass("active")){
    	table = "exampleTable_1";
    }
	var rows = $('#'+table).bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据");
		return;
	}
	$.each(rows, function(i, row) {
		console.log(row['status']);
		if(row['status']!=0){
			layer.msg("不能删除已审核的加班。");
			can_delete=false;
		}
	});
	if(can_delete==false){
		return false;
	}
	layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
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
	}, function() {

	});
}