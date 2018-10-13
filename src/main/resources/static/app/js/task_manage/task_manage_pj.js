
var id = null;
var fileID = null;
$(function() {
	var rwkssj = dateToGMT($('#rwkssj').val());
	$('#startTime').html(rwkssj);
	var rwwcsj = dateToGMT($('#rwwcsj').val());
	$('#endTime').html(rwwcsj);

	var nycd = $('#nycd').val();
	if (nycd == 'JD')
		$('[value="JD"]').attr("checked", "checked");
	else if (nycd == 'ZC')
		$('[value="ZC"]').attr("checked", "checked");
	else if (nycd == 'Nan')
		$('[value="Nan"]').attr("checked", "checked");

	var rwly = $('#rwly').val();
	$.ajax({
		url : '/common/dict/list/rwly?sortBy=sort',
		success : function(data) {
			// 加载数据
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
					for (var i = 0; i < data.length; i++) {
						is_fk = true;// 有反馈数据 显示div
						html += 
							'<div class="more_div_pj msg_div deal_admin_div"><div>'+data[i].cbryMc+'</div></div>'+
							'<div class="more_div_pj msg_div">'+
							'	<label class="label_left">承办人员:</label>'+
							'	<input readonly="readonly" type="text" value="'+ data[i].cbryMc + '" />'+
							'</div>'+
							'<div class="more_div_pj msg_div ">'+
							'	<label class="label_left">反馈详情:</label>'+
							'	<span class="long_span" readonly="readonly">'+ data[i].fkqksm + '</span>'+
							'</div>'+
							'<div class="more_div_pj msg_div">'+
							'	<label class="label_left">反馈附件:</label>'+
							'	<a onclick="downloadFileById(\''+ data[i].fileId+ '\')">'+ data[i].fileMc+ '</a>'+
							'</div>';
					}
					$("#fkDiv").append(html);
				}
			});
});
// 展示详情信息
function show_detail_msg() {

}
// 返回
function go_back() {
	window.history.go(-1);
}
fileID = $("#files").val();
// 下载文件
function downloadFile() {
	location.href = "/common/sysFile/downloadFile/" + fileID;
}
id = $("#id").val();
function downloadFileById(id){
	location.href = "/common/sysFile/downloadFile/"+id;
}
// 星星评价
scoreFun($("#starttwo"), {
	fen_d : 22,// 每一个a的宽度
	ScoreGrade : 5
// a的个数 10或者
});
// 显示分数
$(".show_number li p").each(function(index, element) {
	var num = $(this).attr("tip");
	var www = num * 2 * 16;//
	$(this).css("width", www);
	$(this).parent(".atar_Show").siblings("span").text(num + "分");
});
function submit_workflow() {
   	 $('#wcqkpf').val($('.fenshu').text());
   		if($("#wcqkpf").val() ==""){
   			layer.msg('尚未填写完成情况评分!');
   			return false;
   		}
   		if($("#wcqkpj").val() ==""){
   			layer.msg('尚未填写完成情况评价!');
   			return false;
   		}

        $.ajax({
            cache : true,
            type : "POST",
            url :"/act/workflow/wcqkpj",
            data : $('#add_form').serialize(),
            async : false,
            error : function(request) {
                laryer.alert("Connection error");
            },
            success : function(data) {
                if (data.code == 0) {
                    layer.msg("评价完成！");
                    $(".submit_div").hide();
    				$("#success_message").html("评价完成！");
                    go_back();
                } else {
                    layer.msg(data.msg)
                }
            }
        });
}
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