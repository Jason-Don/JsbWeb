package com.bootdo.process;

import com.alibaba.fastjson.JSON;
import com.bootdo.activiti.config.ActivitiConstant;
import com.bootdo.activiti.domain.WorkflowDO;
import com.bootdo.activiti.service.MsgService;
import com.bootdo.activiti.service.WorkflowService;
import com.bootdo.activiti.service.impl.ActTaskServiceImpl;
import com.bootdo.common.service.JobService;
import com.bootdo.common.utils.ShiroUtils;

import org.activiti.engine.HistoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.impl.identity.Authentication;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Comment;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

/**
 * @author:zhangf
 * @description:
 * @date:2018/6/13
 */
@Service
public class WorkflowProcessService {

	/**
	 * 查询任务创建人员
	 * 
	 * @param delegateExecution
	 * @return
	 */
	public String findCjry(DelegateExecution delegateExecution) {
		String bussinessKey = delegateExecution.getProcessBusinessKey();
		WorkflowDO workflowDO = workflowService.get(bussinessKey);
		return workflowDO.getCjryId();
	}

	/**
	 * 查询任务评价人员
	 * 
	 * @param delegateExecution
	 * @return
	 */
	public String findRwpjry(DelegateExecution delegateExecution) {
		String bussinessKey = delegateExecution.getProcessBusinessKey();
		WorkflowDO workflowDO = workflowService.get(bussinessKey);
		return workflowDO.getRwzpry();
	}

	@Resource
	private WorkflowService workflowService;

	/**
	 * 获得办理人员
	 * 
	 * @param delegateExecution
	 * @return
	 */
	public List<String> findBlry(DelegateExecution delegateExecution) {
		String bussinessKey = delegateExecution.getProcessBusinessKey();
		WorkflowDO workflowDO = workflowService.get(bussinessKey);
		String cbryStr = workflowDO.getCbry();
		String[] cbryStrs = cbryStr.split(",");
		List<String> cbryList = Arrays.asList(cbryStrs);
		return cbryList;
	}

	/**
	 * 查询领导 (领导指定任务办理人)
	 * 
	 * @param delegateExecution
	 * @return
	 */
	public List<String> findRwzpry(DelegateExecution delegateExecution) {
		String taskId = delegateExecution.getProcessBusinessKey();
		WorkflowDO workflow = workflowService.get(taskId);
		String rwzprys = workflow.getRwzpry();
		String[] rwzpryArray = rwzprys.split(",");
		return Arrays.asList(rwzpryArray);
	}

	/**
	 * 查询任务签收领导 (任务签收领导)
	 * 
	 * @param delegateExecution
	 * @return
	 */
	public String findRwzpqsry(DelegateExecution delegateExecution) {
		String taskId = delegateExecution.getProcessBusinessKey();
		WorkflowDO workflow = workflowService.get(taskId);
		if(null != workflow.getRwqtr() && !"".equals(workflow.getRwqtr())){//任务牵头人分配的任务
			return workflow.getRwqtr();
		}else{
			return workflow.getRwzpry();
		}
	}
	public String findRwqtr(DelegateExecution delegateExecution){
		String taskId = delegateExecution.getProcessBusinessKey();
		WorkflowDO workflow = workflowService.get(taskId);
		return workflow.getRwqtr();
	}

	/**
	 * 承办人员
	 * 
	 * @param delegateExecution
	 * @return
	 */
	public List<String> findCbry(DelegateExecution delegateExecution) {
		String taskId = delegateExecution.getProcessBusinessKey();
		WorkflowDO workflow = workflowService.get(taskId);
		String cbrys = workflow.getCbry();
		String[] cbryArray = cbrys.split(",");
		return Arrays.asList(cbryArray);
	}

	/**
	 * 最终办理人员
	 * 
	 * @param delegateExecution
	 * @return
	 */
	public List<String> findZzblry(DelegateExecution delegateExecution) {
		String taskId = delegateExecution.getProcessBusinessKey();
		WorkflowDO workflow = workflowService.get(taskId);
		String[] zzblryArray = workflow.getZzblry().split(",");
		return Arrays.asList(zzblryArray);
	}

	/**
	 * 启动任务流程
	 */
	@Autowired
	private ActTaskServiceImpl actTaskService;

	@Transactional(rollbackFor = Exception.class)
	public ProcessInstance startProcess(WorkflowDO workflowDO) {
		// salary.setId(UUID.randomUUID().toString().replace("-",""));
		ProcessInstance processInstance = actTaskService.startProcess(
				ActivitiConstant.ACTIVITI_WORKFLOW[0],
				ActivitiConstant.ACTIVITI_WORKFLOW[1], workflowDO.getId(),
				workflowDO.getTaskName(), new HashMap<>());
		return processInstance;
		// return salaryDao.save(salary);
	}
	public void changeStatus(DelegateExecution delegateExecution, String stasus) {
		// leaveInfoMapper.updateByPrimaryKey();
		System.out.println("修改业务单据状态：->" + stasus);
		String businessKey = delegateExecution.getProcessBusinessKey();
		WorkflowDO workflow = workflowService.get(businessKey);
		if ("end".equals(stasus)) {
			workflow.setSjrwwcsj(new Date());
		}
		if ("ing".equals(stasus)) {
			workflow.setFqsj(new Date());
		}
		workflow.setRwzt(stasus);
		workflowService.update(workflow);
	}

	/**
	 * 审批
	 * 
	 * @param taskID
	 *            任务id
	 * @param userID
	 *            审批人id
	 * @param audit
	 *            审批意见 pass/reject
	 */
	@Autowired
	TaskService taskService;
	@Autowired
	HistoryService historyService;
	@Autowired
	RuntimeService runtimeService;
	public void completeTaskByUser(String taskID, Map<String, Object> var) {
		// 认领任务
		taskService.claim(taskID, String.valueOf(ShiroUtils.getUserId()));
		//按taskID 保存任务节点变量
		taskService.setVariablesLocal(taskID, var);
		// 完成任务
		taskService.complete(taskID, var);
	}
	
	public void completeTaskByUser(WorkflowDO worflowDO, Map<String, Object> var) {
		//记录comment
		Comment comment = addComment(worflowDO.getTaskId(),worflowDO.getComment());
		String taskID = comment.getTaskId();
		// 认领任务
		taskService.claim(taskID, String.valueOf(ShiroUtils.getUserId()));
		//按taskID 保存任务节点变量
		taskService.setVariablesLocal(taskID, var);
		// 完成任务
		taskService.complete(taskID, var);
	}

	public Comment addComment(String taskId,String message) {
		/*List<Task> list = taskService.createTaskQuery()
				.processInstanceBusinessKey(businessKey).list();*/
		Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
	
		//Task task = list.get(list.size()-1);
		
		Authentication.setAuthenticatedUserId(String.valueOf(ShiroUtils
				.getUserId()));
		if(message == null){message="";}
		Comment comment = taskService
				.addComment(task.getId(), task.getProcessInstanceId(), message);
		return comment;
	}
}
