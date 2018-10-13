package com.bootdo.common.domain;

import java.io.Serializable;
import java.util.Date;


/**
 * 
 * 
 * @author zhangf
 * @date 2018-06-27 16:13:25
 */
public class FilesDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//文件ID
	private String fileId;
	//文件名称
	private String fileMc;
	// URL地址
    private String url;
	//文件内容
	private byte[] content;
	//创建时间
	private Date createTime;
	//创建人员
	private String createUser;

	/**
	 * 设置：文件ID
	 */
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	/**
	 * 获取：文件ID
	 */
	public String getFileId() {
		return fileId;
	}
	/**
	 * 设置：文件名称
	 */
	public void setFileMc(String fileMc) {
		this.fileMc = fileMc;
	}
	/**
	 * 获取：文件名称
	 */
	public String getFileMc() {
		return fileMc;
	}
	/**
	 * 设置：文件内容
	 */
	public void setContent(byte[] content) {
		this.content = content;
	}
	/**
	 * 获取：文件内容
	 */
	public byte[] getContent() {
		return content;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getCreateTime() {
		return createTime;
	}
	/**
	 * 设置：创建人员
	 */
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	/**
	 * 获取：创建人员
	 */
	public String getCreateUser() {
		return createUser;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
}
