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
	
	Workflow_pj.init();
	
	var rwwcsjFormat = new Date($('#rwwcsj').val());
	var rwwcsj = rwwcsjFormat.getFullYear()+'-'+(rwwcsjFormat.getMonth()+1)+'-'+rwwcsjFormat.getDate();
	$('#rwwcsjLabel').attr("value",rwwcsj);
	
	var rwkssjjFormat = new Date($('#rwkssj').val());
	var rwkssj = rwkssjjFormat.getFullYear()+'-'+(rwkssjjFormat.getMonth()+1)+'-'+rwkssjjFormat.getDate();
	$('#rwkssjLabel').attr("value",rwkssj);
	
	
	var nycd = $('#nycd').val()
	$('#'+nycd).attr("checked","checked");
	
	rwly = $('#rwly').val()

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
    					$("#rwlySelect").attr("value",data[i].name);
    					break;
    				}
    			}
    			if($("#rwlySelect").val()=="")
    				$("#rwlySelect").val(rwly);
            }
        });
	
        $.ajax({
            url : '/act/workflow/loadFkInfo/'+id,
            method : 'get',
            dataType : 'json',
            success : function(data) {
            	if(data.length>0){
                	$(".is_fk").removeClass("hide_div");
            		var html = "";
            		for (var i = 0; i < data.length; i++) {
            			if(i>0){
        					html += '<div class="border_div"></div>';
        				}
        				html +='<div class="more_div_pj"><label class="label_left" style="margin:0;">承办人员：</label>'+data[i].cbryMc+'</div>'
        				html +='<div class="more_div_pj read_only"><label class="label_left">反馈详情：</label><textarea readonly="readonly">'+data[i].fkqksm+'</textarea></div>'
        				html += '<div class="more_div_pj"><label class="label_left"  style="margin:0;">反馈附件：</label><a href="#" onclick="downloadFileById(\''+ data[i].fileId+ '\')">'+data[i].fileMc+'</a></div>';
        			}
        			$("#fkDiv").append(html);
            	}
            }
        });
     },
     
     commit : function(){
    	 $('#wcqkpf').val($('.fenshu').text());
    		if($("#wcqkpf").val() ==""){
    			layer.alert('尚未填写完成情况评分!',{icon:2,skin:'layer-ext-moon'});
    			return false;
    		}
    		if($("#wcqkpj").val() ==""){
    			layer.alert('尚未填写完成情况评价!',{icon:2,skin:'layer-ext-moon'});
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
                     parent.layer.msg("保存成功");
     				parent.reLoad();
    				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
    				parent.layer.close(index);
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
    var www=num*2*16;//
    $(this).css("width",www);
    $(this).parent(".atar_Show").siblings("span").text(num+"分");
});