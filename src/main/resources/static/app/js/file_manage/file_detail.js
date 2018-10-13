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
				show_detail_msg();
			});
			function show_detail_msg(){
				
			}
			//	返回
			function go_back(){
				window.location = "file_list.html";
			}
			function submit_workflow(){
				go_back();
			}
