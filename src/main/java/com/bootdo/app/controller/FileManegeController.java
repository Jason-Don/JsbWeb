package com.bootdo.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/app")
public class FileManegeController {

	@GetMapping("/file_detail")
	String fileDetail(){
		return "app/file_manage/file_detail";
	}
}
