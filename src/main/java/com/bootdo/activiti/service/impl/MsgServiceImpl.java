package com.bootdo.activiti.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.IdentityLink;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootdo.activiti.service.MsgService;
import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.config.MsgConfig;
import com.bootdo.common.domain.MsgParamDO;
import com.bootdo.common.domain.MsgRecordDO;
import com.bootdo.common.domain.TSendDO;
import com.bootdo.common.service.MsgRecordService;
import com.bootdo.common.utils.DateUtils;
import com.bootdo.msg.msgDB.service.TSendService;
import com.bootdo.oa.domain.NotifyDO;
import com.bootdo.oa.service.NotifyService;
import com.bootdo.system.domain.UserDO;
import com.bootdo.system.service.UserService;

@Service("msgService")
public class MsgServiceImpl implements MsgService {
	@Autowired
	MsgConfig msgConfig;
	@Autowired
	private RuntimeService runtimeService;
	/**
	 * 任务评价 短信提醒。
	 * 比较特殊是在com.bootdo.process.WorkflowProcessService.changeStatus(DelegateExecution, String)中触发。
	 */
	public boolean sendMsgFromSystemPj(String nodeName,String taskName, String processInstanceId,String taskId,String... userIds){
		List<MsgParamDO> list = new ArrayList<MsgParamDO>();
		for(String userId : userIds){
			ArrayList<String> arrayList = new ArrayList<String>(); 
			arrayList.add(taskName);
			arrayList.add(nodeName);//节点名称
			UserDO userDO = userService.get(Long.parseLong(userId));
			String mobile = userDO.getMobile();
			MsgParamDO msgParamDO = new MsgParamDO();
			msgParamDO.setMobile(mobile);
			msgParamDO.setParam(arrayList);
			
			msgParamDO.setProcInstId(processInstanceId);
			msgParamDO.setTaskId(taskId);
			msgParamDO.setReceiveUser(userId);
			msgParamDO.setCflx("AT");
			msgParamDO.setFqry("system");
			msgParamDO.setTitle("\""+taskName+"\"任务提醒");
			list.add(msgParamDO);
		}
		List<MsgRecordDO> msgDOList = getMsgDO(list,msgConfig.getXTZDCF());
		boolean sendMsg = this.sendMsg(msgDOList);

		return false;
	}
	/**
	 * 指定任务、指定短信接收人员
	 * 用于任务处理过程中，每当完成一个节点，发送提醒信息给任务下一个节点处理人员。
	 * @param processInstanceId 流程实例ID
	 * @param userIds 任务
	 * @return
	 */
	@Override
	public boolean sendMsgFromSystem(String businessKey,String taskName, String... userIds) {
		//Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
		String processInstanceId = null;
		Task task = null;
		
		//当前业务id的流程实例的任务节点
		List<Task> tasklist = taskService.createTaskQuery()
				.processInstanceBusinessKey(businessKey).list();
		if(tasklist.size() >0 ){
			task = tasklist.get(0);
			processInstanceId = task.getProcessInstanceId();
		}else{//无代办节点，没有需要发送提醒
			return false;
		}
		
		List<MsgParamDO> list = new ArrayList<MsgParamDO>();

		for(String userId : userIds){
			List<Task> taskList = taskService.createTaskQuery()
					.processInstanceId(processInstanceId).taskCandidateOrAssigned(userId).list();
			
			if(taskList.size()>0){//在一个任务流程中，用户存在多个代办任务。取最新的那个，就是刚创建的任务节点。
				task = taskList.get(0);
				Date date = task.getCreateTime();
				//Task nextTask = null;
				for(int i = 1; i < taskList.size();i++ ){
					Task t = taskList.get(i);
					if(t.getCreateTime().compareTo(date) > 0){
						date = t.getCreateTime();
						task=t;
					}
				}
			}
			ArrayList<String> arrayList = new ArrayList<String>(); 
			arrayList.add(taskName);
			arrayList.add(task.getName());//节点名称
			UserDO userDO = userService.get(Long.parseLong(userId));
			String mobile = userDO.getMobile();
			MsgParamDO msgParamDO = new MsgParamDO();
			msgParamDO.setMobile(mobile);
			msgParamDO.setParam(arrayList);
			
			msgParamDO.setProcInstId(processInstanceId);
			msgParamDO.setTaskId(task.getId());
			msgParamDO.setReceiveUser(userId);
			msgParamDO.setCflx("AT");
			msgParamDO.setFqry("system");
			
			msgParamDO.setTitle("\""+taskName+"\"任务提醒");
			list.add(msgParamDO);
		}
		List<MsgRecordDO> msgDOList = getMsgDO(list,msgConfig.getXTZDCF());
		boolean sendMsg = this.sendMsg(msgDOList);
		return false;
	}
	
	@Autowired
	private NotifyService notifyService;
	private boolean sendMsg(List<MsgRecordDO> msgDoList) {
		for(MsgRecordDO msgDO : msgDoList){
			//生成通知
			NotifyDO notifyDO = new NotifyDO();
			String id = UUID.randomUUID().toString().replace("-", "");
			notifyDO.setFiles(id);
			notifyDO.setCreateDate(new Date());
			notifyDO.setType("4");//通知类型：短信通知
			notifyDO.setTitle(msgDO.getTitle());
			notifyDO.setContent(msgDO.getMsg());
			notifyDO.setStatus("1");
			Long[] userIds = {Long.parseLong(msgDO.getReceiveUser())};
			notifyDO.setUserIds(userIds);
			notifyService.save(notifyDO);
			//历史记录
			msgRecordService.save(msgDO);
			//短信发送
			send(msgDO);
		}
		return true;
	}
	@Autowired
	private TSendService tSendService;
	private void send(MsgRecordDO msgDO){
		TSendDO tSendDO = new TSendDO();
		String time = DateUtils.format(new Date(),"yyyyMMddhhmmmss");
		String sId = time+String.valueOf(System.currentTimeMillis()).substring(7);
		tSendDO.setSId(sId);//sql中计算出来自增
		tSendDO.setSTelSend(msgConfig.getSendTel());//固定
		tSendDO.setSTelAccept(msgDO.getMobile());
		tSendDO.setSContent(msgDO.getMsg());
		tSendService.save(tSendDO);
	}
	@Autowired
	private TaskService taskService;
	@Autowired
	private UserService userService;
	/**
	 * 催办提醒
	 * 根据业务id，查找当任务的当前处理人员。并发送提醒信息。
	 * @param businessKey
	 * @param userName 催办人名称
	 * @param userId 催办人id
	 * @return
	 */

	@Override
	public boolean sendMsgUrge(String businessKey,String userName,String userId) {
		//当前业务id的流程实例的任务节点
		List<Task> list = taskService.createTaskQuery()
				.processInstanceBusinessKey(businessKey).list();
		String processInstanceId = null;
		if(list.size() >0 ){
			processInstanceId = list.get(0).getProcessInstanceId();
		}else{//无代办节点，没有需要发送提醒
			return false;
		}
		ArrayList<String> userIds = new ArrayList<String>();
		for(Task task : list){
			String taskId = task.getId();
			List<IdentityLink> identityLinksForTask = taskService.getIdentityLinksForTask(taskId);
			
			String currentTaskUserId = identityLinksForTask.get(identityLinksForTask.size()-1).getUserId();
	        if(!"".equals(currentTaskUserId) && currentTaskUserId != null){
	        	//存在两个或两个以上代办节点的办理人为同一个人。只保留一个，避免在sendMsg()函数中重复
	        	if(!userIds.contains(currentTaskUserId)){
	        		userIds.add(currentTaskUserId);
	        	}
	        }
		}
		//
		List<MsgParamDO> msgParamList = getMsgParamBaseUrge(processInstanceId, userIds,userId);
		for(MsgParamDO p : msgParamList){//催办提醒，添加第三个参数：催办人名称
			p.getParam().add(userName);
		}
		List<MsgRecordDO> msgDOList = getMsgDO(msgParamList,msgConfig.getRGCF());
		boolean sendMsg = this.sendMsg(msgDOList);
		return sendMsg;
	}
/**
 * 组织短信提醒的基本参数：0任务名称；1任务办理节点名称
 * @param processInstanceId
 * @param userIds 短信接收人id
 * @param cbrId 催办人id
 * @return
 */
	private List<MsgParamDO> getMsgParamBaseUrge(String processInstanceId, ArrayList<String> userIds,String cbrId){
		List<MsgParamDO> list = new ArrayList<MsgParamDO>();
		for(String userId : userIds){
			List<Task> taskList = taskService.createTaskQuery()
					.processInstanceId(processInstanceId).taskCandidateOrAssigned(userId).list();
			for(Task task : taskList){
				
				ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
						.processInstanceId(task.getProcessInstanceId()).singleResult();
				UserDO userDO = userService.get(Long.parseLong(userId));
				String mobile = userDO.getMobile();
				MsgParamDO msgParamDO = new MsgParamDO();
				msgParamDO.setMobile(mobile);
				ArrayList<String> arrayList = new ArrayList<String>(); 
				arrayList.add(processInstance.getName());
				arrayList.add(task.getName());
				msgParamDO.setParam(arrayList);
				
				msgParamDO.setProcInstId(processInstanceId);
				msgParamDO.setTaskId(task.getId());
				msgParamDO.setReceiveUser(userId);
				msgParamDO.setCflx("MT");
				msgParamDO.setFqry(cbrId);
				msgParamDO.setTitle("\""+processInstance.getName()+"\"任务催办提醒");
				list.add(msgParamDO);
			}
		}
		return list;
	}
	/**
	 * 组织短信记录数据
	 * @param msgParamList
	 * @param msgTemplet
	 * @return
	 */
	private List<MsgRecordDO> getMsgDO(List<MsgParamDO> msgParamList,String msgTemplet){
		List<MsgRecordDO> list = new ArrayList<MsgRecordDO>();
		for(MsgParamDO msgParam: msgParamList){
			MsgRecordDO msgDO = new MsgRecordDO();
			msgDO.setMobile(msgParam.getMobile());
			ArrayList<String> paramList = msgParam.getParam();
			String templet = new String(msgTemplet);
			for(String param : paramList){
				templet = templet.replaceFirst("\\?", param);
			}
			msgDO.setMsg(templet);
			msgDO.setProcInstId(msgParam.getProcInstId());
			msgDO.setTaskId(msgParam.getTaskId());
			msgDO.setReceiveUser(msgParam.getReceiveUser());
			msgDO.setCflx(msgParam.getCflx());
			msgDO.setFqry(msgParam.getFqry());
			msgDO.setSendTime(new Date());
			msgDO.setTitle(msgParam.getTitle());
			list.add(msgDO);
		}
		return list;
	}
	
	@Autowired
	private MsgRecordService msgRecordService;
	/**
	 * 保存短信记录
	 * @param msgDOList
	 * @return
	 */
	private int saveMsgRecord(List<MsgRecordDO> msgDOList){
		int i = 0;
		for(MsgRecordDO msgRecord : msgDOList){
			int save = msgRecordService.save(msgRecord);
			i += save;
		}
		return i;
	}
}
