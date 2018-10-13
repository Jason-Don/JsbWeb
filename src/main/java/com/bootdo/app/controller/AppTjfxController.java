package com.bootdo.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/app/tjfx")
public class AppTjfxController {

	@GetMapping()
	String OpenTjfxPage(){
		return "app/tjfx/echarts_tjfx";
	}
}
