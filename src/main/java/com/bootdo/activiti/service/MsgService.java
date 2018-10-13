package com.bootdo.activiti.service;

import java.util.ArrayList;

/**
 * 短信接口
 * 
 * @author zhangf
 * @date 2018-08-09 
 */
public interface MsgService {


	boolean sendMsgFromSystem(String businessKey,String taskName, String... userIds);
	boolean sendMsgFromSystemPj(String nodeName,String taskName, String processInstanceId,String taskId,String... userIds);

	boolean sendMsgUrge(String businessKey,String userName,String userId);
}
