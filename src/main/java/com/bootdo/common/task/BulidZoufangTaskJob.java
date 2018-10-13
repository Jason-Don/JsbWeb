package com.bootdo.common.task;

import java.util.List;
import java.util.UUID;

import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.bootdo.jsb.ywgl.domain.JsbZfrwTaskDO;
import com.bootdo.jsb.ywgl.service.JsbZfrwService;
import com.bootdo.process.ZoufangProcessService;
/**
 * @author zhangf
 * @date 2018-10-12
 */
@Component
public class BulidZoufangTaskJob implements Job{
	final String GKLEVEL1 = "30";
	final String GKLEVEL2 = "60";
	final String GKLEVEL3 = "90";
	
	@Autowired
	JsbZfrwService jsbZfrwService;
	@Autowired
	ZoufangProcessService zoufangProcessService;
	@Autowired
	TaskService taskService;
	
	@Override
	@Transactional(rollbackFor=Exception.class)
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		List<JsbZfrwTaskDO> zoufangTaskList = jsbZfrwService.bulidZoufangTask();
		if(zoufangTaskList.size()>0){
			for(JsbZfrwTaskDO zfrwTaskDO:zoufangTaskList){
				zfrwTaskDO.setId(UUID.randomUUID().toString().replace("-", ""));
				String gkdj = zfrwTaskDO.getGkdj();
				String zfzq = "";
				switch(gkdj){
					case "1":
						zfzq = GKLEVEL1;
						break;
					case "2":
						zfzq = GKLEVEL2;
						break;
					case "3":
						zfzq = GKLEVEL3;
						break;
				} 
				zfrwTaskDO.setZfzq(zfzq);
				jsbZfrwService.save(zfrwTaskDO);
				ProcessInstance processInstance = zoufangProcessService.startProcessBySystem(zfrwTaskDO);
				Task task = taskService
						.createTaskQuery()
						.processInstanceBusinessKey(
								processInstance.getBusinessKey()).singleResult();
				zoufangProcessService.completeTaskBySystem(task.getId());
			}
		}
	}
}
