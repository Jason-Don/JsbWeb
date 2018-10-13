package com.bootdo.jsb.ypfx.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 * 
 * @author wu
 * @email 1992lcg@163.com
 * @date 2018-10-11 09:23:28
 */
public class CaseIncidentDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//案件编号
	private String caseCode;
	//身份证号码
	private String idcard;
	//鉴定结论提交时间
	private Date identificationTime;
	//鉴定结论
	private String appraiseResult;
	//处理人警号
	private String handleName;
	//办案单位组织机构
	private String handleOrgan;
	//照片路径
	private String photopath;
	//数据来源_行政区划代码
	private String dataSourceOrgCode;
	//数据来源_行政区划代码
	private String dataSourceOrg;
	//
	private Date time;

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
	 * 设置：案件编号
	 */
	public void setCaseCode(String caseCode) {
		this.caseCode = caseCode;
	}
	/**
	 * 获取：案件编号
	 */
	public String getCaseCode() {
		return caseCode;
	}
	/**
	 * 设置：身份证号码
	 */
	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}
	/**
	 * 获取：身份证号码
	 */
	public String getIdcard() {
		return idcard;
	}
	/**
	 * 设置：鉴定结论提交时间
	 */
	public void setIdentificationTime(Date identificationTime) {
		this.identificationTime = identificationTime;
	}
	/**
	 * 获取：鉴定结论提交时间
	 */
	public Date getIdentificationTime() {
		return identificationTime;
	}
	/**
	 * 设置：鉴定结论
	 */
	public void setAppraiseResult(String appraiseResult) {
		this.appraiseResult = appraiseResult;
	}
	/**
	 * 获取：鉴定结论
	 */
	public String getAppraiseResult() {
		return appraiseResult;
	}
	/**
	 * 设置：处理人警号
	 */
	public void setHandleName(String handleName) {
		this.handleName = handleName;
	}
	/**
	 * 获取：处理人警号
	 */
	public String getHandleName() {
		return handleName;
	}
	/**
	 * 设置：办案单位组织机构
	 */
	public void setHandleOrgan(String handleOrgan) {
		this.handleOrgan = handleOrgan;
	}
	/**
	 * 获取：办案单位组织机构
	 */
	public String getHandleOrgan() {
		return handleOrgan;
	}
	/**
	 * 设置：照片路径
	 */
	public void setPhotopath(String photopath) {
		this.photopath = photopath;
	}
	/**
	 * 获取：照片路径
	 */
	public String getPhotopath() {
		return photopath;
	}
	/**
	 * 设置：数据来源_行政区划代码
	 */
	public void setDataSourceOrgCode(String dataSourceOrgCode) {
		this.dataSourceOrgCode = dataSourceOrgCode;
	}
	/**
	 * 获取：数据来源_行政区划代码
	 */
	public String getDataSourceOrgCode() {
		return dataSourceOrgCode;
	}
	/**
	 * 设置：数据来源_行政区划代码
	 */
	public void setDataSourceOrg(String dataSourceOrg) {
		this.dataSourceOrg = dataSourceOrg;
	}
	/**
	 * 获取：数据来源_行政区划代码
	 */
	public String getDataSourceOrg() {
		return dataSourceOrg;
	}
	/**
	 * 设置：
	 */
	public void setTime(Date time) {
		this.time = time;
	}
	/**
	 * 获取：
	 */
	public Date getTime() {
		return time;
	}
}
