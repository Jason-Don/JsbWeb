package com.bootdo.jsb.ywgl.domain;

import java.io.Serializable;
import java.util.Date;

import com.bootdo.activiti.domain.TaskDO;



/**
 * 精神病_走访任务_反馈
 * 
 * @author zhangf
 * @email 1992lcg@163.com
 * @date 2018-10-11 10:26:33
 */
public class JsbZfrwFkDO extends TaskDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//走访任务_反馈ID
	private String id;
	//走访任务ID
	private String zfrwId;
	//患者名称
	private String hzMc;
	//患者身份证号码
	private String hzSfzhm;
	//管控等级(1=一级管控，2=二级管控，3=三级管控)
	private Integer gkdj;
	//走访地点
	private String zfdd;
	//经度
	private String lng;
	//纬度
	private String lat;
	//患者情况_人员在位(1=在家，2=长期在外，3=走失)
	private Integer hzqkRyzw;
	//患者情况_长期在外_去向
	private String hzqkCqzwQx;
	//患者情况_病情稳定(1=为发病，2=偶然发病，3=经常发病)
	private Integer hzqkBqwd;
	//患者情况_监护人履职(1=履行，2=无力履行，3=不履行)
	private Integer hzqkJhrlz;
	//患者情况_服药情况(1=规律，2=不规律，3=服药间断，4=无力购药，5=不服药)
	private Integer hzqkFyqk;
	//患者情况_风险等级(0=0级，1=1级，2=2级，3=3级，4=4级，5=5级)
	private Integer hzqkFxdj;
	//患者情况_其他情况说明
	private String hzqkQtqksm;
	//民警嘱咐事项
	private String mjzfsx;
	//走访日期
	private Date zfrq;
	//下次走访日期
	private Date xczfrq;
	//走访民警_警号
	private String zfmjJh;
	//走访民警_名称
	private String zfmjMc;
	//联合随访人员_警号
	private String lhsfryJh;
	//联合随访人员_名称
	private String lhsfryMc;
	//生成时间
	private Date scsj;
	//是否已读(0=未读，1已读)
	private Integer isread;
	//已读_时间
	private Date readTime;

	/**
	 * 设置：走访任务_反馈ID
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * 获取：走访任务_反馈ID
	 */
	public String getId() {
		return id;
	}
	/**
	 * 设置：走访任务ID
	 */
	public void setZfrwId(String zfrwId) {
		this.zfrwId = zfrwId;
	}
	/**
	 * 获取：走访任务ID
	 */
	public String getZfrwId() {
		return zfrwId;
	}
	/**
	 * 设置：患者名称
	 */
	public void setHzMc(String hzMc) {
		this.hzMc = hzMc;
	}
	/**
	 * 获取：患者名称
	 */
	public String getHzMc() {
		return hzMc;
	}
	/**
	 * 设置：患者身份证号码
	 */
	public void setHzSfzhm(String hzSfzhm) {
		this.hzSfzhm = hzSfzhm;
	}
	/**
	 * 获取：患者身份证号码
	 */
	public String getHzSfzhm() {
		return hzSfzhm;
	}
	/**
	 * 设置：管控等级(1=一级管控，2=二级管控，3=三级管控)
	 */
	public void setGkdj(Integer gkdj) {
		this.gkdj = gkdj;
	}
	/**
	 * 获取：管控等级(1=一级管控，2=二级管控，3=三级管控)
	 */
	public Integer getGkdj() {
		return gkdj;
	}
	/**
	 * 设置：走访地点
	 */
	public void setZfdd(String zfdd) {
		this.zfdd = zfdd;
	}
	/**
	 * 获取：走访地点
	 */
	public String getZfdd() {
		return zfdd;
	}
	/**
	 * 设置：经度
	 */
	public void setLng(String lng) {
		this.lng = lng;
	}
	/**
	 * 获取：经度
	 */
	public String getLng() {
		return lng;
	}
	/**
	 * 设置：纬度
	 */
	public void setLat(String lat) {
		this.lat = lat;
	}
	/**
	 * 获取：纬度
	 */
	public String getLat() {
		return lat;
	}
	/**
	 * 设置：患者情况_人员在位(1=在家，2=长期在外，3=走失)
	 */
	public void setHzqkRyzw(Integer hzqkRyzw) {
		this.hzqkRyzw = hzqkRyzw;
	}
	/**
	 * 获取：患者情况_人员在位(1=在家，2=长期在外，3=走失)
	 */
	public Integer getHzqkRyzw() {
		return hzqkRyzw;
	}
	/**
	 * 设置：患者情况_长期在外_去向
	 */
	public void setHzqkCqzwQx(String hzqkCqzwQx) {
		this.hzqkCqzwQx = hzqkCqzwQx;
	}
	/**
	 * 获取：患者情况_长期在外_去向
	 */
	public String getHzqkCqzwQx() {
		return hzqkCqzwQx;
	}
	/**
	 * 设置：患者情况_病情稳定(1=为发病，2=偶然发病，3=经常发病)
	 */
	public void setHzqkBqwd(Integer hzqkBqwd) {
		this.hzqkBqwd = hzqkBqwd;
	}
	/**
	 * 获取：患者情况_病情稳定(1=为发病，2=偶然发病，3=经常发病)
	 */
	public Integer getHzqkBqwd() {
		return hzqkBqwd;
	}
	/**
	 * 设置：患者情况_监护人履职(1=履行，2=无力履行，3=不履行)
	 */
	public void setHzqkJhrlz(Integer hzqkJhrlz) {
		this.hzqkJhrlz = hzqkJhrlz;
	}
	/**
	 * 获取：患者情况_监护人履职(1=履行，2=无力履行，3=不履行)
	 */
	public Integer getHzqkJhrlz() {
		return hzqkJhrlz;
	}
	/**
	 * 设置：患者情况_服药情况(1=规律，2=不规律，3=服药间断，4=无力购药，5=不服药)
	 */
	public void setHzqkFyqk(Integer hzqkFyqk) {
		this.hzqkFyqk = hzqkFyqk;
	}
	/**
	 * 获取：患者情况_服药情况(1=规律，2=不规律，3=服药间断，4=无力购药，5=不服药)
	 */
	public Integer getHzqkFyqk() {
		return hzqkFyqk;
	}
	/**
	 * 设置：患者情况_风险等级(0=0级，1=1级，2=2级，3=3级，4=4级，5=5级)
	 */
	public void setHzqkFxdj(Integer hzqkFxdj) {
		this.hzqkFxdj = hzqkFxdj;
	}
	/**
	 * 获取：患者情况_风险等级(0=0级，1=1级，2=2级，3=3级，4=4级，5=5级)
	 */
	public Integer getHzqkFxdj() {
		return hzqkFxdj;
	}
	/**
	 * 设置：患者情况_其他情况说明
	 */
	public void setHzqkQtqksm(String hzqkQtqksm) {
		this.hzqkQtqksm = hzqkQtqksm;
	}
	/**
	 * 获取：患者情况_其他情况说明
	 */
	public String getHzqkQtqksm() {
		return hzqkQtqksm;
	}
	/**
	 * 设置：民警嘱咐事项
	 */
	public void setMjzfsx(String mjzfsx) {
		this.mjzfsx = mjzfsx;
	}
	/**
	 * 获取：民警嘱咐事项
	 */
	public String getMjzfsx() {
		return mjzfsx;
	}
	/**
	 * 设置：走访日期
	 */
	public void setZfrq(Date zfrq) {
		this.zfrq = zfrq;
	}
	/**
	 * 获取：走访日期
	 */
	public Date getZfrq() {
		return zfrq;
	}
	/**
	 * 设置：下次走访日期
	 */
	public void setXczfrq(Date xczfrq) {
		this.xczfrq = xczfrq;
	}
	/**
	 * 获取：下次走访日期
	 */
	public Date getXczfrq() {
		return xczfrq;
	}
	/**
	 * 设置：走访民警_警号
	 */
	public void setZfmjJh(String zfmjJh) {
		this.zfmjJh = zfmjJh;
	}
	/**
	 * 获取：走访民警_警号
	 */
	public String getZfmjJh() {
		return zfmjJh;
	}
	/**
	 * 设置：走访民警_名称
	 */
	public void setZfmjMc(String zfmjMc) {
		this.zfmjMc = zfmjMc;
	}
	/**
	 * 获取：走访民警_名称
	 */
	public String getZfmjMc() {
		return zfmjMc;
	}
	/**
	 * 设置：联合随访人员_警号
	 */
	public void setLhsfryJh(String lhsfryJh) {
		this.lhsfryJh = lhsfryJh;
	}
	/**
	 * 获取：联合随访人员_警号
	 */
	public String getLhsfryJh() {
		return lhsfryJh;
	}
	/**
	 * 设置：联合随访人员_名称
	 */
	public void setLhsfryMc(String lhsfryMc) {
		this.lhsfryMc = lhsfryMc;
	}
	/**
	 * 获取：联合随访人员_名称
	 */
	public String getLhsfryMc() {
		return lhsfryMc;
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
	/**
	 * 设置：是否已读(0=未读，1已读)
	 */
	public void setIsread(Integer isread) {
		this.isread = isread;
	}
	/**
	 * 获取：是否已读(0=未读，1已读)
	 */
	public Integer getIsread() {
		return isread;
	}
	/**
	 * 设置：已读_时间
	 */
	public void setReadTime(Date readTime) {
		this.readTime = readTime;
	}
	/**
	 * 获取：已读_时间
	 */
	public Date getReadTime() {
		return readTime;
	}
}
