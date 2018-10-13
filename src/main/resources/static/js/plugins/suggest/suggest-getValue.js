/**
 * @author zhangf 20180807
 * @description bootstrap-suggest用于选中后获取值的解决方法
 * @param id1 bootstrap-suggest插件位置
 * @param id2 存放value位置
 * @param jsonArray 
 */
function setSuggestData(id1,id2,jsonArray){
	$("#"+id1).bsSuggest({
		data:{
			"value":jsonArray
		},
		idField:"value",
		keyField:"key",
		effectiveFields : ['key'] //有限显示的字段
   	}).on("onDataRequestSuccess",function(e,result){//ajax请求数据成功是触发----暂时没用到
		//console.log(result);
	}).on("onSetSelectValue",function(e,keyword){//选中触发
		//console.log(keyword.id);
		$('#'+id2).val(keyword.id);
	}).on("onUnsetSelectValue",function(e){//输入触发
		//console.log("3333="+e);
		$('#'+id2).val('');
	});
}
/**
 * 例子：
 */
function example(data) {
	// 装载数据
	var jsonArray = [];
	for (var i = 0; i < data.length; i++) {
		/*html += '<option value="' + data[i].value + '">' + data[i].name
				+ '</option>'*/
		var obj = {};
		obj.key = data[i].name;
		obj.value = data[i].value;
		jsonArray.push(obj)
	}
	//调用方法
	setSuggestData('jblxSelect','jblx',jsonArray)
}
/**
 * html页面所需
 * input1: 用于存放提交表单的数值
 * input2: 用于bootstrap-suggest插件
 */
//<div class="input-group">
//<input id="input1" name="input1" class="hidden"/>
//<input class="form-control no_bg same_border" id="input2" autocomplete="off" type="text">
//<div class="input-group-btn">
//	<button type="button" class="btn btn-white dropdown-toggle same_border" data-toggle="">
//		<span class="caret"></span>
//	</button>
//	<ul class="dropdown-menu dropdown-menu-right same_border" role="menu">
//	</ul>
//</div>
//</div>