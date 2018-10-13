var current_edit_eventID = '';
var current_selected_date = '';
            var initHeight=380;
			var planData=null;
			var currentToday=new Date();
			var pageDate=new Date();
			var lastOpt;
			var lastOptCss="";
			var calendarDialog;
			var currentSelectDate="";
		 	var hasRfdh = false;
			var isSubmit=false;
			var eventData = 
				{
					"dateevents":{
						"2018-06-20":["2057","2066"],
						"2018-06-22":["2088"],
						"2018-05-31":["2039","2041"],
						"2018-06-08":["2065","2068","2067"],
						"2018-06-07":["2058","2064"],
						"2018-06-02":["2048"],
						"2018-06-01":["2045"],
						"2018-05-28":["2032"],
						"2018-06-13":["2047"]
					},
					//"start":"2018-05-27 00:00",
					"events":{
						"2068":["2068","测试1","2018-06-08","15:55","PM","17","2018-06-08 15:55至2018-06-08 23:59"],
						"2067":["2067","测试2","2018-06-08","15:55","PM","17","2018-06-08 15:55至2018-06-08 23:59"],
						"2041":["2041","明天拜访客户","2018-05-31","17:16","PM","17","2018-05-31 17:16至2018-05-31 23:59"],
						"2064":["2064","Project review meeting","2018-06-07","21:06","PM","17","2018-06-07 21:06至2018-06-07 23:59"],
						"2065":["2065","12","2018-06-08","09:32","AM","17","2018-06-08 09:32至2018-06-08 23:59"],
						"2045":["2045","册数","2018-06-01","10:06","AM","17","2018-06-01 10:06至2018-06-01 23:59"],
						"2032":["2032","09:00-10:00 202 会议室 开会","2018-05-28","17:01","PM","17","2018-05-28 17:01至2018-05-28 23:59"],
						"2047":["2047","魂牵梦萦","2018-06-13","16:44","PM","17","2018-06-13 16:44至2018-06-13 23:59"],
						"2058":["2058","123213","2018-06-07","11:46","AM","17","2018-06-07 11:46至2018-06-07 23:59"],
						"2057":["2057","1让他","2018-06-20","14:40","PM","17","2018-06-20 14:40至2018-06-20 23:59"],
						"2048":["2048","正常进行","2018-06-02","00:00","AM","17","2018-06-02 00:00至2018-06-02 23:59"],
						"2039":["2039","wrtwtwtr","2018-05-31","08:03","AM","17","2018-05-31 08:03至2018-05-31 23:59"],
						"2066":["2066","正常进行111","2018-06-20","08:03","AM","19","2018-06-20 08:03至2018-06-20 23:59"],
						"2088":["2088","正常gs进行111","2018-06-22","08:03","AM","19","2018-06-22 08:03至2018-06-22 23:59"]
					},
					//"end":"2018-06-30 23:59"
				};
		
			$(document).ready(function(){
				init();
			});
			
			//重置参数
			function resize_schedule_plan(){
				//$("#condition_recipient").val("");
				$("#condition_title").val("");
				$("#condition_content").val("");
				$('input[type=radio][name=remind_type]').eq(0).click();
				$(".img_show_hide").removeClass("hide_div");
				$(".edit_btn_1").removeClass("hide_div");
				$(".edit_btn_2").addClass("hide_div");
				$(".is_can_edit").removeClass("cannot_edit");
			}
			//必要条件
			function show_hide_img(e){
				if($(e).val()=="" || $(e).val().trim() == ""){
					$(e).siblings(".img_show_hide").removeClass("hide_div");
				}else{
					$(e).siblings(".img_show_hide").addClass("hide_div");
				}
			}
			function changeTask(datas){
				console.log(datas);
			}
			function check_conn() {
				return confirm('网络故障或其它原因导致您连接不上服务器，请复制下重要信息稍候再提交！\r\n\r\n按【确定】继续,按【取消】停留在本页!');
			}
			function isdel(){
				var str = "确定要删除吗?";
			   if(!confirm(str)){
			       return false;
			   }
			       return true;
			 } 
			function issubmit(){
				var str = "确定要提交吗?";
			   if(!confirm(str)){
			       return false;
			   }
			       return true;
			   } 
			/*流程里面使用，主要是因为流程内容放到iframe里面，通过response返回的时候，要返回的到其父窗口*/
			function wfforward(wfurl){
				parent.location.href = wfurl;
			}
			function myescapecode(str){
				return encodeURIComponent(str);
			}
			function setBorder(){
				var a = $("span.selectedTitle");
				var div = $("#shadowBorderDiv");
				//div.show();
				var _top = a.offset().top+a.height();
				var left = a.offset().left;
				//div.width(a.width());
				var width = a.width()+parseInt(a.css("padding-left").replace("px",""))+parseInt(a.css("padding-right").replace("px",""));
				if(a.offset().top==0){
					div.css("top",_top-5);
					div.css("left",left+(width/2)-7);
				}else{
					div.each(function(){jQuery.dequeue(this,'fx');}).animate({top:_top-1,left:left-1}, 1500);
				}
			}
			function startMouseMove(){
				var handle = null;
				$(document).bind("mousemove",function(e){
					var event = e || window.event;
					var pageX = e.pageX;
					var width = $(document).width();
					//console.log($(document).width()+"::"+e.pageX+"::"+handle);
					if(Math.abs(pageX-width)<=50){
						if(handle==null){
							handle=window.setTimeout(function(){
								$("#popDiv").show("slow");
							},1000);
						}
					}else{
						clearTimeout(handle);
						handle=null;
					}
				});
				$("#popDiv").hover(function(){},function(){
					$("#popDiv").hide("slow");
				});
			}
			
			function initToday(){
		        var todayD=currentToday.getDate();//本日
		        var todayWD=currentToday.getDay();//本周几
		        $("#currentDay").html(todayD);
		 		$("#currentWeekDay").html(getWeekDay(todayWD));
			}
		    //实现日历
		    function calendar(showObj) {
		    	clearData();
		        var year = pageDate.getFullYear();      //选中年
		        var month = pageDate.getMonth() + 1;    //选中月
		        var day = pageDate.getDate();           //选中日
				var todayY=currentToday.getFullYear();//本年
				var todayM=currentToday.getMonth()+1;//本月
				var todayD=currentToday.getDate();//今天
				var todayStr=todayY+"-"+(todayM>9?todayM:"0"+todayM)+"-"+(todayD>9?todayD:"0"+todayD);
				var selectDate=year+"-"+(month>9?month:"0"+month)+"-"+(day>9?day:"0"+day);
		 		if("7"=="7"||"7"=="9"){
		 			$("#showDate").html(year+"年"+(month>9?month:"0"+month)+"月");
		 		}else{
		 			$("#showDate").html(year+"/"+(month>9?month:"0"+month));
		 		}
		 		//计算出vStart,vEnd具体时间
		 		//选中月第一天是星期几（距星期日离开的天数）
		        var startDay = new Date(year, month - 1, 1).getDay();
		 		var firstdate = new Date(year, month-1, 1);//选中月第一天
		 		var lastMonth = new Date(year, month-2, 1);//选中月上个月第一天
				var nextMonth = new Date(year, month, 1);//选中月下月第一天
				
				var lastStr = lastMonth.getFullYear()+"-"+((lastMonth.getMonth() + 1)>9?(lastMonth.getMonth() + 1):"0"+(lastMonth.getMonth() + 1)); 
				var currentStr=year+"-"+(month>9?month:"0"+month);
		 		var nextStr = nextMonth.getFullYear()+"-"+((nextMonth.getMonth() + 1)>9?(nextMonth.getMonth() + 1):"0"+(nextMonth.getMonth() + 1));   
				
		 		var lastMothStart = DateAdd("d", -startDay, firstdate).getDate();//日期第一天
		 		var lastMothend = DateAdd("d", -1, firstdate).getDate();//上月的最后一天
		
		        //本月有多少天(即最后一天的getDate()，但是最后一天不知道，我们可以用“上个月的0来表示本月的最后一天”)
		        var nDays = new Date(year, month, 0).getDate();
		 
		        //开始画日历
		        var numRow = 0;  //记录行的个数，到达7的时候创建tr
		        var totalRow=1;
		        var i;        //日期
		        var html = '<tr><td class="title">日</td>'+
					        '<td class="title">一</td>'+
					        '<td class="title">二</td>'+
					        '<td class="title">三</td>'+
		        			'<td class="title">四</td>'+
		        			'<td class="title">五</td>'+
		        			'<td class="title">六</td></tr>';
		        //第一行
		        html+='<tr style="height:1px!important;" class="Spacing"><td class="paddingLeft0" colspan="7"><div class="intervalDivClass" style="width:100%"></div></td></tr>';
		        html += '<tr>';
		        for (i = lastMothStart; startDay!=0&&i<=lastMothend; i++) {
		            html += '<td  id="'+lastStr+'-'+i+'" onclick="prev(this)" data="">';
		            html+='<div class="notSelectMonthDay " title="'+lastStr+'-'+i+'">';
		            html+=i;
		            html+='</div></td>';
		            numRow++;
		        }
		        for (var j = 1; j <= nDays; j++) {
		            if (year==todayY&&month==todayM&&j == todayD) {
		                html += '<td id="'+currentStr+'-'+(j>9?j:'0'+j)+'" onclick="clickDate(this)" data="" >';  
		                html += '<div class="currentCalendar" title="'+currentStr+'-'+(j>9?j:"0"+j)+'">';
		            }
		            else {
		                html += '<td id="'+currentStr+'-'+(j>9?j:'0'+j)+'" onclick="clickDate(this)" data="">';
		                html += '<div title="'+currentStr+'-'+(j>9?j:"0"+j)+'">';
		            }
		            html += j; 
		            html += '</div></td>';
		            numRow++;
		            if (numRow == 7) {  //如果已经到一行（一周）了，重新创建tr
		                numRow = 0;
		                totalRow++;
		                html += '</tr><tr>';
		            }
		        }
				//补充后一个月
		        if(numRow>0){
		        	for(var j=1;j<=7;j++){
			        	html += '<td  id="'+nextStr+'-0'+j+'" onclick="next(this)" data="">';
			        	html+='<div class="notSelectMonthDay " title="'+nextStr+'-0'+j+'">'+j+'</div></td>';
			            numRow++;
			        	if (numRow == 7) {  //如果已经到一行（一周）了，重新创建tr
			                numRow = 0;
			                html += '</tr>';
			                break;
			            }
		        	}
		        }
		        $('#LDay').html(html);
		        initHeight=parseInt($('#LDay').height())+80+40+10+15;
		        if(window.name&&window.name!=''){
		    		parent.document.getElementsByName(window.name)[0].height=initHeight;
		    	}
		        //标记选中日期
		        if(showObj!='undefined'&&showObj!=undefined){
		        	$('div[title="'+showObj+'"]').addClass("currentSelect");
		        }else{
		        	if(selectDate!=todayStr){
			        	$('div[title="'+selectDate+'"]').addClass("currentSelect");
		        	}
		        }
		        //ajax获取数据
				var data = eventData;
				var datas=data.dateevents;
				planData=data.events;
				$(".hashPlanDiv").parent("TD").attr("data","");
				$(".hashPlanDiv").removeClass("hashPlanDiv");
				clearData();
				var sd=$(".currentSelect").attr("title");
			 	if(sd==undefined||sd=='undefined'){
			 		sd=$(".currentCalendar").attr("title");
			 	}
				for(var key in datas){
					//$('#'+key).addClass("hashPlanTD");
					$('#'+key).children('div').eq(0).addClass("hashPlanDiv"); 
					$('#'+key).attr("data",datas[key]);
					if(key==sd){
						//clickDate($('#'+key));
						showData($('#'+key));
					}
					
				}
				
				
				//事件悬浮绑定
				$('#Calendar #LDay td div').hover(function(){
					if($(this).hasClass('hashPlanDiv')){
						var time_hover = this.title;
						var year = parseInt(time_hover.substring(0,4));
						var month = parseInt(time_hover.substring(5,7));
						var day = parseInt(time_hover.substring(8,10));
						var week_day = new Date(year,month - 1,day).getDay();
						var div,offset_l;
						var offset_t = $(this).offset().top - 5;
						if(week_day>3){
							div = '<i class="fa fa-caret-right"></i>';
							offset_l = $(this).offset().left - $(this).width() - $('#show_something').width() - 10;
						}else{
							div = '<i class="fa fa-caret-left"></i>';
							offset_l = $(this).offset().left + $(this).width() + 10;
						}
						//传入参数
						var data=$('#'+time_hover).attr("data");
				 		var datas;
				 		if (typeof (data) == "string") {
				            datas=data.split(",");
				        }
				 		var cnt = 0;
				 		for(var key in datas){
				 			if(isNaN(key)) continue;
				 			div +='<p>'+planData[datas[key]][1]+'</p>';
						    cnt = cnt + 1;
						    if(cnt >=3 && datas.length >3){
						    	div +='<p class="more_msg_p">...</p>';
						    	break;
						    }
				 		}
						//展示最新的3个事件,超过3个则加上下面的...
						//div += '<p>...</p>';
						$('#show_something').html(div);
						$('#show_something').css({top:offset_t+'px',left:offset_l+'px'}).show();
						
					}
				},function(){
					$('#show_something').css({top:0+'px',left:0+'px'}).hide();
				})
		    }
		    function clearData(){
		    	if(window.name&&window.name!=''){
		    		parent.document.getElementsByName(window.name)[0].height=initHeight;
		    	}
		    	$('#planDataEventchd').html("");
		    	$('#planDataEvent').height(10);
		    	$('#planDataEventchd').height(9);
		    	$('#planDataEvent').removeClass("planDataEvent");
//		    	$("#planDataEvent").perfectScrollbar("update");
		    }
		    //点击日期
		    function clickDate(obj){
		 		showData(obj);
		 		reGetDate();
		 	}
		 	function showData(obj){
		 		if(window.name&&window.name!=''){
			    	parent.document.getElementsByName(window.name)[0].height=initHeight;
			    }
		 		if(lastOpt==undefined||lastOpt=='undefined'){
		
		    	}else{
		    	   $(lastOpt).children('div').eq(0).addClass(lastOptCss);	
		    	}
		    	$('div').removeClass("currentSelect");
		    	var divObj=$(obj).children('div').eq(0);
		    	
		    	lastOpt=obj;
		    	lastOptCss=$(divObj).attr("class");
		    	if(!$(divObj).hasClass('hashPlanDiv')){
		    		$(divObj).removeClass(lastOptCss);
		    	}
		    	$(divObj).addClass("currentSelect");
		    	currentSelectDate=$(divObj).attr("title");
		    	clearData();
		 		var data=$(obj).attr("data");
		 		if(data==''){
		 			$("#planDataEventchd").empty();
		 			$("#planDataEvent").css('height','0');
		 			$("#planDataEventchd").css('height','0');
		 			return false;
		 		} 
		 		var datas;
		 		if (typeof (data) == "string") {
		            datas=data.split(",");
		        }
		
		        if (typeof (data) == "object") {
		            datas = data;
		        }
		 		var html='';
		 		var cnt = 0;
		 		for(var key in datas){
		 			if(isNaN(key)) continue;
		 			var c=tc(planData[datas[key]][5]);
		 			//html+='<div data-toggle="modal" data-target="#schedule_plan" class="hand dataEvent" onclick="clickData(\''+datas[key]+'\')" title="'+planData[datas[key]][6]+'\n'+planData[datas[key]][1]+'">';
		 			html+='<div data-toggle="modal" data-target="#schedule_plan" class="hand dataEvent" onclick="clickData(\''+datas[key]+'\')" title="'+'点击查看：'+planData[datas[key]][1]+'">';
				    html+='<div class="dataEvent1" style="background:'+c+';"></div>';
				    //html+='<div class="dataEvent2" ><div class="dataEvent2_1">'+planData[datas[key]][3]+'&nbsp;&nbsp;'+planData[datas[key]][4]+'</div></div>';
				    html+='<div class="dataEvent2" ><div class="dataEvent2_1">'+'事项 '+(cnt+1)+'：'+'</div></div>';
				    html+='<div class="dataEvent3">'+planData[datas[key]][1]+'</div>';
				    html+='</div>';
				    cnt = cnt + 1;
		 		}
		 		if(html=='') html="暂无日程安排";
		 		//html = '<div>'+html+'</div>';
		 		$('#planDataEventchd').html(html);
		 		$('#planDataEventchd').height(cnt * 33);
		 		if(cnt>2){
			 		if(window.name&&window.name!=''){
			    		parent.document.getElementsByName(window.name)[0].height=initHeight+100;
			    	}
//		 			$('#planDataEvent').height(100);
			 		$('#planDataEvent').height((cnt * 33)+1);
//		 			$("#planDataEvent").perfectScrollbar("update");
		 		}else{
		 			if(window.name&&window.name!=''){
			    		parent.document.getElementsByName(window.name)[0].height=initHeight+(cnt * 33)+1;
			    	}
		 			$('#planDataEvent').height((cnt * 33)+1);
		 		} 		
		 	}
		 	function clickData(id){
		 		/*console.log(id);
		 		console.log(eventData.events[id]);*/
		 		var single = eventData.events[id];
		 		
				$(".edit_btn_2").removeClass("hide_div");
				$(".edit_btn_1").addClass("hide_div");
				
				$(".is_can_edit").addClass("cannot_edit");
		 		current_edit_eventID = id;
		 		var condition_title = single[1];
		 		var condition_content= single[2];
		 		//var condition_recipient= "接收人1";
		 		var remindType= single[3];
		 		var remindTime= single[4];
		 		//var endTime= "2018-06-20 22:33:32";
		 		//var condition_type = "日常工作";
		 		//var condition_important_level = 1;
		 		//var condition_remind_type = 2;
		 		/*var condition_prev_h = "2";
		 		var condition_prev_m = "20";
		 		var condition_next_h = "3";
		 		var condition_next_m = "30";*/
		 		$("#condition_title").val(condition_title);
		 		
		 		$("#condition_content").val(condition_content);
		 		$("#remindTime").val(remindTime);
		 		/*$("#endTime").val(endTime);*/
		 	
		 		//$("#condition_type").val(condition_type);
				//$('input[type=radio][name=important_level]').eq(condition_important_level).click();
		 		$('input[type=radio][name=remind_type]').eq(remindType).click();
		 		
		 		$(".img_show_hide").addClass("hide_div");
		 		
//		 		var url='WorkPlanDetail.jsp?from=1&workid='+id;
//		 		//openFullWindowHaveBar(url);
//		 		if(window.top.Dialog){
//					calendarDialog = new window.top.Dialog();
//				} else {
//					calendarDialog = new Dialog();
//				};
//				hasRfdh = true;
//			  	calendarDialog.URL =url;
//			  	calendarDialog.Width = 600;
//				calendarDialog.Height = 600;
//			  	calendarDialog.checkDataChange = false;
//			    calendarDialog.Title="日程";
//			    calendarDialog.show();
		 	}
			function tc(d) {
			  	function zc(c, i) {
			    	var d = "666666888888aaaaaabbbbbbdddddda32929cc3333d96666e69999f0c2c2b1365fdd4477e67399eea2bbf5c7d67a367a994499b373b3cca2cce1c7e15229a36633cc8c66d9b399e6d1c2f029527a336699668cb399b3ccc2d1e12952a33366cc668cd999b3e6c2d1f01b887a22aa9959bfb391d5ccbde6e128754e32926265ad8999c9b1c2dfd00d78131096184cb05288cb8cb8e0ba52880066aa008cbf40b3d580d1e6b388880eaaaa11bfbf4dd5d588e6e6b8ab8b00d6ae00e0c240ebd780f3e7b3be6d00ee8800f2a640f7c480fadcb3b1440edd5511e6804deeaa88f5ccb8865a5aa87070be9494d4b8b8e5d4d47057708c6d8ca992a9c6b6c6ddd3dd4e5d6c6274878997a5b1bac3d0d6db5a69867083a894a2beb8c1d4d4dae54a716c5c8d8785aaa5aec6c3cedddb6e6e41898951a7a77dc4c4a8dcdccb8d6f47b08b59c4a883d8c5ace7dcce";
			    	return "#" + d.substring(c * 30 + i * 6, c * 30 + (i + 1) * 6);
			    }
			    return zc(d, 0);
			}
			function doAdd(){
				$("#remindTime").val("");
				current_edit_eventID = '';
				resize_schedule_plan();
				current_selected_date = $("#LDay").find(".currentSelect").attr("title") || $("#LDay").find(".currentCalendar").attr("title");
				
				
			 	/*var date=new Date();
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var seconds = date.getSeconds();*/
				
				/*$("#remindTime").val(date_day+" "+hours+":"+minutes+":"+seconds);*/
		 		/*$("#endTime").val(date_day+" 23:59:59");*/
				
//			 	var year = date.getFullYear();
//				var month = date.getMonth() + 1;
//				var day = date.getDate();
//			           
//				var selectDate=year+"-"+(month>9?month:"0"+month)+"-"+(day>9?day:"0"+day);
//				if(currentSelectDate!=''){
//					selectDate=currentSelectDate;
//				}
//				var beginTime=(hours>9?hours:"0"+hours)+":"+(minutes>9?minutes:"0"+minutes)+":"+(seconds>9?seconds:"0"+seconds);
////				var url='WorkPlanEdit.jsp?from=1&selectUser=4&planName=&beginDate='+selectDate+'&beginTime='+beginTime+'&endDate='+selectDate+'&endTime=';
//			  	var url='WorkPlanEdit.jsp?from=1&selectUser=4&planName=&beginDate='+selectDate+'&beginTime='+beginTime+'&endDate='+selectDate+'&endTime=';
//			  	//openFullWindowHaveBar(url);
//			  	if(window.top.Dialog){
//					calendarDialog = new window.top.Dialog();
//				} else {
//					calendarDialog = new Dialog();
//				};
//			  	calendarDialog.URL =url;
//			  	calendarDialog.Width = 600;
//				calendarDialog.Height = 600;
//			  	calendarDialog.checkDataChange = false;
//			    calendarDialog.Title="日程";
//			    hasRfdh = true;
//			    calendarDialog.show();
			}
		  
		 
			function refashDate(){
			 	if(calendarDialog &&calendarDialog.closed && hasRfdh ){
			 		hasRfdh = false;
			   		reGetDate();
			 	}
			}
			 
			function reGetDate(){
			 	var selectDate=$(".currentSelect").attr("title");
			 	if(selectDate==undefined||selectDate=='undefined'){
			 		selectDate=$(".currentCalendar").attr("title");
			 	}
			 	var data = eventData;
				var datas=data.dateevents;
				planData=data.events;
				$(".hashPlanDiv").parent("TD").attr("data","");
				$(".hashPlanDiv").removeClass("hashPlanDiv");
				clearData();
				var sd=$(".currentSelect").attr("title");
			 	if(sd==undefined||sd=='undefined'){
			 		sd=$(".currentCalendar").attr("title");
			 	}
				for(var key in datas){
					//$('#'+key).addClass("hashPlanTD");
					$('#'+key).children('div').eq(0).addClass("hashPlanDiv"); 
					$('#'+key).attr("data",datas[key]);
					if(key==sd){
						//clickDate($('#'+key));
						showData($('#'+key));
					}
					
				}
			}
			function closeByHand(){
				calendarDialog.close();	
			}
			function refreshCal(){
			  	calendar();
				calendarDialog.close();	
				
			}
			function getWeekDay(day){
			 	var weekDay="";
			    if(day==0){
			  		weekDay="星期日";
			    }else if(day==1){
			    	weekDay="星期一";
			    }else if(day==2){
			    	weekDay="星期二";
			    }else if(day==3){
			    	weekDay="星期三";
			    }else if(day==4){
			    	weekDay="星期四";
			    }else if(day==5){
			    	weekDay="星期五";
			    }else if(day==6){
			    	weekDay="星期六";
			    }
			 	return weekDay;
			}
			function next(obj){
			 	pageDate.setDate(1);//设置本月第一天
			 	pageDate.setMonth(pageDate.getMonth() + 1);
			 	var idv=$(obj).attr("id");
			 	if(idv!='prevbtn'&&idv!='nextbtn'){
			 		calendar(idv);
			 	}else{
			 		calendar();
			 	}
			}
			function prev(obj){
			 	pageDate.setDate(1);//设置本月第一天
			 	 pageDate.setMonth(pageDate.getMonth() - 1);
			 	var idv=$(obj).attr("id");
			 	if(idv!='prevbtn'&&idv!='nextbtn'){
			 		calendar(idv);
			 	}else{
			 		calendar();
			 	}
			}
			function todayClick(){
				pageDate=new Date(currentToday.getFullYear(),currentToday.getMonth(),currentToday.getDate());
				calendar();
				var year_now = currentToday.getFullYear();
				var month_now = (currentToday.getMonth()+1)>9?(currentToday.getMonth()+1):"0"+(currentToday.getMonth()+1);
				var day_now = currentToday.getDate()>9?currentToday.getDate():"0"+currentToday.getDate();
				var date_now = year_now+"-"+month_now+"-"+day_now;
				$("#"+date_now).click();
			}
			function DateAdd(interval, number, idate) {
			 	var date=new Date(idate.getFullYear(),idate.getMonth(),idate.getDate());
			  	number = parseInt(number);
				switch (interval) {
			   		case "y": date.setFullYear(date.getFullYear() + number); break;
			      	case "m": date.setMonth(date.getMonth() + number); break;
			    	case "d": date.setDate(date.getDate() + number); break;
		           	case "w": date.setDate(date.getDate() + 7 * number); break;
		           	case "h": date.setHours(date.getHours() + number); break;
		           	case "n": date.setMinutes(date.getMinutes() + number); break;
		           	case "s": date.setSeconds(date.getSeconds() + number); break;
		           	case "l": date.setMilliseconds(date.getMilliseconds() + number); break;
		       	}
		       	return date;
			}
			
			//对日程进行操作
			function save_schedule_plan(){
		 		var title = $("#condition_title").val();
		 		var content = $("#condition_content").val();
		 		var remindType = $('input[name=remind_type]:checked').val();
		 		var remindTime = '';
		 		if(remindType == '1'){
		 			remindTime = $("#remindTime").val();
		 		}
		 		var data = {};
		 		
		 		if(current_edit_eventID != ''){
		 			data = {'eventId':current_edit_eventID,'title':title,'content':content,'remindTime':remindTime,'remindType':remindType};
			 		$.ajax({
			 			url:"/activiti/calendar/update",
			 			method:'post',
			 			data : data,
			 			//dataType:'json',
			 			async: false,//需要同步查询，要不然数据来不及载入日历上
						success : function(r) {
							if (r.code==0) {
								layer.msg(r.msg);
								$("#close_schedule_plan").click();
								loadData();
								reGetDate();
							}else{
								layer.msg(r.msg);
							}
						}
			 		});
		 		}else if(current_edit_eventID == ''){
		 			
		 			data = {'ssrq':current_selected_date,'eventId':current_edit_eventID,'title':title,'content':content,'remindTime':remindTime,'remindType':remindType};
			 		$.ajax({
			 			url:"/activiti/calendar/save",
			 			method:'post',
			 			data : data,
			 			//dataType:'json',
			 			async: false,//需要同步查询，要不然数据来不及载入日历上
						success : function(r) {
							if (r.code==0) {
								layer.msg(r.msg);
								$("#close_schedule_plan").click();
								loadData();
								reGetDate();
							}else{
								layer.msg(r.msg);
							}
						}
			 		});
		 		}
		 		//init();
		 		//console.log(data);
		 		
				/*$("#close_schedule_plan").click();
				showData(['2018-06-22']);
		 		reGetDate();*/
			}
			function edit_schedule_plan(){
				$(".is_can_edit").removeClass("cannot_edit");
				$(".edit_btn_1").removeClass("hide_div");
				$(".edit_btn_2").addClass("hide_div");
			}
			function complete_schedule_plan(){
				
				$("#close_schedule_plan").click();
			}
			function delete_schedule_plan(){
				layer.confirm(
					'此项操作不可恢复，请谨慎删除！',{btn:['确定','取消']},
					function(index){
						if(!index){
							 return ;
						}
						
				 		$.ajax({
				 			url:"/activiti/calendar/remove/"+current_edit_eventID,
				 			method:'post',
				 			//dataType:'json',
				 			async: false,//需要同步查询，要不然数据来不及载入日历上
							success : function(r) {
								if (r.code==0) {
									layer.msg(r.msg);
									$("#close_schedule_plan").click();
									loadData();
									reGetDate();
								}else{
									layer.msg(r.msg);
								}
							}
				 		});
				 		
				 		
						//showData(['2018-06-22']);
		 				//reGetDate();
						//layer.close(index);//取消关闭提示框
						
						//$("#close_schedule_plan").click();
						//init();
//						layer.msg('日程删除成功！',{
//							icon:1,
//							offset:'rt',
//							time:2000
//						});
					},
					function(index){
						layer.close(index);//取消关闭提示框
					}
				);
			}
function init(){

	loadData();
//	wuiform.init();
	//为上月，下月，添加添加悬停事件
	$(".addWorkPlan").hover(function(){
		$(this).addClass("addWorkPlan2");
	},function(){
		$(this).removeClass("addWorkPlan2");
	});
	$(".LeftArrow").hover(function(){
		$(this).addClass("LeftArrow2");
	},function(){
		$(this).removeClass("LeftArrow2");
	});
	$(".RightArrow").hover(function(){
		$(this).addClass("RightArrow2");
	},function(){
		$(this).removeClass("RightArrow2");
	});
	initToday();
	calendar();
//	window.setInterval("refashDate()",100);
	var start = {
		elem : "#remindTime", // 选择ID为remindTime的input
		format : "YYYY-MM-DD hh:mm:ss", // 自动生成的时间格式
		min : laydate.now(0),//"1970-01-01 00:00:00", // 设定最小日期
		//max : laydate.now(0), // 最大日期
		// start:laydate.now(0), //设置开始时间为当前时间
		istime : true, // 必须填入时间
		istoday : false, // 是否是当天
		choose:function(datas){
			//end.min = datas; // 开始日选好后,重置结束日的最小日期
//			end.start = datas; // 将结束日的初始值设定为开始日
			changeTask(datas);
		}
	};
	/*var end = {
		elem : "#endTime",
		format : "YYYY-MM-DD hh:mm:ss",
		// min:laydate.now(),
//		max : laydate.now(0),
		istime : true,
		istoday : false,
		choose:function(datas){
			end.start = datas;
			changeTask(datas);
		}
	};*/
	laydate(start);
	/*laydate(end);*/
	/*$("#startTime").val(laydate.now(-1, "YYYY-MM-DD hh:mm:ss"));*/
	/*$("#endTime").val(laydate.now(0, "YYYY-MM-DD hh:mm:ss"));*/
	
	$('input[type=radio][name=remind_type]').change(function() {
        if (this.value == '0') {
           	$("#schedule_remind_time").addClass("hide_div");
        }else{
           	$("#schedule_remind_time").removeClass("hide_div");
        }
    });

}
			
function loadData(){
	
	$.ajax({
		url:"/activiti/calendar/getCalendarEvents",
		method:'get',
		//dataType:'json',
		async: false,//需要同步查询，要不然数据来不及载入日历上
		success : function(data){
			eventData=data;
		}
	});
}








//表格
//$('#inform_online').bootstrapTable({
//	method : 'get', // 服务器数据的请求方式 get or post
//	url : "/oa/notify/selfList", // 服务器数据的加载地址
//	//	showRefresh : true,
//	//	showToggle : true,
//	//	showColumns : true,
//	iconSize : 'outline',
////	toolbar : '#exampleToolbar',
////	striped : true, // 设置为true会有隔行变色效果
//	dataType : "json", // 服务器返回的数据类型
////	pagination : true, // 设置为true会在底部显示分页条
//	// queryParamsType : "limit",
//	// //设置为limit则会发送符合RESTFull格式的参数
//	singleSelect : false, // 设置为true将禁止多选
//	// contentType : "application/x-www-form-urlencoded",
//	// //发送到服务器的数据编码类型
//	pageSize : 1000, // 如果设置了分页，每页数据条数
//	pageNumber : 1, // 如果设置了分布，首页页码
//	//search : true, // 是否显示搜索框
//	showColumns : false, // 是否显示内容下拉框（选择显示的列）
//	sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
//	queryParams : function(params) {
//		return {
//			//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
//			limit : params.limit,
//			offset : params.offset
//		// name:$('#searchName').val(),
//		// username:$('#searchName').val()
//		};
//	},
//	// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
//	// queryParamsType = 'limit' ,返回参数必须包含
//	// limit, offset, search, sort, order 否则, 需要包含:
//	// pageSize, pageNumber, searchText, sortName,
//	// sortOrder.
//	// 返回false将会终止请求
//	columns : [
//		{
//			field : 'title',
//			width: '20%',
//			title : '标题',
//			formatter:function (value,row,index) {
//                return '<a href="#" onclick="read(\''+ row.id+ '\')">'+row.title+'</a>';
//            }
//		}
//	]
//});