package com.bootdo.jsb.ywgl.domain;

import java.io.Serializable;
import java.util.Date;

import com.bootdo.activiti.domain.TaskDO;



/**
 * 精神病_走访任务
 * 
 * @author zhangf
 * @email 1992lcg@163.com
 * @date 2018-10-11 10:26:33
 */
public class JsbZfrwDO extends TaskDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//任务ID
	private String id;
	//被走访患者_名称
	private String bzfhzMc;
	//被走访患者_身份证号码
	private String bzfhzSfzhm;
	//任务所属机关_代码
	private String rwssjgDm;
	//任务所属机关_名称
	private String rwssjgMc;
	//计划走访时间
	private Date jhzfrq;
	//生成时间
	private Date scsj;

	/**
	 * 设置：任务ID
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * 获取：任务ID
	 */
	public String getId() {
		return id;
	}
	/**
	 * 设置：被走访患者_名称
	 */
	public void setBzfhzMc(String bzfhzMc) {
		this.bzfhzMc = bzfhzMc;
	}
	/**
	 * 获取：被走访患者_名称
	 */
	public String getBzfhzMc() {
		return bzfhzMc;
	}
	/**
	 * 设置：被走访患者_身份证号码
	 */
	public void setBzfhzSfzhm(String bzfhzSfzhm) {
		this.bzfhzSfzhm = bzfhzSfzhm;
	}
	/**
	 * 获取：被走访患者_身份证号码
	 */
	public String getBzfhzSfzhm() {
		return bzfhzSfzhm;
	}
	/**
	 * 设置：任务所属机关_代码
	 */
	public void setRwssjgDm(String rwssjgDm) {
		this.rwssjgDm = rwssjgDm;
	}
	/**
	 * 获取：任务所属机关_代码
	 */
	public String getRwssjgDm() {
		return rwssjgDm;
	}
	/**
	 * 设置：任务所属机关_名称
	 */
	public void setRwssjgMc(String rwssjgMc) {
		this.rwssjgMc = rwssjgMc;
	}
	/**
	 * 获取：任务所属机关_名称
	 */
	public String getRwssjgMc() {
		return rwssjgMc;
	}
	/**
	 * 设置：计划走访时间
	 */
	public void setJhzfrq(Date jhzfrq) {
		this.jhzfrq = jhzfrq;
	}
	/**
	 * 获取：计划走访时间
	 */
	public Date getJhzfrq() {
		return jhzfrq;
	}
	/**
	 * 设置：生成时间
	 */
	public void setScsj(Date scsj) {
		this.scsj = scsj;
	}
	/**
	 * 获取：生成时间
	 */
	public Date getScsj() {
		return scsj;
	}
}
