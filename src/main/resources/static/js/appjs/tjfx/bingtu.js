/**
 * @author zhangf
 * @date 2018-07-04
 */
var year=0;
$(function () {
	getCurrentYear();
});
function getCurrentYear(){
	var data = '2018';
	var currentYear = parseInt(data);
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
//	$.ajax({
//		url:"/tjfx/getCurrentYear",
//		method:'get',
//		//dataType:'json',
//		success : function(data){
//			var currentYear = parseInt(data);
//			var json_yearlist=eval('('+"[]"+')');
//			for(var i=0; i<=2; i++){//近三年
//				var year={"time":(currentYear-i)};
//				json_yearlist.push(year);
//			}
//			//alert(json_yearlist[0]);
//			$("#timeid").bsSuggest({
//				data:{
//					"value":json_yearlist
//				},
//				keyField:"time"
//			        }).on("onDataRequestSuccess",function(e,result){
//						//console.log("onDataRequestSuccess: ",result)
//					}).on("onSetSelectValue",function(e,keyword){
//						//console.log("onSetSelectValue: ",keyword)
//					}).on("onUnsetSelectValue",function(e){
//					//console.log("onUnsetSelectValue")
//					});
//			//$('#timeid').val(currentYear);
//			changeConditions(currentYear,"");
//		}
//	});
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
	var data = 
		[
	 		{"yyyy":"2018","mm":"08","total":"4","tdwjb":"1","tzqtdwjbhzb":"1","sjywdkbmjb":"0","xjywdkbmsq":"1","qt":"1"},
	 		{"yyyy":"2018","mm":"09","total":"18","tdwjb":"6","tzqtdwjbhzb":"4","sjywdkbmjb":"5","xjywdkbmsq":"2","qt":"1"}
	 	];
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
//    $.ajax({
//        url : '/tjfx/getWorkflowBar',
//        method : 'get',
//        data : {'conditions' :conditions},
//        dataType : 'json',
//        success : function(data) {
//        	for(var i = 0; i<data.length ; i++ ){        		
//        		var index = parseInt(data[i].mm)-1;
//        		total.splice(index,0,data[i].total);
//        		tdwjb.splice(index,0,data[i].tdwjb);
//        		tzqtdwjbhzb.splice(index,0,data[i].tzqtdwjbhzb);
//        		sjywdkbmjb.splice(index,0,data[i].sjywdkbmjb);
//        		xjywdkbmsq.splice(index,0,data[i].xjywdkbmsq);
//        		qt.splice(index,0,data[i].qt);
//        		
//        		totalTotal +=parseInt(data[i].total);
//        		tdwjbTotal += parseInt(data[i].tdwjb); 
//        		tzqtdwjbhzbTotal += parseInt(data[i].tzqtdwjbhzb); 
//        		sjywdkbmjbTotal += parseInt(data[i].sjywdkbmjb); 
//        		xjywdkbmsqTotal += parseInt(data[i].xjywdkbmsq); 
//        		qtTotal += parseInt(data[i].qt); 
//        	}
//        	initWorkflowEchartsOption();
//        }
//    });
}

function initWorkflowEchartsOption(){ 
    var pieChart = echarts.init(document.getElementById("echarts-pie-chart-workflow"));
    var pieoption = {
        title : {
            //text: '按任务来源占比统计饼图',
            text: year+'年列管人数：'+totalTotal+"条",
            x: 'center'
            ///center: ['50%', '50%']
        },
//        color:['#d5f5fd','#b3edfb','#65d8fd','#27bae9','#47b2d5'],
        color:['#ff7f50','#87cefa','#da70d6','#32dc32','#6495ed','#bfb9b4','#3a5533','#fbdf2d','#0167B6','#05B1E8'],
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
        	orient: 'vertical',//'horizontal',//
        	x: 'right',
        	y: '50',
        	data: ['1级人数','2级人数','3级人数','4级人数','5级人数']
        },
        calculable : true,
        series : [
            {
                //name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['35%', '55%'],
                itemStyle:{
                	normal:{
                		label:{
                			show:false
                		},
                		labelLine:{
                			show:false
                		}
                	}
                },
                data:[
                    {value:tdwjbTotal, name:'1级人数'},
                    {value:tzqtdwjbhzbTotal, name:'2级人数'},
                    {value:sjywdkbmjbTotal, name:'3级人数'},
                    {value:xjywdkbmsqTotal, name:'4级人数'},
                    {value:qtTotal, name:'5级人数'}
                ]
            }
        ]
    };
//    var pieoption = {
//        title : {
//            //text: '按任务来源占比统计饼图',
//            text: year+'年任务总量：'+totalTotal+"条",
//            x: 'center'
//            ///center: ['50%', '50%']
//        },
//        tooltip : {
//            trigger: 'item',
//            formatter: "{a} <br/>{b} : {c} ({d}%)"
//        },
//        legend: {
//        	orient: 'vertical',//'horizontal',//
//        	x: 'right',
//        	y: '50',
//        	data: ['厅党委交办','厅直其它单位交办或转办','上级业务对口部门交办','下级业务对口部门申请','其它']
//        },
//        calculable : true,
//        series : [
//            {
//                //name:'访问来源',
//                type:'pie',
//                radius : '55%',
//                center: ['35%', '55%'],
//                itemStyle:{
//                	normal:{
//                		label:{
//                			show:false
//                		},
//                		labelLine:{
//                			show:false
//                		}
//                	}
//                },
//                data:[
//                    {value:tdwjbTotal, name:'厅党委交办'},
//                    {value:tzqtdwjbhzbTotal, name:'厅直其它单位交办或转办'},
//                    {value:sjywdkbmjbTotal, name:'上级业务对口部门交办'},
//                    {value:xjywdkbmsqTotal, name:'下级业务对口部门申请'},
//                    {value:qtTotal, name:'其它'}
//                ]
//            }
//        ]
//    };
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



