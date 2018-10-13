var fileID = null;
$(function() {
	var rwkssj = dateToGMT($('#rwkssj').val());
	$('#startTime').html(rwkssj);
	if($('#rwwcsj').val()){
		var rwwcsj =dateToGMT($('#rwwcsj').val());
		$('#endTime').html(rwwcsj);
	}else{
		$('#endTime').html("尚未选择");
	}
	
	var nycd = $('#nycd').val();
	if (nycd == 'JD')
		$('#nycdtext').html("简单");
	else if (nycd == 'ZC')
		$('#nycdtext').html("正常");
	else if (nycd == 'Nan')
		$('#nycdtext').html("难");
	else
		$('#nycdtext').html("尚未评判");
	//show_detail_msg();
	var rwly = $('#rwly').val();
	$.ajax({
		url : '/common/dict/list/rwly?sortBy=sort',
		success : function(data) {
			//加载数据
			for (var i = 0; i < data.length; i++) {
				if (data[i].value == rwly) {
					$("#rwlytext").html(data[i].name);
					break;
				}
			}
			if ($("#rwlytext").html() == "")
				$("#rwlytext").html(rwly);
		}
	});
	var id = $("#id").val();
	$.ajax({
		url : '/act/workflow/loadFkInfo/' + id,
		method : 'get',
		dataType : 'json',
		success : function(data) {
			var html = "";
			var data_length = data.length;
			if(data_length == 0){
				$(' .is_fk').addClass('hide_div');
			}else{
				for (var i = 0; i < data.length; i++) {
					is_fk = true;//有反馈数据 显示div
					html += 
						'<div class="more_div_pj msg_div deal_admin_div"><div>承办人处理 &nbsp;&nbsp;&nbsp;'+data[i].cjsj+'</div></div>'+
						'<div class="msg_div more_div_pj">'+
						'	<label class="label_left">承办人员:</label>'+
						'	<span class="long_span" readonly="readonly">'+data[i].cbryMc+'</span>'+
						'</div>'+
						'<div class="msg_div more_div_pj">'+
						'	<label class="label_left">反馈详情:</label>'+
						'	<span class="long_span" readonly="readonly">'+data[i].fkqksm+'</span>'+
						'</div>'+
						'<div class="msg_div more_div_pj">'+
						'	<label class="label_left">反馈附件:</label>'+
						'	<a onclick="downloadFileById(\''+ data[i].fileId+ '\')">'+data[i].fileMc+'</a>'+
						'</div>';
				}
			}
			$("#fkDiv").append(html);
		}
	});
	var startNum = $('.fenshu').text();
	$("#start"+startNum).addClass("clibg");//显示星星
});
//	展示详情信息
/*function show_detail_msg(){
	$("#star_score").children("a").eq(3).addClass("clibg");
	$("#fenshu").text(4);
	$("#startTime").val("2018-07-18 12:32:23");
	$("#endTime").val("2018-07-19 12:32:23");
	$("#select_1").prev().text("厅党委交办");
	$("#cjryMc").val("李四");
	$("#taskName").val("认为名称A号");
	$("#rwzpryMc").val("张三，李四");
	$("#rwnr").val("任务内容发生发放");
	$("#blyj").val("任务内容发生发放");
	$("#rwnr").val("任务内容发生发放");
	$("#rwnr").val("任务内容发生发放");
	$("#wcqkpj").val("任务内容发生发放");
}*/
//	返回
function go_back() {
	window.history.go(-1);
}
fileID = $("#files").val();
$("#down").attr('href','/common/sysFile/downloadFile/'+ fileID);
//	下载文件
function downloadFile() {
	location.href ="/common/sysFile/downloadFile/" + fileID;
}
function downloadFileById(id) {
	location.href = "/common/sysFile/downloadFile/" + id;
}
//	星星评价
scoreFun(
	$("#starttwo"), 
	{
		fen_d : 22,//每一个a的宽度
		ScoreGrade : 5//a的个数 10或者
	}
);
//显示分数
$(".show_number li p").each(function(index, element) {
	var num = $(this).attr("tip");
	var www = num * 2 * 16;
	$(this).css("width", www);
	$(this).parent(".atar_Show").siblings("span").text(num + "分");
});
//用于把数据库里面CST(USA)标准的时间转换成GMT+0800标准时间
function dateToGMT(sqlDate){
	var dateStr=sqlDate.split(" ");
	var strGMT=dateStr[0]+" "+dateStr[1]+" "+dateStr[2]+" "+dateStr[5]+" "+dateStr[3]+" GMT+0800";
	var datetime=new Date(Date.parse(strGMT));
	var year =datetime.getFullYear();
	var month = (datetime.getMonth()+1)>9?(datetime.getMonth()+1):"0"+(datetime.getMonth()+1);
	var day = datetime.getDate()>9?datetime.getDate():"0"+datetime.getDate();
	var hour=datetime.getHours()>9?datetime.getHours():"0"+datetime.getHours();
	var min=datetime.getMinutes()>9?datetime.getMinutes():"0"+datetime.getMinutes();
	var datetime_str = year+"-"+month+"-"+day+" "+hour+":"+min;
	return datetime_str
}