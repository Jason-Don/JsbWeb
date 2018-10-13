package com.bootdo.activiti.vo;

import java.util.Date;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.task.Task;

/**

 */
public class TaskVO  {

    public TaskVO(Task task){

        this.setId(task.getId());
        this.setKey(task.getTaskDefinitionKey());
        this.setName(task.getName());
        this.setDescription(task.getDescription());
        this.setAssignee(task.getAssignee());
        this.setFormKey(task.getFormKey());
        this.setProcessInstanceId(task.getProcessInstanceId());
        this.setProcessDefinitionId(task.getProcessDefinitionId());
        this.setExecutionId(task.getExecutionId());
    }

    public TaskVO(HistoricTaskInstance hti){

        this.setId(hti.getId());
        this.setKey(hti.getTaskDefinitionKey());
        this.setName(hti.getName());
        this.setDescription(hti.getDescription());
        this.setAssignee(hti.getAssignee());
        this.setFormKey(hti.getFormKey());
        this.setProcessInstanceId(hti.getProcessInstanceId());
        this.setProcessDefinitionId(hti.getProcessDefinitionId());
        this.setExecutionId(hti.getExecutionId());
        this.setHandleTime(hti.getEndTime());
    }
    private  String id;
    private String name;
    private String key;
    private String description;
    private  String formKey;
    private  String assignee;
    private String processInstanceId;
    private String processDefinitionId;
    private String executionId;
    
    private String businessKey;
    private String title;
    private Date handleTime;

    public Date getHandleTime() {
		return handleTime;
	}

	public void setHandleTime(Date handleTime) {
		this.handleTime = handleTime;
	}

	public String getBusinessKey() {
		return businessKey;
	}

	public void setBusinessKey(String businessKey) {
		this.businessKey = businessKey;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFormKey() {
        return formKey;
    }

    public void setFormKey(String formKey) {
        this.formKey = formKey;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public String getProcessInstanceId() {
        return processInstanceId;
    }

    public void setProcessInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId;
    }

    public String getProcessDefinitionId() {
        return processDefinitionId;
    }

    public void setProcessDefinitionId(String processDefinitionId) {
        this.processDefinitionId = processDefinitionId;
    }

    public String getExecutionId() {
        return executionId;
    }

    public void setExecutionId(String executionId) {
        this.executionId = executionId;
    }
}
