package com.bootdo.app.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bootdo.common.annotation.Log;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.FileDO;
import com.bootdo.common.domain.Tree;
import com.bootdo.system.domain.MenuDO;


@Controller
public class AppLoginController extends BaseController {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@GetMapping("/app/login")
	String appLogin(){
		return "app/login";
	}
	
	@Log("请求访问app主页")
	@GetMapping({ "/app/index" })
	String index(Model model) {
		if(getUser() == null){//登录过期
			return "app/login";
		}
		model.addAttribute("userid", getUser().getUserId());
		model.addAttribute("username", getUser().getUsername());
		model.addAttribute("name", getUser().getName());
		return "app/index";
	}
	
}
