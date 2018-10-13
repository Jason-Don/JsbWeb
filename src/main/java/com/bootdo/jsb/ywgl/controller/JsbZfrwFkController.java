package com.bootdo.jsb.ywgl.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
import com.bootdo.jsb.ywgl.service.JsbZfrwFkService;
import com.bootdo.jsb.ywgl.service.JsbZfrwService;
import com.bootdo.process.ZoufangProcessService;
import com.bootdo.activiti.utils.ActivitiUtils;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.common.utils.ShiroUtils;

/**
 * 精神病_走访任务_反馈
 * 
 * @author zhangf
 * @email 1992lcg@163.com
 * @date 2018-10-11 10:26:33
 */
 
@Controller
@RequestMapping("/ywgl/jsbZfrwFk")
public class JsbZfrwFkController {
	@Autowired
	private JsbZfrwFkService jsbZfrwFkService;
	@Autowired
	private JsbZfrwService jsbZfrwService;
	@Autowired
	ActivitiUtils activitiUtils;
    @Autowired
    RuntimeService runtimeService;
    @Autowired
    TaskService taskService;
    @Autowired
    ZoufangProcessService zoufangProcessService;
	
	@GetMapping()
	//@RequiresPermissions("ywgl:jsbZfrwFk:jsbZfrwFk")
	String JsbZfrwFk(){
	    return "/jsb/ywgl/jsbZfrwFk/jsbZfrwFk";
	}
	
	@ResponseBody
	@GetMapping("/list")
	//@RequiresPermissions("ywgl:jsbZfrwFk:jsbZfrwFk")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<JsbZfrwFkDO> jsbZfrwFkList = jsbZfrwFkService.list(query);
		int total = jsbZfrwFkService.count(query);
		PageUtils pageUtils = new PageUtils(jsbZfrwFkList, total);
		return pageUtils;
	}
	/**
	 * 走访任务代办 add 20181012 zhangf
	 * @param params
	 * @return
	 */
	@ResponseBody
	@GetMapping("/zfrwFkDBlist")
	public PageUtils zfrwFkDBlist(@RequestParam Map<String, Object> params){
		List<Task> tasks = taskService.createTaskQuery().taskCandidateOrAssigned("361181530000").list();
		List<JsbZfrwFkDO> jsbZfrwFkList = new ArrayList<JsbZfrwFkDO>(16);
		for(Task task : tasks){
			if(!"审阅".equals(task.getName())){
				continue;
			}
	    	//  通过任务对象获取流程实例
	        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(task.getProcessInstanceId()).singleResult();
	        String businessKey = processInstance.getBusinessKey();
	        Map<String, Object> map = new HashMap<String, Object>(1);
	        map.put("zfrwId", businessKey);
	        List<JsbZfrwFkDO> list = jsbZfrwFkService.list(map);
	        
	        if(list.size() == 0){
	        	continue;
	        }
	        JsbZfrwFkDO jsbZfrwFkDO = list.get(0);
	        jsbZfrwFkDO.setTaskId(task.getId());
	        jsbZfrwFkList.add(jsbZfrwFkDO);
		}
		PageUtils pageUtils = new PageUtils(jsbZfrwFkList, jsbZfrwFkList.size());
		return pageUtils;
	}
	@GetMapping("/add")
	//@RequiresPermissions("ywgl:jsbZfrwFk:add")
	String add(){
	    return "jsb/ywgl/jsbZfrwFk/add";
	}
	@GetMapping("/add/{taskId}")
	String addZfFk(@PathVariable("taskId") String taskId,Model model){
		String businessKeyByTaskId = activitiUtils.getBusinessKeyByTaskId(taskId);
		JsbZfrwDO jsbZfrwDO = jsbZfrwService.get(businessKeyByTaskId);
		JsbZfrwFkDO jsbZfrwFkDO = new JsbZfrwFkDO();
		jsbZfrwFkDO.setZfrwId(jsbZfrwDO.getId());
		jsbZfrwFkDO.setHzMc(jsbZfrwDO.getBzfhzMc());
		jsbZfrwFkDO.setHzSfzhm(jsbZfrwDO.getBzfhzSfzhm());
		jsbZfrwFkDO.setTaskId(taskId);
		jsbZfrwFkDO.setZfmjMc(ShiroUtils.getUser().getUsername());
		model.addAttribute("jsbZfrwFkDO", jsbZfrwFkDO);
	    return "jsb/ywgl/jsbZfrwFk/add";
	}
	@ResponseBody
	@PostMapping("/syTg")
	public R syTg(JsbZfrwFkDO jsbZfrwFk){
		String taskId = jsbZfrwFk.getTaskId();
		String id = jsbZfrwFk.getId();
		JsbZfrwFkDO updateJsbZfrwFk = new JsbZfrwFkDO();
		updateJsbZfrwFk.setId(id);
		updateJsbZfrwFk.setIsread(1);
		updateJsbZfrwFk.setReadTime(new Date());
		if(jsbZfrwFkService.update(updateJsbZfrwFk)>0){
			zoufangProcessService.completeTaskByUser(taskId);
			return R.ok();
		}
		return R.error();
	}
	@GetMapping("/sy/{taskId}")
	String sy(@PathVariable("taskId") String taskId,Model model){
		String businessKeyByTaskId = activitiUtils.getBusinessKeyByTaskId(taskId);
        Map<String, Object> map = new HashMap<String, Object>(1);
        map.put("zfrwId", businessKeyByTaskId);
        List<JsbZfrwFkDO> list = jsbZfrwFkService.list(map);
        if(list.size()==0){
        	return null;
        }
		JsbZfrwFkDO jsbZfrwFkDO2 = list.get(0);
		jsbZfrwFkDO2.setTaskId(taskId);
		model.addAttribute("jsbZfrwFkDO", jsbZfrwFkDO2);
	    return "jsb/ywgl/jsbZfrwFk/sy";
	}
	@GetMapping("/show/{id}")
	String show(@PathVariable("id") String id,Model model){
		JsbZfrwFkDO jsbZfrwFk = jsbZfrwFkService.get(id);
		model.addAttribute("jsbZfrwFk", jsbZfrwFk);
	    return "jsb/ywgl/jsbZfrwFk/show";
	}
	
	@GetMapping("/edit/{id}")
	//@RequiresPermissions("ywgl:jsbZfrwFk:edit")
	String edit(@PathVariable("id") String id,Model model){
		JsbZfrwFkDO jsbZfrwFk = jsbZfrwFkService.get(id);
		model.addAttribute("jsbZfrwFk", jsbZfrwFk);
	    return "ywgl/jsbZfrwFk/edit";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	//@RequiresPermissions("ywgl:jsbZfrwFk:add")
	public R save( JsbZfrwFkDO jsbZfrwFk){
		String taskId = jsbZfrwFk.getTaskId();
		jsbZfrwFk.setId(UUID.randomUUID().toString().replace("-", ""));
		if(jsbZfrwFkService.save(jsbZfrwFk)>0){
			zoufangProcessService.completeTaskByUser(taskId);
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	//@RequiresPermissions("ywgl:jsbZfrwFk:edit")
	public R update( JsbZfrwFkDO jsbZfrwFk){
		jsbZfrwFkService.update(jsbZfrwFk);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	//@RequiresPermissions("ywgl:jsbZfrwFk:remove")
	public R remove( String id){
		if(jsbZfrwFkService.remove(id)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	//@RequiresPermissions("ywgl:jsbZfrwFk:batchRemove")
	public R remove(@RequestParam("ids[]") String[] ids){
		jsbZfrwFkService.batchRemove(ids);
		return R.ok();
	}
	
}
