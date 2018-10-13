package com.bootdo.activiti.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 * 
 * @author zhangf
 * @date 2018-07-05 15:43:58
 */
public class CalendarDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//用户ID
	private Long userId;
	//所属日期
	private Date ssrq;
	//事项ID
	private String eventId;
	//事项标题
	private String title;
	//事项内容
	private String content;
	//提醒方式
	private String remindType;
	//提醒时间
	private Date remindTime;
	//数据生成时间
	private Date sjscsj;

	/**
	 * 设置：用户ID
	 */
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	/**
	 * 获取：用户ID
	 */
	public Long getUserId() {
		return userId;
	}
	/**
	 * 设置：所属日期
	 */
	public void setSsrq(Date ssrq) {
		this.ssrq = ssrq;
	}
	/**
	 * 获取：所属日期
	 */
	public Date getSsrq() {
		return ssrq;
	}
	/**
	 * 设置：事项ID
	 */
	public void setEventId(String eventId) {
		this.eventId = eventId;
	}
	/**
	 * 获取：事项ID
	 */
	public String getEventId() {
		return eventId;
	}
	/**
	 * 设置：事项标题
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	/**
	 * 获取：事项标题
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * 设置：事项内容
	 */
	public void setContent(String content) {
		this.content = content;
	}
	/**
	 * 获取：事项内容
	 */
	public String getContent() {
		return content;
	}
	/**
	 * 设置：提醒方式
	 */
	public void setRemindType(String remindType) {
		this.remindType = remindType;
	}
	/**
	 * 获取：提醒方式
	 */
	public String getRemindType() {
		return remindType;
	}
	/**
	 * 设置：提醒时间
	 */
	public void setRemindTime(Date remindTime) {
		this.remindTime = remindTime;
	}
	/**
	 * 获取：提醒时间
	 */
	public Date getRemindTime() {
		return remindTime;
	}
	/**
	 * 设置：数据生成时间
	 */
	public void setSjscsj(Date sjscsj) {
		this.sjscsj = sjscsj;
	}
	/**
	 * 获取：数据生成时间
	 */
	public Date getSjscsj() {
		return sjscsj;
	}
}
