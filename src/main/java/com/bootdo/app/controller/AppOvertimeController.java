package com.bootdo.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bootdo.activiti.domain.OvertimeDO;
import com.bootdo.activiti.service.OvertimeService;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.utils.Query;

@Controller
@RequestMapping("/app")
public class AppOvertimeController extends BaseController{

	@GetMapping("/over_time")
	String overtime(){
		return "app/over_time/over_time";
	}
	
	@Resource
	OvertimeService overtimeService;
	@GetMapping("/over_time/list")
	@ResponseBody
	List<OvertimeDO> list(){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("sqrId", getUserId());
		List<OvertimeDO> overtimeList = overtimeService.list(params);
		return overtimeList;
	}
	
	@GetMapping("/over_time/over_time_detail/{id}")
	String over_time_detail(@PathVariable("id") Integer id,Model model){
		OvertimeDO overtime = overtimeService.get(id);
		model.addAttribute("overtime", overtime);
		return "app/over_time/over_time_detail";
	}
	
	
	@GetMapping("/over_time/over_time_add")
	String over_time_add(){
		return "app/over_time/over_time_add";
	}
	
	@GetMapping("/over_time/over_time_sh/{id}/{taskId}")
	String over_time_sh(@PathVariable("id") Integer id,@PathVariable("taskId") String taskId,Model model){
		OvertimeDO overtime = overtimeService.get(id);
		overtime.setTaskId(taskId);
		model.addAttribute("overtime", overtime);
		return "app/over_time/over_time_sh";
	}
}
