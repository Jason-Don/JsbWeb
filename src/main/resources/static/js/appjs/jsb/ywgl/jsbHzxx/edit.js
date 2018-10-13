$().ready(function() {
	document.getElementById('file').onchange = function() {
	    var imgFile = this.files[0];
	    var fr = new FileReader();
	    fr.onload = function() {
	        document.getElementById('p2-pic').src = fr.result;
	    };
	    fr.readAsDataURL(imgFile);
	};
	//选择时间
	laydate({
		elem : "#yjdbtimeid", // 选择ID为startTime的input
		format : "YYYY-MM-DD", // 自动生成的时间格式
		min : "1970-01-01", // 设定最小日期
		max : laydate.now(0), // 最大日期
		// start:laydate.now(0), //设置开始时间为当前时间
		istime : true, // 必须填入时间
		istoday : false, // 是否是当天
		choose:function(datas){
			end.min = datas; // 开始日选好后,重置结束日的最小日期
			end.start = datas; // 将结束日的初始值设定为开始日
		}
	});
	//是否核查,如果已经核查则显示已核查的图片
	$('#ispcid').change(function(){
		var ischecked = $(this).prop("checked");
		if(ischecked){
			$("#checkAlready").removeClass('hideDiv');
		}else{
			$("#checkAlready").addClass('hideDiv');
		}
	})
	validateRule();
//	console.log($("#sfzh").val()); //页面传递的参数
	if($("#sfzh").val()==''){//如果加载页面时没有获取到th:value带过来的身份证号，则该页面不是“核查”页面，默认为“新增”页面
		document.getElementById("sfzh").onkeyup=function(){
			if($("#sfzh").val().length==18){
				$.ajax({
					url:'/ywgl/ishave/'+$("#sfzh").val(),
					success:function(result){
						if(result>0){
							layer.alert("该患者信息已经存在于系统中，无需再录入。");
						}	
					}
				});
			}
		};
	}
});
function hover_hover(){
	layer.tips(
		'0级  无符合以下1-5级中的任何行为。 <br>'+
		'1级  口头威胁、喊叫，但没有打砸行为。 <br>'+
		'2级  有打砸行为，局限在家里，针对财物，能被劝说制止。 <br>'+
		'3级  有明显的打砸行为，不分场合，针对财物，不能接受劝说而停止。 <br>'+
		'4级  有持续的打砸行为，不分场合，针对财物或人，不能接受劝说而停止。 <br>'+
		'5级  有持管制器具针对人的任何暴力行为，或者有纵火、爆炸等行为，无论在家里还是公共场合。 ',
		'#tiptip', 
		{tips: [1, '#478FCA'], time: 10000, area: 'auto'}
	);
}
//获取案件数
function getYaymnum(){
	var num = 1;
	layer.confirm("发现案件数" + num + "起，是否自动填入?", {
        btn: ['确定', '取消']
    }, function() {
 		layer.msg("填入成功");
    }, function() {
    	
    });
}
//案件列表
function getYaymlist(){
	
}


$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/ywgl/jsbHzxx/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);
			} else {
				parent.layer.alert(data.msg)
			}
		}
	});

}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			name : {
				required : true
			}
		},
		messages : {
			name : {
				required : icon + "请输入名字"
			}
		}
	})
}

function getMsg(){
	$.ajax({
		url:"/ywgl/getPerInfo/"+$("#sfzh").val(),
		success:function(result){
			//alert(result);
			var hz=JSON.parse(result);
			$("#hzxm").val(hz['xm']);
			$("#hjdz").val(hz['jgssx_dic']);
		}
	});
}