package com.bootdo.jsb.ypfx.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 * 
 * @author wu
 * @email 1992lcg@163.com
 * @date 2018-10-12 09:46:07
 */
public class PatientTakeMedicineDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//患者姓名
	private String patientName;
	//身份证号
	private String patientIdcard;
	//监护人
	private String guardian;
	//监护人身份证号
	private String guardianIdcard;
	//监护人关系
	private String guardianRelationship;
	//监护人联系电话
	private String guardianPhonenumber;
	//现住地址
	private String xzdz;
	//现住区划
	private String xzqh;
	//户籍地址
	private String hjdz;
	//户籍区划
	private String hjqh;
	//报告单位
	private String bgdw;
	//疾病诊断类型
	private String zdlx;
	//是否在控
	private String iszk;
	//最后收治医院
	private String szyy;
	//是否落实以奖励代补政策
	private Integer isyjdb;
	//以奖代补时间
	private Date yjdbtime;
	//最近拿药时间
	private Date lasttimeTakeMedicine;

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
	 * 设置：患者姓名
	 */
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	/**
	 * 获取：患者姓名
	 */
	public String getPatientName() {
		return patientName;
	}
	/**
	 * 设置：身份证号
	 */
	public void setPatientIdcard(String patientIdcard) {
		this.patientIdcard = patientIdcard;
	}
	/**
	 * 获取：身份证号
	 */
	public String getPatientIdcard() {
		return patientIdcard;
	}
	/**
	 * 设置：监护人
	 */
	public void setGuardian(String guardian) {
		this.guardian = guardian;
	}
	/**
	 * 获取：监护人
	 */
	public String getGuardian() {
		return guardian;
	}
	/**
	 * 设置：监护人身份证号
	 */
	public void setGuardianIdcard(String guardianIdcard) {
		this.guardianIdcard = guardianIdcard;
	}
	/**
	 * 获取：监护人身份证号
	 */
	public String getGuardianIdcard() {
		return guardianIdcard;
	}
	/**
	 * 设置：监护人关系
	 */
	public void setGuardianRelationship(String guardianRelationship) {
		this.guardianRelationship = guardianRelationship;
	}
	/**
	 * 获取：监护人关系
	 */
	public String getGuardianRelationship() {
		return guardianRelationship;
	}
	/**
	 * 设置：监护人联系电话
	 */
	public void setGuardianPhonenumber(String guardianPhonenumber) {
		this.guardianPhonenumber = guardianPhonenumber;
	}
	/**
	 * 获取：监护人联系电话
	 */
	public String getGuardianPhonenumber() {
		return guardianPhonenumber;
	}
	/**
	 * 设置：现住地址
	 */
	public void setXzdz(String xzdz) {
		this.xzdz = xzdz;
	}
	/**
	 * 获取：现住地址
	 */
	public String getXzdz() {
		return xzdz;
	}
	/**
	 * 设置：现住区划
	 */
	public void setXzqh(String xzqh) {
		this.xzqh = xzqh;
	}
	/**
	 * 获取：现住区划
	 */
	public String getXzqh() {
		return xzqh;
	}
	/**
	 * 设置：户籍地址
	 */
	public void setHjdz(String hjdz) {
		this.hjdz = hjdz;
	}
	/**
	 * 获取：户籍地址
	 */
	public String getHjdz() {
		return hjdz;
	}
	/**
	 * 设置：户籍区划
	 */
	public void setHjqh(String hjqh) {
		this.hjqh = hjqh;
	}
	/**
	 * 获取：户籍区划
	 */
	public String getHjqh() {
		return hjqh;
	}
	/**
	 * 设置：报告单位
	 */
	public void setBgdw(String bgdw) {
		this.bgdw = bgdw;
	}
	/**
	 * 获取：报告单位
	 */
	public String getBgdw() {
		return bgdw;
	}
	/**
	 * 设置：疾病诊断类型
	 */
	public void setZdlx(String zdlx) {
		this.zdlx = zdlx;
	}
	/**
	 * 获取：疾病诊断类型
	 */
	public String getZdlx() {
		return zdlx;
	}
	/**
	 * 设置：是否在控
	 */
	public void setIszk(String iszk) {
		this.iszk = iszk;
	}
	/**
	 * 获取：是否在控
	 */
	public String getIszk() {
		return iszk;
	}
	/**
	 * 设置：最后收治医院
	 */
	public void setSzyy(String szyy) {
		this.szyy = szyy;
	}
	/**
	 * 获取：最后收治医院
	 */
	public String getSzyy() {
		return szyy;
	}
	/**
	 * 设置：是否落实以奖励代补政策
	 */
	public void setIsyjdb(Integer isyjdb) {
		this.isyjdb = isyjdb;
	}
	/**
	 * 获取：是否落实以奖励代补政策
	 */
	public Integer getIsyjdb() {
		return isyjdb;
	}
	/**
	 * 设置：以奖代补时间
	 */
	public void setYjdbtime(Date yjdbtime) {
		this.yjdbtime = yjdbtime;
	}
	/**
	 * 获取：以奖代补时间
	 */
	public Date getYjdbtime() {
		return yjdbtime;
	}
	/**
	 * 设置：最近拿药时间
	 */
	public void setLasttimeTakeMedicine(Date lasttimeTakeMedicine) {
		this.lasttimeTakeMedicine = lasttimeTakeMedicine;
	}
	/**
	 * 获取：最近拿药时间
	 */
	public Date getLasttimeTakeMedicine() {
		return lasttimeTakeMedicine;
	}
}
