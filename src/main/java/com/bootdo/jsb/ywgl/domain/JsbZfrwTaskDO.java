package com.bootdo.jsb.ywgl.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * 精神病_走访任务
 * 
 * @author zhangf
 * @date 2018-10-11 10:26:33
 */
public class JsbZfrwTaskDO extends JsbZfrwDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//管控等级
	private String gkdj;
	//走访周期
	private String zfzq;
	
	public String getGkdj() {
		return gkdj;
	}
	public void setGkdj(String gkdj) {
		this.gkdj = gkdj;
	}
	public String getZfzq() {
		return zfzq;
	}
	public void setZfzq(String zfzq) {
		this.zfzq = zfzq;
	}
}
