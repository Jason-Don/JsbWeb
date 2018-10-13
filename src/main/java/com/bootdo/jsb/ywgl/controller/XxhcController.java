package com.bootdo.jsb.ywgl.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/jsb/ywgl")
public class XxhcController {

	@GetMapping("/xxhc")
	public String xxhc(){
		return "jsb/ywgl/xxhc";
	}
}
