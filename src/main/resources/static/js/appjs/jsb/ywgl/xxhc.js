var prefix = "/ywgl"
$(function() {
	
	$.ajax({
        type: 'POST',
        data: {
            "type": 'station'
        },
        url: '/common/organization/list',
        success: function(result) {
        	if(result!=null && result.rows!=null && result.rows.length>0){
    			zNodes1 = result.rows ;
    			$.fn.zTree.init($("#treeDemo1"), setting1, zNodes1);
    		}else{
    			layer.alert('数据加载失败，请刷新页面重试!',{
    				skin:'layui-layer-molv',
    				closeBtn:0
    			});
    		}
        }
    });
    //页面加载完成进行搜索
    reLoad(); 
});

//表格查询
function reLoad() {
	$('#exampleTable')
	.bootstrapTable(
			{
				method : 'get', // 服务器数据的请求方式 get or post
				url : prefix + "/list", // 服务器数据的加载地址
				showRefresh : true,
				showToggle : true,
				showColumns : true,
				icons: {
					refresh: 'glyphicon-repeat',
					toggle: 'glyphicon-list-alt',
					columns: 'glyphicon-list'
				},
				toolbar : '#exampleToolbar',
				striped : true, // 设置为true会有隔行变色效果
				dataType : "json", // 服务器返回的数据类型
				pagination : true, // 设置为true会在底部显示分页条
				onClickRow: onClickRow,
				onDblClickRow: onDblClickRow,//双击进入核查
				checkToSelect: false,
				// queryParamsType : "limit",   //设置为limit则会发送符合RESTFull格式的参数
				singleSelect : false, // 设置为true将禁止多选
				// contentType : "application/x-www-form-urlencoded",   //发送到服务器的数据编码类型
				pageSize : 10, // 如果设置了分页，每页数据条数
				pageNumber : 1, // 如果设置了分布，首页页码
				//search : true, // 是否显示搜索框
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
				onLoadSuccess: function(data){  //加载成功时执行
					if(data.rows == null && data.total == 0){
						$("#exampleTable").bootstrapTable('removeAll');
					}
					$("#exampleTable").bootstrapTable('hideLoading');//隐藏加载
				},
				onLoadError:function(state){
					$("#exampleTable").bootstrapTable('hideLoading');//隐藏加载
				}
				// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
				// queryParamsType = 'limit' ,返回参数必须包含
				// limit, offset, search, sort, order 否则, 需要包含:
				// pageSize, pageNumber, searchText, sortName,
				// sortOrder.
				// 返回false将会终止请求
			});
}
function sfzhFormatter(value, row, index){
	var zjhm = row.sfzh
	var ysryHtml='<div>'
        +'<u>'
            +'<a href="http://10.136.213.16/cert/da.jsp?key=ry&val=A'+zjhm+'" target=\"_blank\">'
               +zjhm
            +'</a>'
        +'</u>'
      +'<div>';
	return ysryHtml;
}
function hzxmFormatter(value, row, index){
	var hzxm = row.hzxm;
	var ysryHtml='<div>'
            +'<a onclick="pgispoints(\''+row.lng+'\',\''+row.lat+'\')" target=\"_blank\">'
               +hzxm+'<img src="/images/location_gps.png" />'
            +'</a>'
      +'<div>';
	if(row.lng > 0 && row.lat > 0){
		return ysryHtml;
	}else{
		return hzxm;
	}
}
function pgispoints(lng,lat){
	data = {
			jd : lng,
			wd : lat
	};
	layer.open({
        type: 2,
        title: '患者所在地点展示',
        maxmin: true,
        shadeClose: false, // 点击遮罩关闭层
        area: ['1000px', '560px'],
        content: prefix + '/pgis' // iframe的url
    });
}
//操作(核查)
function operate(value, row, index){
	var f = '<a class="btn btn-success btn-sm" title="备用"  mce_href="#" onclick="checkQuery(\''
		+ row.id
		+ '\')">核查</a> ';//<i class="fa fa-key"></i>
	return f ;
}
//是否评估
function ispg(value, row, index){
	if(value=='1'){
		return '<span style="color:black;">是</span>';
	}else{
		return '<span style="color:green;">否</span>';
	}
}
//是否重点患者
function iszd(value, row, index){
	if(value=='1'){
		return '<span style="color:red;">是</span>';
	}else{
		return '<span style="color:green;">否</span>';
	}
}
//是否在控
function iszk(value, row, index){
	if(value=='1'){
		return '<span style="color:green;">是</span>';
	}else{
		return '<span style="color:red;">否</span>';
	}
}
//双击行进入核查
function onDblClickRow(row,ele){
	console.log(row);
	checkQuery(row.id);
}
//单个点击事件
function onClickRow(row,ele){
//	$(ele).find('input').click();
	$(ele).children("td").eq(0).find("input").click();
}
//核查
function checkQuery(id){
	layer.full(layer.open({
        type: 2,
        title: '核查',
        maxmin: false,
        shadeClose: false, // 点击遮罩关闭层
        area: ['800px', '520px'],
        content: prefix + '/hc/'+id, // iframe的url
        btn: ['保存','取消'],
        yes: function(index,layero){
        	layer.close(index);
        },
        btn2: function(index,layero){
        	layer.close(index);
        }
    }));
}
//新增
function add() {
	layer.full(layer.open({
        type: 2,
        title: '增加',
        maxmin: false,
        shadeClose: false, // 点击遮罩关闭层
        area: ['800px', '520px'],
        content: prefix + '/add' // iframe的url
    }));
}
//退回
function reject(id){
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
    if (rows.length == 0) {
        layer.msg("请选择要回退的数据");
        return;
    }
    layer.confirm("确认要回退选中的'" + rows.length + "'条数据吗?", {
        btn: ['确定', '取消']
    // 按钮
    }, function() {
        var ids = new Array();
        // 遍历所有选择的行数据，取每条数据对应的ID
        $.each(rows, function(i, row) {
            ids[i] = row['id'];
        });
        //将选中 的数据通过ajax回退到之前传递下来的机关
        reLoad();
        layer.msg("回退成功");
    }, function() {
    
    });
}
function remove(id) {
    layer.confirm('确定要删除选中的记录？', {
        btn: ['确定', '取消']
    }, function() {
        $.ajax({
            url: prefix + "/remove",
            type: "post",
            data: {
                'id': id
            },
            success: function(r) {
                if (r.code == 0) {
                    layer.msg(r.msg);
                    reLoad();
                } else {
                    layer.msg(r.msg);
                }
            }
        });
    })
}


function batchRemove() {
    var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
    if (rows.length == 0) {
        layer.msg("请选择要删除的数据");
        return;
    }
    layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
        btn: ['确定', '取消']
    // 按钮
    }, function() {
        var ids = new Array();
        // 遍历所有选择的行数据，取每条数据对应的ID
        $.each(rows, function(i, row) {
            ids[i] = row['id'];
        });
        $.ajax({
            type: 'POST',
            data: {
                "ids": ids
            },
            url: prefix + '/batchRemove',
            success: function(r) {
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


//表格初始化方式2
function load() {
    $('#exampleTable').bootstrapTable({
        method: 'get', // 服务器数据的请求方式 get or post
        url: prefix + "/list", // 服务器数据的加载地址
    	showRefresh : true,
    	showToggle : true,
    	showColumns : true,
        iconSize: 'outline',
        toolbar: '#exampleToolbar',
        striped: true, // 设置为true会有隔行变色效果
        dataType: "json", // 服务器返回的数据类型
        pagination: true, // 设置为true会在底部显示分页条
        // queryParamsType : "limit",
        // //设置为limit则会发送符合RESTFull格式的参数
        singleSelect: false, // 设置为true将禁止多选
        // contentType : "application/x-www-form-urlencoded",
        // //发送到服务器的数据编码类型
        pageSize: 10, // 如果设置了分页，每页数据条数
        pageNumber: 1, // 如果设置了分布，首页页码
        search : true, // 是否显示搜索框
        showColumns: true, // 是否显示内容下拉框（选择显示的列）
        sidePagination: "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
        queryParams: function(params) {
            return {
                //说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
                limit: params.limit,
                offset: params.offset
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
        columns: [
            {
                checkbox: true
            }, 
            {
                field: 'id',
                title: 'ID'
            }, 
            {
                field: 'sfzh',
                title: '身份证号'
            }, 
            {
                field: 'hzxm',
                title: '患者姓名'
            }, 
            {
                field: 'xzdz',
                title: '现住地址'
            }, 
//该项数据暂无，不予显示
//            {
//                field: 'firsttime',
//                title: '初次发病时间'
//            }, 
            {
                field: 'zdlx',
                title: '疾病诊断类型'
            }, 
//该项数据暂无，不予显示
//            {
//                field: 'bgdw',
//                title: '报告单位'
//            }, 
            {
                field: 'szyy',
                title: '最后收治医院'
            }, 
            {
                field: 'jhrxm',
                title: '监护人姓名'
            }, 
            {
                field: 'jhrdh',
                title: '监护人电话'
            }, 
            {
                field: 'jhrgx',
                title: '监护人关系'
            }, 
            {
                field: 'jyaq',
                title: '简要情况'
            }, 
            {
                field: 'zs',
                title: '肇事'
            }, 
            {
                field: 'zh',
                title: '肇祸'
            }, 
            {
                field: 'fxdj',
                title: '风险等级'
            }, 
            {
                field: 'ispg',
                title: '是否评估',
                formatter: function(value) {
                    if (value == '1')
                        return '<span style="color:black;">是</span>';
                    else
                        return '<span style="color:green;">否</span>';
                }
            }, 
            {
                field: 'iszd',
                //									title : '是否纳入重大敏感节点重点患者' 
                title: '是否重点患者',
                formatter: function(value) {
                    if (value == '1')
                        return '<span style="color:red;">是</span>';
                    else
                        return '<span style="color:green;">否</span>';
                }
            }, 
            {
                field: 'iszk',
                title: '是否在控',
                formatter: function(value) {
                    if (value == '1')
                        return '<span style="color:green;">是</span>';
                    else
                        return '<span style="color:red;">否</span>';
                }
            }, 
            {
            	  field: 'hjpcs',
                  title: '户籍派出所',
            },
            {
                field: 'hjpcsjgdm',
                title: '户籍派出所机构代码',
                visible:false //机构代码隐藏起来
            }, 
            {
          	  field: 'xzpcs',
                title: '现住派出所',
            },
            {
                field: 'xzpcsjgdm',
                title: '现住派出所机构代码',
                visible:false //机构代码隐藏起来
            }, 
            {
                title: '操作',
                field: 'id',
                align: 'center',
                formatter: function(value, row, index) {
                    var e = '<a class="btn btn-primary btn-sm ' + s_edit_h + '" href="#" mce_href="#" title="编辑" onclick="edit(\'' 
                    + row.id 
                    + '\')"><i class="fa fa-edit"></i></a> ';
                    var d = '<a class="btn btn-warning btn-sm ' + s_remove_h + '" href="#" title="删除"  mce_href="#" onclick="remove(\'' 
                    + row.id 
                    + '\')"><i class="fa fa-remove"></i></a> ';
                    var f = '<a class="btn btn-success btn-sm" href="#" title="备用"  mce_href="#" onclick="hc(\'' 
                    + row.id 
                    + '\')"><i class="fa fa-key"></i>核查</a> ';
                    return f;
                }
            }]
    });
}

function showMenu(flag) {
	if(flag){
		var cityObj = $("#citySel1");
		var cityOffset = $("#citySel1").offset();
		$("#menuContent1").css({left:cityOffset.left + "px", top:cityOffset.top+ cityObj.outerHeight()/2 + "px"}).slideDown("fast");
		$("body").bind("mousedown", onBodyDown1);
	}else{
		var cityObj = $("#citySel");
		var cityOffset = $("#citySel").offset();
		$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top+ cityObj.outerHeight()/2 + "px"}).slideDown("fast");
		$("body").bind("mousedown", onBodyDown);
	}
}
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}