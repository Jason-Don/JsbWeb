
/** 相当于ajax请求拦截器  */
$.ajaxSetup({
	global:true,
	type:"post",
	complete:function(XMLHttpReqeust,textStatus){
		var data = XMLHttpReqeust.responseText ;
		if(typeof(data) != "undefined" && data == "timeout"){
			if(window.top != window.self){
				swal({
				      title: "登录超时,是否重新进行登录验证?",
				      type: "warning",
				      showCancelButton: true,
				      confirmButtonColor: "#DD6B55",
				      confirmButtonText: "是",
				      cancelButtonText:"否",
				      closeOnConfirm: false
				  },function(isConfirm){
					  if(isConfirm){
						  window.top.location.reload() ;
					  }
				  }) ;
				
			}
		}else if(data==null || (typeof(data) == "object") 
				&& textStatus=="parsererror"){
			swal("错误信息:","请求失败!","error") ;
		}
	}
}) ;

$.ajaxSetup({
	global:true,
	type:"get",
	complete:function(XMLHttpReqeust,textStatus){
		var data = XMLHttpReqeust.responseText ;
		if(typeof(data) != "undefined" && data == "timeout"){
			if(window.top != window.self){
				swal({
				      title: "登录超时,是否重新进行登录验证?",
				      type: "warning",
				      showCancelButton: true,
				      confirmButtonColor: "#DD6B55",
				      confirmButtonText: "是",
				      cancelButtonText:"否",
				      closeOnConfirm: false
				  },function(isConfirm){
					  if(isConfirm){
						  window.top.location.reload() ;
					  }
				  }) ;
				
			}
		}else if(data==null || (typeof(data) == "object") 
				&& textStatus=="parsererror"){
			swal("错误信息:","请求失败!","error") ;
		}
	}
}) ;

