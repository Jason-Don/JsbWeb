var prefix = "/activiti/task"
loadmain();
load_tab();
load_tab_2();
function show(processDefinitionId,processInstanceId){
	layer.open({
		type : 2,
		title : ' ',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '100%', '100%' ],
		content : "/activiti/task/trace/photo/"+processDefinitionId+'/'+processInstanceId
	});
}
function form(proId,id) {
    layer.open({
        type : 2,
        title : ' ',
        maxmin : true,
        shadeClose : false,
        area : [ '100%', '100%' ],
        content : prefix + '/form/'+ proId+'/'+id
    })
}
function loadmain() {
	$('#xwdt_online').bootstrapTable({
		method : 'get', // 服务器数据的请求方式 get or post
		url : "/blog/bContent/list", // 服务器数据的加载地址
		// showRefresh : true,
		// showToggle : true,
		showColumns : false,
		iconSize : 'outline',
//		toolbar : '#exampleToolbar',
//		striped : true, // 设置为true会有隔行变色效果
		dataType : "json", // 服务器返回的数据类型
		pagination : true, // 设置为true会在底部显示分页条
		singleSelect : false, // 设置为true将禁止多选
		pageSize : 1000, // 如果设置了分页，每页数据条数
		pageNumber : 1, // 如果设置了分布，首页页码
		sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
		queryParams : function(params) {
			return {
				limit : params.limit,
				offset : params.offset
			};
		},
		columns : [
			{
				field : 'title',
				title : '标题',
				width :320,
              	formatter:function (value,row,index) {
            		return '<a href="#" onclick="preview(\''+ row.cid+ '\')">'+row.title+'</a>';
           		}
        	},
			{
				visible : true,
				field : 'gtmModified',
				title : '最近修改时间'
			}
		]
	});
	$('#inform_online').bootstrapTable({
		method : 'get', // 服务器数据的请求方式 get or post
		url : "/oa/notify/selfList", // 服务器数据的加载地址
		iconSize : 'outline',
		dataType : "json", // 服务器返回的数据类型
		singleSelect : false, // 设置为true将禁止多选
		showColumns : false, // 是否显示内容下拉框（选择显示的列）
		sidePagination:"server",
		queryParams : function() {//只查出前五条
			return {
				limit : 5,
				offset :0
			};
		},
		columns : [
			{
				field : 'title',
				width: '60%',
				title : '标题',
				formatter:function (value,row,index) {
                    return '<a href="#" onclick="read(\''+ row.id+ '\')">'+row.title+'</a>';
                }
			},
			{
				//visible : false,
				field : 'createDate',
				title : '更新时间',
				formatter:function (value,row,index) {
					 return '<span style="font-size:14px;">'+row.createDate.substring(0,10)+'</span>';
				}  
			}
		]
	});
}
var businessKey="";
function history(id){
    businessKey = id;
    perContent = layer.open({
        type : 2,
        title : ' ',
//        title : '流转记录',
        maxmin : true,
        shadeClose : true, // 点击遮罩关闭层
        area : [ '800px', '520px' ],
        anim:3,                    //动画
        content : "/act/workflow/workflow_history" // iframe的url
    });
}
function read(id) {
	layer.open({
		type : 2,
		title : ' ',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : '/oa/notify/read/' + id/*, // iframe的url
		end : function(){tz_reLoad();}*/
	});
}
function preview(id) {
	window.open("/blog/open/post/"+id);   
}
function tz_reLoad() {
	$('#inform_online').bootstrapTable('refresh');
}
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}
function reDbLoad(){
	$('#exampleTable').bootstrapTable('refresh');
	$('#exampleTable2').bootstrapTable('refresh');
}

setInterval('reDbLoad()',1000*300);

function load_tab(){
	$('#exampleTable')
	.bootstrapTable(
		{
			method : 'get', // 服务器数据的请求方式 get or post
			url : prefix + "/todoList", // 服务器数据的加载地址
			iconSize : 'outline',
			toolbar : '#exampleToolbar',
			striped : true, // 设置为true会有隔行变色效果
			dataType : "json", // 服务器返回的数据类型
			pagination : true, // 设置为true会在底部显示分页条
			singleSelect : false, // 设置为true将禁止多选
			pageSize : 5, // 如果设置了分页，每页数据条数
			pageList:[5,10],
			pageNumber : 1, // 如果设置了分布，首页页码
			showColumns : false, // 是否显示内容下拉框（选择显示的列）
			sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者
			columns : [
				{
					field:'Number',
					title:'序号',
					align:'center',
					width:20,
					formatter:function(value,row,index){
						var pageSize=$('#exampleTable').bootstrapTable('getOptions').pageSize;
						var pageNumber=$('#exampleTable').bootstrapTable('getOptions').pageNumber;
						return index+1;
					}
				},
                {
                    field : 'title', // 列字段名
                    title : '任务名称' // 列标题
                },
                {
                    field : 'name',
                    title : '处理阶段'
                },
                {
                    field : 'executionId',
                    title : '流程图',
					formatter:function(value,row,index){
						return '<a class="btn btn-success btn-sm " onclick="show(\''+ row.processDefinitionId+'\',\''+row.processInstanceId+ '\')">跟踪</a>';
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

						var f = '<a class="btn btn-primary btn-sm " title="处理任务"  mce_href="#" onclick="form(\''
							+ row.processDefinitionId+'\',\''+row.id
							+ '\')">处理<i class="fa"></i></a> ';
						return f;
					}
				} ],
				formatNoMatches:function(){
					return "暂无待办工作……";
				},
		 		formatShowingRows: function (pageFrom, pageTo, totalRows) {
		 			return '总共 ' + totalRows + ' 条记录';
		 		}
		});
}

	function load_tab_2() {
		$('#exampleTable2')
			.bootstrapTable(
				{
					method : 'get', // 服务器数据的请求方式 get or post
					url : prefix + "/historyList", // 服务器数据的加载地址
					iconSize : 'outline',
					toolbar : '#exampleToolbar',
					striped : true, // 设置为true会有隔行变色效果
					dataType : "json", // 服务器返回的数据类型
					pagination : true, // 设置为true会在底部显示分页条
					pageList:[5,10],
					singleSelect :false, // 设置为true将禁止多选
					pageSize : 5, // 如果设置了分页，每页数据条数
					pageNumber : 1, // 如果设置了分布，首页页码
					showColumns : false, // 是否显示内容下拉框（选择显示的列）
					sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者
					columns : [
						{
							field:'Number',
							title:'序号',
							align:'center',
							width:20,
							formatter:function(value,row,index){
								var pageSize=$('#exampleTable2').bootstrapTable('getOptions').pageSize;
								var pageNumber=$('#exampleTable2').bootstrapTable('getOptions').pageNumber;
								return index+1;
							}
						},
	                    {
	                        field : 'title', // 列字段名
	                        title : '任务名称' // 列标题
	                    },
	                    {
	                        field : 'handleTime',
	                        title : '办理时间'
	                    },
	                    {
	                        field : 'executionId',
	                        title : '流程图',
							formatter:function(value,row,index){
								return '<a class="btn btn-success btn-sm " onclick="show(\''+ row.processDefinitionId+'\',\''+row.processInstanceId+ '\')">跟踪</a>';	                    
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
						} ],
						formatNoMatches:function(){
							return "暂无已办工作……";
						},
				 		formatShowingRows: function (pageFrom, pageTo, totalRows) {
				 			return '总共 ' + totalRows + ' 条记录';
				 		}
				});	
	}
	function ck(detailURL){
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
	function add_workflow() {
		layer.open({
			type : 2,
			title : ' ',
			maxmin : true,
			shadeClose : false, // 点击遮罩关闭层
			area : [ '1000px', '560px' ],
			content : "/act/workflow/workflow_add" // iframe的url
		});
	}
	function add_overtime() {
		layer.open({
			type : 2,
			title : ' ',
			maxmin : true,
			shadeClose : false, // 点击遮罩关闭层
			area : [ '1000px', '550px' ],
			content : '/activiti/overtime/add' // iframe的url
		});
	}
	function add_notify() {
		layer.open({
			type : 2,
			title : ' ',
			maxmin : true,
			shadeClose : false, // 点击遮罩关闭层
			area : [ '800px', '520px' ],
			content : '/oa/notify/add' // iframe的url
		});
	}
	function more_notifies(){
		var open_notifies_list=parent.open_notifies_list;
		open_notifies_list.click();
	}