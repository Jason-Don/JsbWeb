package com.bootdo.activiti.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.bootdo.activiti.domain.Tjfx_OvertimeBar;
import com.bootdo.activiti.domain.Tjfx_WorkflowBarDO;
import com.bootdo.activiti.service.TjfxService;

/**
 * 
 * @author zhangf
 * @date 2018-07-14
 */
@Controller
@RequestMapping("/tjfx")
public class TjfxController {

	@Autowired
	TjfxService tjfxService;
	
	@ResponseBody
	@RequestMapping("/getWorkflowBar")
	public List<Tjfx_WorkflowBarDO> getWorkflowBar(@RequestParam("conditions") String conditions){
		JSONArray jsonarray=JSONArray.parseArray(conditions);
		Object[] conditions_array=jsonarray.toArray();
		//System.out.println("后台接收到的conditions是："+conditions_array[0]);
		List<Tjfx_WorkflowBarDO> t = tjfxService.getWorkflowBar(conditions_array);
		return t;
	}
	
	@ResponseBody
	@RequestMapping("/getOvertimeBar")
	public List<Tjfx_OvertimeBar> getOvertimeBar(@RequestParam("conditions") String conditions){
		JSONArray jsonarray=JSONArray.parseArray(conditions);
		Object[] conditions_array=jsonarray.toArray();
		List<Tjfx_OvertimeBar> t = tjfxService.getOvertimeBar(conditions_array);
		return t;
	}
	
	@ResponseBody
	@RequestMapping("/getCurrentYear")
	public String getCurrentYear(){
		String t = tjfxService.getCurrentYear();
		return t;
	}
}
