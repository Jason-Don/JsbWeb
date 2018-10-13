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

import com.bootdo.activiti.domain.OvertimeDO;
import com.bootdo.activiti.domain.WorkflowDO;
import com.bootdo.activiti.service.MsgService;
import com.bootdo.activiti.service.OvertimeService;
import com.bootdo.activiti.service.WorkflowService;
import com.bootdo.common.service.JobService;
import com.bootdo.common.utils.SpringUtil;
/**
 * @author:zhangf
 * @date:2018/8/14
 */
public class OvertimeListener implements ExecutionListener,TaskListener{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private JobService taskScheduleJobService;
	
	private MsgService msgService;
	
	private OvertimeService overtimeService;
	
	private HistoryService historyService;
	
	public void notify(DelegateTask execution) {
		historyService = (HistoryService)SpringUtil.getObject("historyService");
		overtimeService = (OvertimeService)SpringUtil.getObject("overtimeService");
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
				OvertimeDO overtimeDO = overtimeService.get(Integer.parseInt(businessKey));
				msgService.sendMsgFromSystemPj(execution.getName(),"加班申请"
						,processInstanceId,execution.getId(),
						overtimeDO.getShryId().split(","));
			}
		}
	}

	@Override
	public void notify(DelegateExecution execution) throws Exception {
		// TODO Auto-generated method stub

	}
	

}
