package com.bootdo.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bootdo.system.domain.RoleDO;
import com.bootdo.system.domain.UserDO;
import com.bootdo.system.service.RoleService;
import com.bootdo.system.service.UserService;

@Controller
@RequestMapping("/app/user")
public class UserContoller {
	@Autowired
	UserService userService;
	@Autowired
	RoleService roleService;
	@GetMapping("/userTree_single")
	String getUserTree_Single()
	{
		return "app/user/userTree_Single";
	}
	@GetMapping("/usersbook")
	String OpenUsersBook(){
		return "app/user/users_book";
	}

	@GetMapping("/userdetail/{id}")
	String userdetail(@PathVariable("id") Long id,Model model){
		UserDO userDO = userService.get(id);
		model.addAttribute("user", userDO);
		List<RoleDO> roles = roleService.list(id);
		model.addAttribute("roles", roles);
		return "app/user/user_detail";
	}
	@ResponseBody
	@GetMapping("/myinfo/{id}")
	Map<String,String> myinfo(@PathVariable("id") Long id){
		UserDO userDO = userService.get(id);
		Map<String, String> map=new HashMap<String, String>();
		if(userDO.getSex()!=null){
			map.put("sex", userDO.getSex().toString());
		}else{map.put("sex","待填写");}
		if(userDO.getMobile()!=null){
			map.put("mobile", userDO.getMobile().toString());
		}else{map.put("mobile","待填写");}
		if(userDO.getDeptName()!=null){
			map.put("dept", userDO.getDeptName().toString());
		}else{map.put("dept","待填写");}
		return map;
	}
}
