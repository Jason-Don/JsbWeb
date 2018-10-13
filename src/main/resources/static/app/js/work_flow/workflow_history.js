var businessKey = "";
$(function() {
    businessKey = $("#workflow_id").val();
    $('#exampleTable').bootstrapTable({
		iconSize : 'outline',
		queryParams : 'queryParams',
		icons : {
			refresh : 'glyphicon-repeat',
			toggle : 'glyphicon-list-alt',
			columns : 'glyphicon-list'
		}
	});
	init();
	check_tab();
});
var result = [];
function init(){
    $.ajax({
        url : "/act/workflow/history/"+businessKey,
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
	$('#exampleTable').bootstrapTable('load', result.rows);
}
//表格操作
function operate_td(value, row, index){
	var div = 
		'<div class="td_div">'+
		'	<div class="operate_div">'+
		'		<div class="msg_div">'+
		'			<div class="hide_div checkbox_div">'+
		'				<input class="is_input" type="checkbox">'+
		'			</div>'+
		'			<div>'+
		'				<div class="msg_type_1">'+row.title+'</div>'+
		'				<div class="msg_title">'+row.assigneeName+'</div>'+
		'				<div class="msg_title">'+row.comment+'</div>'+
		'				<div class="msg_type_2">'+row.endTime+'</div>'+
		'				<span class="hide_div id_span">'+row.id+'</span>'+
		'			</div>'+
		'			<div>'+row.czType+'</div>'+
		'		</div>'+
		'	</div>'+
		'</div>';
	return div;
}
function go_back() {
//	window.location = "/app/index";
	window.history.go(-1);
}
