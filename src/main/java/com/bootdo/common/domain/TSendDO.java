package com.bootdo.common.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 * 
 * @author zhangf
 * @date 2018-08-22 16:10:08
 */
public class TSendDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String id;
	
	private String sId;
	//
	private String sTelSend;
	//
	private String sTelAccept;
	//
	private String sContent;
	//
	private Integer nResult;
	//
	private String sResult;
	//
	private Date dCreatedTime;

	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * 设置：
	 */
	public void setSId(String sId) {
		this.sId = sId;
	}
	/**
	 * 获取：
	 */
	public String getSId() {
		return sId;
	}
	/**
	 * 设置：
	 */
	public void setSTelSend(String sTelSend) {
		this.sTelSend = sTelSend;
	}
	/**
	 * 获取：
	 */
	public String getSTelSend() {
		return sTelSend;
	}
	/**
	 * 设置：
	 */
	public void setSTelAccept(String sTelAccept) {
		this.sTelAccept = sTelAccept;
	}
	/**
	 * 获取：
	 */
	public String getSTelAccept() {
		return sTelAccept;
	}
	/**
	 * 设置：
	 */
	public void setSContent(String sContent) {
		this.sContent = sContent;
	}
	/**
	 * 获取：
	 */
	public String getSContent() {
		return sContent;
	}
	/**
	 * 设置：
	 */
	public void setNResult(Integer nResult) {
		this.nResult = nResult;
	}
	/**
	 * 获取：
	 */
	public Integer getNResult() {
		return nResult;
	}
	/**
	 * 设置：
	 */
	public void setSResult(String sResult) {
		this.sResult = sResult;
	}
	/**
	 * 获取：
	 */
	public String getSResult() {
		return sResult;
	}
	/**
	 * 设置：
	 */
	public void setDCreatedTime(Date dCreatedTime) {
		this.dCreatedTime = dCreatedTime;
	}
	/**
	 * 获取：
	 */
	public Date getDCreatedTime() {
		return dCreatedTime;
	}
}
