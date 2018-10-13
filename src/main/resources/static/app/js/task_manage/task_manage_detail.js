			$(function(){
				var start = {
					elem : "#startTime", // 选择ID为startTime的input
					format : "YYYY-MM-DD hh:mm:ss", // 自动生成的时间格式
					min : "1970-01-01 00:00:00", // 设定最小日期
					max : laydate.now(0), // 最大日期
					// start:laydate.now(0), //设置开始时间为当前时间
					istime : true, // 必须填入时间
					istoday : false, // 是否是当天
					choose:function(datas){
						end.min = datas; // 开始日选好后,重置结束日的最小日期
						end.start = datas; // 将结束日的初始值设定为开始日
						change_condition(this,"startTime");
					}
				};
				var end = {
					elem : "#endTime",
					format : "YYYY-MM-DD hh:mm:ss",
					// min:laydate.now(),
					max : laydate.now(0),
					istime : true,
					istoday : false,
					choose:function(datas){
						end.start = datas;
						change_condition(this,"endTime");
					}
				};
				laydate(start);
				laydate(end);
				$("#startTime").val(laydate.now(-7, "YYYY-MM-DD hh:mm:ss"));
				$("#endTime").val(laydate.now(0, "YYYY-MM-DD hh:mm:ss"));
				
				show_detail_msg();
				
			});
			//	展示详情信息
			function show_detail_msg(){
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
			}
			//	返回
			function go_back(){
				window.location = "task_manage.html";
			}
			//	下载文件
			function downloadFile(){
				location.href = "111.txt";
			}
			
			//	星星评价
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
