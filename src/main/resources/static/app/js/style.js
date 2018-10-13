/**
 * Created by Administrator on 2017/3/23.
 */
$(function(){
    /*显示当前时间*/
    function currentTime(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var second = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 1 && day <= 9) {
            day = "0" + day;
        }
        if (minutes >= 1 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (second >= 1 && second <= 9) {
            second = "0" + second;
        }
        var currentdate = year + "-" +month+"-"+day+" "+ hours +":"+ minutes+":" + second;
        $(".current-time span").html(currentdate);
    }
    setInterval(currentTime,1000);

    /*案线比中人员-导入名单*/
    $(".case-import-list").click(function(){
        layer.open({
            type: 2,
            title: '选择文件',
            shadeClose: true,
            shade: 0.4,
            area: ['420px', '50%'],
            content: 'case-import-file.html', //iframe的url
            btn:["提交","关闭"]
        });
    });

    /*案线比中人员详细按钮*/
    $("a.person-detail").click(function(){
        window.location.href = "person-detail.jsp"
    });
    /*案线比中人员-积分数据*/
    $(".case-inline .table td span").click(function(){
        window.location.href = "integral-data.html"
    });
    /*案线比中人员返回按钮*/
    $(".go-back").click(function(){
        window.history.back(-1);
    });
    /*案线比中人员删除按钮*/
    $(".person-delete,.control-del,.del-check-list,.del-receive-check,.del-control-task").click(function(){
        layer.confirm('您确定要删除此条信息？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            layer.msg('删除成功', {icon: 1});
        }, function(){

        });
    });
    /*操作手册20类人员-文件导入*/
    $(".staff-import-list").click(function(){
        layer.open({
            type: 2,
            title: '选择文件',
            shadeClose: true,
            shade: 0.4,
            area: ['420px', '60%'],
            content: 'staff-import-file.html', //iframe的url
            btn:["提交","关闭"]
        });
    });
    /*操作手册20类人员-文件导入-人员类型选择*/

    /*导入文件*/
    $(".key-import-list,.risk-import-list").click(function(){
        layer.open({
            type: 2,
            title: '选择文件',
            shadeClose: true,
            shade: 0.4,
            area: ['420px', '50%'],
            content: 'case-import-file.html', //iframe的url
            btn:["提交","关闭"]
        });
    });

    /*人员核查-按钮*/
    $(".staff-add").click(function(){
        layer.open({
            type: 2,
            title: false,
            closeBtn: false,
            shade: [0],
            area: ['0', '0'],
            offset: 'rb', //右下角弹出
            time: 100, //2秒后自动关闭
            shift: 2,
            content: ['', 'no'], //iframe的url，no代表不显示滚动条
            end: function(){ //此处用于演示
                layer.open({
                    type: 2,
                    title: '新增人员信息',
                    shadeClose: true,
                    shade: false,
                    maxmin: true, //开启最大化最小化按钮
                    area: ['90%', '90%'],
                    content: 'popup-staff-add.html',
                    btn:["提交","关闭"]
                });
            }
        });
    });
    $(".lots-add").click(function(){
        layer.open({
            type: 2,
            title: '选择文件',
            shadeClose: true,
            shade: 0.4,
            area: ['420px', '40%'],
            content: 'staff-lots-add.html', //iframe的url
            btn:["提交","关闭"]
        });
    });
    $(".jurisdiction").click(function(){
        layer.open({
            type: 2,
            title: '分配管辖单位',
            shadeClose: true,
            shade: 0.4,
            area: ['600px', '240px'],
            content: 'popup-jurisdiction.html', //iframe的url
            btn:["提交","关闭"]
        });
    });
    $("a.charge").click(function(){
        window.location.href = "personnel-control.html"
    });
    /*人员核查-新增人员信息*/
    $(".live a.append").click(function(){
        $(this).parent().parent('tr').clone().appendTo(".live tbody");
        $(".live > table tbody tr:gt(0) td:last-child").html('<a class="remove" onclick="remove(this)">移除</a>')
    });
    $(".belongings a.append").click(function(){
        $(this).parent().parent('tr').clone().appendTo(".belongings tbody");
        $(".belongings > table tbody tr:gt(0) td:last-child").html('<a class="remove" onclick="remove(this)">移除</a>')
    });

    /*人员管控-新增*/
    $(".control-add").click(function(){
        layer.open({
            type: 2,
            title: '新增管控',
            shadeClose: true,
            shade: 0.4,
            area: ['80%', '90%'],
            content: 'popup-control-add.html', //iframe的url
            btn:["提交","关闭"]
        });
    });
    $(".control-modify").click(function(){
        layer.open({
            type: 2,
            title: '新增管控',
            shadeClose: true,
            shade: 0.4,
            area: ['80%', '90%'],
            content: 'popup-control-modify.html', //iframe的url
            btn:["保存","关闭"]
        });
    });

    /*下发核查单-新增按钮*/
    $(".add-check-list").click(function(){
        layer.open({
            type: 2,
            title: '新增核查单',
            shadeClose: true,
            shade: 0.4,
            area: ['480px', '70%'],
            content: 'add-check-list.html', //iframe的url
            btn:["提交","关闭"]
        });
    });

    /*接收核查单-反馈*/
    $("a.feedback").click(function(){
        layer.open({
            title:"反馈信息",
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['450px', '240px'], //宽高
            content: '<div class="feedback-info">' +
            '<label>反馈信息:</label> ' +
            '<textarea name="feedback-info"> ' +
            '</textarea>' +
            '</div>',
            btn:["提交","关闭"]
        });
    });

    /*布控任务*/
    $(".add-control-task").click(function(){
        layer.open({
            type: 2,
            title: '新增布控任务',
            shadeClose: true,
            shade: 0.4,
            area: ['380px', '80%'],
            content: 'popup-add-control-task.html',//iframe的url
            btn:["提交","关闭"]
        });
    });
    $(".modify-control-task").click(function(){
        layer.open({
            type: 2,
            title: '新增布控任务',
            shadeClose: true,
            shade: 0.4,
            area: ['380px', '80%'],
            content: 'popup-modify-control-task.html',//iframe的url
            btn:["保存","关闭"]
        });
    });

    $(".add-control-person").click(function(){
        layer.open({
            title:"新增人员",
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['420px', '280px'], //宽高
            content: '<div class="control-person">' +
            '<div class="person-name"><label>姓名：</label><input type="text" name="person-name"></div>' +
            '<div class="person-id"><label>证件号码：</label><input type="text" name="person-id"></div>' +
            '<div class="control"><label>布控名称：</label><input type="text" name="control" value="4名外地在控人员布控" disabled></div>' +
            '</div>',
            btn:["提交","关闭"]
        });
    });
    $(".modify-control-person").click(function(){
        layer.open({
            title:"修改人员信息",
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['420px', '280px'], //宽高
            content: '<div class="control-person">' +
            '<div class="person-name"><label>姓名：</label><input type="text" name="person-name" value="张三"></div>' +
            '<div class="person-id"><label>证件号码：</label><input type="text" name="person-id" value="441524198605260214"></div>' +
            '<div class="control"><label>布控名称：</label><input type="text" name="control" value="4名外地在控人员布控" disabled></div>' +
            '</div>',
            btn:["保存","关闭"]
        });
    });
    $(".person-import").click(function(){
        layer.open({
            title:"人员导入",
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['420px', '180px'], //宽高
            content: '<div class="import-con">'+
            '<div class="select-file">'+
            '<label>选择文件：</label>'+
        '<input type="file" name="person-file">'+
            '<a >模版下载</a>'+
            '</div>'+
            '</div>',
            btn:["提交","关闭"]
        });
    });
    $(".del-control-person").click(function(){
        layer.confirm('您确定要删除此条信息？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            layer.msg('删除成功', {icon: 1});
        }, function(){

        });
    });
    $(".return-list").click(function(){
        window.history.back(-1);
    });
    $(".location").click(function(){
        layer.open({
            type: 2,
            title: '定位',
            shadeClose: true,
            shade: 0.4,
            area: ['80%', '90%'],
            content: 'popup-location.html' //iframe的url
        });
    });
    $(".start-task").click(function(){
        layer.msg('正在启动...', {
            icon: 16
            ,shade: 0.01
        });
    });
    $(".stop-task").click(function(){
        layer.msg('正在停止...', {
            icon: 2
            ,shade: 0.01
        });
    });
    /*人员详细信息*/
    $(".tags-title > a").click(function(){
        var el = $(this).parent().parent();
        if(el.hasClass("open")){
            el.removeClass("open");
            el.children(".tags-content").hide();
            $(this).html('展开');
        }else{
            el.addClass("open");
            el.children(".tags-content").show();
            $(this).text("收起")
        }
    });


    /*分页*/
    var pageSize = 10;
    var currentPage = 1;
    var items = $("#person-list").find('tbody').find('tr').size();
    var pageCount = Math.ceil(items/pageSize);
    $("#person-list").find('tbody').find('tr').hide().slice(0,pageSize).show();
    var html = '';
    for(var i =0;i<pageCount;i++){
        var str = '<li><a href="#">'+(i+1)+'</a></li>';
        html += str;
    }
    $(".pages-num .pagination > li:last-child").before(html);
    $(".pages-num .pagination li:not(':first,:last')").click(function(){
        var j = $(this).index();
        $("#person-list").find('tbody').find('tr').hide().slice((j-1)*pageSize,j*pageSize).show();
    });
    $(".pages-num .pagination li:first").click(function(){
        $("#person-list").find('tbody').find('tr').hide().slice(0,pageSize).show();
    });
    $(".pages-num .pagination li:last").click(function(){
        $("#person-list").find('tbody').find('tr').hide().slice((pageCount-1)*pageSize,pageCount*pageSize).show();
    });
    /*全选*/
    $("#person-list th input[name=all]").click(function(){
        if(this.checked){
            $("#person-list input").prop("checked", true);
        }else{
            $("#person-list input").prop("checked", false);
        }
    });
    /*打处对象关系人-查询按钮*/
    $(".target-person .table tbody > tr").hide();
    $(".target-person .pages-num").hide();
    $(".target-btn").click(function(){
        $(".target-person .table tbody > tr").fadeIn();
        $(".target-person .pages-num").fadeIn();
    });
});
function remove(el){
    $(el).parent().parent().remove()
}