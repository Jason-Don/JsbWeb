package com.bootdo.activiti.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.activiti.engine.HistoryService;
import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Comment;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootdo.activiti.dao.ActivitiDao;
import com.bootdo.activiti.dao.WorkflowDao;
import com.bootdo.activiti.domain.FkDO;
import com.bootdo.activiti.domain.WorkflowDO;
import com.bootdo.activiti.service.FkService;
import com.bootdo.activiti.service.WorkflowService;
import com.bootdo.activiti.utils.ActivitiUtils;
import com.bootdo.common.domain.FilesDO;
import com.bootdo.common.service.DictService;
import com.bootdo.common.service.FilesService;
import com.bootdo.process.WorkflowProcessService;



@Service("workflowService")
public class WorkflowServiceImpl implements WorkflowService {
	@Autowired
	private WorkflowDao workflowDao;
	@Autowired
	private ActivitiDao activitiDao;
	@Autowired
	private DictService dict;

	@Override
	public WorkflowDO get(String taskId){
		WorkflowDO workflow=workflowDao.get(taskId);
		//System.out.println("调用了get工作流程。该工作流程是：'"+workflow.getTaskName()+"'任务来源是"+workflow.getRwly());
		//System.out.println(workflow.getRwly().indexOf("QT"));
		if(workflow.getRwly().equals("QT"))
		{
			String qt_rwly=workflowDao.get_qt_rwly(taskId);
			System.out.println("该工作流程的任务来源是:"+qt_rwly);
			workflow.setRwly(qt_rwly);
		}
		return workflow;
	}
	
	@Override
	public List<WorkflowDO> list(Map<String, Object> map){
		
		return workflowDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return workflowDao.count(map);
	}

	@Override
	public int save(WorkflowDO workflow){
		String[] rwly_in_database=dict.getValueByType("rwly");
		boolean ishave=true;
		int result=0;
		for(int j=0;j<rwly_in_database.length;j++)
		{
			//System.out.println("查询到的已有的rwly有："+rwly_in_database[j]);
			if(rwly_in_database[j].indexOf(workflow.getRwly())==-1)
				ishave=false;
			else
			{
				ishave=true;
				break;
			}
		}
		//System.out.println("即将存入数据库的rwly是："+workflow.getRwly());
		System.out.println("是否数据库已有:"+ishave);
		if(ishave==false)
		{
			String qt_rwly=workflow.getRwly();
			workflow.setRwly("QT");
			result=workflowDao.save(workflow);
			workflowDao.save_new_rwly(workflow.getId(),qt_rwly );
		}
		else {
			result=workflowDao.save(workflow);
		}
		return result;
	}
	
	@Override
	public int update(WorkflowDO workflow){
		return workflowDao.update(workflow);
	}
	
	@Override
	public int updateRwly(WorkflowDO workflow){
		String[] rwly_in_database=dict.getValueByType("rwly");
		boolean ishave=true;
		int result=0;
		for(int j=0;j<rwly_in_database.length;j++)
		{
			//System.out.println("查询到的已有的rwly有："+rwly_in_database[j]);
			if(rwly_in_database[j].indexOf(workflow.getRwly())==-1)
				ishave=false;
			else
			{
				ishave=true;
				break;
			}
		}
		//System.out.println("即将存入数据库的rwly是："+workflow.getRwly());
		//System.out.println("是否数据库已有:"+ishave);
		if(ishave==false)
		{
			String qt_rwly=workflow.getRwly();
			workflow.setRwly("QT");
			result=workflowDao.updateRwly(workflow.getId(),workflow.getRwly());
			workflowDao.updateQtRwly(workflow.getId(),qt_rwly );
		}
		else {
			result=workflowDao.updateRwly(workflow.getId(),workflow.getRwly());
		}
		return result;
	}
	@Autowired
	private FilesService filesService;
	@Autowired
	private FkService fkService;
	@Override
	public int remove(String businessKey){
		//删除Activiti相关
		String[] processInstanceIdArray = activitiUtils.getProcessInstanceIdArray(businessKey);
		activitiDao.batchRemove_act(processInstanceIdArray);
		
		//删除业务“工作流程”中可能产生的附件 数据
		deleteFilesOnServerAndDB(businessKey);
		
		//workflow和workflow_fk两个业务表数据
		return workflowDao.remove(businessKey);
	}
	
	@Autowired
	HistoryService historyService;
	@Autowired
	ActivitiUtils activitiUtils;
	@Override
	public int batchRemove(String[] taskIds){
		//删除业务“工作流程”中可能产生的附件 数据
		for(String businessKey : taskIds){
			deleteFilesOnServerAndDB(businessKey);
		}
		//删除Activiti相关
		String[] processInstanceIdArray = activitiUtils.getProcessInstanceIdArray(taskIds);
		activitiDao.batchRemove_act(processInstanceIdArray);
		//workflow和workflow_fk两个业务表数据
		return workflowDao.batchRemove(taskIds);
	}	
	@Resource
	WorkflowProcessService workflowProcessService;
	@Override
	public Comment addComment(String businessKey,String message){
		Comment comment = workflowProcessService.addComment(businessKey,message);
		return comment;
	}
	
	public void completeTaskByUser(String taskID,Map<String, Object> var){
		workflowProcessService.completeTaskByUser(taskID,var);
	}
	public void completeTaskByUser(WorkflowDO workflowDO,Map<String, Object> var){
		workflowProcessService.completeTaskByUser(workflowDO,var);
	}
	
	public ProcessInstance startProcess(WorkflowDO workflowDO){
		return workflowProcessService.startProcess(workflowDO);
	}
	TaskService taskService;
	public Task getTask(ProcessInstance processInstance){
		Task task = taskService.createTaskQuery().processInstanceBusinessKey(processInstance.getBusinessKey()).singleResult();
		//Task task = taskService.createTaskQuery().processInstanceId(processInstance.getId()).singleResult();
		return task;
	}
	
	/**
	 * 删除业务“工作流程”中可能产生的附件 数据
	 * @param businessKey workflow表id
	 */
	private void deleteFilesOnServerAndDB(String businessKey){
		/*--------删除workflow中附件  开始 --------*/
		//删除workflow表在Server上的上传文件
		WorkflowDO workflowDO = this.get(businessKey);
		String fileId = workflowDO.getFileId();
		if(fileId != null && !"".equals(fileId)){//存在附件
			FilesDO filesDO = filesService.get(fileId);
			if(null != filesDO){
				filesService.deleteFileOnServer(filesDO.getUrl());	
			}
		}
		//删除workflow表在files表中数据
		filesService.remove(fileId);
		/*--------删除workflow中附件  结束 --------*/
		
		/*--------删除workflow_fk中附件  开始--------*/
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("workflowId", businessKey);
		
		List<FkDO> fkDO_List = fkService.list(map);
		if(fkDO_List.size()>0){//存在反馈数据 再去删除反馈 相关附件
			String[] fileId_List = new String[fkDO_List.size()];
			for(int i = 0; i<fkDO_List.size();i++){//获得所有反馈信息中 反馈附件id
				FkDO fkDO = fkDO_List.get(i);
				String file_id = fkDO.getFileId();
				if(file_id != null && !"".equals(file_id)){
					fileId_List[i] = file_id;
				}
			}
			//通过反馈附件id，获得附件在服务器的url
			String[] fileUrl_List = new String[fileId_List.length];
			for(int i = 0; i<fileId_List.length;i++){
				FilesDO filesDO = filesService.get(fileId_List[i]);
				if(null!=filesDO){
					fileUrl_List[i] = (filesDO.getUrl());
				}
			}
			if(fileId_List.length>0){//一个workflow的所有反馈信息中存在上传文件，则删除上传文件
				//删除workflow_fk表在Server上的上传文件
				filesService.deleteFileOnServerBatch(fileUrl_List);
				//删除workflow_fk表在files表中数据
				filesService.batchRemove(fileId_List);
			}
		}
		/*--------删除workflow_fk中附件  结束--------*/
	}
}
