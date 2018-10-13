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
						{"news_title":"文件A","news_textarea":"新闻内容A","news_type":"新闻类型A","news_remark":"新闻备注A"},
						{"news_title":"文件B","news_textarea":"新闻内容B","news_type":"新闻类型A","news_remark":"新闻备注B"},
						{"news_title":"文件C","news_textarea":"新闻内容C","news_type":"新闻类型A","news_remark":"新闻备注S"},
						{"news_title":"文件D","news_textarea":"新闻内容D","news_type":"新闻类型A","news_remark":"新闻备注H"},
						{"news_title":"文件E","news_textarea":"新闻内容R","news_type":"新闻类型A","news_remark":"新闻备注HD"},
						{"news_title":"文件F","news_textarea":"新闻内容F","news_type":"新闻类型A","news_remark":"新闻备注A"},
						{"news_title":"文件G","news_textarea":"新闻内容J","news_type":"新闻类型A","news_remark":"新闻备注ASS"},
						{"news_title":"文件H","news_textarea":"新闻内容L","news_type":"新闻类型A","news_remark":"新闻备注SA"},
						{"news_title":"文件I","news_textarea":"新闻内容W","news_type":"新闻类型A","news_remark":"新闻备注BA"}
					]
				};
				$('#exampleTable').bootstrapTable('load',result.rows);
//				var html = '';
//				for(var i=0;i<result.rows.length;i++){
//					html = 
//						'<div onclick="check_detail(this);" class="tab_edit_div mui-table-view-cell">'+
//						'	<div class="mui-slider-right mui-disabled">'+
//						'		<a class="mui-btn mui-btn-red" onclick="delete_li(this);">删除</a>'+
//						'	</div>'+
//						'	<div class="mui-slider-handle">'+
//						'		<img src="../images/query.png" />'+
//						result.rows[i].news_title+
//						'	</div>'+
//						'</div>';
//					$("#file_list_div").append(html);
//				}
			}
			//	查看详情操作
			function operate(value,row,index){
				return '<div onclick="check_detail(this);" class="tab_edit_div"><img src="../images/folder.png" />'+row.news_title+'</div>';
//				var html = 
//					'<div onclick="check_detail(this);" class="tab_edit_div mui-table-view-cell">'+
//					'	<div class="mui-slider-right mui-disabled">'+
//					'		<a class="mui-btn mui-btn-red" onclick="delete_li(this);">删除</a>'+
//					'	</div>'+
//					'	<div class="mui-slider-handle">'+
//					'		<img src="../images/query.png" />'+
//					'		dsgas'+
//					'	</div>'+
//					'</div>';
//					return html;
			}
			//查看详细_跳转页面
			function check_detail(e){
//				if(is_click){
//					window.location = "file_detail.html";
//				}
				window.location = "file_detail.html";
			}
			//	返回
			function go_back(){
				window.location = "../index.html";
			}
//			var is_click = false;
//			var Mouse = {
//				x: 0,
//				y: 0,
//				mousedown: function (event, e){
//					Mouse.x = event.clientX;
//					Mouse.y = event.clientY;
//				},
//				mouseup: function (event){
//					if(event.clientX != Mouse.x || event.clientY != Mouse.y ){
//						is_click = false;
//					}else{
//						is_click = true;
//					}
//				}
//			}
//			document.body.onmousedown = Mouse.mousedown;
//			document.body.onmouseup = Mouse.mouseup;
			
			function delete_li(e){
				event.stopPropagation();
			}
