package com.bootdo.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.activiti.engine.HistoryService;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.bootdo.activiti.domain.FkDO;
import com.bootdo.activiti.domain.WorkflowDO;
import com.bootdo.activiti.service.FkService;
import com.bootdo.activiti.service.WorkflowService;
import com.bootdo.activiti.utils.ActivitiUtils;
import com.bootdo.common.utils.R;
import com.bootdo.system.domain.UserDO;
import com.bootdo.system.service.UserService;

@Controller
@RequestMapping("/app/workflow")
public class APPWorkFlowController {
	@Resource
	private WorkflowService workflowService;
	@Autowired
	FkService fkService;
	@GetMapping()
	String Workflow() {
		return "app/work_flow/work_flow";
	}

	@GetMapping("/work_flow_add")
	String Workflow_add() {
		return "app/work_flow/work_flow_add";
	}

	@GetMapping("/work_flow_img")
	String work_flow_img() {
		return "app/work_flow/work_flow_img";
	}

	@GetMapping("/work_flow_detail/{id}")
	String work_flow_detail(@PathVariable("id") String id, Model model) {
		WorkflowDO workflowDO = workflowService.get(id);
		model.addAttribute("workflow", workflowDO);
		return "app/work_flow/work_flow_detail";
	}

	// 子页面 退回
	@GetMapping("/rejectpage")
	public String workflow_back() {
		return "app/task_manage/sub_return";
	}

	/**
	 * 任务退回
	 */
	@ResponseBody
	@PostMapping("/reject")
	public R reject(WorkflowDO workflowDO) {
		workflowDO.setTaskPass("0");
		Map<String, Object> var = new HashMap<String, Object>();
		var.put("pass", workflowDO.getTaskPass());
		System.out.println(JSONObject.toJSONString(workflowDO));
		workflowService.completeTaskByUser(workflowDO, var);
		return R.ok();
	}

	@Autowired
	ActivitiUtils activitiUtils;

	@GetMapping("/fp/{taskId}")
	String fpTask(@PathVariable("taskId") String taskId, Model model) {
		System.out.println("已经执行到了分配任务阶段。");
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "app/task_manage/task_manage_fp";
	}

	/**
	 * 任务分配
	 */
	@ResponseBody
	@PostMapping("/fpOk")
	public R fpOk(WorkflowDO workflowDO) {
		// workflowDO.setTaskPass("1");
		if ("JB".equals(workflowDO.getRwbllx())) {
			workflowDO.setCbry(workflowDO.getRwqtr());
			workflowDO.setCbryMc(workflowDO.getRwqtrMc());
		}
		if ("".equals(workflowDO.getRwqtr())) {// 没有牵头人，就不更新这个字段
			workflowDO.setRwqtr(null);
			workflowDO.setRwqtrMc(null);
		}
		if (workflowService.update(workflowDO) > 0) {
			Map<String, Object> var = new HashMap<String, Object>();
			var.put("pass", workflowDO.getTaskPass());
			var.put("rwbllx", workflowDO.getRwbllx());
			workflowService.completeTaskByUser(workflowDO, var);

			return R.ok();
		}
		return R.error();
	}

	/**
	 * 重新指定、分配承办人页面
	 */
	@Autowired
	private UserService userService;
	@Autowired
	HistoryService historyService;
	@Autowired
	ProcessEngine processEngine;
	@Autowired
	TaskService taskService;
	
	@GetMapping("/cxfp/{taskId}")
	public String zdcbryTask(@PathVariable("taskId") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		taskService.createTaskQuery().taskId(taskId);
		Task task = taskService.createTaskQuery() // 创建任务查询
				.taskId(taskId) // 根据任务id查询
				.singleResult();
		List<HistoricTaskInstance> historyTask = processEngine
				.getHistoryService() // 历史相关Service
				.createHistoricTaskInstanceQuery() // 创建历史任务实例查询
				.executionId(task.getExecutionId()) // .processInstanceId(task.getProcessInstanceId())
				.finished().list();
		HistoricTaskInstance preNode = historyTask.get(historyTask.size() - 1);
		String preNodeAssignee = preNode.getAssignee();// 上一个节点 （承办人签收任务）代办人
		UserDO user = userService.get(Long.valueOf(preNodeAssignee));
		workflowDO.setPreTaskId(preNode.getId());
		workflowDO.setAssignee(String.valueOf(user.getUserId()));
		workflowDO.setAssigneeMc(user.getName());
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "app/task_manage/task_manage_cxfp";
	}

	/**
	 * 牵头人处理页
	 */
	@GetMapping("/qtr_cl/{id}")
	public String qtrCl(@PathVariable("id") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "app/task_manage/task_manage_qtr_cl";
	}

	/**
	 * 牵头人审核
	 */
	@GetMapping("/qtr_sh/{id}")
	public String qtrsh(@PathVariable("id") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);

		setPreNodeAssignee(workflowDO);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("workflowId", workflowDO.getId());
		map.put("cbryId", workflowDO.getAssignee());
		map.put("sfshtg", "");
		List<FkDO> list = fkService.list(map);
		
		FkDO fkDO = list.get(0);
		
		model.addAttribute("workflow", workflowDO);
		model.addAttribute("fkDO", fkDO);
		return "app/task_manage/task_manage_qtr_sh";
	}
	// 子页面 反馈
	@GetMapping("/feedback")
	public String workflow_feedback() {
		return "app/task_manage/sub_fk";
	}

	// 子页面 牵头人-分办任务
	@GetMapping("/fb")
	public String workflow_points_for() {
		return "app/task_manage/sub_qtr_fb";
	}
	//子页面 牵头人审核提交
	@GetMapping("/sub_sh")
	public String sh() {
		return "app/task_manage/sub_sh";
	}

	// 重新分配任务--终止
	@GetMapping("/sub_end")
	public String end() {
		return "app/task_manage/sub_end";
	}

	/**
	 * 修改页面
	 */
	@GetMapping("/modify/{id}")
	public String modify(@PathVariable("id") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "app/task_manage/task_manage_modify";
	}

	/**
	 * 承办人 反馈页
	 */
	@GetMapping("/fk/{taskId}")
	public String fkTask(@PathVariable("taskId") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "app/task_manage/task_manage_fk";
	}

	/**
	 * 任务评价页面
	 */
	@GetMapping("/pj/{taskId}")
	public String pjTask(@PathVariable("taskId") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "app/task_manage/task_manage_pj";
	}

	private WorkflowDO setPreNodeAssignee(WorkflowDO workflowDO){
		String taskId = workflowDO.getTaskId();
		Task task = taskService.createTaskQuery() // 创建任务查询
				.taskId(taskId) // 根据任务id查询
				.singleResult();
		// 获取的是所有节点历史
		/*
		 * List<HistoricTaskInstance> historyNode = historyService
		 * .createHistoricTaskInstanceQuery
		 * ().processInstanceId(task.getProcessInstanceId()) .list();
		 */
		// 获取所有task节点历史
		List<HistoricTaskInstance> historyTask = processEngine
				.getHistoryService() // 历史相关Service
				.createHistoricTaskInstanceQuery() // 创建历史任务实例查询
				.executionId(task.getExecutionId()) // .processInstanceId(task.getProcessInstanceId())
				.finished().list();
		if(historyTask.size() >0 ){
			HistoricTaskInstance preNode = historyTask.get(historyTask.size() - 1);
			String preNodeAssignee = preNode.getAssignee();// 上一个节点 （承办人签收任务）代办人
			workflowDO.setPreTaskId(preNode.getId());
			UserDO user = userService.get(Long.valueOf(preNodeAssignee));
			workflowDO.setAssignee(String.valueOf(user.getUserId()));
			workflowDO.setAssigneeMc(user.getName());
		}
		if(historyTask.size() >1 ){
			HistoricTaskInstance pre2Node = historyTask.get(historyTask.size() - 2);
			String pre2NodeAssignee = pre2Node.getAssignee();// 向前推2个节点 （承办人签收任务）代办人
			workflowDO.setPre2TaskId(pre2Node.getId());
			UserDO user2 = userService.get(Long.valueOf(pre2NodeAssignee));
			workflowDO.setPr2Assignee(String.valueOf(user2.getUserId()));
			workflowDO.setPr2AssigneeMc(user2.getName());
		}
		// String currNodeAssignee = task.getAssignee();
		// workflowDO.setAssignee(task.getAssignee()); 错误写法
		// task.getAssignee()是当前节点
		workflowDO.setTaskId(taskId);
		
		return workflowDO;
	}
	
	//历史流转页面
	@GetMapping("/history/{id}")
	String history(@PathVariable("id") String workflow_id, Model model){
		model.addAttribute("workflow_id",workflow_id);
		return "app/work_flow/workflow_history";
	}
	
}
