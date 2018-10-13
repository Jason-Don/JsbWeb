package com.bootdo.activiti.utils;

import java.util.ArrayList;

import org.activiti.engine.HistoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author:zhangf
 * @description:
 * @date:2018/6/13
 */
@Component
public class ActivitiUtils {
    /**
     * 根据taskId查找businessKey
     */
    @Autowired
    TaskService taskService;
    @Autowired
    RuntimeService runtimeService;
    @Autowired
    HistoryService historyService;
    public String getBusinessKeyByTaskId(String taskId){
        Task task = taskService
                .createTaskQuery()
                .taskId(taskId)
                .singleResult();
        ProcessInstance pi = runtimeService
                .createProcessInstanceQuery()
                .processInstanceId(task.getProcessInstanceId())
                .singleResult();
        return pi.getBusinessKey();
    }

    public Task getTaskByTaskId(String taskId){
        Task task = taskService
                .createTaskQuery()
                .taskId(taskId)
                .singleResult();
        return task;
    }
    /**
     * 删除activiti表数据
     * @param businessKeyArray
     * @return 
     */
    public String[] getProcessInstanceIdArray(String... businessKeyArray){
    	String[] processInstanceIdArray = new String[businessKeyArray.length];
    	for(int i = 0 ; i < businessKeyArray.length; i++){
        	HistoricProcessInstance historicProcessInstance 
        	= historyService.createHistoricProcessInstanceQuery()
        	.processInstanceBusinessKey(businessKeyArray[i]).singleResult();
        	if(null!=historicProcessInstance){
            	String processInstanceId = historicProcessInstance.getId();
            	processInstanceIdArray[i] =  processInstanceId;
        	}
    	}
    	return processInstanceIdArray;
    }
}
