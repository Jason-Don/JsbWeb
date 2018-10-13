package com.bootdo.app.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bootdo.common.controller.BaseController;


@Controller
@RequestMapping("/app/task_manage")
public class AppTaskManageController extends BaseController {

	@GetMapping("/task_manage")
	String taskManage(){
		return "app/task_manage/task_manage";
	}
	@GetMapping("/task_img")
	String task_img() {
		return "/app/task_manage/task_img";
	}
//	@Log("请求访问app主页")
//	@GetMapping({ "/app/index" })
//	String index(Model model) {
//		model.addAttribute("userid", getUser().getUserId());
//		model.addAttribute("username", getUser().getUsername());
//		model.addAttribute("name", getUser().getName());
//		return "/app/index";
//	}
	
}
