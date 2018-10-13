package com.bootdo.common.domain;

import java.io.Serializable;
import java.util.ArrayList;

import com.alibaba.fastjson.JSONObject;

public class MsgParamDO implements Serializable {
	private static final long serialVersionUID = 1L;

	private String mobile;

	private ArrayList<String> param;
	
	//
	private String procInstId;
	//
	private String taskId;
	//
	private String receiveUser;
	//
	private String cflx;
	//
	private String fqry;
	
	private String title;
	
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public ArrayList<String> getParam() {
		return param;
	}
	public void setParam(ArrayList<String> param) {
		this.param = param;
	}
	public String getProcInstId() {
		return procInstId;
	}
	public void setProcInstId(String procInstId) {
		this.procInstId = procInstId;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getReceiveUser() {
		return receiveUser;
	}
	public void setReceiveUser(String receiveUser) {
		this.receiveUser = receiveUser;
	}
	public String getCflx() {
		return cflx;
	}
	public void setCflx(String cflx) {
		this.cflx = cflx;
	}
	public String getFqry() {
		return fqry;
	}
	public void setFqry(String fqry) {
		this.fqry = fqry;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
}
