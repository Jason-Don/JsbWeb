package com.bootdo.jsb.ywgl.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * 患者信息表
 * 
 * @author zhangf
 * @email 1992lcg@163.com
 * @date 2018-10-08 20:08:06
 */
public class JsbHzxxDO implements Serializable {
	private static final long serialVersionUID = 1L;

	//ID
	private Integer id;
	//唯一键 防止重复插入
	private String kid;
	//身份证号
	private String sfzh;
	//患者姓名
	private String hzxm;
	//曾用名
	private String cym;
	//患者电话
	private String hzdh;
	//性别
	private Integer xb;
	//出生日期
	private Date csrq;
	//职业
	private String zy;
	//文化程度
	private String whcd;
	//婚姻状态
	private String hyzk;
	//名族
	private String mz;
	//现住国标地码 区划
	private String xzqh;
	//现住地址
	private String xzdz;
	//现住派出所机构代码
	private String xzpcsjgdm;
	//现住派出所机关名称
	private String xzpcs;
	//户籍国标 区划
	private String hjqh;
	//户籍地址
	private String hjdz;
	//户籍派出所机构代码
	private String hjpcsjgdm;
	//户籍派出所机关名称
	private String hjpcs;
	//初次发病时间
	private Date firsttime;
	//报告地区
	private String bgdq;
	//报告单位
	private String bgdw;
	//疾病诊断类型
	private String zdlx;
	//鉴定号或诊断书
	private String zdsh;
	//是否评估
	private Integer ispg;
	//风险等级
	private Integer fxdj;
	//评估机构
	private String pgjg;
	//评估人
	private String pgr;
	//肇事
	private Integer zs;
	//肇祸
	private Integer zh;
	//轻度滋事
	private Integer qwzs;
	//送治次数
	private Integer sz;
	//最后收治医院
	private String szyy;
	//最后收治时间
	private Date sztime;
	//肇事肇祸简要案情
	private String jyaq;
	//是否排查
	private Integer ispc;
	//排查时间
	private Date pctime;
	//是否纳入重大敏感节点重点患者
	private Integer iszd;
	//是否在控
	private Integer iszk;
	//在控状态或失控原因
	private String skyy;
	//是否落实以奖励代补政策
	private Integer isyjdb;
	//以奖代补时间
	private Date yjdbtime;
	//是否删除
	private Integer issc;
	//删除原因
	private String scyy;
	//监护人身份证
	private String jhrsfzh;
	//监护人姓名
	private String jhrxm;
	//监护人电话
	private String jhrdh;
	//监护人关系
	private String jhrgx;
	//记录生成时间
	private Date createtime;
	//经度
	private String lng;
	//纬度
	private String lat;
	//最后定位时间
	private Date ltime;
	//数据传递，0未分发、1省级、2市、3县、4派出所
	private Integer sjzd;
	//现在地民警身份证
	private String xzgkmj;
	//户籍地民警身份证
	private String hjgkmj;
	//户籍地社区干部代码
	private String hjsqgb;
	//现住地社区干部代码
	private String xzsqgb;
	//批量操作标记，0未操作、1已操作
	private Integer isbat;
	//一案一码次数
	private Integer yaym;

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
	 * 设置：唯一键 防止重复插入
	 */
	public void setKid(String kid) {
		this.kid = kid;
	}
	/**
	 * 获取：唯一键 防止重复插入
	 */
	public String getKid() {
		return kid;
	}
	/**
	 * 设置：身份证号
	 */
	public void setSfzh(String sfzh) {
		this.sfzh = sfzh;
	}
	/**
	 * 获取：身份证号
	 */
	public String getSfzh() {
		return sfzh;
	}
	/**
	 * 设置：患者姓名
	 */
	public void setHzxm(String hzxm) {
		this.hzxm = hzxm;
	}
	/**
	 * 获取：患者姓名
	 */
	public String getHzxm() {
		return hzxm;
	}
	/**
	 * 设置：曾用名
	 */
	public void setCym(String cym) {
		this.cym = cym;
	}
	/**
	 * 获取：曾用名
	 */
	public String getCym() {
		return cym;
	}
	/**
	 * 设置：患者电话
	 */
	public void setHzdh(String hzdh) {
		this.hzdh = hzdh;
	}
	/**
	 * 获取：患者电话
	 */
	public String getHzdh() {
		return hzdh;
	}
	/**
	 * 设置：性别
	 */
	public void setXb(Integer xb) {
		this.xb = xb;
	}
	/**
	 * 获取：性别
	 */
	public Integer getXb() {
		return xb;
	}
	/**
	 * 设置：出生日期
	 */
	public void setCsrq(Date csrq) {
		this.csrq = csrq;
	}
	/**
	 * 获取：出生日期
	 */
	public Date getCsrq() {
		return csrq;
	}
	/**
	 * 设置：职业
	 */
	public void setZy(String zy) {
		this.zy = zy;
	}
	/**
	 * 获取：职业
	 */
	public String getZy() {
		return zy;
	}
	/**
	 * 设置：文化程度
	 */
	public void setWhcd(String whcd) {
		this.whcd = whcd;
	}
	/**
	 * 获取：文化程度
	 */
	public String getWhcd() {
		return whcd;
	}
	/**
	 * 设置：婚姻状态
	 */
	public void setHyzk(String hyzk) {
		this.hyzk = hyzk;
	}
	/**
	 * 获取：婚姻状态
	 */
	public String getHyzk() {
		return hyzk;
	}
	/**
	 * 设置：名族
	 */
	public void setMz(String mz) {
		this.mz = mz;
	}
	/**
	 * 获取：名族
	 */
	public String getMz() {
		return mz;
	}
	/**
	 * 设置：现住国标地码 区划
	 */
	public void setXzqh(String xzqh) {
		this.xzqh = xzqh;
	}
	/**
	 * 获取：现住国标地码 区划
	 */
	public String getXzqh() {
		return xzqh;
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
	 * 设置：现住派出所机构代码
	 */
	public void setXzpcsjgdm(String xzpcsjgdm) {
		this.xzpcsjgdm = xzpcsjgdm;
	}
	/**
	 * 获取：现住派出所机构代码
	 */
	public String getXzpcsjgdm() {
		return xzpcsjgdm;
	}
	/**
	 * 设置：户籍国标 区划
	 */
	public void setHjqh(String hjqh) {
		this.hjqh = hjqh;
	}
	/**
	 * 获取：户籍国标 区划
	 */
	public String getHjqh() {
		return hjqh;
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
	 * 设置：户籍派出所机构代码
	 */
	public void setHjpcsjgdm(String hjpcsjgdm) {
		this.hjpcsjgdm = hjpcsjgdm;
	}
	/**
	 * 获取：户籍派出所机构代码
	 */
	public String getHjpcsjgdm() {
		return hjpcsjgdm;
	}
	/**
	 * 设置：初次发病时间
	 */
	public void setFirsttime(Date firsttime) {
		this.firsttime = firsttime;
	}
	/**
	 * 获取：初次发病时间
	 */
	public Date getFirsttime() {
		return firsttime;
	}
	/**
	 * 设置：报告地区
	 */
	public void setBgdq(String bgdq) {
		this.bgdq = bgdq;
	}
	/**
	 * 获取：报告地区
	 */
	public String getBgdq() {
		return bgdq;
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
	 * 设置：鉴定号或诊断书
	 */
	public void setZdsh(String zdsh) {
		this.zdsh = zdsh;
	}
	/**
	 * 获取：鉴定号或诊断书
	 */
	public String getZdsh() {
		return zdsh;
	}
	/**
	 * 设置：是否评估
	 */
	public void setIspg(Integer ispg) {
		this.ispg = ispg;
	}
	/**
	 * 获取：是否评估
	 */
	public Integer getIspg() {
		return ispg;
	}
	/**
	 * 设置：风险等级
	 */
	public void setFxdj(Integer fxdj) {
		this.fxdj = fxdj;
	}
	/**
	 * 获取：风险等级
	 */
	public Integer getFxdj() {
		return fxdj;
	}
	/**
	 * 设置：评估机构
	 */
	public void setPgjg(String pgjg) {
		this.pgjg = pgjg;
	}
	/**
	 * 获取：评估机构
	 */
	public String getPgjg() {
		return pgjg;
	}
	/**
	 * 设置：评估人
	 */
	public void setPgr(String pgr) {
		this.pgr = pgr;
	}
	/**
	 * 获取：评估人
	 */
	public String getPgr() {
		return pgr;
	}
	/**
	 * 设置：肇事
	 */
	public void setZs(Integer zs) {
		this.zs = zs;
	}
	/**
	 * 获取：肇事
	 */
	public Integer getZs() {
		return zs;
	}
	/**
	 * 设置：肇祸
	 */
	public void setZh(Integer zh) {
		this.zh = zh;
	}
	/**
	 * 获取：肇祸
	 */
	public Integer getZh() {
		return zh;
	}
	/**
	 * 设置：轻度滋事
	 */
	public void setQwzs(Integer qwzs) {
		this.qwzs = qwzs;
	}
	/**
	 * 获取：轻度滋事
	 */
	public Integer getQwzs() {
		return qwzs;
	}
	/**
	 * 设置：送治次数
	 */
	public void setSz(Integer sz) {
		this.sz = sz;
	}
	/**
	 * 获取：送治次数
	 */
	public Integer getSz() {
		return sz;
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
	 * 设置：最后收治时间
	 */
	public void setSztime(Date sztime) {
		this.sztime = sztime;
	}
	/**
	 * 获取：最后收治时间
	 */
	public Date getSztime() {
		return sztime;
	}
	/**
	 * 设置：肇事肇祸简要案情
	 */
	public void setJyaq(String jyaq) {
		this.jyaq = jyaq;
	}
	/**
	 * 获取：肇事肇祸简要案情
	 */
	public String getJyaq() {
		return jyaq;
	}
	/**
	 * 设置：是否排查
	 */
	public void setIspc(Integer ispc) {
		this.ispc = ispc;
	}
	/**
	 * 获取：是否排查
	 */
	public Integer getIspc() {
		return ispc;
	}
	/**
	 * 设置：排查时间
	 */
	public void setPctime(Date pctime) {
		this.pctime = pctime;
	}
	/**
	 * 获取：排查时间
	 */
	public Date getPctime() {
		return pctime;
	}
	/**
	 * 设置：是否纳入重大敏感节点重点患者
	 */
	public void setIszd(Integer iszd) {
		this.iszd = iszd;
	}
	/**
	 * 获取：是否纳入重大敏感节点重点患者
	 */
	public Integer getIszd() {
		return iszd;
	}
	/**
	 * 设置：是否在控
	 */
	public void setIszk(Integer iszk) {
		this.iszk = iszk;
	}
	/**
	 * 获取：是否在控
	 */
	public Integer getIszk() {
		return iszk;
	}
	/**
	 * 设置：在控状态或失控原因
	 */
	public void setSkyy(String skyy) {
		this.skyy = skyy;
	}
	/**
	 * 获取：在控状态或失控原因
	 */
	public String getSkyy() {
		return skyy;
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
	 * 设置：是否删除
	 */
	public void setIssc(Integer issc) {
		this.issc = issc;
	}
	/**
	 * 获取：是否删除
	 */
	public Integer getIssc() {
		return issc;
	}
	/**
	 * 设置：删除原因
	 */
	public void setScyy(String scyy) {
		this.scyy = scyy;
	}
	/**
	 * 获取：删除原因
	 */
	public String getScyy() {
		return scyy;
	}
	/**
	 * 设置：监护人身份证
	 */
	public void setJhrsfzh(String jhrsfzh) {
		this.jhrsfzh = jhrsfzh;
	}
	/**
	 * 获取：监护人身份证
	 */
	public String getJhrsfzh() {
		return jhrsfzh;
	}
	/**
	 * 设置：监护人姓名
	 */
	public void setJhrxm(String jhrxm) {
		this.jhrxm = jhrxm;
	}
	/**
	 * 获取：监护人姓名
	 */
	public String getJhrxm() {
		return jhrxm;
	}
	/**
	 * 设置：监护人电话
	 */
	public void setJhrdh(String jhrdh) {
		this.jhrdh = jhrdh;
	}
	/**
	 * 获取：监护人电话
	 */
	public String getJhrdh() {
		return jhrdh;
	}
	/**
	 * 设置：监护人关系
	 */
	public void setJhrgx(String jhrgx) {
		this.jhrgx = jhrgx;
	}
	/**
	 * 获取：监护人关系
	 */
	public String getJhrgx() {
		return jhrgx;
	}
	/**
	 * 设置：记录生成时间
	 */
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	/**
	 * 获取：记录生成时间
	 */
	public Date getCreatetime() {
		return createtime;
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
	 * 设置：最后定位时间
	 */
	public void setLtime(Date ltime) {
		this.ltime = ltime;
	}
	/**
	 * 获取：最后定位时间
	 */
	public Date getLtime() {
		return ltime;
	}
	/**
	 * 设置：数据传递，0未分发、1省级、2市、3县、4派出所
	 */
	public void setSjzd(Integer sjzd) {
		this.sjzd = sjzd;
	}
	/**
	 * 获取：数据传递，0未分发、1省级、2市、3县、4派出所
	 */
	public Integer getSjzd() {
		return sjzd;
	}
	/**
	 * 设置：现在地民警身份证
	 */
	public void setXzgkmj(String xzgkmj) {
		this.xzgkmj = xzgkmj;
	}
	/**
	 * 获取：现在地民警身份证
	 */
	public String getXzgkmj() {
		return xzgkmj;
	}
	/**
	 * 设置：户籍地民警身份证
	 */
	public void setHjgkmj(String hjgkmj) {
		this.hjgkmj = hjgkmj;
	}
	/**
	 * 获取：户籍地民警身份证
	 */
	public String getHjgkmj() {
		return hjgkmj;
	}
	/**
	 * 设置：户籍地社区干部代码
	 */
	public void setHjsqgb(String hjsqgb) {
		this.hjsqgb = hjsqgb;
	}
	/**
	 * 获取：户籍地社区干部代码
	 */
	public String getHjsqgb() {
		return hjsqgb;
	}
	/**
	 * 设置：现住地社区干部代码
	 */
	public void setXzsqgb(String xzsqgb) {
		this.xzsqgb = xzsqgb;
	}
	/**
	 * 获取：现住地社区干部代码
	 */
	public String getXzsqgb() {
		return xzsqgb;
	}
	/**
	 * 设置：批量操作标记，0未操作、1已操作
	 */
	public void setIsbat(Integer isbat) {
		this.isbat = isbat;
	}
	/**
	 * 获取：批量操作标记，0未操作、1已操作
	 */
	public Integer getIsbat() {
		return isbat;
	}
	/**
	 * 设置：一案一码次数
	 */
	public void setYaym(Integer yaym) {
		this.yaym = yaym;
	}
	/**
	 * 获取：一案一码次数
	 */
	public Integer getYaym() {
		return yaym;
	}
	//以下是对应“派出所名称”的函数
	public String getXzpcs() {
		return xzpcs;
	}
	public void setXzpcs(String xzpcs) {	
			this.xzpcs=xzpcs;
	}
	public String getHjpcs() {
		return hjpcs;
	}
	public void setHjpcs(String hjpcs) {
			this.hjpcs =hjpcs;
	}
}
