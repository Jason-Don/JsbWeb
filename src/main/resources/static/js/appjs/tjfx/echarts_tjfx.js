/**
 * @author zhangf
 * @date 2018-07-04
 */
var year=0;
$(function () {
    //init();
	getCurrentYear();
});
function getCurrentYear(){
	$.ajax({
		url:"/tjfx/getCurrentYear",
		method:'get',
		//dataType:'json',
		success : function(data){
			var currentYear = parseInt(data);
/*			var html = '';
			for(var i=2; i>=0; i--){//近三年
				html += '&nbsp;<a id="'+(currentYear - i)+'" href="#" onclick="changeYear('+(currentYear - i)+')">'+(currentYear - i)+'年</a>&nbsp';
			}
			$('#yearList').append(html);
			document.getElementById(currentYear).click();*/
			var json_yearlist=eval('('+"[]"+')');
			for(var i=0; i<=2; i++){//近三年
				var year={"time":(currentYear-i)};
				json_yearlist.push(year);
			}
			//alert(json_yearlist[0]);
			$("#timeid").bsSuggest({
				data:{
					"value":json_yearlist
				},
				keyField:"time"
			        }).on("onDataRequestSuccess",function(e,result){
						//console.log("onDataRequestSuccess: ",result)
					}).on("onSetSelectValue",function(e,keyword){
						//console.log("onSetSelectValue: ",keyword)
					}).on("onUnsetSelectValue",function(e){
					//console.log("onUnsetSelectValue")
					});
			//$('#timeid').val(currentYear);
			changeConditions(currentYear,"");
		}
	});
}

var total = new Array(12); 
var tdwjb = new Array(12); 
var tzqtdwjbhzb = new Array(12); 
var sjywdkbmjb = new Array(12); 
var xjywdkbmsq = new Array(12); 
var qt = new Array(12); 

var totalTotal = 0;
var tdwjbTotal = 0; 
var tzqtdwjbhzbTotal = 0; 
var sjywdkbmjbTotal = 0; 
var xjywdkbmsqTotal = 0; 
var qtTotal = 0; 


var overtimeTotal = new Array(12); 
var gzr = new Array(12); 
var zm = new Array(12); 
var fdjjr = new Array(12); 

var overtimeTotalTotal = 0;
var gzrTotal = 0; 
var zmTotal = 0; 
var fdjjrTotal = 0; 


function init(){
	total = [0,0,0,0,0,0,0,0,0,0,0,0];//new Array(12); 
	tdwjb = [0,0,0,0,0,0,0,0,0,0,0,0];//new Array(12); 
	tzqtdwjbhzb = [0,0,0,0,0,0,0,0,0,0,0,0];//new Array(12);  
	sjywdkbmjb = [0,0,0,0,0,0,0,0,0,0,0,0];//new Array(12);  
	xjywdkbmsq = [0,0,0,0,0,0,0,0,0,0,0,0];//new Array(12); 
	qt = [0,0,0,0,0,0,0,0,0,0,0,0];//new Array(12);  

	totalTotal = 0;
	tdwjbTotal = 0; 
	tzqtdwjbhzbTotal = 0; 
	sjywdkbmjbTotal = 0; 
	xjywdkbmsqTotal = 0; 
	qtTotal = 0; 


	overtimeTotal = [0,0,0,0,0,0,0,0,0,0,0,0];//new Array(12); 
	gzr = [0,0,0,0,0,0,0,0,0,0,0,0];//new Array(12); 
	zm = [0,0,0,0,0,0,0,0,0,0,0,0];//new Array(12); 
	fdjjr = [0,0,0,0,0,0,0,0,0,0,0,0];//new Array(12); 

	overtimeTotalTotal = 0;
	gzrTotal = 0; 
	zmTotal = 0; 
	fdjjrTotal = 0; 
    $.ajax({
        url : '/tjfx/getWorkflowBar',
        method : 'get',
        data : {'conditions' :conditions},
        dataType : 'json',
        success : function(data) {
        	for(var i = 0; i<data.length ; i++ ){
        		
        		var index = parseInt(data[i].mm)-1;
        		total.splice(index,0,data[i].total);
        		tdwjb.splice(index,0,data[i].tdwjb);
        		tzqtdwjbhzb.splice(index,0,data[i].tzqtdwjbhzb);
        		sjywdkbmjb.splice(index,0,data[i].sjywdkbmjb);
        		xjywdkbmsq.splice(index,0,data[i].xjywdkbmsq);
        		qt.splice(index,0,data[i].qt);
        		
        		totalTotal +=parseInt(data[i].total);
        		tdwjbTotal += parseInt(data[i].tdwjb); 
        		tzqtdwjbhzbTotal += parseInt(data[i].tzqtdwjbhzb); 
        		sjywdkbmjbTotal += parseInt(data[i].sjywdkbmjb); 
        		xjywdkbmsqTotal += parseInt(data[i].xjywdkbmsq); 
        		qtTotal += parseInt(data[i].qt); 
        	}
        	initWorkflowEchartsOption();
        }
    });
    
    $.ajax({
        url : '/tjfx/getOvertimeBar',
        method : 'get',
        data : {'conditions' : conditions},
        dataType : 'json',
        success : function(data) {
        	for(var i = 0; i<data.length ; i++ ){
        		var index = parseInt(data[i].mm)-1;
        		overtimeTotal.splice(index,0,data[i].total);
        		gzr.splice(index,0,data[i].gzr);
        		zm.splice(index,0,data[i].zm);
        		fdjjr.splice(index,0,data[i].fdjjr);
        		
        		overtimeTotalTotal +=parseInt(data[i].total);
        		gzrTotal += parseInt(data[i].gzr); 
        		zmTotal += parseInt(data[i].zm); 
        		fdjjrTotal += parseInt(data[i].fdjjr); 

        	}
        	initOvertimeEchartsOption();
        }
    });
}

function initWorkflowEchartsOption(){
	var barChart = echarts.init(document.getElementById("echarts-bar-chart-workflow"));
	var dj_baroption = {
    	    tooltip : {
    	        trigger: 'axis',
    	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    	        }
    	    },
            title : {
                text: '工作流任务量按月统计',
                subtext: year+'年任务总量：'+totalTotal,
                x:'center'
            },
    	    calculable : true,
    	    xAxis : [
    	        {
    	            type : 'category',
    	            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    	        }
    	    ],
    	    yAxis : [
    	        {
    	            type : 'value'
    	        }
    	    ],
    	    series : [
    	        {
    	            name:'总和',
    	            type:'bar',
    	            barGap: '-100%',
    	            data:total
    	        },
    	        {
    	            name:'厅党委交办',
    	            type:'bar',
    	            data:tdwjb
    	        },
    	        {
    	            name:'厅直其它单位交办或转办',
    	            type:'bar',
    	            data:tzqtdwjbhzb
    	        },
    	        {
    	            name:'上级业务对口部门交办',
    	            type:'bar',
    	            data:sjywdkbmjb
    	        },
    	        {
    	            name:'下级业务对口部门申请',
    	            type:'bar',
    	            data:xjywdkbmsq
    	        },
    	        {
    	            name:'其它',
    	            type:'bar',
    	            data:qt
    	        }

    	    ]
    	};
    barChart.setOption(dj_baroption);
    window.onresize = barChart.resize;
    
    
    
    var pieChart = echarts.init(document.getElementById("echarts-pie-chart-workflow"));
    var pieoption = {
        title : {
            text: '按任务来源占比统计',
            subtext: year+'年任务总量：'+totalTotal,
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        /*legend: {
            orient : 'vertical',
            x : 'left',
            data:['厅党委交办','厅直其它单位交办或转办','上级业务对口部门交办','下级业务对口部门申请','其它']
        },*/
        calculable : true,
        series : [
            {
                //name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:tdwjbTotal, name:'厅党委交办'},
                    {value:tzqtdwjbhzbTotal, name:'厅直其它单位交办或转办'},
                    {value:sjywdkbmjbTotal, name:'上级业务对口部门交办'},
                    {value:xjywdkbmsqTotal, name:'下级业务对口部门申请'},
                    {value:qtTotal, name:'其它'}
                ]
            }
        ]
    };
    pieChart.setOption(pieoption);
    $(window).resize(pieChart.resize);
}

var barChart = echarts.init(document.getElementById("echarts-bar-chart-overtime"));
var pieChart = echarts.init(document.getElementById("echarts-pie-chart-overtime"));
function initOvertimeEchartsOption(){
	
	var dj_baroption = {
    	    tooltip : {
    	        trigger: 'axis',
    	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    	        }
    	    },
            title : {
                text: '加班量按月统计',
                subtext: year+'年加班总量：'+overtimeTotalTotal,
                x:'center'
            },
    	    calculable : true,
    	    xAxis : [
    	        {
    	            type : 'category',
    	            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    	        }
    	    ],
    	    yAxis : [
    	        {
    	            type : 'value'
    	        }
    	    ],
    	    series : [
    	        {
    	            name:'总和',
    	            type:'bar',
    	            barGap: '-100%',
    	            data:overtimeTotal
    	        },
    	        {
    	            name:'工作日',
    	            type:'bar',
    	            data:gzr
    	        },
    	        {
    	            name:'周末',
    	            type:'bar',
    	            data:zm
    	        },
    	        {
    	            name:'法定节假日',
    	            type:'bar',
    	            data:fdjjr
    	        }

    	    ]
    	};
    barChart.setOption(dj_baroption);
    window.onresize = barChart.resize;
    
    
    

    var pieoption = {
        title : {
            text: '按加班类型占比统计',
            subtext: year+'年加班总量：'+overtimeTotalTotal,
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        /*legend: {
            orient : 'vertical',
            x : 'left',
            data:['厅党委交办','厅直其它单位交办或转办','上级业务对口部门交办','下级业务对口部门申请','其它']
        },*/
        calculable : true,
        series : [
            {
                //name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:gzrTotal, name:'工作日'},
                    {value:zmTotal, name:'周末'},
                    {value:fdjjrTotal, name:'法定节假日'},
                ]
            }
        ]
    };
    pieChart.setOption(pieoption);
    $(window).resize(pieChart.resize);
}

var conditions=[];
var year = 0;
function changeConditions(newYear,newPeople){
	var duty_people="";
	year = newYear;
	duty_people=newPeople;
	conditions=JSON.stringify([year,duty_people]);
	init();
}

function searchbtn(){
	var newYear=$("#timeid").val();
	var newPeople=$("#duty").val();
	changeConditions(newYear,newPeople);
}



