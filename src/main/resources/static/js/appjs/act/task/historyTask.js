var prefix = "/activiti/task"
$(function() {
	load2();
});

function load2() {
	$('#exampleTable2')
		.bootstrapTable(
			{
				method : 'get', // 服务器数据的请求方式 get or post
				url : prefix + "/historyList", // 服务器数据的加载地址
				// showRefresh : true,
				// showToggle : true,
				// showColumns : true,
				iconSize : 'outline',
				toolbar : '#exampleToolbar',
				striped : true, // 设置为true会有隔行变色效果
				dataType : "json", // 服务器返回的数据类型
				pagination : true, // 设置为true会在底部显示分页条
				// queryParamsType : "limit",
				// //设置为limit则会发送符合RESTFull格式的参数
				singleSelect : false, // 设置为true将禁止多选
				// contentType : "application/x-www-form2-urlencoded",
				// //发送到服务器的数据编码类型
				pageSize : 10, // 如果设置了分页，每页数据条数
				pageNumber : 1, // 如果设置了分布，首页页码
				// search : true, // 是否显示搜索框
				showColumns : false, // 是否显示内容下拉框（选择显示的列）
				sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者
				// "server"
				queryParams : function(params) {
					return {
						// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
						limit : params.limit,
						offset : params.offset,
						name : $('#searchName').val(),
					};
				},
				// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
				// queryParamsType = 'limit' ,返回参数必须包含
				// limit, offset, search, sort, order 否则, 需要包含:
				// pageSize, pageNumber, searchText, sortName,
				// sortOrder.
				// 返回false将会终止请求
				columns : [
					/*{
						checkbox : true
					},*/
                    /*{
                        field : 'id', // 列字段名
                        title : '任务id' // 列标题
                    },
                    {
                        field : 'key', // 列字段名
                        title : '任务key' // 列标题
                    },
                    {
                        field : 'processInstanceId', // 列字段名
                        title : '流程编号processInstanceId' // 列标题
                    },
                    {
                        field : 'processDefinitionId', // 列字段名
                        title : '流程定义编号processDefinitionId' // 列标题
                    },
                    {
                        field : 'executionId', // 列字段名
                        title : 'executionId' // 列标题
                    }, 
                    {
                        field : 'processId', // 列字段名
                        title : 'processId' // 列标题
                    }, 
                    {
                        field : 'businessKey', // 列字段名
                        title : '任务代码' // 列标题
                    },*/
					{
						field:'Number',
						title:'序号',
						align:'center',
						width:20,
						formatter:function(value,row,index){
							var pageSize=$('#exampleTable2').bootstrapTable('getOptions').pageSize;
							var pageNumber=$('#exampleTable2').bootstrapTable('getOptions').pageNumber;
							//alert(index);
							return index+1;
						}
					},
                    {
                        field : 'title', // 列字段名
                        title : '任务名称' // 列标题
                    },
                    /*{
                        field : 'name',
                        title : '处理阶段'
                    },*/
                    {
                        field : 'handleTime',
                        title : '办理时间'
                    },
                    {
                        field : 'executionId',
                        title : '流程图',
						formatter:function(value,row,index){
							//processId 
							//processInstanceId sub N
							//executionId sub N
							return '<a class="btn btn-success btn-sm " onclick="show(\''+ row.processDefinitionId+'\',\''+row.processInstanceId+ '\')">跟踪</a>';
                        	//return '<a class="btn btn-success btn-sm " href="/activiti/task/trace/photo/'+row.processDefinitionId+'/'+row.processInstanceId+'">跟踪</a>';
						}
                    },
                    {
                        field : 'id',
                        title : '流转记录',
                        formatter:function (value,row,index) {
                            return '<span class="btn btn-success btn-sm " onclick="history(\''+ row.businessKey+ '\')">查看</span>';
                        }
                    },
					{
						title : '操作',
						field : 'id',
						align : 'center',
						formatter : function(value, row, index) {
							var detailURL = '';
							if(row.title == '加班申请'){
								detailURL = '/activiti/overtime/overtime_show/'+ row.businessKey;
							}else{
								detailURL = '/act/workflow/workflow_show/'+ row.businessKey;
							}
							var f = '<span class="btn btn-success btn-sm" title="详情"  mce_href="#" onclick="ck(\''
								+ detailURL
								+ '\')">详情</span> ';
						return f;
						}
					} ]
			});
}

var businessKey="";
function history(id){
    businessKey = id;
    perContent = layer.open({
        type : 2,
        title :' ',
//        title : '流转记录',
        maxmin : true,
        shadeClose : true, // 点击遮罩关闭层
        area : [ '800px', '520px' ],
        anim:3,                    //动画
        content : "/act/workflow/workflow_history" // iframe的url
    });
}

function ck(detailURL){
	//alert(id);
	perContent=layer.open({
		type : 2,
		title : ' ',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		anim:3,                    //动画
		content : detailURL // iframe的url
	});
	layer.full(perContent);
}
function show(processDefinitionId,processInstanceId){
	layer.open({
		type : 2,
		title :' ',
//		title : '跟踪',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '100%', '100%' ],
		content : "/activiti/task/trace/photo/"+processDefinitionId+'/'+processInstanceId
	});
}
function reLoad2() {
	$('#exampleTable2').bootstrapTable('refresh');
}
/*function add() {
	// iframe层
	var page = layer.open({
		type : 2,
		title : '新建模型',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/add'
	});
    layer.full(page);
}*/
/*function remove(id) {
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
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad2();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	})
}*/
/*function edit(id) {
	layer.open({
		type : 2,
		title : '修改模型',
		maxmin : true,
		shadeClose : false,
		area : [ '800px', '520px' ],
		content : prefix + '/edit/' + id
	});
	layer.full(page);
}*/

function form2(proId,id) {
    layer.open({
        type : 2,
        title : '发起流程',
        maxmin : true,
        shadeClose : false,
        area : [ '100%', '100%' ],
        content : prefix + '/form/'+ proId+'/'+id
    })
}

/*function batchRemove() {
	var rows = $('#exampleTable2').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据");
		return;
	}
	layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var ids = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			ids[i] = row['userId'];
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
					reLoad2();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {});
}*/
