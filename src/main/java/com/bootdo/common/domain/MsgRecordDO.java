package com.bootdo.common.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * @author zhangf
 * @date 2018-08-14
 */
public class MsgRecordDO extends MsgParamDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//
	private String receiveUser;
	//
	private String mobile;
	//
	private String msg;
	//
	private Date sendTime;
	//
	private String procInstId;
	//
	private String taskId;
	//
	private String cflx;
	//
	private String fqry;

	/**
	 * 设置：
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * 设置：
	 */
	public void setReceiveUser(String receiveUser) {
		this.receiveUser = receiveUser;
	}
	/**
	 * 获取：
	 */
	public String getReceiveUser() {
		return receiveUser;
	}
	/**
	 * 设置：
	 */
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	/**
	 * 获取：
	 */
	public String getMobile() {
		return mobile;
	}
	/**
	 * 设置：
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}
	/**
	 * 获取：
	 */
	public String getMsg() {
		return msg;
	}
	/**
	 * 设置：
	 */
	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}
	/**
	 * 获取：
	 */
	public Date getSendTime() {
		return sendTime;
	}
	/**
	 * 设置：
	 */
	public void setProcInstId(String procInstId) {
		this.procInstId = procInstId;
	}
	/**
	 * 获取：
	 */
	public String getProcInstId() {
		return procInstId;
	}
	/**
	 * 设置：
	 */
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	/**
	 * 获取：
	 */
	public String getTaskId() {
		return taskId;
	}
	/**
	 * 设置：
	 */
	public void setCflx(String cflx) {
		this.cflx = cflx;
	}
	/**
	 * 获取：
	 */
	public String getCflx() {
		return cflx;
	}
	/**
	 * 设置：
	 */
	public void setFqry(String fqry) {
		this.fqry = fqry;
	}
	/**
	 * 获取：
	 */
	public String getFqry() {
		return fqry;
	}
}
