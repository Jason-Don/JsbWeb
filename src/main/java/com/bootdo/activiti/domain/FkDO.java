package com.bootdo.activiti.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 * 
 * @author zhangf
 * @date 2018-08-29
 */
public class FkDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//ID
	private Integer id;
	//流程ID
	private String workflowId;
	//创建人ID
	private String cbryId;
	//创建人名称
	private String cbryMc;
	//创建时间
	private Date cjsj;
	//附件ID
	private String fileId;
	//附件名称
	private String fileMc;
	//反馈情况说明
	private String fkqksm;
	//是否审核通过
	private String sfshtg;
	//审核意见
	private String shyj;

	/**
	 * 设置：ID
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：ID
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * 设置：流程ID
	 */
	public void setWorkflowId(String workflowId) {
		this.workflowId = workflowId;
	}
	/**
	 * 获取：流程ID
	 */
	public String getWorkflowId() {
		return workflowId;
	}
	/**
	 * 设置：创建人ID
	 */
	public void setCbryId(String cbryId) {
		this.cbryId = cbryId;
	}
	/**
	 * 获取：创建人ID
	 */
	public String getCbryId() {
		return cbryId;
	}
	/**
	 * 设置：创建人名称
	 */
	public void setCbryMc(String cbryMc) {
		this.cbryMc = cbryMc;
	}
	/**
	 * 获取：创建人名称
	 */
	public String getCbryMc() {
		return cbryMc;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCjsj(Date cjsj) {
		this.cjsj = cjsj;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCjsj() {
		return cjsj;
	}
	/**
	 * 设置：附件ID
	 */
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	/**
	 * 获取：附件ID
	 */
	public String getFileId() {
		return fileId;
	}
	/**
	 * 设置：附件名称
	 */
	public void setFileMc(String fileMc) {
		this.fileMc = fileMc;
	}
	/**
	 * 获取：附件名称
	 */
	public String getFileMc() {
		return fileMc;
	}
	/**
	 * 设置：反馈情况说明
	 */
	public void setFkqksm(String fkqksm) {
		this.fkqksm = fkqksm;
	}
	/**
	 * 获取：反馈情况说明
	 */
	public String getFkqksm() {
		return fkqksm;
	}
	/**
	 * 设置：是否审核通过
	 */
	public void setSfshtg(String sfshtg) {
		this.sfshtg = sfshtg;
	}
	/**
	 * 获取：是否审核通过
	 */
	public String getSfshtg() {
		return sfshtg;
	}
	/**
	 * 设置：审核意见
	 */
	public void setShyj(String shyj) {
		this.shyj = shyj;
	}
	/**
	 * 获取：审核意见
	 */
	public String getShyj() {
		return shyj;
	}
}
