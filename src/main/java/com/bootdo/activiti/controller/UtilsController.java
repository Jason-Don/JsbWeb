package com.bootdo.activiti.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bootdo.activiti.domain.WorkflowDO;
import com.bootdo.activiti.service.MsgService;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.service.MsgRecordService;
import com.bootdo.common.utils.R;
import com.bootdo.system.domain.UserDO;
import com.bootdo.system.service.UserService;

import org.activiti.engine.HistoryService;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author:zhangf
 * @description:
 * @date:2018/6/14
 */
@RestControllerAdvice
@RequestMapping("/utils")
public class UtilsController extends BaseController {

    @Autowired
    private UserService userService;
    @RequestMapping("/getCurrUserInfo")
    public UserDO addWorkflow(){
    	//return "adc";
        return userService.get(getUserId());
    }
    @Autowired
    private HistoryService historyService;
	@Autowired
	private MsgRecordService msgRecordService;
    @Autowired
    private MsgService msgService;
	@ResponseBody
	@PostMapping("/cb/{businessKey}")
	public R cb(@PathVariable("businessKey") String businessKey){
		String txsj = "24";
		HistoricProcessInstance historicProcessInstance = historyService.createHistoricProcessInstanceQuery()
				.processInstanceBusinessKey(businessKey).singleResult();
		String processInstanceId = null;
		if(null != historicProcessInstance){
			processInstanceId = historicProcessInstance.getId();
			Map<String,Object> map = new HashMap<String, Object>();
			map.put("hour", txsj);
			map.put("procInstId", processInstanceId);
			int num = msgRecordService.isSendWithinSometime(map);
			if(num>0){
				return R.error(1,"任务已在"+txsj+"小时内发起过催办提醒！");
			}else{
				if(msgService.sendMsgUrge(businessKey,getUser().getName(),String.valueOf(getUserId()))){
					return R.ok();
				}else{
					return R.error();
				}
			}
		}else{//无代办节点，没有需要发送提醒
			return R.error();
		}
	}
}
