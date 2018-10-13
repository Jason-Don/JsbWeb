package com.bootdo.activiti.service;

import com.bootdo.activiti.domain.WorkflowDO;

import java.util.List;
import java.util.Map;

import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Comment;
import org.activiti.engine.task.Task;

/**
 * 工作流程表
 * 
 * @author zhangf
 * @email ${email}
 * @date 2018-06-13 10:16:28
 */
public interface WorkflowService {
	
	WorkflowDO get(String taskId);
	
	List<WorkflowDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(WorkflowDO workflow);
	
	int update(WorkflowDO workflow);
	
	int remove(String taskId);
	
	int batchRemove(String[] taskIds);

	int updateRwly(WorkflowDO workflow);
	
	Comment addComment(String businessKey,String message);
	
	void completeTaskByUser(String taskID,Map<String, Object> var);
	void completeTaskByUser(WorkflowDO worflowDO, Map<String, Object> var);
	
	ProcessInstance startProcess(WorkflowDO workflowDO);
	Task getTask(ProcessInstance processInstance);
}
