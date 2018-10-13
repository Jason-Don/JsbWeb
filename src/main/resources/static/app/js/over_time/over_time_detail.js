$(document).ready(function() {
	init();
});

// 返回
function go_back() {
	window.history.go(-1);
}

function init(){
    $.ajax({
    	url : '/common/dict/list/jb_type',
        success : function(data) {
			//加载数据
			for (var i = 0; i < data.length; i++) {
				if(data[i].value == $("#jblx").val()){
					$("#jblxSelect").attr("value",data[i].name);
					break;
				}
			}
        }
    });
	
    $.ajax({
    	url : '/common/dict/list/jjqk_type',
        success : function(data) {
        	var html = "";
			//加载数据
			for (var i = 0; i < data.length; i++) {
				html += //'<label class="radio-inline"> <input name="jjqk" type="radio" value="'+data[i].value+'" id="jjqk'+i+'">'+data[i].name+'</input></label>'
				'<label><input type="radio" id="'+data[i].value+'" name="nycd" value="'+data[i].value+'" disabled/>'+data[i].name+'</label>'
			}
	        $("#jjqk_type").append(html);
	        
	    	var jjqk = $('#jjqk').val()
	    	$('#'+jjqk).attr("checked","checked");

        }
    });
}