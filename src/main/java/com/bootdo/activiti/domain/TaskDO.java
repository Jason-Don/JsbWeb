package com.bootdo.activiti.domain;

import java.util.Map;

/**
 * @author bootdo 1992lcg@163.com
 */
public class TaskDO {
    private  String taskId;
    private String taskComment;
    private String taskPass;
    private Map<String,Object> vars;
    //上一个节点任务签收人
    private  String preTaskId;
    private String assignee;
    private String assigneeMc;
    //向前推两个节点任务签收人
    private  String pre2TaskId;
    private String pr2Assignee;
    private String pr2AssigneeMc;
    

    private String comment;
	private  String newAssignee;
    private  String newAssigneeMc; 
    
    
    public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getPreTaskId() {
		return preTaskId;
	}

	public void setPreTaskId(String preTaskId) {
		this.preTaskId = preTaskId;
	}

	public String getNewAssignee() {
		return newAssignee;
	}

	public void setNewAssignee(String newAssignee) {
		this.newAssignee = newAssignee;
	}

	public String getNewAssigneeMc() {
		return newAssigneeMc;
	}

	public void setNewAssigneeMc(String newAssigneeMc) {
		this.newAssigneeMc = newAssigneeMc;
	}


	public String getAssigneeMc() {
		return assigneeMc;
	}

	public void setAssigneeMc(String assigneeMc) {
		this.assigneeMc = assigneeMc;
	}

	public String getAssignee() {
		return assignee;
	}

	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}

	public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getTaskComment() {
        return taskComment;
    }

    public void setTaskComment(String taskComment) {
        this.taskComment = taskComment;
    }

    public String getTaskPass() {
        return taskPass;
    }

    public void setTaskPass(String taskPass) {
        this.taskPass = taskPass;
    }

    public Map<String, Object> getVars() {
        return vars;
    }

    public void setVars(Map<String, Object> vars) {
        this.vars = vars;
    }

	public String getPr2Assignee() {
		return pr2Assignee;
	}

	public void setPr2Assignee(String pr2Assignee) {
		this.pr2Assignee = pr2Assignee;
	}

	public String getPr2AssigneeMc() {
		return pr2AssigneeMc;
	}

	public void setPr2AssigneeMc(String pr2AssigneeMc) {
		this.pr2AssigneeMc = pr2AssigneeMc;
	}

	public String getPre2TaskId() {
		return pre2TaskId;
	}

	public void setPre2TaskId(String pre2TaskId) {
		this.pre2TaskId = pre2TaskId;
	}


}
