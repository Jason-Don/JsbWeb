package com.bootdo.process;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.TaskService;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bootdo.activiti.config.ActivitiConstant;
import com.bootdo.activiti.service.impl.ActTaskServiceImpl;
import com.bootdo.common.utils.ShiroUtils;
import com.bootdo.jsb.ywgl.domain.JsbZfrwDO;
import com.bootdo.jsb.ywgl.service.JsbZfrwService;
import com.mysql.fabric.xmlrpc.base.Array;

@Service
public class ZoufangProcessService {
	@Autowired
	private ActTaskServiceImpl actTaskService;
	@Autowired
	JsbZfrwService jsbZfrwService;
	@Autowired
	TaskService taskService;
	
	@Transactional(rollbackFor = Exception.class)
	public ProcessInstance startProcessBySystem(JsbZfrwDO jsbZfrwDO) {
		ProcessInstance processInstance = actTaskService.startProcessBySystem(
				ActivitiConstant.ACTIVITI_ZOUFANG[0],
				ActivitiConstant.ACTIVITI_ZOUFANG[1], jsbZfrwDO.getId(),
				"日常走访任务，被走访患者："+jsbZfrwDO.getBzfhzMc(), new HashMap<>());
		return processInstance;
	}
	public void completeTaskByUser(String taskID) {
		// 认领任务
		taskService.claim(taskID, ShiroUtils.getUserId().toString());
		// 完成任务
		taskService.complete(taskID, new HashMap<String, Object>(0));
	}
	public void completeTaskBySystem(String taskID) {
		// 认领任务
		taskService.claim(taskID, "System");
		// 完成任务
		taskService.complete(taskID, new HashMap<String, Object>(0));
	}
	@SuppressWarnings("deprecation")
	public List<String> getZfFkRy(DelegateExecution delegateExecution){
		String processBusinessKey = delegateExecution.getProcessBusinessKey();
		JsbZfrwDO jsbZfrwDO = jsbZfrwService.get(processBusinessKey);
		List<String> asList = Arrays.asList(jsbZfrwDO.getRwssjgDm());
		//asList.add("admin");//超级用户可见
		return asList;
	}
	@SuppressWarnings("deprecation")
	public List<String> getZfFkSyRy(DelegateExecution delegateExecution){
		String processBusinessKey = delegateExecution.getProcessBusinessKey();
		JsbZfrwDO jsbZfrwDO = jsbZfrwService.get(processBusinessKey);
		List<String> asList = Arrays.asList(jsbZfrwDO.getRwssjgDm());
		//asList.add("admin");//超级用户可见
		return asList;
	}
	
}
