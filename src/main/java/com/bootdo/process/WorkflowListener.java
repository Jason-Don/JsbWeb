package com.bootdo.process;

import java.util.List;

import javax.annotation.Resource;

import org.activiti.engine.HistoryService;
import org.activiti.engine.TaskService;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.ExecutionListener;
import org.activiti.engine.delegate.TaskListener;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootdo.activiti.domain.WorkflowDO;
import com.bootdo.activiti.service.MsgService;
import com.bootdo.activiti.service.WorkflowService;
import com.bootdo.common.service.JobService;
import com.bootdo.common.utils.SpringUtil;
/**
 * @author:zhangf
 * @date:2018/8/14
 */
public class WorkflowListener implements ExecutionListener,TaskListener{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private JobService taskScheduleJobService;
	
	private MsgService msgService;
	
	private WorkflowService workflowService;
	
	private HistoryService historyService;
	
	public void notify(DelegateTask execution) {
		historyService = (HistoryService)SpringUtil.getObject("historyService");
		workflowService = (WorkflowService)SpringUtil.getObject("workflowService");
		taskScheduleJobService = (JobService)SpringUtil.getObject("jobService");
		msgService = (MsgService)SpringUtil.getObject("msgService");
		String eventName = execution.getEventName();
		if("create".endsWith(eventName)){
			String processInstanceId = execution.getProcessInstanceId();

			List<HistoricProcessInstance> list = 
					historyService.createHistoricProcessInstanceQuery().processInstanceId(processInstanceId).list();
			String businessKey = list.get(0).getBusinessKey();

			
			boolean isMsgOn = taskScheduleJobService.isMsgOn();
			if(isMsgOn){
				WorkflowDO workflowDO2 = workflowService.get(businessKey);
				msgService.sendMsgFromSystemPj(execution.getName(),workflowDO2.getTaskName()
						,processInstanceId,execution.getId(),
						workflowDO2.getRwzpry().split(","));
			}
		}
	}

	@Override
	public void notify(DelegateExecution execution) throws Exception {
		// TODO Auto-generated method stub

	}
	

}
