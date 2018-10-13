package com.bootdo.activiti.controller;

import com.bootdo.activiti.domain.FkDO;
import com.bootdo.activiti.domain.HistoryDO;
import com.bootdo.activiti.domain.WorkflowDO;
import com.bootdo.activiti.service.FkService;
import com.bootdo.activiti.service.MsgService;
import com.bootdo.activiti.service.WorkflowService;
import com.bootdo.activiti.utils.ActivitiUtils;
import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.TaskDO;
import com.bootdo.common.service.FilesService;
import com.bootdo.common.service.JobService;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.system.domain.UserDO;
import com.bootdo.system.service.UserService;

import org.activiti.engine.HistoryService;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.history.HistoricVariableInstance;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Comment;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * @author:zhangf
 * @description:
 * @date:2018/6/13
 */
@Controller
@RequestMapping("/act/workflow")
public class WorkflowProcessController extends BaseController {

	@Autowired
	private BootdoConfig bootdoConfig;
	@Resource
	private WorkflowService workflowService;
	@Autowired
	private JobService taskScheduleJobService;
	/**
	 * 1、保存WorkflowDO对象 2、启动流程
	 * 
	 * @param workflowDO
	 * @return
	 */

	@Autowired
	FilesService filesService;
	@Autowired
	MsgService msgService;

	@ResponseBody
	@PostMapping("/saveAndStart")
	public R saveAndStart(@RequestParam("file") MultipartFile file,
			HttpServletRequest request) {
		Enumeration<String> em = request.getParameterNames();
		Map<String, String> map = new HashMap<String, String>();
		while (em.hasMoreElements()) {
			String name = (String) em.nextElement();
			String value = request.getParameter(name);
			map.put(name, value);
		}
		WorkflowDO workflowDO = new WorkflowDO(map);
		String fileMc = file.getOriginalFilename();
		if (!"".equals(fileMc)) {// 上传了文件才保存 modify
			workflowDO.setFileMc(fileMc);
			String id = filesService.save(file);
			workflowDO.setFileId(id);
		}

		workflowDO.setCjsj(new Date());
		workflowDO.setYxbz("Y");
		workflowDO.setId(UUID.randomUUID().toString().replace("-", ""));

		// 保存业务数据
		if (workflowService.save(workflowDO) > 0) {
			// 启动流程
			ProcessInstance processInstance = workflowService
					.startProcess(workflowDO);
			Task task = taskService
					.createTaskQuery()
					.processInstanceBusinessKey(
							processInstance.getBusinessKey()).singleResult();
			workflowDO.setTaskId(task.getId());
			workflowDO.setComment(workflowDO.getBlyj());
			// Comment comment =
			// workflowService.addComment(processInstance.getBusinessKey(),workflowDO.getComment());
			Map<String, Object> var = new HashMap<>();
			workflowService.completeTaskByUser(workflowDO, var);

			//自动发送短信提醒
			boolean isMsgOn = taskScheduleJobService.isMsgOn();
			if(isMsgOn){
				msgService.sendMsgFromSystem(workflowDO.getId(),workflowDO.getTaskName(),
						workflowDO.getRwzpry().split(","));
			}
			return R.ok();
		} else {
			return R.error();
		}
	}

	@ResponseBody
	@PostMapping("/modifySaveAndStart")
	public R modifySaveAndStart(@RequestParam("file") MultipartFile file,
			HttpServletRequest request) {
		Enumeration<String> em = request.getParameterNames();
		Map<String, String> map = new HashMap<String, String>();
		while (em.hasMoreElements()) {
			String name = (String) em.nextElement();
			String value = request.getParameter(name);
			map.put(name, value);
		}
		WorkflowDO workflowDO = new WorkflowDO(map);
		String fileMc = file.getOriginalFilename();
		if (!"".equals(fileMc) && fileMc != null) {// 上传了新附件
			workflowDO.setFileMc(fileMc);
			String fileId = (String) request.getParameter("fileId");
			filesService.update(file, fileId);
		}

		workflowDO.setId((String) request.getParameter("id"));
		workflowDO.setTaskId((String) request.getParameter("taskId"));
		// 保存业务数据
		if (workflowService.update(workflowDO) > 0
				&& workflowService.updateRwly(workflowDO) > 0) {
			Map<String, Object> var = new HashMap<String, Object>();
			workflowDO.setComment(workflowDO.getBlyj());
			workflowService.completeTaskByUser(workflowDO, var);
			
			//自动发送短信提醒
			boolean isMsgOn = taskScheduleJobService.isMsgOn();
			if(isMsgOn){
				msgService.sendMsgFromSystem(workflowDO.getId(),workflowDO.getTaskName(),
						workflowDO.getRwzpry().split(","));
			}
			
			return R.ok();
		} else {
			return R.error();
		}
	}

	@ResponseBody
	@PostMapping("/start")
	public R start(WorkflowDO workflowDO) {

		workflowService.startProcess(workflowDO);
		return R.ok();

	}

	@ResponseBody
	@RequestMapping("/startProcess/{taskId}")
	public R startProcess(@PathVariable("taskId") String taskId) {
		WorkflowDO workflow = workflowService.get(taskId);
		workflowService.startProcess(workflow);
		return R.ok();
	}

	@Autowired
	private UserService userService;

	@RequestMapping("/workflow_add")
	public String addWorkflow() {
		/*
		 * UserDO userDO = userService.get(getUserId());
		 * model.addAttribute("user",userDO);
		 */
		return "act/workflow/workflow_add";
	}

	/**
	 * 签收页
	 */
	@GetMapping("/workflow_zdld/{taskId}")
	String addTask(@PathVariable("taskId") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "act/workflow/workflow_zdld";
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/saveAndCommit")
	// @RequiresPermissions("activiti:workflow:add")
	public R saveAndCommit(WorkflowDO workflowDO) {
		if (workflowService.update(workflowDO) > 0) {
			Map<String, Object> var = new HashMap<String, Object>();
			workflowService.addComment(workflowDO.getId(),
					workflowDO.getComment());
			workflowService.completeTaskByUser(workflowDO.getTaskId(), var);
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 签收页
	 */
	@Autowired
	ActivitiUtils activitiUtils;

	@GetMapping("/workflow_sign/{taskId}")
	String signTask(@PathVariable("taskId") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "act/workflow/workflow_sign";
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
		workflowService.completeTaskByUser(workflowDO, var);
		
		
		WorkflowDO workflowDO2 = workflowService.get(workflowDO.getId());
		//自动发送短信提醒
		boolean isMsgOn = taskScheduleJobService.isMsgOn();
		if(isMsgOn){
			HistoricTaskInstance historicTaskInstance = processEngine.getHistoryService()
					.createHistoricTaskInstanceQuery()
					.taskId(workflowDO.getTaskId())
					.singleResult();
			String msgReceiveUser = "";
			if(null != historicTaskInstance){
				String taskNodeId = historicTaskInstance.getTaskDefinitionKey();
				switch(taskNodeId){
				case "usertask2"://说明当前操作节点是usertask2 领导分配节点
					msgReceiveUser = workflowDO2.getCjryId();
					break;
				case "usertask3"://说明当前操作节点是usertask3 牵头人处理任务
					msgReceiveUser = workflowDO2.getCjryId();
					break;
				case "usertask4"://说明当前操作节点是usertask4 子流程-承办人处理
					msgReceiveUser = workflowDO2.getRwzpry();
					break;
				case "usertask7"://说明当前操作节点是usertask7子流程-牵头人审核 
					msgReceiveUser = workflowDO2.getRwqtr();
					break;
				/*case "usertask5"://说明当前操作节点是usertask5 子流程-重新分配任务 这里终止流程不发送。当子流程完全结束再发送
					break;*/
				}
			}
				if(!"".equals(msgReceiveUser)){
					msgService.sendMsgFromSystem(workflowDO2.getId(),workflowDO2.getTaskName(),
							msgReceiveUser.split(","));
				}

		}

		return R.ok();

	}
	@GetMapping("/workflow_fp/{taskId}")
	String fpTask(@PathVariable("taskId") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "act/workflow/workflow_fp";
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
			//自动发送短信提醒
			boolean isMsgOn = taskScheduleJobService.isMsgOn();
			if(isMsgOn){
				WorkflowDO workflowDO2 = workflowService.get(workflowDO.getId());
				msgService.sendMsgFromSystem(workflowDO2.getId(),workflowDO2.getTaskName(),
						workflowDO2.getCbry().split(","));
			}
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 承办人 签收页
	 */
	@GetMapping("/workflow_sign_cbry/{taskId}")
	String signCbryTask(@PathVariable("taskId") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "act/workflow/workflow_sign_cbry";
	}

	/**
	 * 承办人 签收
	 */
	@ResponseBody
	@PostMapping("/signCbry")
	public R signCbry(WorkflowDO workflowDO) {
		//String userId = workflowDO.getZzblry();
		if ("1".equals(workflowDO.getTaskPass())) {
			WorkflowDO beforeWorkflowDO = workflowService.get(workflowDO
					.getId());// 获取更新前Zzblry
			if (beforeWorkflowDO.getZzblry() != null
					&& !"".equals(beforeWorkflowDO.getZzblry())) {
				String newZzblry = beforeWorkflowDO.getZzblry() + ","
						+ workflowDO.getZzblry();
				workflowDO.setZzblry(newZzblry);
			}
			if (beforeWorkflowDO.getZzblryMc() != null
					&& !"".equals(beforeWorkflowDO.getZzblryMc())) {
				String newZzblryMc = beforeWorkflowDO.getZzblryMc() + ","
						+ workflowDO.getZzblryMc();
				workflowDO.setZzblryMc(newZzblryMc);
			}
			workflowService.update(workflowDO);
		}
		Map<String, Object> var = new HashMap<String, Object>();
		var.put("pass", workflowDO.getTaskPass());
		workflowService.completeTaskByUser(workflowDO.getTaskId(), var);
		return R.ok();
	}

	/**
	 * 承办人 反馈页
	 */
	@GetMapping("/workflow_fk/{taskId}")
	public String fkTask(@PathVariable("taskId") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "act/workflow/workflow_fk";
	}

	@ResponseBody
	@PostMapping("/workflow_zjfk")
	public R fkTask(@RequestParam("file_fk") MultipartFile file,
			HttpServletRequest request) {
		String workflowId = request.getParameter("id");
		String fkqksm = request.getParameter("fkqksm");

		FkDO fkDO = new FkDO();
		fkDO.setWorkflowId(workflowId);
		fkDO.setCjsj(new Date());
		fkDO.setFileMc(file.getOriginalFilename());
		String id = filesService.save(file);
		fkDO.setFileId(id);
		fkDO.setFkqksm(fkqksm);
		fkDO.setSfshtg("");
		String taskId = request.getParameter("taskId");
		Map<String, Object> var = new HashMap<String, Object>();
		var.put("pass", "1");
		fkDO.setSfshtg("Y");//不用审核
		
		if (fkService.save(fkDO) > 0) {
			WorkflowDO workflowDO = new WorkflowDO();
			workflowDO.setId(workflowId);
			workflowDO.setTaskId(taskId);
			workflowDO.setComment(fkqksm);
			workflowService.completeTaskByUser(workflowDO, var);
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 反馈
	 */
	@Autowired
	FkService fkService;

	@ResponseBody
	@PostMapping("/workflow_fk")
	public R fkCommitTask(@RequestParam("file_fk") MultipartFile file,
			HttpServletRequest request) {
		/*
		 * Enumeration<String> em = request.getParameterNames();
		 * Map<String,String> map = new HashMap<String, String>(); while
		 * (em.hasMoreElements()) { String name = (String) em.nextElement();
		 * String value = request.getParameter(name); map.put(name, value); }
		 * WorkflowDO workflowDO = new WorkflowDO(map); String workflowId =
		 * workflowDO.getId();
		 */
		String workflowId = request.getParameter("id");
		String fkqksm = request.getParameter("fkqksm");

		FkDO fkDO = new FkDO();
		fkDO.setWorkflowId(workflowId);
		fkDO.setCjsj(new Date());
		fkDO.setFileMc(file.getOriginalFilename());
		String id = filesService.save(file);
		fkDO.setFileId(id);
		fkDO.setFkqksm(fkqksm);
		fkDO.setSfshtg("");
		String taskId = request.getParameter("taskId");
		Map<String, Object> var = new HashMap<String, Object>();
		
		WorkflowDO workflowDO2 = workflowService.get(workflowId);
		if(null != workflowDO2.getRwqtr() && !"".equals(workflowDO2.getRwqtr())){//任务牵头人分配的任务
			var.put("pass", "2");
			msgService.sendMsgFromSystem(workflowDO2.getId(),workflowDO2.getTaskName(),
					workflowDO2.getRwqtr().split(","));
		}else{
			var.put("pass", "1");
			fkDO.setSfshtg("Y");//不用审核
		}
		if (fkService.save(fkDO) > 0) {
			WorkflowDO workflowDO = new WorkflowDO();
			workflowDO.setId(workflowId);
			workflowDO.setTaskId(taskId);
			workflowDO.setComment(fkqksm);
			workflowService.completeTaskByUser(workflowDO, var);
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 承办人 签收
	 */
	@ResponseBody
	@PostMapping("/rwwc")
	public R rwwc(WorkflowDO workflowDO) {
		//String userId = workflowDO.getZzblry();
		Map<String, Object> var = new HashMap<String, Object>();
		workflowService.completeTaskByUser(workflowDO.getTaskId(), var);
		return R.ok();
	}

	/**
	 * 任务评价页面
	 */
	@GetMapping("/workflow_pj/{taskId}")
	public String pjTask(@PathVariable("taskId") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "act/workflow/workflow_pj";
	}

	/**
	 * 完成任务评价
	 */
	@ResponseBody
	@PostMapping("/wcqkpj")
	public R wcqkpj(WorkflowDO workflowDO) {
		//String userId = workflowDO.getCjryId();
		if (workflowService.update(workflowDO) > 0) {
			Map<String, Object> var = new HashMap<String, Object>();
			workflowDO.setComment(workflowDO.getWcqkpj());
			workflowService.completeTaskByUser(workflowDO, var);
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 重新指定、分配承办人页面
	 */
	@Autowired
	HistoryService historyService;
	@Autowired
	ProcessEngine processEngine;

	@GetMapping("/workflow_zdcbry_sub/{taskId}")
	public String zdcbryTask(@PathVariable("taskId") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));

		taskService.createTaskQuery().taskId(taskId);

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
		HistoricTaskInstance preNode = historyTask.get(historyTask.size() - 1);

		String preNodeAssignee = preNode.getAssignee();// 上一个节点 （承办人签收任务）代办人
		// String currNodeAssignee = task.getAssignee();
		// workflowDO.setAssignee(task.getAssignee()); 错误写法
		// task.getAssignee()是当前节点
		UserDO user = userService.get(Long.valueOf(preNodeAssignee));

		workflowDO.setPreTaskId(preNode.getId());

		workflowDO.setAssignee(String.valueOf(user.getUserId()));
		workflowDO.setAssigneeMc(user.getName());

		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "act/workflow/workflow_zdcbry_sub";
	}

	@Autowired
	TaskService taskService;

	@ResponseBody
	@PostMapping("/zdcbry_sub")
	public R changeCbry(WorkflowDO workflowDO) {// @RequestParam Map<String,
												// Object> params
		String[] cbry = workflowDO.getCbry().split(",");
		String[] cbryMc = workflowDO.getCbryMc().split(",");

		String new_cbry = "";
		String new_cbryMc = "";

		String assignee = workflowDO.getAssignee();
		String assigneeMc = workflowDO.getAssigneeMc();

		for (String s : cbry) {
			if (!s.equals(assignee)) {
				new_cbry += s;
				new_cbry += ",";
			}
		}

		for (String s : cbryMc) {
			if (!s.equals(assigneeMc)) {
				new_cbryMc += s;
				new_cbryMc += ",";
			}
		}
		if (!"0".equals(workflowDO.getTaskPass())) {// 终止任务操作
			new_cbry += workflowDO.getNewAssignee();
			new_cbry += ",";
			new_cbryMc += workflowDO.getNewAssigneeMc();
		}

		workflowDO.setCbry(new_cbry);
		workflowDO.setCbryMc(new_cbryMc);

		Map<String, Object> var = new HashMap<String, Object>();
		var.put("pass", workflowDO.getTaskPass());

		if (workflowService.update(workflowDO) > 0) {
			if ("1".equals(workflowDO.getTaskPass())) {
				var.put("rwcbry", workflowDO.getNewAssignee());
				workflowService.completeTaskByUser(workflowDO, var);
				//自动发送短信提醒
				boolean isMsgOn = taskScheduleJobService.isMsgOn();
				if(isMsgOn){
					WorkflowDO workflowDO2 = workflowService.get(workflowDO.getId());
					msgService.sendMsgFromSystem(workflowDO2.getId(),workflowDO2.getTaskName(),
							workflowDO.getNewAssignee().split(","));
				}
			} else if ("0".equals(workflowDO.getTaskPass())) {
				workflowService.completeTaskByUser(workflowDO, var);
			}

			return R.ok();
		}
		// taskService.setAssignee(workflowDO.getTaskId(), "130");
		return R.error();
	}

	@ResponseBody
	@GetMapping("/loadFkInfo/{id}")
	public List<FkDO> loadFkInfo(@PathVariable("id") String id) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("workflowId", id);
		map.put("sfshtg", "Y");
		List<FkDO> fkDOList = fkService.list(map);
		return fkDOList;
	}

	/**
	 * 任务评价页面
	 */
	@GetMapping("/workflow_show/{id}")
	public String show(@PathVariable("id") String id, Model model) {
		WorkflowDO workflowDO = workflowService.get(id);
		model.addAttribute("workflow", workflowDO);
		return "act/workflow/workflow_show";
	}

	/**
	 * 修改页面
	 */
	@GetMapping("/workflow_modify/{id}")
	public String modify(@PathVariable("id") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "act/workflow/workflow_modify";
	}

	/**
	 * 牵头人处理页
	 */
	@GetMapping("/workflow_qtr_cl/{id}")
	public String qtrCl(@PathVariable("id") String taskId, Model model) {
		WorkflowDO workflowDO = workflowService.get(activitiUtils
				.getBusinessKeyByTaskId(taskId));
		workflowDO.setTaskId(taskId);
		model.addAttribute("workflow", workflowDO);
		return "act/workflow/workflow_qtr_cl";
	}

	@GetMapping("/workflow_history")
	public String workflow_history() {
		return "activiti/workflow/workflow_history";
	}

	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
			"yyyy-mm-dd  HH:mm:ss");

	@GetMapping("/history/{businessKey}")
	@ResponseBody
	public PageUtils history(@PathVariable("businessKey") String businessKey) {
		// public PageUtils history(@RequestParam Map<String, Object> params){
		/*
		 * Query query = new Query(params); String businessKey = (String)
		 * params.get("businessKey");
		 */
		List<HistoricTaskInstance> hti = processEngine.getHistoryService()
				// 历史相关Service
				.createHistoricTaskInstanceQuery()
				.processInstanceBusinessKey(businessKey).finished().list();
		List<HistoryDO> list = new ArrayList<HistoryDO>();
		if (!hti.isEmpty()) {

			for (HistoricTaskInstance h : hti) {
				HistoryDO historyDO = new HistoryDO();
				String title = h.getName();//
				String assigneeId = h.getAssignee();
				String assigneeName = userService.get(Long.valueOf(assigneeId))
						.getName();
				// String endTime = simpleDateFormat.format(h.getEndTime());
				List<Comment> commentList = taskService.getTaskComments(h
						.getId());
				if (commentList.size() == 0) {
					return null;
				}
				Comment comment = commentList.get(commentList.size() - 1);

				// Map<String, Object> variables =
				// taskService.getVariablesLocal("717513");

				List<HistoricVariableInstance> variableInstancList = historyService
						.createHistoricVariableInstanceQuery()
						.taskId(comment.getTaskId()).list();
				HistoricVariableInstance variable = null;
				for (HistoricVariableInstance var : variableInstancList) {
					if ("pass".equals(var.getVariableName()) || "var".equals(var.getVariableName())) {
						variable = var;
					}
				}
				String czType = "";
				if ("usertask1".equals(h.getTaskDefinitionKey())) {// 发起任务人
					czType += "发起任务";
				} else if (variable != null) {
					if ("pass".equals(variable.getVariableName())) {
						/*
						 * usertask2 //领导分配 usertask3 //牵头人处理 usertask4 //子流程 -
						 * 承办人 usertask5 //子流程 - 重新分配
						 */
						if ("usertask2".equals(h.getTaskDefinitionKey())) {// 领导分配
							if ("0".equals(variable.getValue())) {
								czType += "退回";
							}
							if ("1".equals(variable.getValue())) {
								czType += "分配";
							}
						}
						if ("usertask3".equals(h.getTaskDefinitionKey())) {// 牵头人处理
							if ("0".equals(variable.getValue())) {
								czType += "退回";
							}
							if ("1".equals(variable.getValue())) {
								czType += "反馈";
							}
							if ("2".equals(variable.getValue())) {
								czType += "分办";
							}
						}
						if ("usertask4".equals(h.getTaskDefinitionKey())) {// 子流程
																			// -
																			// 承办人
							if ("0".equals(variable.getValue())) {
								czType += "退回";
							}
							if ("1".equals(variable.getValue())) {
								czType += "反馈";
							}
							if ("2".equals(variable.getValue())) {
								czType += "反馈";
							}
						}
						if ("usertask5".equals(h.getTaskDefinitionKey())) {// 子流程
																			// -
																			// 重新分配
							if ("0".equals(variable.getValue())) {
								czType += "终止任务";
							}
							if ("1".equals(variable.getValue())) {
								czType += "重新分配";
							}
						}
						if("usertask7".equals(h.getTaskDefinitionKey())){
							if ("0".equals(variable.getValue())) {
								czType += "审核不通过";
							}
							if ("1".equals(variable.getValue())) {
								czType += "审核通过";
							}
						}
						
					}else if("var".equals(variable.getVariableName())){
						czType += variable.getValue();
					}
				} else if ("usertask6".equals(h.getTaskDefinitionKey())) {// 发起任务人
					czType += "任务评价";
				}
				historyDO.setTitle(title);
				historyDO.setAssigneeId(assigneeId);
				historyDO.setAssigneeName(assigneeName);
				historyDO.setEndTime(h.getEndTime());
				historyDO.setComment(comment.getFullMessage());
				historyDO.setCzType(czType);
				list.add(historyDO);
				/*
				 * HistoricVariableInstance historicVariableInstance =
				 * processEngine
				 * .getHistoryService().createHistoricVariableInstanceQuery
				 * ().id(h.getId()).singleResult();
				 * //.processInstanceId(h.getProcessInstanceId
				 * ()).singleResult(); if(historicVariableInstance != null){
				 * historicVariableInstance.getVariableName();
				 * historicVariableInstance.getValue(); }
				 */

			}
		}
		PageUtils pageUtils = new PageUtils(list, list.size());
		return pageUtils;
	}
	/**
	 * 审核页面
	 */
	@GetMapping("/workflow_qtr_sh/{id}")
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
		return "act/workflow/workflow_qtr_sh";
	}
	/**
	 * 审核
	 */
	@ResponseBody
	@PostMapping("/sh")
	public R sh(WorkflowDO workflowDO,HttpServletRequest request) {
		//String userId = workflowDO.getCjryId();
		String fk_id = request.getParameter("fk_id");
		FkDO fkDO = new FkDO();
		fkDO.setId(Integer.parseInt(fk_id));
		if("1".equals(workflowDO.getTaskPass())){//审核通过
			fkDO.setSfshtg("Y");
		}else{
			fkDO.setSfshtg("N");
		}
		fkDO.setShyj(workflowDO.getComment());
		if (fkService.update(fkDO) > 0) {
			Map<String, Object> var = new HashMap<String, Object>();
			var.put("pass", workflowDO.getTaskPass());
			workflowService.completeTaskByUser(workflowDO, var);
			
			
			if("N".equals(fkDO.getSfshtg())){//审核不通过
				WorkflowDO workflowDO2 = workflowService.get(workflowDO.getId());
				
				FkDO fkDO2 = fkService.get(Integer.parseInt(fk_id));
				String msgReceive = fkDO2.getCbryId();
				msgService.sendMsgFromSystem(workflowDO2.getId(),workflowDO2.getTaskName(),
						msgReceive.split(","));
			}
			
			return R.ok();
		}

		return R.error();
	}
	// 子页面 退回
	@GetMapping("/workflow_return")
	public String workflow_back() {
		return "act/workflow/sub_return";
	}

	// 子流程 子页面 反馈
	@GetMapping("/workflow_feedback")
	public String workflow_feedback() {
		return "act/workflow/sub_fk";
	}

	// 牵头人直接  反馈
	@GetMapping("/sub_zjfk")
	public String workflow_zjfk() {
		return "act/workflow/sub_zjfk";
	}
	// 子页面 领导分配任务--分办/交办
	@GetMapping("/workflow_assigning_task")
	public String workflow_assigning_task() {
		return "act/workflow/sub_ldfp";
	}

	// 子页面 牵头人-分办任务
	@GetMapping("/workflow_points_for")
	public String workflow_points_for() {
		return "act/workflow/sub_qtr_fb";
	}

	// 子页面 重新分配任务--更换处理人
	@GetMapping("/workflow_afresh_allot")
	public String workflow_afresh_allot() {
		return "act/workflow/sub_cxfp";
	}

	// 子页面 重新分配任务--终止
	@GetMapping("/sub_end")
	public String end() {
		return "act/workflow/sub_end";
	}
	// 子页面 审核
	@GetMapping("/sub_sh")
	public String sh() {
		return "act/workflow/sub_sh";
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
	@GetMapping("/fkHistory/{workflowId}")
	@ResponseBody
	public List<FkDO> fkHistory(@PathVariable("workflowId") String workflowId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("workflowId", workflowId);
		map.put("cbryId", getUserId());
		List<FkDO> fkDOList = fkService.list(map);
		return fkDOList;
	}
}
