/**
 * @author:zhangf
 * @description:工作流 任务签收
 * @date:2018/6/14
 */
var rwly = null;
var fileID = null;
var id = null;
$().ready(function() {
	fileID = $("#files").val();
	id = $("#id").val();
	rwly = $('#rwly').val();
	
	Workflow_pj.init();
	if($("#fenshu").text()=="null"){
		$("#fenshu").text("");
	}
	if($("#wcqkpj").text()=="null"){
		$("#wcqkpj").text("");
	}
	
	if($('#rwwcsj').val()){
		var rwwcsj = dateToGMT($('#rwwcsj').val());
		$('#rwwcsjLabel').html(rwwcsj);
	}else{
		$('#rwwcsjLabel').html("尚未选择");
	}
	var rwkssj=dateToGMT($('#rwkssj').val());
	$('#rwkssjLabel').html(rwkssj);
	
	
	var nycd = $('#nycd').val();
	if(nycd == ""){
		$('#nycd_span').html('尚未选择');
	}else if(nycd == 'JD'){
		$('#nycd_span').html('简单');
	}else if(nycd == 'ZC'){
		$('#nycd_span').html('正常');
	}else if(nycd == 'Nan'){
		$('#nycd_span').html('难');
	}
	show();
});
function downloadFile(){
	location.href = "/common/sysFile/downloadFile/"+fileID;
}
function downloadFileById(id){
	location.href = "/common/sysFile/downloadFile/"+id;
}
Workflow_pj = {

	//var currUserInfo : null;
    // TODO:JS
    /**
     * 初始化页面
     * 获得：1、用户信息；2、任务来源；
     */
     init :function(){
        $.ajax({
        	url : '/common/dict/list/rwly?sortBy=sort',
            success : function(data) {
    			//加载数据
    			for (var i = 0; i < data.length; i++) {
    				if(data[i].value == rwly){
    					$("#rwlySelect").html(data[i].name);
    					break;
    				}    				
    			}
    			if($("#rwlySelect").html()=="")
    				$("#rwlySelect").html(rwly);
            }
        });
        
        $.ajax({
            url : '/act/workflow/loadFkInfo/'+id,
            method : 'get',
            dataType : 'json',
            async : false,
            success : function(data) {
            	if(data.length > 0){
                	$(" .is_fk").removeClass("hide_div");
            		var html = "";
        			for (var i = 0; i < data.length; i++) {
        				is_fk = true;//有反馈数据 显示div
        				if(i>0){
        					html += '<div class="border_div"></div>';
        				}
//        				html +='<div class="more_div_pj read_only"><label class="label_left">承办人员:</label><input class="input" readonly="readonly" type="text" value="'+data[i].cbryMc+'" /></div>'
//        				html +='<div class="more_div_pj read_only"><label class="label_left">反馈详情:</label><textarea readonly="readonly">'+data[i].fkqksm+'</textarea></div>'
//        				html += '<div class="more_div_pj"><label class="label_left label_left_1">反馈附件:</label><a href="#" onclick="downloadFileById(\''+ data[i].fileId+ '\')">'+data[i].fileMc+'</a></div>';
        				html +=
        					'<div class="title_user">承办人处理 &nbsp;&nbsp;&nbsp;'+data[i].cjsj+'</div>'+
        					'<div class="more_div_pj msg_div read_only">'+
        					'	<label class="label_left">承办人员:</label>'+
        					'	<span class="long_span">'+data[i].cbryMc+'</span>'+	
        					'</div>'+
        					'<div class="more_div_pj msg_div read_only">'+
        					'	<label class="label_left">反馈详情:</label>'+
        					'	<span class="long_span">'+data[i].fkqksm+'</span>'+
        					'</div>'+
        					'<div class="more_div_pj msg_div">'+
        					'	<label class="label_left label_left_1">反馈附件:</label>'+
        					'	<a href="#" onclick="downloadFileById(\''+ data[i].fileId+ '\')">'+data[i].fileMc+'</a>'+
        					'</div>';
        			}
        			$("#fkDiv").append(html);
            	}
            }
        });
        
        var startNum = $('.fenshu').text();
        $("#start"+startNum).addClass("clibg")

     },
     
     commit : function(){
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
                     parent.layer.msg("保存成功");
                 } else {
                     parent.layer.alert(data.msg)
                 }
             }
         });
     }
}

var openUser = function(){
	layer.open({
		type:2,
		title:"选择人员",
		area : [ '300px', '450px' ],
		content:"/sys/user/treeView"
	})
}

function loadUser(userIds,userNames){
	$("#rwzpry").val(userIds);
	$("#rwzpryNames").val(userNames);
}
scoreFun($("#starttwo"),{
	fen_d:22,//每一个a的宽度
	ScoreGrade:5//a的个数 10或者
});
//显示分数
$(".show_number li p").each(function(index, element) {
    var num=$(this).attr("tip");
    var www=num*2*16;
    $(this).css("width",www);
    $(this).parent(".atar_Show").siblings("span").text(num+"分");
});

var is_fk = false;
var is_pj = false;
function show(){
	if(''!=$("#fenshu").val() || ''!=$("#wcqkpj").html()){//是否显示评价信息
		is_pj = true;
	}	
	if(is_pj){
		$(" .is_pj").removeClass("hide_div");
	}
	if(is_fk){
		$(" .is_fk").removeClass("hide_div");
	}
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