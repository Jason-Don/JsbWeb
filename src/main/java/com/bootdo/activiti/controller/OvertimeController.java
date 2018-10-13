package com.bootdo.activiti.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bootdo.activiti.domain.OvertimeDO;
import com.bootdo.activiti.service.OvertimeService;
import com.bootdo.activiti.utils.ActivitiUtils;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.process.OvertimeProcessService;

/**
 * 加班表
 * 
 * @author zhangf
 * @date 2018-06-13 10:44:56
 */
 
@Controller
@RequestMapping("/activiti/overtime")
public class OvertimeController {
	@Autowired
	private OvertimeService overtimeService;
	
	@GetMapping()
	//@RequiresPermissions("activiti:overtime:overtime")
	String Overtime(){
	    return "activiti/overtime/overtime";
	}
	
	@ResponseBody
	@GetMapping("/list")
	//@RequiresPermissions("activiti:overtime:overtime")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<OvertimeDO> overtimeList = overtimeService.list(query);
		int total = overtimeService.count(query);
		PageUtils pageUtils = new PageUtils(overtimeList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	//@RequiresPermissions("activiti:overtime:add")
	String add(){
	    //return "activiti/overtime/add";
	    return "act/overtime/overtime_flow";
	}

	@GetMapping("/edit/{id}")
	//@RequiresPermissions("activiti:overtime:edit")
	String edit(@PathVariable("id") Integer id,Model model){
		OvertimeDO overtime = overtimeService.get(id);
		model.addAttribute("overtime", overtime);
	    return "activiti/overtime/edit";
	}
	
	
	@Resource
	private OvertimeProcessService overtimeProcessService;
	@Resource
	TaskService taskService;
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	public R save( OvertimeDO overtime){
		overtime.setSqsj(new Date());
		overtime.setYxbz("Y");
		overtime.setStatus("0");
		if(overtimeService.save(overtime)>0){
			ProcessInstance processInstance = overtimeProcessService.startProcess(overtime);
		    Task task = taskService.createTaskQuery()
		    		.processInstanceBusinessKey(processInstance.getBusinessKey()).singleResult();
		    overtime.setTaskId(task.getId());
		    overtime.setComment(overtime.getJbsy());
			Map<String, Object> var = new HashMap<>();
			var.put("var", "发起加班申请");
			overtimeProcessService.completeTaskByUser(overtime,var);
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	//@RequiresPermissions("activiti:overtime:edit")
	public R update( OvertimeDO overtime){
		overtimeService.update(overtime);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	//@RequiresPermissions("activiti:overtime:remove")
	public R remove( Integer id){
		if(overtimeService.remove(id)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	//@RequiresPermissions("activiti:overtime:batchRemove")
	public R remove(@RequestParam("ids[]") Integer[] ids){
		overtimeService.batchRemove(ids);
		return R.ok();
	}
	
	/**
	 * 查看
	 */
	@GetMapping("/overtime_show/{id}")
	String overtimeShow(@PathVariable("id") Integer id,Model model){
		OvertimeDO overtime = overtimeService.get(id);
		model.addAttribute("overtime", overtime);
		return "act/overtime/overtime_show";
	}
	
    @Autowired
    ActivitiUtils activitiUtils;
	/**
	 * 审核
	 */
	@GetMapping("/overtime_sh/{taskId}")
	String overtimeSh(@PathVariable("taskId") String taskId,Model model){
		OvertimeDO overtime = overtimeService.get(Integer.parseInt(activitiUtils.getBusinessKeyByTaskId(taskId)));
		overtime.setTaskId(taskId);
		model.addAttribute("overtime", overtime);
		return "act/overtime/overtime_sh";
	}
	
	
	@ResponseBody
	@PostMapping("/sh_pass")
	//@RequiresPermissions("activiti:overtime:add")
	public R sh_pass( OvertimeDO overtime){
		overtime.setStatus("1");
		if(overtimeService.update(overtime)>0){
			overtime.setComment(overtime.getShyj());
			Map<String, Object> var = new HashMap<>();
			var.put("var","审核通过");
			overtimeProcessService.completeTaskByUser(overtime,var);
			return R.ok();
		}
		return R.error();
	}
	@ResponseBody
	@PostMapping("/sh_reject")
	//@RequiresPermissions("activiti:overtime:add")
	public R sh_reject( OvertimeDO overtime){
		overtime.setStatus("2");
		if(overtimeService.update(overtime)>0){
			overtime.setComment(overtime.getShyj());
			Map<String, Object> var = new HashMap<>();
			var.put("var","审核不通过");
			overtimeProcessService.completeTaskByUser(overtime,var);
			return R.ok();
		}
		return R.error();
	}
}
