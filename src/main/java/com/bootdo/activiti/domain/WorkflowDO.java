package com.bootdo.activiti.domain;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * 工作流程表
 * 
 * @author zhangf
 * @email ${email}
 * @String 2018-06-22 15:27:20
 */
public class WorkflowDO extends TaskDO implements Serializable {
	private static final long serialVersionUID = 1L;
	private DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	public WorkflowDO(){}
	public WorkflowDO(Map<String,String> map){
		this.setId(map.get("id"));
		this.setCjryId(map.get("cjryId"));
		this.setCjryMc(map.get("cjryMc"));
		this.setRwzpry(map.get("rwzpry"));
		this.setRwzpryMc(map.get("rwzpryMc"));
		this.setRwnr(map.get("rwnr"));
		this.setNycd(map.get("nycd"));	
		//以下对时间的转换函数就在set方法里面，直接调用set方法即可将字符串转化为date类型
		if(map.containsKey("rwkssj")){	
			this.setRwkssj(map.get("rwkssj"));
		}
		if(map.containsKey("rwwcsj")){
			this.setRwwcsj(map.get("rwwcsj"));
		}

		this.setTaskName(map.get("taskName"));
		this.setBlyj(map.get("blyj"));
		this.setRwly(map.get("rwly"));
	}
	
	//任务id
	private String id;
	//任务名称
	private String taskName;
	//创建时间
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date cjsj;
	//创建人员id
	private String cjryId;
	//创建人员名称
	private String cjryMc;
	//任务来源
	private String rwly;
	//任务内容
	private String rwnr;
	//办理意见
	private String blyj;
	//难易程度
	private String nycd;
	//任务开始时间
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date rwkssj;
	//任务完成时间
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date rwwcsj;
	//发起时间
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date fqsj;
	//任务指派人员
	private String rwzpry;
	//任务指派人员名称
	private String rwzpryMc;
	//任务指派签收人员
	private String rwzpqsry;
	//任务指派签收人员名称
	private String rwzpqsryMc;
	//任务办理类型
	private String rwbllx;
	//承办人员
	private String cbry;
	//承办人员名称
	private String cbryMc;
	//任务最终办理人员
	private String zzblry;
	//任务最终办理人员名称
	private String zzblryMc;
	//实际任务完成时间
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date sjrwwcsj;
	//任务状态
	private String rwzt;
	//完成情况评价
	private String wcqkpf;
	//完成情况评价
	private String wcqkpj;
	//有效标志
	private String yxbz;

	private String rwqtr;
	private String rwqtrMc;

	public String getRwqtr() {
		return rwqtr;
	}

	public void setRwqtr(String rwqtr) {
		this.rwqtr = rwqtr;
	}

	private String fileId;
	public String getFileId() {
		return fileId;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}

	private String fileMc;

	public String getFileMc() {
		return fileMc;
	}
	public void setFileMc(String fileMc) {
		this.fileMc = fileMc;
	}
	/**
	 * 设置：任务id
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * 获取：任务id
	 */
	public String getId() {
		return id;
	}
	/**
	 * 设置：任务名称
	 */
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	/**
	 * 获取：任务名称
	 */
	public String getTaskName() {
		return taskName;
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
	 * 设置：创建人员id
	 */
	public void setCjryId(String cjryId) {
		this.cjryId = cjryId;
	}
	/**
	 * 获取：创建人员id
	 */
	public String getCjryId() {
		return cjryId;
	}
	/**
	 * 设置：创建人员名称
	 */
	public void setCjryMc(String cjryMc) {
		this.cjryMc = cjryMc;
	}
	/**
	 * 获取：创建人员名称
	 */
	public String getCjryMc() {
		return cjryMc;
	}
	/**
	 * 设置：任务来源
	 */
	public void setRwly(String rwly) {
		this.rwly = rwly;
	}
	/**
	 * 获取：任务来源
	 */
	public String getRwly() {
		return rwly;
	}
	/**
	 * 设置：任务内容
	 */
	public void setRwnr(String rwnr) {
		this.rwnr = rwnr;
	}
	/**
	 * 获取：任务内容
	 */
	public String getRwnr() {
		return rwnr;
	}
	/**
	 * 设置：办理意见
	 */
	public void setBlyj(String blyj) {
		this.blyj = blyj;
	}
	/**
	 * 获取：办理意见
	 */
	public String getBlyj() {
		return blyj;
	}
	/**
	 * 设置：难易程度
	 */
	public void setNycd(String nycd) {
		this.nycd = nycd;
	}
	/**
	 * 获取：难易程度
	 */
	public String getNycd() {
		return nycd;
	}
	/**
	 * 设置：任务开始时间
	 */
	public void setRwkssj(String rwkssj) {
		try {
			this.rwkssj = format1.parse(rwkssj);
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 获取：任务开始时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	public Date getRwkssj() {
		return rwkssj;
	}
	/**
	 * 设置：任务完成时间
	 */
	public void setRwwcsj(String rwwcsj) {
		try {
			this.rwwcsj = format1.parse(rwwcsj);
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 获取：任务完成时间
	 */
	@JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
	public Date getRwwcsj() {
		return rwwcsj;
	}
	/**
	 * 设置：发起时间
	 */
	public void setFqsj(Date fqsj) {
		this.fqsj = fqsj;
	}
	/**
	 * 获取：发起时间
	 */
	public Date getFqsj() {
		return fqsj;
	}
	/**
	 * 设置：任务指派人员
	 */
	public void setRwzpry(String rwzpry) {
		this.rwzpry = rwzpry;
	}
	/**
	 * 获取：任务指派人员
	 */
	public String getRwzpry() {
		return rwzpry;
	}
	/**
	 * 设置：任务指派人员名称
	 */
	public void setRwzpryMc(String rwzpryMc) {
		this.rwzpryMc = rwzpryMc;
	}
	/**
	 * 获取：任务指派人员名称
	 */
	public String getRwzpryMc() {
		return rwzpryMc;
	}
	/**
	 * 设置：任务指派签收人员
	 */
	public void setRwzpqsry(String rwzpqsry) {
		this.rwzpqsry = rwzpqsry;
	}
	/**
	 * 获取：任务指派签收人员
	 */
	public String getRwzpqsry() {
		return rwzpqsry;
	}
	/**
	 * 设置：任务指派签收人员名称
	 */
	public void setRwzpqsryMc(String rwzpqsryMc) {
		this.rwzpqsryMc = rwzpqsryMc;
	}
	/**
	 * 获取：任务指派签收人员名称
	 */
	public String getRwzpqsryMc() {
		return rwzpqsryMc;
	}
	/**
	 * 设置：任务办理类型
	 */
	public void setRwbllx(String rwbllx) {
		this.rwbllx = rwbllx;
	}
	/**
	 * 获取：任务办理类型
	 */
	public String getRwbllx() {
		return rwbllx;
	}
	/**
	 * 设置：承办人员
	 */
	public void setCbry(String cbry) {
		this.cbry = cbry;
	}
	/**
	 * 获取：承办人员
	 */
	public String getCbry() {
		return cbry;
	}
	/**
	 * 设置：承办人员名称
	 */
	public void setCbryMc(String cbryMc) {
		this.cbryMc = cbryMc;
	}
	/**
	 * 获取：承办人员名称
	 */
	public String getCbryMc() {
		return cbryMc;
	}
	/**
	 * 设置：任务最终办理人员
	 */
	public void setZzblry(String zzblry) {
		this.zzblry = zzblry;
	}
	/**
	 * 获取：任务最终办理人员
	 */
	public String getZzblry() {
		return zzblry;
	}
	/**
	 * 设置：任务最终办理人员名称
	 */
	public void setZzblryMc(String zzblryMc) {
		this.zzblryMc = zzblryMc;
	}
	/**
	 * 获取：任务最终办理人员名称
	 */
	public String getZzblryMc() {
		return zzblryMc;
	}
	/**
	 * 设置：实际任务完成时间
	 */
	public void setSjrwwcsj(Date sjrwwcsj) {
		this.sjrwwcsj = sjrwwcsj;
	}
	/**
	 * 获取：实际任务完成时间
	 */
	public Date getSjrwwcsj() {
		return sjrwwcsj;
	}
	/**
	 * 设置：任务状态
	 */
	public void setRwzt(String rwzt) {
		this.rwzt = rwzt;
	}
	/**
	 * 获取：任务状态
	 */
	public String getRwzt() {
		return rwzt;
	}
	public String getWcqkpf() {
		return wcqkpf;
	}
	public void setWcqkpf(String wcqkpf) {
		this.wcqkpf = wcqkpf;
	}
	/**
	 * 设置：完成情况评价
	 */
	public void setWcqkpj(String wcqkpj) {
		this.wcqkpj = wcqkpj;
	}
	/**
	 * 获取：完成情况评价
	 */
	public String getWcqkpj() {
		return wcqkpj;
	}
	/**
	 * 设置：有效标志
	 */
	public void setYxbz(String yxbz) {
		this.yxbz = yxbz;
	}
	/**
	 * 获取：有效标志
	 */
	public String getYxbz() {
		return yxbz;
	}
	public String getRwqtrMc() {
		return rwqtrMc;
	}
	public void setRwqtrMc(String rwqtrMc) {
		this.rwqtrMc = rwqtrMc;
	}
	
}
