package com.bootdo.process;

import com.bootdo.activiti.config.ActivitiConstant;
import com.bootdo.activiti.domain.OvertimeDO;
import com.bootdo.activiti.domain.WorkflowDO;
import com.bootdo.activiti.service.OvertimeService;
import com.bootdo.activiti.service.impl.ActTaskServiceImpl;
import com.bootdo.common.utils.ShiroUtils;

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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

/**
 * @author:zhangf
 * @description:
 * @date:2018/7/12
 */
@Service
public class OvertimeProcessService {


	
    /**
     * 启动任务流程
     */
    @Autowired
    private ActTaskServiceImpl actTaskService;
    @Transactional(rollbackFor=Exception.class)
    public ProcessInstance startProcess(OvertimeDO overtimeDO){
        ProcessInstance processInstance = actTaskService.startProcess(ActivitiConstant.ACTIVITI_OVERTIME[0],ActivitiConstant.ACTIVITI_OVERTIME[1],
        		overtimeDO.getId().toString(),"加班申请",new HashMap<>());
        return processInstance;
    }
    
	
	@Resource
	private OvertimeService overtimeService; 
    /**
     * 查询审核人员
     * @param delegateExecution
     * @return
     */
    public List<String> findShry(DelegateExecution delegateExecution){
        String bussinessKey = delegateExecution.getProcessBusinessKey();
        OvertimeDO overtimeDO = overtimeService.get(Integer.parseInt(bussinessKey));
    	String[] shryArray = overtimeDO.getShryId().split(",");
    	return Arrays.asList(shryArray);
    }
    
    @Resource
    private TaskService taskService;
    public void completeTaskByUser(String taskID,String userID){
        //认领任务
        taskService.claim(taskID,userID);
        //完成任务
        Map<String, Object> var = new HashMap<>();
        
        taskService.complete(taskID, var);
    }
	public void completeTaskByUser(OvertimeDO overtimeDO, Map<String, Object> var) {
		//记录comment
		Comment comment = addComment(overtimeDO.getTaskId(),overtimeDO.getComment());
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
