package com.bootdo.activiti.domain;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;



/**
 * 加班表
 * 
 * @author zhangf
 * @email ${email}
 * @date 2018-07-02 09:39:21
 */
public class OvertimeDO extends TaskDO implements Serializable {
	private static final long serialVersionUID = 1L;
	SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm"); 
	
	//ID
	private Integer id;
	//申请人ID
	private Long sqrId;
	//申请人名称
	private String sqrMc;
	//所在部门ID
	private Long szbmId;
	//所在部门名称
	private String szbmMc;
	//紧急情况
	private String jjqk;
	//申请时间
	//@DateTimeFormat(pattern = "yyyy-MM-dd HH:MM:SS")
	private Date sqsj;
	//加班类型
	private String jblx;
	//加班事由
	private String jbsy;
	//开始时间
	//@DateTimeFormat(pattern = "yyyy-MM-dd HH:MM:SS")
	private Date kssj;
	//结束时间
	//@DateTimeFormat(pattern = "yyyy-MM-dd HH:MM:SS")
	private Date jssj;
	//关联工作流程
	private String glgzlc;
	//关联工作流程名称
	private String glgzlcMc;
	
	private String shryId;
	private String shryMc;
	private String status;
	private String shyj;
	
	
	
	
	
	public String getShyj() {
		return shyj;
	}
	public void setShyj(String shyj) {
		this.shyj = shyj;
	}
	public String getShryId() {
		return shryId;
	}
	public void setShryId(String shryId) {
		this.shryId = shryId;
	}
	public String getShryMc() {
		return shryMc;
	}
	public void setShryMc(String shryMc) {
		this.shryMc = shryMc;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getGlgzlcMc() {
		return glgzlcMc;
	}
	public void setGlgzlcMc(String glgzlcMc) {
		this.glgzlcMc = glgzlcMc;
	}
	//
	private String yxbz;
	

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
	 * 设置：申请人ID
	 */
	public void setSqrId(Long sqrId) {
		this.sqrId = sqrId;
	}
	/**
	 * 获取：申请人ID
	 */
	public Long getSqrId() {
		return sqrId;
	}
	/**
	 * 设置：申请人名称
	 */
	public void setSqrMc(String sqrMc) {
		this.sqrMc = sqrMc;
	}
	/**
	 * 获取：申请人名称
	 */
	public String getSqrMc() {
		return sqrMc;
	}
	/**
	 * 设置：所在部门ID
	 */
	public void setSzbmId(Long szbmId) {
		this.szbmId = szbmId;
	}
	/**
	 * 获取：所在部门ID
	 */
	public Long getSzbmId() {
		return szbmId;
	}
	/**
	 * 设置：所在部门名称
	 */
	public void setSzbmMc(String szbmMc) {
		this.szbmMc = szbmMc;
	}
	/**
	 * 获取：所在部门名称
	 */
	public String getSzbmMc() {
		return szbmMc;
	}
	/**
	 * 设置：紧急情况
	 */
	public void setJjqk(String jjqk) {
		this.jjqk = jjqk;
	}
	/**
	 * 获取：紧急情况
	 */
	public String getJjqk() {
		return jjqk;
	}
	/**
	 * 设置：申请时间
	 */
	public void setSqsj(Date sqsj) {
		this.sqsj = sqsj;
	}
	/**
	 * 获取：申请时间
	 */
	public Date getSqsj() {
		return sqsj;
	}
	/**
	 * 设置：加班类型
	 */
	public void setJblx(String jblx) {
		this.jblx = jblx;
	}
	/**
	 * 获取：加班类型
	 */
	public String getJblx() {
		return jblx;
	}
	/**
	 * 设置：加班事由
	 */
	public void setJbsy(String jbsy) {
		this.jbsy = jbsy;
	}
	/**
	 * 获取：加班事由
	 */
	public String getJbsy() {
		return jbsy;
	}
	/**
	 * 设置：开始时间
	 */
	public void setKssj(Date kssj) {
		this.kssj = kssj;
	}
	/**
	 * 获取：开始时间
	 */
	public String getKssj() {
		String dateString =null;
		if( kssj != null){
		    dateString = formatter.format(kssj);  
		}

		return dateString;
	}
	/**
	 * 设置：结束时间
	 */
	public void setJssj(Date jssj) {
		this.jssj = jssj;
	}
	/**
	 * 获取：结束时间
	 */
	public String getJssj() {
		String dateString = null;
		if(jssj!=null){
			dateString = formatter.format(jssj);  
		}
		return dateString;
	}
	/**
	 * 设置：关联工作流程
	 */
	public void setGlgzlc(String glgzlc) {
		this.glgzlc = glgzlc;
	}
	/**
	 * 获取：关联工作流程
	 */
	public String getGlgzlc() {
		return glgzlc;
	}
	/**
	 * 设置：
	 */
	public void setYxbz(String yxbz) {
		this.yxbz = yxbz;
	}
	/**
	 * 获取：
	 */
	public String getYxbz() {
		return yxbz;
	}
}
