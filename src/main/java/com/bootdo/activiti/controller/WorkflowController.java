package com.bootdo.activiti.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.activiti.engine.HistoryService;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.task.IdentityLink;
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

import com.bootdo.activiti.domain.WorkflowDO;
import com.bootdo.activiti.service.WorkflowService;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.system.domain.UserDO;
import com.bootdo.system.service.UserService;

/**
 * 工作流程表
 * 
 * @author zhangf
 * @email ${email}
 * @date 2018-06-13 09:36:49
 */
 
@Controller
@RequestMapping("/activiti/workflow")
public class WorkflowController {
	@Autowired
	private WorkflowService workflowService;
	
	@GetMapping()
	//@RequiresPermissions("activiti:workflow:workflow")
	String Workflow(){
	    return "activiti/workflow/workflow";
	}
	
    @Autowired
    TaskService taskService;
    @Autowired
    RuntimeService runtimeService;
    @Autowired
    HistoryService historyService;
    @Autowired
    UserService userService;
    @Autowired
    RepositoryService repositoryService;
	@ResponseBody
	@GetMapping("/list")
	//@RequiresPermissions("activiti:workflow:workflow")
	public PageUtils list(@RequestParam Map<String, Object> params){
		List<String> delKey = new ArrayList<String>(10);
		Set<String> keySet = params.keySet();
		Iterator<String> iterator = keySet.iterator();
		while(iterator.hasNext()){
			String key = iterator.next();
			if("".equals(params.get(key))){
				delKey.add(key);
			}
		}
		for(String key : delKey){
			params.remove(key);
		}
		if(null != params.get("deptIds")){
			params.replace("deptIds", params.get("deptIds").toString().split(","));
		}
		List<WorkflowDO> workflowList = null;
		int total = 0;
		//查询列表数据
		if(params.isEmpty()){//区分 add by zhangf
			workflowList = workflowService.list(params);
			total = workflowService.count(params);
		}else{
			Query query = new Query(params);
			workflowList = workflowService.list(query);
			total = workflowService.count(query);
		}
        
		//查询任务的当前处理人员
		for(WorkflowDO wf : workflowList){
			//if( !"end".equals(wf.getRwzt())){
				String businessKey = wf.getId();
				
				List<Task> list = taskService.createTaskQuery()
						.processInstanceBusinessKey(businessKey).list();
				String assignees = "";
				String assigneeMcs = "";
				for(Task task : list){
					String taskId = task.getId();
					List<IdentityLink> identityLinksForTask = taskService.getIdentityLinksForTask(taskId);
					if(identityLinksForTask.size()<=0){
						continue;
					}
					String currentTaskUserId = identityLinksForTask.get(identityLinksForTask.size()-1).getUserId();
			        if(!"".equals(currentTaskUserId) && currentTaskUserId != null){
				        
				        UserDO user = userService.get(Long.valueOf(currentTaskUserId));
				        assignees += String.valueOf(user.getUserId())+",";
				        assigneeMcs += user.getName()+",";
			        }
				}
				if(!assignees.equals("")){
					assignees = assignees.substring(0, assignees.length()-1);
				}
				if(!assigneeMcs.equals("")){
					assigneeMcs = assigneeMcs.substring(0, assigneeMcs.length()-1);
				}
		        wf.setAssignee(assignees);
		        wf.setAssigneeMc(assigneeMcs);
			//}

		}
		
		PageUtils pageUtils = new PageUtils(workflowList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	//@RequiresPermissions("activiti:workflow:add")
	String add(){
	    return "activiti/workflow/add";
	}

	@GetMapping("/edit/{taskId}")
	//@RequiresPermissions("activiti:workflow:edit")
	String edit(@PathVariable("taskId") String taskId,Model model){
		WorkflowDO workflow = workflowService.get(taskId);
		model.addAttribute("workflow", workflow);
	    return "activiti/workflow/edit";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	//@RequiresPermissions("activiti:workflow:add")
	public R save( WorkflowDO workflow){
		workflow.setCjsj(new Date());
		workflow.setYxbz("Y");
		if(workflowService.save(workflow)>0){
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	//@RequiresPermissions("activiti:workflow:edit")
	public R update( WorkflowDO workflow){
		workflowService.update(workflow);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	//@RequiresPermissions("activiti:workflow:remove")
	public R remove( String taskId){
		if(workflowService.remove(taskId)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	//@RequiresPermissions("activiti:workflow:batchRemove")
	public R remove(@RequestParam("ids[]") String[] taskIds){
		workflowService.batchRemove(taskIds);
		return R.ok();
	}
	
}
