package com.bootdo.jsb.ypfx.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * 
 * 
 * @author wu
 * @email 1992lcg@163.com
 * @date 2018-10-11 17:38:03
 */
public class VehiclePatientDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//
	private Integer id;
	//机动车序号
	private String xh;
	//号牌种类
	private String hpzl;
	//中文品牌
	private String clpp1;
	//车辆型号
	private String clxh;
	//车辆识别代号
	private String clsbdh;
	//车辆类型
	private String cllx;
	//车身颜色
	private String csys;
	//车身颜色_字典翻译值
	private String csysDic;
	//身份证明号码
	private String sfzmhm;
	//机动车所有人
	private String syr;
	//手机号码
	private String sjhm;
	//入库时间
	private Date rksj;

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
	 * 设置：机动车序号
	 */
	public void setXh(String xh) {
		this.xh = xh;
	}
	/**
	 * 获取：机动车序号
	 */
	public String getXh() {
		return xh;
	}
	/**
	 * 设置：号牌种类
	 */
	public void setHpzl(String hpzl) {
		this.hpzl = hpzl;
	}
	/**
	 * 获取：号牌种类
	 */
	public String getHpzl() {
		return hpzl;
	}
	/**
	 * 设置：中文品牌
	 */
	public void setClpp1(String clpp1) {
		this.clpp1 = clpp1;
	}
	/**
	 * 获取：中文品牌
	 */
	public String getClpp1() {
		return clpp1;
	}
	/**
	 * 设置：车辆型号
	 */
	public void setClxh(String clxh) {
		this.clxh = clxh;
	}
	/**
	 * 获取：车辆型号
	 */
	public String getClxh() {
		return clxh;
	}
	/**
	 * 设置：车辆识别代号
	 */
	public void setClsbdh(String clsbdh) {
		this.clsbdh = clsbdh;
	}
	/**
	 * 获取：车辆识别代号
	 */
	public String getClsbdh() {
		return clsbdh;
	}
	/**
	 * 设置：车辆类型
	 */
	public void setCllx(String cllx) {
		this.cllx = cllx;
	}
	/**
	 * 获取：车辆类型
	 */
	public String getCllx() {
		return cllx;
	}
	/**
	 * 设置：车身颜色
	 */
	public void setCsys(String csys) {
		this.csys = csys;
	}
	/**
	 * 获取：车身颜色
	 */
	public String getCsys() {
		return csys;
	}
	/**
	 * 设置：车身颜色_字典翻译值
	 */
	public void setCsysDic(String csysDic) {
		this.csysDic = csysDic;
	}
	/**
	 * 获取：车身颜色_字典翻译值
	 */
	public String getCsysDic() {
		return csysDic;
	}
	/**
	 * 设置：身份证明号码
	 */
	public void setSfzmhm(String sfzmhm) {
		this.sfzmhm = sfzmhm;
	}
	/**
	 * 获取：身份证明号码
	 */
	public String getSfzmhm() {
		return sfzmhm;
	}
	/**
	 * 设置：机动车所有人
	 */
	public void setSyr(String syr) {
		this.syr = syr;
	}
	/**
	 * 获取：机动车所有人
	 */
	public String getSyr() {
		return syr;
	}
	/**
	 * 设置：手机号码
	 */
	public void setSjhm(String sjhm) {
		this.sjhm = sjhm;
	}
	/**
	 * 获取：手机号码
	 */
	public String getSjhm() {
		return sjhm;
	}
	/**
	 * 设置：入库时间
	 */
	public void setRksj(Date rksj) {
		this.rksj = rksj;
	}
	/**
	 * 获取：入库时间
	 */
	public Date getRksj() {
		return rksj;
	}
}
