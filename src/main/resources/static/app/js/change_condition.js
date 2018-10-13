function change_condition(e,id){
	if(!id){
		$(e).addClass("change_color");
//		$(e).siblings("input").addClass("change_color");
//		$(e).siblings("select").addClass("change_color");
	}else if(id.indexOf("kkxx") != -1){
		$('#'+id).siblings(".btn-group").addClass("change_color");
	}else if(id == "monitor_kakou"){
		$('#'+id).siblings(".fs-label-wrap").addClass("change_color");
//	}else if(id == "license"){
//		$('#'+id).addClass("change_color");
//		$('#schema').addClass("change_color");
//	}else if(id == "schema"){
//		$('#'+id).addClass("change_color");
//		$('#license').addClass("change_color");
	}else{
		$('#'+id).addClass("change_color");
//		$('#'+id).siblings("input").addClass("change_color");
//		$('#'+id).siblings("select").addClass("change_color");
	}
}