var setting = {
	check : {
		enable : true
	},
	data : {
		simpleData : {
			enable : true
		}
	},
	view : {
		selectedMulti : false,
		dblClickExpand : false,
	},
	callback : {
		onClick : onNodeClick
	//				onRightClick:onRightClick,
	//				onExpand:onExpand,//节点展开事件
	//				onCollapse:onCollapse //节点折叠事件
	}
};
var zNodes=[];
$.ajax({
	type : "GET",
	url : "/sys/user/tree",
	success : function(tree) {
		//alert(JSON.stringify(tree));
		traverseTree(tree);
		//alert(JSON.stringify(json_users));
		zNodes = json_users;
		init();
	}
});
var show_type = "0";
var code;
function init1() {
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.setting.check.chkboxType = {
		"Y" : "ps",
		"N" : "ps"
	};

	var nodes = zTree.getNodes();
	var Nodes = zTree.transformToArray(nodes);//获取所有节点
	if (Nodes.length > 0) {
		for (var i = 0; i < Nodes.length; i++) {
			if (Nodes[i].type == "0") {
				Nodes[i].iconOpen = "../js/car/img/person_more.png";
				Nodes[i].iconClose = "../js/car/img/person_more.png";
				Nodes[i].icon = "../js/car/img/person_more.png";
				zTree.updateNode(Nodes[i]);
			} else if (Nodes[i].type == "1") {
				Nodes[i].icon = "../js/car/img/person_one.png";
				zTree.updateNode(Nodes[i]);
			}
		}
	}
}
function init() {
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.setting.check.chkboxType = {
		"Y" : "ps",
		"N" : "ps"
	};

	var nodes = zTree.getNodes();
	var Nodes = zTree.transformToArray(nodes);//获取所有节点
	if (Nodes.length > 0) {
		for (var i = 0; i < Nodes.length; i++) {
			if (Nodes[i].type == "0") {
				Nodes[i].iconOpen = "../js/car/img/person_more.png";
				Nodes[i].iconClose = "../js/car/img/person_more.png";
				Nodes[i].icon = "../js/car/img/person_more.png";
				zTree.updateNode(Nodes[i]);
			} else if (Nodes[i].type == "1") {
				Nodes[i].icon = "../js/car/img/person_one.png";
				zTree.updateNode(Nodes[i]);
			}
		}
	}
	//			zTree.expandAll(true);
	//			zTree.expandAll(false);
}

//	单击跳转到个人信息页面
function onNodeClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj(treeId);
	zTree.expandNode(treeNode);
	if (treeNode.type == 1) {
		window.location ="/app/user/userdetail/"+treeNode["id"];
	}
}
//根据文本框的关键词输入情况自动匹配树内节点，进行模糊查找。
function AutoMatch(txtObj) {
	if (txtObj.value.length > 0) {
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		//Ztree模糊匹配
		var nodeList = zTree.getNodesByParamFuzzy("name", txtObj.value);
		//将找到的nodeList节点更新至Ztree内
		$.fn.zTree.init($("#treeDemo"), setting, nodeList);

		var nodes = zTree.getNodes();
		var Nodes = zTree.transformToArray(nodes);//获取所有节点
		if (Nodes.length > 0) {
			for (var i = 0; i < Nodes.length; i++) {
				if (Nodes[i].type == "0") {
					Nodes[i].iconOpen = "../js/car/img/person_more.png";
					Nodes[i].iconClose = "../js/car/img/person_more.png";
					Nodes[i].icon = "../js/car/img/person_more.png";
					zTree.updateNode(Nodes[i]);
				} else if (Nodes[i].type == "1") {
					Nodes[i].icon = "../js/car/img/person_one.png";
					zTree.updateNode(Nodes[i]);
				}
			}
		}
	} else {
		//				$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		//				var zTree=$.fn.zTree.getZTreeObj("treeDemo");
		init1();
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		var nodes = zTree.getNodes();
		var Nodes = zTree.transformToArray(nodes);//获取所有节点
		if (Nodes.length > 0) {
			for (var i = 0; i < Nodes.length; i++) {
				if (Nodes[i].type == "0") {
					Nodes[i].iconOpen = "../js/car/img/person_more.png";
					Nodes[i].iconClose = "../js/car/img/person_more.png";
					Nodes[i].icon = "../js/car/img/person_more.png";
				}
				if (Nodes[i].type == "1") {
					Nodes[i].icon = "../js/car/img/person_one.png";
					zTree.updateNode(Nodes[i]);
				}
			}
		}
	}
}
//	返回
function go_back() {
	window.history.go(-1);
}
//递归遍历json嵌套树
var json_users = [];
var dept_id = "";
function traverseTree(node) {
	if (!node) {
		return;
	}
	if (node['hasChildren'] == false) {
		json_users.push({
			id : node['id'],
			pId : node['parentId'],
			name : node["text"],
			checked : true,
			type : 1
		});
		//alert(JSON.stringify(node));
	} else if (node.children && node.children.length > 0) {
		var i = 0;
		json_users.push({
			id : node['id'],
			pId : node['parentId'],
			name : node["text"],
			checked : true,
			type : 0
		});
		dept_id = node['id'];
		for (i = 0; i < node.children.length; i++) {
			this.traverseTree(node.children[i]);
		}
	}
}