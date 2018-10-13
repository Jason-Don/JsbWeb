			$(function(){
				$('#exampleTable').bootstrapTable({
					iconSize: 'outline',
					queryParams:'queryParams',
					icons: {
						refresh: 'glyphicon-repeat',
						toggle: 'glyphicon-list-alt',
						columns: 'glyphicon-list'
					}
				});
				check_tab();
			});
			function check_tab(){
				var result = {
					"rows":[
						{"news_title":"新闻标题A","news_textarea":"新闻内容A","news_type":"新闻类型A","news_remark":"新闻备注A"},
						{"news_title":"新闻标题B","news_textarea":"新闻内容B","news_type":"新闻类型A","news_remark":"新闻备注B"},
						{"news_title":"新闻标题C","news_textarea":"新闻内容C","news_type":"新闻类型A","news_remark":"新闻备注S"},
						{"news_title":"新闻标题D","news_textarea":"新闻内容D","news_type":"新闻类型A","news_remark":"新闻备注H"},
						{"news_title":"新闻标题E","news_textarea":"新闻内容R","news_type":"新闻类型A","news_remark":"新闻备注HD"},
						{"news_title":"新闻标题F","news_textarea":"新闻内容F","news_type":"新闻类型A","news_remark":"新闻备注A"},
						{"news_title":"新闻标题G","news_textarea":"新闻内容J","news_type":"新闻类型A","news_remark":"新闻备注ASS"},
						{"news_title":"新闻标题H","news_textarea":"新闻内容L","news_type":"新闻类型A","news_remark":"新闻备注SA"},
						{"news_title":"新闻标题I","news_textarea":"新闻内容W","news_type":"新闻类型A","news_remark":"新闻备注BA"}
					]
				};
				$('#exampleTable').bootstrapTable('load',result.rows);
			}
			//	查看详情操作
			function operate(value,row,index){
				return '<div onclick="check_detail(this);" class="tab_edit_div">'+row.news_title+'</div>';
			}
			//查看详细_跳转页面
			function check_detail(e){
				window.location = "interior_news_detail.html";
			}
			//	返回
			function go_back(){
				window.location = "../index.html";
			}
