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
        	console.log(data);
        	var html = "";
			//加载数据
			for (var i = 0; i < data.length; i++) {
				html += //'<label class="radio-inline"> <input name="jjqk" type="radio" value="'+data[i].value+'" id="jjqk'+i+'">'+data[i].name+'</input></label>'
				'<label><input type="radio" id="'+data[i].value+'" name="nycd" value="'+data[i].value+'" disabled/>'+data[i].name+'</label>'
			}
			console.log(html);
	        $("#jjqk_type").append(html);
	        
	    	var jjqk = $('#jjqk').val()
	    	$('#'+jjqk).attr("checked","checked");

        }
    });
}

function pass(){
    $.ajax({
        cache : true,
        type : "POST",
        url :"/activiti/overtime/sh_pass",
        data : $('#add_form').serialize(),
        async : false,
        error : function(request) {
            laryer.msg("Connection error");
        },
        success : function(data) {
            if (data.code == 0) {
            	//layer.confirm("提交成功!",{btn:['确定']},function(){go_back()})
            	layer.msg("审核完成!");
            	go_back();
            } else {
                layer.msg(data.msg)
            }
        }
    });
}
function reject(){
    $.ajax({
        cache : true,
        type : "POST",
        url :"/activiti/overtime/sh_reject",
        data : $('#add_form').serialize(),
        async : false,
        error : function(request) {
            laryer.msg("Connection error");
        },
        success : function(data) {
            if (data.code == 0) {
            	layer.msg("审核完成!");
            	go_back();
            } else {
                layer.msg(data.msg)
            }
        }
    });
}