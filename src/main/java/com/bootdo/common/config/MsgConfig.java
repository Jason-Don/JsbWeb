package com.bootdo.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix="msg")
public class MsgConfig {
	//短信模板 系统主动触发
	private String XTZDCF;
	//短信模板 人工触发
	private String RGCF;
	//发送者号码
	private String SendTel;
	
	
	public String getXTZDCF() {
		return XTZDCF;
	}
	public void setXTZDCF(String xTZDCF) {
		XTZDCF = xTZDCF;
	}
	public String getRGCF() {
		return RGCF;
	}
	public void setRGCF(String rGCF) {
		RGCF = rGCF;
	}
	public String getSendTel() {
		return SendTel;
	}
	public void setSendTel(String sendTel) {
		SendTel = sendTel;
	}
	
	
}
