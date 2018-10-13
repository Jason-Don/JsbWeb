package com.bootdo.jsb.ywgl.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bootdo.jsb.ywgl.domain.JsbZfrwDO;
import com.bootdo.jsb.ywgl.domain.JsbZfrwFkDO;
import com.bootdo.jsb.ywgl.service.JsbZfrwService;
import com.bootdo.activiti.utils.ActivitiUtils;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 精神病_走访任务
 * 
 * @author zhangf
 * @date 2018-10-11 10:26:33
 */
 
@Controller
@RequestMapping("/ywgl/jsbZfrw")
public class JsbZfrwController {
	@Autowired
	private JsbZfrwService jsbZfrwService;
	@Autowired
	ActivitiUtils activitiUtils;
    @Autowired
    RuntimeService runtimeService;
    @Autowired
    TaskService taskService;
	@GetMapping("/rczf")
	String rczf(){
	    return "jsb/ywgl/rczf";
	}
	
	@GetMapping()
	//@RequiresPermissions("ywgl:jsbZfrw:jsbZfrw")
	String JsbZfrw(){
	    return "jsb/ywgl/jsbZfrw/jsbZfrw";
	}
	
	@ResponseBody
	@GetMapping("/list")
	//@RequiresPermissions("ywgl:jsbZfrw:jsbZfrw")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<JsbZfrwDO> jsbZfrwList = jsbZfrwService.list(query);
		int total = jsbZfrwService.count(query);
		PageUtils pageUtils = new PageUtils(jsbZfrwList, total);
		return pageUtils;
	}
	/**
	 * 走访任务代办 add 20181012 zhangf
	 * @param params
	 * @return
	 */
	@ResponseBody
	@GetMapping("/zfrwDBlist")
	public PageUtils zfrwDBlist(@RequestParam Map<String, Object> params){
		List<Task> tasks = taskService.createTaskQuery().taskCandidateOrAssigned("361181530000").list();
		List<JsbZfrwDO> jsbZfrwList = new ArrayList<JsbZfrwDO>(16);
		for(Task task : tasks){
			if(!"三查一管反馈".equals(task.getName())){
				continue;
			}
	    	//  通过任务对象获取流程实例
	        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(task.getProcessInstanceId()).singleResult();
	        String businessKey = processInstance.getBusinessKey();
	        JsbZfrwDO jsbZfrwDO = jsbZfrwService.get(businessKey);
	        if(jsbZfrwDO == null){
	        	continue;
	        }
	        jsbZfrwDO.setTaskId(task.getId());
	        jsbZfrwList.add(jsbZfrwDO);
		}
		PageUtils pageUtils = new PageUtils(jsbZfrwList, jsbZfrwList.size());
		return pageUtils;
	}
	@GetMapping("/add")
	//@RequiresPermissions("ywgl:jsbZfrw:add")
	String add(){
	    return "ywgl/jsbZfrw/add";
	}

	@GetMapping("/edit/{id}")
	//@RequiresPermissions("ywgl:jsbZfrw:edit")
	String edit(@PathVariable("id") String id,Model model){
		JsbZfrwDO jsbZfrw = jsbZfrwService.get(id);
		model.addAttribute("jsbZfrw", jsbZfrw);
	    return "ywgl/jsbZfrw/edit";
	}
	
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	//@RequiresPermissions("ywgl:jsbZfrw:edit")
	public R update( JsbZfrwDO jsbZfrw){
		jsbZfrwService.update(jsbZfrw);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	//@RequiresPermissions("ywgl:jsbZfrw:remove")
	public R remove( String id){
		if(jsbZfrwService.remove(id)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	//@RequiresPermissions("ywgl:jsbZfrw:batchRemove")
	public R remove(@RequestParam("ids[]") String[] ids){
		jsbZfrwService.batchRemove(ids);
		return R.ok();
	}
	
}
